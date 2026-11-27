import { describe, expect, it } from 'vitest';
import type { EmailMessage, EmailProvider } from '../email';
import { d1 } from './d1Prueba';
import {
  correoRecuperacion,
  correoValido,
  darDeBaja,
  firmarBaja,
  firmarSeguir,
  guardarRecuperacion,
  horaMadrid,
  leerBaja,
  leerSeguir,
  MAX_POR_DIA,
  metricasRecuperacion,
  recordarBorradores,
} from './recuperarWeb';
import { camposRellenos, debeOfrecer, MIN_CAMPOS, MIN_MS } from './guardarLuego';
import { EJEMPLO_WEB, validarWeb } from './webs';

const H = 3_600_000;
// 12:00 en Madrid (CET, UTC+1).
const AHORA = Date.parse('2026-11-24T11:00:00Z');
const SECRETO = 'secreto-de-prueba-con-longitud-suficiente';
const ORIGEN = 'https://tienda.example';
const ORDERS = `CREATE TABLE orders (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, status TEXT NOT NULL DEFAULT 'pending', created_at TEXT NOT NULL DEFAULT (datetime('now')));`;
const base = () => d1(['0053_webs_borradores.sql', '0058_webs_recuperacion.sql'], ORDERS);
const datos = () => {
  const v = validarWeb({ ...EJEMPLO_WEB, telefono: '600123456' });
  if (!v.ok) throw new Error(v.error);
  return v.datos;
};

function buzon(fallar = 0) {
  const enviados: EmailMessage[] = [];
  let fallos = fallar;
  const p = {
    send: async (m: EmailMessage) => {
      if (fallos > 0) {
        fallos--;
        throw new Error('caído');
      }
      enviados.push(m);
      return { id: String(enviados.length) };
    },
  } as unknown as EmailProvider;
  return { p, enviados };
}

const barrer = (db: ReturnType<typeof base>, p: EmailProvider, ms: number) => recordarBorradores(db, p, ORIGEN, SECRETO, 'Tienda', ms);
const fila = (db: ReturnType<typeof base>, id: string) =>
  db.sql.prepare('SELECT paso, fin, paso_fin, consentimiento FROM webs_recuperacion WHERE id = ?').get(id) as { paso: number; fin: string | null; paso_fin: number | null; consentimiento: string | null };

describe('recuperar borradores del estudio', () => {
  it('valida y normaliza el correo', () => {
    expect(correoValido('  Ana@Ejemplo.ES ')).toBe('ana@ejemplo.es');
    expect(correoValido('ana@ejemplo')).toBeNull();
    expect(correoValido('a b@c.es')).toBeNull();
    expect(correoValido(3)).toBeNull();
  });

  it('guarda y manda el enlace al momento; sin avisos no hay recordatorios', async () => {
    const db = base();
    const g = await guardarRecuperacion(db, SECRETO, datos(), 'ana@ejemplo.es', false, AHORA);
    expect(g.ok).toBe(true);
    if (!g.ok) return;
    expect(await leerSeguir(g.token, SECRETO, AHORA)).toBe(g.id);
    expect(fila(db, g.id).consentimiento).toBeNull();
    const { p, enviados } = buzon();
    expect(await barrer(db, p, AHORA)).toBe(1);
    expect(enviados[0].subject).toMatch(/guardada/);
    expect(enviados[0].idempotencyKey).toBe(`web-borrador/${g.id}/0`);
    expect(await barrer(db, p, AHORA + 80 * H)).toBe(0);
    expect(fila(db, g.id).paso).toBe(1);
  });

  it('con avisos manda los recordatorios a las 2 h, 24 h y 72 h y luego para', async () => {
    const db = base();
    const g = await guardarRecuperacion(db, SECRETO, datos(), 'ana@ejemplo.es', true, AHORA);
    if (!g.ok) throw new Error('no guardado');
    expect(fila(db, g.id).consentimiento).toBe('recuperacion-v1');
    const { p, enviados } = buzon();
    expect(await barrer(db, p, AHORA)).toBe(1);
    expect(await barrer(db, p, AHORA + H)).toBe(0);
    expect(await barrer(db, p, AHORA + 2 * H)).toBe(1);
    expect(await barrer(db, p, AHORA + 23 * H)).toBe(0);
    expect(await barrer(db, p, AHORA + 24 * H)).toBe(1);
    expect(await barrer(db, p, AHORA + 72 * H)).toBe(1);
    expect(await barrer(db, p, AHORA + 200 * H)).toBe(0);
    expect(enviados.map((m) => m.idempotencyKey)).toEqual([0, 1, 2, 3].map((n) => `web-borrador/${g.id}/${n}`));
    expect(enviados[3].subject).toMatch(/ayudamos/);
  });

  it('el enlace sale de noche; los recordatorios esperan a las 9 en Madrid', async () => {
    const noche = Date.parse('2026-11-24T22:30:00Z'); // 23:30 en Madrid
    expect(horaMadrid(noche)).toBe(23);
    const db = base();
    const g = await guardarRecuperacion(db, SECRETO, datos(), 'ana@ejemplo.es', true, noche);
    if (!g.ok) throw new Error('no guardado');
    const { p } = buzon();
    expect(await barrer(db, p, noche)).toBe(1);
    expect(await barrer(db, p, noche + 2 * H)).toBe(0); // 01:30
    expect(await barrer(db, p, Date.parse('2026-11-25T08:00:00Z'))).toBe(1); // 09:00
  });

  it('un fallo de envío deja la reserva caducar y se reintenta con la misma clave', async () => {
    const db = base();
    const g = await guardarRecuperacion(db, SECRETO, datos(), 'ana@ejemplo.es', false, AHORA);
    if (!g.ok) throw new Error('no guardado');
    const { p, enviados } = buzon(1);
    expect(await barrer(db, p, AHORA)).toBe(0);
    expect(await barrer(db, p, AHORA + 60_000)).toBe(0); // reservado
    expect(await barrer(db, p, AHORA + 11 * 60_000)).toBe(1);
    expect(enviados).toHaveLength(1);
    expect(enviados[0].idempotencyKey).toBe(`web-borrador/${g.id}/0`);
  });

  it('para al pagar con ese correo y lo cuenta en las métricas', async () => {
    const db = base();
    const g = await guardarRecuperacion(db, SECRETO, datos(), 'ana@ejemplo.es', true, AHORA);
    if (!g.ok) throw new Error('no guardado');
    const { p } = buzon();
    await barrer(db, p, AHORA);
    await barrer(db, p, AHORA + 2 * H);
    db.sql.prepare("INSERT INTO orders (email, status, created_at) VALUES ('Ana@Ejemplo.es', 'paid', '2026-11-24 15:00:00')").run();
    expect(await barrer(db, p, AHORA + 24 * H)).toBe(0);
    expect(fila(db, g.id)).toMatchObject({ fin: 'pagado', paso_fin: 2 });
    const m = await metricasRecuperacion(db, '2026-11-01 00:00:00');
    expect(m).toEqual({ guardados: 1, pagados: 1, bajas: 0, porPaso: { 2: 1 } });
  });

  it('un pedido pagado antes de guardar no cuenta', async () => {
    const db = base();
    db.sql.prepare("INSERT INTO orders (email, status, created_at) VALUES ('ana@ejemplo.es', 'paid', '2026-11-20 10:00:00')").run();
    const g = await guardarRecuperacion(db, SECRETO, datos(), 'ana@ejemplo.es', false, AHORA);
    if (!g.ok) throw new Error('no guardado');
    expect(await barrer(db, buzon().p, AHORA)).toBe(1);
  });

  it('la baja corta los recordatorios y es idempotente', async () => {
    const db = base();
    const g = await guardarRecuperacion(db, SECRETO, datos(), 'ana@ejemplo.es', true, AHORA);
    if (!g.ok) throw new Error('no guardado');
    const { p } = buzon();
    await barrer(db, p, AHORA);
    expect(await darDeBaja(db, g.id, AHORA + H)).toBe(true);
    expect(await darDeBaja(db, g.id, AHORA + H)).toBe(true);
    expect(await barrer(db, p, AHORA + 2 * H)).toBe(0);
    expect(fila(db, g.id)).toMatchObject({ fin: 'baja', paso_fin: 1 });
  });

  it('guardar otro borrador con el mismo correo sustituye al anterior; límite por día', async () => {
    const db = base();
    const a = await guardarRecuperacion(db, SECRETO, datos(), 'ana@ejemplo.es', true, AHORA);
    const b = await guardarRecuperacion(db, SECRETO, datos(), 'ana@ejemplo.es', true, AHORA + 1000);
    if (!a.ok || !b.ok) throw new Error('no guardado');
    expect(fila(db, a.id).fin).toBe('sustituido');
    expect(fila(db, b.id).fin).toBeNull();
    for (let i = 2; i < MAX_POR_DIA; i++) expect((await guardarRecuperacion(db, SECRETO, datos(), 'ana@ejemplo.es', false, AHORA + 2000 + i)).ok).toBe(true);
    expect(await guardarRecuperacion(db, SECRETO, datos(), 'ana@ejemplo.es', false, AHORA + 5000)).toEqual({ ok: false, error: 'limite' });
    expect((await guardarRecuperacion(db, SECRETO, datos(), 'ana@ejemplo.es', false, AHORA + 25 * H)).ok).toBe(true);
  });

  it('sin borrador (caducado o borrado) no manda nada y lo cierra', async () => {
    const db = base();
    const g = await guardarRecuperacion(db, SECRETO, datos(), 'ana@ejemplo.es', false, AHORA);
    if (!g.ok) throw new Error('no guardado');
    db.sql.prepare('DELETE FROM webs_borradores WHERE id = ?').run(g.id);
    expect(await barrer(db, buzon().p, AHORA)).toBe(0);
    expect(fila(db, g.id).fin).toBe('caducado');
  });

  it('los tokens de seguir y de baja no se intercambian', async () => {
    const id = 'abcdefghjkmn';
    const s = await firmarSeguir(id, SECRETO, AHORA);
    const b = await firmarBaja(id, SECRETO, AHORA);
    expect(await leerSeguir(s, SECRETO, AHORA)).toBe(id);
    expect(await leerBaja(b, SECRETO, AHORA)).toBe(id);
    expect(await leerSeguir(b, SECRETO, AHORA)).toBeNull();
    expect(await leerBaja(s, SECRETO, AHORA)).toBeNull();
    expect(await leerSeguir(s, 'otro-secreto-cualquiera-de-prueba', AHORA)).toBeNull();
    expect(await leerSeguir(s, SECRETO, AHORA + 31 * 24 * H)).toBeNull();
    expect(await leerSeguir(s, null, AHORA)).toBeNull();
  });

  it('el correo lleva la baja One-Click y escapa el negocio', () => {
    const m = correoRecuperacion('ana@ejemplo.es', 1, '<b>Bar</b>', { seguir: `${ORIGEN}/s`, vista: `${ORIGEN}/v`, baja: `${ORIGEN}/b` }, 'Tienda', 'abcdefghjkmn');
    expect(m.headers).toEqual({ 'List-Unsubscribe': `<${ORIGEN}/b>`, 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' });
    expect(m.html).not.toContain('<b>Bar</b>');
    expect(m.text).toContain(`${ORIGEN}/s`);
    expect(m.text).toContain('No quiero más recordatorios');
  });
});

describe('cuándo se ofrece guardar', () => {
  it('pide campos, tiempo y que no esté guardado, cerrado ni pagado', () => {
    expect(camposRellenos({ negocio: 'Bar', sector: ' ', lema: 'x', telefono: '6' })).toBe(3);
    expect(debeOfrecer(MIN_CAMPOS, MIN_MS, false, false, false)).toBe(true);
    expect(debeOfrecer(MIN_CAMPOS - 1, MIN_MS, false, false, false)).toBe(false);
    expect(debeOfrecer(MIN_CAMPOS, MIN_MS - 1, false, false, false)).toBe(false);
    expect(debeOfrecer(MIN_CAMPOS, MIN_MS, true, false, false)).toBe(false);
    expect(debeOfrecer(MIN_CAMPOS, MIN_MS, false, true, false)).toBe(false);
    expect(debeOfrecer(MIN_CAMPOS, MIN_MS, false, false, true)).toBe(false);
  });
});

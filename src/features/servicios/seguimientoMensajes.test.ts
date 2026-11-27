import { describe, expect, it } from 'vitest';
import { d1 } from './d1Prueba';
import { publicarPagina } from './paginas';
import { guardarMensaje, mensajesDeCliente } from './mensajesWeb';
import {
  cambiarEstadoMensaje,
  claveGrupo,
  duracionLegible,
  fechaSql,
  horaMadrid,
  recordarMensajes,
  respuestasGuardadas,
  resumenMensajes,
  sectorDe,
} from './seguimientoMensajes';
import type { EmailMessage } from '../email';

const PEDIDOS = `CREATE TABLE orders (id INTEGER PRIMARY KEY, public_id TEXT UNIQUE, email TEXT);`;
const MIGRACIONES = ['0048_paginas_publicadas.sql', '0051_paginas_versiones.sql', '0054_webs_mensajes.sql', '0057_mensajes_seguimiento.sql'];
// 12:00 en Madrid (UTC+1 en noviembre).
const MEDIODIA = Date.parse('2026-11-27T11:00:00Z');
const PANEL = 'https://t.es/account';

type Db = ReturnType<typeof d1>;
const ejecutar = (db: Db, q: string, ...v: (string | null)[]) => db.sql.prepare(q).run(...v);
const fila = (db: Db, id: string) =>
  db.sql.prepare(`SELECT estado, contestado, recordado FROM webs_mensajes WHERE id = ?`).get(id) as {
    estado: string;
    contestado: string | null;
    recordado: string | null;
  };

async function montar() {
  const db = d1(MIGRACIONES, PEDIDOS);
  db.sql.exec(`INSERT INTO orders (id, public_id, email) VALUES (1, 'ord_a', 'ana@x.es'), (2, 'ord_b', 'otro@x.es')`);
  const web = await publicarPagina(db, 'web', 'ord_a', 'Peluquería Ana', { negocio: 'Peluquería Ana', sector: 'Peluquería' });
  const otra = await publicarPagina(db, 'web', 'ord_b', 'Bar Otro', { negocio: 'Bar Otro' });
  const nuevo = async (slug: string, haceMin: number, nombre = 'Luis') => {
    const id = await guardarMensaje(db, slug, { nombre, contacto: 'luis@x.es', texto: 'Hola' });
    ejecutar(db, `UPDATE webs_mensajes SET creado = ? WHERE id = ?`, fechaSql(MEDIODIA - haceMin * 60_000), id);
    return id;
  };
  return { db, web, otra, nuevo };
}

describe('estados del mensaje', () => {
  it('solo el dueño lo cambia; contestar fecha la respuesta y el clic automático no rebaja un ganado', async () => {
    const { db, web, nuevo } = await montar();
    const id = await nuevo(web, 30);
    expect(await cambiarEstadoMensaje(db, 'otro@x.es', id, 'ganado')).toBe(false);
    expect(fila(db, id).estado).toBe('nuevo');
    expect(await cambiarEstadoMensaje(db, 'ana@x.es', id, 'contestado', true)).toBe(true);
    const primera = fila(db, id).contestado;
    expect(primera).not.toBeNull();
    await cambiarEstadoMensaje(db, 'ana@x.es', id, 'ganado');
    await cambiarEstadoMensaje(db, 'ana@x.es', id, 'contestado', true);
    expect(fila(db, id)).toMatchObject({ estado: 'ganado', contestado: primera });
    // «Deshacer» del dueño sí lo devuelve a contestado.
    await cambiarEstadoMensaje(db, 'ana@x.es', id, 'contestado');
    expect(fila(db, id)).toMatchObject({ estado: 'contestado', contestado: primera });
    await cambiarEstadoMensaje(db, 'ana@x.es', id, 'nuevo');
    expect(fila(db, id).estado).toBe('nuevo');
    expect(await cambiarEstadoMensaje(db, 'ana@x.es', 'no-existe', 'ganado')).toBe(false);
  });
  it('cerrar sin contestar no fecha una respuesta', async () => {
    const { db, web, nuevo } = await montar();
    const id = await nuevo(web, 30);
    await cambiarEstadoMensaje(db, 'ana@x.es', id, 'perdido');
    expect(fila(db, id)).toMatchObject({ estado: 'perdido', contestado: null });
  });
  it('la clave del grupo es fija, corta y no depende del orden', () => {
    const ids = Array.from({ length: 50 }, (_, i) => `${i}-0b7f6a2e-4c1d-4e8a-9f3b-5d2c1a0e9b8${i % 10}`);
    const k = claveGrupo(ids);
    expect(k.length).toBeLessThan(64);
    expect(claveGrupo([...ids].reverse())).toBe(k);
    expect(claveGrupo(ids.slice(1))).not.toBe(k);
  });

  it('el panel trae estado y sector, con los sin contestar primero', async () => {
    const { db, web, nuevo } = await montar();
    const reciente = await nuevo(web, 5, 'Reciente');
    const viejo = await nuevo(web, 120, 'Viejo');
    await cambiarEstadoMensaje(db, 'ana@x.es', reciente, 'contestado');
    const ms = await mensajesDeCliente(db, 'ana@x.es');
    expect(ms.map((m) => [m.id, m.estado, m.sector])).toEqual([
      [viejo, 'nuevo', 'Peluquería'],
      [reciente, 'contestado', 'Peluquería'],
    ]);
  });

  it('resumen de 30 días: total, sin contestar, ganados y minutos de respuesta', async () => {
    const { db, web, otra, nuevo } = await montar();
    expect(await resumenMensajes(db, 'ana@x.es', MEDIODIA)).toEqual({ mensajes: 0, sinContestar: 0, ganados: 0, minutosRespuesta: null });
    const a = await nuevo(web, 90);
    const b = await nuevo(web, 30);
    await nuevo(web, 10);
    await nuevo(web, 40 * 24 * 60); // fuera de los 30 días
    await nuevo(otra, 10); // de otro cliente
    ejecutar(db, `UPDATE webs_mensajes SET estado = 'ganado', contestado = ? WHERE id = ?`, fechaSql(MEDIODIA - 60 * 60_000), a);
    ejecutar(db, `UPDATE webs_mensajes SET estado = 'contestado', contestado = ? WHERE id = ?`, fechaSql(MEDIODIA - 20 * 60_000), b);
    expect(await resumenMensajes(db, 'ana@x.es', MEDIODIA)).toEqual({ mensajes: 3, sinContestar: 1, ganados: 1, minutosRespuesta: 20 });
  });

  it('duración legible', () => {
    expect([duracionLegible(12), duracionLegible(60), duracionLegible(150), duracionLegible(72 * 60)]).toEqual(['12 min', '1 h', '3 h', '3 días']);
  });
});

describe('respuestas guardadas', () => {
  it('elige el sector y rellena nombre y negocio', () => {
    expect([sectorDe('Peluquería y barbería'), sectorDe('Bar de tapas'), sectorDe('Fontanería urgente'), sectorDe('Clínica dental'), sectorDe('Gestoría')]).toEqual([
      'peluqueria',
      'bar',
      'oficios',
      'clinica',
      'general',
    ]);
    const rs = respuestasGuardadas({ nombre: ' Luis ' }, 'Bar Lola', 'Bar de tapas');
    expect(rs).toHaveLength(3);
    expect(rs[0]).toBe('Hola Luis, gracias por escribir a Bar Lola. ¿Para cuántas personas y a qué hora sería?');
    expect(respuestasGuardadas({ nombre: '' }, '', '')[0]).toBe('Hola, gracias por escribir. Cuéntame un poco más y te digo cómo te podemos ayudar.');
    expect(respuestasGuardadas({ nombre: 'Ana' }, 'Peluquería Ana', '')[0]).toContain('¿Qué servicio quieres');
  });
});

describe('recordatorio al dueño', () => {
  it('horario de Madrid', () => {
    expect(horaMadrid(MEDIODIA)).toBe(12);
    expect(horaMadrid(Date.parse('2026-07-01T07:30:00Z'))).toBe(9);
  });

  it('una vez por mensaje, agrupado por web, solo pasadas 2 h y hasta 3 días', async () => {
    const { db, web, otra, nuevo } = await montar();
    const a = await nuevo(web, 150, 'Ana');
    const b = await nuevo(web, 130, 'Bea');
    const pronto = await nuevo(web, 60);
    const muyViejo = await nuevo(web, 4 * 24 * 60);
    const contestado = await nuevo(web, 200);
    await cambiarEstadoMensaje(db, 'ana@x.es', contestado, 'contestado');
    await nuevo(otra, 180, 'Otro');
    const enviados: EmailMessage[] = [];
    const enviar = async (m: EmailMessage) => void enviados.push(m);
    expect(await recordarMensajes(db, enviar, PANEL, 'T', MEDIODIA)).toBe(2);
    const deAna = enviados.find((m) => m.to === 'ana@x.es')!;
    expect(deAna.subject).toBe('2 personas siguen esperando tu respuesta');
    expect(deAna.text).toContain(PANEL);
    expect(deAna.idempotencyKey).toBe(claveGrupo([a, b]));
    expect(enviados.find((m) => m.to === 'otro@x.es')!.subject).toBe('Otro sigue esperando tu respuesta');
    expect([pronto, muyViejo, contestado].map((id) => fila(db, id).recordado)).toEqual([null, null, null]);
    expect(await recordarMensajes(db, enviar, PANEL, 'T', MEDIODIA + 10 * 60_000)).toBe(0);
    expect(enviados).toHaveLength(2);
  });

  it('de noche espera; si el envío falla, se reintenta en la siguiente pasada', async () => {
    const { db, web, nuevo } = await montar();
    const id = await nuevo(web, 150);
    let llamadas = 0;
    expect(await recordarMensajes(db, async () => void llamadas++, PANEL, 'T', Date.parse('2026-11-27T22:30:00Z'))).toBe(0);
    expect(llamadas).toBe(0);
    expect(await recordarMensajes(db, () => Promise.reject(new Error('caído')), PANEL, 'T', MEDIODIA)).toBe(0);
    expect(fila(db, id).recordado).toBeNull();
    expect(await recordarMensajes(db, async () => void llamadas++, PANEL, 'T', MEDIODIA + 5 * 60_000)).toBe(1);
    expect(fila(db, id).recordado).not.toBeNull();
  });
});

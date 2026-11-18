// C39: conciliación de Stripe con pedidos y entregas. Los 6 escenarios de la tarea
// (pago correcto, pago sin entrega, webhook perdido, pago pendiente, reembolso y
// ejecución duplicada) contra un D1 real de Miniflare y un Stripe simulado.
import { readFileSync } from 'node:fs';
import { Miniflare } from 'miniflare';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { CLAVE_CURSOR, conciliar, sqlFecha, textoAviso, type EventoStripe, type Incidencia } from './conciliacion';

let miniflare: Miniflare;
let db: D1Database;

// Tablas mínimas con las columnas que usa la conciliación (las reales vienen de muchas migraciones).
const BASE = `
CREATE TABLE settings (key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, public_id TEXT, provider_session_id TEXT UNIQUE, provider_payment_id TEXT,
  provider_refunded_cents INTEGER NOT NULL DEFAULT 0, status TEXT NOT NULL DEFAULT 'paid', created_at TEXT NOT NULL DEFAULT (datetime('now')));
CREATE TABLE solicitudes (id INTEGER PRIMARY KEY, public_id TEXT, pedido_public_id TEXT, estado TEXT NOT NULL DEFAULT 'nueva');
`;

async function ejecutar(sql: string) {
  for (const s of sql.replace(/--.*$/gm, '').split(';').map((x) => x.trim()).filter(Boolean)) await db.prepare(s).run();
}

/** Stripe simulado: lista de eventos, la más nueva primero, con `limit` y `starting_after`. */
function stripe(eventos: EventoStripe[]) {
  const llamadas: string[] = [];
  const pedir = (async (url: string) => {
    llamadas.push(url);
    const q = new URL(url).searchParams;
    const desde = q.get('starting_after');
    const i = desde ? eventos.findIndex((e) => e.id === desde) + 1 : 0;
    const limite = Number(q.get('limit'));
    const data = eventos.slice(i, i + limite);
    return new Response(JSON.stringify({ data, has_more: i + limite < eventos.length }));
  }) as unknown as typeof fetch;
  return { pedir, llamadas, eventos };
}

const T0 = new Date('2026-11-18T10:00:00Z');
const mas = (min: number) => new Date(T0.getTime() + min * 60 * 1000);
let n = 0;
const ev = (type: string, object: Record<string, unknown>, min = 0): EventoStripe => ({
  id: `evt_${++n}`,
  type,
  created: Math.floor(mas(min).getTime() / 1000),
  data: { object },
});

/** Arranca con el cursor ya puesto en un evento viejo y devuelve el Stripe simulado. */
async function conEventos(...nuevos: EventoStripe[]) {
  const viejo = ev('checkout.session.completed', { id: 'cs_viejo', payment_status: 'paid' }, -1000);
  await db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').bind(CLAVE_CURSOR, viejo.id).run();
  return stripe([...nuevos.reverse(), viejo]);
}

function avisos() {
  const lista: Incidencia[] = [];
  return { lista, avisar: async (i: Incidencia) => void lista.push(i) };
}

describe('conciliación de Stripe', () => {
  beforeAll(async () => {
    miniflare = new Miniflare({ modules: true, script: 'export default { fetch() { return new Response("ok") } }', compatibilityDate: '2026-07-20', d1Databases: ['DB'] });
    db = (await miniflare.getD1Database('DB')) as unknown as D1Database;
  });
  afterAll(async () => {
    await miniflare?.dispose();
  });
  beforeEach(async () => {
    for (const t of ['settings', 'orders', 'solicitudes', 'incidencias']) await db.prepare(`DROP TABLE IF EXISTS ${t}`).run();
    await ejecutar(BASE);
    await ejecutar(readFileSync(new URL('../../../migrations/0045_incidencias.sql', import.meta.url), 'utf8'));
  });

  it('sin clave de Stripe no hace nada', async () => {
    const s = stripe([]);
    expect(await conciliar(db, undefined, T0, avisos().avisar, s.pedir)).toBeNull();
    expect(s.llamadas).toEqual([]);
  });

  it('la primera pasada solo adopta el último evento, sin repasar el histórico', async () => {
    const s = stripe([ev('checkout.session.completed', { id: 'cs_hist', payment_status: 'paid' }, -5000)]);
    const a = avisos();
    await conciliar(db, 'rk_test', T0, a.avisar, s.pedir);
    expect(await db.prepare('SELECT value FROM settings WHERE key = ?').bind(CLAVE_CURSOR).first('value')).toBe(s.eventos[0].id);
    expect(await db.prepare('SELECT COUNT(*) AS n FROM incidencias').first('n')).toBe(0);
    expect(new URL(s.llamadas[0]).searchParams.getAll('types[]')).toContain('charge.refunded');
  });

  it('pago correcto: con su pedido no hay aviso y la incidencia se cierra', async () => {
    await db.prepare("INSERT INTO orders (public_id, provider_session_id) VALUES ('o1', 'cs_ok')").run();
    const s = await conEventos(ev('checkout.session.completed', { id: 'cs_ok', payment_status: 'paid' }));
    const a = avisos();
    await conciliar(db, 'rk_test', mas(5), a.avisar, s.pedir);
    const r = await conciliar(db, 'rk_test', mas(40), a.avisar, s.pedir);
    expect(a.lista).toEqual([]);
    expect(r?.cerradas).toEqual(['webhook_perdido:cs_ok']);
  });

  it('webhook perdido: sesión cobrada sin pedido avisa una vez, pasado el margen', async () => {
    const s = await conEventos(ev('checkout.session.completed', { id: 'cs_perdido', payment_status: 'paid' }));
    const a = avisos();
    await conciliar(db, 'rk_test', mas(5), a.avisar, s.pedir);
    expect(a.lista).toEqual([]); // dentro del margen del webhook
    await conciliar(db, 'rk_test', mas(40), a.avisar, s.pedir);
    await conciliar(db, 'rk_test', mas(90), a.avisar, s.pedir);
    expect(a.lista.map((i) => i.clave)).toEqual(['webhook_perdido:cs_perdido']);
    expect(textoAviso(a.lista[0]).texto).toContain('cs_perdido');
  });

  it('pago pendiente: avisa a los 3 días; si falla o se confirma con pedido, no', async () => {
    const s = await conEventos(
      ev('checkout.session.completed', { id: 'cs_sepa', payment_status: 'unpaid' }),
      ev('checkout.session.completed', { id: 'cs_falla', payment_status: 'unpaid' }),
      ev('checkout.session.async_payment_failed', { id: 'cs_falla' }, 60),
    );
    const a = avisos();
    await conciliar(db, 'rk_test', mas(24 * 60), a.avisar, s.pedir);
    expect(a.lista).toEqual([]);
    await conciliar(db, 'rk_test', mas(4 * 24 * 60), a.avisar, s.pedir);
    expect(a.lista.map((i) => i.clave)).toEqual(['pago_pendiente:cs_sepa']);
  });

  it('reembolso: avisa si el pedido no lo refleja; si ya está aplicado, no', async () => {
    await db.prepare("INSERT INTO orders (public_id, provider_session_id, provider_payment_id, provider_refunded_cents) VALUES ('o1', 'cs_1', 'pi_aplicado', 1500), ('o2', 'cs_2', 'pi_sin', 0)").run();
    const s = await conEventos(
      ev('charge.refunded', { payment_intent: 'pi_aplicado', amount_refunded: 1500 }),
      ev('charge.refunded', { payment_intent: 'pi_sin', amount_refunded: 2900 }),
    );
    const a = avisos();
    await conciliar(db, 'rk_test', mas(5), a.avisar, s.pedir);
    await conciliar(db, 'rk_test', mas(40), a.avisar, s.pedir);
    expect(a.lista.map((i) => i.clave)).toEqual(['reembolso:pi_sin']);
    expect(textoAviso(a.lista[0]).texto).toContain('29.00');
  });

  it('pago sin entrega: pedido pagado hace 8 días sin entregar avisa una vez', async () => {
    const hace = (d: number) => sqlFecha(new Date(T0.getTime() - d * 24 * 3600 * 1000));
    await db
      .prepare("INSERT INTO orders (public_id, provider_session_id, created_at) VALUES ('viejo', 'cs_a', ?), ('entregado', 'cs_b', ?), ('reciente', 'cs_c', ?)")
      .bind(hace(8), hace(8), hace(2))
      .run();
    await db.prepare("INSERT INTO solicitudes (public_id, pedido_public_id, estado) VALUES ('S-1', 'viejo', 'pagada'), ('S-2', 'entregado', 'entregada'), ('S-3', 'reciente', 'pagada')").run();
    const s = await conEventos();
    const a = avisos();
    await conciliar(db, 'rk_test', T0, a.avisar, s.pedir);
    await conciliar(db, 'rk_test', mas(5), a.avisar, s.pedir);
    expect(a.lista.map((i) => i.clave)).toEqual(['pago_sin_entrega:viejo']);
  });

  it('ejecución duplicada: dos pasadas a la vez dan un solo aviso por incidencia', async () => {
    const s = await conEventos(ev('checkout.session.completed', { id: 'cs_doble', payment_status: 'paid' }));
    const a = avisos();
    await Promise.all([conciliar(db, 'rk_test', mas(5), a.avisar, s.pedir), conciliar(db, 'rk_test', mas(5), a.avisar, s.pedir)]);
    await Promise.all([conciliar(db, 'rk_test', mas(40), a.avisar, s.pedir), conciliar(db, 'rk_test', mas(40), a.avisar, s.pedir)]);
    expect(a.lista.map((i) => i.clave)).toEqual(['webhook_perdido:cs_doble']);
    expect(await db.prepare('SELECT COUNT(*) AS n FROM incidencias').first('n')).toBe(1);
  });

  it('un aviso que falla se reintenta en la pasada siguiente', async () => {
    const s = await conEventos(ev('checkout.session.completed', { id: 'cs_reintento', payment_status: 'paid' }));
    const a = avisos();
    await conciliar(db, 'rk_test', mas(40), async () => Promise.reject(new Error('correo caído')), s.pedir);
    await conciliar(db, 'rk_test', mas(45), a.avisar, s.pedir);
    expect(a.lista.map((i) => i.clave)).toEqual(['webhook_perdido:cs_reintento']);
  });

  it('un error de Stripe no avanza el cursor', async () => {
    const s = await conEventos(ev('checkout.session.completed', { id: 'cs_x', payment_status: 'paid' }));
    const antes = await db.prepare('SELECT value FROM settings WHERE key = ?').bind(CLAVE_CURSOR).first('value');
    const caido = (async () => new Response('no', { status: 401 })) as unknown as typeof fetch;
    await expect(conciliar(db, 'rk_test', mas(5), avisos().avisar, caido)).rejects.toThrow('HTTP 401');
    expect(await db.prepare('SELECT value FROM settings WHERE key = ?').bind(CLAVE_CURSOR).first('value')).toBe(antes);
    expect(s.eventos.length).toBe(2);
  });
});

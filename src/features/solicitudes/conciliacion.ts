/**
 * Conciliación de Stripe con pedidos y entregas (C39), desde el cron del Worker.
 *
 * Los webhooks siguen siendo la vía en tiempo real; esto rellena los huecos. El
 * sondeo de eventos está adaptado de choyiny/opensigma (MIT), `src/events/poll.ts`:
 * punto de control con el id del último evento aplicado y aplicación de la más
 * antigua a la más nueva. Aquí se avanza hacia delante desde el cursor
 * (`ending_before`), página a página, guardando el cursor tras cada una: un atasco
 * de miles de eventos se reparte entre pasadas sin saltarse ninguno. La primera
 * pasada solo adopta el evento más reciente (o marca la cuenta vacía) y no repasa
 * el histórico.
 *
 * Usa una clave restringida de Stripe de solo lectura (`STRIPE_CONCILIACION_KEY`,
 * permiso «Events: read»). Sin ella no hace nada. Nunca escribe en Stripe ni en
 * los pedidos: solo anota incidencias y avisa una vez por cada una.
 *
 * Incidencias (tabla de 0045, clave = tipo + referencia):
 * - webhook_perdido: sesión pagada sin pedido pasados 30 minutos.
 * - pago_pendiente: pago diferido (SEPA…) sin resolver a los 3 días.
 * - reembolso: reembolso en Stripe que el pedido no refleja pasados 30 minutos.
 * - pago_sin_entrega: pedido pagado cuya solicitud no está entregada a los 7 días.
 * Antes de avisar se vuelve a comprobar: si ya se resolvió, se cierra sin aviso.
 */

import type { D1Database } from '@cloudflare/workers-types';

export type TipoIncidencia = 'webhook_perdido' | 'pago_pendiente' | 'reembolso' | 'pago_sin_entrega';

export interface Incidencia {
  clave: string;
  tipo: TipoIncidencia;
  ref: string;
  detalle: string;
}

export interface EventoStripe {
  id: string;
  type: string;
  created: number;
  data: { object: Record<string, unknown> };
}

export const TIPOS_EVENTO = [
  'checkout.session.completed',
  'checkout.session.async_payment_succeeded',
  'checkout.session.async_payment_failed',
  'charge.refunded',
] as const;

const MIN = 60 * 1000;
const MARGEN_WEBHOOK_MS = 30 * MIN;
const PLAZO_PENDIENTE_MS = 3 * 24 * 60 * MIN;
const DIAS_ENTREGA = 7;
const MAX_PAGINAS = 20;
const MAX_AVISOS = 20;
const RESERVA_MS = 15 * MIN;
export const CLAVE_CURSOR = 'conciliacion:cursor';
/** Cursor de una cuenta que no tenía eventos al empezar: se aplican todos los que lleguen. */
export const CURSOR_VACIO = '';

/** Fecha en el formato de `datetime('now')` de SQLite, que ordena como texto. */
export const sqlFecha = (d: Date) => d.toISOString().slice(0, 19).replace('T', ' ');

const texto = (v: unknown) => (typeof v === 'string' ? v : '');

/** Incidencias que abre un evento (y las que cierra), sin tocar la base. Pura. */
export function incidenciasDeEvento(ev: EventoStripe): {
  abrir: (Incidencia & { vence: Date })[];
  cerrar: string[];
} {
  const o = ev.data.object;
  const cuando = new Date(ev.created * 1000);
  const tras = (ms: number) => new Date(cuando.getTime() + ms);
  const sesion = texto(o.id);
  switch (ev.type) {
    case 'checkout.session.completed':
      if (o.payment_status === 'paid') return { abrir: [inc('webhook_perdido', sesion, '', tras(MARGEN_WEBHOOK_MS))], cerrar: [] };
      if (o.payment_status === 'unpaid') return { abrir: [inc('pago_pendiente', sesion, '', tras(PLAZO_PENDIENTE_MS))], cerrar: [] };
      return { abrir: [], cerrar: [] };
    case 'checkout.session.async_payment_succeeded':
      // Ya no está pendiente; ahora debe existir el pedido.
      return { abrir: [inc('webhook_perdido', sesion, '', tras(MARGEN_WEBHOOK_MS))], cerrar: [clave('pago_pendiente', sesion)] };
    case 'checkout.session.async_payment_failed':
      // Pago fallido: no hay nada que cobrar ni entregar.
      return { abrir: [], cerrar: [clave('pago_pendiente', sesion)] };
    case 'charge.refunded': {
      const pago = texto(o.payment_intent);
      const importe = Number(o.amount_refunded ?? 0);
      if (!pago || !(importe > 0)) return { abrir: [], cerrar: [] };
      return { abrir: [inc('reembolso', pago, String(importe), tras(MARGEN_WEBHOOK_MS))], cerrar: [] };
    }
    default:
      return { abrir: [], cerrar: [] };
  }
}

const clave = (tipo: TipoIncidencia, ref: string) => `${tipo}:${ref}`;
const inc = (tipo: TipoIncidencia, ref: string, detalle: string, vence: Date) => ({ clave: clave(tipo, ref), tipo, ref, detalle, vence });

/** ¿Sigue abierta? Se mira justo antes de avisar, con el estado actual de la base. */
export async function sigueAbierta(db: D1Database, i: Incidencia): Promise<boolean> {
  switch (i.tipo) {
    case 'webhook_perdido':
    case 'pago_pendiente':
      return !(await db.prepare('SELECT 1 FROM orders WHERE provider_session_id = ?').bind(i.ref).first());
    case 'reembolso': {
      const r = await db
        .prepare('SELECT provider_refunded_cents AS n FROM orders WHERE provider_payment_id = ?')
        .bind(i.ref)
        .first<{ n: number }>();
      return !r || r.n < Number(i.detalle);
    }
    case 'pago_sin_entrega':
      return Boolean(
        await db
          .prepare("SELECT 1 FROM solicitudes WHERE pedido_public_id = ? AND estado NOT IN ('entregada', 'descartada')")
          .bind(i.ref)
          .first(),
      );
  }
}

/**
 * Anota una incidencia. Repetir el mismo evento no cambia nada; un reembolso con un
 * importe acumulado mayor actualiza el importe y la reabre (aunque estuviera cerrada o
 * avisada), porque falta aplicar la diferencia.
 */
async function anotar(db: D1Database, i: Incidencia & { vence: Date }) {
  await db
    .prepare(
      `INSERT INTO incidencias (clave, tipo, ref, detalle, vence_at) VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(clave) DO UPDATE SET detalle = excluded.detalle, vence_at = excluded.vence_at,
         reservada_at = NULL, avisada_at = NULL, resuelta_at = NULL
       WHERE incidencias.tipo = 'reembolso' AND CAST(excluded.detalle AS INTEGER) > CAST(incidencias.detalle AS INTEGER)`,
    )
    .bind(i.clave, i.tipo, i.ref, i.detalle, sqlFecha(i.vence))
    .run();
}

async function cerrar(db: D1Database, claveInc: string, ahora: Date) {
  await db
    .prepare('UPDATE incidencias SET resuelta_at = ? WHERE clave = ? AND resuelta_at IS NULL AND avisada_at IS NULL')
    .bind(sqlFecha(ahora), claveInc)
    .run();
}

class ErrorStripe extends Error {
  constructor(readonly status: number) {
    super(`Stripe events HTTP ${status}`);
  }
}

/**
 * Una página de eventos de Stripe (siempre de la más nueva a la más antigua). Con
 * `posterioresA`, los inmediatamente más nuevos que ese evento; sin él, los últimos.
 */
async function pagina(claveApi: string, pedir: typeof fetch, posterioresA?: string, limite = 100) {
  const q = new URLSearchParams({ limit: String(limite) });
  for (const t of TIPOS_EVENTO) q.append('types[]', t);
  if (posterioresA) q.set('ending_before', posterioresA);
  const r = await pedir(`https://api.stripe.com/v1/events?${q}`, { headers: { Authorization: `Bearer ${claveApi}` } });
  // Solo el estado: nunca se registra la clave ni el cuerpo.
  if (!r.ok) throw new ErrorStripe(r.status);
  return (await r.json()) as { data: EventoStripe[]; has_more: boolean };
}

async function moverCursor(db: D1Database, de: string, a: string): Promise<boolean> {
  // Comparar e intercambiar: si otra pasada ya lo movió, esta se retira.
  const r = await db
    .prepare("UPDATE settings SET value = ?, updated_at = datetime('now') WHERE key = ? AND value = ?")
    .bind(a, CLAVE_CURSOR, de)
    .run();
  return (r.meta?.changes ?? 0) === 1;
}

/** Sondeo incremental de eventos (patrón de opensigma). Devuelve cuántos aplicó. */
export async function sondearEventos(db: D1Database, claveApi: string, ahora: Date, pedir: typeof fetch = fetch): Promise<number> {
  let cursor = await db.prepare('SELECT value FROM settings WHERE key = ?').bind(CLAVE_CURSOR).first<string>('value');

  if (cursor === null) {
    // Primera pasada: se adopta el último evento, o la marca de cuenta vacía para que
    // el primer pago que llegue sí se concilie.
    const ultimo = (await pagina(claveApi, pedir, undefined, 1)).data[0]?.id ?? CURSOR_VACIO;
    await db.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO NOTHING').bind(CLAVE_CURSOR, ultimo).run();
    return 0;
  }

  let aplicados = 0;
  for (let n = 0; n < MAX_PAGINAS; n++) {
    let p;
    try {
      // Cuenta que empezó vacía: el «principio» es el evento más antiguo. Se pide la
      // página más antigua avanzando hasta el final la primera vez (pocos eventos).
      p = cursor === CURSOR_VACIO ? await primeraPaginaDesdeVacio(claveApi, pedir) : await pagina(claveApi, pedir, cursor);
    } catch (err) {
      // El evento del cursor ya no existe (Stripe guarda 30 días): se vuelve a adoptar.
      if (err instanceof ErrorStripe && err.status === 404) {
        console.error('Conciliación: el evento del cursor ya no existe en Stripe; se reinicia el cursor');
        await db.prepare('DELETE FROM settings WHERE key = ? AND value = ?').bind(CLAVE_CURSOR, cursor).run();
        return aplicados;
      }
      throw err;
    }
    if (!p.data.length) break;
    for (const ev of [...p.data].reverse()) {
      const { abrir, cerrar: cerrables } = incidenciasDeEvento(ev);
      for (const i of abrir) await anotar(db, i);
      for (const c of cerrables) await cerrar(db, c, ahora);
    }
    aplicados += p.data.length;
    // El cursor avanza tras cada página aplicada: si la pasada se corta, la siguiente
    // sigue justo aquí y no se salta ningún evento.
    if (!(await moverCursor(db, cursor, p.data[0].id))) break;
    cursor = p.data[0].id;
    if (!p.has_more) break;
  }
  return aplicados;
}

/** Página más antigua de una cuenta que empezó sin eventos (de la más nueva a la más antigua). */
async function primeraPaginaDesdeVacio(claveApi: string, pedir: typeof fetch) {
  let p = await pagina(claveApi, pedir);
  for (let n = 0; p.has_more && n < MAX_PAGINAS; n++) {
    const q = new URLSearchParams({ limit: '100', starting_after: p.data[p.data.length - 1].id });
    for (const t of TIPOS_EVENTO) q.append('types[]', t);
    const r = await pedir(`https://api.stripe.com/v1/events?${q}`, { headers: { Authorization: `Bearer ${claveApi}` } });
    if (!r.ok) throw new ErrorStripe(r.status);
    p = (await r.json()) as { data: EventoStripe[]; has_more: boolean };
  }
  return { data: p.data, has_more: true };
}

/** Pedidos pagados cuya solicitud lleva más de 7 días sin entregar. */
export async function buscarSinEntrega(db: D1Database, ahora: Date): Promise<number> {
  const limite = sqlFecha(new Date(ahora.getTime() - DIAS_ENTREGA * 24 * 60 * MIN));
  const { results } = await db
    .prepare(
      `SELECT o.public_id AS ref FROM orders o JOIN solicitudes s ON s.pedido_public_id = o.public_id
       WHERE o.status = 'paid' AND o.created_at < ? AND s.estado NOT IN ('entregada', 'descartada')
         AND NOT EXISTS (SELECT 1 FROM incidencias i WHERE i.clave = 'pago_sin_entrega:' || o.public_id)
       LIMIT 50`,
    )
    .bind(limite)
    .all<{ ref: string }>();
  for (const { ref } of results) await anotar(db, inc('pago_sin_entrega', ref, '', ahora));
  return results.length;
}

/**
 * Avisa de las incidencias vencidas que siguen abiertas, una vez cada una. Se reserva
 * de forma atómica (`reservada_at`) antes de enviar y `avisada_at` solo se pone cuando
 * el correo se acepta. Si el envío falla, la reserva se suelta; si el Worker muere a
 * medias, la reserva vence a los 15 minutos y se reintenta con la misma clave de
 * idempotencia (el proveedor descarta el duplicado si el primero sí salió).
 */
export async function avisarVencidas(
  db: D1Database,
  ahora: Date,
  avisar: (i: Incidencia) => Promise<void>,
): Promise<{ avisadas: string[]; cerradas: string[] }> {
  const res = { avisadas: [] as string[], cerradas: [] as string[] };
  const { results } = await db
    .prepare(
      `SELECT clave, tipo, ref, detalle FROM incidencias
       WHERE avisada_at IS NULL AND resuelta_at IS NULL AND vence_at <= ? AND (reservada_at IS NULL OR reservada_at < ?)
       ORDER BY vence_at LIMIT ?`,
    )
    .bind(sqlFecha(ahora), sqlFecha(new Date(ahora.getTime() - RESERVA_MS)), MAX_AVISOS)
    .all<Incidencia>();
  for (const i of results) {
    if (!(await sigueAbierta(db, i))) {
      await cerrar(db, i.clave, ahora);
      res.cerradas.push(i.clave);
      continue;
    }
    const marca = sqlFecha(ahora);
    const r = await db
      .prepare(
        `UPDATE incidencias SET reservada_at = ?
         WHERE clave = ? AND avisada_at IS NULL AND resuelta_at IS NULL AND (reservada_at IS NULL OR reservada_at < ?)`,
      )
      .bind(marca, i.clave, sqlFecha(new Date(ahora.getTime() - RESERVA_MS)))
      .run();
    if ((r.meta?.changes ?? 0) !== 1) continue; // otra pasada ya la tiene
    try {
      await avisar(i);
    } catch (err) {
      console.error(`Aviso de incidencia ${i.tipo} falló:`, err instanceof Error ? err.message : 'error');
      await db.prepare('UPDATE incidencias SET reservada_at = NULL WHERE clave = ? AND reservada_at = ?').bind(i.clave, marca).run();
      continue;
    }
    await db.prepare('UPDATE incidencias SET avisada_at = ?, reservada_at = NULL WHERE clave = ?').bind(marca, i.clave).run();
    res.avisadas.push(i.clave);
  }
  return res;
}

const QUE_PASA: Record<TipoIncidencia, string> = {
  webhook_perdido: 'Stripe cobró una sesión de pago y la tienda no tiene su pedido (webhook perdido o fallido).',
  pago_pendiente: 'Un pago diferido lleva más de 3 días sin confirmarse ni fallar.',
  reembolso: 'Stripe registra un reembolso que el pedido no refleja.',
  pago_sin_entrega: 'Un pedido pagado lleva más de 7 días sin entregar.',
};

/** Texto del aviso al dueño. Solo referencias de Stripe o del pedido, sin datos del cliente. */
export function textoAviso(i: Incidencia): { asunto: string; texto: string } {
  const importe = i.tipo === 'reembolso' ? `\nImporte reembolsado en Stripe: ${(Number(i.detalle) / 100).toFixed(2)}` : '';
  return {
    asunto: `Incidencia de pago: ${i.tipo.replace(/_/g, ' ')}`,
    texto: `${QUE_PASA[i.tipo]}\nReferencia: ${i.ref}${importe}\n\nEste aviso se envía una sola vez por incidencia.`,
  };
}

/** Pasada completa del cron. No-op sin clave de Stripe. */
export async function conciliar(
  db: D1Database,
  claveApi: string | undefined,
  ahora: Date,
  avisar: (i: Incidencia) => Promise<void>,
  pedir: typeof fetch = fetch,
) {
  if (!claveApi) return null;
  const eventos = await sondearEventos(db, claveApi, ahora, pedir);
  const sinEntrega = await buscarSinEntrega(db, ahora);
  return { eventos, sinEntrega, ...(await avisarVencidas(db, ahora, avisar)) };
}

/**
 * Envío de correos al cliente de una solicitud, compartido por Admin →
 * Solicitudes (envío asistido) y el cron del Worker (vista previa automática).
 *
 * La fila de `notificaciones` (solicitud, tipo, versión) es única y se reserva
 * con un UPDATE condicional, así que dos caminos a la vez (David pulsando
 * «Enviar» y el cron) nunca mandan el mismo correo dos veces.
 */

import type { D1Database } from '@cloudflare/workers-types';
import type { EmailProvider } from '../email/provider';
import { CAMPO_PEDIDO } from './index';
import { correoHtml, prepararCorreo, type DatosCorreo, type TipoCorreo } from './correos';

type Fila = { nombre: string; email: string; producto: string | null; slug: string; campos: string; pedido_public_id: string | null };

export async function datosDe(
  db: D1Database,
  id: string,
  enlace: string,
  pendientes: string,
): Promise<(DatosCorreo & { email: string }) | null> {
  const r = await db
    .prepare('SELECT nombre, email, producto, slug, campos, pedido_public_id FROM solicitudes WHERE public_id = ?')
    .bind(id)
    .first<Fila>();
  if (!r) return null;
  let pedido: string | null = null;
  try {
    pedido = (JSON.parse(r.campos) as Record<string, string>)[CAMPO_PEDIDO] ?? null;
  } catch {
    // campos corruptos: sin número de pedido
  }
  return { email: r.email, nombre: r.nombre, servicio: r.producto ?? r.slug, esPedido: !!r.pedido_public_id, pedido, enlace, datosPendientes: pendientes };
}

export type ResultadoEnvio =
  | { estado: 'enviado' }
  | { estado: 'error'; error: string }
  /** No se reservó: ya enviado, otro envío en curso o sin intentos. */
  | { estado: 'ocupado' };

export interface Envio {
  id: string;
  tipo: TipoCorreo;
  version: number;
  email: string;
  asunto: string;
  texto: string;
  /** Permite volver a mandar uno ya enviado (casilla «Reenviar»). */
  reenviar?: boolean;
  /** Tope de intentos (el cron no reintenta sin fin un correo que rebota). */
  maxIntentos?: number;
  /**
   * Solo reservar si la solicitud sigue en `nueva`/`en_preparacion` con esta nota
   * exacta (cron): si David la movió o reescribió la nota tras la lectura, no se envía.
   */
  exigirNota?: string;
}

/** Una reserva 'enviando' más antigua que esto se da por muerta y se puede reclamar. */
const RESERVA_CADUCA = '-15 minutes';

export async function enviarNotificacion(db: D1Database, mail: EmailProvider | null, e: Envio): Promise<ResultadoEnvio> {
  // Con exigirNota, ni siquiera se crea la fila si la solicitud ya no está como la leyó el cron.
  const sigueIgual = `EXISTS (SELECT 1 FROM solicitudes s WHERE s.public_id = ? AND s.estado IN ('nueva', 'en_preparacion') AND s.nota = ?)`;
  const condicion = e.exigirNota === undefined ? [] : [e.id, e.exigirNota];
  await db
    .prepare(
      `INSERT INTO notificaciones (solicitud_public_id, tipo, version, asunto, cuerpo) SELECT ?, ?, ?, ?, ?
       WHERE ${e.exigirNota === undefined ? '1' : sigueIgual}
       ON CONFLICT (solicitud_public_id, tipo, version) DO NOTHING`,
    )
    .bind(e.id, e.tipo, e.version, e.asunto, e.texto, ...condicion)
    .run();
  // Reserva atómica: solo una petición pasa la fila a 'enviando'. Una reserva
  // caducada (el Worker murió antes del UPDATE final) se reclama sin sumar intento y
  // con el mismo asunto y cuerpo guardados: misma clave de idempotencia y misma carga,
  // así el proveedor no duplica (ni rechaza) un correo que ya aceptó.
  const token = crypto.randomUUID();
  const permitidos = e.reenviar ? `'pendiente', 'error', 'enviado'` : `'pendiente', 'error'`;
  const exigir = e.exigirNota === undefined ? '' : `AND ${sigueIgual}`;
  const reserva = await db
    .prepare(
      `UPDATE notificaciones SET
         asunto = CASE WHEN estado_envio = 'enviando' THEN asunto ELSE ? END,
         cuerpo = CASE WHEN estado_envio = 'enviando' THEN cuerpo ELSE ? END,
         estado_envio = 'enviando', reservado_at = datetime('now'), reserva = ?,
         intentos = intentos + CASE WHEN estado_envio = 'enviando' THEN 0 ELSE 1 END
       WHERE solicitud_public_id = ? AND tipo = ? AND version = ?
         AND ((estado_envio IN (${permitidos}) AND intentos < ?)
           OR (estado_envio = 'enviando' AND COALESCE(reservado_at, '') < datetime('now', '${RESERVA_CADUCA}')))
         ${exigir}
       RETURNING id, intentos, asunto, cuerpo`,
    )
    .bind(
      e.asunto,
      e.texto,
      token,
      e.id,
      e.tipo,
      e.version,
      e.maxIntentos ?? 1_000_000,
      ...condicion,
    )
    .first<{ id: number; intentos: number; asunto: string; cuerpo: string }>();
  if (!reserva) return { estado: 'ocupado' };

  let error: string | null = mail ? null : 'No hay proveedor de correo configurado (Ajustes → Email).';
  if (mail) {
    try {
      await mail.send({
        to: e.email,
        subject: reserva.asunto,
        text: reserva.cuerpo,
        html: correoHtml(reserva.cuerpo),
        idempotencyKey: `notif-${reserva.id}-${reserva.intentos}`,
      });
    } catch (err) {
      error = String((err as Error)?.message ?? err).slice(0, 300);
    }
  }
  // Solo si la reserva sigue siendo esta: si otra la reclamó, su resultado manda.
  const fin = await db
    .prepare(
      `UPDATE notificaciones SET estado_envio = ?, error = ?, enviado_at = CASE WHEN ? IS NULL THEN datetime('now') ELSE enviado_at END
       WHERE id = ? AND reserva = ? RETURNING id`,
    )
    .bind(error ? 'error' : 'enviado', error, error, reserva.id, token)
    .first();
  if (!fin) return { estado: 'ocupado' };
  return error ? { estado: 'error', error } : { estado: 'enviado' };
}

/** Nota que deja la fábrica cuando la vista previa pasó el QA. */
const NOTA_QA_OK = /^Vista previa automática: (https:\/\/\S+) · QA ok$/;
const MAX_INTENTOS_CRON = 3;

/**
 * Cierra el último paso manual de la fábrica: cada solicitud cuya vista previa
 * pasó el QA recibe el correo «revision» y pasa a «Vista previa enviada».
 *
 * Solo toca solicitudes en `nueva`/`en_preparacion` con la nota exacta de la
 * fábrica; si David ya la movió o reescribió la nota, no hace nada. Un correo
 * ya enviado a mano (misma fila de `notificaciones`) no se repite: solo se
 * avanza el estado. Sin proveedor de correo no hace nada, para no quemar
 * intentos. Un correo que falla se reintenta en ticks siguientes hasta
 * MAX_INTENTOS_CRON; después queda en Admin con su error.
 */
export async function enviarVistasPreviasListas(
  db: D1Database,
  mail: EmailProvider | null,
  limite = 10,
): Promise<{ enviadas: string[]; fallidas: string[] }> {
  const res = { enviadas: [] as string[], fallidas: [] as string[] };
  if (!mail) return res;
  const { results } = await db
    .prepare(
      `SELECT public_id, nota FROM solicitudes
       WHERE estado IN ('nueva', 'en_preparacion') AND nota LIKE 'Vista previa automática: https://% · QA ok'
         -- Las agotadas (error tras MAX_INTENTOS_CRON) esperan en Admin y no ocupan el LIMIT.
         AND NOT EXISTS (SELECT 1 FROM notificaciones n WHERE n.solicitud_public_id = solicitudes.public_id
           AND n.tipo = 'revision' AND n.version = 1 AND n.estado_envio = 'error' AND n.intentos >= ?)
       ORDER BY id LIMIT ?`,
    )
    .bind(MAX_INTENTOS_CRON, limite)
    .all<{ public_id: string; nota: string }>();
  for (const { public_id: id, nota } of results ?? []) {
    const enlace = NOTA_QA_OK.exec(nota)?.[1];
    const d = enlace ? await datosDe(db, id, enlace, '') : null;
    const c = d ? prepararCorreo('revision', d) : null;
    if (!d || !c?.ok) continue;
    const r = await enviarNotificacion(db, mail, {
      id,
      tipo: 'revision',
      version: 1,
      email: d.email,
      asunto: c.asunto,
      texto: c.texto,
      maxIntentos: MAX_INTENTOS_CRON,
      exigirNota: nota,
    });
    let enviado = r.estado === 'enviado';
    if (r.estado === 'ocupado') {
      // Ya enviado (a mano o por un tick anterior que murió antes de avanzar).
      const fila = await db
        .prepare("SELECT estado_envio FROM notificaciones WHERE solicitud_public_id = ? AND tipo = 'revision' AND version = 1")
        .bind(id)
        .first<{ estado_envio: string }>();
      enviado = fila?.estado_envio === 'enviado';
    }
    if (!enviado) {
      if (r.estado === 'error') {
        res.fallidas.push(id);
        console.error(`Vista previa ${id}: correo no enviado (${r.error})`);
      }
      continue;
    }
    // Condicional: si David la movió mientras tanto, se respeta su estado.
    await db
      .prepare(
        `UPDATE solicitudes SET estado = 'vista_previa_enviada', updated_at = datetime('now')
         WHERE public_id = ? AND estado IN ('nueva', 'en_preparacion') AND nota = ?`,
      )
      .bind(id, nota)
      .run();
    res.enviadas.push(id);
  }
  return res;
}

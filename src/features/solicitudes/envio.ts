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
import { CAMPO_PEDIDO, type Estado } from './index';
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
  /** Solo reservar si la solicitud sigue en este estado (seguimientos del cron). */
  exigirEstado?: Estado;
}

/** Una reserva 'enviando' más antigua que esto se da por muerta y se puede reclamar. */
const RESERVA_CADUCA = '-15 minutes';

export async function enviarNotificacion(db: D1Database, mail: EmailProvider | null, e: Envio): Promise<ResultadoEnvio> {
  // Con exigirNota/exigirEstado, ni siquiera se crea la fila si la solicitud ya no está como la leyó el cron.
  const partes: string[] = [];
  const condicion: string[] = [];
  if (e.exigirNota !== undefined) {
    partes.push(`EXISTS (SELECT 1 FROM solicitudes s WHERE s.public_id = ? AND s.estado IN ('nueva', 'en_preparacion') AND s.nota = ?)`);
    condicion.push(e.id, e.exigirNota);
  }
  if (e.exigirEstado !== undefined) {
    partes.push('EXISTS (SELECT 1 FROM solicitudes s WHERE s.public_id = ? AND s.estado = ?)');
    condicion.push(e.id, e.exigirEstado);
  }
  const sigueIgual = partes.join(' AND ');
  await db
    .prepare(
      `INSERT INTO notificaciones (solicitud_public_id, tipo, version, asunto, cuerpo) SELECT ?, ?, ?, ?, ?
       WHERE ${sigueIgual || '1'}
       ON CONFLICT (solicitud_public_id, tipo, version) DO NOTHING`,
    )
    .bind(e.id, e.tipo, e.version, e.asunto, e.texto, ...condicion)
    .run();
  // Reserva atómica: solo una petición pasa la fila a 'enviando'. Una reserva
  // caducada (el Worker murió antes del UPDATE final) se reclama sin sumar intento si
  // la carga es la misma: misma clave de idempotencia, así el proveedor no duplica un
  // correo que ya aceptó. Si la carga cambió (otro enlace u otra nota), se manda la
  // actual con un intento nuevo, que también respeta el máximo: nunca se marca como
  // enviado un correo que no es este ni se pasa del tope de intentos.
  const token = crypto.randomUUID();
  const permitidos = e.reenviar ? `'pendiente', 'error', 'enviado'` : `'pendiente', 'error'`;
  const exigir = sigueIgual ? `AND ${sigueIgual}` : '';
  const reserva = await db
    .prepare(
      `UPDATE notificaciones SET
         asunto = ?, cuerpo = ?,
         estado_envio = 'enviando', reservado_at = datetime('now'), reserva = ?,
         intentos = intentos + CASE WHEN estado_envio = 'enviando' AND asunto = ? AND cuerpo = ? THEN 0 ELSE 1 END
       WHERE solicitud_public_id = ? AND tipo = ? AND version = ?
         AND ((estado_envio IN (${permitidos}) AND intentos < ?)
           OR (estado_envio = 'enviando' AND COALESCE(reservado_at, '') < datetime('now', '${RESERVA_CADUCA}')
               AND ((asunto = ? AND cuerpo = ?) OR intentos < ?)))
         ${exigir}
       RETURNING id, intentos, asunto, cuerpo`,
    )
    .bind(
      e.asunto,
      e.texto,
      token,
      e.asunto,
      e.texto,
      e.id,
      e.tipo,
      e.version,
      e.maxIntentos ?? 1_000_000,
      e.asunto,
      e.texto,
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

/** Formato de `datetime('now')` de SQLite, para comparar con `enviado_at`. */
const sqlFecha = (d: Date) => d.toISOString().slice(0, 19).replace('T', ' ');
const DIA_MS = 24 * 3600 * 1000;
/** Días tras la revisión para el recordatorio y para dejarla en espera; tras la entrega, para la reseña. */
export const DIAS_RECORDATORIO = 3;
export const DIAS_ESPERA = 7;
export const DIAS_RESENA = 7;

/** Primer enlace https de un correo ya enviado (el de la versión que se está revisando). */
const enlaceDe = (cuerpo: string) => /https:\/\/[^\s<>]+/.exec(cuerpo)?.[0] ?? '';

interface Paso {
  tipo: TipoCorreo;
  /** Correo del que cuentan los días; el seguimiento lleva su misma versión. */
  base: TipoCorreo;
  /** Estado en que ese correo dejó la solicitud: si cambió, el cliente respondió o David la movió. */
  estado: Estado;
  dias: number;
  /** Días a partir de los cuales ya no se manda (lo sustituye otro seguimiento). */
  hasta?: number;
  /** Estado al que pasa tras enviarlo (solo si sigue en `estado`). */
  despues?: Estado;
  /** Seguimientos de la misma versión que hacen innecesario este. */
  salvo?: TipoCorreo;
}

/**
 * Seguimiento automático según el último correo que recibió el cliente:
 * - revisión enviada hace 3 días sin respuesta → «recordatorio» (una vez por versión);
 * - revisión enviada hace 7 días sin respuesta → «espera» y la solicitud pasa a en espera;
 * - entregada hace 7 días y con `resena_url` → «resena» (una vez).
 * «Sin respuesta» = la solicitud sigue en el estado que dejó ese correo: si David la movió
 * (cambios, aprobada…), no sale nada. Nada se aprueba ni se cobra por silencio.
 * Cada correo es una fila única de `notificaciones` (solicitud, tipo, versión): dos ticks o
 * un envío a mano a la vez no lo duplican, y un fallo se reintenta hasta MAX_INTENTOS_CRON.
 */
export async function enviarSeguimientos(
  db: D1Database,
  mail: EmailProvider | null,
  ahora: Date,
  resenaUrl: string | null,
  limite = 10,
): Promise<{ enviadas: string[]; fallidas: string[] }> {
  const res = { enviadas: [] as string[], fallidas: [] as string[] };
  if (!mail) return res;
  const hace = (dias: number) => sqlFecha(new Date(ahora.getTime() - dias * DIA_MS));
  // La espera primero: con 7 días cumplidos el recordatorio ya no tiene sentido.
  const pasos: Paso[] = [
    { tipo: 'espera', base: 'revision', estado: 'vista_previa_enviada', dias: DIAS_ESPERA, despues: 'en_espera_cliente' },
    // `hasta`: aunque la espera no saliera (lote lleno, fallo), el recordatorio caduca al día 7.
    { tipo: 'recordatorio', base: 'revision', estado: 'vista_previa_enviada', dias: DIAS_RECORDATORIO, hasta: DIAS_ESPERA, salvo: 'espera' },
  ];
  if (resenaUrl && /^https:\/\/\S+$/.test(resenaUrl)) {
    pasos.push({ tipo: 'resena', base: 'entregado', estado: 'entregada', dias: DIAS_RESENA });
  }
  for (const p of pasos) {
    if (p.despues) {
      // Reparación: correo enviado pero el cambio de estado no llegó a guardarse (el Worker
      // murió entre los dos). Solo si nadie tocó la solicitud después del correo y es el de
      // la última versión enviada del correo base.
      await db
        .prepare(
          `UPDATE solicitudes SET estado = ?, updated_at = datetime('now')
           WHERE estado = ? AND EXISTS (SELECT 1 FROM notificaciones x
             WHERE x.solicitud_public_id = solicitudes.public_id AND x.tipo = ? AND x.estado_envio = 'enviado'
               AND x.enviado_at >= solicitudes.updated_at
               AND x.version = (SELECT MAX(m.version) FROM notificaciones m WHERE m.solicitud_public_id = x.solicitud_public_id
                 AND m.tipo = ? AND m.estado_envio = 'enviado'))`,
        )
        .bind(p.despues, p.estado, p.tipo, p.base)
        .run();
    }
    // Último correo base enviado de cada solicitud que sigue en su estado. Las agotadas
    // (error tras MAX_INTENTOS_CRON) esperan en Admin y no ocupan el LIMIT; una reserva
    // «enviando» caducada sí vuelve a salir, para que enviarNotificacion la reclame.
    const { results } = await db
      .prepare(
        `SELECT n.solicitud_public_id AS id, n.version, n.cuerpo FROM notificaciones n
         JOIN solicitudes s ON s.public_id = n.solicitud_public_id
         WHERE n.tipo = ? AND n.estado_envio = 'enviado' AND n.enviado_at <= ? AND n.enviado_at > ? AND s.estado = ?
           AND n.version = (SELECT MAX(m.version) FROM notificaciones m
             WHERE m.solicitud_public_id = n.solicitud_public_id AND m.tipo = n.tipo AND m.estado_envio = 'enviado')
           AND NOT EXISTS (SELECT 1 FROM notificaciones x WHERE x.solicitud_public_id = n.solicitud_public_id
             AND x.version = n.version AND (x.tipo = ? AND (x.estado_envio = 'enviado' OR (x.estado_envio = 'error' AND x.intentos >= ?)) OR x.tipo = ?))
         ORDER BY n.enviado_at LIMIT ?`,
      )
      .bind(p.base, hace(p.dias), p.hasta ? hace(p.hasta) : '', p.estado, p.tipo, MAX_INTENTOS_CRON, p.salvo ?? '', limite)
      .all<{ id: string; version: number; cuerpo: string }>();
    for (const { id, version, cuerpo } of results ?? []) {
      const enlace = p.tipo === 'resena' ? (resenaUrl as string) : enlaceDe(cuerpo);
      const d = await datosDe(db, id, enlace, '');
      const c = d ? prepararCorreo(p.tipo, d) : null;
      if (!d || !c?.ok) continue;
      const r = await enviarNotificacion(db, mail, {
        id,
        tipo: p.tipo,
        version,
        email: d.email,
        asunto: c.asunto,
        texto: c.texto,
        maxIntentos: MAX_INTENTOS_CRON,
        exigirEstado: p.estado,
      });
      if (r.estado === 'error') {
        res.fallidas.push(`${id}:${p.tipo}`);
        console.error(`Seguimiento ${p.tipo} de ${id}: correo no enviado (${r.error})`);
      }
      if (r.estado !== 'enviado') continue;
      if (p.despues) {
        // Condicional: si David la movió mientras salía el correo, manda su estado.
        await db
          .prepare("UPDATE solicitudes SET estado = ?, updated_at = datetime('now') WHERE public_id = ? AND estado = ?")
          .bind(p.despues, id, p.estado)
          .run();
      }
      res.enviadas.push(`${id}:${p.tipo}`);
    }
  }
  return res;
}

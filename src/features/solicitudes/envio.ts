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
import type { Firmador } from './decision';

type Fila = { nombre: string; email: string; producto: string | null; slug: string; campos: string; pedido_public_id: string | null };

export async function datosDe(
  db: D1Database,
  id: string,
  enlace: string,
  pendientes: string,
  /** Firma el enlace «Aprobar / Pedir cambios» (sin él, el correo pide responder). */
  firmar?: Firmador | null,
  /** Versión de la vista previa que decide el enlace (por defecto, la última revisión enviada). */
  version?: number,
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
  let v = version;
  if (firmar && !v) {
    const u = await db
      .prepare("SELECT MAX(version) AS v FROM notificaciones WHERE solicitud_public_id = ? AND tipo = 'revision' AND estado_envio = 'enviado'")
      .bind(id)
      .first<{ v: number | null }>()
      .catch(() => null);
    v = u?.v ?? 1;
  }
  const enlaceDecision = firmar ? await firmar(id, v ?? 1) : null;
  return { email: r.email, nombre: r.nombre, servicio: r.producto ?? r.slug, esPedido: !!r.pedido_public_id, pedido, enlace, enlaceDecision, datosPendientes: pendientes };
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
  /** Estados en los que vale exigirNota (por defecto, los de la vista previa). */
  estadosNota?: readonly string[];
  /** Solo reservar si la solicitud sigue en este estado (seguimientos del cron). */
  exigirEstado?: Estado;
  /**
   * Solo reservar si no se ha enviado una versión posterior de este correo base
   * (seguimientos: si David mandó la v2 durante el barrido, el de la v1 ya no sale).
   */
  exigirUltima?: { tipo: TipoCorreo; version: number };
}

/** Una reserva 'enviando' más antigua que esto se da por muerta y se puede reclamar. */
const RESERVA_CADUCA = '-15 minutes';

export async function enviarNotificacion(db: D1Database, mail: EmailProvider | null, e: Envio): Promise<ResultadoEnvio> {
  // Con exigirNota/exigirEstado, ni siquiera se crea la fila si la solicitud ya no está como la leyó el cron.
  const partes: string[] = [];
  const condicion: (string | number)[] = [];
  if (e.exigirNota !== undefined) {
    const estados = e.estadosNota ?? ['nueva', 'en_preparacion'];
    partes.push(`EXISTS (SELECT 1 FROM solicitudes s WHERE s.public_id = ? AND s.estado IN (${estados.map(() => '?').join(', ')}) AND s.nota = ?)`);
    condicion.push(e.id, ...estados, e.exigirNota);
  }
  if (e.exigirEstado !== undefined) {
    partes.push('EXISTS (SELECT 1 FROM solicitudes s WHERE s.public_id = ? AND s.estado = ?)');
    condicion.push(e.id, e.exigirEstado);
  }
  if (e.exigirUltima !== undefined) {
    partes.push(`NOT EXISTS (SELECT 1 FROM notificaciones b WHERE b.solicitud_public_id = ? AND b.tipo = ? AND b.estado_envio = 'enviado' AND b.version > ?)`);
    condicion.push(e.id, e.exigirUltima.tipo, e.exigirUltima.version);
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
  // Un reenvío puede fallar sobre un correo que ya se entregó: entonces se conserva la
  // última entrega aceptada (estado, fecha y contenido) y el fallo solo queda anotado, para
  // que los seguimientos sigan viendo esa versión como enviada.
  // La reserva exige que esa entrega siga siendo la leída: si otro reenvío la cambió entre
  // medias, restaurar la vieja mezclaría su contenido con la fecha nueva. Se vuelve a leer.
  type Previo = { asunto: string; cuerpo: string; enviado_at: string | null };
  const leerPrevio = () =>
    db
      .prepare("SELECT asunto, cuerpo, enviado_at FROM notificaciones WHERE solicitud_public_id = ? AND tipo = ? AND version = ? AND estado_envio = 'enviado'")
      .bind(e.id, e.tipo, e.version)
      .first<Previo>();
  const permitidos = e.reenviar ? `'pendiente', 'error', 'enviado'` : `'pendiente', 'error'`;
  const exigir = sigueIgual ? `AND ${sigueIgual}` : '';
  let previo: Previo | null = e.reenviar ? await leerPrevio() : null;
  let reserva = await reservar(previo);
  for (let i = 0; !reserva && e.reenviar && i < 2; i++) {
    const ahora = await leerPrevio();
    if (JSON.stringify(ahora) === JSON.stringify(previo)) break;
    previo = ahora;
    reserva = await reservar(previo);
  }
  if (!reserva) return { estado: 'ocupado' };

  function reservar(leido: Previo | null) {
    const mismaEntrega = !e.reenviar
      ? ''
      : leido
        ? `AND (estado_envio <> 'enviado' OR (asunto = ? AND cuerpo = ? AND enviado_at IS ?))`
        : `AND estado_envio <> 'enviado'`;
    const entrega = e.reenviar && leido ? [leido.asunto, leido.cuerpo, leido.enviado_at] : [];
    return db
      .prepare(
        `UPDATE notificaciones SET
           asunto = ?, cuerpo = ?,
           estado_envio = 'enviando', reservado_at = datetime('now'), reserva = ?,
           intentos = intentos + CASE WHEN estado_envio = 'enviando' AND asunto = ? AND cuerpo = ? THEN 0 ELSE 1 END
         WHERE solicitud_public_id = ? AND tipo = ? AND version = ?
           AND ((estado_envio IN (${permitidos}) AND intentos < ?)
             OR (estado_envio = 'enviando' AND COALESCE(reservado_at, '') < datetime('now', '${RESERVA_CADUCA}')
                 AND ((asunto = ? AND cuerpo = ?) OR intentos < ?)))
           ${exigir} ${mismaEntrega}
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
        ...entrega,
      )
      .first<{ id: number; intentos: number; asunto: string; cuerpo: string }>();
  }

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
  const fin =
    error && previo
      ? await db
          .prepare(
            `UPDATE notificaciones SET estado_envio = 'enviado', asunto = ?, cuerpo = ?, error = ?
             WHERE id = ? AND reserva = ? RETURNING id`,
          )
          .bind(previo.asunto, previo.cuerpo, `Reenvío fallido (sigue valiendo el envío anterior): ${error}`.slice(0, 300), reserva.id, token)
          .first()
      : await db
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
/** Nota que deja manual/fabrica/entregar.py cuando el ZIP de la web está subido. */
const NOTA_ENTREGA = /^Entrega automática: (https:\/\/\S+) · lista$/;
const MAX_INTENTOS_CRON = 3;
/** Marca que añade la fábrica al mensaje en cada ronda de cambios (manual/fabrica/vistas-previas.py). */
const RONDA_RE = /Cambios pedidos sobre la versión (\d+):/g;

/** Versión de la revisión que toca mandar: la siguiente a la última sobre la que se pidieron cambios. */
export function versionRevision(mensaje: string | null): number {
  let v = 1;
  for (const m of (mensaje ?? '').matchAll(RONDA_RE)) v = Math.max(v, Math.min(Number(m[1]) + 1, 20));
  return v;
}

/** Un paso automático del cron: nota de la fábrica -> correo -> estado siguiente. */
type PasoListo = {
  desde: readonly string[];
  like: string;
  nota: RegExp;
  tipo: 'revision' | 'entregado';
  hasta: string;
  etiqueta: string;
};

const VISTA_PREVIA: PasoListo = {
  // en_preparacion también cubre la vista previa rehecha tras «pedir cambios» (versión siguiente).
  desde: ['nueva', 'en_preparacion'],
  like: 'Vista previa automática: https://% · QA ok',
  nota: NOTA_QA_OK,
  tipo: 'revision',
  hasta: 'vista_previa_enviada',
  etiqueta: 'Vista previa',
};

const ENTREGA: PasoListo = {
  desde: ['pagada'],
  like: 'Entrega automática: https://% · lista',
  nota: NOTA_ENTREGA,
  tipo: 'entregado',
  hasta: 'entregada',
  etiqueta: 'Entrega',
};

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
export function enviarVistasPreviasListas(
  db: D1Database,
  mail: EmailProvider | null,
  limite = 10,
  firmar?: Firmador | null,
): Promise<{ enviadas: string[]; fallidas: string[] }> {
  return enviarListos(db, mail, VISTA_PREVIA, limite, firmar);
}

/**
 * Lo mismo para la entrega: una solicitud `pagada` con el ZIP subido por
 * manual/fabrica/entregar.py recibe el correo «entregado» con el enlace de
 * descarga y pasa a «Entregada».
 */
export function enviarEntregasListas(
  db: D1Database,
  mail: EmailProvider | null,
  limite = 10,
): Promise<{ enviadas: string[]; fallidas: string[] }> {
  return enviarListos(db, mail, ENTREGA, limite, null);
}

async function enviarListos(
  db: D1Database,
  mail: EmailProvider | null,
  paso: PasoListo,
  limite: number,
  firmar?: Firmador | null,
): Promise<{ enviadas: string[]; fallidas: string[] }> {
  const res = { enviadas: [] as string[], fallidas: [] as string[] };
  if (!mail) return res;
  const desde = paso.desde.map(() => '?').join(', ');
  const { results } = await db
    .prepare(
      `SELECT public_id, nota, mensaje FROM solicitudes
       WHERE estado IN (${desde}) AND nota LIKE ?
         -- Las agotadas (error tras MAX_INTENTOS_CRON) esperan en Admin y no ocupan el LIMIT.
         AND NOT EXISTS (SELECT 1 FROM notificaciones n WHERE n.solicitud_public_id = solicitudes.public_id
           AND n.tipo = ? AND n.estado_envio = 'error' AND n.intentos >= ?)
       ORDER BY id LIMIT ?`,
    )
    .bind(...paso.desde, paso.like, paso.tipo, MAX_INTENTOS_CRON, limite)
    .all<{ public_id: string; nota: string; mensaje: string | null }>();
  for (const { public_id: id, nota, mensaje } of results ?? []) {
    const version = paso.tipo === 'revision' ? versionRevision(mensaje) : 1;
    const enlace = paso.nota.exec(nota)?.[1];
    const d = enlace ? await datosDe(db, id, enlace, '', firmar, version) : null;
    const c = d ? prepararCorreo(paso.tipo, d) : null;
    if (!d || !c?.ok) continue;
    const r = await enviarNotificacion(db, mail, {
      id,
      tipo: paso.tipo,
      version,
      email: d.email,
      asunto: c.asunto,
      texto: c.texto,
      maxIntentos: MAX_INTENTOS_CRON,
      exigirNota: nota,
      estadosNota: paso.desde,
    });
    let enviado = r.estado === 'enviado';
    if (r.estado === 'ocupado') {
      // Ya enviado (a mano o por un tick anterior que murió antes de avanzar).
      const fila = await db
        .prepare('SELECT estado_envio FROM notificaciones WHERE solicitud_public_id = ? AND tipo = ? AND version = ?')
        .bind(id, paso.tipo, version)
        .first<{ estado_envio: string }>();
      enviado = fila?.estado_envio === 'enviado';
    }
    if (!enviado) {
      if (r.estado === 'error') {
        res.fallidas.push(id);
        console.error(`${paso.etiqueta} ${id}: correo no enviado (${r.error})`);
      }
      continue;
    }
    // Condicional: si David la movió mientras tanto, se respeta su estado.
    await db
      .prepare(
        `UPDATE solicitudes SET estado = ?, updated_at = datetime('now')
         WHERE public_id = ? AND estado IN (${desde}) AND nota = ?`,
      )
      .bind(paso.hasta, id, ...paso.desde, nota)
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

/** Primer enlace http(s) de un correo ya enviado (el de la versión que se está revisando; mismos protocolos que admite prepararCorreo). */
const enlaceDe = (cuerpo: string) => /https?:\/\/[^\s<>]+/.exec(cuerpo)?.[0] ?? '';

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
  firmar?: Firmador | null,
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
      // murió entre los dos). Solo si nadie tocó la solicitud después del correo (estrictamente
      // después: con la misma marca no se sabe quién fue antes y no se repara) y es el de la
      // última versión enviada del correo base.
      await db
        .prepare(
          `UPDATE solicitudes SET estado = ?, updated_at = datetime('now')
           WHERE estado = ? AND EXISTS (SELECT 1 FROM notificaciones x
             WHERE x.solicitud_public_id = solicitudes.public_id AND x.tipo = ? AND x.estado_envio = 'enviado'
               AND x.enviado_at > solicitudes.updated_at
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
      const d = await datosDe(db, id, enlace, '', p.base === 'revision' ? firmar : null, version);
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
        exigirUltima: { tipo: p.base, version },
      });
      if (r.estado === 'ocupado') {
        // Reserva del último intento caducada que no se puede reclamar (la carga cambió, p. ej.
        // otra resena_url): pasa a error agotado para que Admin la vea y no ocupe el lote siempre.
        await db
          .prepare(
            `UPDATE notificaciones SET estado_envio = 'error', error = 'Reserva caducada con otra carga: revisar y reenviar a mano'
             WHERE solicitud_public_id = ? AND tipo = ? AND version = ? AND estado_envio = 'enviando' AND intentos >= ?
               AND COALESCE(reservado_at, '') < datetime('now', '${RESERVA_CADUCA}')`,
          )
          .bind(id, p.tipo, version, MAX_INTENTOS_CRON)
          .run();
      }
      if (r.estado === 'error') {
        res.fallidas.push(`${id}:${p.tipo}`);
        console.error(`Seguimiento ${p.tipo} de ${id}: correo no enviado (${r.error})`);
      }
      if (r.estado !== 'enviado') continue;
      if (p.despues) {
        // Condicional: si David la movió mientras salía el correo, manda su estado.
        await db
          .prepare(
            `UPDATE solicitudes SET estado = ?, updated_at = datetime('now') WHERE public_id = ? AND estado = ?
               AND NOT EXISTS (SELECT 1 FROM notificaciones b WHERE b.solicitud_public_id = ? AND b.tipo = ? AND b.estado_envio = 'enviado' AND b.version > ?)`,
          )
          .bind(p.despues, id, p.estado, id, p.base, version)
          .run();
      }
      res.enviadas.push(`${id}:${p.tipo}`);
    }
  }
  return res;
}

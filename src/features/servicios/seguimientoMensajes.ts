/**
 * Seguimiento de los mensajes del formulario de las webs, sin CRM que aprender:
 * - estado de cada mensaje (nuevo → contestado → ganado / perdido), que pasa a «contestado»
 *   solo al pulsar un botón de respuesta del panel;
 * - un único recordatorio al dueño si un mensaje lleva 2 h sin contestar (cron del Worker);
 * - respuestas guardadas por sector para WhatsApp o correo;
 * - cifras del mes para el panel.
 */
import type { D1Database } from '@cloudflare/workers-types';
import type { EmailMessage } from '../email';
import { emailShell, escapeHtml } from '../email/layout';
import { correoDueno, type MensajeCliente } from './mensajesWeb';

export const ESTADOS_MENSAJE = ['nuevo', 'contestado', 'ganado', 'perdido'] as const;
export type EstadoMensaje = (typeof ESTADOS_MENSAJE)[number];
export const esEstadoMensaje = (v: unknown): v is EstadoMensaje => (ESTADOS_MENSAJE as readonly unknown[]).includes(v);

export const NOMBRE_ESTADO: Record<EstadoMensaje, string> = {
  nuevo: 'Sin contestar',
  contestado: 'Contestado',
  ganado: 'Cliente ganado',
  perdido: 'No salió',
};

/** Las webs del cliente: el dueño solo cambia sus propios mensajes. */
const DE_CLIENTE = `SELECT p.slug FROM paginas_publicadas p JOIN orders o ON o.public_id = p.pedido_public_id WHERE p.tipo = 'web' AND o.email = ?`;

/**
 * Cambia el estado de un mensaje del cliente. Solo «contestado» fecha la primera respuesta
 * (cerrar sin contestar no cuenta en el tiempo medio). Con `automatico` (pulsar un botón de
 * responder) un ganado o perdido no vuelve a «contestado»; el «Deshacer» del dueño sí lo cambia.
 */
export async function cambiarEstadoMensaje(db: D1Database, email: string, id: string, estado: EstadoMensaje, automatico = false): Promise<boolean> {
  const r = await db
    .prepare(
      `UPDATE webs_mensajes
          SET estado = CASE WHEN ?4 = 1 AND ?1 = 'contestado' AND estado IN ('ganado', 'perdido') THEN estado ELSE ?1 END,
              contestado = CASE WHEN ?1 = 'contestado' THEN COALESCE(contestado, datetime('now')) ELSE contestado END
        WHERE id = ?2 AND slug IN (${DE_CLIENTE.replace('?', '?3')})`,
    )
    .bind(estado, id, email, automatico ? 1 : 0)
    .run();
  return (r.meta?.changes ?? 0) > 0;
}

export interface ResumenMensajes {
  mensajes: number;
  sinContestar: number;
  /** Minutos de media hasta la primera respuesta; null si aún no hay ninguna. */
  minutosRespuesta: number | null;
  ganados: number;
}

/** Cifras de los últimos 30 días para la cabecera de «Mensajes de tu web». */
export async function resumenMensajes(db: D1Database, email: string, ahora = Date.now()): Promise<ResumenMensajes> {
  const r = await db
    .prepare(
      `SELECT COUNT(*) AS mensajes,
              COALESCE(SUM(estado = 'nuevo'), 0) AS sinContestar,
              COALESCE(SUM(estado = 'ganado'), 0) AS ganados,
              AVG(CASE WHEN contestado IS NOT NULL THEN (julianday(contestado) - julianday(creado)) * 1440 END) AS minutos
         FROM webs_mensajes
        WHERE creado >= ? AND slug IN (${DE_CLIENTE})`,
    )
    .bind(fechaSql(ahora - 30 * 86_400_000), email)
    .first<{ mensajes: number; sinContestar: number; ganados: number; minutos: number | null }>();
  return {
    mensajes: Number(r?.mensajes ?? 0),
    sinContestar: Number(r?.sinContestar ?? 0),
    ganados: Number(r?.ganados ?? 0),
    minutosRespuesta: r?.minutos == null ? null : Math.max(0, Math.round(r.minutos)),
  };
}

/** «12 min», «3 h», «2 días»: cómo se lee un tiempo de respuesta. */
export function duracionLegible(minutos: number): string {
  if (minutos < 60) return `${minutos} min`;
  const h = Math.round(minutos / 60);
  if (h < 48) return `${h} h`;
  return `${Math.round(h / 24)} días`;
}

/** El formato de `datetime('now')` de SQLite, en UTC, para comparar con `creado`. */
export const fechaSql = (ms: number) => new Date(ms).toISOString().slice(0, 19).replace('T', ' ');

// ── Respuestas guardadas ─────────────────────────────────────────────────────

type Sector = 'peluqueria' | 'bar' | 'oficios' | 'clinica' | 'general';

/** Lo que sigue a «Hola {nombre}, »; {negocio} se rellena con el nombre de la web. */
const PLANTILLAS: Record<Sector, string[]> = {
  peluqueria: [
    'gracias por escribir a {negocio}. ¿Qué servicio quieres y qué día te viene bien?',
    'para buscarte hueco, ¿te va mejor por la mañana o por la tarde?',
    'esta semana tenemos huecos. Dime qué te quieres hacer y te confirmo hora.',
  ],
  bar: [
    'gracias por escribir a {negocio}. ¿Para cuántas personas y a qué hora sería?',
    '¿qué día queréis venir? Te confirmo enseguida si hay mesa.',
    'claro que sí. Si es para un grupo o una celebración, cuéntame qué tenías pensado y te digo opciones.',
  ],
  oficios: [
    'gracias por escribir a {negocio}. ¿En qué zona estás y qué ha pasado exactamente?',
    'si puedes, mándame una foto de la avería por aquí y te digo qué haría falta y cuándo puedo pasar.',
    'puedo pasar a verlo. ¿Qué día y franja te viene bien?',
  ],
  clinica: [
    'gracias por escribir a {negocio}. ¿Qué te gustaría consultar y qué horario te encaja?',
    'podemos darte cita esta semana. ¿Prefieres mañana o tarde?',
    'para orientarte mejor, ¿es la primera vez que vienes o ya eres paciente?',
  ],
  general: [
    'gracias por escribir a {negocio}. Cuéntame un poco más y te digo cómo te podemos ayudar.',
    '¿cuándo te viene bien que hablemos? Te llamo cuando me digas.',
    'te paso la información que me pides. Si tienes cualquier duda, escríbeme por aquí.',
  ],
};

const SECTORES: [RegExp, Sector][] = [
  [/pelu|barber|estétic|estetic|uñas|manicur|belleza|maquill/i, 'peluqueria'],
  [/\bbar\b|restaur|cafeter|tasca|taberna|cervecer|pizzer|bistr|asador|marisquer|vinoteca/i, 'bar'],
  [/fontaner|electric|cerrajer|reforma|albañil|pintor|carpinter|climatiz|calefac|persian|cristaler|manitas|jardiner|limpieza/i, 'oficios'],
  [/clínic|clinic|dent|fisio|psic|podólog|podolog|nutric|veterin|óptic|optic|osteop|médic|medic/i, 'clinica'],
];

export function sectorDe(texto: string): Sector {
  return SECTORES.find(([re]) => re.test(texto))?.[1] ?? 'general';
}

/** Las tres respuestas del sector, con el saludo y el negocio ya puestos. */
export function respuestasGuardadas(m: Pick<MensajeCliente, 'nombre'>, negocio: string, sector: string): string[] {
  const hola = `Hola${m.nombre.trim() ? ` ${m.nombre.trim()}` : ''}, `;
  return PLANTILLAS[sectorDe(sector || negocio)].map((p) =>
    hola + (negocio ? p.replaceAll('{negocio}', negocio) : p.replace(' a {negocio}', '').replaceAll('{negocio}', 'nosotros')),
  );
}

// ── Recordatorio al dueño ────────────────────────────────────────────────────

export const HORAS_RECORDATORIO = 2;
/** Más viejos que esto no se recuerdan: ya no es «se te ha pasado», es otra cosa. */
const DIAS_MAXIMO = 3;
const ZONA = 'Europe/Madrid';

/** Hora local de Madrid; fuera de 9 a 21 el recordatorio espera a la mañana. */
export function horaMadrid(ms: number): number {
  return Number(new Intl.DateTimeFormat('en-GB', { timeZone: ZONA, hour: '2-digit', hourCycle: 'h23' }).format(ms));
}

interface Pendiente {
  id: string;
  slug: string;
  nombre: string;
  contacto: string;
  texto: string;
}

export function correoRecordatorio(para: string, negocio: string, ms: Pendiente[], panel: string, tienda: string): EmailMessage {
  const n = ms.length;
  const subject = n === 1 ? `${ms[0]!.nombre || 'Alguien'} sigue esperando tu respuesta` : `${n} personas siguen esperando tu respuesta`;
  const linea = (m: Pendiente) => `${m.nombre || 'Sin nombre'} (${m.contacto}): ${m.texto.length > 140 ? `${m.texto.slice(0, 140)}…` : m.texto}`;
  const intro = `Te escribieron desde tu web${negocio ? ` (${negocio})` : ''} hace más de ${HORAS_RECORDATORIO} horas y aún no has contestado. Quien responde antes suele quedarse el cliente.`;
  const text = `${intro}\n\n${ms.map((m) => `- ${linea(m)}`).join('\n')}\n\nContesta desde tu panel: ${panel}`;
  const cuerpo = `<p style="margin:16px 0 12px">${escapeHtml(intro)}</p>
<ul style="margin:0 0 16px;padding-left:20px">${ms.map((m) => `<li style="margin:0 0 8px">${escapeHtml(linea(m))}</li>`).join('')}</ul>
<p style="margin:0"><a href="${escapeHtml(panel)}">Contestar desde tu panel</a></p>`;
  const html = emailShell({ storeName: tienda, heading: 'Tienes mensajes sin contestar', subheading: negocio ? escapeHtml(negocio) : undefined, body: cuerpo });
  return { to: para, subject, html, text, idempotencyKey: claveGrupo(ms.map((m) => m.id)) };
}

/** Clave de longitud fija para un grupo de mensajes (Resend admite 256 caracteres como mucho). */
export function claveGrupo(ids: string[]): string {
  const todo = [...ids].sort((a, b) => a.localeCompare(b)).join(',');
  // Dos FNV-1a de 32 bits con semillas distintas: determinista, síncrono y sin choques prácticos.
  const fnv = (semilla: number) => {
    let h = semilla;
    for (let i = 0; i < todo.length; i++) h = Math.imul(h ^ todo.charCodeAt(i), 16777619) >>> 0;
    return h.toString(16).padStart(8, '0');
  };
  return `web-recordatorio/${ids.length}/${fnv(2166136261)}${fnv(0x9747b28c)}`;
}

/**
 * Un recordatorio por mensaje, agrupado por web: se reserva marcando `recordado` antes de enviar
 * (dos pasadas del cron no recuerdan el mismo) y se libera si el envío falla, para reintentarlo.
 */
export async function recordarMensajes(
  db: D1Database,
  enviar: (m: EmailMessage) => Promise<unknown>,
  panel: string,
  tienda: string,
  ahora = Date.now(),
): Promise<number> {
  const inicio = Date.now();
  const enHorario = () => {
    // El reloj sigue corriendo mientras se envía: el último correo tampoco sale pasadas las 21.
    const h = horaMadrid(ahora + (Date.now() - inicio));
    return h >= 9 && h < 21;
  };
  if (!enHorario()) return 0;
  const { results } = await db
    .prepare(
      `SELECT id, slug, nombre, contacto, texto FROM webs_mensajes
        WHERE estado = 'nuevo' AND recordado IS NULL AND creado <= ? AND creado >= ?
        ORDER BY creado LIMIT 50`,
    )
    .bind(fechaSql(ahora - HORAS_RECORDATORIO * 3_600_000), fechaSql(ahora - DIAS_MAXIMO * 86_400_000))
    .all<Pendiente>();
  const porWeb = new Map<string, Pendiente[]>();
  for (const m of results ?? []) porWeb.set(m.slug, [...(porWeb.get(m.slug) ?? []), m]);
  const marca = fechaSql(ahora);
  let enviados = 0;
  for (const [slug, todos] of porWeb) {
    if (!enHorario()) break;
    const reservas = await db.batch(todos.map((m) => db.prepare(`UPDATE webs_mensajes SET recordado = ? WHERE id = ? AND recordado IS NULL AND estado = 'nuevo'`).bind(marca, m.id)));
    const mios = todos.filter((_, i) => (reservas[i]?.meta?.changes ?? 0) > 0);
    if (!mios.length) continue;
    try {
      const dueno = await correoDueno(db, slug);
      if (!dueno) continue; // sin correo al que avisar: queda marcado y no se reintenta cada 5 min
      await enviar(correoRecordatorio(dueno.email, dueno.negocio, mios, panel, tienda));
      enviados++;
    } catch (e) {
      console.error('Recordatorio de mensajes: envío fallido', e instanceof Error ? e.message : 'error');
      await db.batch(mios.map((m) => db.prepare('UPDATE webs_mensajes SET recordado = NULL WHERE id = ? AND recordado = ?').bind(m.id, marca)));
    }
  }
  return enviados;
}

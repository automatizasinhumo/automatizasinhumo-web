/**
 * Petición de reseña tras una cita hecha desde la web publicada (lo que Booksy o Fresha
 * venden como «reseñas automáticas»).
 *
 * - Un único correo 72 h después de terminar la cita; pasados 7 días ya no se pide.
 * - El mismo correo para todo el mundo: sin preguntar antes si quedó contento ni ofrecer nada
 *   a cambio (lo que prohíben las normas de contenido de Google Maps).
 * - Destino: el enlace de opiniones que el negocio pone en su web (DatosWeb.opinionesUrl).
 *   Un enlace de Maps con Place ID o con id «0x…:0x…» se convierte en el enlace directo
 *   «Escribir una reseña»; uno corto (maps.app.goo.gl) se resuelve siguiendo redirecciones,
 *   solo hacia Google. La conversión del id de Maps sigue Iverium/google-reviewlink (MIT).
 * - Como mucho una vez: la cita se reclama con un UPDATE condicional antes de enviar y un
 *   fallo la deja en «fallida», sin reintentos (ronda 36 de GPT).
 */
import type { D1Database } from '@cloudflare/workers-types';
import { emailShell, escapeHtml } from '../email/layout';
import type { EmailMessage, EmailProvider } from '../email';
import { cuandoTexto } from './citasWeb';

const HORA = 3_600_000;
export const ESPERA_RESENA = 72 * HORA;
export const VENTANA_RESENA = 7 * 24 * HORA;

const GOOGLE = /^(?:(?:www|maps|search|consent)\.)?google\.(?:com|[a-z]{2,3}(?:\.[a-z]{2})?)$/i;
const CORTOS = new Set(['maps.app.goo.gl', 'goo.gl', 'g.co', 'share.google']);
const PLACE_ID = /^(?:ChIJ|GhIJ|EiQ|Ei[A-Za-z0-9])[A-Za-z0-9_-]{10,}$/;
const PLACE_ID_EN_TEXTO = /place_?id[=:]((?:ChIJ|GhIJ|EiQ|Ei[A-Za-z0-9])[A-Za-z0-9_-]{10,})/i;

function https(raw: string): URL | null {
  let v = raw.trim();
  if (!v || v.length > 2048 || v.startsWith('//')) return null;
  if (/^[a-z][a-z0-9+.-]*:/i.test(v)) {
    if (!/^https:\/\//i.test(v)) return null;
  } else v = `https://${v}`;
  try {
    const u = new URL(v);
    return u.protocol === 'https:' && !u.username && !u.password && !u.port ? u : null;
  } catch {
    return null;
  }
}

const esGoogle = (host: string) => GOOGLE.test(host) || host === 'g.page' || CORTOS.has(host);

/** Place ID a partir del id de Maps «0xAAA:0xBBB» (protobuf con dos fixed64, en Base64 URL). */
export function placeIdDeFeature(alto: string, bajo: string): string | null {
  try {
    const bytes = new Uint8Array(20);
    const v = new DataView(bytes.buffer);
    bytes.set([0x0a, 0x12, 0x09], 0);
    v.setBigUint64(3, BigInt(alto), true);
    bytes[11] = 0x11;
    v.setBigUint64(12, BigInt(bajo), true);
    return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch {
    return null;
  }
}

function placeId(u: URL): string | null {
  for (const [k, v] of u.searchParams) {
    if (['placeid', 'place_id', 'query_place_id'].includes(k.toLowerCase()) && PLACE_ID.test(v)) return v;
  }
  let t = u.href;
  try {
    t = decodeURIComponent(t);
  } catch {
    /* se busca en la URL tal cual */
  }
  const directo = t.match(PLACE_ID_EN_TEXTO);
  if (directo) return directo[1];
  const f = t.match(/(0x[0-9a-f]{1,16}):(0x[0-9a-f]{1,16})/i);
  return f ? placeIdDeFeature(f[1], f[2]) : null;
}

const escribirResena = (id: string) => `https://search.google.com/local/writereview?placeid=${encodeURIComponent(id)}`;
const sub = (host: string, base: string) => host === base || host.endsWith(`.${base}`);
const sinAncla = (u: URL) => {
  u.hash = '';
  return u.toString();
};

/**
 * Enlace al que mandar a escribir la reseña, o null si no se reconoce sin consultar fuera
 * (los cortos de Google los resuelve `resolverCorto`).
 */
export function enlaceResena(raw: string): string | null {
  const u = https(raw);
  if (!u) return null;
  const host = u.hostname.toLowerCase();
  const p = u.pathname;
  if (host === 'g.page') {
    const m = p.match(/^\/r\/([A-Za-z0-9_-]+)(?:\/review)?\/?$/i);
    return m ? `https://g.page/r/${m[1]}/review` : null;
  }
  if (CORTOS.has(host)) return null;
  if (GOOGLE.test(host)) {
    const directa = host === 'search.google.com' && p === '/local/writereview';
    const maps = p === '/maps' || p.startsWith('/maps/') || host.startsWith('maps.google.');
    if (!directa && !maps) return null;
    const id = placeId(u);
    return id ? escribirResena(id) : null;
  }
  if (sub(host, 'trustpilot.com') && /^\/review\/[^/]+\/?$/i.test(p)) return sinAncla(u);
  if ((sub(host, 'tripadvisor.com') || sub(host, 'tripadvisor.es')) && /^\/(?:Restaurant|Hotel|Attraction|VacationRental)_Review-/i.test(p)) {
    return sinAncla(u);
  }
  if (sub(host, 'yelp.com') && /^\/biz\/[^/]+/i.test(p)) return sinAncla(u);
  if (sub(host, 'facebook.com') && /\/reviews(?:\/|$)/i.test(p)) return sinAncla(u);
  return null;
}

/** Sigue hasta cinco redirecciones HTTPS de un enlace corto de Google, sin salir de Google. */
export async function resolverCorto(raw: string, f: typeof fetch = fetch): Promise<string | null> {
  let actual = https(raw);
  if (!actual || !CORTOS.has(actual.hostname.toLowerCase())) return null;
  for (let i = 0; i < 5; i++) {
    let r: Response;
    try {
      r = await f(actual.toString(), { redirect: 'manual', signal: AbortSignal.timeout(5000) });
    } catch {
      return null;
    }
    const loc = [301, 302, 303, 307, 308].includes(r.status) ? r.headers.get('location') : null;
    if (!loc) return null;
    let sig: URL;
    try {
      sig = new URL(loc, actual);
      if (sig.hostname.toLowerCase() === 'consent.google.com') sig = new URL(sig.searchParams.get('continue') ?? '');
    } catch {
      return null;
    }
    if (sig.protocol !== 'https:' || !esGoogle(sig.hostname.toLowerCase())) return null;
    const hecho = enlaceResena(sig.toString());
    if (hecho) return hecho;
    if (!CORTOS.has(sig.hostname.toLowerCase())) return null;
    actual = sig;
  }
  return null;
}

export interface CitaResena {
  id: string;
  inicio: number;
  nombre: string;
  email: string;
}

/** El correo: igual para todos, sin condiciones ni incentivos. `enlace` ya normalizado. */
export function correoResena(c: CitaResena, negocio: string, enlace: string, tienda: string): EmailMessage {
  const cuando = cuandoTexto(c.inicio);
  const nombre = c.nombre.trim();
  const saludo = nombre ? `Hola, ${nombre}:` : 'Hola:';
  const invitacion = 'Si te apetece contar qué tal fue, tu opinión ayuda a otras personas a decidir. Sea la que sea, es bienvenida.';
  const text = [saludo, '', `Gracias por tu visita a ${negocio} el ${cuando}.`, '', invitacion, '', `Escribir una opinión: ${enlace}`].join('\n');
  const cuerpo = `<p style="margin:16px 0 12px">${escapeHtml(saludo)}</p>
<p style="margin:0 0 12px">Gracias por tu visita a <strong>${escapeHtml(negocio)}</strong> el ${escapeHtml(cuando)}.</p>
<p style="margin:0 0 20px">${invitacion}</p>
<p style="margin:0"><a href="${escapeHtml(enlace)}" style="display:inline-block;padding:12px 20px;border-radius:6px;background:#111;color:#fff;text-decoration:none">Escribir una opinión</a></p>`;
  return {
    to: c.email,
    subject: `¿Qué tal tu visita a ${negocio}?`,
    html: emailShell({ storeName: tienda, heading: '¿Qué tal fue?', subheading: escapeHtml(negocio), body: cuerpo }),
    text,
    idempotencyKey: `cita-resena/${c.id}`,
  };
}

interface Candidata extends CitaResena {
  datos: string;
}

const marcar = (db: D1Database, id: string, de: string, a: string, cuando: string) =>
  db.prepare(`UPDATE citas SET resena_estado = ?, resena_procesada = ? WHERE id = ? AND resena_estado = ?`).bind(a, cuando, id, de).run();

/**
 * Barrido del cron: citas confirmadas que acabaron hace entre 72 h y 7 días, de webs con enlace
 * de opiniones (las de webs sin enlace siguen pendientes: si el negocio lo añade dentro de la
 * ventana, aún se piden). Devuelve cuántos correos salieron.
 */
export async function pedirResenas(
  db: D1Database,
  emailer: Pick<EmailProvider, 'send'>,
  tienda: string,
  ahora = Date.now(),
  limite = 20,
  f: typeof fetch = fetch,
): Promise<number> {
  const desde = ahora - VENTANA_RESENA;
  const hasta = ahora - ESPERA_RESENA;
  const sello = new Date(ahora).toISOString();
  const { results = [] } = await db
    .prepare(
      `SELECT c.id, c.inicio, c.nombre, c.email, p.datos FROM citas c
       JOIN paginas_publicadas p ON p.slug = c.slug AND p.tipo = 'web'
       WHERE c.estado = 'confirmada' AND c.resena_estado = 'pendiente' AND c.fin BETWEEN ? AND ?
         AND json_valid(p.datos) AND TRIM(COALESCE(json_extract(p.datos, '$.opinionesUrl'), '')) <> ''
       ORDER BY c.fin LIMIT ?`,
    )
    .bind(desde, hasta, limite)
    .all<Candidata>();
  let enviadas = 0;
  const resueltos = new Map<string, string | null>();
  for (const row of results) {
    let d: { negocio?: unknown; opinionesUrl?: unknown } = {};
    try {
      d = JSON.parse(row.datos);
    } catch {
      /* sin datos legibles: sin enlace */
    }
    const raw = typeof d.opinionesUrl === 'string' ? d.opinionesUrl.trim() : '';
    let enlace = resueltos.get(raw);
    if (enlace === undefined) {
      enlace = raw ? (enlaceResena(raw) ?? (await resolverCorto(raw, f))) : null;
      resueltos.set(raw, enlace);
    }
    if (!enlace) {
      await marcar(db, row.id, 'pendiente', 'omitida', sello);
      continue;
    }
    const claim = await marcar(db, row.id, 'pendiente', 'reclamada', sello);
    if ((claim.meta?.changes ?? 0) !== 1) continue;
    const negocio = typeof d.negocio === 'string' && d.negocio.trim() ? d.negocio.trim() : tienda;
    try {
      await emailer.send(correoResena(row, negocio, enlace, tienda));
    } catch {
      await marcar(db, row.id, 'reclamada', 'fallida', sello);
      continue;
    }
    await marcar(db, row.id, 'reclamada', 'enviada', sello);
    enviadas++;
  }
  return enviadas;
}

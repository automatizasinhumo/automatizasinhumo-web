/**
 * Formulario de contacto de las webs publicadas (/w/<slug>), sin JavaScript en la página.
 *
 * Contra el spam, tres capas que no molestan a la persona:
 * - un campo trampa oculto que solo rellenan los robots;
 * - un sello firmado (HMAC con AUTH_SECRET) con la hora en que se sirvió la página: no vale
 *   para otra web, caduca y rechaza los envíos hechos en menos de unos segundos;
 * - el límite por IP del middleware (cubo «checkout» de rateLimit.ts).
 *
 * El mensaje se guarda en D1 (webs_mensajes), se avisa al dueño por correo si hay proveedor
 * y aparece en su área de cliente (/account).
 */
import type { D1Database } from '@cloudflare/workers-types';
import { signToken, verifyToken } from '../auth/token';
import { emailShell, escapeHtml } from '../email/layout';
import type { EmailMessage } from '../email';
import { CAMPO_TRAMPA } from './webs';

const PREFIJO = 'msg:';
/** La página se cachea 60 s y puede quedarse abierta: el sello dura dos días. */
export const VIDA_SELLO = 2 * 86400;
/** Una persona no rellena el formulario en menos de esto. */
export const MINIMO_SEGUNDOS = 3;
export { CAMPO_TRAMPA };
export const MAX = { nombre: 100, contacto: 254, texto: 2000 } as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TELEFONO = /^\+?[\d\s().-]{6,20}$/;
/** Un teléfono con el que se pueda llamar: al menos 6 cifras, no solo separadores. */
const esTelefono = (v: string) => TELEFONO.test(v) && (v.match(/\d/g)?.length ?? 0) >= 6;

/** Sello del formulario de `slug` servido ahora; `vuelta` es la URL a la que volver tras enviar. */
export function selloFormulario(slug: string, vuelta: string, secret: string, ahora = Date.now()): Promise<string> {
  const s = Math.floor(ahora / 1000);
  return signToken(`${PREFIJO}${slug}:${s}:${vuelta}`, secret, VIDA_SELLO, s);
}

/**
 * Opción `formulario` de documentoWeb para la web `slug`: se envía a `accion` y vuelve a `vuelta`.
 * Sin secreto no hay formulario (la web sigue con sus botones de llamar, WhatsApp y correo).
 */
export async function formularioWeb(slug: string, accion: string, vuelta: string, secret: string | undefined, ahora = Date.now()) {
  return secret ? { accion, sello: await selloFormulario(slug, vuelta, secret, ahora) } : undefined;
}

export type Sello = { vuelta: string } | { error: 'sello' | 'rapido' };

/** Comprueba el sello para `slug`: firmado, vigente, de esta web y no enviado demasiado deprisa. */
export async function leerSello(token: string, slug: string, secret: string, ahora = Date.now()): Promise<Sello> {
  if (!token || token.length > 1200) return { error: 'sello' };
  const s = Math.floor(ahora / 1000);
  const p = await verifyToken(token, secret, s);
  const m = p?.startsWith(PREFIJO) ? /^([^:]+):(\d+):(https?:\/\/\S+)$/.exec(p.slice(PREFIJO.length)) : null;
  if (!m || m[1] !== slug) return { error: 'sello' };
  if (s - Number(m[2]) < MINIMO_SEGUNDOS) return { error: 'rapido' };
  return { vuelta: m[3] };
}

export interface Mensaje {
  nombre: string;
  contacto: string;
  texto: string;
}

const limpio = (v: FormDataEntryValue | null, max: number, lineas = false) => {
  const t = typeof v === 'string' ? v : '';
  const n = lineas ? t.replace(/\r\n?/g, '\n').replace(/\n{3,}/g, '\n\n') : t.replace(/\s+/g, ' ');
  return n.trim().slice(0, max);
};

export type Validado = { ok: true; mensaje: Mensaje } | { ok: false; error: 'trampa' | 'contacto' | 'texto' };

/** Datos del formulario, o el motivo del rechazo. La trampa rellena = robot. */
export function validarMensaje(f: FormData): Validado {
  if (limpio(f.get(CAMPO_TRAMPA), 200)) return { ok: false, error: 'trampa' };
  const contacto = limpio(f.get('contacto'), MAX.contacto);
  if (!EMAIL.test(contacto) && !esTelefono(contacto)) return { ok: false, error: 'contacto' };
  const texto = limpio(f.get('mensaje'), MAX.texto, true);
  if (texto.length < 5) return { ok: false, error: 'texto' };
  return { ok: true, mensaje: { nombre: limpio(f.get('nombre'), MAX.nombre), contacto, texto } };
}

export async function guardarMensaje(db: D1Database, slug: string, m: Mensaje): Promise<string> {
  const id = crypto.randomUUID();
  await db
    .prepare('INSERT INTO webs_mensajes (id, slug, nombre, contacto, texto) VALUES (?, ?, ?, ?, ?)')
    .bind(id, slug, m.nombre, m.contacto, m.texto)
    .run();
  return id;
}

/** Correo del dueño de la web: el del pedido; si no, el de contacto de la propia web. */
export async function correoDueno(db: D1Database, slug: string): Promise<{ email: string; negocio: string } | null> {
  const r = await db
    .prepare(
      `SELECT o.email AS pedido, json_extract(p.datos, '$.email') AS web, json_extract(p.datos, '$.negocio') AS negocio
         FROM paginas_publicadas p LEFT JOIN orders o ON o.public_id = p.pedido_public_id
        WHERE p.tipo = 'web' AND p.slug = ?`,
    )
    .bind(slug)
    .first<{ pedido: string | null; web: string | null; negocio: string | null }>();
  const email = [r?.pedido, r?.web].find((x): x is string => typeof x === 'string' && EMAIL.test(x));
  return email ? { email, negocio: typeof r?.negocio === 'string' ? r.negocio : '' } : null;
}

/** Aviso al dueño con el mensaje entero y el enlace a su bandeja. */
export function correoMensaje(para: string, negocio: string, m: Mensaje, panel: string, tienda: string, id = ''): EmailMessage {
  const quien = m.nombre || 'Alguien';
  const subject = `Nuevo mensaje desde tu web${negocio ? ` (${negocio})` : ''}: ${quien}`;
  const text = `${quien} te ha escrito desde tu web.\n\nContacto: ${m.contacto}\n\n${m.texto}\n\nTodos tus mensajes: ${panel}`;
  const cuerpo = `<p style="margin:16px 0 12px">${escapeHtml(quien)} te ha escrito desde tu web.</p>
<p style="margin:0 0 12px"><strong>Contacto:</strong> ${escapeHtml(m.contacto)}</p>
<blockquote style="margin:0 0 16px;padding:12px 16px;border-left:3px solid #ccc;white-space:pre-wrap">${escapeHtml(m.texto)}</blockquote>
<p style="margin:0"><a href="${escapeHtml(panel)}">Ver todos tus mensajes</a></p>`;
  const html = emailShell({ storeName: tienda, heading: 'Nuevo mensaje desde tu web', subheading: negocio ? escapeHtml(negocio) : undefined, body: cuerpo });
  return { to: para, subject, html, text, ...(id ? { idempotencyKey: `web-mensaje/${id}` } : {}) };
}

export interface MensajeCliente extends Mensaje {
  id: string;
  slug: string;
  creado: string;
}

/** Últimos mensajes de las webs del cliente, para su área (/account). */
export async function mensajesDeCliente(db: D1Database, email: string, limite = 30): Promise<MensajeCliente[]> {
  const { results } = await db
    .prepare(
      `SELECT m.id, m.slug, m.nombre, m.contacto, m.texto, m.creado
         FROM webs_mensajes m
         JOIN paginas_publicadas p ON p.tipo = 'web' AND p.slug = m.slug
         JOIN orders o ON o.public_id = p.pedido_public_id
        WHERE o.email = ?
        ORDER BY m.creado DESC LIMIT ?`,
    )
    .bind(email, limite)
    .all<MensajeCliente>();
  return results ?? [];
}

/** Página de respuesta tras enviar (o al fallar): HTML propio, sin JavaScript, con vuelta a la web. */
export function paginaRespuesta(ok: boolean, vuelta: string, aviso = ''): string {
  const titulo = ok ? 'Mensaje enviado' : 'No se ha podido enviar';
  const texto = ok ? 'Gracias. Te responderán lo antes posible.' : aviso || 'Vuelve a la web e inténtalo de nuevo.';
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>${titulo}</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;font:1.05rem/1.5 system-ui,sans-serif;background:#f6f5f2;color:#1b1b1b}main{max-width:28rem;padding:32px;text-align:center}h1{margin:0 0 8px;font-size:1.6rem}a{display:inline-block;margin-top:20px;padding:12px 22px;border-radius:999px;background:#1b1b1b;color:#fff;text-decoration:none;font-weight:600}</style>
</head><body><main><h1>${titulo}</h1><p>${escapeHtml(texto)}</p>${vuelta ? `<a href="${escapeHtml(vuelta)}">Volver a la web</a>` : ''}</main></body></html>
`;
}

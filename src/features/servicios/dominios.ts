/**
 * Dominio propio para una página publicada (las webs de /servicios/web), sin pasos a mano.
 *
 * 1. El cliente escribe su dominio en el estudio. `pedirDominio` lo añade como zona gratuita a
 *    nuestra cuenta de Cloudflare (API /zones) y guarda los dos servidores DNS que asigna.
 * 2. El cliente pone esos servidores en su registrador (lo único que no podemos hacer por él).
 * 3. `avanzarDominios` corre en el cron del Worker cada 5 minutos y en cada consulta del estudio:
 *    - zona activa: conecta el dominio y su www a este Worker (Workers Custom Domains: DNS y
 *      certificado HTTPS automáticos);
 *    - el dominio responde por HTTPS con la web: queda «activo» y se avisa al cliente por correo.
 * 4. `servirDominio` atiende en worker.ts las peticiones que llegan con ese Host: la web en «/»,
 *    robots.txt y sitemap.xml. «www» redirige al dominio sin www.
 *
 * Sin Cloudflare for SaaS (pide tarjeta) ni un Worker por cliente: un registro en D1 por dominio
 * (migración 0049). Necesita CF_DOMINIOS_TOKEN (zona: Zone Edit, DNS Edit y Workers Routes
 * Write; cuenta: Workers Scripts Write, que pide PUT /accounts/{id}/workers/domains),
 * CF_ACCOUNT_ID y CF_WORKER_NOMBRE; sin ellos el estudio dice que aún no está disponible.
 */
import type { TipoPagina } from './paginas';

export type EstadoDominio = 'esperando_dns' | 'conectando' | 'activo' | 'error';

export interface FilaDominio {
  dominio: string;
  tipo: TipoPagina;
  pedido_public_id: string;
  estado: EstadoDominio;
  zona_id: string | null;
  servidores: string | null;
  detalle: string | null;
  avisado: number;
  updated_at: string;
}

export interface ConfigDominios {
  token: string;
  cuenta: string;
  worker: string;
}

export function configDominios(e: {
  CF_DOMINIOS_TOKEN?: string;
  CF_ACCOUNT_ID?: string;
  CF_WORKER_NOMBRE?: string;
}): ConfigDominios | null {
  if (!e.CF_DOMINIOS_TOKEN || !e.CF_ACCOUNT_ID || !e.CF_WORKER_NOMBRE) return null;
  return { token: e.CF_DOMINIOS_TOKEN, cuenta: e.CF_ACCOUNT_ID, worker: e.CF_WORKER_NOMBRE };
}

// ---------- Normalización ----------

/** Segundos niveles en los que el dominio registrable tiene tres partes (peluqueria.com.es). */
const SEGUNDO_NIVEL = new Set(['com.es', 'nom.es', 'org.es', 'gob.es', 'edu.es', 'co.uk', 'org.uk', 'com.mx', 'com.ar', 'com.co', 'com.pe']);
/** Hosts que nunca son de un cliente: los nuestros y los de la plataforma. */
const RESERVADOS = /(^|\.)(workers\.dev|pages\.dev|cloudflare\.com|automatizasinhumo\.[a-z]+|localhost)$/;

/**
 * «https://www.Peluquería-Lola.es/inicio» → «xn--peluquera-lola-1nb.es». El dominio registrable
 * (sin www ni subdominios), en minúsculas y en punycode, o null si no lo es.
 */
export function normalizarDominio(entrada: unknown): string | null {
  if (typeof entrada !== 'string') return null;
  let t = entrada.trim().toLowerCase();
  if (!t || t.length > 260 || /[\s@\\]/.test(t)) return null;
  t = t.replace(/^[a-z][a-z0-9+.-]*:\/\//, '').replace(/[/?#].*$/, '').replace(/:\d+$/, '').replace(/\.$/, '');
  let host: string;
  try {
    host = new URL(`http://${t}`).hostname;
  } catch {
    return null;
  }
  host = host.replace(/^www\./, '');
  const partes = host.split('.');
  if (partes.length < 2 || partes.some((p) => !/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(p))) return null;
  if (!/^(?:[a-z]{2,63}|xn--[a-z0-9-]{1,59})$/.test(partes.at(-1)!)) return null; // TLD sin cifras: no es una IP
  const sufijo = partes.slice(-2).join('.');
  const largo = SEGUNDO_NIVEL.has(sufijo) ? 3 : 2;
  if (partes.length !== largo) return null; // subdominio: el cliente conecta su dominio entero
  if (host.length > 253 || RESERVADOS.test(host)) return null;
  return host;
}

// ---------- API de Cloudflare ----------

const API = 'https://api.cloudflare.com/client/v4';

type RespuestaCf<T> = { success: boolean; result: T; errors?: { code: number; message: string }[] };

export class ErrorCloudflare extends Error {
  constructor(
    readonly codigos: number[],
    mensaje: string,
  ) {
    super(mensaje);
  }
}

async function cf<T>(cfg: ConfigDominios, ruta: string, init: RequestInit = {}, f: typeof fetch = fetch): Promise<T> {
  const r = await f(`${API}${ruta}`, {
    ...init,
    headers: { Authorization: `Bearer ${cfg.token}`, 'Content-Type': 'application/json' },
  });
  const j = (await r.json().catch(() => null)) as RespuestaCf<T> | null;
  if (!j?.success) {
    const errores = j?.errors ?? [];
    throw new ErrorCloudflare(errores.map((e) => e.code), errores.map((e) => e.message).join('; ') || `HTTP ${r.status}`);
  }
  return j.result;
}

interface Zona {
  id: string;
  name: string;
  status: string;
  name_servers?: string[];
  account?: { id: string };
}

/** Crea la zona (o recupera la que ya está en nuestra cuenta). */
export async function crearZona(cfg: ConfigDominios, dominio: string, f: typeof fetch = fetch): Promise<Zona> {
  try {
    return await cf<Zona>(cfg, '/zones', { method: 'POST', body: JSON.stringify({ name: dominio, account: { id: cfg.cuenta }, type: 'full' }) }, f);
  } catch (e) {
    // 1061: la zona ya existe. Si es nuestra y aún no está activa (un reintento), se reutiliza.
    // Una zona ya activa sin fila en D1 sería de otro pedido: no se entrega a quien la pida.
    if (!(e instanceof ErrorCloudflare) || !e.codigos.includes(1061)) throw e;
    const zonas = await cf<Zona[]>(cfg, `/zones?name=${encodeURIComponent(dominio)}&account.id=${cfg.cuenta}`, {}, f);
    if (!zonas[0] || zonas[0].status === 'active') throw e;
    return zonas[0];
  }
}

export const leerZona = (cfg: ConfigDominios, id: string, f: typeof fetch = fetch) => cf<Zona>(cfg, `/zones/${id}`, {}, f);

/** Pide a Cloudflare que compruebe ya los servidores DNS (si no, tarda horas en mirarlos). */
export async function comprobarActivacion(cfg: ConfigDominios, id: string, f: typeof fetch = fetch): Promise<void> {
  // Límite de Cloudflare: una cada 5 minutos por zona. Un 429 o un error aquí no cambian nada.
  await cf(cfg, `/zones/${id}/activation_check`, { method: 'PUT' }, f).catch(() => undefined);
}

/** Conecta un host de la zona a nuestro Worker: Cloudflare crea el registro DNS y el certificado. */
export const conectarHost = (cfg: ConfigDominios, host: string, zona: string, f: typeof fetch = fetch) =>
  cf(cfg, `/accounts/${cfg.cuenta}/workers/domains`, {
    method: 'PUT',
    body: JSON.stringify({ environment: 'production', hostname: host, service: cfg.worker, zone_id: zona }),
  }, f);

// ---------- Estado en D1 ----------

const COLUMNAS = 'dominio, tipo, pedido_public_id, estado, zona_id, servidores, detalle, avisado, updated_at';

export const dominioDePedido = (db: D1Database, tipo: TipoPagina, pedido: string) =>
  db.prepare(`SELECT ${COLUMNAS} FROM dominios_paginas WHERE tipo = ? AND pedido_public_id = ?`).bind(tipo, pedido).first<FilaDominio>();

export const filaDeDominio = (db: D1Database, dominio: string) =>
  db.prepare(`SELECT ${COLUMNAS} FROM dominios_paginas WHERE dominio = ?`).bind(dominio).first<FilaDominio>();

async function guardar(db: D1Database, d: string, cambios: Partial<Pick<FilaDominio, 'estado' | 'zona_id' | 'servidores' | 'detalle' | 'avisado'>>) {
  const campos = Object.keys(cambios);
  if (!campos.length) return;
  await db
    .prepare(`UPDATE dominios_paginas SET ${campos.map((c) => `${c} = ?`).join(', ')}, updated_at = datetime('now') WHERE dominio = ?`)
    .bind(...campos.map((c) => (cambios as Record<string, unknown>)[c] ?? null), d)
    .run();
}

export type ResultadoPedirDominio =
  | { ok: true; fila: FilaDominio }
  | { ok: false; error: 'dominio' | 'ocupado' | 'cloudflare' | 'no_disponible'; detalle?: string };

/** Mensajes para el cliente según el error de Cloudflare al crear la zona. */
function motivo(e: unknown): string {
  if (!(e instanceof ErrorCloudflare)) return 'No hemos podido contactar con Cloudflare. Vuelve a probar en un rato.';
  if (e.codigos.some((c) => [1097, 1099, 1049].includes(c)))
    return 'Ese dominio no está registrado todavía o no admite esta conexión. Revisa que lo hayas escrito bien.';
  if (e.codigos.includes(1061)) return 'Ese dominio ya está conectado a otra cuenta de Cloudflare. Escríbenos y lo resolvemos.';
  if (e.codigos.includes(1105)) return 'Cloudflare pide esperar antes de volver a añadir este dominio. Prueba dentro de unas horas.';
  return 'Cloudflare no ha aceptado el dominio. Escríbenos y lo revisamos.';
}

/**
 * El cliente pide conectar su dominio a la página de su pedido. Si el pedido ya tenía otro
 * dominio sin activar, se sustituye (se equivocó al escribirlo); uno activo no se cambia aquí.
 */
export async function pedirDominio(
  db: D1Database,
  cfg: ConfigDominios | null,
  tipo: TipoPagina,
  pedido: string,
  entrada: unknown,
  f: typeof fetch = fetch,
): Promise<ResultadoPedirDominio> {
  const dominio = normalizarDominio(entrada);
  if (!dominio) return { ok: false, error: 'dominio' };
  if (!cfg) return { ok: false, error: 'no_disponible' };
  const otro = await filaDeDominio(db, dominio);
  if (otro && (otro.tipo !== tipo || otro.pedido_public_id !== pedido)) return { ok: false, error: 'ocupado' };
  const previo = await dominioDePedido(db, tipo, pedido);
  if (previo?.dominio === dominio) return { ok: true, fila: previo };
  if (previo?.estado === 'activo') return { ok: false, error: 'ocupado', detalle: previo.dominio };
  let zona: Zona;
  try {
    zona = await crearZona(cfg, dominio, f);
  } catch (e) {
    return { ok: false, error: 'cloudflare', detalle: motivo(e) };
  }
  if (previo) {
    // El cron pudo activarlo mientras se creaba la zona: un dominio activo no se sustituye.
    const borrado = await db
      .prepare("DELETE FROM dominios_paginas WHERE dominio = ? AND estado != 'activo'")
      .bind(previo.dominio)
      .run();
    if (!borrado.meta.changes) return { ok: false, error: 'ocupado', detalle: previo.dominio };
  }
  await db
    .prepare(
      `INSERT INTO dominios_paginas (dominio, tipo, pedido_public_id, estado, zona_id, servidores)
       VALUES (?, ?, ?, 'esperando_dns', ?, ?)`,
    )
    .bind(dominio, tipo, pedido, zona.id, JSON.stringify(zona.name_servers ?? []))
    .run();
  const fila = await filaDeDominio(db, dominio);
  return fila ? { ok: true, fila } : { ok: false, error: 'cloudflare' };
}

/** ¿Responde ya el dominio con la página? (HTTPS válido: si el certificado aún no está, fetch falla). */
async function responde(dominio: string, f: typeof fetch): Promise<boolean> {
  try {
    const r = await f(`https://${dominio}/`, { redirect: 'manual', headers: { 'x-comprobacion': 'dominio' } });
    return r.status === 200 && r.headers.get('x-pagina-dominio') === dominio;
  } catch {
    return false;
  }
}

/** Un paso de la conexión de un dominio. Devuelve la fila tal como queda. */
export async function avanzarDominio(db: D1Database, cfg: ConfigDominios, fila: FilaDominio, f: typeof fetch = fetch): Promise<FilaDominio> {
  const d = fila.dominio;
  try {
    if (fila.estado === 'esperando_dns' && fila.zona_id) {
      const zona = await leerZona(cfg, fila.zona_id, f);
      if (zona.status !== 'active') {
        await comprobarActivacion(cfg, fila.zona_id, f);
        await guardar(db, d, { detalle: null });
        return { ...fila, detalle: null };
      }
      await conectarHost(cfg, d, fila.zona_id, f);
      await conectarHost(cfg, `www.${d}`, fila.zona_id, f);
      await guardar(db, d, { estado: 'conectando', detalle: null });
      fila = { ...fila, estado: 'conectando', detalle: null };
    }
    if (fila.estado === 'conectando') {
      // Se guarda también el intento fallido: así este dominio pasa al final de la cola del cron.
      if (!(await responde(d, f))) {
        await guardar(db, d, { detalle: null });
        return { ...fila, detalle: null };
      }
      await guardar(db, d, { estado: 'activo', detalle: null });
      return { ...fila, estado: 'activo', detalle: null };
    }
  } catch (e) {
    // Un fallo de la API no cambia el estado: el siguiente cron lo vuelve a intentar.
    const detalle = e instanceof Error ? e.message.slice(0, 300) : 'error';
    await guardar(db, d, { detalle });
    return { ...fila, detalle };
  }
  return fila;
}

/** Dominios que esperan, por orden de antigüedad del último intento (cron cada 5 minutos). */
export async function avanzarDominios(db: D1Database, cfg: ConfigDominios | null, limite = 20, f: typeof fetch = fetch): Promise<FilaDominio[]> {
  if (!cfg) return [];
  const { results } = await db
    .prepare(
      `SELECT ${COLUMNAS} FROM dominios_paginas WHERE estado IN ('esperando_dns', 'conectando')
       AND created_at > datetime('now', '-30 days') ORDER BY updated_at LIMIT ?`,
    )
    .bind(limite)
    .all<FilaDominio>();
  const hechos: FilaDominio[] = [];
  for (const fila of results ?? []) hechos.push(await avanzarDominio(db, cfg, fila, f));
  return hechos;
}

// ---------- Aviso al cliente ----------

export interface Aviso {
  para: string;
  dominio: string;
}

/** Dominios recién activos sin aviso: un correo por dominio (marca `avisado` antes de enviar). */
export async function avisarDominiosActivos(db: D1Database, enviar: (a: Aviso) => Promise<void>, limite = 10): Promise<number> {
  const { results } = await db
    .prepare(
      `SELECT d.dominio, o.email AS para FROM dominios_paginas d JOIN orders o ON o.public_id = d.pedido_public_id
        WHERE d.estado = 'activo' AND d.avisado = 0 AND o.email IS NOT NULL LIMIT ?`,
    )
    .bind(limite)
    .all<{ dominio: string; para: string }>();
  let n = 0;
  for (const r of results ?? []) {
    const marcado = await db
      .prepare("UPDATE dominios_paginas SET avisado = 1, updated_at = datetime('now') WHERE dominio = ? AND avisado = 0")
      .bind(r.dominio)
      .run();
    if (!marcado.meta.changes) continue;
    try {
      await enviar({ para: r.para, dominio: r.dominio });
      n++;
    } catch (e) {
      await db.prepare('UPDATE dominios_paginas SET avisado = 0 WHERE dominio = ?').bind(r.dominio).run();
      throw e;
    }
  }
  return n;
}

// ---------- Servir la página por su dominio ----------

export interface PaginaDeDominio {
  tipo: TipoPagina;
  slug: string;
  dominio: string;
}

/** Página a la que apunta un host (con o sin www), si su dominio está conectando o activo. */
export async function paginaDeHost(db: D1Database, host: string): Promise<(PaginaDeDominio & { www: boolean }) | null> {
  const h = host.toLowerCase().replace(/\.$/, '');
  if (RESERVADOS.test(h)) return null;
  const www = h.startsWith('www.');
  const dominio = www ? h.slice(4) : h;
  const r = await db
    .prepare(
      `SELECT d.dominio, d.tipo, p.slug FROM dominios_paginas d
         JOIN paginas_publicadas p ON p.tipo = d.tipo AND p.pedido_public_id = d.pedido_public_id
        WHERE d.dominio = ? AND d.estado IN ('conectando', 'activo')`,
    )
    .bind(dominio)
    .first<PaginaDeDominio>();
  return r ? { ...r, www } : null;
}

const CABECERAS = {
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
};

/**
 * Respuesta para una petición que llega por el dominio de un cliente, o null si el host no es de
 * ningún cliente (la atiende Astro). `documento(tipo, slug, url)` pinta la página (null si ya no existe).
 */
export async function servirDominio(
  request: Request,
  db: D1Database,
  documento: (tipo: TipoPagina, slug: string, url: string) => Promise<string | null>,
): Promise<Response | null> {
  const url = new URL(request.url);
  if (RESERVADOS.test(url.hostname)) return null;
  const p = await paginaDeHost(db, url.hostname);
  if (!p) return null;
  const raiz = `https://${p.dominio}/`;
  if (p.www || url.protocol === 'http:') return Response.redirect(`${raiz}${url.pathname.slice(1)}${url.search}`, 301);
  if (request.method !== 'GET' && request.method !== 'HEAD')
    return new Response(null, { status: 405, headers: { ...CABECERAS, allow: 'GET, HEAD' } });
  const texto = (cuerpo: string, tipo: string) =>
    new Response(request.method === 'HEAD' ? null : cuerpo, {
      headers: { ...CABECERAS, 'content-type': tipo, 'cache-control': 'public, max-age=3600' },
    });
  if (url.pathname === '/robots.txt') return texto(`User-agent: *\nAllow: /\nSitemap: ${raiz}sitemap.xml\n`, 'text/plain; charset=utf-8');
  if (url.pathname === '/sitemap.xml')
    return texto(
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${raiz}</loc></url></urlset>\n`,
      'application/xml',
    );
  // La página antigua en /w/<slug> no se copia aquí: el dominio solo sirve su raíz.
  if (url.pathname !== '/' && url.pathname !== '/index.html') return Response.redirect(raiz, 301);
  const html = await documento(p.tipo, p.slug, raiz);
  if (html === null) return new Response('Página no encontrada', { status: 404, headers: { ...CABECERAS, 'content-type': 'text/plain; charset=utf-8' } });
  return new Response(request.method === 'HEAD' ? null : html, {
    headers: {
      ...CABECERAS,
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=60',
      'x-pagina-dominio': p.dominio,
    },
  });
}

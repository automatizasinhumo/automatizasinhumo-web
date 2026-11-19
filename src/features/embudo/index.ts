/**
 * Embudo comercial y Core Web Vitals sin cookies (R15-13 y R15-14).
 *
 * El navegador manda, con sendBeacon, la ruta, el referrer y (si la hay) la nota de
 * web-vitals. Aquí solo se suman recuentos por día: no se guarda IP, identificador ni
 * URL completa. Las conversiones (solicitud enviada y pago) NO se cuentan aquí: salen
 * de las tablas `solicitudes` y `orders`, así no hay dos fuentes que puedan duplicarse.
 */
import type { D1Database } from '@cloudflare/workers-types';

export const PASOS = ['entrada', 'ficha', 'muestra', 'empezar'] as const;
export type Paso = (typeof PASOS)[number];

export const METRICAS = ['LCP', 'INP', 'CLS'] as const;
export type Metrica = (typeof METRICAS)[number];
const NOTAS = { good: 'bueno', 'needs-improvement': 'mejorable', poor: 'malo' } as const;
type Nota = keyof typeof NOTAS;

const SLUG = /^[a-z0-9-]{1,80}$/;

// Adaptado de AG Analytics (ua-parser, MIT): buscadores, previsualizadores de
// enlaces, herramientas SEO y clientes de script no cuentan. Sin UA, tampoco.
const BOT =
  /bot|crawl|spider|slurp|mediapartners|facebookexternalhit|whatsapp|telegrambot|discordbot|slackbot|embedly|quora link preview|pingdom|uptimerobot|monitor|headlesschrome|phantomjs|puppeteer|playwright|lighthouse|python-requests|python-urllib|curl|wget|go-http-client|libwww-perl|scrapy|ahrefsbot|semrushbot|mj12bot|dotbot|petalbot|bytespider|applebot|yandexbot|baiduspider|duckduckbot|bingpreview/i;

export function esBot(ua: string | null): boolean {
  return !ua || BOT.test(ua);
}

// Origen de una entrada. Buscadores y redes adaptados de AG Analytics (utm, MIT).
const BUSCADORES: [string, RegExp][] = [
  ['google', /(^|\.)google\.(com|[a-z]{2}|com?\.[a-z]{2})$/],
  ['bing', /(^|\.)bing\.com$/],
  ['duckduckgo', /(^|\.)duckduckgo\.com$/],
  ['brave', /(^|\.)search\.brave\.com$/],
  ['yahoo', /(^|\.)yahoo\.com$/],
  ['ecosia', /(^|\.)ecosia\.org$/],
];
const ASISTENTES = /(^|\.)(chatgpt\.com|openai\.com|perplexity\.ai|claude\.ai|gemini\.google\.com|copilot\.microsoft\.com)$/;
const REDES =
  /(^|\.)(t\.me|telegram\.org|facebook\.com|instagram\.com|x\.com|twitter\.com|t\.co|linkedin\.com|lnkd\.in|tiktok\.com|youtube\.com|pinterest\.[a-z.]+|reddit\.com|whatsapp\.com|wa\.me)$/;

/** «directo», un buscador, «asistente IA», «redes», «utm:<fuente>» u «otra web»; '' si viene de la propia web. */
export function origenDe(referrer: string, host: string, utm: string): string {
  const fuente = utm.toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 30);
  if (fuente) return `utm:${fuente}`;
  if (!referrer) return 'directo';
  let h: string;
  try {
    h = new URL(referrer).hostname.toLowerCase().replace(/\.+$/, '');
  } catch {
    return 'directo';
  }
  if (h === host.toLowerCase().replace(/\.+$/, '')) return '';
  if (ASISTENTES.test(h)) return 'asistente IA';
  for (const [nombre, patron] of BUSCADORES) if (patron.test(h)) return nombre;
  if (REDES.test(h)) return 'redes';
  return 'otra web';
}

/** Tipo de página para agrupar las Web Vitals (la ruta exacta no hace falta). */
export function tipoDeRuta(path: string): string {
  if (path === '/') return 'inicio';
  if (path.startsWith('/products/')) return 'ficha';
  if (path === '/products' || path.startsWith('/categories/') || path.startsWith('/sectores/')) return 'listado';
  if (path.startsWith('/search')) return 'busqueda';
  if (path.startsWith('/empezar/')) return 'formulario';
  return 'otra';
}

export interface Evento {
  tipo: 'vista' | 'muestra' | 'vitales';
  path: string;
  origen: string;
  vitales: { metrica: Metrica; nota: Nota }[];
}

/**
 * Valida lo que manda el navegador. Todo lo que no encaja se descarta: el cuerpo lo
 * escribe cualquiera, así que solo pasan valores de listas cerradas o slugs.
 */
export function leerEvento(cuerpo: string, host: string): Evento | null {
  if (!cuerpo || cuerpo.length > 2048) return null;
  let d: unknown;
  try {
    d = JSON.parse(cuerpo);
  } catch {
    return null;
  }
  if (!d || typeof d !== 'object' || Array.isArray(d)) return null;
  const o = d as Record<string, unknown>;
  const tipo = o.t === 'vista' || o.t === 'muestra' || o.t === 'vitales' ? o.t : null;
  const path = typeof o.p === 'string' && o.p.startsWith('/') && o.p.length <= 300 ? o.p.split(/[?#]/)[0] : null;
  if (!tipo || !path) return null;
  const vitales: Evento['vitales'] = [];
  for (const x of Array.isArray(o.v) ? o.v.slice(0, 3) : []) {
    if (!x || typeof x !== 'object') continue;
    const { n, r } = x as { n?: unknown; r?: unknown };
    if (METRICAS.includes(n as Metrica) && typeof r === 'string' && Object.hasOwn(NOTAS, r)) {
      vitales.push({ metrica: n as Metrica, nota: r as Nota });
    }
  }
  const origen =
    tipo === 'vista'
      ? origenDe(typeof o.r === 'string' ? o.r.slice(0, 500) : '', host, typeof o.u === 'string' ? o.u : '')
      : '';
  return { tipo, path, origen, vitales };
}

/** Pasos que suma un evento: una vista puede ser entrada y, a la vez, ficha o formulario. */
export function pasosDe(e: Evento): { paso: Paso; origen: string; ficha: string }[] {
  const [, raiz = '', slug = ''] = e.path.split('/');
  const ficha = SLUG.test(slug) ? slug : '';
  if (e.tipo === 'vitales') return [];
  if (e.tipo === 'muestra') return raiz === 'products' && ficha ? [{ paso: 'muestra', origen: '', ficha }] : [];
  const pasos: { paso: Paso; origen: string; ficha: string }[] = [];
  if (e.origen) pasos.push({ paso: 'entrada', origen: e.origen, ficha: '' });
  if (raiz === 'products' && ficha) pasos.push({ paso: 'ficha', origen: '', ficha });
  if (raiz === 'empezar') pasos.push({ paso: 'empezar', origen: '', ficha: ficha === 'consulta' ? '' : ficha });
  return pasos;
}

export async function registrar(db: D1Database, e: Evento, dia: string): Promise<void> {
  const sentencias = pasosDe(e).map((p) =>
    db
      .prepare(
        `INSERT INTO embudo (dia, paso, origen, ficha, n) VALUES (?, ?, ?, ?, 1)
         ON CONFLICT (dia, paso, origen, ficha) DO UPDATE SET n = n + 1`,
      )
      .bind(dia, p.paso, p.origen, p.ficha),
  );
  const ruta = tipoDeRuta(e.path);
  for (const v of e.tipo === 'vitales' ? e.vitales : []) {
    const col = NOTAS[v.nota]; // de una lista cerrada: nunca texto del navegador
    sentencias.push(
      db
        .prepare(
          `INSERT INTO vitales (dia, metrica, ruta, ${col}) VALUES (?, ?, ?, 1)
           ON CONFLICT (dia, metrica, ruta) DO UPDATE SET ${col} = ${col} + 1`,
        )
        .bind(dia, v.metrica, ruta),
    );
  }
  for (const s of sentencias) await s.run();
}

export interface Resumen {
  pasos: Record<Paso, number>;
  solicitudes: number;
  pagos: number;
  origenes: { origen: string; n: number }[];
  fichas: { ficha: string; ficha_n: number; muestra_n: number; empezar_n: number }[];
  vitales: { metrica: string; ruta: string; bueno: number; mejorable: number; malo: number }[];
}

/** Totales de los últimos `dias` días (incluido hoy, en UTC). */
export async function resumen(db: D1Database, dias: number): Promise<Resumen> {
  const n = Math.min(Math.max(Math.trunc(dias) || 1, 1), 366);
  const desde = new Date(Date.now() - (n - 1) * 86_400_000).toISOString().slice(0, 10);
  const filas = (
    await db.prepare('SELECT paso, SUM(n) AS n FROM embudo WHERE dia >= ? GROUP BY paso').bind(desde).all<{ paso: string; n: number }>()
  ).results;
  const pasos = Object.fromEntries(PASOS.map((p) => [p, 0])) as Record<Paso, number>;
  for (const f of filas) if (Object.hasOwn(pasos, f.paso)) pasos[f.paso as Paso] = Number(f.n);
  const contar = async (sql: string) => Number((await db.prepare(sql).bind(desde).first<{ n: number }>())?.n ?? 0);
  return {
    pasos,
    solicitudes: await contar('SELECT COUNT(*) AS n FROM solicitudes WHERE date(created_at) >= ?'),
    pagos: await contar("SELECT COUNT(*) AS n FROM orders WHERE status = 'paid' AND date(created_at) >= ?"),
    origenes: (
      await db
        .prepare("SELECT origen, SUM(n) AS n FROM embudo WHERE paso = 'entrada' AND dia >= ? GROUP BY origen ORDER BY n DESC, origen LIMIT 20")
        .bind(desde)
        .all<Resumen['origenes'][number]>()
    ).results,
    fichas: (
      await db
        .prepare(
          `SELECT ficha,
             SUM(CASE WHEN paso = 'ficha' THEN n ELSE 0 END) AS ficha_n,
             SUM(CASE WHEN paso = 'muestra' THEN n ELSE 0 END) AS muestra_n,
             SUM(CASE WHEN paso = 'empezar' THEN n ELSE 0 END) AS empezar_n
           FROM embudo WHERE ficha != '' AND dia >= ?
           GROUP BY ficha ORDER BY ficha_n DESC, ficha LIMIT 30`,
        )
        .bind(desde)
        .all<Resumen['fichas'][number]>()
    ).results,
    vitales: (
      await db
        .prepare(
          `SELECT metrica, ruta, SUM(bueno) AS bueno, SUM(mejorable) AS mejorable, SUM(malo) AS malo
           FROM vitales WHERE dia >= ? GROUP BY metrica, ruta ORDER BY metrica, ruta`,
        )
        .bind(desde)
        .all<Resumen['vitales'][number]>()
    ).results,
  };
}

/** Porcentaje entero, o «—» sin base. */
export function pct(parte: number, total: number): string {
  return total > 0 ? `${Math.round((parte / total) * 100)} %` : '—';
}

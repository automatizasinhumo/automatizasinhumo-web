/**
 * Tarjetas digitales publicadas por el propio cliente desde el estudio del CV.
 * Se sirven todas desde el mismo Worker en /c/<slug>: sin despliegue por cliente,
 * sin alojamiento aparte y publicadas en cuanto el pedido está pagado.
 */

export interface EnlaceTarjeta {
  etiqueta: string;
  url: string;
}
export interface DatosTarjeta {
  nombre: string;
  cargo: string;
  email: string;
  telefono: string;
  web: string;
  ubicacion: string;
  resumen: string;
  enlaces: EnlaceTarjeta[];
  /** Color de acento #rrggbb (el del diseño elegido en el estudio). */
  color: string;
}

export const COLOR_POR_DEFECTO = '#2563eb';
const MAX_ENLACES = 6;

const texto = (v: unknown, max: number): string =>
  typeof v === 'string' ? v.replace(/[\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, max) : '';

/** Solo http(s); «linkedin.com/in/x» se completa con https://. Cualquier otro esquema se descarta. */
export function urlSegura(v: unknown): string {
  const t = texto(v, 300);
  if (!t) return '';
  const conEsquema = /^[a-z][a-z0-9+.-]*:/i.test(t) ? t : `https://${t}`;
  try {
    const u = new URL(conEsquema);
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return '';
    if (!u.hostname.includes('.')) return '';
    return u.href;
  } catch {
    return '';
  }
}

const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/;
const TELEFONO = /^\+?[0-9 ().-]{6,24}$/;

export type ResultadoTarjeta = { ok: true; datos: DatosTarjeta } | { ok: false; error: string };

export function validarTarjeta(x: unknown): ResultadoTarjeta {
  if (!x || typeof x !== 'object') return { ok: false, error: 'datos' };
  const o = x as Record<string, unknown>;
  const nombre = texto(o.nombre, 80);
  if (!nombre) return { ok: false, error: 'nombre' };
  const email = texto(o.email, 254);
  if (email && !EMAIL.test(email)) return { ok: false, error: 'email' };
  const telefono = texto(o.telefono, 24);
  if (telefono && !TELEFONO.test(telefono)) return { ok: false, error: 'telefono' };
  const web = urlSegura(o.web);
  const enlaces = (Array.isArray(o.enlaces) ? o.enlaces : [])
    .map((e) => {
      const r = (e ?? {}) as Record<string, unknown>;
      const url = urlSegura(r.url);
      return { etiqueta: texto(r.etiqueta, 40) || (url ? new URL(url).hostname.replace(/^www\./, '') : ''), url };
    })
    .filter((e) => e.url && e.url !== web)
    .slice(0, MAX_ENLACES);
  if (!email && !telefono && !web && !enlaces.length) return { ok: false, error: 'contacto' };
  const color = typeof o.color === 'string' && /^#[0-9a-f]{6}$/i.test(o.color) ? o.color.toLowerCase() : COLOR_POR_DEFECTO;
  return {
    ok: true,
    datos: {
      nombre,
      cargo: texto(o.cargo, 100),
      email,
      telefono,
      web,
      ubicacion: texto(o.ubicacion, 80),
      resumen: texto(o.resumen, 280),
      enlaces,
      color,
    },
  };
}

/** «José Pérez Núñez» → «jose-perez-nunez». */
export function slugBase(nombre: string): string {
  const s = nombre
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
    .replace(/-+$/, '');
  return s || 'tarjeta';
}

export const SLUG_TARJETA_VALIDO = /^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/;

const escVcard = (s: string) => s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/([,;])/g, '\\$1');

/** vCard 3.0 (la que abren bien iOS y Android al pulsar «Guardar contacto»). */
export function vcard(d: DatosTarjeta, url: string): string {
  const partes = d.nombre.split(/\s+/);
  const nombre = partes.shift() ?? '';
  const l = ['BEGIN:VCARD', 'VERSION:3.0', `N:${escVcard(partes.join(' '))};${escVcard(nombre)};;;`, `FN:${escVcard(d.nombre)}`];
  if (d.cargo) l.push(`TITLE:${escVcard(d.cargo)}`);
  if (d.email) l.push(`EMAIL;TYPE=INTERNET:${escVcard(d.email)}`);
  if (d.telefono) l.push(`TEL;TYPE=CELL:${escVcard(d.telefono)}`);
  if (d.web) l.push(`URL:${escVcard(d.web)}`);
  for (const e of d.enlaces) l.push(`URL;TYPE=${escVcard(e.etiqueta).replace(/[^A-Za-z0-9-]/g, '') || 'OTRO'}:${escVcard(e.url)}`);
  if (d.ubicacion) l.push(`ADR;TYPE=WORK:;;;${escVcard(d.ubicacion)};;;`);
  if (d.resumen) l.push(`NOTE:${escVcard(d.resumen)}`);
  l.push(`SOURCE:${escVcard(url)}`, 'END:VCARD');
  return l.join('\r\n') + '\r\n';
}

export interface TarjetaPublicada {
  slug: string;
  datos: DatosTarjeta;
  updated_at: string;
}

const fila = (r: { slug: string; datos: string; updated_at: string } | null): TarjetaPublicada | null => {
  if (!r) return null;
  const v = validarTarjeta(JSON.parse(r.datos));
  return v.ok ? { slug: r.slug, datos: v.datos, updated_at: r.updated_at } : null;
};

export async function tarjetaPorSlug(db: D1Database, slug: string): Promise<TarjetaPublicada | null> {
  if (!SLUG_TARJETA_VALIDO.test(slug)) return null;
  return fila(await db.prepare('SELECT slug, datos, updated_at FROM tarjetas_publicadas WHERE slug = ?').bind(slug).first());
}

export async function tarjetaDePedido(db: D1Database, pedido: string): Promise<TarjetaPublicada | null> {
  return fila(
    await db.prepare('SELECT slug, datos, updated_at FROM tarjetas_publicadas WHERE pedido_public_id = ?').bind(pedido).first(),
  );
}

/**
 * Publica (o vuelve a publicar) la tarjeta del pedido. La dirección se fija la primera vez
 * a partir del nombre y no cambia aunque luego cambien los datos: el QR impreso sigue valiendo.
 */
export async function publicarTarjeta(db: D1Database, pedido: string, datos: DatosTarjeta): Promise<string> {
  const json = JSON.stringify(datos);
  const ya = await db
    .prepare("UPDATE tarjetas_publicadas SET datos = ?, updated_at = datetime('now') WHERE pedido_public_id = ? RETURNING slug")
    .bind(json, pedido)
    .first<{ slug: string }>();
  if (ya) return ya.slug;
  const base = slugBase(datos.nombre);
  const candidatos = [base, ...Array.from({ length: 8 }, (_, i) => `${base}-${i + 2}`)];
  for (let intento = 0; intento < 4; intento++)
    candidatos.push(`${base}-${crypto.getRandomValues(new Uint32Array(1))[0]!.toString(36).slice(0, 5)}`);
  for (const slug of candidatos) {
    const r = await db
      .prepare(
        `INSERT INTO tarjetas_publicadas (slug, pedido_public_id, datos) VALUES (?, ?, ?)
         ON CONFLICT DO NOTHING RETURNING slug`,
      )
      .bind(slug, pedido, json)
      .first<{ slug: string }>();
    if (r) return r.slug;
    // Carrera: otra petición del mismo pedido la acaba de crear.
    const otra = await tarjetaDePedido(db, pedido);
    if (otra) return otra.slug;
  }
  throw new Error('No se encontró una dirección libre para la tarjeta');
}

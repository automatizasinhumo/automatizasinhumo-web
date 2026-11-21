/**
 * Páginas publicadas por el propio cliente desde un estudio (tarjeta digital, CV web, webs…).
 * Un solo modelo para todas: tabla `paginas_publicadas` (migración 0048) con un `tipo`, una
 * dirección fija por pedido y los datos ya validados en JSON. Se sirven todas desde el mismo
 * Worker, sin despliegue por cliente ni alojamiento aparte, en cuanto el pedido está pagado.
 *
 * Añadir un tipo nuevo = registrar su ruta en RUTA_PAGINA y escribir su validador; la
 * publicación, la dirección y la lectura son estas mismas funciones.
 */

/** Ruta pública de cada tipo: /<prefijo>/<slug>. */
export const RUTA_PAGINA = {
  tarjeta: '/c',
  web: '/w',
} as const;
export type TipoPagina = keyof typeof RUTA_PAGINA;

export const SLUG_PAGINA_VALIDO = /^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/;

export const rutaPagina = (tipo: TipoPagina, slug: string) => `${RUTA_PAGINA[tipo]}/${slug}`;

/** «José Pérez Núñez» → «jose-perez-nunez». */
export function slugBase(nombre: string, porDefecto = 'pagina'): string {
  const s = nombre
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
    .replace(/-+$/, '');
  return s || porDefecto;
}

export interface PaginaPublicada<T> {
  slug: string;
  datos: T;
  updated_at: string;
}

/** Revalida al leer: un cambio de validador nunca sirve datos que ya no serían aceptados. */
export type Validador<T> = (x: unknown) => { ok: true; datos: T } | { ok: false; error: string };

type Fila = { slug: string; datos: string; updated_at: string } | null;

function fila<T>(r: Fila, validar: Validador<T>): PaginaPublicada<T> | null {
  if (!r) return null;
  let crudo: unknown;
  try {
    crudo = JSON.parse(r.datos);
  } catch {
    return null;
  }
  const v = validar(crudo);
  return v.ok ? { slug: r.slug, datos: v.datos, updated_at: r.updated_at } : null;
}

export async function paginaPorSlug<T>(db: D1Database, tipo: TipoPagina, slug: string, validar: Validador<T>) {
  if (!SLUG_PAGINA_VALIDO.test(slug)) return null;
  const r = await db
    .prepare('SELECT slug, datos, updated_at FROM paginas_publicadas WHERE tipo = ? AND slug = ?')
    .bind(tipo, slug)
    .first<NonNullable<Fila>>();
  return fila(r, validar);
}

export async function paginaDePedido<T>(db: D1Database, tipo: TipoPagina, pedido: string, validar: Validador<T>) {
  const r = await db
    .prepare('SELECT slug, datos, updated_at FROM paginas_publicadas WHERE tipo = ? AND pedido_public_id = ?')
    .bind(tipo, pedido)
    .first<NonNullable<Fila>>();
  return fila(r, validar);
}

/**
 * Publica (o vuelve a publicar) la página de un pedido. La dirección se fija la primera vez a
 * partir de `nombre` y no cambia aunque luego cambien los datos: el QR o el enlace ya
 * compartidos siguen valiendo.
 */
export async function publicarPagina(
  db: D1Database,
  tipo: TipoPagina,
  pedido: string,
  nombre: string,
  datos: unknown,
): Promise<string> {
  const json = JSON.stringify(datos);
  const ya = await db
    .prepare(
      "UPDATE paginas_publicadas SET datos = ?, updated_at = datetime('now') WHERE tipo = ? AND pedido_public_id = ? RETURNING slug",
    )
    .bind(json, tipo, pedido)
    .first<{ slug: string }>();
  if (ya) return ya.slug;
  const base = slugBase(nombre, tipo);
  const candidatos = [base, ...Array.from({ length: 8 }, (_, i) => `${base}-${i + 2}`)];
  for (let intento = 0; intento < 4; intento++)
    candidatos.push(`${base}-${crypto.getRandomValues(new Uint32Array(1))[0]!.toString(36).slice(0, 5)}`);
  for (const slug of candidatos) {
    const r = await db
      .prepare(
        `INSERT INTO paginas_publicadas (tipo, slug, pedido_public_id, datos) VALUES (?, ?, ?, ?)
         ON CONFLICT DO NOTHING RETURNING slug`,
      )
      .bind(tipo, slug, pedido, json)
      .first<{ slug: string }>();
    if (r) return r.slug;
    // Carrera: otra petición del mismo pedido la acaba de crear.
    const otra = await db
      .prepare('SELECT slug FROM paginas_publicadas WHERE tipo = ? AND pedido_public_id = ?')
      .bind(tipo, pedido)
      .first<{ slug: string }>();
    if (otra) return otra.slug;
  }
  throw new Error(`No se encontró una dirección libre para la página (${tipo})`);
}

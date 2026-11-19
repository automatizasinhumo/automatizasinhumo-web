import type { APIRoute } from 'astro';
import { PUBLIC_CACHE_CONTROL } from '../features/cache/public';
import { env } from 'cloudflare:workers';
import { listProducts, countProducts } from '../features/products/db';
import { listCategories } from '../features/categories/db';
import { listPublishedPages } from '../features/pages/db';
import { catalogPath } from '../features/settings/home';
import { publicOrigin } from '../features/http/origin';
import { getCollection } from 'astro:content';
import { SECTORS } from '../features/blog/sectors';

export const prerender = false;

/**
 * Every URL the sitemap should list, in order.
 *
 * The catalog is included at whichever address it actually lives at. When the
 * home page has been pointed at a page or product, `/` renders that target and
 * canonicals to it — so listing `/` would put a non-canonical duplicate in the
 * sitemap (the target is already listed on its own URL), while the real catalog
 * at `/products` would be missing entirely.
 *
 * Pure and exported so the rule is testable without standing up a request.
 */
export function sitemapLocs(
  origin: string,
  homePage: string | null | undefined,
  data: {
    categories: { slug: string }[];
    products: { slug: string }[];
    pages: { slug: string }[];
    staticPaths?: string[];
  },
): string[] {
  return [
    `${origin}${catalogPath(homePage)}`,
    ...data.categories.map((c) => `${origin}/categories/${c.slug}`),
    ...data.products.map((p) => `${origin}/products/${p.slug}`),
    // Published pages only — drafts must not be discoverable.
    ...data.pages.map((p) => `${origin}/pages/${p.slug}`),
    ...(data.staticPaths ?? []).map((path) => `${origin}${path}`),
  ];
}

/**
 * <lastmod> only where the date is real: a page's updated_at (kept by the app on every
 * save) and a post's pubDate. Products have only created_at, which does not move on edit;
 * a lastmod that never changes or lies is worse than none (Google ignores inaccurate ones).
 */
export function sitemapLastmods(
  origin: string,
  pages: { slug: string; updated_at?: string | null }[],
  blogEntries: { id: string; data: { pubDate: Date } }[],
): Map<string, string> {
  const out = new Map<string, string>();
  const dia = (d: Date) => (Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10));
  for (const p of pages) {
    // D1 datetime('now') es UTC sin zona: «2026-11-19 08:00:00».
    const iso = p.updated_at?.replace(' ', 'T');
    // El parser nativo «corrige» días imposibles (30 de febrero → 2 de marzo): fecha inventada.
    if (!iso || !diaDeCalendarioReal(iso)) continue;
    const d = dia(new Date(/(Z|[+-]\d\d:?\d\d)$/.test(iso) ? iso : `${iso}Z`));
    if (d) out.set(`${origin}/pages/${p.slug}`, d);
  }
  for (const e of blogEntries) {
    const d = dia(e.data.pubDate);
    if (d) out.set(`${origin}/blog/${e.id}`, d);
  }
  return out;
}

/** «AAAA-MM-DD…» con un día que existe en ese mes (bisiestos incluidos). */
function diaDeCalendarioReal(iso: string): boolean {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return false;
  const [a, mes, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const ultimo = new Date(Date.UTC(a, mes, 0)).getUTCDate(); // día 0 del mes siguiente
  return mes >= 1 && mes <= 12 && d >= 1 && d <= ultimo;
}

export function sitemapXml(locs: string[], lastmods: Map<string, string>): string {
  const url = (l: string) => {
    const m = lastmods.get(l);
    return m ? `  <url><loc>${l}</loc><lastmod>${m}</lastmod></url>` : `  <url><loc>${l}</loc></url>`;
  };
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${locs.map(url).join('\n')}
</urlset>
`;
}

export function marketingStaticPaths(blogEntries: { id: string }[]): string[] {
  return [
    '/blog',
    '/elige',
    ...blogEntries.map((entry) => `/blog/${entry.id}`),
    ...SECTORS.map((sector) => `/webs/${sector.slug}`),
  ];
}

// Dynamic sitemap: storefront + every active product, category, and published page. Slugs are
// URL-safe (a-z0-9-), so no XML escaping is needed.
export const GET: APIRoute = async ({ url, locals }) => {
  const origin = publicOrigin(url.origin, env.CANONICAL_ORIGIN);
  const total = await countProducts(env.DB);
  const products = total > 0 ? await listProducts(env.DB, total, 0) : [];
  const categories = await listCategories(env.DB);
  const pages = await listPublishedPages(env.DB);
  const blogEntries = await getCollection('blog');

  const locs = sitemapLocs(origin, locals.settings?.homePage, {
    categories,
    products,
    pages,
    staticPaths: marketingStaticPaths(blogEntries),
  });

  const body = sitemapXml(locs, sitemapLastmods(origin, pages, blogEntries));

  return new Response(body, {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'cache-control': PUBLIC_CACHE_CONTROL,
    },
  });
};

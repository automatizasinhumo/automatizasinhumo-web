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

export function marketingStaticPaths(blogEntries: { id: string }[]): string[] {
  return [
    '/blog',
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

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${locs.map((l) => `  <url><loc>${l}</loc></url>`).join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'cache-control': PUBLIC_CACHE_CONTROL,
    },
  });
};

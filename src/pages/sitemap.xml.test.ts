import { describe, it, expect } from 'vitest';
import { marketingStaticPaths, sitemapLastmods, sitemapLocs, sitemapXml } from './sitemap.xml';

const origin = 'https://shop.example';
const data = {
  categories: [{ slug: 'hats' }],
  products: [{ slug: 'beanie' }],
  pages: [{ slug: 'about' }],
};

describe('sitemapLocs', () => {
  const expectedMarketingPaths = [
    '/blog',
    '/elige',
    '/blog/cuanto-cuesta-una-web-local',
    '/blog/web-o-redes-sociales',
    '/blog/web-para-salir-en-google',
    '/webs/peluquerias',
    '/webs/fontaneros',
    '/webs/restaurantes',
    '/webs/abogados',
    '/webs/fisioterapeutas',
    '/webs/talleres',
  ];

  it('con portada propia del tema lista / y el catálogo en /products', () => {
    const locs = sitemapLocs(origin, 'theme', data);
    expect(locs.slice(0, 2)).toEqual([`${origin}/`, `${origin}/products`]);
  });

  it('lists the catalog at / when the home page is the catalog', () => {
    const locs = sitemapLocs(origin, null, data);
    expect(locs[0]).toBe(`${origin}/`);
    expect(locs).not.toContain(`${origin}/products`);
  });

  // With `/` taken over, it renders the chosen target and canonicals to it — so
  // listing `/` would be a non-canonical duplicate of a URL already in the
  // sitemap, and the real catalog would be absent altogether.
  it('lists the catalog at /products once the home page is overridden', () => {
    const locs = sitemapLocs(origin, 'page:3', data);
    expect(locs[0]).toBe(`${origin}/products`);
    expect(locs).not.toContain(`${origin}/`);
  });

  it('covers every category, product, and published page', () => {
    const locs = sitemapLocs(origin, null, data);
    expect(locs).toContain(`${origin}/categories/hats`);
    expect(locs).toContain(`${origin}/products/beanie`);
    expect(locs).toContain(`${origin}/pages/about`);
    expect(locs).toHaveLength(4);
  });

  it('includes the blog, its articles, and sector landing pages', () => {
    const staticPaths = marketingStaticPaths([
      { id: 'cuanto-cuesta-una-web-local' },
      { id: 'web-o-redes-sociales' },
      { id: 'web-para-salir-en-google' },
    ]);
    const locs = sitemapLocs(origin, null, {
      ...data,
      staticPaths,
    });

    expect(staticPaths).toEqual(expectedMarketingPaths);
    for (const path of expectedMarketingPaths) {
      expect(locs.filter((loc) => loc === `${origin}${path}`)).toHaveLength(1);
    }
  });

  it('never emits a duplicate URL', () => {
    for (const home of [null, 'page:3', 'product:9']) {
      const locs = sitemapLocs(origin, home, data);
      expect(new Set(locs).size).toBe(locs.length);
    }
  });
});

describe('sitemap lastmod', () => {
  it('fecha solo páginas y entradas, en UTC, y omite fechas inválidas', () => {
    const m = sitemapLastmods(
      origin,
      [
        { slug: 'about', updated_at: '2026-11-18 23:30:00' },
        { slug: 'roto', updated_at: 'nunca' },
        { slug: 'sin', updated_at: null },
        { slug: 'feb30', updated_at: '2026-02-30 08:00:00' },
        { slug: 'feb29-no', updated_at: '2026-02-29 08:00:00' },
        { slug: 'feb29-si', updated_at: '2028-02-29 08:00:00' },
        { slug: 'mes13', updated_at: '2026-13-01 08:00:00' },
      ],
      [{ id: 'post', data: { pubDate: new Date('2026-10-01T00:00:00Z') } }],
    );
    expect(Object.fromEntries(m)).toEqual({
      [`${origin}/pages/about`]: '2026-11-18',
      [`${origin}/pages/feb29-si`]: '2028-02-29',
      [`${origin}/blog/post`]: '2026-10-01',
    });
  });

  it('pone lastmod donde hay fecha y lo omite en el resto', () => {
    const xml = sitemapXml(
      [`${origin}/products/beanie`, `${origin}/pages/about`],
      new Map([[`${origin}/pages/about`, '2026-11-18']]),
    );
    expect(xml).toContain(`<url><loc>${origin}/products/beanie</loc></url>`);
    expect(xml).toContain(`<url><loc>${origin}/pages/about</loc><lastmod>2026-11-18</lastmod></url>`);
  });
});

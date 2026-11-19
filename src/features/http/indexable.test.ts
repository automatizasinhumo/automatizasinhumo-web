import { describe, expect, it } from 'vitest';
import { esIndexable, esPrivada, robotsTxt, RUTAS_PRIVADAS } from './indexable';
import { marketingStaticPaths, sitemapLocs } from '../../pages/sitemap.xml';

describe('esIndexable', () => {
  it.each([
    ['https://automatizasinhumo.es', true],
    ['https://www.automatizasinhumo.es', true],
    ['https://automatizasinhumo-staging.davidpd89.workers.dev', false],
    ['https://rama.proyecto.pages.dev', false],
    ['http://automatizasinhumo.es', false],
    ['http://localhost:4321', false],
    ['https://x.workers.dev.', false],
    ['https://x.pages.dev.', false],
    ['https://localhost.', false],
    ['https://automatizasinhumo.es.', true],
    ['http://127.0.0.1:8790', false],
    ['https://[::1]', false],
    ['no es una url', false],
  ])('%s → %s', (origin, esperado) => {
    expect(esIndexable(origin)).toBe(esperado);
  });
});

describe('robotsTxt', () => {
  it('cierra todo fuera de producción', () => {
    expect(robotsTxt('https://x.workers.dev')).toBe('User-agent: *\nDisallow: /\n');
  });

  it('en producción abre el catálogo, cierra lo privado y anuncia el sitemap', () => {
    const body = robotsTxt('https://automatizasinhumo.es');
    expect(body).toContain('User-agent: *\nAllow: /');
    for (const ruta of RUTAS_PRIVADAS) expect(body).toContain(`Disallow: ${ruta}`);
    expect(body).toContain('Sitemap: https://automatizasinhumo.es/sitemap.xml');
    expect(body).not.toMatch(/^Disallow: \/$/m);
  });
});

describe('sitemap y robots no se contradicen', () => {
  it('ninguna URL del sitemap cae en una ruta privada', () => {
    const origin = 'https://automatizasinhumo.es';
    const locs = sitemapLocs(origin, null, {
      categories: [{ slug: 'webs' }],
      products: [{ slug: 'web-una-pagina' }],
      pages: [{ slug: 'preguntas-frecuentes' }],
      staticPaths: marketingStaticPaths([{ id: 'web-para-salir-en-google' }]),
    });
    for (const loc of locs) {
      expect(loc.startsWith(`${origin}/`)).toBe(true);
      expect(esPrivada(new URL(loc).pathname)).toBe(false);
    }
  });

  it('esPrivada sigue la semántica de prefijo de Disallow', () => {
    expect(esPrivada('/admin')).toBe(true);
    expect(esPrivada('/admin/setup')).toBe(true);
    expect(esPrivada('/checkout/ok')).toBe(true);
    expect(esPrivada('/products/web-una-pagina')).toBe(false);
  });
});

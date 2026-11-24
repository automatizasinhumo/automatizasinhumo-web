import { describe, expect, it } from 'vitest';
import { URLPattern as Polyfill } from 'urlpattern-polyfill';
import { CON_QUERY, RUTAS_PRECARGABLES, speculationRules } from './speculation';

// Node 22 (CI) aún no trae URLPattern global; el polyfill sigue la misma especificación
// que usa el navegador para evaluar href_matches.
const URLPattern: typeof Polyfill = (globalThis as { URLPattern?: typeof Polyfill }).URLPattern ?? Polyfill;

const BASE = 'https://automatizasinhumo.es';
const coincide = (p: string | Record<string, string>, url: string) =>
  (typeof p === 'string' ? new URLPattern(p, BASE) : new URLPattern({ ...p, baseURL: BASE })).test(url);
// Lo mismo que evalúa el navegador: alguna ruta de la lista blanca y sin query.
const precarga = (ruta: string) => {
  const url = BASE + ruta;
  return RUTAS_PRECARGABLES.some((p) => coincide(p, url)) && !coincide(CON_QUERY, url);
};

describe('speculation rules', () => {
  it('precarga las páginas públicas de lectura', () => {
    for (const r of ['/', '/products', '/products/web-taller', '/categories/webs', '/pages/preguntas-frecuentes', '/blog', '/blog/x', '/webs/peluquerias', '/curriculum/camarero']) {
      expect(precarga(r), r).toBe(true);
    }
  });

  it('nunca precarga rutas con efectos, privadas o con query', () => {
    for (const r of ['/admin', '/admin/logout', '/api/solicitudes', '/cart', '/checkout', '/orders/abc', '/empezar/web-taller', '/cuenta', '/products/x?pedido=otk_1', '/?error=1', '/products?page=2']) {
      expect(precarga(r), r).toBe(false);
    }
  });

  it('solo prefetch (un prerender contaría vistas del embudo)', () => {
    const reglas = JSON.parse(speculationRules());
    expect(Object.keys(reglas)).toEqual(['prefetch']);
    expect(reglas.prefetch[0].eagerness).toBe('moderate');
  });
});

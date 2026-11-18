import { describe, expect, it } from 'vitest';
import { hasCatalogParams } from './campaignParams';

const has = (query: string) => hasCatalogParams(new URLSearchParams(query));

describe('hasCatalogParams', () => {
  it('ignora los parámetros de campañas', () => {
    expect(has('')).toBe(false);
    expect(has('utm_source=google&utm_medium=cpc&utm_campaign=bodas')).toBe(false);
    expect(has('gclid=abc')).toBe(false);
    expect(has('fbclid=abc')).toBe(false);
    expect(has('srsltid=abc')).toBe(false);
    expect(has('msclkid=abc&ttclid=x')).toBe(false);
  });

  it('respeta búsqueda, filtros, orden y paginación', () => {
    expect(has('q=bodas')).toBe(true);
    expect(has('offset=24')).toBe(true);
    expect(has('sort=price')).toBe(true);
    expect(has('utm_source=google&q=bodas')).toBe(true);
  });
});

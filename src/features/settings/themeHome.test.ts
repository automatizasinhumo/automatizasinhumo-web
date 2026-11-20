import { describe, expect, it } from 'vitest';
import { catalogPath, parseHomeTarget } from './home';
import { conPortadaDelTema, PORTADA_DEL_TEMA } from './themeHome';

describe('conPortadaDelTema', () => {
  it('con portada del tema, el catálogo pasa a /products', () => {
    const s = conPortadaDelTema({ homePage: null }, true);
    expect(s.homePage).toBe(PORTADA_DEL_TEMA);
    expect(catalogPath(s.homePage)).toBe('/products');
    // `/` no se reescribe a ninguna página: la pinta el tema.
    expect(parseHomeTarget(s.homePage)).toEqual({ kind: 'products' });
  });
  it('sin portada del tema no cambia nada', () => {
    expect(conPortadaDelTema({ homePage: null }, false).homePage).toBeNull();
  });
  it('una portada elegida por la tienda manda', () => {
    expect(conPortadaDelTema({ homePage: 'page:3' }, true).homePage).toBe('page:3');
  });
});

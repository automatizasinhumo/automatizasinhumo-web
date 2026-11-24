import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { EUR_POR_USD, MARGEN_DOMINIO_EUR, precioDominioEur } from './registrador';
import { etiquetaOferta } from './estudioWeb';

const leer = (r: string) => readFileSync(new URL(r, import.meta.url), 'utf8');

describe('dominio propio: aparte de la web, a coste + margen', () => {
  it('convierte el coste a euros, suma el margen y redondea al alza', () => {
    expect(precioDominioEur(10.44)).toBe(Math.ceil(10.44 * EUR_POR_USD + MARGEN_DOMINIO_EUR));
    expect(precioDominioEur(10.44)).toBe(15);
  });
  it('usa la renovación si es mayor, para que el precio no suba al renovar', () => {
    expect(precioDominioEur(2, 12)).toBe(precioDominioEur(12));
  });
  it('sin precio válido no inventa uno', () => {
    expect(precioDominioEur(null)).toBeNull();
    expect(precioDominioEur(0)).toBeNull();
    expect(precioDominioEur(Number.NaN)).toBeNull();
  });
  it('solo convierte USD; EUR va tal cual y otra moneda no se ofrece', () => {
    expect(precioDominioEur(10.44, null, 'usd')).toBe(15);
    expect(precioDominioEur(10, null, 'EUR')).toBe(10 + MARGEN_DOMINIO_EUR);
    expect(precioDominioEur(10, null, 'GBP')).toBeNull();
    expect(precioDominioEur(10, null, null)).toBeNull();
  });
  it('los textos no llaman «precio de registro» a un precio con margen', () => {
    for (const r of ['../../pages/servicios/web.astro', '../storefront/ComparativaPrecio.astro']) expect(leer(r)).not.toMatch(/precio de registro/i);
  });
  it('la oferta enseña su precio al año, nunca «Incluido»', () => {
    expect(etiquetaOferta({ euros: 15 })).toBe('15 €/año · Elegir');
    expect(etiquetaOferta({ euros: null })).toBe('Elegir');
  });
  it('ningún texto de la web vende el dominio o el alojamiento como incluidos', () => {
    const textos = [
      '../../pages/servicios/web.astro',
      './catalogo.ts',
      '../storefront/ComparativaPrecio.astro',
      './estudioWeb.ts',
      './dominios.ts',
    ].map(leer).join('\n');
    expect(textos).not.toMatch(/alojamiento incluido|dominio o dirección incluida|Incluido · Elegir|te damos incluidos|de lo incluido/i);
    expect(leer('../../pages/servicios/web.astro')).toMatch(/Dominio propio[^<]*aparte/);
  });
});

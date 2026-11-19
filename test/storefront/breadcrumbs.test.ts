import { describe, expect, it } from 'vitest';
import { breadcrumbJsonLd, productTrail } from '../../src/features/storefront/breadcrumbs';

describe('migas de pan', () => {
  it('la ficha cuelga del catálogo y de su primera categoría', () => {
    const trail = productTrail('/products', [
      { text: 'Webs', href: '/categories/webs' },
      { text: 'Bodas', href: '/categories/bodas' },
    ], 'Web para restaurante');
    expect(trail).toEqual([
      { text: 'Servicios', href: '/products' },
      { text: 'Webs', href: '/categories/webs' },
      { text: 'Web para restaurante', href: null },
    ]);
  });

  it('el JSON-LD usa URL absolutas y el último paso apunta a la página actual', () => {
    const ld = breadcrumbJsonLd(
      [{ text: 'Servicios', href: '/products' }, { text: 'Webs', href: null }],
      'https://ejemplo.es',
      '/categories/webs',
    );
    expect(ld['@type']).toBe('BreadcrumbList');
    expect(ld.itemListElement.map((i) => [i.position, i.item])).toEqual([
      [1, 'https://ejemplo.es/products'],
      [2, 'https://ejemplo.es/categories/webs'],
    ]);
  });
});

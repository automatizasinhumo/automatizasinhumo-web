import type { StorefrontLink } from './models';

/**
 * BreadcrumbList de schema.org a partir de las mismas migas que se ven en la
 * página. El último elemento es la página actual: si no trae href, usa `current`.
 */
export function breadcrumbJsonLd(
  trail: { text: string; href?: string | null }[],
  origin: string,
  current: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: step.text,
      item: new URL(step.href ?? current, origin).href,
    })),
  };
}

/** Migas de un producto: catálogo › su primera categoría › el producto. */
export function productTrail(catalogHref: string, categories: StorefrontLink[], name: string) {
  return [
    { text: 'Servicios', href: catalogHref },
    ...categories.slice(0, 1),
    { text: name, href: null },
  ];
}

/**
 * STORE-OWNED. Áreas del mega menú «Servicios» de la cabecera (tema limpio).
 * Agrupa las categorías del catálogo (slug de D1) en dos niveles como máximo.
 * Una categoría que no exista en D1 solo da un enlace a una página vacía: si se
 * renombra un slug en manual/catalogo/catalogo.mjs, hay que cambiarlo aquí.
 */
const area = (title: string, slug: string, items: [string, string][]) => ({
  title,
  href: `/categories/${slug}`,
  items: items.map(([text, s]) => ({ text, href: `/categories/${s}` })),
});

export const menuAreas = [
  area('Webs', 'webs', [
    ['Webs para tu negocio', 'webs'],
    ['Restaurantes y bares', 'hosteleria'],
    ['Reservas y citas', 'reservas'],
    ['Bodas y eventos', 'bodas'],
    ['Tiendas y productos digitales', 'tiendas'],
    ['Portales y webs editables', 'portales'],
    ['Tarjetas, enlaces y CV', 'identidad'],
  ]),
  area('Automatizaciones e IA', 'automatizaciones', [
    ['Automatizaciones', 'automatizaciones'],
    ['Bots e IA', 'bots'],
    ['Formularios y captación', 'captacion'],
    ['Documentos, PDF e IA', 'documentos'],
    ['Enlaces, QR y analítica', 'enlaces'],
  ]),
  area('Contenido y planes', 'planes', [
    ['Contenido y redes', 'contenido'],
    ['Planes mensuales', 'planes'],
  ]),
];

/** Enlaces de cabecera que ya cubre el mega menú (catálogo y categorías). */
const enMegaMenu = new Set(
  menuAreas.flatMap((a) => [a.href, ...a.items.map((i) => i.href)]).concat('/products'),
);
/** Solo se quita de la fila lo que el mega menú ya enseña; una categoría nueva sigue visible. */
export const coveredByMegaMenu = (href: string) => enMegaMenu.has(href);

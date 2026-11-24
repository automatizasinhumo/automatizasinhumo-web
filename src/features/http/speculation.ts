/**
 * Precarga de la siguiente página (Speculation Rules, estándar del navegador; sin JS propio).
 *
 * Solo `prefetch`, nunca `prerender`: un prerender ejecuta el JS de la página y contaría
 * vistas del embudo que nadie ha visto. Lista BLANCA de rutas públicas de solo lectura:
 * lo que no está aquí (admin, api, carrito, pedidos con token, formularios /empezar,
 * checkout, cuenta) no se precarga aunque se añada mañana una ruta nueva.
 * `moderate` = al pasar el ratón ~200 ms o al pulsar en móvil: pocas peticiones de más.
 * Los navegadores sin soporte lo ignoran.
 */
export const RUTAS_PRECARGABLES = [
  '/',
  '/products',
  '/products/*',
  '/categories/*',
  '/pages/*',
  '/blog',
  '/blog/*',
  '/webs/*',
  '/curriculum/*',
] as const;

/** Cualquier ruta con query no vacía. */
export const CON_QUERY = { pathname: '/*', search: '(.+)' } as const;

export function speculationRules(): string {
  return JSON.stringify({
    prefetch: [
      {
        source: 'document',
        where: {
          and: [
            { href_matches: [...RUTAS_PRECARGABLES] },
            // Con query (filtros, ?pedido=token, ?error=) no: puede llevar estado o secretos.
            // (Forma de diccionario: en cadena, «?» es un modificador y no separa la query.)
            { not: { href_matches: CON_QUERY } },
            { not: { selector_matches: '[rel~=nofollow],[download],[target=_blank],[data-no-precarga]' } },
          ],
        },
        eagerness: 'moderate',
      },
    ],
  });
}

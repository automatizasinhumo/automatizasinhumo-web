/**
 * Portada propia del tema (src/themes/<id>/Home.astro, opcional).
 *
 * Si el tema la trae, `/` deja de ser el catálogo, igual que cuando la tienda
 * apunta la portada a una página: el catálogo pasa a /products. Se aplica una sola
 * vez, al cargar los ajustes en el middleware, para que cabecera, menús, canonical,
 * sitemap y enlaces de «seguir comprando» usen la misma regla sin tocarlos uno a uno.
 */
const portadas = import.meta.glob('#theme/Home.astro');

export const temaConPortada = Object.keys(portadas).length > 0;

/** Valor de homePage que marca «la portada es la del tema». parseHomeTarget lo trata como catálogo. */
export const PORTADA_DEL_TEMA = 'theme';

export function conPortadaDelTema<T extends { homePage: string | null }>(settings: T, hayPortada = temaConPortada): T {
  return hayPortada && !settings.homePage ? { ...settings, homePage: PORTADA_DEL_TEMA } : settings;
}

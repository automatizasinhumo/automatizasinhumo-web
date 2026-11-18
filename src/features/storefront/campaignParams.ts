// Parámetros que añaden los anuncios, los correos y las redes al enlazar la tienda.
// No piden otra vista del catálogo, así que no deben quitar la portada.
const TRACKING_PARAM =
  /^(?:utm_\w+|gad_\w+|gclid|gclsrc|gbraid|wbraid|dclid|srsltid|fbclid|msclkid|ttclid|twclid|li_fat_id|igshid|yclid|mc_cid|mc_eid|_ga|_gl|ref)$/i;

export function isTrackingParam(name: string): boolean {
  return TRACKING_PARAM.test(name);
}

/** True si la URL pide una vista concreta del catálogo (búsqueda, filtro, orden o página). */
export function hasCatalogParams(params: URLSearchParams): boolean {
  for (const name of params.keys()) {
    if (!isTrackingParam(name)) return true;
  }
  return false;
}

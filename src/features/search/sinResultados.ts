/**
 * Búsqueda sin resultados: la consulta viaja al formulario «Cuéntanos qué necesitas»
 * para que el cliente no tenga que reescribirla, y queda un evento en los logs
 * (Workers Observability) para ampliar sinónimos y fichas. No escribe en D1: los bots
 * que buscan basura gastarían el cupo de escrituras.
 */
export const MAX_BUSQUEDA = 120;

/** Limpia la consulta que llega por URL: sin controles, espacios colapsados y recortada. */
export function limpiarBusqueda(valor: string | null | undefined): string {
  return (valor ?? '')
    .replace(/[\p{Cc}\p{Cf}]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_BUSQUEDA);
}

/** Enlace a la consulta libre con la búsqueda ya escrita. */
export function enlaceConsulta(q: string): string {
  const busqueda = limpiarBusqueda(q);
  return busqueda ? `/empezar/consulta?busqueda=${encodeURIComponent(busqueda)}` : '/empezar/consulta';
}

/** Texto inicial del campo «¿Qué necesitas?» cuando se llega desde una búsqueda vacía. */
export function mensajeDesdeBusqueda(valor: string | null | undefined): string {
  const busqueda = limpiarBusqueda(valor);
  return busqueda ? `Busqué «${busqueda}» en la web y no encontré lo que necesito. ` : '';
}

/** Línea de log estructurada (sin IP ni datos personales: solo la consulta). */
export function eventoSinResultados(q: string): string {
  return JSON.stringify({ event: 'busqueda_sin_resultados', q: limpiarBusqueda(q) });
}

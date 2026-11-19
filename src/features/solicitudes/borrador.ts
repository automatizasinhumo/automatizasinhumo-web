/**
 * Borrador del formulario de solicitud, solo en el navegador (localStorage).
 *
 * Si la persona cierra la pestaña, pierde la conexión o el servidor devuelve un error
 * (?error= recarga la página vacía), al volver encuentra lo que escribió. Nada sale
 * del dispositivo: el servidor no ve el borrador. Caduca a los 7 días y se borra al
 * llegar a /empezar/gracias.
 */
export const PREFIJO = 'borrador:';
export const CADUCA_MS = 7 * 86_400_000;

/** Campos que nunca se guardan: ocultos, trampa antispam, consentimiento y token de envío. */
const EXCLUIDOS = new Set(['slug', 'envio', 'pedido', 'web', 'consentimiento', 'referrer', 'utm_source', 'utm_medium', 'utm_campaign']);

export interface Borrador {
  t: number;
  campos: Record<string, string>;
}

export function guardable(nombre: string, tipo: string): boolean {
  return !!nombre && !EXCLUIDOS.has(nombre) && tipo !== 'hidden' && tipo !== 'password' && tipo !== 'file';
}

/** Lee lo guardado; null si no hay, está roto o ha caducado. */
export function leerBorrador(raw: string | null, ahora: number): Borrador | null {
  if (!raw) return null;
  try {
    const b = JSON.parse(raw) as Partial<Borrador>;
    if (typeof b?.t !== 'number' || ahora - b.t > CADUCA_MS || !b.campos || typeof b.campos !== 'object') return null;
    const campos: Record<string, string> = {};
    for (const [k, v] of Object.entries(b.campos)) if (typeof v === 'string' && guardable(k, 'text')) campos[k] = v.slice(0, 5000);
    return Object.keys(campos).length ? { t: b.t, campos } : null;
  } catch {
    return null;
  }
}

/** Serializa los campos con contenido; null si no hay nada que guardar. */
export function crearBorrador(campos: Record<string, string>, ahora: number): string | null {
  const llenos = Object.fromEntries(Object.entries(campos).filter(([k, v]) => guardable(k, 'text') && v.trim() !== ''));
  return Object.keys(llenos).length ? JSON.stringify({ t: ahora, campos: llenos }) : null;
}

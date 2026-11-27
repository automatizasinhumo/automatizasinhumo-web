/**
 * Inicio rápido desde la ficha: el cliente escribe el nombre de su negocio y el estudio se abre con él
 * ya puesto. Viaja por sessionStorage (esta pestaña, una sola vez), nunca por la URL: no queda en
 * historiales, referrers ni analítica. Sin JS la ficha sigue llevando al estudio, solo que vacío.
 */
export const CLAVE_INICIO = 'asnh:webstudio:prefill:v1';
export const MAX_NEGOCIO = 80;

type Almacen = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

export const limpiarNegocio = (s: string): string => s.replace(/\s+/g, ' ').trim().slice(0, MAX_NEGOCIO).trim();

function almacen(): Almacen | null {
  try {
    return sessionStorage;
  } catch {
    return null;
  }
}

/** Guarda el nombre para el estudio. Devuelve false si no hay nombre o no hay almacenamiento. */
export function guardarInicio(negocio: string, a: Almacen | null = almacen()): boolean {
  const n = limpiarNegocio(negocio);
  if (!n || !a) return false;
  try {
    a.setItem(CLAVE_INICIO, JSON.stringify({ v: 1, negocio: n }));
    return true;
  } catch {
    return false;
  }
}

/** Lee el nombre y lo borra: se aplica una vez. Cualquier cosa rara se descarta. */
export function tomarInicio(a: Almacen | null = almacen()): string {
  if (!a) return '';
  try {
    const crudo = a.getItem(CLAVE_INICIO);
    a.removeItem(CLAVE_INICIO);
    const v: unknown = JSON.parse(crudo ?? 'null');
    if (!v || typeof v !== 'object') return '';
    const { v: version, negocio } = v as { v?: unknown; negocio?: unknown };
    return version === 1 && typeof negocio === 'string' ? limpiarNegocio(negocio) : '';
  } catch {
    return '';
  }
}

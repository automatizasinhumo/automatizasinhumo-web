/**
 * Compra común a todos los estudios de autoservicio (CV, web…): dejar el carrito exactamente
 * con lo elegido y recoger el token del pedido pagado que vuelve en `#pedido=<token>`.
 * Un estudio nuevo usa estas dos piezas y no repite el bucle del carrito ni el manejo del token.
 */

/** Pone (cantidad 1) o quita cada línea del carrito; lanza si la tienda rechaza alguna. */
export async function llenarCarrito(lineas: readonly (readonly [key: string, poner: boolean])[]): Promise<void> {
  for (const [key, poner] of lineas) {
    const fd = new FormData();
    fd.set('_action', poner ? 'update' : 'remove');
    fd.set('key', key);
    if (poner) fd.set('qty', '1');
    const r = await fetch('/api/cart', { method: 'POST', body: fd, headers: { 'x-partial': '1' }, credentials: 'same-origin' });
    if (!r.ok) throw new Error(`carrito ${r.status}`);
  }
}

/** Token del pedido pagado: solo en esta pestaña (sessionStorage), nunca en la URL visible. */
export function tokenGuardado(clave: string): string {
  try {
    return sessionStorage.getItem(clave) ?? '';
  } catch {
    return '';
  }
}
export function guardarToken(clave: string, token: string): void {
  try {
    if (token) sessionStorage.setItem(clave, token);
    else sessionStorage.removeItem(clave);
  } catch {
    /* sin almacenamiento: el token vale para esta visita */
  }
}

/**
 * Si el hash trae `#pedido=<token>`, lo guarda, lo quita de la barra de direcciones (y del
 * historial) dejando `destino` como hash, y lo devuelve. Si no, devuelve null.
 */
export function tomarTokenDelHash(clave: string, destino: string): string | null {
  const m = /^#pedido=([^&]+)/.exec(location.hash);
  if (!m) return null;
  let token = '';
  try {
    token = decodeURIComponent(m[1]!);
  } catch {
    return null;
  }
  guardarToken(clave, token);
  history.replaceState(null, '', `${location.pathname}${location.search}${destino}`);
  return token;
}

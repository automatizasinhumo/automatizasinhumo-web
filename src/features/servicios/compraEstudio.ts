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

/**
 * Pedido pagado ligado a su token. Cambiar de token (`#pedido=B` tras A) invalida en el acto el
 * pedido anterior y descarta las respuestas atrasadas: lo que se publica siempre va con el token
 * cuyo pedido está cargado. Cada estudio solo decide qué hacer con el pedido (`alCambiar`).
 */
export interface PedidoEstudio<D extends { ref: string }> {
  /** Token vigente ('' si no hay). */
  readonly token: string;
  /** Pedido del token vigente; null mientras no está comprobado. */
  readonly pagado: D | null;
  /** true mientras se comprueba un token: ni comprar ni publicar. */
  readonly cargando: boolean;
  /** Si el hash trae `#pedido=`, lo toma y lo carga. true si venía. */
  tomar(destino: string): boolean;
  /** Al abrir el estudio: el pedido del hash o, si no viene, el de la pestaña. */
  arrancar(destino: string): void;
  /** ¿Sigue cargado el pedido de este token? Se comprueba tras cada await antes de tocar estado. */
  vigente(token: string): boolean;
}

export function pedidoEstudio<D extends { ref: string }>(clave: string, url: string, alCambiar: (d: D | null) => void): PedidoEstudio<D> {
  let token = '';
  let pagado: D | null = null;
  let gen = 0;
  let cargando = false;
  async function cargar(t: string) {
    const g = ++gen;
    token = t;
    pagado = null;
    cargando = !!t;
    alCambiar(null);
    if (!t) return;
    try {
      const r = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ token: t }) });
      if (g !== gen) return;
      if (r.status === 404) {
        guardarToken(clave, '');
        token = '';
        return;
      }
      if (!r.ok) return;
      const d = (await r.json()) as D;
      if (g !== gen) return;
      pagado = d;
      cargando = false;
      alCambiar(d);
    } catch (e) {
      console.error(e);
    } finally {
      if (g === gen && cargando) {
        cargando = false;
        alCambiar(null);
      }
    }
  }
  return {
    get token() {
      return token;
    },
    get pagado() {
      return pagado;
    },
    get cargando() {
      return cargando;
    },
    tomar(destino) {
      const t = tomarTokenDelHash(clave, destino);
      if (t !== null) void cargar(t);
      return t !== null;
    },
    arrancar(destino) {
      if (!this.tomar(destino)) void cargar(tokenGuardado(clave));
    },
    vigente(t) {
      return !!t && t === token && pagado !== null;
    },
  };
}

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

/** Pedidos que se acumulan en la pestaña (CV + un extra comprado después…): como mucho estos. */
export const MAX_TOKENS = 5;
/** Lista de tokens guardada: JSON `["a","b"]` o, de antes, un token suelto. */
export function leerTokens(raw: string): string[] {
  if (!raw) return [];
  if (!raw.startsWith('[')) return [raw];
  try {
    const v: unknown = JSON.parse(raw);
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string' && !!x).slice(-MAX_TOKENS) : [];
  } catch {
    return [];
  }
}
/** Añade un token al final (sin repetir) y conserva solo los MAX_TOKENS últimos. */
export function sumarToken(lista: readonly string[], t: string): string[] {
  return [...lista.filter((x) => x !== t), t].slice(-MAX_TOKENS);
}

/** Un pedido cargado con su token. */
export interface PedidoCargado<D> {
  token: string;
  d: D;
}

/**
 * Pedido pagado ligado a su token. Cambiar de token (`#pedido=B` tras A) invalida en el acto el
 * pedido anterior y descarta las respuestas atrasadas: lo que se publica siempre va con el token
 * cuyo pedido está cargado. Cada estudio solo decide qué hacer con el pedido (`alCambiar`).
 *
 * Con `combinar`, un token nuevo se suma a los de la pestaña en vez de sustituirlos: volver de
 * pagar un extra suelto no hace olvidar el CV ya pagado (ni lo vuelve a cobrar). `combinar` une
 * los pedidos cargados y elige el token con el que se actúa (p. ej. el que incluye la tarjeta).
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

export function pedidoEstudio<D extends { ref: string }>(
  clave: string,
  url: string,
  alCambiar: (d: D | null) => void,
  combinar?: (pedidos: PedidoCargado<D>[]) => PedidoCargado<D> | null,
): PedidoEstudio<D> {
  let token = '';
  let pagado: D | null = null;
  let gen = 0;
  let cargando = false;
  const guardados = () => (combinar ? leerTokens(tokenGuardado(clave)) : [tokenGuardado(clave)].filter(Boolean));
  const guardar = (lista: string[]) => guardarToken(clave, combinar ? (lista.length ? JSON.stringify(lista) : '') : (lista.at(-1) ?? ''));
  async function cargar(lista: string[]) {
    const g = ++gen;
    token = lista.at(-1) ?? '';
    pagado = null;
    cargando = lista.length > 0;
    alCambiar(null);
    if (!lista.length) return;
    try {
      const cargados: PedidoCargado<D>[] = [];
      const caducados: string[] = [];
      for (const t of lista) {
        const r = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ token: t }) });
        if (g !== gen) return;
        if (r.status === 404) caducados.push(t);
        else if (r.ok) cargados.push({ token: t, d: (await r.json()) as D });
        if (g !== gen) return;
      }
      if (caducados.length) guardar(lista.filter((t) => !caducados.includes(t)));
      const elegido = combinar ? combinar(cargados) : (cargados.at(-1) ?? null);
      if (!elegido) {
        if (caducados.length === lista.length) token = '';
        return;
      }
      token = elegido.token;
      pagado = elegido.d;
      cargando = false;
      alCambiar(elegido.d);
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
      const previos = guardados();
      const t = tomarTokenDelHash(clave, destino);
      if (t === null) return false;
      const lista = combinar ? sumarToken(previos, t) : [t];
      guardar(lista);
      void cargar(lista);
      return true;
    },
    arrancar(destino) {
      if (!this.tomar(destino)) void cargar(guardados());
    },
    vigente(t) {
      return !!t && t === token && pagado !== null;
    },
  };
}

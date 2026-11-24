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
  /** true mientras se comprueba un token o alguna consulta falló: ni comprar ni publicar. */
  readonly cargando: boolean;
  /** Si el hash trae `#pedido=`, lo toma y lo carga. true si venía. */
  tomar(destino: string): boolean;
  /** Al abrir el estudio: el pedido del hash o, si no viene, el de la pestaña. */
  arrancar(destino: string): void;
  /** ¿Sigue cargado el pedido de este token? Se comprueba tras cada await antes de tocar estado. */
  vigente(token: string): boolean;
}

/** Reintentos de las consultas caídas (red, 5xx) antes de rendirse hasta recargar la página. */
export const REINTENTOS = 3;

/**
 * Consulta cada token por separado: un 404 es un pedido caducado; un fallo de red o un 5xx de uno
 * no tumba los demás, queda en `fallidos` (no es lo mismo que no existir).
 */
export async function consultarPedidos<D>(
  lista: readonly string[],
  url: string,
  sigue: () => boolean = () => true,
  pedir: typeof fetch = fetch,
): Promise<{ cargados: PedidoCargado<D>[]; caducados: string[]; fallidos: string[] }> {
  const cargados: PedidoCargado<D>[] = [];
  const caducados: string[] = [];
  const fallidos: string[] = [];
  for (const t of lista) {
    if (!sigue()) break;
    try {
      const r = await pedir(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ token: t }) });
      if (r.status === 404) caducados.push(t);
      else if (r.ok) cargados.push({ token: t, d: (await r.json()) as D });
      else fallidos.push(t);
    } catch (e) {
      console.error(e);
      fallidos.push(t);
    }
  }
  return { cargados, caducados, fallidos };
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
  async function cargar(lista: string[], intento = 0) {
    const g = ++gen;
    token = lista.at(-1) ?? '';
    if (!intento) pagado = null;
    cargando = lista.length > 0;
    if (!intento) alCambiar(null);
    if (!lista.length) return;
    const { cargados, caducados, fallidos } = await consultarPedidos<D>(lista, url, () => g === gen);
    if (g !== gen) return;
    const vivos = lista.filter((t) => !caducados.includes(t));
    if (caducados.length) guardar(vivos);
    const elegido = combinar ? combinar(cargados) : (cargados.at(-1) ?? null);
    // Una consulta caída no es un pedido inexistente: se enseña lo que hay, pero sin dejar comprar
    // ni publicar (cargando sigue en true) hasta que respondan todos; si no, se ofrecería volver a
    // pagar un CV ya pagado.
    const incompleto = fallidos.length > 0;
    if (elegido) {
      token = elegido.token;
      pagado = elegido.d;
    } else if (!incompleto && !vivos.length) token = '';
    cargando = incompleto;
    alCambiar(pagado);
    if (incompleto && intento < REINTENTOS) setTimeout(() => g === gen && void cargar(vivos, intento + 1), 1500 * (intento + 1));
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

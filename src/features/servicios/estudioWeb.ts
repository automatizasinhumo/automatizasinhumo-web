/**
 * Lógica del estudio de webs (/servicios/web). Mismo esquema que el de CV (estudioCv.ts):
 * pasos en el hash, datos guardados en este navegador y vista previa con marca de agua.
 * La vista es la web real (renderWeb) en un Shadow DOM, así que se ve exactamente lo que se
 * publicará; los estilos de la tienda no la tocan y los suyos no se escapan.
 *
 * Compra: «Comprar» deja la web en el carrito y lleva al pago. El pedido pagado vuelve con
 * «#pedido=<token>»: el estudio lo comprueba en /api/web/pedido y la publica en /w/<nombre>
 * con /api/web/publicar. Volver a publicar actualiza la misma dirección.
 */
import { guardarToken, llenarCarrito, tokenGuardado, tomarTokenDelHash } from './compraEstudio';
import { euros } from './cv';
import { protegerVista } from './protegerVista';
import { MARCA_WEB, PASOS_WEB, PLANTILLAS_WEB, renderWeb, validarWeb, type DatosWeb } from './webs';

type Lista = 'servicios' | 'enlaces';
type Fila = Record<string, string>;
type Contenido = Omit<DatosWeb, 'plantilla' | 'color' | 'letra'>;
interface Config {
  producto: string;
  precio: number;
  css: string;
  ejemplo: DatosWeb;
  porDefecto: Pick<DatosWeb, 'plantilla' | 'color' | 'letra'>;
  plantillas: string[];
  letras: string[];
  maxServicios: number;
  maxEnlaces: number;
}
interface Estado {
  plantilla: string;
  color: string;
  letra: string;
  alcanzado: number;
  contenido: Partial<Contenido> | null;
  tamano: 'movil' | 'escritorio';
  /** Pedido cuya web publicada hay en el formulario ('' si es un diseño nuevo sin publicar). */
  pedido: string;
}
interface Pagado {
  ref: string;
  slug: string | null;
}

const CLAVE = 'servicios:web';
const CLAVE_PEDIDO = 'servicios:web:pedido';
const PASOS = PASOS_WEB.map((p) => p.id) as string[];
const CAMPOS = ['negocio', 'sector', 'lema', 'sobre', 'telefono', 'whatsapp', 'email', 'direccion', 'horario'] as const;
const LISTAS: Lista[] = ['servicios', 'enlaces'];
const COLOR = /^#[0-9a-f]{6}$/i;
const ERROR_PUBLICAR: Record<string, string> = {
  negocio: 'Falta el nombre del negocio.',
  telefono: 'Revisa el teléfono: solo números, espacios y +.',
  whatsapp: 'Revisa el WhatsApp: solo números, espacios y +.',
  email: 'Revisa el correo: no parece válido.',
  contacto: 'Añade al menos un teléfono, un WhatsApp o un correo.',
  pedido: 'Este pedido no incluye la web.',
};
/** Estilos solo de la vista previa: sin seleccionar texto y la miniatura a escala. */
const CSS_VISTA = ':host{display:block;user-select:none;-webkit-user-select:none}.mini{width:250%;transform:scale(.4);transform-origin:0 0}';

function leer(): Partial<Estado> {
  try {
    const v = JSON.parse(localStorage.getItem(CLAVE) ?? 'null');
    return v && typeof v === 'object' ? v : {};
  } catch {
    return {};
  }
}
function guardar(e: Estado) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(e));
  } catch {
    /* sin almacenamiento: el estudio sigue funcionando en esta visita */
  }
}

export function iniciarEstudioWeb() {
  const raiz = document.getElementById('estudio-web');
  const form = document.getElementById('estudio-form') as HTMLFormElement | null;
  if (!raiz || !form) return;
  const cfg = JSON.parse(raiz.dataset.config ?? '{}') as Config;
  const $ = <T = HTMLElement>(sel: string, el: HTMLElement = raiz) => el.querySelector(sel) as T | null;
  const $$ = <T = HTMLElement>(sel: string, el: HTMLElement = raiz) => [...el.querySelectorAll(sel)] as T[];
  const campo = <T = HTMLInputElement>(nombre: string) => form.elements.namedItem(nombre) as unknown as T;
  const secciones = new Map<string, HTMLElement>(PASOS.map((id) => [id, $<HTMLElement>(`[data-paso="${id}"]`)!]));
  const vista = $('[data-vista]')!;
  const host = $('[data-host]')!;
  const barra = $('[data-barra]')!;
  protegerVista(vista);
  const sombra = host.attachShadow({ mode: 'closed' });

  const g = leer();
  const estado: Estado = {
    plantilla: cfg.plantillas.includes(g.plantilla ?? '') ? g.plantilla! : '',
    color: COLOR.test(g.color ?? '') ? g.color! : cfg.porDefecto.color,
    letra: cfg.letras.includes(g.letra ?? '') ? g.letra! : cfg.porDefecto.letra,
    alcanzado: Math.min(PASOS.length - 1, Math.max(0, Number(g.alcanzado) || 0)),
    contenido: g.contenido && typeof g.contenido === 'object' ? g.contenido : null,
    tamano: g.tamano === 'escritorio' ? 'escritorio' : 'movil',
    pedido: typeof g.pedido === 'string' ? g.pedido : '',
  };
  if (!estado.plantilla) estado.alcanzado = 0;
  let actual = 'plantilla';

  // ---------- Formulario ----------
  function anadir(lista: Lista, valores: Fila = {}) {
    const t = document.getElementById(`t-${lista}`) as HTMLTemplateElement | null;
    const caja = $(`[data-lista="${lista}"] [data-items]`);
    if (!t || !caja) return null;
    const item = t.content.firstElementChild!.cloneNode(true) as HTMLElement;
    for (const c of $$<HTMLInputElement>('[data-k]', item)) {
      const v = valores[c.dataset.k!];
      if (typeof v === 'string') c.value = v;
    }
    caja.appendChild(item);
    return item;
  }
  /** El botón «Añadir» desaparece al llegar al máximo que acepta la web. */
  function limitar() {
    for (const l of LISTAS) {
      const fs = $(`[data-lista="${l}"]`)!;
      const max = Number(fs.dataset.max) || Infinity;
      $('[data-anadir]', fs)!.hidden = $$('[data-items] > .item', fs).length >= max;
    }
  }
  function volcar(c: Partial<Contenido>) {
    for (const k of CAMPOS) campo(k).value = typeof c[k] === 'string' ? c[k] : '';
    for (const l of LISTAS) {
      $(`[data-lista="${l}"] [data-items]`)!.replaceChildren();
      for (const fila of Array.isArray(c[l]) ? (c[l] as unknown as Fila[]) : []) anadir(l, fila);
    }
    limitar();
  }
  function recoger(): Contenido {
    const c = {} as Record<string, unknown>;
    for (const k of CAMPOS) c[k] = campo(k).value.trim();
    for (const l of LISTAS)
      c[l] = $$('[data-items] > .item', $(`[data-lista="${l}"]`)!).map((item) =>
        Object.fromEntries($$<HTMLInputElement>('[data-k]', item).map((x) => [x.dataset.k!, x.value.trim()])),
      );
    return c as unknown as Contenido;
  }
  const vacio = (): Partial<Contenido> => ({ servicios: [{ nombre: '', precio: '', texto: '' }], enlaces: [] });
  const ejemplo = (): Contenido => {
    const { plantilla: _p, color: _c, letra: _l, ...c } = cfg.ejemplo;
    return c;
  };
  const datos = (): DatosWeb => ({ ...recoger(), plantilla: estado.plantilla || cfg.porDefecto.plantilla, color: estado.color, letra: estado.letra }) as DatosWeb;
  const nombrePlantilla = (id: string) => PLANTILLAS_WEB.find((p) => p.id === id)?.nombre ?? id;

  // ---------- Vista previa ----------
  /** Lo que se ve es lo que se publica: el mismo HTML, con marca de agua. Solo se pintan datos de muestra si no hay nada escrito. */
  function pintar() {
    const d = datos();
    const muestra = !d.negocio;
    const v = muestra ? { ...cfg.ejemplo, plantilla: d.plantilla, color: d.color, letra: d.letra } : paraVista(d);
    sombra.innerHTML = `<style>${cfg.css}${CSS_VISTA}</style>${renderWeb(v, { marca: MARCA_WEB })}`;
    barra.textContent = `${location.host}/w/${slugDe(v.negocio)}`;
    vista.dataset.tamano = estado.tamano;
    $('[data-estado]')!.textContent = muestra ? 'Ejemplo: escribe tus datos y aparecerán aquí' : `Vista previa · diseño ${nombrePlantilla(v.plantilla)}`;
  }
  /**
   * Lo escrito a medias también se ve: pasa por la misma limpieza que al publicar (validarWeb),
   * pero un contacto aún incompleto o mal escrito se omite en lugar de dejar la vista en blanco.
   */
  function paraVista(d: DatosWeb): DatosWeb {
    const vale = (k: 'telefono' | 'whatsapp' | 'email') => !!d[k] && validarWeb({ negocio: 'x', [k]: d[k] }).ok;
    const r = validarWeb({ ...d, telefono: '', whatsapp: '', email: 'vista@previa.es' });
    if (!r.ok) return { ...cfg.ejemplo, plantilla: d.plantilla, color: d.color, letra: d.letra, negocio: d.negocio };
    return { ...r.datos, telefono: vale('telefono') ? d.telefono : '', whatsapp: vale('whatsapp') ? d.whatsapp : '', email: vale('email') ? d.email : '' };
  }
  let temporizador = 0;
  function programar(inmediato = false) {
    window.clearTimeout(temporizador);
    if (vista.hidden) return;
    temporizador = window.setTimeout(pintar, inmediato ? 0 : 150);
  }
  /** Igual que el servidor al fijar la dirección la primera vez (aproximado: solo para la barra). */
  const slugDe = (s: string) =>
    s
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40) || 'tu-negocio';

  /** Miniaturas de las plantillas: el ejemplo pintado con cada diseño, a escala. */
  function miniaturas() {
    for (const el of $$('[data-mini]')) {
      const s = el.attachShadow({ mode: 'closed' });
      s.innerHTML = `<style>${cfg.css}${CSS_VISTA}</style><div class="mini">${renderWeb({ ...cfg.ejemplo, plantilla: el.dataset.mini as DatosWeb['plantilla'] })}</div>`;
    }
  }

  // ---------- Personalización ----------
  function pintarControles() {
    for (const n of ['plantilla', 'plantilla-rapida']) for (const r of $$<HTMLInputElement>(`input[name="${n}"]`, form ?? undefined)) r.checked = r.value === estado.plantilla;
    let fijo = false;
    for (const r of $$<HTMLInputElement>('input[name="color"]', form ?? undefined)) {
      r.checked = r.value.toLowerCase() === estado.color.toLowerCase();
      fijo ||= r.checked;
    }
    campo('colorLibre').value = estado.color;
    $('.muestra-libre')?.toggleAttribute('data-activo', !fijo);
    for (const r of $$<HTMLInputElement>('input[name="letra"]', form ?? undefined)) r.checked = r.value === estado.letra;
    for (const r of $$<HTMLInputElement>('input[name="tamano-vista"]')) r.checked = r.value === estado.tamano;
  }

  // ---------- Pasos ----------
  function validar(paso: string) {
    let ok = true;
    if (paso === 'plantilla') ok = !!estado.plantilla;
    if (paso === 'datos') {
      const c = recoger();
      const negocio = campo('negocio');
      const contacto = !!(c.telefono || c.whatsapp || c.email);
      ok = !!c.negocio && contacto;
      negocio.toggleAttribute('aria-invalid', !c.negocio);
      if (!c.negocio) negocio.focus();
      else if (!contacto) campo('telefono').focus();
    }
    const aviso = $(`[data-error="${paso}"]`);
    if (aviso) aviso.hidden = ok;
    return ok;
  }
  function resumir() {
    const res = (k: string) => $(`[data-res="${k}"]`)!;
    res('negocio').textContent = campo('negocio').value.trim();
    res('plantilla').textContent = nombrePlantilla(estado.plantilla);
    $('[data-solo-compra]')!.hidden = !!pagado;
    $('[data-solo-pagado]')!.hidden = !pagado;
    if (pagado) res('ref').textContent = pagado.ref;
    const b = $('[data-comprar] span');
    if (b) b.textContent = pagado ? (pagado.slug ? 'Guardar los cambios en mi web' : 'Publicar mi web') : `Comprar y publicar · ${euros(cfg.precio)}`;
    if (pagado?.slug && !$('[data-estado-compra] a')) avisar(`/w/${pagado.slug}`, 'Tu web está publicada en');
  }

  // ---------- Compra y publicación ----------
  let pagado: Pagado | null = null;
  let token = '';
  async function comprar(b: HTMLButtonElement) {
    const st = $('[data-estado-compra]')!;
    persistir();
    b.disabled = true;
    st.textContent = 'Preparando tu pedido…';
    try {
      await llenarCarrito([[cfg.producto, true]]);
      location.assign('/cart');
    } catch (e) {
      console.error(e);
      st.textContent = 'No hemos podido preparar el pedido. Inténtalo de nuevo en un momento; tus datos siguen guardados.';
      b.disabled = false;
    }
  }
  function avisar(url: string, texto: string) {
    const st = $('[data-estado-compra]')!;
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.className = 'font-semibold underline';
    a.textContent = `${location.host}${url}`;
    st.dataset.tono = '';
    st.replaceChildren(`${texto} `, a);
  }
  async function publicar(b: HTMLButtonElement) {
    const st = $('[data-estado-compra]')!;
    b.disabled = true;
    st.textContent = 'Publicando…';
    try {
      const r = await fetch('/api/web/publicar', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ token, datos: datos() }) });
      const d = (await r.json().catch(() => ({}))) as { ok?: boolean; url?: string; slug?: string; error?: string };
      if (!d.ok || !d.url) {
        st.dataset.tono = 'error';
        st.textContent = ERROR_PUBLICAR[d.error ?? ''] ?? 'No se ha podido publicar. Inténtalo de nuevo en un momento.';
        return;
      }
      if (pagado) {
        pagado.slug = d.slug ?? null;
        estado.pedido = pagado.ref;
        persistir();
      }
      avisar(d.url, 'Publicada en');
      resumir();
    } catch (e) {
      console.error(e);
      st.dataset.tono = 'error';
      st.textContent = 'No se ha podido publicar. Revisa tu conexión e inténtalo de nuevo.';
    } finally {
      b.disabled = false;
    }
  }
  async function cargarPedido() {
    try {
      const r = await fetch('/api/web/pedido', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ token }) });
      if (r.status === 404) {
        guardarToken(CLAVE_PEDIDO, '');
        token = '';
        return;
      }
      if (!r.ok) return;
      const d = (await r.json()) as { ref: string; slug: string | null; datos: DatosWeb | null };
      pagado = { ref: d.ref, slug: d.slug };
      // Se recupera lo publicado para seguir editándolo si el formulario está vacío (otro navegador)
      // o tiene la web de otro pedido (#pedido=B tras A en la misma pestaña): nunca se publica
      // en un pedido lo escrito para otro. Un diseño nuevo aún sin publicar se conserva.
      const ajeno = !!estado.pedido && estado.pedido !== d.ref;
      if (d.datos && (ajeno || !campo('negocio').value.trim())) {
        const { plantilla, color, letra, ...c } = d.datos;
        Object.assign(estado, { plantilla, color, letra, alcanzado: PASOS.length - 1, pedido: d.ref });
        volcar(c);
        persistir();
        pintarControles();
      }
      if (actual === 'publica') resumir();
    } catch (e) {
      console.error(e);
    }
  }
  function tomarPedido(): boolean {
    const t = tomarTokenDelHash(CLAVE_PEDIDO, estado.plantilla && estado.alcanzado >= PASOS.length - 1 ? '#publica' : '');
    if (t === null) return false;
    token = t;
    void cargarPedido();
    return true;
  }

  function mostrar(paso: string, enfocar: boolean) {
    const i = PASOS.indexOf(paso);
    actual = paso;
    for (const [id, s] of secciones) s.hidden = id !== paso;
    for (const b of $$<HTMLButtonElement>('.progreso [data-ir]')) {
      const j = PASOS.indexOf(b.dataset.ir!);
      b.disabled = j > estado.alcanzado;
      if (j === i) b.setAttribute('aria-current', 'step');
      else b.removeAttribute('aria-current');
      b.toggleAttribute('data-hecho', j < i || (j <= estado.alcanzado && j !== i));
    }
    const hueco = $('[data-hueco-vista]', secciones.get(paso)!);
    if (hueco) {
      hueco.appendChild(vista);
      vista.hidden = false;
      programar(true);
    } else vista.hidden = true;
    if (paso === 'personaliza') pintarControles();
    if (paso === 'publica') resumir();
    if (enfocar) {
      const h = $<HTMLElement>('h2', secciones.get(paso)!)!;
      h.tabIndex = -1;
      h.focus({ preventScroll: true });
      $('.progreso-fijo')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    }
  }
  function ir(paso: string) {
    if (location.hash !== `#${paso}`) location.hash = paso;
    else mostrar(paso, true);
  }
  function desdeHash(enfocar: boolean) {
    const pedido = location.hash.slice(1);
    const i = PASOS.indexOf(pedido);
    mostrar(i >= 0 && i <= estado.alcanzado ? pedido : PASOS[0]!, enfocar);
  }
  function persistir() {
    estado.contenido = recoger();
    guardar(estado);
  }

  // ---------- Eventos ----------
  raiz.addEventListener('click', (ev) => {
    const b = (ev.target as HTMLElement).closest<HTMLElement>('button, [data-ir]');
    if (!b) return;
    if (b.dataset.ir) {
      ev.preventDefault();
      if (PASOS.indexOf(b.dataset.ir) <= estado.alcanzado) ir(b.dataset.ir);
      return;
    }
    if (b.hasAttribute('data-siguiente')) {
      if (!validar(actual)) return;
      const i = PASOS.indexOf(actual) + 1;
      estado.alcanzado = Math.max(estado.alcanzado, i);
      persistir();
      return ir(PASOS[i]!);
    }
    if (b.hasAttribute('data-atras')) return ir(PASOS[Math.max(0, PASOS.indexOf(actual) - 1)]!);
    if (b.hasAttribute('data-anadir')) {
      const l = b.closest<HTMLElement>('[data-lista]')!.dataset.lista as Lista;
      anadir(l)?.querySelector<HTMLInputElement>('[data-k]')?.focus();
      limitar();
      persistir();
      return programar();
    }
    if (b.hasAttribute('data-quitar')) {
      b.closest('.item')?.remove();
      limitar();
      persistir();
      return programar();
    }
    if (b.hasAttribute('data-vaciar')) {
      volcar(vacio());
      persistir();
      return programar(true);
    }
    if (b.hasAttribute('data-ejemplo')) {
      volcar(ejemplo());
      $('[data-error="datos"]')!.hidden = true;
      persistir();
      return programar(true);
    }
    if (b.hasAttribute('data-comprar')) return void (pagado ? publicar(b as HTMLButtonElement) : comprar(b as HTMLButtonElement));
  });

  form.addEventListener('submit', (ev) => ev.preventDefault());
  form.addEventListener('change', (ev) => {
    const c = ev.target as HTMLInputElement;
    if (c.name === 'tamano-vista') {
      estado.tamano = c.value === 'escritorio' ? 'escritorio' : 'movil';
      vista.dataset.tamano = estado.tamano;
      return guardar(estado);
    }
    if (c.name === 'plantilla' || c.name === 'plantilla-rapida') {
      estado.plantilla = c.value;
      $('[data-error="plantilla"]')!.hidden = true;
    } else if (c.name === 'color') estado.color = c.value;
    else if (c.name === 'letra') estado.letra = c.value;
    persistir();
    pintarControles();
    programar();
  });
  form.addEventListener('input', (ev) => {
    const c = ev.target as HTMLInputElement;
    if (c.type === 'radio') return;
    if (c.name === 'colorLibre' && COLOR.test(c.value)) {
      estado.color = c.value;
      pintarControles();
    } else if (c.name === 'negocio' && c.value.trim()) c.removeAttribute('aria-invalid');
    persistir();
    programar();
  });
  window.addEventListener('hashchange', () => {
    tomarPedido();
    desdeHash(true);
  });

  // ---------- Arranque ----------
  volcar(estado.contenido ?? vacio());
  pintarControles();
  miniaturas();
  if (!tomarPedido()) {
    token = tokenGuardado(CLAVE_PEDIDO);
    if (token) void cargarPedido();
  }
  desdeHash(false);
}

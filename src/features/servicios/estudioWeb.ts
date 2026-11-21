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
import { llenarCarrito, pedidoEstudio } from './compraEstudio';
import { euros } from './cv';
import { protegerVista } from './protegerVista';
import { textosDeSector } from './sectores';
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
interface RespuestaDominio {
  ok?: boolean;
  disponible?: boolean;
  error?: string;
  dominio?: { dominio: string; estado: 'esperando_dns' | 'conectando' | 'activo' | 'error'; servidores: string[]; detalle: string | null } | null;
}

interface Pagado {
  ref: string;
  slug: string | null;
  datos: DatosWeb | null;
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
/** Ancho al que se pinta la vista «Ordenador» antes de escalarla al panel: pasa los cortes de 640 y 960 px. */
const ANCHO_ESCRITORIO = 1100;
const CSS_VISTA = `:host{display:block;user-select:none;-webkit-user-select:none}.mini{width:250%;transform:scale(.4);transform-origin:0 0}:host([data-escritorio]) .w{width:${ANCHO_ESCRITORIO}px;zoom:var(--escala,1)}`;

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
  /**
   * Textos de partida de su sector (sectores.ts) en lo que el cliente aún no ha escrito: frase,
   * «Quiénes somos» y servicios. Lo escrito no se toca. Devuelve si ha rellenado algo.
   */
  function rellenarTextos(): boolean {
    const c = recoger();
    const t = textosDeSector(c.sector, c.negocio, c.direccion);
    let algo = false;
    if (!c.lema) (campo('lema').value = t.lema), (algo = true);
    if (!c.sobre) (campo<HTMLTextAreaElement>('sobre').value = t.sobre), (algo = true);
    if (c.servicios.every((s) => !s.nombre && !s.precio && !s.texto)) {
      $('[data-lista="servicios"] [data-items]')!.replaceChildren();
      for (const s of t.servicios.slice(0, cfg.maxServicios)) anadir('servicios', { ...s });
      limitar();
      algo = true;
    }
    return algo;
  }
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
    escalar();
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
  /** «Ordenador»: la web a ancho de escritorio real, reducida para caber en el panel. */
  function escalar() {
    vista.dataset.tamano = estado.tamano;
    const escritorio = estado.tamano === 'escritorio';
    host.toggleAttribute('data-escritorio', escritorio);
    if (escritorio && host.clientWidth) host.style.setProperty('--escala', String(Math.min(1, host.clientWidth / ANCHO_ESCRITORIO)));
  }
  new ResizeObserver(escalar).observe(host);
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
    $('[data-solo-compra]')!.hidden = !!pedido.pagado;
    $('[data-solo-pagado]')!.hidden = !pedido.pagado;
    if (pedido.pagado) res('ref').textContent = pedido.pagado.ref;
    const b = $('[data-comprar] span');
    if (b) b.textContent = pedido.pagado ? (pedido.pagado.slug ? 'Guardar los cambios en mi web' : 'Publicar mi web') : `Comprar y publicar · ${euros(cfg.precio)}`;
    if (pedido.pagado?.slug && !$('[data-estado-compra] a')) avisar(`/w/${pedido.pagado.slug}`, 'Tu web está publicada en');
    if (pedido.pagado?.slug && dominioDe !== pedido.token) {
      dominioDe = pedido.token;
      void dominio();
    } else if (!pedido.pagado?.slug && dominioDe) {
      // Otro pedido sin web publicada: la tarjeta no debe enseñar el dominio del anterior.
      clearTimeout(sondeo);
      dominioDe = null;
      cambiando = false;
      $('[data-dominio]')!.hidden = true;
      $('[data-estado-dominio]')!.replaceChildren();
    }
  }

  // ---------- Dominio propio (/api/web/dominio; ver dominios.ts) ----------
  // La tarjeta solo aparece con la web publicada y la conexión activa en el servidor. Mientras
  // el dominio no está listo, el estudio pregunta cada minuto (y el cron del Worker, cada 5).
  let dominioDe: string | null = null;
  let cambiando = false;
  let sondeo: ReturnType<typeof setTimeout> | undefined;
  async function dominio(cuerpo: { dominio?: string } = {}) {
    const token = pedido.token;
    if (!token || !pedido.pagado?.slug) return;
    clearTimeout(sondeo);
    let d: RespuestaDominio;
    try {
      const r = await fetch('/api/web/dominio', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ token, ...cuerpo }) });
      d = (await r.json().catch(() => ({}))) as RespuestaDominio;
    } catch {
      d = { ok: false, error: 'No hemos podido comprobar tu dominio. Revisa tu conexión.' };
    }
    if (!pedido.vigente(token)) return;
    // Si falla la consulta del estado, se vuelve a preguntar al pasar otra vez por «Publicar».
    if (!d.ok && !cuerpo.dominio) dominioDe = null;
    if (d.ok) cambiando = false;
    pintarDominio(d);
  }
  function pintarDominio(d: RespuestaDominio) {
    const caja = $('[data-dominio]')!;
    const st = $('[data-estado-dominio]')!;
    if (!d.ok) {
      st.dataset.tono = 'error';
      st.textContent = d.error ?? 'No se ha podido conectar el dominio. Inténtalo de nuevo en un momento.';
      return;
    }
    const v = d.dominio ?? null;
    caja.hidden = !d.disponible && !v;
    if (caja.hidden) return;
    st.dataset.tono = '';
    $('[data-dominio-pedir]')!.hidden = !!v && !cambiando;
    $('[data-dominio-pasos]')!.hidden = !v || v.estado === 'activo' || cambiando;
    if (!v) return void st.replaceChildren();
    $('[data-dominio-nombre]')!.textContent = v.dominio;
    $('[data-dominio-ns]')!.replaceChildren(
      ...v.servidores.map((ns) => {
        const li = document.createElement('li');
        const code = document.createElement('code');
        code.className = 'select-all font-semibold';
        code.textContent = ns;
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'ml-2 text-xs underline';
        b.dataset.copiar = ns;
        b.textContent = 'Copiar';
        li.appendChild(code);
        li.appendChild(b);
        return li;
      }),
    );
    if (v.estado === 'activo') {
      const a = document.createElement('a');
      a.href = `https://${v.dominio}/`;
      a.target = '_blank';
      a.rel = 'noopener';
      a.className = 'font-semibold underline';
      a.textContent = v.dominio;
      st.replaceChildren('Tu web ya está en ', a, '. Los cambios que publiques aquí salen también allí.');
      return;
    }
    st.textContent =
      v.estado === 'conectando'
        ? 'Servidores DNS cambiados. Estamos preparando el certificado https; tarda unos minutos.'
        : 'Esperando a que cambies los servidores DNS. Puedes cerrar esta página: te escribimos cuando esté.';
    sondeo = setTimeout(() => {
      if (actual === 'publica' && !document.hidden) void dominio();
      else dominioDe = null; // se vuelve a preguntar al volver a este paso
    }, 60_000);
  }
  function conectarDominio() {
    const c = campo('dominio');
    const valor = c.value.trim();
    const st = $('[data-estado-dominio]')!;
    if (!valor) {
      st.dataset.tono = 'error';
      st.textContent = 'Escribe tu dominio, por ejemplo peluquerialola.es.';
      return c.focus();
    }
    st.dataset.tono = '';
    st.textContent = 'Conectando…';
    void dominio({ dominio: valor });
  }

  // ---------- Compra y publicación ----------
  const destinoPedido = () => (estado.plantilla && estado.alcanzado >= PASOS.length - 1 ? '#publica' : '');
  const pedido = pedidoEstudio<Pagado>(CLAVE_PEDIDO, '/api/web/pedido', (d) => {
    if (d) recuperar(d);
    if (actual === 'publica') resumir();
  });
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
    // Solo con el pedido del token vigente ya cargado: nunca el token de B con lo escrito para A.
    const token = pedido.token;
    const pagado = pedido.pagado;
    if (!pagado || !pedido.vigente(token)) return;
    b.disabled = true;
    st.textContent = 'Publicando…';
    try {
      const r = await fetch('/api/web/publicar', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ token, datos: datos() }) });
      const d = (await r.json().catch(() => ({}))) as { ok?: boolean; url?: string; slug?: string; error?: string };
      if (!pedido.vigente(token)) return;
      if (!d.ok || !d.url) {
        st.dataset.tono = 'error';
        st.textContent = ERROR_PUBLICAR[d.error ?? ''] ?? 'No se ha podido publicar. Inténtalo de nuevo en un momento.';
        return;
      }
      pagado.slug = d.slug ?? null;
      estado.pedido = pagado.ref;
      persistir();
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
  /**
   * Pedido recién comprobado. Se recupera lo publicado para seguir editándolo si el formulario está
   * vacío (otro navegador) o tiene la web de otro pedido (#pedido=B tras A en la misma pestaña):
   * nunca se publica en un pedido lo escrito para otro; si B aún no tiene web, el formulario se
   * vacía. Un diseño nuevo aún sin publicar se conserva y se publica solo al volver del pago.
   */
  function recuperar(d: Pagado) {
    const ajeno = !!estado.pedido && estado.pedido !== d.ref;
    if (d.datos && (ajeno || !campo('negocio').value.trim())) {
      const { plantilla, color, letra, ...c } = d.datos;
      Object.assign(estado, { plantilla, color, letra, alcanzado: PASOS.length - 1, pedido: d.ref });
      volcar(c);
      persistir();
      pintarControles();
      programar(true);
      return;
    }
    if (ajeno) {
      estado.pedido = d.ref;
      volcar(vacio());
      persistir();
      programar(true);
      return;
    }
    const b = $<HTMLButtonElement>('[data-comprar]');
    if (!d.slug && b && validar('plantilla') && validar('datos')) void publicar(b);
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
    if (b.hasAttribute('data-textos')) {
      const st = $('[data-estado-textos]')!;
      st.textContent = rellenarTextos()
        ? 'Listo: hemos escrito la frase, la presentación y los servicios. Cámbialos a tu gusto.'
        : 'Ya tienes todo escrito. Borra lo que quieras rehacer y vuelve a pulsar.';
      persistir();
      return programar(true);
    }
    if (b.hasAttribute('data-ejemplo')) {
      volcar(ejemplo());
      $('[data-error="datos"]')!.hidden = true;
      persistir();
      return programar(true);
    }
    if (b.hasAttribute('data-conectar')) return conectarDominio();
    if (b.hasAttribute('data-dominio-cambiar')) {
      cambiando = true;
      $('[data-dominio-pedir]')!.hidden = false;
      $('[data-dominio-pasos]')!.hidden = true;
      return campo('dominio').focus();
    }
    if (b.dataset.copiar) {
      const t = b.textContent;
      void navigator.clipboard?.writeText(b.dataset.copiar).then(() => {
        b.textContent = 'Copiado';
        setTimeout(() => (b.textContent = t), 1500);
      });
      return;
    }
    if (b.hasAttribute('data-comprar')) return void (pedido.cargando ? undefined : pedido.pagado ? publicar(b as HTMLButtonElement) : comprar(b as HTMLButtonElement));
  });

  form.addEventListener('submit', (ev) => ev.preventDefault());
  // Sin botón de envío el formulario no se envía con Enter: en el campo del dominio, Enter conecta.
  form.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' && (ev.target as HTMLInputElement).name === 'dominio') {
      ev.preventDefault();
      conectarDominio();
    }
  });
  form.addEventListener('change', (ev) => {
    const c = ev.target as HTMLInputElement;
    // Al decir a qué se dedica, la web se rellena sola con los textos de su sector.
    if (c.name === 'sector' && c.value.trim() && rellenarTextos()) {
      $('[data-estado-textos]')!.textContent = 'Hemos escrito unos textos para tu sector. Cámbialos a tu gusto.';
      persistir();
      return programar(true);
    }
    if (c.name === 'tamano-vista') {
      estado.tamano = c.value === 'escritorio' ? 'escritorio' : 'movil';
      escalar();
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
    if (c.type === 'radio' || c.name === 'dominio') return;
    if (c.name === 'colorLibre' && COLOR.test(c.value)) {
      estado.color = c.value;
      pintarControles();
    } else if (c.name === 'negocio' && c.value.trim()) c.removeAttribute('aria-invalid');
    persistir();
    programar();
  });
  window.addEventListener('hashchange', () => {
    pedido.tomar(destinoPedido());
    desdeHash(true);
  });

  // ---------- Arranque ----------
  volcar(estado.contenido ?? vacio());
  pintarControles();
  miniaturas();
  pedido.arrancar(destinoPedido());
  desdeHash(false);
}

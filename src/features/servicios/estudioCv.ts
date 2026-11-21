/**
 * Lógica del estudio de CV (/servicios/cv): asistente por pasos con el estado en el hash
 * (el botón Atrás del navegador funciona), datos guardados en este navegador y vista
 * previa con marca de agua generada por el motor (cv-estudio/), que se carga al elegir diseño.
 *
 * Compra: «Comprar» deja en el carrito la modalidad elegida (y los extras marcados) y lleva al
 * pago. El pedido pagado vuelve aquí con «#pedido=<token>» (el hash no llega a ningún servidor):
 * el estudio lo comprueba en /api/cv/pedido, descarga el PDF sin marca de agua y, si incluye la
 * tarjeta, la publica en /c/<nombre> con los datos del CV.
 */
import { ESPACIADOS, ESTILOS_LETRA, FORMATO_INICIAL, PASOS_CV, TAMANOS, euros, type DisenoCv, type ExtraCv, type ModalidadCv, type PaqueteCv } from './cv';
import { ANCHO_MAX_VISTA, protegerVista } from './protegerVista';

type Lista = 'experiencia' | 'formacion' | 'habilidades' | 'idiomas';
type Fila = Record<string, string | number>;
type FormCv = Record<string, string> & Record<Lista, Fila[]>;
type Decoracion = { forma: string; color: string; intensidad: number; sombreado: boolean };
interface Motor {
  crearDatos(f: FormCv, plantilla: string): unknown;
  formEjemplo: FormCv;
  formVacio: FormCv;
  crearPdf(o: {
    datos: unknown;
    plantilla: string;
    color?: string;
    decoracion?: Decoracion | null;
    marcaAgua: string;
    letra?: string;
    tamano?: string;
    espaciado?: string;
  }): Promise<Blob>;
  pintarPdf(b: Blob, c: HTMLElement, o: { ancho: number; maxPaginas: number }): Promise<number>;
  importar(f: File): Promise<{ ok: true; tipo: string; form: FormCv } | { ok: false; motivo: 'tipo' | 'vacio' | 'lectura' }>;
}

const AVISO_IMPORTAR = {
  leyendo: 'Leyendo tu CV…',
  ok: 'Listo: hemos rellenado tus datos con tu CV. Repásalos, por si falta algo.',
  tipo: 'Ese archivo no se puede leer. Sube un PDF, un Word (.docx), la exportación de LinkedIn (.zip) o un JSON Resume.',
  vacio: 'No hemos encontrado texto en ese archivo (¿es una foto o un escaneo?). Prueba con otro o escribe tus datos.',
  lectura: 'No hemos podido leer ese archivo. Prueba con otro formato o escribe tus datos.',
} as const;
interface Config {
  motor: string;
  porDefecto: string;
  disenos: DisenoCv[];
  paquetes: Record<ModalidadCv, PaqueteCv>;
  extras: ExtraCv[];
}
type DatosTarjeta = Record<string, unknown> & { enlaces?: { etiqueta: string; url: string }[] };
interface Pagado {
  ref: string;
  cv: ModalidadCv | null;
  tarjeta: { slug: string | null; datos: DatosTarjeta | null } | null;
}
interface Estado {
  diseno: string;
  base: string;
  color: string;
  forma: string;
  intensidad: number;
  sombreado: boolean;
  letra: string;
  tamano: string;
  espaciado: string;
  alcanzado: number;
  form: FormCv | null;
}

const CLAVE = 'servicios:cv';
/** Token del pedido pagado: solo en esta pestaña (sessionStorage), nunca en la URL visible. */
const CLAVE_PEDIDO = 'servicios:cv:pedido';
const ERROR_TARJETA: Record<string, string> = {
  nombre: 'Falta el nombre.',
  email: 'Revisa el correo: no parece válido.',
  telefono: 'Revisa el teléfono: solo números, espacios y +.',
  contacto: 'Añade al menos un correo, un teléfono, una web o tu LinkedIn.',
  pedido: 'Este pedido no incluye la tarjeta digital.',
};
const LISTAS: Lista[] = ['experiencia', 'formacion', 'habilidades', 'idiomas'];
const CAMPOS = ['nombre', 'titular', 'email', 'telefono', 'ubicacion', 'resumen'];
const PASOS = PASOS_CV.map((p) => p.id) as string[];
const MARCA = 'VISTA PREVIA';
const NUMERICOS = new Set(['nivel', 'puntos']);
/** Opciones de formato que se guardan y se mandan tal cual al motor. */
const FORMATO = { letra: ESTILOS_LETRA, tamano: TAMANOS, espaciado: ESPACIADOS } as const;
type ClaveFormato = keyof typeof FORMATO;
const CLAVES_FORMATO = Object.keys(FORMATO) as ClaveFormato[];
const valido = (k: ClaveFormato, v: unknown) => FORMATO[k].some((o) => o.id === v);

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

export function iniciarEstudioCv() {
  const raiz = document.getElementById('estudio-cv');
  const form = document.getElementById('estudio-form') as HTMLFormElement | null;
  if (!raiz || !form) return;
  const cfg = JSON.parse(raiz.dataset.config ?? '{}') as Config;
  const idsDiseno = new Set(cfg.disenos.map((d) => d.id));
  const $ = <T = HTMLElement>(sel: string, el: HTMLElement = raiz) => el.querySelector(sel) as T | null;
  const $$ = <T = HTMLElement>(sel: string, el: HTMLElement = raiz) => [...el.querySelectorAll(sel)] as T[];
  const campo = <T = HTMLInputElement>(nombre: string) => form.elements.namedItem(nombre) as unknown as T;
  const secciones = new Map<string, HTMLElement>(PASOS.map((id) => [id, $<HTMLElement>(`[data-paso="${id}"]`)!]));
  const vista = $('[data-vista]')!;
  const lienzo = $('[data-lienzo]')!;
  const estadoVista = $('[data-estado]')!;
  protegerVista(vista);

  const g = leer();
  const estado: Estado = {
    diseno: g.diseno === 'personalizable' || idsDiseno.has(g.diseno ?? '') ? g.diseno! : '',
    base: idsDiseno.has(g.base ?? '') ? g.base! : cfg.porDefecto,
    color: /^#[0-9a-f]{6}$/i.test(g.color ?? '') ? g.color! : '#176b5a',
    forma: typeof g.forma === 'string' ? g.forma : 'circulos',
    intensidad: Number(g.intensidad) || 0.7,
    sombreado: g.sombreado ?? true,
    letra: valido('letra', g.letra) ? g.letra! : FORMATO_INICIAL.letra,
    tamano: valido('tamano', g.tamano) ? g.tamano! : FORMATO_INICIAL.tamano,
    espaciado: valido('espaciado', g.espaciado) ? g.espaciado! : FORMATO_INICIAL.espaciado,
    alcanzado: Math.min(PASOS.length - 1, Math.max(0, Number(g.alcanzado) || 0)),
    form: g.form && typeof g.form === 'object' ? g.form : null,
  };
  if (!estado.diseno) estado.alcanzado = 0;
  let actual = 'plantilla';

  // Motor: se pide una vez y se reutiliza.
  let motorP: Promise<Motor> | null = null;
  const motor = () =>
    (motorP ??= (async () => {
      await import(/* @vite-ignore */ new URL(cfg.motor, location.href).href);
      return (window as unknown as { CvEstudio: Motor }).CvEstudio;
    })().catch((e) => {
      motorP = null;
      throw e;
    }));

  const modalidad = (): ModalidadCv => (estado.diseno === 'personalizable' ? 'personalizable' : 'disenada');
  const plantilla = () => (modalidad() === 'personalizable' ? estado.base : estado.diseno || cfg.porDefecto);
  const nombreDiseno = (id: string) => cfg.disenos.find((d) => d.id === id)?.nombre ?? id;

  // ---------- Formulario ----------
  function anadir(lista: Lista, valores: Fila = {}) {
    const t = document.getElementById(`t-${lista}`) as HTMLTemplateElement | null;
    const caja = $(`[data-lista="${lista}"] [data-items]`);
    if (!t || !caja) return null;
    const item = t.content.firstElementChild!.cloneNode(true) as HTMLElement;
    for (const c of $$<HTMLInputElement>('[data-k]', item)) {
      const v = valores[c.dataset.k!];
      if (v !== undefined && v !== null) c.value = String(v);
    }
    caja.appendChild(item);
    return item;
  }
  function volcar(f: FormCv) {
    for (const k of CAMPOS) {
      const c = campo<HTMLInputElement | null>(k);
      if (c) c.value = typeof f[k] === 'string' ? f[k] : '';
    }
    for (const l of LISTAS) {
      $(`[data-lista="${l}"] [data-items]`)?.replaceChildren();
      for (const fila of Array.isArray(f[l]) ? f[l] : []) anadir(l, fila);
    }
  }
  function recoger(): FormCv {
    const f = {} as FormCv;
    for (const k of CAMPOS) f[k] = (campo<HTMLInputElement | null>(k)?.value ?? '').trim();
    for (const l of LISTAS) {
      f[l] = $$('[data-items] > .item', $(`[data-lista="${l}"]`)!).map((item) => {
        const fila: Fila = {};
        for (const c of $$<HTMLInputElement>('[data-k]', item)) fila[c.dataset.k!] = NUMERICOS.has(c.dataset.k!) && c.tagName === 'SELECT' ? Number(c.value) : c.value.trim();
        return fila;
      });
    }
    return f;
  }
  const vacio = (): FormCv => ({ ...Object.fromEntries(CAMPOS.map((k) => [k, ''])), experiencia: [], formacion: [], habilidades: [], idiomas: [] }) as unknown as FormCv;

  // ---------- Personalización ----------
  function pintarControles() {
    for (const r of $$<HTMLInputElement>('input[name="diseno"]')) r.checked = r.value === estado.diseno;
    const base = campo<HTMLSelectElement>('base');
    base.value = estado.base;
    let fijo = false;
    for (const r of $$<HTMLInputElement>('input[name="color"]')) {
      r.checked = r.value.toLowerCase() === estado.color.toLowerCase();
      fijo ||= r.checked;
    }
    campo<HTMLInputElement>('colorLibre').value = estado.color;
    $('.muestra-libre')?.toggleAttribute('data-activo', !fijo);
    for (const r of $$<HTMLInputElement>('input[name="forma"]')) r.checked = r.value === estado.forma;
    campo<HTMLInputElement>('intensidad').value = String(estado.intensidad);
    campo<HTMLInputElement>('sombreado').checked = estado.sombreado;
    for (const k of CLAVES_FORMATO) for (const r of $$<HTMLInputElement>(`input[name="${k}"]`)) r.checked = r.value === estado[k];
    const m = modalidad();
    for (const el of $$('[data-solo]')) el.hidden = el.dataset.solo !== m;
    const dif = $('[data-diferencia]');
    if (dif) dif.textContent = euros(cfg.paquetes.personalizable.precio - cfg.paquetes.disenada.precio);
  }

  // ---------- Vista previa ----------
  function crearPdf(E: Motor, marcaAgua: string, personal: boolean) {
    return E.crearPdf({
      datos: E.crearDatos(recoger(), plantilla()),
      plantilla: plantilla(),
      color: personal ? estado.color : undefined,
      decoracion: personal ? { forma: estado.forma, color: estado.color, intensidad: estado.intensidad, sombreado: estado.sombreado } : null,
      marcaAgua,
      letra: estado.letra,
      tamano: estado.tamano,
      espaciado: estado.espaciado,
    });
  }
  let temporizador = 0;
  let turno = 0;
  function programar(inmediato = false) {
    window.clearTimeout(temporizador);
    if (actual === 'plantilla' || actual === 'descarga') return;
    temporizador = window.setTimeout(pintar, inmediato ? 0 : 400);
  }
  async function pintar() {
    const mio = ++turno;
    vista.setAttribute('aria-busy', 'true');
    if (!lienzo.childElementCount) estadoVista.textContent = 'Preparando la vista previa…';
    try {
      const E = await motor();
      const personal = modalidad() === 'personalizable';
      const blob = await crearPdf(E, MARCA, personal);
      if (mio !== turno) return;
      const tmp = document.createElement('div');
      const ancho = Math.min(ANCHO_MAX_VISTA, Math.round((lienzo.clientWidth || 600) * Math.min(2, window.devicePixelRatio || 1)));
      const paginas = await E.pintarPdf(blob, tmp, { ancho, maxPaginas: actual === 'revisa' ? 3 : 2 });
      if (mio !== turno) return;
      lienzo.replaceChildren(...tmp.childNodes);
      estadoVista.textContent = `${paginas === 1 ? '1 página' : `${paginas} páginas`} · ${nombreDiseno(plantilla())}${personal ? ' personalizado' : ''}`;
    } catch (e) {
      if (mio !== turno) return;
      console.error(e);
      estadoVista.textContent = 'No se ha podido generar la vista previa. Cambia algo o recarga la página para reintentarlo.';
    } finally {
      if (mio === turno) vista.removeAttribute('aria-busy');
    }
  }

  // ---------- Pasos ----------
  function validar(paso: string) {
    let ok = true;
    if (paso === 'plantilla') ok = !!estado.diseno;
    if (paso === 'datos') {
      const nombre = campo<HTMLInputElement>('nombre');
      ok = !!nombre.value.trim();
      if (!ok) {
        nombre.setAttribute('aria-invalid', 'true');
        nombre.focus();
      }
    }
    const aviso = $(`[data-error="${paso}"]`);
    if (aviso) aviso.hidden = ok;
    return ok;
  }
  function repasar() {
    const f = recoger();
    const puntos: [boolean, string, string][] = [
      [!!f.nombre, 'Nombre', 'Falta tu nombre'],
      [!!(f.email || f.telefono), 'Forma de contacto', 'Añade un correo o un teléfono'],
      [!!f.resumen, 'Resumen', 'Sin resumen: un par de frases ayudan mucho'],
      [f.experiencia.some((e) => e.puesto || e.empresa), 'Experiencia', 'Sin experiencia añadida'],
      [f.formacion.some((e) => e.titulo || e.centro), 'Formación', 'Sin formación añadida'],
    ];
    $('[data-repaso]')?.replaceChildren(
      ...puntos.map(([ok, bien, mal]) => {
        const li = document.createElement('li');
        li.dataset.ok = String(ok);
        li.textContent = ok ? `✓ ${bien}` : `• ${mal}`;
        return li;
      }),
    );
  }
  const extraPagado = (x: ExtraCv) => x.id === 'tarjeta' && !!pagado?.tarjeta;
  const extraMarcado = (x: ExtraCv) => !extraPagado(x) && !!$<HTMLInputElement>(`[data-extra="${x.producto}"]`)?.checked;
  function resumir() {
    const m = modalidad();
    const p = cfg.paquetes[m];
    const res = (k: string) => $(`[data-res="${k}"]`)!;
    const cvPagado = !!pagado?.cv;
    // Un extra ya pagado no se vuelve a ofrecer.
    for (const x of cfg.extras) $(`[data-extra="${x.producto}"]`)!.closest('label')!.hidden = extraPagado(x);
    const total = p.precio + cfg.extras.reduce((t, x) => t + (extraMarcado(x) ? x.precio : 0), 0);
    res('diseno').textContent = nombreDiseno(plantilla());
    res('modalidad').textContent = p.nombre;
    res('precio').textContent = euros(total);
    $('[data-solo-compra]')!.hidden = cvPagado;
    $('[data-solo-pagado]')!.hidden = !cvPagado;
    if (pagado) res('ref').textContent = pagado.ref;
    rellenarTarjeta();
    res('incluye').replaceChildren(
      ...p.incluye.map((x) => {
        const li = document.createElement('li');
        li.textContent = x;
        return li;
      }),
    );
    const comprar = $('[data-comprar] span');
    if (comprar) comprar.textContent = cvPagado ? 'Descargar mi PDF' : `Comprar y descargar · ${euros(total)}`;
    const st = $('[data-estado-compra]');
    if (st && cvPagado && pagado!.cv === 'disenada' && m === 'personalizable')
      st.textContent = 'Tu pedido es del diseño listo: el PDF sale con el diseño base, sin tu color ni las formas.';
  }

  // ---------- Compra y pedido pagado ----------
  let pagado: Pagado | null = null;
  let token = '';
  /** Deja el carrito exactamente con lo elegido (cantidad 1, sin la otra modalidad) y va al pago. */
  async function comprar(b: HTMLButtonElement) {
    const st = $('[data-estado-compra]')!;
    const m = modalidad();
    const lineas: [string, boolean][] = (Object.keys(cfg.paquetes) as ModalidadCv[]).map((k) => [`${cfg.paquetes[k].producto}:${cfg.paquetes[k].variante}`, k === m]);
    for (const x of cfg.extras) if (!extraPagado(x)) lineas.push([x.producto, extraMarcado(x)]);
    persistir();
    b.disabled = true;
    st.textContent = 'Preparando tu pedido…';
    try {
      for (const [key, poner] of lineas) {
        const fd = new FormData();
        fd.set('_action', poner ? 'update' : 'remove');
        fd.set('key', key);
        if (poner) fd.set('qty', '1');
        const r = await fetch('/api/cart', { method: 'POST', body: fd, headers: { 'x-partial': '1' }, credentials: 'same-origin' });
        if (!r.ok) throw new Error(`carrito ${r.status}`);
      }
      location.assign('/cart');
    } catch (e) {
      console.error(e);
      st.textContent = 'No hemos podido preparar el pedido. Inténtalo de nuevo en un momento; tus datos siguen guardados.';
      b.disabled = false;
    }
  }
  async function descargar(b: HTMLButtonElement) {
    const st = $('[data-estado-compra]')!;
    b.disabled = true;
    st.textContent = 'Preparando tu PDF…';
    try {
      // Solo sale personalizado si eso es lo que se pagó.
      const personal = modalidad() === 'personalizable' && pagado?.cv === 'personalizable';
      const blob = await crearPdf(await motor(), '', personal);
      const nombre = recoger().nombre.replace(/[\\/:*?"<>|]+/g, '').trim();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `CV ${nombre || 'currículum'}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.setTimeout(() => URL.revokeObjectURL(a.href), 30_000);
      st.textContent = 'Listo: lo tienes en tus descargas. Puedes cambiar lo que quieras y volver a descargarlo.';
    } catch (e) {
      console.error(e);
      st.textContent = 'No se ha podido generar el PDF. Recarga la página e inténtalo otra vez.';
    } finally {
      b.disabled = false;
    }
  }
  async function cargarPedido() {
    try {
      const r = await fetch('/api/cv/pedido', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ token }) });
      if (r.status === 404) {
        try {
          sessionStorage.removeItem(CLAVE_PEDIDO);
        } catch {
          /* sin almacenamiento */
        }
        token = '';
        return;
      }
      if (!r.ok) return;
      const d = (await r.json()) as Pagado & { ok: boolean };
      pagado = { ref: d.ref, cv: d.cv, tarjeta: d.tarjeta };
      if (actual === 'descarga') resumir();
    } catch (e) {
      console.error(e);
    }
  }
  function tomarPedido(): boolean {
    const m = /^#pedido=([^&]+)/.exec(location.hash);
    if (!m) return false;
    try {
      token = decodeURIComponent(m[1]!);
      sessionStorage.setItem(CLAVE_PEDIDO, token);
    } catch {
      /* sin almacenamiento: el token vale para esta visita */
    }
    // Fuera de la barra de direcciones (y del historial) y directo a descargar si ya hay CV.
    const destino = estado.diseno && estado.alcanzado >= PASOS.length - 1 ? '#descarga' : '';
    history.replaceState(null, '', `${location.pathname}${location.search}${destino}`);
    void cargarPedido();
    return true;
  }

  // ---------- Tarjeta digital ----------
  const campoT = (k: string) => $<HTMLInputElement>(`[data-t="${k}"]`)!;
  let tarjetaRellena = false;
  function rellenarTarjeta() {
    const caja = $('[data-tarjeta-form]')!;
    caja.hidden = !pagado?.tarjeta;
    if (!pagado?.tarjeta || tarjetaRellena) return;
    tarjetaRellena = true;
    const f = recoger();
    const g = pagado.tarjeta.datos;
    const v = (k: string, alt: string) => (g && typeof g[k] === 'string' ? (g[k] as string) : alt);
    campoT('nombre').value = v('nombre', f.nombre);
    campoT('cargo').value = v('cargo', f.titular);
    campoT('email').value = v('email', f.email);
    campoT('telefono').value = v('telefono', f.telefono);
    campoT('web').value = v('web', '');
    campoT('ubicacion').value = v('ubicacion', f.ubicacion);
    campoT('resumen').value = v('resumen', f.resumen.slice(0, 280));
    campoT('color').value = v('color', estado.color);
    campoT('linkedin').value = g?.enlaces?.find((e) => /linkedin\./i.test(e.url))?.url ?? '';
    if (pagado.tarjeta.slug) avisarTarjeta(`/c/${pagado.tarjeta.slug}`, 'Ya está publicada en');
  }
  function avisarTarjeta(url: string, texto: string) {
    const st = $('[data-estado-tarjeta]')!;
    const enlace = (href: string, t: string) => {
      const a = document.createElement('a');
      a.href = href;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = t;
      return a;
    };
    st.dataset.tono = '';
    st.replaceChildren(`${texto} `, enlace(url, `${location.host}${url}`), ' · ', enlace(`${url}/qr.svg`, 'QR para imprimir'));
  }
  async function publicar(b: HTMLButtonElement) {
    const st = $('[data-estado-tarjeta]')!;
    const val = (k: string) => campoT(k).value.trim();
    const linkedin = val('linkedin');
    const datos = {
      nombre: val('nombre'),
      cargo: val('cargo'),
      email: val('email'),
      telefono: val('telefono'),
      web: val('web'),
      ubicacion: val('ubicacion'),
      resumen: val('resumen'),
      color: val('color'),
      enlaces: linkedin ? [{ etiqueta: 'LinkedIn', url: linkedin }] : [],
    };
    b.disabled = true;
    st.textContent = 'Publicando…';
    try {
      const r = await fetch('/api/cv/publicar', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ token, datos }) });
      const d = (await r.json().catch(() => ({}))) as { ok?: boolean; url?: string; slug?: string; error?: string };
      if (!d.ok || !d.url) {
        st.dataset.tono = 'error';
        st.textContent = ERROR_TARJETA[d.error ?? ''] ?? 'No se ha podido publicar. Inténtalo de nuevo en un momento.';
        return;
      }
      if (pagado?.tarjeta) pagado.tarjeta = { slug: d.slug ?? null, datos };
      avisarTarjeta(d.url, 'Publicada en');
    } catch (e) {
      console.error(e);
      st.dataset.tono = 'error';
      st.textContent = 'No se ha podido publicar. Revisa tu conexión e inténtalo de nuevo.';
    } finally {
      b.disabled = false;
    }
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
    if (paso === 'revisa') repasar();
    if (paso === 'descarga') resumir();
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
    mostrar(i >= 0 && i <= estado.alcanzado ? pedido : PASOS[0], enfocar);
  }
  function persistir() {
    estado.form = recoger();
    guardar(estado);
  }

  // ---------- Importar un CV existente ----------
  async function importar(fichero: File) {
    const nota = $('[data-estado-importar]');
    const avisar = (clave: keyof typeof AVISO_IMPORTAR) => {
      if (!nota) return;
      nota.textContent = AVISO_IMPORTAR[clave];
      nota.dataset.tono = clave === 'ok' || clave === 'leyendo' ? '' : 'error';
    };
    avisar('leyendo');
    try {
      const r = await (await motor()).importar(fichero);
      if (!r.ok) return avisar(r.motivo);
      volcar(r.form);
      persistir();
      programar(true);
      avisar('ok');
    } catch {
      avisar('lectura');
    }
  }

  // ---------- Eventos ----------
  raiz.addEventListener('click', (ev) => {
    const b = (ev.target as Element).closest<HTMLElement>('button');
    if (!b || !raiz.contains(b)) return;
    if (b.dataset.ir) return ir(b.dataset.ir);
    if (b.hasAttribute('data-siguiente')) {
      if (!validar(actual)) return;
      const i = PASOS.indexOf(actual) + 1;
      estado.alcanzado = Math.max(estado.alcanzado, i);
      persistir();
      return ir(PASOS[i]);
    }
    if (b.hasAttribute('data-atras')) return ir(PASOS[Math.max(0, PASOS.indexOf(actual) - 1)]);
    if (b.hasAttribute('data-anadir')) {
      const l = b.closest<HTMLElement>('[data-lista]')!.dataset.lista as Lista;
      anadir(l)?.querySelector<HTMLElement>('[data-k]')?.focus();
      return persistir();
    }
    if (b.hasAttribute('data-quitar')) {
      b.closest('.item')?.remove();
      persistir();
      return programar();
    }
    if (b.hasAttribute('data-vaciar')) {
      volcar(vacio());
      persistir();
      return programar(true);
    }
    if (b.hasAttribute('data-ejemplo')) {
      void motor().then((E) => {
        volcar(E.formEjemplo);
        persistir();
        programar(true);
      });
      return;
    }
    if (b.hasAttribute('data-pasar-personalizable')) {
      estado.base = idsDiseno.has(estado.diseno) ? estado.diseno : estado.base;
      estado.diseno = 'personalizable';
      persistir();
      pintarControles();
      return programar(true);
    }
    if (b.hasAttribute('data-comprar')) return void (pagado?.cv ? descargar(b as HTMLButtonElement) : comprar(b as HTMLButtonElement));
    if (b.hasAttribute('data-publicar')) return void publicar(b as HTMLButtonElement);
  });

  form.addEventListener('submit', (ev) => ev.preventDefault());
  form.addEventListener('change', (ev) => {
    const c = ev.target as HTMLInputElement;
    // La tarjeta y los extras no son estado del CV: ni se guardan ni repintan la vista previa.
    if (c.closest('[data-tarjeta-form]')) return;
    if (c.dataset.extra !== undefined) return resumir();
    if (c.name === 'importar') {
      const fichero = c.files?.[0];
      c.value = ''; // permite volver a elegir el mismo archivo
      if (fichero) void importar(fichero);
      return;
    }
    if (c.name === 'ver') {
      // Filtro de la galería: no es estado del CV, no se guarda ni repinta la vista previa.
      for (const t of $$('[data-filtros]')) t.hidden = !(t.dataset.filtros ?? '').split(' ').includes(c.value);
      for (const n of $$('[data-nota-filtro]')) n.hidden = n.dataset.notaFiltro !== c.value;
      return;
    }
    if (c.name === 'diseno') {
      if (c.value === 'personalizable' && idsDiseno.has(estado.diseno)) estado.base = estado.diseno;
      estado.diseno = c.value;
      $('[data-error="plantilla"]')!.hidden = true;
      void motor().catch(() => {}); // precarga mientras el cliente lee el siguiente paso
    } else if (c.name === 'base') estado.base = c.value;
    else if (c.name === 'color') estado.color = c.value;
    else if (c.name === 'forma') estado.forma = c.value;
    else if (c.name === 'sombreado') estado.sombreado = c.checked;
    else if ((CLAVES_FORMATO as string[]).includes(c.name) && valido(c.name as ClaveFormato, c.value)) estado[c.name as ClaveFormato] = c.value;
    persistir();
    if (actual === 'personaliza') pintarControles();
    programar();
  });
  form.addEventListener('input', (ev) => {
    const c = ev.target as HTMLInputElement;
    if (c.type === 'file' || c.closest('[data-tarjeta-form]') || c.dataset.extra !== undefined) return;
    if (c.name === 'colorLibre') estado.color = c.value;
    else if (c.name === 'intensidad') estado.intensidad = Number(c.value);
    else if (c.name === 'nombre' && c.value.trim()) c.removeAttribute('aria-invalid');
    if (c.name === 'colorLibre') pintarControles();
    persistir();
    programar();
  });
  window.addEventListener('hashchange', () => {
    tomarPedido();
    desdeHash(true);
  });

  // ---------- Arranque ----------
  volcar(estado.form ?? vacio());
  pintarControles();
  if (!tomarPedido()) {
    try {
      token = sessionStorage.getItem(CLAVE_PEDIDO) ?? '';
    } catch {
      token = '';
    }
    if (token) void cargarPedido();
  }
  desdeHash(false);
}

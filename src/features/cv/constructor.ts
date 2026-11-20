/**
 * Constructor de CV en el navegador (sin servidor y sin IA):
 * formulario (json-editor) → JSON Resume → plantilla elegida → vista previa en vivo.
 * Descargas: PDF (impresión del navegador), web en HTML y los datos en JSON.
 * El motor (160 plantillas) se sirve desde /cv/motor/ y solo se carga en esta página.
 */
import { CV_EJEMPLO, ESQUEMA_CV, TEXTOS_EDITOR, leerJsonResume, nombreFichero, prepararCv } from './esquema';

interface Plantilla {
  slug: string;
  nombre: string;
  estilo: string | null;
  maquetacion: string | null;
  color: string | null;
  recomendado: boolean;
}
interface Catalogo {
  estilos: Record<string, string>;
  maquetaciones: Record<string, string>;
  colores: Record<string, string>;
  plantillas: Plantilla[];
}
interface Motor {
  PLANTILLAS: string[];
  renderizar(slug: string, cv: unknown): Promise<string>;
}
interface Editor {
  getValue(): unknown;
  setValue(v: unknown): void;
  on(evento: string, fn: () => void): void;
  promise?: Promise<unknown>;
}

const CLAVE_DATOS = 'cv:datos';
const CLAVE_PLANTILLA = 'cv:plantilla';
const ANCHO_A4 = 794; // px a 96 ppp
const POR_DEFECTO = 'harvard-classic';

const $ = <T = HTMLElement>(sel: string) => document.querySelector(sel) as T | null;
// URL absoluta: así Vite (en desarrollo) no reescribe la ruta de /public con ?import.
const cargarModulo = <T>(url: string): Promise<T> =>
  import(/* @vite-ignore */ new URL(url, location.href).href) as Promise<T>;

function leerGuardado(): unknown {
  try {
    const t = localStorage.getItem(CLAVE_DATOS);
    return t ? JSON.parse(t) : null;
  } catch {
    return null;
  }
}
function guardar(clave: string, valor: string): void {
  try {
    localStorage.setItem(clave, valor);
  } catch {
    /* navegador sin almacenamiento: se sigue trabajando, solo no se recuerda */
  }
}
function descargar(nombre: string, tipo: string, contenido: string): void {
  const url = URL.createObjectURL(new Blob([contenido], { type: tipo }));
  const a = Object.assign(document.createElement('a'), { href: url, download: nombre });
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function iniciarConstructor(): Promise<void> {
  const raiz = $('#cv-constructor');
  const contenedorForm = $('#cv-formulario');
  const marco = $<HTMLIFrameElement>('#cv-vista');
  const lienzo = $('#cv-lienzo');
  const estado = $('#cv-estado');
  if (!raiz || !contenedorForm || !marco || !lienzo || !estado) return;
  const base = raiz.dataset.motor ?? '/cv/motor/';

  const [motor, { JSONEditor }, catalogo] = await Promise.all([
    cargarModulo<Motor>(`${base}motor.js`),
    cargarModulo<{ JSONEditor: any }>(`${base}editor.js`),
    fetch(`${base}catalogo.json`).then((r) => r.json() as Promise<Catalogo>),
  ]);

  // ---------- Plantilla elegida ----------
  const disponibles = new Set(motor.PLANTILLAS);
  const pedida = new URLSearchParams(location.search).get('plantilla');
  let plantilla =
    [pedida, localStorage.getItem(CLAVE_PLANTILLA), POR_DEFECTO].find((s): s is string => !!s && disponibles.has(s)) ??
    motor.PLANTILLAS[0]!;

  // ---------- Formulario ----------
  JSONEditor.defaults.languages.es = { ...JSONEditor.defaults.languages.en, ...TEXTOS_EDITOR };
  JSONEditor.defaults.language = 'es';
  contenedorForm.replaceChildren();
  const editor: Editor = new JSONEditor(contenedorForm, {
    schema: ESQUEMA_CV,
    theme: 'html',
    iconlib: null,
    disable_edit_json: true,
    disable_properties: true,
    disable_array_delete_all_rows: true,
    disable_array_delete_last_row: true,
    array_controls_top: false,
    show_errors: 'never',
    use_default_values: false,
    startval: leerGuardado() ?? CV_EJEMPLO,
  });
  if (editor.promise) await editor.promise;

  // ---------- Vista previa ----------
  let ultimoHtml = '';
  let turno = 0;
  let espera: ReturnType<typeof setTimeout> | undefined;

  const ajustar = () => {
    const doc = marco.contentDocument;
    const alto = Math.max(1123, doc?.documentElement.scrollHeight ?? 1123);
    const escala = Math.min(1, lienzo.clientWidth / ANCHO_A4);
    marco.style.width = `${ANCHO_A4}px`;
    marco.style.height = `${alto}px`;
    marco.style.transform = `scale(${escala})`;
    lienzo.style.height = `${Math.ceil(alto * escala)}px`;
  };
  marco.addEventListener('load', ajustar);
  new ResizeObserver(ajustar).observe(lienzo);

  const pintar = async () => {
    const mio = ++turno;
    estado.textContent = 'Actualizando…';
    try {
      const html = await motor.renderizar(plantilla, prepararCv(editor.getValue()));
      if (mio !== turno) return; // llegó otra versión mientras tanto
      ultimoHtml = html;
      marco.srcdoc = html;
      estado.textContent = 'Vista previa al día';
    } catch (e) {
      console.error('cv: no se pudo pintar', e);
      if (mio === turno) estado.textContent = 'Esta plantilla no ha podido pintar tu CV. Prueba con otra.';
    }
  };
  const programar = () => {
    clearTimeout(espera);
    espera = setTimeout(pintar, 250);
  };

  editor.on('change', () => {
    guardar(CLAVE_DATOS, JSON.stringify(editor.getValue()));
    programar();
  });

  // ---------- Selector de plantillas ----------
  const porSlug = new Map(catalogo.plantillas.map((p) => [p.slug, p]));
  const nombreActual = $('#cv-plantilla-nombre');
  const rejilla = $('#cv-rejilla');
  const filtros = {
    estilo: $<HTMLSelectElement>('#cv-filtro-estilo'),
    maquetacion: $<HTMLSelectElement>('#cv-filtro-maquetacion'),
    color: $<HTMLSelectElement>('#cv-filtro-color'),
  };
  const opciones = (sel: HTMLSelectElement | null, valores: Record<string, string>) => {
    if (!sel) return;
    for (const [v, t] of Object.entries(valores)) sel.appendChild(new Option(t, v));
  };
  opciones(filtros.estilo, catalogo.estilos);
  opciones(filtros.maquetacion, catalogo.maquetaciones);
  opciones(filtros.color, catalogo.colores);

  const ordenadas = catalogo.plantillas
    .filter((p) => disponibles.has(p.slug))
    .sort((a, b) => Number(b.recomendado) - Number(a.recomendado) || a.nombre.localeCompare(b.nombre, 'es'));
  const etiqueta = (p: Plantilla) =>
    [p.estilo && catalogo.estilos[p.estilo], p.maquetacion && catalogo.maquetaciones[p.maquetacion]].filter(Boolean).join(' · ');

  const marcarActual = () => {
    const p = porSlug.get(plantilla);
    if (nombreActual) nombreActual.textContent = p ? `${p.nombre} · ${etiqueta(p)}` : plantilla;
    rejilla?.querySelectorAll<HTMLButtonElement>('[data-plantilla]').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.plantilla === plantilla));
    });
  };
  const elegir = (slug: string) => {
    if (!disponibles.has(slug)) return;
    plantilla = slug;
    guardar(CLAVE_PLANTILLA, slug);
    const url = new URL(location.href);
    url.searchParams.set('plantilla', slug);
    history.replaceState(null, '', url);
    marcarActual();
    void pintar();
  };

  const pintarRejilla = () => {
    if (!rejilla) return;
    const f = {
      estilo: filtros.estilo?.value ?? '',
      maquetacion: filtros.maquetacion?.value ?? '',
      color: filtros.color?.value ?? '',
    };
    const visibles = ordenadas.filter(
      (p) => (!f.estilo || p.estilo === f.estilo) && (!f.maquetacion || p.maquetacion === f.maquetacion) && (!f.color || p.color === f.color),
    );
    rejilla.replaceChildren(
      ...visibles.map((p) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.dataset.plantilla = p.slug;
        b.className = 'cv-miniatura';
        const img = Object.assign(document.createElement('img'), {
          src: `/cv/miniaturas/${p.slug}.webp`,
          alt: '',
          loading: 'lazy',
          width: 160,
          height: 226,
        });
        const t = Object.assign(document.createElement('span'), { textContent: p.nombre });
        b.appendChild(img);
        b.appendChild(t);
        if (p.recomendado) b.appendChild(Object.assign(document.createElement('em'), { textContent: 'Recomendada' }));
        b.title = etiqueta(p);
        b.addEventListener('click', () => elegir(p.slug));
        return b;
      }),
    );
    const cuenta = $('#cv-cuenta');
    if (cuenta) cuenta.textContent = `${visibles.length} de ${ordenadas.length} diseños`;
    marcarActual();
  };
  Object.values(filtros).forEach((s) => s?.addEventListener('change', pintarRejilla));
  pintarRejilla();

  const paso = (d: number) => {
    const i = ordenadas.findIndex((p) => p.slug === plantilla);
    elegir(ordenadas[(i + d + ordenadas.length) % ordenadas.length]!.slug);
  };
  $('#cv-anterior')?.addEventListener('click', () => paso(-1));
  $('#cv-siguiente')?.addEventListener('click', () => paso(1));
  $('#cv-azar')?.addEventListener('click', () => elegir(ordenadas[Math.floor(Math.random() * ordenadas.length)]!.slug));

  // ---------- Descargas ----------
  const nombre = () => (prepararCv(editor.getValue()).basics as Record<string, unknown>).name;
  $('#cv-pdf')?.addEventListener('click', () => {
    if (!ultimoHtml) return;
    marco.contentWindow?.focus();
    marco.contentWindow?.print();
  });
  $('#cv-html')?.addEventListener('click', () => {
    if (ultimoHtml) descargar(nombreFichero(nombre(), 'html'), 'text/html;charset=utf-8', ultimoHtml);
  });
  $('#cv-json')?.addEventListener('click', () => {
    descargar(nombreFichero(nombre(), 'json'), 'application/json', `${JSON.stringify(prepararCv(editor.getValue()), null, 2)}\n`);
  });

  // ---------- Importar / vaciar ----------
  const entrada = $<HTMLInputElement>('#cv-importar');
  const aviso = $('#cv-aviso');
  entrada?.addEventListener('change', async () => {
    const f = entrada.files?.[0];
    if (!f) return;
    const datos = leerJsonResume(await f.text());
    entrada.value = '';
    if (!datos) {
      if (aviso) aviso.textContent = 'Ese archivo no es un CV en formato JSON Resume.';
      return;
    }
    editor.setValue(datos);
    if (aviso) aviso.textContent = 'CV importado.';
  });
  $('#cv-vaciar')?.addEventListener('click', () => {
    if (confirm('¿Empezar con el formulario en blanco? Se borra lo que has escrito.')) editor.setValue({ basics: { name: '' } });
  });
  $('#cv-ejemplo')?.addEventListener('click', () => {
    if (confirm('¿Cargar el CV de ejemplo? Se sustituye lo que has escrito.')) editor.setValue(CV_EJEMPLO);
  });

  raiz.dataset.listo = 'si';
  marcarActual();
  await pintar();
}

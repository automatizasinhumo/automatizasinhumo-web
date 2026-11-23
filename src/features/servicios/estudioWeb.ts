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
import { disenosRecomendados, esOrdenDeSector, esPreguntaDeSector, esServicioDeSector, textosDeSector } from './sectores';
import { guiar } from '../tour/guia';
import { fotoValida, galeriaValida, GUIA_WEB, MARCA_WEB, MAX_FOTO_GALERIA_WEB, MAX_FOTO_WEB, MAX_GALERIA_WEB, MAX_PREGUNTAS_WEB, ordenWeb, PASOS_WEB, PLANTILLAS_WEB, disenoWeb, renderWeb, resolverPlantilla, validarWeb, type DatosWeb } from './webs';

type Lista = 'servicios' | 'enlaces' | 'opiniones' | 'preguntas';
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
  /** Último lema y presentación que escribimos nosotros: si el cliente no los ha tocado, se rehacen. */
  escritos: { lema: string; sobre: string };
}
interface RespuestaDominio {
  ok?: boolean;
  disponible?: boolean;
  compra?: boolean;
  error?: string;
  campo?: string;
  /** Aviso cuando la reserva se liberó (dominio: null). */
  aviso?: string | null;
  dominio?: {
    dominio: string;
    estado: 'registrando' | 'esperando_dns' | 'conectando' | 'activo' | 'error';
    servidores: string[];
    detalle: string | null;
    /** Aviso del registro en curso para el cliente (confirmar el email, revisión del registrador...). */
    aviso?: string | null;
    comprado?: boolean;
  } | null;
}
interface Oferta {
  dominio: string;
  precio: number | null;
  moneda: string | null;
}

interface Pagado {
  ref: string;
  slug: string | null;
  datos: DatosWeb | null;
}

const CLAVE = 'servicios:web';
const CLAVE_PEDIDO = 'servicios:web:pedido';
const PASOS = PASOS_WEB.map((p) => p.id) as string[];
/** Radios de la capa visual: se leen y escriben igual que un campo (RadioNodeList.value). */
const CAPA = ['acabado', 'formaFoto', 'movimiento'] as const;
const CAMPOS = [...CAPA, 'negocio', 'sector', 'lema', 'sobre', 'foto', 'telefono', 'whatsapp', 'email', 'direccion', 'horario', 'zonas', 'reservas', 'opinionesUrl'] as const;

/**
 * Reduce la foto en el navegador (lado mayor 1200 px) y la devuelve como data URL que quepa en
 * MAX_FOTO_WEB: WebP si el navegador lo sabe escribir, si no JPEG, bajando calidad hasta que entre.
 */
async function reducirFoto(f: File, lado = 1200, max = MAX_FOTO_WEB): Promise<string> {
  const bmp = await createImageBitmap(f);
  const k = Math.min(1, lado / Math.max(bmp.width, bmp.height));
  const lienzo = document.createElement('canvas');
  lienzo.width = Math.max(1, Math.round(bmp.width * k));
  lienzo.height = Math.max(1, Math.round(bmp.height * k));
  lienzo.getContext('2d')!.drawImage(bmp, 0, 0, lienzo.width, lienzo.height);
  bmp.close();
  for (const tipo of ['image/webp', 'image/jpeg'])
    for (const q of [0.82, 0.7, 0.55, 0.4]) {
      const url = lienzo.toDataURL(tipo, q);
      if (!url.startsWith(`data:${tipo}`)) break;
      if (url.length <= max) return url;
    }
  return '';
}
const LISTAS: Lista[] = ['servicios', 'enlaces', 'opiniones', 'preguntas'];
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
const CSS_VISTA = `:host{display:block;user-select:none;-webkit-user-select:none}[data-editar]{cursor:pointer}@media (hover:hover){[data-editar]:hover{outline:2px dashed #2563eb;outline-offset:4px}}.mini{width:250%;transform:scale(.4);transform-origin:0 0}:host([data-escritorio]) .w{width:${ANCHO_ESCRITORIO}px;zoom:var(--escala,1)}`;

/**
 * «Editar tocando»: lo que se ve en la vista previa lleva al campo que lo cambia.
 * En orden de prioridad (lo concreto de la portada antes que la sección entera).
 * Solo en la vista previa: la web publicada no lleva estas marcas.
 */
export const TOCABLES: readonly [vista: string, campo: string, etiqueta: string][] = [
  ['.w-cab h1, .w-nav-marca', '[name="negocio"]', 'el nombre'],
  ['.w-sector', '[name="sector"]', 'la actividad'],
  ['.w-lema', '[name="lema"]', 'la frase de portada'],
  ['.w-cab-foto, .w-arco', '[data-foto-elegir]', 'la foto'],
  ['#servicios', '[data-lista="servicios"]', 'los servicios'],
  ['#galeria', '[data-galeria]', 'las fotos'],
  ['#sobre', '[name="sobre"]', 'quiénes sois'],
  ['#horario', '[name="horario"]', 'el horario'],
  ['#zonas', '[name="zonas"]', 'las zonas'],
  ['#opiniones', '[data-lista="opiniones"]', 'las opiniones'],
  ['#preguntas', '[data-lista="preguntas"]', 'las preguntas'],
  ['#contacto, .w-barra', '[name="telefono"]', 'el contacto'],
];

/**
 * Revisión antes de publicar e índice de preparación (0-100) para buscadores y clientes: cada
 * comprobación vale unos puntos y, si falla, da un aviso con el campo del editor al que lleva
 * «Corregir» (mismo selector que TOCABLES). Mide lo que el cliente ha rellenado, no el tráfico.
 * Pura, para poder probarla.
 */
export function revisarWeb(d: Partial<DatosWeb>): { puntos: number; avisos: [campo: string, aviso: string, puntos: number][] } {
  const t = (v?: string) => (v ?? '').trim();
  const servicios = (d.servicios ?? []).filter((s) => t(s.nombre));
  const preguntas = (d.preguntas ?? []).filter((p) => t(p.pregunta));
  const reglas: [ok: boolean, campo: string, aviso: string, puntos: number][] = [
    [!!(t(d.telefono) || t(d.whatsapp) || t(d.email)), '[name="telefono"]', 'No hay forma de contactar: pon teléfono, WhatsApp o correo.', 15],
    [servicios.length > 0, '[data-lista="servicios"]', 'Añade al menos un servicio o producto.', 10],
    [!!t(d.lema), '[name="lema"]', 'Falta la frase de portada: di en una línea qué ofreces.', 10],
    [!!t(d.foto), '[data-foto-elegir]', 'Sin foto de portada: una foto real del negocio da confianza.', 10],
    [!!t(d.horario), '[name="horario"]', 'Falta el horario (también sale en Google).', 10],
    [!!(t(d.zonas) || t(d.direccion)), '[name="zonas"]', 'Di dónde trabajas (barrio, ciudad o zonas): así te encuentran en tu zona.', 10],
    [(d.opiniones ?? []).some((o) => t(o.texto)), '[data-lista="opiniones"]', 'Sin opiniones: copia dos o tres reseñas de clientes.', 8],
    [!!t(d.sobre), '[name="sobre"]', 'Cuenta quiénes sois en dos frases.', 7],
    [servicios.length === 0 || servicios.some((s) => t(s.precio)), '[data-lista="servicios"]', 'Ningún servicio tiene precio orientativo: ayuda a decidir.', 5],
    [preguntas.length > 0 && preguntas.every((p) => t(p.respuesta)), '[data-lista="preguntas"]', preguntas.length ? 'Hay preguntas sin respuesta.' : 'Responde las dudas típicas en «Preguntas frecuentes».', 5],
    [(d.galeria ?? []).length >= 3, '[data-galeria]', 'Sube al menos tres fotos a la galería.', 5],
    [!!t(d.sector), '[name="sector"]', 'Escribe a qué se dedica el negocio.', 5],
  ];
  const fallos = reglas.filter((r) => !r[0]);
  return { puntos: 100 - fallos.reduce((n, r) => n + r[3], 0), avisos: fallos.map(([, c, a, p]) => [c, a, p]) };
}

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

/**
 * Casilla rápida del paso 1 → campo «sector» del paso 2. Al teclear (input) solo se copia; al
 * confirmar (change) se emite siempre el change del campo, aunque el input ya lo hubiera copiado:
 * si no, nunca se rellenarían los textos del sector.
 */
export function pasoSectorRapido(actual: string, valor: string, final: boolean): { asignar: boolean; confirmar: boolean } {
  return { asignar: actual !== valor, confirmar: final };
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
    plantilla: resolverPlantilla(g.plantilla) ?? '',
    color: COLOR.test(g.color ?? '') ? g.color! : cfg.porDefecto.color,
    letra: cfg.letras.includes(g.letra ?? '') ? g.letra! : cfg.porDefecto.letra,
    alcanzado: Math.min(PASOS.length - 1, Math.max(0, Number(g.alcanzado) || 0)),
    contenido: g.contenido && typeof g.contenido === 'object' ? g.contenido : null,
    tamano: g.tamano === 'escritorio' ? 'escritorio' : 'movil',
    pedido: typeof g.pedido === 'string' ? g.pedido : '',
    escritos: {
      lema: typeof g.escritos?.lema === 'string' ? g.escritos.lema : '',
      sobre: typeof g.escritos?.sobre === 'string' ? g.escritos.sobre : '',
    },
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
  /** Sube con cada foto elegida, quitada o formulario cargado: una reducción tardía no pisa a la vigente. */
  let genFoto = 0;
  function volcar(c: Partial<Contenido>) {
    // Los radios no se desmarcan con '': la capa vuelve a 'auto' cuando el contenido no la trae.
    for (const k of CAMPOS) campo(k).value = typeof c[k] === 'string' && c[k] ? c[k] : (CAPA as readonly string[]).includes(k) ? 'auto' : '';
    for (const l of LISTAS) {
      $(`[data-lista="${l}"] [data-items]`)!.replaceChildren();
      for (const fila of Array.isArray(c[l]) ? (c[l] as unknown as Fila[]) : []) anadir(l, fila);
    }
    limitar();
    const lista = $('[data-orden]')!;
    for (const id of ordenWeb(c.orden)) lista.appendChild($(`[data-seccion="${id}"]`, lista)!);
    pintarOrden();
    genFoto++;
    pintarFoto();
    galeria = galeriaValida(c.galeria);
    genGaleria++;
    pintarGaleria();
  }
  /** Fotos de la galería (data URL ya reducidas); se guardan con el borrador como el resto. */
  let galeria: string[] = [];
  let genGaleria = 0;
  let colaGaleria: Promise<void> = Promise.resolve();
  function pintarGaleria(aviso = '') {
    $('[data-galeria-lista]')!.replaceChildren(
      ...galeria.map((url, i) => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = url;
        img.alt = `Foto ${i + 1} de la galería`;
        const quitar = document.createElement('button');
        quitar.type = 'button';
        quitar.className = 'quitar';
        quitar.dataset.galeriaQuitar = String(i);
        quitar.textContent = 'Quitar';
        quitar.setAttribute('aria-label', `Quitar la foto ${i + 1}`);
        li.appendChild(img);
        li.appendChild(quitar);
        return li;
      }),
    );
    $('[data-galeria-anadir]')!.hidden = galeria.length >= MAX_GALERIA_WEB;
    const a = $('[data-galeria-aviso]')!;
    a.textContent = aviso;
    a.hidden = !aviso;
  }
  function cambiarGaleria(nueva: string[], aviso = '') {
    galeria = galeriaValida(nueva);
    pintarGaleria(aviso);
    persistir();
    programar(true);
  }
  /** Primera no sube y última no baja. */
  function pintarOrden() {
    const filas = $$('[data-orden] > li');
    filas.forEach((li, i) => {
      $<HTMLButtonElement>('[data-subir]', li)!.disabled = i === 0;
      $<HTMLButtonElement>('[data-bajar]', li)!.disabled = i === filas.length - 1;
    });
  }
  /** Miniatura y botón «Quitar» según haya o no foto guardada. */
  function pintarFoto(aviso = '') {
    const v = campo('foto').value;
    const url = fotoValida(v) ? v : '';
    const vista = $<HTMLImageElement>('[data-foto-vista]')!;
    vista.hidden = !url;
    if (url) vista.src = url;
    else vista.removeAttribute('src');
    $('[data-foto-quitar]')!.hidden = !url;
    const a = $('[data-foto-aviso]')!;
    a.textContent = aviso;
    a.hidden = !aviso;
  }
  function ponerFoto(url: string, aviso = '') {
    campo('foto').value = url;
    pintarFoto(aviso);
    persistir();
    programar(true);
  }
  function recoger(): Contenido {
    const c = {} as Record<string, unknown>;
    for (const k of CAMPOS) c[k] = campo(k).value.trim();
    for (const l of LISTAS)
      c[l] = $$('[data-items] > .item', $(`[data-lista="${l}"]`)!).map((item) =>
        Object.fromEntries($$<HTMLInputElement>('[data-k]', item).map((x) => [x.dataset.k!, x.value.trim()])),
      );
    c.orden = $$('[data-orden] > li').map((li) => li.dataset.seccion);
    c.galeria = galeria;
    return c as unknown as Contenido;
  }
  const vacio = (): Partial<Contenido> => ({ servicios: [{ nombre: '', precio: '', texto: '' }], enlaces: [], opiniones: [], preguntas: [], orden: ordenWeb(recoger().orden) });
  const ejemplo = (): Contenido => {
    const { plantilla: _p, color: _c, letra: _l, ...c } = cfg.ejemplo;
    return c;
  };
  /**
   * Textos de partida de su sector (sectores.ts) en lo que el cliente aún no ha escrito: frase,
   * «Quiénes somos» y servicios. Lo escrito no se toca. Devuelve si ha rellenado algo.
   */
  // Se guardan con el borrador: tras recargar, la frase y la presentación nuestras se siguen poniendo al día.
  const escritos = estado.escritos;
  function rellenarTextos(): boolean {
    const c = recoger();
    const t = textosDeSector(c.sector, c.negocio, c.direccion);
    let algo = false;
    // Vacío o el que pusimos nosotros (otro sector): se cambia; lo escrito por el cliente se respeta.
    if (!c.lema || (c.lema === escritos.lema.trim() && c.lema !== t.lema))
      (campo('lema').value = escritos.lema = t.lema), (algo = true);
    if (!c.sobre || (c.sobre === escritos.sobre.trim() && c.sobre !== t.sobre))
      (campo<HTMLTextAreaElement>('sobre').value = escritos.sobre = t.sobre), (algo = true);
    const mismos = c.servicios.map((s) => s.nombre).join() === t.servicios.slice(0, cfg.maxServicios).map((s) => s.nombre).join();
    if (!mismos && c.servicios.every(esServicioDeSector)) {
      $('[data-lista="servicios"] [data-items]')!.replaceChildren();
      for (const s of t.servicios.slice(0, cfg.maxServicios)) anadir('servicios', { ...s });
      limitar();
      algo = true;
    }
    // Preguntas típicas del sector, sin respuesta (no se publican hasta responderlas).
    // Sin respuestas y con preguntas vacías o de un sector (p. ej. cambió de sector): se ponen las del suyo.
    if (c.preguntas.every((p) => !p.respuesta && (!p.pregunta || esPreguntaDeSector(p.pregunta)))) {
      $('[data-lista="preguntas"] [data-items]')!.replaceChildren();
      for (const p of t.preguntas.slice(0, MAX_PREGUNTAS_WEB)) anadir('preguntas', { ...p });
      limitar();
      algo = true;
    }
    // Orden del sector solo si el cliente no lo ha movido (sigue el de partida o el de algún sector).
    if (esOrdenDeSector(ordenWeb(c.orden)) && ordenWeb(c.orden).join() !== t.orden.join()) {
      const lista = $('[data-orden]')!;
      for (const id of t.orden) lista.appendChild($(`[data-seccion="${id}"]`, lista)!);
      pintarOrden();
      algo = true;
    }
    return algo;
  }
  /** Nombre o dirección escritos después del sector: la frase y la presentación nuestras se ponen al día. */
  function actualizarTextos(): boolean {
    const c = recoger();
    const t = textosDeSector(c.sector, c.negocio, c.direccion);
    let algo = false;
    if (escritos.lema && c.lema === escritos.lema.trim() && t.lema !== escritos.lema)
      (campo('lema').value = escritos.lema = t.lema), (algo = true);
    if (escritos.sobre && c.sobre === escritos.sobre.trim() && t.sobre !== escritos.sobre)
      (campo<HTMLTextAreaElement>('sobre').value = escritos.sobre = t.sobre), (algo = true);
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
    for (const [sel, , etiqueta] of TOCABLES)
      for (const el of sombra.querySelectorAll<HTMLElement>(sel))
        if (!el.closest('[data-editar]')) {
          el.dataset.editar = sel;
          el.title = `Toca para cambiar ${etiqueta}`;
        }
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
  sombra.addEventListener('click', (ev) => {
    ev.preventDefault();
    const el = (ev.target as HTMLElement).closest<HTMLElement>('[data-editar]');
    const destino = el && TOCABLES.find(([sel]) => sel === el.dataset.editar);
    if (destino) tocar(destino[1]);
  });
  // ---------- Tres diseños recomendados ----------
  // En el paso 1 el cliente dice a qué se dedica y suben arriba tres diseños de estilos distintos que
  // le van. Se mueven las tarjetas (no se copian): conservan su miniatura y su radio.
  const rapido = $<HTMLInputElement>('[data-sector-rapido]');
  const cajaRec = $<HTMLElement>('[data-recomendados]');
  const movidas: [HTMLElement, HTMLElement, Node | null][] = [];
  function recomendar(texto: string) {
    if (!cajaRec) return;
    for (const [el, padre, sig] of movidas.reverse()) padre.insertBefore(el, sig);
    movidas.length = 0;
    const { sector, ids } = disenosRecomendados(texto);
    if (texto.trim())
      for (const id of ids) {
        const el = $<HTMLInputElement>(`input[name="plantilla"][value="${id}"]`, form ?? undefined)?.closest<HTMLElement>('label');
        if (!el?.parentElement) continue;
        movidas.push([el, el.parentElement, el.nextSibling]);
        $('[data-recomendados-rejilla]', cajaRec)!.appendChild(el);
      }
    $('[data-recomendados-titulo]', cajaRec)!.textContent = sector
      ? `Para ${sector.nombre.toLowerCase()}: tres estilos distintos`
      : 'Tres estilos que valen para cualquier negocio';
    cajaRec.hidden = movidas.length === 0;
  }
  /** La casilla del paso 1 y la del paso 2 son el mismo dato. */
  function sectorRapido(valor: string, final: boolean) {
    const campoSector = $<HTMLInputElement>('[name="sector"]', form ?? undefined);
    recomendar(valor);
    if (!campoSector) return;
    const paso = pasoSectorRapido(campoSector.value, valor, final);
    if (paso.asignar) campoSector.value = valor;
    if (paso.confirmar) campoSector.dispatchEvent(new Event('change', { bubbles: true }));
    else if (paso.asignar) persistir();
  }
  /** Abre el paso que contiene el campo, lo resalta un momento y lo enfoca. */
  function tocar(sel: string) {
    const objetivo = $<HTMLElement>(sel, form ?? undefined);
    const paso = objetivo?.closest<HTMLElement>('[data-paso]')?.dataset.paso;
    if (!objetivo || !paso) return;
    if (paso !== actual) {
      history.pushState(null, '', `#${paso}`);
      mostrar(paso, false);
    }
    requestAnimationFrame(() => {
      const caja = objetivo.closest<HTMLElement>('label, fieldset, [data-lista], [data-galeria]') ?? objetivo;
      caja.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
      caja.classList.add('tocado');
      setTimeout(() => caja.classList.remove('tocado'), 1600);
      const foco = objetivo.matches('input, textarea, select') ? objetivo : $<HTMLElement>('input, textarea, button', objetivo);
      foco?.focus({ preventScroll: true });
    });
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
      const id = el.dataset.mini as DatosWeb['plantilla'];
      // Los diseños de autor se enseñan con su propio negocio de muestra, su color y su letra.
      const x = disenoWeb(id);
      const datos: DatosWeb = x ? { ...cfg.ejemplo, ...x.muestra, plantilla: id, color: x.color, letra: 'diseno' } : { ...cfg.ejemplo, plantilla: id };
      s.innerHTML = `<style>${cfg.css}${CSS_VISTA}</style><div class="mini">${renderWeb(datos)}</div>`;
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
    const lista = $('[data-revision]');
    if (lista) {
      const { puntos, avisos } = revisarWeb(datos());
      $('[data-revision-puntos]')!.textContent = String(puntos);
      lista.replaceChildren(
        ...avisos.map(([sel, aviso, pts]) => {
          const li = document.createElement('li');
          const b = document.createElement('button');
          b.type = 'button';
          b.className = 'enlace';
          b.textContent = 'Corregir';
          b.addEventListener('click', () => tocar(sel));
          li.textContent = `${aviso} (+${pts}) `;
          li.appendChild(b);
          return li;
        }),
      );
      lista.closest<HTMLElement>('[data-revision-caja]')!.dataset.completa = String(!avisos.length);
    }
    $('[data-solo-compra]')!.hidden = !!pedido.pagado;
    $('[data-solo-pagado]')!.hidden = !pedido.pagado;
    if (pedido.pagado) res('ref').textContent = pedido.pagado.ref;
    const b = $('[data-comprar] span');
    if (b) b.textContent = pedido.pagado ? (pedido.pagado.slug ? 'Guardar los cambios en mi web' : 'Publicar mi web') : `Comprar y publicar · ${euros(cfg.precio)}`;
    if (pedido.pagado?.slug && !$('[data-estado-compra] a')) avisar(`/w/${pedido.pagado.slug}`, 'Tu web está publicada en');
    if (pedido.pagado?.slug && dominioDe !== pedido.token) {
      if (dominioDe) soltarContratar();
      dominioDe = pedido.token;
      void dominio();
    } else if (!pedido.pagado?.slug && dominioDe) {
      // Otro pedido sin web publicada: la tarjeta no debe enseñar el dominio del anterior.
      clearTimeout(sondeo);
      dominioDe = null;
      cambiando = false;
      soltarContratar();
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
  /** Compra en curso: solo su respuesta (y no la de otro pedido) vuelve a habilitar «Contratar». */
  let compras = 0;
  function soltarContratar() {
    compras++;
    $<HTMLButtonElement>('[data-contratar]')!.disabled = false;
  }
  async function dominio(cuerpo: { dominio?: string; comprar?: { dominio: string; titular: Record<string, string> } } = {}) {
    const token = pedido.token;
    if (!token || !pedido.pagado?.slug) return;
    clearTimeout(sondeo);
    const mia = cuerpo.comprar ? ++compras : 0;
    let d: RespuestaDominio;
    try {
      const r = await fetch('/api/web/dominio', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ token, ...cuerpo }) });
      d = (await r.json().catch(() => ({}))) as RespuestaDominio;
    } catch {
      d = { ok: false, error: 'No hemos podido comprobar tu dominio. Revisa tu conexión.' };
    }
    if (mia && mia === compras) $<HTMLButtonElement>('[data-contratar]')!.disabled = false;
    if (!pedido.vigente(token)) return;
    // Si falla la consulta del estado, se vuelve a preguntar al pasar otra vez por «Publicar».
    if (!d.ok && !cuerpo.dominio && !cuerpo.comprar) dominioDe = null;
    if (d.ok) cambiando = false;
    if (cuerpo.comprar) {
      if (d.ok) $('[data-dominio-titular]')!.hidden = true;
      else if (d.campo) campo(`titular-${d.campo}`)?.focus();
    }
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
    $('[data-dominio-propio-titulo]')!.hidden = !!v && !cambiando;
    // Un dominio comprado por nosotros ya usa nuestros DNS: no hay pasos para el cliente.
    $('[data-dominio-pasos]')!.hidden = !v || v.estado === 'activo' || cambiando || !!v.comprado;
    if (v) {
      $('[data-dominio-ofertas]')!.hidden = true;
      $('[data-dominio-titular]')!.hidden = true;
    }
    if (!v) {
      ideasDe = null; // tras liberar una reserva, volver a pedir las ofertas en esta misma sesión
      void cargarIdeas();
      return void (d.aviso ? (st.textContent = d.aviso) : st.replaceChildren());
    }
    if (!cambiando) $('[data-dominio-ideas]')!.hidden = true;
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
    if (v.estado === 'error') {
      st.dataset.tono = 'error';
      st.textContent = `No se ha podido completar ${v.dominio}${v.detalle ? `: ${v.detalle}` : ''}. Escríbenos y lo resolvemos.`;
      return;
    }
    st.textContent = v.comprado
      ? v.estado === 'registrando'
        ? v.aviso
          ? `Registrando ${v.dominio} a tu nombre. ${v.aviso}`
          : `Registrando ${v.dominio} a tu nombre. Puedes cerrar esta página: lo conectamos solos y te escribimos cuando esté.`
        : `${v.dominio} ya es tuyo. Lo estamos conectando a tu web con https; te escribimos cuando esté (suele tardar menos de una hora).`
      : v.estado === 'conectando'
        ? 'Servidores DNS cambiados. Estamos preparando el certificado https; tarda unos minutos.'
        : 'Esperando a que cambies los servidores DNS. Puedes cerrar esta página: te escribimos cuando esté.';
    sondeo = setTimeout(() => {
      if (actual === 'publica' && !document.hidden) void dominio();
      else dominioDe = null; // se vuelve a preguntar al volver a este paso
    }, 60_000);
  }
  // Para quien aún no tiene dominio: nombres sacados de su negocio que el DNS da por libres.
  let ideasDe: string | null = null;
  async function cargarIdeas() {
    const token = pedido.token;
    if (!token || ideasDe === token) return;
    ideasDe = token;
    let ideas: string[] = [];
    let ofertas: Oferta[] = [];
    try {
      const r = await fetch('/api/web/dominio', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ token, ideas: true }) });
      const j = (await r.json().catch(() => ({}))) as { ideas?: unknown; ofertas?: unknown };
      if (Array.isArray(j.ofertas)) ofertas = (j.ofertas as Oferta[]).filter((o) => o && typeof o.dominio === 'string').slice(0, 5);
      const incluidos = new Set(ofertas.map((o) => o.dominio));
      if (Array.isArray(j.ideas)) ideas = j.ideas.filter((x): x is string => typeof x === 'string' && !incluidos.has(x)).slice(0, 5);
    } catch {
      ideasDe = null;
    }
    if (!pedido.vigente(token)) return;
    // Si mientras tanto se ha conectado un dominio, la caja de pedirlo ya no está a la vista.
    const libre = !$('[data-dominio-pedir]')!.hidden;
    $('[data-dominio-ofertas]')!.hidden = !ofertas.length || !libre;
    $('[data-dominio-ofertas-lista]')!.replaceChildren(
      ...ofertas.map((o) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'oferta-dominio';
        b.dataset.oferta = o.dominio;
        const n = document.createElement('strong');
        n.textContent = o.dominio;
        const e = document.createElement('span');
        e.textContent = 'Incluido · Elegir';
        b.replaceChildren(n, e);
        return b;
      }),
    );
    const caja = $('[data-dominio-ideas]')!;
    caja.hidden = !ideas.length || !libre;
    $('[data-dominio-ideas-lista]')!.replaceChildren(
      ...ideas.map((d) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'idea-dominio';
        b.dataset.idea = d;
        b.textContent = d;
        return b;
      }),
    );
  }
  let ofertaElegida = '';
  function elegirOferta(d: string) {
    ofertaElegida = d;
    $('[data-titular-dominio]')!.textContent = d;
    const f = $('[data-dominio-titular]')!;
    f.hidden = false;
    $('[data-estado-dominio]')!.replaceChildren();
    campo('titular-nombre').focus();
  }
  function contratarDominio(b: HTMLButtonElement) {
    if (!ofertaElegida || b.disabled) return;
    const titular: Record<string, string> = {};
    for (const k of ['nombre', 'empresa', 'email', 'telefono', 'calle', 'ciudad', 'provincia', 'cp', 'pais']) {
      titular[k] = (campo<HTMLInputElement | HTMLSelectElement>(`titular-${k}`)?.value ?? '').trim();
    }
    b.disabled = true;
    const st = $('[data-estado-dominio]')!;
    st.dataset.tono = '';
    st.textContent = `Contratando ${ofertaElegida}…`;
    void dominio({ comprar: { dominio: ofertaElegida, titular } });
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
    if (paso === 'plantilla' && rapido) {
      rapido.value = $<HTMLInputElement>('[name="sector"]', form ?? undefined)?.value ?? '';
      recomendar(rapido.value);
    }
    // Su guía sale sola la primera vez de la visita; el botón «Guía de este paso» la repite.
    setTimeout(() => actual === paso && void guiar(GUIA_WEB[paso] ?? [], { raiz, clave: `web:${paso}`, auto: true }), 600);
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
    if ((ev.target as Element).closest('button[data-guia-abrir]')) void guiar(GUIA_WEB[actual] ?? [], { raiz, clave: `web:${actual}` });
  });
  raiz.addEventListener('click', (ev) => {
    const b = (ev.target as HTMLElement).closest<HTMLElement>('button, [data-ir]');
    if (!b) return;
    if (b.dataset.galeriaQuitar) {
      const fuera = Number(b.dataset.galeriaQuitar);
      return cambiarGaleria(galeria.filter((_, i) => i !== fuera));
    }
    if (b.hasAttribute('data-foto-quitar')) {
      genFoto++;
      return ponerFoto('');
    }
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
    if (b.hasAttribute('data-subir') || b.hasAttribute('data-bajar')) {
      const li = b.closest('li')!;
      const sube = b.hasAttribute('data-subir');
      const otro = sube ? li.previousElementSibling : li.nextElementSibling;
      if (!otro) return;
      li.parentElement!.insertBefore(li, sube ? otro : otro.nextSibling);
      pintarOrden();
      // El foco sigue en la misma flecha; si ha quedado desactivada, en la otra.
      const f = b as HTMLButtonElement;
      (f.disabled ? $<HTMLButtonElement>(sube ? '[data-bajar]' : '[data-subir]', li) : f)?.focus();
      persistir();
      return programar(true);
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
        : 'Ya tienes todo escrito. Para rehacer algo, vacía la frase, la presentación o todos los servicios y vuelve a pulsar.';
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
    if (b.dataset.oferta) return elegirOferta(b.dataset.oferta);
    if (b.hasAttribute('data-contratar')) return contratarDominio(b as HTMLButtonElement);
    if (b.hasAttribute('data-titular-cancelar')) {
      $('[data-dominio-titular]')!.hidden = true;
      return $<HTMLElement>('[data-oferta]')?.focus();
    }
    if (b.dataset.idea) {
      campo('dominio').value = b.dataset.idea;
      return campo('dominio').focus();
    }
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
    if (ev.key === 'Enter' && (ev.target as HTMLInputElement).name?.startsWith('titular-')) {
      ev.preventDefault();
      contratarDominio($<HTMLButtonElement>('[data-contratar]')!);
    }
  });
  form.addEventListener('change', (ev) => {
    const c = ev.target as HTMLInputElement;
    if (c.hasAttribute('data-sector-rapido')) return sectorRapido(c.value, true);
    if (c.name?.startsWith('titular-') || c.name === 'dominio') return;
    if (c.hasAttribute('data-galeria-elegir')) {
      const todos = [...(c.files ?? [])].filter((f) => f.type.startsWith('image/'));
      c.value = '';
      // Las selecciones se encolan: elegir otra foto mientras se reduce la anterior no la pierde.
      // Solo un vaciado o una recarga (que suben genGaleria) descartan lo que está en curso.
      const gen = genGaleria;
      if (!todos.length) return pintarGaleria('Elige una o varias imágenes (JPG o PNG).');
      colaGaleria = colaGaleria.then(async () => {
        if (gen !== genGaleria) return;
        const hueco = MAX_GALERIA_WEB - galeria.length;
        const elegidos = todos.slice(0, hueco);
        const urls = await Promise.all(elegidos.map((f) => reducirFoto(f, 1000, MAX_FOTO_GALERIA_WEB).catch(() => '')));
        if (gen !== genGaleria) return;
        const buenas = urls.filter(Boolean);
        const avisos = [
          buenas.length < elegidos.length && 'Alguna foto no se ha podido abrir; prueba con otra.',
          todos.length > hueco && `Caben ${MAX_GALERIA_WEB} fotos; hemos añadido las primeras.`,
        ].filter(Boolean);
        cambiarGaleria([...galeria, ...buenas], avisos.join(' '));
      });
      return;
    }
    if (c.hasAttribute('data-foto-elegir')) {
      const f = c.files?.[0];
      c.value = '';
      const gen = ++genFoto;
      if (!f) return;
      if (!f.type.startsWith('image/')) return pintarFoto('Ese archivo no es una imagen.');
      reducirFoto(f)
        .then((url) => {
          if (gen !== genFoto) return;
          if (url) ponerFoto(url);
          else pintarFoto('No hemos podido reducir esa foto. Prueba con otra.');
        })
        .catch(() => {
          if (gen === genFoto) pintarFoto('No hemos podido abrir esa foto. Prueba con otra (JPG o PNG).');
        });
      return;
    }
    // Al decir a qué se dedica, la web se rellena sola con los textos de su sector.
    if (c.name === 'sector' && c.value.trim() && rellenarTextos()) {
      $('[data-estado-textos]')!.textContent = 'Hemos escrito unos textos para tu sector. Cámbialos a tu gusto.';
      persistir();
      return programar(true);
    }
    if ((c.name === 'negocio' || c.name === 'direccion') && actualizarTextos()) {
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
      // Cada plantilla trae su orden de secciones; el cliente lo puede cambiar después.
      const elegida = PLANTILLAS_WEB.find((p) => p.id === c.value);
      // Un diseño de autor llega con su color y su letra (el cliente los puede cambiar después);
      // al volver a una básica, «la del diseño» pasa a la letra por defecto.
      const x = disenoWeb(c.value);
      if (x) Object.assign(estado, { color: x.color, letra: 'diseno' });
      else if (estado.letra === 'diseno') estado.letra = cfg.porDefecto.letra;
      if (elegida) {
        const lista = $('[data-orden]')!;
        for (const id of ordenWeb(elegida.orden)) lista.appendChild($(`[data-seccion="${id}"]`, lista)!);
        pintarOrden();
      }
    } else if (c.name === 'color') estado.color = c.value;
    else if (c.name === 'letra') estado.letra = c.value;
    persistir();
    pintarControles();
    programar();
  });
  form.addEventListener('input', (ev) => {
    const c = ev.target as HTMLInputElement;
    if (c.hasAttribute('data-sector-rapido')) return sectorRapido(c.value, false);
    if (c.type === 'radio' || c.type === 'file' || c.name === 'dominio' || c.name?.startsWith('titular-')) return;
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

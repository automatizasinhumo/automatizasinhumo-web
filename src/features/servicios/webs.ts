/**
 * Web de una página hecha por el cliente en el estudio (/servicios/web) y publicada en
 * /w/<slug> en cuanto el pedido está pagado. Un solo modelo para las dos caras:
 *  - el estudio pinta la vista previa con `renderWeb` (con marca de agua) dentro de un Shadow DOM;
 *  - el servidor sirve la publicada con `documentoWeb` (sin marca), a partir de los datos
 *    validados por `validarWeb`, el mismo validador que se aplica al publicar y al leer.
 * Sin DOM: lo importan el navegador, la API y la página pública (D1 solo en las tres
 * funciones de publicación del final, que el navegador no usa).
 *
 * Plantillas = solo CSS sobre el mismo HTML. Añadir una es añadir su entrada en PLANTILLAS_WEB
 * y su bloque `.w-<id>` en CSS_WEB; el formulario, la validación y la publicación no cambian.
 */
import { horarioSchema, tipoNegocio } from './negocioSchema';
import {
  COLOR_VALIDO,
  EMAIL,
  TELEFONO,
  paginaDePedido,
  paginaPorSlug,
  parrafos,
  publicarPagina,
  texto,
  urlSegura,
  type PaginaPublicada,
} from './paginas';

export const PLANTILLAS_WEB = [
  { id: 'clara', nombre: 'Clara', descripcion: 'Fondo blanco y tu color en los botones. Sobria y luminosa.' },
  { id: 'banda', nombre: 'Banda', descripcion: 'Portada a todo color y servicios en tarjetas. Llama la atención.' },
  { id: 'noche', nombre: 'Noche', descripcion: 'Fondo oscuro con tu color de acento. Elegante y moderna.' },
  { id: 'partida', nombre: 'Partida', descripcion: 'Texto a un lado y tu foto al otro, a media pantalla. La de las agencias.' },
  { id: 'revista', nombre: 'Revista', descripcion: 'Titular enorme, secciones numeradas y mucho aire. Editorial.' },
  { id: 'bento', nombre: 'Bento', descripcion: 'Bloques redondeados de distintos tamaños; el servicio estrella, grande.' },
  { id: 'cristal', nombre: 'Cristal', descripcion: 'Fondo oscuro con brillos de tu color y tarjetas de cristal.' },
  { id: 'brutal', nombre: 'Brutal', descripcion: 'Bordes gruesos y sombras duras. Imposible pasarla por alto.' },
  { id: 'lateral', nombre: 'Lateral', descripcion: 'Tu nombre y los botones fijos en una columna; el resto al lado.' },
  { id: 'poster', nombre: 'Póster', descripcion: 'Portada a pantalla completa; con foto, la foto de fondo.' },
  { id: 'suave', nombre: 'Suave', descripcion: 'Tonos pastel de tu color y formas redondas. Cercana.' },
  { id: 'carta', nombre: 'Carta', descripcion: 'Servicios como una carta de precios con puntos. Para bares y salones.' },
  { id: 'tecnica', nombre: 'Técnica', descripcion: 'Papel cuadriculado, letra de código y rejilla con líneas.' },
  { id: 'degradado', nombre: 'Degradado', descripcion: 'Portada en degradado y la primera sección flotando encima.' },
  { id: 'minima', nombre: 'Mínima', descripcion: 'Solo texto, líneas finas y mucho blanco. Nada sobra.' },
  { id: 'contraste', nombre: 'Contraste', descripcion: 'Blanco y negro, con tu color como rotulador en el titular.' },
  { id: 'retro', nombre: 'Retro', descripcion: 'Papel crema, bordes discontinuos y sello girado.' },
] as const;
export type IdPlantillaWeb = (typeof PLANTILLAS_WEB)[number]['id'];

/** Letras del sistema: cargan al instante y no dependen de ningún servicio externo. */
export const LETRAS_WEB = [
  {
    id: 'moderna',
    nombre: 'Moderna',
    descripcion: 'Limpia y fácil de leer',
    titulo: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    texto: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  },
  {
    id: 'clasica',
    nombre: 'Clásica',
    descripcion: 'Títulos con serifa, de toda la vida',
    titulo: "Georgia, 'Times New Roman', serif",
    texto: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  },
  {
    id: 'elegante',
    nombre: 'Elegante',
    descripcion: 'Serifa fina en títulos y texto',
    titulo: "'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif",
    texto: "'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif",
  },
  {
    id: 'cercana',
    nombre: 'Cercana',
    descripcion: 'Redondeada y amable',
    titulo: "'Trebuchet MS', 'Segoe UI', system-ui, sans-serif",
    texto: "'Trebuchet MS', 'Segoe UI', system-ui, sans-serif",
  },
] as const;
export type IdLetraWeb = (typeof LETRAS_WEB)[number]['id'];

export const COLORES_WEB = [
  { nombre: 'Azul', valor: '#2563eb' },
  { nombre: 'Verde', valor: '#15803d' },
  { nombre: 'Turquesa', valor: '#0f766e' },
  { nombre: 'Terracota', valor: '#c2410c' },
  { nombre: 'Granate', valor: '#9f1239' },
  { nombre: 'Morado', valor: '#6d28d9' },
  { nombre: 'Dorado', valor: '#b45309' },
  { nombre: 'Grafito', valor: '#334155' },
] as const;

export const PASOS_WEB = [
  { id: 'plantilla', titulo: 'Diseño' },
  { id: 'datos', titulo: 'Tu negocio' },
  { id: 'personaliza', titulo: 'Color y letra' },
  { id: 'publica', titulo: 'Publica' },
] as const;

/** Guía con ventanitas por paso (src/features/tour/guia.ts): `guia` es el `data-guia` del bloque. */
export const GUIA_WEB: Record<string, readonly { guia: string; titulo: string; texto: string }[]> = {
  plantilla: [
    { guia: 'galeria', titulo: 'Elige un diseño', texto: 'Todos cuestan lo mismo. Cada uno tiene su estructura; podrás cambiarlo luego sin volver a escribir nada.' },
    { guia: 'siguiente', titulo: 'Y luego, tu negocio', texto: 'Cuando tengas uno, sigue: escribes tus datos y ves tu web al momento.' },
  ],
  datos: [
    { guia: 'atajos', titulo: 'No empieces de cero', texto: 'Rellena con un ejemplo o deja que escribamos los textos por ti a partir de tu sector.' },
    { guia: 'negocio', titulo: 'Tu negocio', texto: 'Nombre, a qué te dedicas y unas líneas. La foto es opcional: tu local, tu trabajo o tu logo.' },
    { guia: 'contacto', titulo: 'Cómo te encuentran', texto: 'Pon al menos un teléfono, WhatsApp o correo: serán los botones grandes de tu web.' },
    { guia: 'vista', titulo: 'Tu web, en vivo', texto: 'Se actualiza mientras escribes. Cambia entre móvil y ordenador para verla en los dos.' },
  ],
  personaliza: [
    { guia: 'color', titulo: 'El color de tu marca', texto: 'Elige uno de la lista o el tuyo exacto. Los textos se ajustan solos para que se lean bien.' },
    { guia: 'letra', titulo: 'La letra', texto: 'Cambia el carácter de la web: clásica, moderna, cercana…' },
  ],
  publica: [
    { guia: 'comprar', titulo: 'Compra y publica', texto: 'Al pagar, tu web queda publicada sin marca de agua. Puedes cambiarla cuando quieras.' },
    { guia: 'dominio', titulo: 'Tu dominio', texto: 'Conecta tu propio nombre (tunegocio.es) y te decimos el único paso que te toca a ti.' },
  ],
};

export const MAX_SERVICIOS_WEB = 6;
export const MAX_ENLACES_WEB = 4;
export const MAX_OPINIONES_WEB = 6;
export const MAX_PREGUNTAS_WEB = 8;

/** Secciones que el cliente puede reordenar (la portada va siempre arriba y el pie abajo). */
export const SECCIONES_WEB = [
  { id: 'sobre', nombre: 'Quiénes somos' },
  { id: 'servicios', nombre: 'Servicios' },
  { id: 'galeria', nombre: 'Fotos' },
  { id: 'opiniones', nombre: 'Opiniones' },
  { id: 'preguntas', nombre: 'Preguntas frecuentes' },
  { id: 'contacto', nombre: 'Contacto' },
] as const;
export type IdSeccionWeb = (typeof SECCIONES_WEB)[number]['id'];
const ORDEN_POR_DEFECTO = SECCIONES_WEB.map((x) => x.id) as IdSeccionWeb[];
/** Orden válido: sin repetidos ni desconocidas; las que falten van al final en su sitio de siempre. */
export function ordenWeb(v: unknown): IdSeccionWeb[] {
  const dadas = (Array.isArray(v) ? v : []).filter((x): x is IdSeccionWeb => ORDEN_POR_DEFECTO.includes(x as IdSeccionWeb));
  return [...new Set([...dadas, ...ORDEN_POR_DEFECTO])];
}

export interface ServicioWeb {
  nombre: string;
  precio: string;
  texto: string;
}
export interface OpinionWeb {
  texto: string;
  autor: string;
}
export interface PreguntaWeb {
  pregunta: string;
  respuesta: string;
}
export interface EnlaceWeb {
  etiqueta: string;
  url: string;
}
export interface DatosWeb {
  plantilla: IdPlantillaWeb;
  color: string;
  letra: IdLetraWeb;
  negocio: string;
  sector: string;
  lema: string;
  sobre: string;
  servicios: ServicioWeb[];
  telefono: string;
  whatsapp: string;
  email: string;
  direccion: string;
  horario: string;
  /** Pueblos o barrios donde trabaja (fontaneros, reformas…), en texto libre. */
  zonas: string;
  /** Página para reservar cita (Booksy, Google, la suya…): pasa a ser el botón principal. */
  reservas: string;
  enlaces: EnlaceWeb[];
  /** Opiniones de clientes que el negocio copia de donde las tenga (Google, Facebook…). */
  opiniones: OpinionWeb[];
  /** Dónde leer todas sus opiniones (su ficha de Google, por ejemplo). */
  opinionesUrl: string;
  preguntas: PreguntaWeb[];
  /** Orden de las secciones (ordenWeb). */
  orden: IdSeccionWeb[];
  /** Foto del negocio ya reducida en el navegador (data URL WebP/JPEG), o ''. */
  foto: string;
  /** Fotos del trabajo o del local (data URL más pequeñas que la portada), hasta MAX_GALERIA_WEB. */
  galeria: string[];
}

/**
 * Foto de portada: el navegador la reduce (1200 px, WebP) antes de guardarla, y viaja dentro de los
 * datos de la web. Así la página publicada sigue siendo un único documento, igual en /w/<slug> que
 * en el dominio del cliente, sin almacenamiento aparte. Lo que no cumpla el formato o el tamaño se
 * descarta (la web se publica sin foto).
 */
export const MAX_FOTO_WEB = 400_000;
/** Galería: hasta 6 fotos de ~110 KB (lado mayor 1000 px); con la portada, la fila sigue lejos del máximo de D1. */
export const MAX_GALERIA_WEB = 6;
export const MAX_FOTO_GALERIA_WEB = 150_000;
const FOTO = /^data:image\/(?:webp|jpeg|png);base64,[A-Za-z0-9+/]+={0,2}$/;
/** Foto guardada como bytes y tipo, para servirla en /w/<slug>/foto (og:image no admite data URL). */
export function bytesFoto(foto: string, max = MAX_FOTO_WEB): { tipo: string; bytes: Uint8Array<ArrayBuffer> } | null {
  if (!fotoValida(foto, max)) return null;
  const coma = foto.indexOf(',');
  let bin: string;
  try {
    bin = atob(foto.slice(coma + 1));
  } catch {
    return null; // base64 de longitud imposible: se trata como sin foto (404), no como error
  }
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return { tipo: foto.slice(5, foto.indexOf(';')), bytes };
}
export const fotoValida = (v: unknown, max = MAX_FOTO_WEB): v is string => typeof v === 'string' && v.length <= max && FOTO.test(v);
/** Fotos de galería válidas, sin repetidas y como mucho MAX_GALERIA_WEB. */
export const galeriaValida = (v: unknown): string[] =>
  [...new Set((Array.isArray(v) ? v : []).filter((x) => fotoValida(x, MAX_FOTO_GALERIA_WEB)))].slice(0, MAX_GALERIA_WEB) as string[];

export const WEB_POR_DEFECTO: Pick<DatosWeb, 'plantilla' | 'color' | 'letra'> = {
  plantilla: 'clara',
  color: COLORES_WEB[0].valor,
  letra: 'moderna',
};

export type ResultadoWeb = { ok: true; datos: DatosWeb } | { ok: false; error: string };

const esDe = <T extends readonly { id: string }[]>(lista: T, v: unknown): v is T[number]['id'] =>
  lista.some((x) => x.id === v);

/** Formato de teléfono y, además, cifras suficientes para marcar (no «......»). */
const MIN_CIFRAS = 6;
const esTelefono = (t: string) => TELEFONO.test(t) && t.replace(/\D/g, '').length >= MIN_CIFRAS;

/** Comprueba y limpia lo que manda el navegador (o lo que hay guardado): nunca se confía en él. */
export function validarWeb(x: unknown): ResultadoWeb {
  if (!x || typeof x !== 'object') return { ok: false, error: 'datos' };
  const o = x as Record<string, unknown>;
  const negocio = texto(o.negocio, 80);
  if (!negocio) return { ok: false, error: 'negocio' };
  const telefono = texto(o.telefono, 24);
  if (telefono && !esTelefono(telefono)) return { ok: false, error: 'telefono' };
  const whatsapp = texto(o.whatsapp, 24);
  if (whatsapp && !esTelefono(whatsapp)) return { ok: false, error: 'whatsapp' };
  const email = texto(o.email, 254);
  if (email && !EMAIL.test(email)) return { ok: false, error: 'email' };
  if (!telefono && !whatsapp && !email) return { ok: false, error: 'contacto' };
  const servicios = (Array.isArray(o.servicios) ? o.servicios : [])
    .map((s) => {
      const r = (s ?? {}) as Record<string, unknown>;
      return { nombre: texto(r.nombre, 60), precio: texto(r.precio, 20), texto: texto(r.texto, 200) };
    })
    .filter((s) => s.nombre)
    .slice(0, MAX_SERVICIOS_WEB);
  const enlaces = (Array.isArray(o.enlaces) ? o.enlaces : [])
    .map((e) => {
      const r = (e ?? {}) as Record<string, unknown>;
      const url = urlSegura(r.url);
      return { etiqueta: texto(r.etiqueta, 30) || (url ? new URL(url).hostname.replace(/^www\./, '') : ''), url };
    })
    .filter((e) => e.url)
    .slice(0, MAX_ENLACES_WEB);
  const filas = (v: unknown) => (Array.isArray(v) ? v : []).map((f) => (f ?? {}) as Record<string, unknown>);
  const opiniones = filas(o.opiniones)
    .map((r) => ({ texto: parrafos(r.texto, 400), autor: texto(r.autor, 60) }))
    .filter((x) => x.texto)
    .slice(0, MAX_OPINIONES_WEB);
  const preguntas = filas(o.preguntas)
    .map((r) => ({ pregunta: texto(r.pregunta, 160), respuesta: parrafos(r.respuesta, 600) }))
    .filter((x) => x.pregunta && x.respuesta)
    .slice(0, MAX_PREGUNTAS_WEB);
  return {
    ok: true,
    datos: {
      plantilla: esDe(PLANTILLAS_WEB, o.plantilla) ? o.plantilla : WEB_POR_DEFECTO.plantilla,
      color: typeof o.color === 'string' && COLOR_VALIDO.test(o.color) ? o.color.toLowerCase() : WEB_POR_DEFECTO.color,
      letra: esDe(LETRAS_WEB, o.letra) ? o.letra : WEB_POR_DEFECTO.letra,
      negocio,
      sector: texto(o.sector, 60),
      lema: texto(o.lema, 140),
      sobre: parrafos(o.sobre, 900),
      servicios,
      telefono,
      whatsapp,
      email,
      direccion: texto(o.direccion, 160),
      horario: parrafos(o.horario, 300),
      zonas: texto(o.zonas, 300),
      reservas: urlSegura(o.reservas),
      enlaces,
      opiniones,
      opinionesUrl: urlSegura(o.opinionesUrl),
      preguntas,
      orden: ordenWeb(o.orden),
      foto: fotoValida(o.foto) ? o.foto : '',
      galeria: galeriaValida(o.galeria),
    },
  };
}

/** Ejemplo para «Rellenar con un ejemplo» y para las miniaturas de las plantillas. */
export const EJEMPLO_WEB: DatosWeb = {
  ...WEB_POR_DEFECTO,
  negocio: 'Peluquería Lola',
  sector: 'Peluquería y estética',
  lema: 'Cortes, color y peinados con cita, en el centro de Lugo.',
  sobre:
    'Llevamos doce años cuidando el pelo de nuestro barrio. Trabajamos con cita para que no esperes y usamos productos sin amoniaco.\n\nPide tu hora por WhatsApp y te contestamos el mismo día.',
  servicios: [
    { nombre: 'Corte y peinado', precio: '18 €', texto: 'Lavado, corte y secado a tu gusto.' },
    { nombre: 'Color', precio: 'desde 35 €', texto: 'Tinte, mechas o balayage sin amoniaco.' },
    { nombre: 'Recogidos', precio: '30 €', texto: 'Para bodas, comuniones y eventos.' },
    { nombre: 'Tratamientos', precio: '20 €', texto: 'Hidratación y reparación con keratina.' },
  ],
  telefono: '982 000 000',
  whatsapp: '600 000 000',
  email: 'hola@peluquerialola.es',
  direccion: 'Rúa da Raíña 1, Lugo',
  horario: 'Lunes a viernes: 9:30 – 20:00\nSábados: 9:30 – 14:00',
  zonas: '',
  reservas: '',
  enlaces: [{ etiqueta: 'Instagram', url: 'https://www.instagram.com/' }],
  opiniones: [
    { texto: 'Me cortan el pelo aquí desde hace años y siempre salgo contenta. Puntuales y muy cuidadosas.', autor: 'Marta G.' },
    { texto: 'Me hicieron el recogido de la boda de mi hermana y aguantó toda la noche.', autor: 'Sara P.' },
  ],
  preguntas: [
    { pregunta: '¿Hace falta pedir cita?', respuesta: 'Sí, trabajamos con cita para que no esperes. Escríbenos por WhatsApp y te damos hora.' },
    { pregunta: '¿Puedo pagar con tarjeta?', respuesta: 'Sí, con tarjeta, Bizum o en efectivo.' },
  ],
  opinionesUrl: '',
  orden: [...ORDEN_POR_DEFECTO],
  foto: '',
  galeria: [],
};

// ---------- Pintado ----------

const ESC: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
/** Escapa para texto y atributos entre comillas. */
export const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ESC[c]!);
const conSaltos = (s: string) => esc(s).replace(/\n/g, '<br>');
const parrafosHtml = (s: string) =>
  s
    .split(/\n{2,}/)
    .map((p) => `<p>${conSaltos(p)}</p>`)
    .join('');

const canales = (hex: string) => [1, 3, 5].map((i) => Number.parseInt(hex.slice(i, i + 2), 16));
/** Luminancia relativa WCAG (canales sRGB linealizados). */
function luminancia(hex: string): number {
  const [r, g, b] = canales(hex).map((v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
}
/** Relación de contraste WCAG entre dos colores #rrggbb (de 1 a 21). */
export function contraste(a: string, b: string): number {
  const [x, y] = [luminancia(a), luminancia(b)].sort((p, q) => q - p);
  return (x! + 0.05) / (y! + 0.05);
}
/** Mínimo WCAG AA para texto normal. */
export const CONTRASTE_AA = 4.5;

/** Texto legible sobre el color de acento: negro o blanco, el de más contraste (siempre ≥ 4,58:1). */
export function sobreAcento(hex: string): string {
  return contraste(hex, '#000000') >= contraste(hex, '#ffffff') ? '#000000' : '#ffffff';
}

const mezclar = (hex: string, hacia: number, t: number) =>
  `#${canales(hex)
    .map((v) => Math.round(v + (hacia - v) * t).toString(16).padStart(2, '0'))
    .join('')}`;
/**
 * El acento como texto sobre `fondo`: el color elegido si ya cumple AA; si no, oscurecido (fondo
 * claro) o aclarado (fondo oscuro) lo justo para cumplirlo. Fondos y bordes siguen con el elegido.
 */
export function acentoSobre(hex: string, fondo: string): string {
  const hacia = luminancia(fondo) > 0.18 ? 0 : 255;
  for (let t = 0; t <= 1; t += 0.05) {
    const c = mezclar(hex, hacia, t);
    if (contraste(c, fondo) >= CONTRASTE_AA) return c;
  }
  return hacia ? '#ffffff' : '#000000';
}
/** Fondos sobre los que el acento se usa como texto: el más desfavorable de cada familia. */
export const FONDO_TEXTO_CLARO = '#f9fafb';
export const FONDO_TEXTO_OSCURO = '#111c33';

const digitos = (t: string) => t.replace(/[^\d+]/g, '');
/** wa.me quiere el número con prefijo de país y sin «+»; los móviles españoles se completan con 34. */
export function enlaceWhatsapp(t: string): string {
  let n = t.replace(/\D/g, '');
  if (n.startsWith('00')) n = n.slice(2);
  if (n.length === 9 && /^[67]/.test(n)) n = `34${n}`;
  return `https://wa.me/${n}`;
}
const enlaceMapa = (direccion: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;

const ICONO = {
  tel: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  wa: '<path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>',
  mail: '<path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/><path d="M3 7l9 6 9-6"/>',
  mapa: '<path d="M9 11a3 3 0 1 0 6 0 3 3 0 0 0-6 0"/><path d="M17.66 16.66 13.41 20.9a2 2 0 0 1-2.83 0l-4.24-4.24a8 8 0 1 1 11.32 0z"/>',
  cita: '<path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z"/><path d="M16 3v4M8 3v4M4 11h16"/>',
  zona: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/>',
  reloj: '<path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0"/><path d="M12 7v5l3 3"/>',
  enlace: '<path d="M9 15l6-6"/><path d="M11 6l.46-.54a5 5 0 0 1 7.07 7.07L18 13"/><path d="M13 18l-.4.54a5.07 5.07 0 0 1-7.12 0 4.97 4.97 0 0 1 0-7.07L6 11"/>',
} as const;
const icono = (k: keyof typeof ICONO) =>
  `<svg class="w-ico" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONO[k]}</svg>`;

/** Marca de agua en mosaico como fondo SVG: no es texto de la página (no se copia ni se lee). */
function fondoMarca(marca: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="260" height="150"><text x="20" y="90" transform="rotate(-24 130 75)" font-family="system-ui,sans-serif" font-size="20" font-weight="700" fill="rgba(17,24,39,0.16)">${esc(marca)}</text></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/** CSS de todas las plantillas, con ámbito en `.w`: sirve igual en la página publicada y en el Shadow DOM. */
export const CSS_WEB = `
.w{--w-ct:var(--w-ct-claro);--w-fondo:#fff;--w-tinta:#111827;--w-suave:#4b5563;--w-borde:#e5e7eb;--w-panel:#f9fafb;
  position:relative;container-type:inline-size;background:var(--w-fondo);color:var(--w-tinta);
  font-family:var(--w-ft-texto);line-height:1.6;-webkit-font-smoothing:antialiased;overflow-wrap:anywhere}
.w *,.w *::before,.w *::after{box-sizing:border-box}
.w h1,.w h2,.w h3{font-family:var(--w-ft-titulo);line-height:1.15;margin:0;color:inherit}
.w p{margin:0}
.w :where(a){color:inherit}
.w-in{width:100%;max-width:1040px;margin:0 auto;padding:0 20px}
.w-ico{width:1.15em;height:1.15em;flex:none}
.w-cab{padding:56px 0 48px;text-align:center}
.w-portada img{display:block;width:100%;max-height:440px;object-fit:cover;border-radius:16px}
.w-galeria{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.w-galeria img{display:block;width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:12px;background:var(--w-panel)}
@container (min-width:640px){.w-galeria{grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}}
.w-revista .w-galeria img{border-radius:0}
.w-brutal .w-galeria img{border:3px solid #111827;border-radius:0}
.w-sector{font-size:.8rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--w-ct)}
.w-cab h1{font-size:clamp(2rem,9cqi,3.6rem);margin-top:10px}
.w-lema{max-width:36rem;margin:14px auto 0;font-size:1.15rem;color:var(--w-suave)}
.w-acciones{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:28px}
.w-boton{display:inline-flex;align-items:center;gap:8px;padding:12px 20px;border-radius:999px;font-weight:600;
  text-decoration:none;border:2px solid var(--w-c);color:var(--w-ct);background:transparent}
.w-boton-lleno{background:var(--w-c);color:var(--w-s)}
.w-boton:focus-visible{outline:3px solid var(--w-c);outline-offset:3px}
.w-sec{padding:44px 0}
.w-sec h2{font-size:clamp(1.5rem,5cqi,2.1rem);margin-bottom:18px}
.w-sec h2::after{content:"";display:block;width:48px;height:4px;border-radius:4px;background:var(--w-c);margin-top:10px}
.w-sobre p+p{margin-top:12px}
.w-sobre{max-width:44rem;font-size:1.05rem;color:var(--w-suave)}
.w-servicios{display:grid;gap:14px;grid-template-columns:1fr;list-style:none;margin:0;padding:0}
.w-servicio{border:1px solid var(--w-borde);border-radius:16px;padding:18px 20px;background:var(--w-fondo)}
.w-servicio-cab{display:flex;justify-content:space-between;align-items:baseline;gap:12px}
.w-servicio h3{font-size:1.15rem}
.w-precio{font-weight:700;color:var(--w-ct);white-space:nowrap}
.w-servicio p{margin-top:6px;color:var(--w-suave)}
.w-contacto{display:grid;gap:12px;grid-template-columns:1fr;list-style:none;margin:0;padding:0}
.w-dato{display:flex;gap:12px;align-items:flex-start;padding:14px 16px;border-radius:14px;background:var(--w-panel);text-decoration:none}
.w-dato .w-ico{color:var(--w-c);margin-top:3px}
.w-dato small{display:block;font-size:.78rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--w-suave)}
a.w-dato:hover,a.w-dato:focus-visible{outline:2px solid var(--w-c);outline-offset:0}
.w-pie{padding:28px 0 36px;text-align:center;font-size:.85rem;color:var(--w-suave);border-top:1px solid var(--w-borde)}
.w-pie a{color:inherit}
@container (min-width:640px){
  .w-servicios{grid-template-columns:repeat(2,1fr)}
  .w-contacto{grid-template-columns:repeat(2,1fr)}
  .w-cab{padding:88px 0 72px}
}
@container (min-width:960px){
  .w-servicios{grid-template-columns:repeat(3,1fr)}
}
/* Banda: portada a todo color */
.w-banda .w-cab{background:var(--w-c);color:var(--w-s)}
.w-banda .w-sector,.w-banda .w-lema{color:inherit;opacity:.9}
.w-banda .w-cab .w-boton{border-color:currentColor;color:inherit}
.w-banda .w-cab .w-boton-lleno{background:var(--w-s);color:var(--w-c);border-color:var(--w-s)}
.w-banda .w-servicios-sec{background:var(--w-panel)}
.w-banda .w-servicio{box-shadow:0 6px 20px rgb(0 0 0 / .06);border-color:transparent;border-top:4px solid var(--w-c)}
/* Clara: franja fina de color arriba */
.w-clara{border-top:6px solid var(--w-c)}
.w-clara .w-servicios-sec{border-top:1px solid var(--w-borde)}
/* Noche: fondo oscuro */
.w-noche{--w-ct:var(--w-ct-oscuro);--w-fondo:#0f172a;--w-tinta:#f1f5f9;--w-suave:#94a3b8;--w-borde:#1e293b;--w-panel:#111c33}
.w-noche .w-cab{background:radial-gradient(60rem 30rem at 50% -10%,color-mix(in srgb,var(--w-c) 35%,transparent),transparent)}
.w-noche .w-servicio{background:var(--w-panel)}
.w-noche .w-boton{color:var(--w-tinta);border-color:var(--w-c)}
.w-noche .w-boton-lleno{color:var(--w-s)}
/* ---- Diseños de estructura: la misma página, otra composición (solo CSS) ---- */
/* Partida: texto a la izquierda y foto (o panel de color) a la derecha */
.w-partida .w-cab{text-align:left}
.w-partida .w-lema{margin-left:0}
.w-partida .w-acciones{justify-content:flex-start}
.w-partida .w-sector{display:inline-block;padding:4px 12px;border-radius:999px;background:color-mix(in srgb,var(--w-c) 12%,#fff)}
@container (min-width:820px){
  .w-partida .w-cuerpo{display:grid;grid-template-columns:1.1fr .9fr}
  .w-partida .w-cuerpo>*,.w-partida main>*{grid-column:1/-1}
  .w-partida main{display:contents}
  .w-partida .w-cuerpo>.w-cab{grid-column:1;grid-row:1;display:flex;align-items:center;min-height:560px}
  .w-partida .w-cab .w-in{padding:0 48px}
  .w-partida main>.w-portada{grid-column:2;grid-row:1}
  .w-partida .w-portada .w-in{max-width:none;height:100%;padding:0}
  .w-partida .w-portada img{height:100%;max-height:none;border-radius:0 0 0 48px}
  .w-partida .w-cuerpo:not(:has(.w-portada))::before{content:"";grid-column:2;grid-row:1;border-radius:0 0 0 48px;
    background:radial-gradient(circle at 30% 30%,color-mix(in srgb,var(--w-s) 22%,transparent) 0 18%,transparent 19%),
      radial-gradient(circle at 75% 70%,color-mix(in srgb,var(--w-s) 14%,transparent) 0 26%,transparent 27%),var(--w-c)}
}
/* Revista: titular enorme, secciones numeradas, sin cajas */
.w-revista{counter-reset:sec}
.w-revista .w-cab{text-align:left;border-bottom:2px solid var(--w-tinta)}
.w-revista .w-cab h1{font-size:clamp(2.6rem,13cqi,7rem);letter-spacing:-.035em;line-height:.95}
.w-revista .w-lema{margin-left:0;font-size:1.3rem}
.w-revista .w-acciones{justify-content:flex-start}
.w-revista .w-sector::before{content:"";display:inline-block;width:40px;height:2px;background:currentColor;vertical-align:middle;margin-right:10px}
.w-revista .w-sec h2{counter-increment:sec;font-size:.85rem;letter-spacing:.14em;text-transform:uppercase}
.w-revista .w-sec h2::before{content:counter(sec,decimal-leading-zero) " — ";color:var(--w-ct)}
.w-revista .w-sec h2::after{display:none}
.w-revista .w-servicios{counter-reset:srv;gap:28px}
.w-revista .w-servicio{border:0;border-top:1px solid var(--w-tinta);border-radius:0;padding:18px 0 0;background:none}
.w-revista .w-servicio::before{counter-increment:srv;content:counter(srv,decimal-leading-zero);display:block;font-family:var(--w-ft-titulo);font-size:2.4rem;font-weight:700;line-height:1;margin-bottom:8px;color:var(--w-ct)}
.w-revista .w-dato{background:none;border-top:1px solid var(--w-borde);border-radius:0;padding:14px 0}
.w-revista .w-portada img{border-radius:0}
@container (min-width:760px){
  .w-revista .w-sec .w-in{display:grid;grid-template-columns:200px 1fr;gap:32px}
  .w-revista .w-sobre{font-size:1.25rem;color:var(--w-tinta)}
}
/* Bento: todo en bloques redondeados; el primer servicio, grande y en color */
.w-bento{--w-fondo:#f1f1f3;--w-panel:#f6f6f8}
.w-bento .w-cab,.w-bento .w-sec{padding:8px 0}
.w-bento .w-cab{padding-top:16px}
.w-bento .w-cab .w-in,.w-bento .w-sobre-sec .w-in,.w-bento .w-contacto-sec .w-in,.w-bento .w-pie .w-in{width:calc(100% - 24px);background:#fff;border-radius:28px;padding:32px 28px}
.w-bento .w-cab .w-in{padding:64px 28px}
.w-bento .w-portada .w-in{width:calc(100% - 24px);padding:0}
.w-bento .w-portada img{border-radius:28px}
.w-bento .w-servicios-sec h2{padding:12px 8px 0}
.w-bento .w-servicio{border:0;border-radius:24px;padding:24px;min-height:150px;background:#fff}
.w-bento .w-servicio:first-child{background:var(--w-c);color:var(--w-s)}
.w-bento .w-servicio:first-child :is(.w-precio,p){color:inherit}
.w-bento .w-pie{border:0;padding-top:8px}
@container (min-width:960px){
  .w-bento .w-servicios{grid-template-columns:repeat(6,1fr)}
  .w-bento .w-servicio{grid-column:span 2}
  .w-bento .w-servicio:first-child{grid-column:span 4;font-size:1.15rem}
  .w-bento .w-servicio:first-child h3{font-size:1.8rem}
  .w-bento .w-servicio:first-child:last-child,.w-bento .w-servicio:nth-child(3):last-child,.w-bento .w-servicio:nth-child(6):last-child{grid-column:span 6}
  .w-bento .w-servicio:nth-child(4):last-child{grid-column:span 4}
}
/* Cristal: fondo oscuro con brillos del acento y tarjetas translúcidas */
.w-cristal{--w-ct:var(--w-ct-oscuro);--w-fondo:#0b1020;--w-tinta:#f8fafc;--w-suave:#cbd5e1;--w-borde:rgb(255 255 255 / .14);--w-panel:rgb(255 255 255 / .06);
  background:radial-gradient(50rem 30rem at 10% 0%,color-mix(in srgb,var(--w-c) 34%,transparent),transparent 60%),
    radial-gradient(40rem 30rem at 100% 35%,color-mix(in srgb,var(--w-c) 22%,transparent),transparent 60%),#0b1020}
.w-cristal :is(.w-servicio,.w-dato){background:var(--w-panel);border:1px solid var(--w-borde);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
.w-cristal .w-boton{color:var(--w-tinta);border-color:var(--w-c)}
.w-cristal .w-boton-lleno{color:var(--w-s)}
.w-cristal .w-portada img{border:1px solid var(--w-borde)}
/* Brutal: bordes gruesos, sombras duras, mayúsculas */
.w-brutal{--w-fondo:#fffdf5;--w-borde:#111827;--w-panel:#fff}
.w-brutal .w-cab{text-align:left;border-bottom:3px solid #111827;background:color-mix(in srgb,var(--w-c) 16%,#fffdf5)}
.w-brutal .w-cab h1{font-size:clamp(2.4rem,11cqi,5.5rem);text-transform:uppercase;letter-spacing:-.02em}
.w-brutal .w-lema{margin-left:0;color:var(--w-tinta)}
.w-brutal .w-acciones{justify-content:flex-start}
.w-brutal .w-sector{display:inline-block;background:#111827;color:#fff;padding:4px 10px}
.w-brutal .w-boton{border-radius:0;border:3px solid #111827;color:#111827;background:#fff;box-shadow:4px 4px 0 #111827}
.w-brutal .w-boton-lleno{background:var(--w-c);color:var(--w-s)}
.w-brutal :is(.w-servicio,.w-dato){border:3px solid #111827;border-radius:0;background:#fff;box-shadow:6px 6px 0 #111827}
.w-brutal .w-precio{background:var(--w-c);color:var(--w-s);padding:0 8px;border:2px solid #111827}
.w-brutal .w-sec h2::after{width:120px;height:12px;border-radius:0;border:3px solid #111827}
.w-brutal .w-portada img{border:3px solid #111827;border-radius:0;box-shadow:8px 8px 0 #111827}
/* Lateral: columna fija con el nombre y los botones; el contenido al lado */
.w-lateral .w-cab{background:var(--w-c);color:var(--w-s);text-align:left}
.w-lateral .w-cab :is(.w-sector,.w-lema){color:inherit;opacity:.9}
.w-lateral .w-lema{margin-left:0}
.w-lateral .w-acciones{justify-content:flex-start}
.w-lateral .w-cab .w-boton{border-color:currentColor;color:inherit}
.w-lateral .w-cab .w-boton-lleno{background:var(--w-s);color:var(--w-c);border-color:var(--w-s)}
@container (min-width:900px){
  .w-lateral .w-cuerpo{display:grid;grid-template-columns:340px 1fr}
  .w-lateral .w-cab{grid-column:1;grid-row:1/span 2;padding:0}
  .w-lateral .w-cab .w-in{position:sticky;top:0;padding:56px 32px}
  .w-lateral .w-cab h1{font-size:2.6rem}
  .w-lateral .w-acciones{flex-direction:column;align-items:stretch}
  .w-lateral main{grid-column:2;grid-row:1;padding-top:24px}
  .w-lateral main .w-in,.w-lateral .w-pie .w-in{padding:0 40px}
  .w-lateral .w-pie{grid-column:2;grid-row:2}
  .w-lateral .w-servicios{grid-template-columns:repeat(2,1fr)}
}
/* Póster: portada a toda pantalla; con foto, la foto de fondo y el texto encima */
.w-poster .w-cab{position:relative;overflow:hidden;display:flex;align-items:flex-end;min-height:min(88vh,720px);text-align:left;background:var(--w-c);color:var(--w-s)}
.w-poster .w-cab::before{content:"";position:absolute;width:70cqi;aspect-ratio:1;border-radius:50%;right:-15cqi;top:-25cqi;background:color-mix(in srgb,var(--w-s) 12%,transparent)}
.w-poster .w-cab .w-in{position:relative}
.w-poster .w-cab h1{font-size:clamp(3rem,15cqi,9rem);line-height:.9;letter-spacing:-.04em}
.w-poster .w-cab :is(.w-sector,.w-lema){color:inherit;opacity:.92}
.w-poster .w-lema{margin-left:0}
.w-poster .w-acciones{justify-content:flex-start}
.w-poster .w-cab .w-boton{border-color:currentColor;color:inherit}
.w-poster .w-cab .w-boton-lleno{background:var(--w-s);color:var(--w-c);border-color:var(--w-s)}
.w-poster .w-cuerpo:has(.w-portada){display:grid}
.w-poster .w-cuerpo:has(.w-portada) main{display:contents}
.w-poster .w-cuerpo:has(.w-portada) :is(.w-cab,.w-portada){grid-area:1/1}
.w-poster .w-cuerpo:has(.w-portada) .w-cab{z-index:1;color:#fff;background:linear-gradient(to top,rgb(0 0 0 / .82),rgb(0 0 0 / .6));text-shadow:0 1px 3px rgb(0 0 0 / .5)}
.w-poster .w-cuerpo:has(.w-portada) .w-cab::before{display:none}
.w-poster .w-cuerpo:has(.w-portada) .w-cab .w-boton-lleno{background:var(--w-c);color:var(--w-s);border-color:var(--w-c)}
.w-poster .w-portada .w-in{max-width:none;height:100%;padding:0}
.w-poster .w-portada img{height:100%;max-height:none;border-radius:0}
/* Suave: tonos pastel del acento y formas redondas */
.w-suave{--w-fondo:color-mix(in srgb,var(--w-c) 6%,#fff);--w-panel:#fff;--w-borde:color-mix(in srgb,var(--w-c) 18%,#fff)}
.w-suave .w-cab{position:relative;overflow:hidden}
.w-suave .w-cab::before,.w-suave .w-cab::after{content:"";position:absolute;border-radius:50%;background:color-mix(in srgb,var(--w-c) 20%,#fff)}
.w-suave .w-cab::before{width:340px;height:340px;left:-130px;top:-140px}
.w-suave .w-cab::after{width:220px;height:220px;right:-70px;bottom:-90px}
.w-suave .w-cab .w-in{position:relative;z-index:1}
.w-suave :is(.w-servicio,.w-dato){border:0;border-radius:28px;background:#fff;box-shadow:0 12px 30px -14px color-mix(in srgb,var(--w-c) 40%,transparent)}
.w-suave .w-sec h2{text-align:center}
.w-suave .w-sec h2::after{margin-inline:auto;width:24px;height:24px;border-radius:50%;background:color-mix(in srgb,var(--w-c) 30%,#fff)}
.w-suave .w-sobre{margin-inline:auto;text-align:center}
.w-suave .w-boton{border-radius:18px}
.w-suave .w-portada img{border-radius:40px}
/* Carta: lista de precios con puntos, centrada y con adornos */
.w-carta{--w-fondo:#fbf7f0;--w-panel:#fff;--w-borde:#e7dccb}
.w-carta .w-cab{border-bottom:1px solid var(--w-borde)}
.w-carta .w-sector::before,.w-carta .w-sector::after{content:"✦";margin:0 .6em}
.w-carta .w-sec h2{text-align:center}
.w-carta .w-sec h2::after{content:"❦";width:auto;height:auto;background:none;color:var(--w-ct);margin:8px auto 0;font-size:1.3rem}
.w-carta .w-servicios{grid-template-columns:1fr;max-width:40rem;margin:0 auto;gap:22px}
.w-carta .w-servicio{border:0;padding:0;background:none;border-radius:0}
.w-carta .w-servicio-cab{justify-content:flex-start;gap:8px}
.w-carta .w-servicio-cab::after{content:"";flex:1;order:1;min-width:24px;border-bottom:2px dotted #b8a88f}
.w-carta .w-precio{order:2}
.w-carta .w-servicio p{font-style:italic;font-size:.95rem}
.w-carta .w-sobre{margin-inline:auto;text-align:center}
.w-carta .w-dato{background:var(--w-panel);border:1px solid var(--w-borde)}
.w-carta .w-portada img{border-radius:999px 999px 16px 16px;max-height:380px}
/* Técnica: papel cuadriculado, letra de código y rejilla con líneas */
.w-tecnica{--w-borde:#d1d5db;background-image:linear-gradient(rgb(17 24 39 / .05) 1px,transparent 1px),linear-gradient(90deg,rgb(17 24 39 / .05) 1px,transparent 1px);background-size:32px 32px}
.w-tecnica .w-cab{text-align:left;border-bottom:1px solid var(--w-tinta)}
.w-tecnica .w-cab h1{letter-spacing:-.03em}
.w-tecnica .w-lema{margin-left:0}
.w-tecnica .w-acciones{justify-content:flex-start}
.w-tecnica :is(.w-sector,.w-sec h2,.w-dato small,.w-precio,.w-boton){font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
.w-tecnica .w-sector::before{content:"// "}
.w-tecnica .w-sec h2{font-size:1rem;text-transform:uppercase;letter-spacing:.08em}
.w-tecnica .w-sec h2::before{content:"[ "}
.w-tecnica .w-sec h2::after{content:" ]";display:inline;width:auto;height:auto;background:none;margin:0}
.w-tecnica .w-servicios{gap:0;border-top:1px solid var(--w-tinta);border-left:1px solid var(--w-tinta)}
.w-tecnica .w-servicio{border:0;border-right:1px solid var(--w-tinta);border-bottom:1px solid var(--w-tinta);border-radius:0;background:#fff}
.w-tecnica .w-boton{border-radius:4px}
.w-tecnica .w-dato{border-radius:0;background:#fff;border:1px solid var(--w-tinta)}
.w-tecnica .w-portada img{border-radius:0;border:1px solid var(--w-tinta)}
/* Degradado: portada en degradado del acento y la primera sección flotando encima */
.w-degradado .w-cab{padding-bottom:150px;color:var(--w-s);background:var(--w-c);background:linear-gradient(135deg,var(--w-c),oklch(from var(--w-c) l c calc(h + 50)))}
.w-degradado .w-cab :is(.w-sector,.w-lema){color:inherit;opacity:.92}
.w-degradado .w-cab .w-boton{border-color:currentColor;color:inherit}
.w-degradado .w-cab .w-boton-lleno{background:var(--w-s);color:var(--w-c);border-color:var(--w-s)}
.w-degradado main>:first-child{position:relative;margin-top:-110px;padding-top:0}
.w-degradado main>:first-child>.w-in{width:calc(100% - 32px);background:var(--w-fondo);border-radius:24px;padding:32px 28px;box-shadow:0 30px 60px -30px rgb(0 0 0 / .35)}
.w-degradado main>.w-portada:first-child>.w-in{padding:12px}
.w-degradado .w-servicio{border:0;border-radius:20px;background:var(--w-panel)}
.w-degradado .w-sec h2::after{background:linear-gradient(90deg,var(--w-c),oklch(from var(--w-c) l c calc(h + 50)))}
/* Mínima: solo texto, líneas finas y mucho blanco */
.w-minima .w-cab{text-align:left;padding:120px 0 64px}
.w-minima .w-cab h1{font-size:clamp(2.2rem,8cqi,4.4rem);font-weight:500;letter-spacing:-.03em;max-width:14ch}
.w-minima .w-lema{margin-left:0}
.w-minima .w-acciones{justify-content:flex-start;gap:28px}
.w-minima .w-boton,.w-minima .w-boton-lleno{border-radius:0;border-width:0 0 2px;padding:6px 0;background:none;color:var(--w-ct)}
.w-minima .w-sec{padding:64px 0}
.w-minima .w-sec h2{font-size:.8rem;font-weight:600;text-transform:uppercase;letter-spacing:.2em;color:var(--w-suave)}
.w-minima .w-sec h2::after{display:none}
.w-minima :is(.w-servicio,.w-dato){border:0;border-top:1px solid var(--w-borde);border-radius:0;padding:20px 0;background:none}
.w-minima .w-dato .w-ico{color:var(--w-suave)}
.w-minima .w-portada img{border-radius:0;max-height:520px}
.w-minima .w-pie{text-align:left;border:0}
/* Contraste: blanco y negro, el acento como rotulador */
.w-contraste{--w-ct:var(--w-ct-claro);--w-tinta:#000;--w-suave:#262626;--w-borde:#000}
.w-contraste .w-cab{background:#000;color:#fff;text-align:left}
.w-contraste .w-cab .w-sector{color:var(--w-ct-oscuro)}
.w-contraste .w-cab h1{font-size:clamp(2.6rem,12cqi,6rem);letter-spacing:-.04em;display:inline;-webkit-box-decoration-break:clone;box-decoration-break:clone;
  background:linear-gradient(transparent 64%,color-mix(in srgb,var(--w-c) 75%,transparent) 64% 90%,transparent 90%)}
.w-contraste .w-cab .w-sector+h1,.w-contraste .w-cab h1:first-child{margin-top:0}
.w-contraste .w-lema{margin-left:0;color:#d4d4d4}
.w-contraste .w-acciones{justify-content:flex-start}
.w-contraste .w-cab .w-boton{border-color:#fff;color:#fff}
.w-contraste .w-cab .w-boton-lleno{background:var(--w-c);color:var(--w-s);border-color:var(--w-c)}
.w-contraste .w-sec h2::after{width:100%;height:3px;background:#000}
.w-contraste :is(.w-servicio,.w-dato){border:2px solid #000;border-radius:0;background:#fff}
.w-contraste .w-precio{background:#000;color:#fff;padding:0 8px}
.w-contraste .w-portada img{border-radius:0;filter:grayscale(1) contrast(1.1)}
.w-contraste .w-pie{background:#000;color:#d4d4d4;border:0}
/* Retro: papel crema, bordes discontinuos, sello girado */
.w-retro{--w-ct:color-mix(in srgb,var(--w-ct-claro) 82%,#000);--w-fondo:#f6efe3;--w-tinta:#2b2118;--w-suave:#5c4a3a;--w-borde:#2b2118;--w-panel:#fffaf1}
.w-retro .w-cab h1{text-transform:uppercase;letter-spacing:.04em}
.w-retro .w-sector{display:inline-block;border:2px solid currentColor;border-radius:999px;padding:4px 14px;transform:rotate(-3deg)}
.w-retro .w-sec h2{text-align:center}
.w-retro .w-sec h2::after{width:100%;max-width:220px;height:6px;border-radius:0;margin-inline:auto;background:repeating-linear-gradient(90deg,var(--w-c) 0 10px,transparent 10px 16px)}
.w-retro :is(.w-servicio,.w-dato){border:2px dashed var(--w-borde);border-radius:6px;background:var(--w-panel)}
.w-retro .w-boton{border-radius:6px}
.w-retro .w-portada img{border-radius:6px;border:8px solid #fffaf1;box-shadow:0 10px 30px rgb(43 33 24 / .25);transform:rotate(-1deg)}
.w-retro .w-pie{border-top:2px dashed var(--w-borde)}
.w-opiniones,.w-preguntas{display:grid;gap:12px;list-style:none;margin:0;padding:0}
.w-opiniones{grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))}
.w-preguntas{max-width:46rem}
.w-opinion,.w-pregunta{display:block}
.w-opinion blockquote{margin:0;font-size:1.05rem}
.w-opinion blockquote::before{content:"“";display:block;font-family:var(--w-ft-titulo);font-size:2.6rem;line-height:.8;color:var(--w-ct)}
.w-opinion blockquote p+p,.w-respuesta p+p{margin-top:8px}
.w-autor{margin-top:10px;font-weight:600;color:var(--w-suave)}
.w-pregunta summary{cursor:pointer;font-weight:600;list-style-position:outside;margin-left:1.1em}
.w-pregunta summary::marker{color:var(--w-ct)}
.w-pregunta summary:focus-visible{outline:3px solid var(--w-c);outline-offset:3px}
.w-respuesta{margin-top:8px;color:var(--w-suave)}
.w-mas{margin-top:14px}
.w-mas a{font-weight:600;color:var(--w-ct)}
.w-barra{display:none}
@container (max-width:640px){
  .w-barra{position:sticky;bottom:0;z-index:4;display:flex;gap:8px;padding:10px 12px;background:var(--w-fondo);border-top:1px solid var(--w-borde);box-shadow:0 -6px 18px rgb(0 0 0 / .08)}
  .w-barra .w-boton{flex:1 1 0;min-width:0;justify-content:center;gap:6px;padding:10px 6px;font-size:.9rem;line-height:1.2;text-align:center;overflow-wrap:break-word;word-break:normal;hyphens:auto}
}
@container (max-width:380px){
  .w-barra .w-boton{flex-direction:column;gap:2px;padding:8px 4px;font-size:.85rem}
}
.w-marca{position:absolute;inset:0;pointer-events:none;z-index:5;background-repeat:repeat}
`.trim();

export interface OpcionesWeb {
  /** Texto de la marca de agua de la vista previa; vacío en la publicada. */
  marca?: string;
  /** Pie de la publicada (enlace a quien la hizo). */
  pie?: string;
  /**
   * Prefijo de las fotos de galería en la publicada (…/w/<slug>/galeria/), para que el HTML no
   * lleve los bytes y las fotos carguen al bajar. Sin él (vista previa), van las data URL.
   */
  galeria?: string;
}

/** HTML de la web (solo el contenido, con ámbito en `.w`). Todo texto del cliente va escapado. */
export function renderWeb(d: DatosWeb, o: OpcionesWeb = {}): string {
  const letra = LETRAS_WEB.find((l) => l.id === d.letra) ?? LETRAS_WEB[0];
  const vars = `--w-c:${d.color};--w-s:${sobreAcento(d.color)};--w-ct-claro:${acentoSobre(d.color, FONDO_TEXTO_CLARO)};--w-ct-oscuro:${acentoSobre(d.color, FONDO_TEXTO_OSCURO)};--w-ft-titulo:${letra.titulo};--w-ft-texto:${letra.texto}`;
  // El primero es el botón principal (relleno): reservar, si hay enlace; si no, WhatsApp, llamar o correo.
  const acciones = (
    [
      d.reservas && [d.reservas, 'cita', 'Reservar cita'],
      d.whatsapp && [enlaceWhatsapp(d.whatsapp), 'wa', 'WhatsApp'],
      d.telefono && [`tel:${digitos(d.telefono)}`, 'tel', 'Llamar'],
      !d.telefono && !d.whatsapp && d.email && [`mailto:${d.email}`, 'mail', 'Escríbenos'],
    ].filter(Boolean) as [string, keyof typeof ICONO, string][]
  ).map(
    ([href, ico, txt], i) =>
      `<a class="w-boton${i ? '' : ' w-boton-lleno'}" href="${esc(href)}"${href.startsWith('http') ? ' rel="noopener"' : ''}>${icono(ico)}${txt}</a>`,
  );
  const dato = (ico: keyof typeof ICONO, titulo: string, valor: string, href?: string) =>
    href
      ? `<li><a class="w-dato" href="${esc(href)}"${href.startsWith('http') ? ' rel="noopener"' : ''}>${icono(ico)}<span><small>${esc(titulo)}</small>${conSaltos(valor)}</span></a></li>`
      : `<li><div class="w-dato">${icono(ico)}<span><small>${esc(titulo)}</small>${conSaltos(valor)}</span></div></li>`;
  const contacto = [
    d.telefono && dato('tel', 'Teléfono', d.telefono, `tel:${digitos(d.telefono)}`),
    d.whatsapp && dato('wa', 'WhatsApp', d.whatsapp, enlaceWhatsapp(d.whatsapp)),
    d.email && dato('mail', 'Correo', d.email, `mailto:${d.email}`),
    d.direccion && dato('mapa', 'Dirección', d.direccion, enlaceMapa(d.direccion)),
    d.horario && dato('reloj', 'Horario', d.horario),
    d.zonas && dato('zona', 'Zonas que atendemos', d.zonas),
    ...d.enlaces.map((e) => dato('enlace', e.etiqueta, new URL(e.url).hostname.replace(/^www\./, ''), e.url)),
  ].filter(Boolean);
  const servicios = d.servicios
    .map(
      (s) =>
        `<li class="w-servicio"><div class="w-servicio-cab"><h3>${esc(s.nombre)}</h3>${s.precio ? `<span class="w-precio">${esc(s.precio)}</span>` : ''}</div>${s.texto ? `<p>${esc(s.texto)}</p>` : ''}</li>`,
    )
    .join('');
  const opiniones = d.opiniones
    .map((x) => `<li class="w-dato w-opinion"><blockquote>${parrafosHtml(x.texto)}</blockquote>${x.autor ? `<p class="w-autor">${esc(x.autor)}</p>` : ''}</li>`)
    .join('');
  const preguntas = d.preguntas
    .map((x) => `<li><details class="w-dato w-pregunta" name="preguntas"><summary>${esc(x.pregunta)}</summary><div class="w-respuesta">${parrafosHtml(x.respuesta)}</div></details></li>`)
    .join('');
  const fotos = d.galeria
    .map(
      (f, i) =>
        `<li><img src="${esc(o.galeria ? `${o.galeria}${i}` : f)}" alt="${esc(`${d.negocio} · foto ${i + 1}`)}" loading="lazy" decoding="async"></li>`,
    )
    .join('');
  const seccion = (id: string, titulo: string, cuerpo: string) =>
    `<section class="w-sec w-${id}-sec" id="${id}"><div class="w-in"><h2>${titulo}</h2>${cuerpo}</div></section>`;
  const secciones: Record<IdSeccionWeb, string> = {
    sobre: d.sobre ? seccion('sobre', 'Quiénes somos', `<div class="w-sobre">${parrafosHtml(d.sobre)}</div>`) : '',
    servicios: servicios ? seccion('servicios', 'Servicios', `<ul class="w-servicios">${servicios}</ul>`) : '',
    galeria: fotos ? seccion('galeria', 'Fotos', `<ul class="w-galeria">${fotos}</ul>`) : '',
    opiniones: opiniones
      ? seccion('opiniones', 'Opiniones', `<ul class="w-opiniones">${opiniones}</ul>${d.opinionesUrl ? `<p class="w-mas"><a href="${esc(d.opinionesUrl)}" rel="noopener">Ver todas las opiniones</a></p>` : ''}`)
      : '',
    preguntas: preguntas ? seccion('preguntas', 'Preguntas frecuentes', `<ul class="w-preguntas">${preguntas}</ul>`) : '',
    contacto: seccion('contacto', 'Contacto', `<ul class="w-contacto">${contacto.join('')}</ul>`),
  };
  return [
    `<div class="w w-${d.plantilla}" style="${esc(vars)}"><div class="w-cuerpo">`,
    `<header class="w-cab"><div class="w-in">`,
    d.sector ? `<p class="w-sector">${esc(d.sector)}</p>` : '',
    `<h1>${esc(d.negocio)}</h1>`,
    d.lema ? `<p class="w-lema">${esc(d.lema)}</p>` : '',
    acciones.length ? `<div class="w-acciones">${acciones.join('')}</div>` : '',
    `</div></header>`,
    `<main>`,
    d.foto ? `<div class="w-portada"><div class="w-in"><img src="${esc(d.foto)}" alt="${esc(d.negocio)}" decoding="async"></div></div>` : '',
    ...ordenWeb(d.orden).map((id) => secciones[id]),
    `</main>`,
    // En pantallas estrechas los botones de contacto se quedan a mano abajo mientras se lee (sin JavaScript).
    acciones.length ? `<nav class="w-barra" aria-label="Contactar">${acciones.join('')}</nav>` : '',
    `<footer class="w-pie"><div class="w-in">© ${esc(d.negocio)}${o.pie ? ` · ${o.pie}` : ''}</div></footer></div>`,
    o.marca ? `<div class="w-marca" aria-hidden="true" style="background-image:${esc(fondoMarca(o.marca))}"></div>` : '',
    `</div>`,
  ].join('');
}

/**
 * Ficha del negocio para buscadores (schema.org LocalBusiness en JSON-LD): nombre, teléfono,
 * dirección, servicios y redes. Solo lo que el cliente rellenó. Va en un <script> de datos,
 * no ejecutable, y se escapa `<` para que ningún texto pueda cerrar la etiqueta.
 */
export function fichaNegocio(d: DatosWeb, url: string): string {
  const ficha: Record<string, unknown> = { '@context': 'https://schema.org', '@type': tipoNegocio(d.sector), name: d.negocio, url };
  const horas = horarioSchema(d.horario);
  if (horas) ficha.openingHoursSpecification = horas;
  const descripcion = (d.sobre || d.lema).replace(/\s+/g, ' ').trim();
  if (descripcion) ficha.description = descripcion.slice(0, 300);
  if (d.telefono) ficha.telephone = d.telefono;
  if (d.email) ficha.email = d.email;
  if (d.direccion) ficha.address = { '@type': 'PostalAddress', streetAddress: d.direccion };
  const zonas = d.zonas.split(/[,;\n]/).map((z) => z.trim()).filter(Boolean);
  if (zonas.length) ficha.areaServed = zonas;
  const redes = d.enlaces.map((e) => e.url).filter(Boolean);
  if (redes.length) ficha.sameAs = redes;
  const servicios = d.servicios.filter((s) => s.nombre);
  if (servicios.length) {
    ficha.makesOffer = servicios.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.nombre, ...(s.texto ? { description: s.texto } : {}) },
    }));
  }
  return JSON.stringify(ficha).replace(/</g, '\\u003c');
}

/**
 * Página publicada completa (/w/<slug> o el dominio del cliente): ligera, sin JavaScript ni
 * recursos externos. `tienda` es el origen de nuestra tienda para el enlace del pie y el icono
 * cuando la página se sirve desde otro dominio ('' = mismo origen). `imagen` es la URL absoluta
 * de la foto (/w/<slug>/foto) para la tarjeta que sale al compartir el enlace; '' si no hay foto.
 */
export function documentoWeb(d: DatosWeb, url: string, tienda = '', imagen = '', galeria = ''): string {
  const titulo = d.sector ? `${d.negocio} · ${d.sector}` : d.negocio;
  const descripcion = (d.lema || d.sobre.replace(/\s+/g, ' ') || titulo).slice(0, 160);
  const pie = `Web hecha con <a href="${esc(tienda)}/servicios/web">Automatiza sin humo</a>`;
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descripcion)}">
<link rel="canonical" href="${esc(url)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descripcion)}">
<meta property="og:url" content="${esc(url)}">
${d.foto && imagen ? `<meta property="og:image" content="${esc(imagen)}">\n<meta name="twitter:card" content="summary_large_image">\n` : ''}<meta name="theme-color" content="${esc(d.color)}">
<link rel="icon" href="${esc(tienda)}/favicon.svg">
<script type="application/ld+json">${fichaNegocio(d, url)}</script>
<style>body{margin:0}${CSS_WEB}</style>
</head>
<body>
${renderWeb(d, { pie, galeria })}
</body>
</html>
`;
}

/** Texto de la marca de agua de la vista previa del estudio. */
export const MARCA_WEB = 'VISTA PREVIA';

// ---------- Publicación (común a todas las páginas: paginas.ts) ----------

export type WebPublicada = PaginaPublicada<DatosWeb>;

export const webPorSlug = (db: D1Database, slug: string): Promise<WebPublicada | null> =>
  paginaPorSlug(db, 'web', slug, validarWeb);

export const webDePedido = (db: D1Database, pedido: string): Promise<WebPublicada | null> =>
  paginaDePedido(db, 'web', pedido, validarWeb);

/** La dirección se fija con el nombre del negocio la primera vez; republicar no la cambia. */
export const publicarWeb = (db: D1Database, pedido: string, datos: DatosWeb): Promise<string> =>
  publicarPagina(db, 'web', pedido, datos.negocio, datos);

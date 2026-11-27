/**
 * Web de una página hecha por el cliente en el estudio (/servicios/web) y publicada en
 * /w/<slug> en cuanto el pedido está pagado. Un solo modelo para las dos caras:
 *  - el estudio pinta la vista previa con `renderWeb` (con marca de agua) dentro de un Shadow DOM;
 *  - el servidor sirve la publicada con `documentoWeb` (sin marca), a partir de los datos
 *    validados por `validarWeb`, el mismo validador que se aplica al publicar y al leer.
 * Sin DOM: lo importan el navegador, la API y la página pública (D1 solo en las tres
 * funciones de publicación del final, que el navegador no usa).
 *
 * Plantillas (plantillasWeb.ts) = composición de variantes de sección + identidad visual; el
 * formulario, la validación y la publicación no cambian al añadir una.
 */
import { horarioSchema, tipoNegocio } from './negocioSchema';
import { accionesDeSector, sectorEncaja, sectorIdDe } from './sectorBase';
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

import { cssFuentes, FUENTES_WEB, ilustracionSector, type ContextoDiseno, type IconoWeb } from './creativas';
import { cssWebDe, disenoWeb, plantillaWeb, resolverPlantilla } from './plantillasWeb';
export { cssFuentes, DISENOS, FUENTES_WEB } from './creativas';
export { CSS_WEB, cssWebDe, disenoWeb, PLANTILLAS_WEB, PLANTILLAS_ANTIGUAS, resolverPlantilla, type IdPlantillaWeb } from './plantillasWeb';
import type { IdPlantillaWeb } from './plantillasWeb';
import { ACABADOS_WEB, CAPA_POR_DEFECTO, FORMAS_FOTO_WEB, MOVIMIENTOS_WEB, clasesCapa, granoCapa, resolverCapa, type IdAcabadoWeb, type IdFormaFotoWeb, type IdMovimientoWeb } from './capaVisual';
export { ACABADOS_WEB, CAPA_BASICA, FORMAS_FOTO_WEB, MOVIMIENTOS_WEB, resolverCapa } from './capaVisual';

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
  {
    // La tipografía propia de cada diseño de autor; en una básica equivale a «Moderna».
    id: 'diseno',
    nombre: 'La del diseño',
    descripcion: 'La tipografía pensada para tu diseño',
    titulo: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    texto: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
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
  { id: 'personaliza', titulo: 'Estilo' },
  { id: 'publica', titulo: 'Publica' },
] as const;

export type IdPasoWeb = (typeof PASOS_WEB)[number]['id'];

/**
 * Los mismos tres caminos que el estudio de CV (CAMINOS_CV), para que las dos páginas empiecen
 * igual: «tal cual» se salta el paso de estilo; «a tu gusto» lo enseña; «te la hacemos» lleva a
 * la consulta. Plantilla y diseño propio cuestan lo mismo: el precio lo pone la página.
 */
export type CaminoWeb = 'plantilla' | 'personaliza' | 'asesoria';
export const ASESORIA_WEB = { desde: 14900, enlace: '/empezar/consulta?tema=web' } as const;
export const CAMINOS_WEB: readonly { id: CaminoWeb; etiqueta: string; titulo: string; resumen: string }[] = [
  { id: 'plantilla', etiqueta: 'Lo más rápido', titulo: 'Usa una plantilla', resumen: 'Eliges un diseño, escribes los datos de tu negocio y la publicas tal cual.' },
  { id: 'personaliza', etiqueta: 'A tu gusto', titulo: 'Diseña tu web', resumen: 'Partes de un diseño y cambias color, letra, acabado, fotos y movimiento.' },
  { id: 'asesoria', etiqueta: 'Con una persona', titulo: 'Te la hacemos', resumen: 'Nos cuentas tu negocio y te preparamos la web. Te respondemos por email.' },
];
export const esCaminoWeb = (v: unknown): v is CaminoWeb => CAMINOS_WEB.some((c) => c.id === v);

/** Pasos que recorre cada camino, en orden. La asesoría se queda en el primero. */
export function pasosDelCamino(camino: CaminoWeb): IdPasoWeb[] {
  const todos = PASOS_WEB.map((p) => p.id);
  if (camino === 'asesoria') return [todos[0]!];
  return camino === 'plantilla' ? todos.filter((p) => p !== 'personaliza') : todos;
}

/** Paso al que lleva «Siguiente» o «Atrás» dentro del camino ('' si no hay). */
/**
 * Color y letra al elegir otra plantilla. Un diseño de autor trae los suyos; al volver de él a una
 * básica se vuelve a los de por defecto (si no, en «Usa una plantilla», que no tiene paso de estilo,
 * se publicaría el color del diseño anterior). Si el cliente ya había elegido letra, no se toca nada.
 */
export function aspectoAlElegir(
  plantilla: string,
  actual: { color: string; letra: string },
  porDefecto: { color: string; letra: string },
  anterior = '',
): { color: string; letra: string } {
  const x = disenoWeb(plantilla);
  if (x) return { color: x.color, letra: 'diseno' };
  const letra = actual.letra === 'diseno' ? porDefecto.letra : actual.letra;
  // El color que trajo el diseño anterior no es del cliente: si no lo cambió, también vuelve al de por defecto.
  // Si el anterior era una básica, el color es del cliente. Sin saber cuál era, la letra «del diseño» es la única pista.
  const previo = disenoWeb(anterior);
  const heredado = anterior ? actual.color === previo?.color : actual.letra === 'diseno';
  return { color: heredado ? porDefecto.color : actual.color, letra };
}

/** Capa y secciones que «Usa una plantilla» (tal cual) devuelve a las del diseño. */
export const CAPA_TAL_CUAL = { acabado: 'auto', formaFoto: 'auto', movimiento: 'auto', variantes: '0.0.0.0.0' } as const;

export function pasoVecino(camino: CaminoWeb, actual: string, salto: 1 | -1): IdPasoWeb | '' {
  const pasos = pasosDelCamino(camino);
  const i = pasos.indexOf(actual as IdPasoWeb);
  if (i < 0) {
    // Venía de un paso que este camino no recorre (p. ej. «Estilo» tras pasar a «tal cual»).
    const todos = PASOS_WEB.map((p) => p.id) as string[];
    const j = todos.indexOf(actual);
    const cand = salto > 0 ? pasos.find((p) => todos.indexOf(p) > j) : [...pasos].reverse().find((p) => todos.indexOf(p) < j);
    return cand ?? '';
  }
  return pasos[i + salto] ?? '';
}

/** Guía con ventanitas por paso (src/features/tour/guia.ts): `guia` es el `data-guia` del bloque. */
export const GUIA_WEB: Record<string, readonly { guia: string; titulo: string; texto: string }[]> = {
  plantilla: [
    { guia: 'caminos', titulo: 'Primero, cómo la quieres', texto: 'Una plantilla tal cual (lo más rápido), tu propio diseño con tus colores y tu letra, o que te la hagamos nosotros. Puedes cambiar de idea cuando quieras.' },
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
    { guia: 'capa', titulo: 'Acabado, foto y movimiento', texto: 'Dale relieve: textura de papel, la forma de tu foto y cuánto se mueve. «El del diseño» deja lo que pensamos para tu plantilla.' },
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

/**
 * Variantes por sección que el cliente cambia sin cambiar de plantilla («Prueba otra portada»…).
 * Se guardan en un texto compacto «portada.servicios.galería.opiniones.contacto»; 0 = la de la plantilla.
 */
export const VARIANTES_WEB = [
  { id: 'hero', boton: 'Otra portada', max: 6 },
  { id: 'servicios', boton: 'Otros servicios', max: 5 },
  { id: 'galeria', boton: 'Otras fotos', max: 4 },
  { id: 'opiniones', boton: 'Otras opiniones', max: 3 },
  { id: 'contacto', boton: 'Otro contacto', max: 4 },
] as const;
export type IdVarianteWeb = (typeof VARIANTES_WEB)[number]['id'];
/** Texto válido: cinco números en su rango (lo que no cuadra vuelve a 0). */
export function variantesWeb(v: unknown): string {
  const xs = typeof v === 'string' ? v.split('.') : [];
  return VARIANTES_WEB.map((x, i) => {
    const n = Number(xs[i]);
    return Number.isInteger(n) && n >= 0 && n <= x.max ? n : 0;
  }).join('.');
}
/** La variante que se pinta: la elegida o, con 0, la de la plantilla. */
export function varianteDe(v: string, id: IdVarianteWeb, deLaPlantilla: number): number {
  return Number(variantesWeb(v).split('.')[VARIANTES_WEB.findIndex((x) => x.id === id)]) || deLaPlantilla;
}
/** Siguiente variante al pulsar el botón; al dar la vuelta a la de la plantilla, vuelve a 0. */
export function siguienteVariante(v: string, id: IdVarianteWeb, deLaPlantilla: number): string {
  const i = VARIANTES_WEB.findIndex((x) => x.id === id);
  const max = VARIANTES_WEB[i]!.max;
  const sig = (varianteDe(v, id, deLaPlantilla) % max) + 1;
  const xs = variantesWeb(v).split('.');
  xs[i] = String(sig === deLaPlantilla ? 0 : sig);
  return xs.join('.');
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
  /** Capa visual (capaVisual.ts): «auto» deja lo del diseño. */
  acabado: IdAcabadoWeb;
  formaFoto: IdFormaFotoWeb;
  movimiento: IdMovimientoWeb;
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
  /** Citas en la propia web (/w/<slug>/reservas): duración en minutos, '' = sin citas. Usa el horario. */
  citas: IdCitasWeb;
  enlaces: EnlaceWeb[];
  /** Opiniones de clientes que el negocio copia de donde las tenga (Google, Facebook…). */
  opiniones: OpinionWeb[];
  /** Dónde leer todas sus opiniones (su ficha de Google, por ejemplo). */
  opinionesUrl: string;
  preguntas: PreguntaWeb[];
  /** Orden de las secciones (ordenWeb). */
  orden: IdSeccionWeb[];
  /** Variantes por sección elegidas por el cliente (VARIANTES_WEB). */
  variantes: string;
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
/** FNV-1a de 32 bits en hexadecimal: estable entre servidor, navegador y script. */
export function huellaFnv(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, '0');
}

/** URL versionada de una foto publicada: cambia cuando cambia la foto, así puede cachearse para siempre. */
export const urlFotoVersion = (base: string, foto: string) => `${base}?v=${huellaFnv(foto)}`;

/**
 * Caché de /w/<slug>/foto y /galeria/<n>: con la versión de la foto actual (la que enlaza la
 * publicada) es inmutable un año; sin ella o con una vieja, unos minutos.
 */
export const cacheFoto = (foto: string, v: string | null) =>
  v && v === huellaFnv(foto) ? 'public, max-age=31536000, immutable' : 'public, max-age=300';

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
  plantilla: 'salon',
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
      plantilla: resolverPlantilla(o.plantilla) ?? WEB_POR_DEFECTO.plantilla,
      color: typeof o.color === 'string' && COLOR_VALIDO.test(o.color) ? o.color.toLowerCase() : WEB_POR_DEFECTO.color,
      letra: esDe(LETRAS_WEB, o.letra) ? o.letra : WEB_POR_DEFECTO.letra,
      acabado: esDe(ACABADOS_WEB, o.acabado) ? o.acabado : 'auto',
      formaFoto: esDe(FORMAS_FOTO_WEB, o.formaFoto) ? o.formaFoto : 'auto',
      movimiento: esDe(MOVIMIENTOS_WEB, o.movimiento) ? o.movimiento : 'auto',
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
      citas: (DURACIONES_CITA as readonly unknown[]).includes(o.citas) ? (o.citas as IdCitasWeb) : '',
      enlaces,
      opiniones,
      opinionesUrl: urlSegura(o.opinionesUrl),
      preguntas,
      orden: ordenWeb(o.orden),
      variantes: variantesWeb(o.variantes),
      foto: fotoValida(o.foto) ? o.foto : '',
      galeria: galeriaValida(o.galeria),
    },
  };
}

/** Ejemplo para «Rellenar con un ejemplo» y para las miniaturas de las plantillas. */
export const EJEMPLO_WEB: DatosWeb = {
  ...WEB_POR_DEFECTO,
  ...CAPA_POR_DEFECTO,
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
  citas: '',
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
  variantes: '0.0.0.0.0',
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
// Claro: el panel claro más oscuro de las plantillas (atelier, #f3ede3); un test lo vigila.
export const FONDO_TEXTO_CLARO = '#f3ede3';
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
  /**
   * URL de la foto de portada en la publicada (…/w/<slug>/foto?v=…). Sin ella (vista previa) va la
   * data URL; con ella, el HTML no lleva cientos de KB en base64 y la foto se cachea aparte.
   */
  foto?: string;
  /**
   * Formulario de contacto de la publicada: adónde se envía (…/w/<slug>/mensaje) y el sello
   * firmado con la hora (mensajesWeb.ts). Sin él (vista previa, sin secreto) no sale.
   */
  formulario?: { accion: string; sello: string };
  /** Página de citas de la publicada (…/w/<slug>/reservas). Sin ella (vista previa) el botón va a #. */
  citas?: string;
}

/** Letras de la palabra más larga del nombre (mínimo 6): el titular nunca la parte, se encoge. */
export const palabraMasLarga = (t: string) => Math.max(6, ...t.split(/[\s\-–—/]+/).map((w) => [...w].length));

/** Zonas escritas por el cliente («Vigo, Redondela; Cangas») como lista. */
export const listaZonas = (zonas: string): string[] => zonas.split(/[,;\n]/).map((z) => z.trim()).filter(Boolean);

/** Filas del horario: «Lunes a viernes: 9:30–20:00» → [etiqueta, horas]; si no hay etiqueta, ['', línea]. */
export const filasHorario = (horario: string): [string, string][] =>
  horario
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l): [string, string] => {
      const m = /^([^:\d]+?)\s*:\s*(.+)$/.exec(l);
      return m ? [m[1]!, m[2]!] : ['', l];
    });

export const TITULOS_GENERICOS: Readonly<Record<string, string>> = {
  sobre: 'Quiénes somos',
  servicios: 'Servicios',
  galeria: 'Fotos',
  opiniones: 'Opiniones',
  preguntas: 'Preguntas frecuentes',
  contacto: 'Contacto',
  zonas: 'Dónde trabajamos',
  horario: 'Horario',
};

/** HTML de la web (solo el contenido, con ámbito en `.w`). Todo texto del cliente va escapado. */
/** Nombre del campo trampa del formulario (lo comprueba mensajesWeb.ts). */
export const CAMPO_TRAMPA = 'web_url';
/** Duración de las citas en la propia web, en minutos; '' = sin citas (citasWeb.ts). */
export const DURACIONES_CITA = ['', '15', '20', '30', '45', '60', '90'] as const;
export type IdCitasWeb = (typeof DURACIONES_CITA)[number];
/** Hay citas en la web si se eligió duración y el horario se entiende (de él salen las horas). */
export const citasActivas = (d: Pick<DatosWeb, 'citas' | 'horario'>) => Number(d.citas) > 0 && (horarioSchema(d.horario)?.length ?? 0) > 0;

/**
 * Formulario sin JavaScript: nombre, cómo responderte y el mensaje. El campo trampa queda fuera
 * de la vista y del orden de tabulación; solo lo rellenan los robots.
 */
function formularioContacto(f: OpcionesWeb['formulario']): string {
  if (!f) return '';
  return `<form class="w-form" method="post" action="${esc(f.accion)}" accept-charset="utf-8">
<p class="w-form-titulo">O escríbenos aquí y te respondemos</p>
<input type="hidden" name="sello" value="${esc(f.sello)}">
<div class="w-form-trampa" aria-hidden="true"><label>No rellenar <input type="text" name="${CAMPO_TRAMPA}" tabindex="-1" autocomplete="off"></label></div>
<label class="w-campo"><span>Nombre</span><input type="text" name="nombre" autocomplete="name" maxlength="100"></label>
<label class="w-campo"><span>Email o teléfono</span><input type="text" name="contacto" required autocomplete="email" maxlength="254"></label>
<label class="w-campo w-campo-ancho"><span>Mensaje</span><textarea name="mensaje" required minlength="5" maxlength="2000" rows="4"></textarea></label>
<button class="w-boton w-boton-lleno" type="submit">Enviar mensaje</button>
</form>`;
}

export function renderWeb(d: DatosWeb, o: OpcionesWeb = {}): string {
  const p = plantillaWeb(d.plantilla);
  const diseno = disenoWeb(p.id);
  const base = LETRAS_WEB.find((l) => l.id === d.letra) ?? LETRAS_WEB[0];
  const letra = diseno && d.letra === 'diseno' ? { titulo: diseno.titulo, texto: diseno.texto } : base;
  // En un diseño de autor el acento se ajusta a sus propios fondos (no a los genéricos).
  const claro = diseno?.fondoClaro ?? FONDO_TEXTO_CLARO;
  const oscuro = diseno?.fondoOscuro ?? FONDO_TEXTO_OSCURO;
  const vars = `--w-c:${d.color};--w-s:${sobreAcento(d.color)};--w-ct-claro:${acentoSobre(d.color, claro)};--w-ct-oscuro:${acentoSobre(d.color, oscuro)};--w-ft-titulo:${letra.titulo};--w-ft-texto:${letra.texto};--w-pl:${palabraMasLarga(d.negocio)}`;
  const capa = resolverCapa(d, diseno?.capa);
  const rel = (href: string) => (href.startsWith('http') ? ' rel="noopener"' : '');
  const tel = d.telefono ? `tel:${digitos(d.telefono)}` : '';
  // El número a la vista no se parte entre dos líneas en el móvil.
  const telTexto = d.telefono.replace(/ /g, ' ');
  // El primero es el botón principal (relleno): reservar, si hay enlace; si no, WhatsApp, llamar o correo.
  // Los textos dependen del sector: un bar reserva mesa; un fontanero pide presupuesto.
  const textos = accionesDeSector(d.sector);
  const reservar = d.reservas || (citasActivas(d) ? (o.citas ?? '#') : '');
  const listaAcciones = [
    reservar && [reservar, 'cita', textos.reserva],
    d.whatsapp && [enlaceWhatsapp(d.whatsapp), 'wa', 'WhatsApp'],
    tel && [tel, 'tel', 'Llamar'],
    !d.telefono && !d.whatsapp && d.email && [`mailto:${d.email}`, 'mail', 'Escríbenos'],
  ].filter(Boolean) as [string, 'cita' | 'wa' | 'tel' | 'mail', string][];
  if (!reservar && textos.contacto && listaAcciones[0]) listaAcciones[0] = [listaAcciones[0][0], listaAcciones[0][1], textos.contacto];
  const acciones = listaAcciones
    .map(([href, ico, txt], i) => `<a class="w-boton${i ? '' : ' w-boton-lleno'}" href="${esc(href)}"${rel(href)}>${icono(ico)}${txt}</a>`)
    .join('');
  const bloqueAcciones = acciones ? `<div class="w-acciones">${acciones}</div>` : '';

  const zonas = listaZonas(d.zonas);
  const horario = filasHorario(d.horario);
  const enOrden = (id: string) => (p.orden as readonly string[]).includes(id);
  const conExtra = {
    zonas: zonas.length > 0 && enOrden('zonas'),
    horario: horario.length > 0 && enOrden('horario'),
    franja: listaAcciones.length > 0 && enOrden('franja'),
  };

  const dato = (ico: keyof typeof ICONO, titulo: string, valor: string, href?: string) =>
    href
      ? `<li><a class="w-dato" href="${esc(href)}"${rel(href)}>${icono(ico)}<span><small>${esc(titulo)}</small>${conSaltos(valor)}</span></a></li>`
      : `<li><div class="w-dato">${icono(ico)}<span><small>${esc(titulo)}</small>${conSaltos(valor)}</span></div></li>`;
  // Horario y zonas solo van como fila si la plantilla no les da sección propia.
  const filasContacto = [
    d.telefono && dato('tel', 'Teléfono', telTexto, tel),
    d.whatsapp && dato('wa', 'WhatsApp', d.whatsapp, enlaceWhatsapp(d.whatsapp)),
    d.email && dato('mail', 'Correo', d.email, `mailto:${d.email}`),
    d.direccion && dato('mapa', 'Dirección', d.direccion, enlaceMapa(d.direccion)),
    d.horario && !conExtra.horario && dato('reloj', 'Horario', d.horario),
    d.zonas && !conExtra.zonas && dato('zona', 'Zonas que atendemos', d.zonas),
    ...d.enlaces.map((e) => dato('enlace', e.etiqueta, new URL(e.url).hostname.replace(/^www\./, ''), e.url)),
  ].filter(Boolean);
  // El dato más útil a la vista, en grande: teléfono, si no WhatsApp, si no correo.
  const grande = d.telefono
    ? `<a href="${esc(tel)}">${esc(telTexto)}</a>`
    : d.whatsapp
      ? `<a href="${esc(enlaceWhatsapp(d.whatsapp))}" rel="noopener">${esc(d.whatsapp)}</a>`
      : `<a href="${esc(`mailto:${d.email}`)}">${esc(d.email)}</a>`;

  // Las variantes se degradan cuando faltan datos: un servicio se presenta como ficha destacada,
  // una tarifa sin precios como lista compacta y una sola opinión como cita protagonista.
  const nS = d.servicios.length;
  const v = (id: IdVarianteWeb) => varianteDe(d.variantes, id, p[id]);
  const vS = nS === 1 ? 3 : v('servicios') === 2 && !d.servicios.some((s) => s.precio) ? 5 : v('servicios');
  const vO = d.opiniones.length === 1 ? 1 : v('opiniones');
  const vH = p.hero ? v('hero') : 0;
  const servicios = d.servicios
    .map(
      (s) =>
        `<li class="w-servicio"><div class="w-servicio-cab"><h3>${esc(s.nombre)}</h3>${s.precio ? `<span class="w-precio">${esc(s.precio)}</span>` : ''}</div>${s.texto ? `<p>${esc(s.texto)}</p>` : ''}</li>`,
    )
    .join('');
  const opiniones = d.opiniones
    .map((x) => `<li class="w-opinion"><blockquote>${parrafosHtml(x.texto)}</blockquote>${x.autor ? `<p class="w-autor">${esc(x.autor)}</p>` : ''}</li>`)
    .join('');
  const preguntas = d.preguntas
    .map((x) => `<li><details class="w-dato w-pregunta" name="preguntas"><summary>${esc(x.pregunta)}</summary><div class="w-respuesta">${parrafosHtml(x.respuesta)}</div></details></li>`)
    .join('');
  const fotos = d.galeria
    .map(
      (f, i) =>
        `<li><img src="${esc(o.galeria ? urlFotoVersion(`${o.galeria}${i}`, f) : f)}" alt="${esc(`${d.negocio} · foto ${i + 1}`)}" loading="lazy" decoding="async"></li>`,
    )
    .join('');
  const tabla = horario
    .map(([dia, horas]) => (dia ? `<tr><th scope="row">${esc(dia)}</th><td>${esc(horas)}</td></tr>` : `<tr><td colspan="2">${esc(horas)}</td></tr>`))
    .join('');
  const textoFranja = { cita: '¿Te reservamos cita?', wa: '¿Hablamos? Escríbenos por WhatsApp', tel: 'Llámanos y te atendemos', mail: 'Escríbenos y te respondemos' };

  const seccion = (id: string, titulo: string, cuerpo: string) =>
    `<section class="w-sec w-${id}-sec" id="${id}"><div class="w-in"><h2>${titulo}</h2>${cuerpo}</div></section>`;
  // Un diseño fuera de su sector no enseña tijeras a un dentista ni «La carta» a un taller.
  const ajeno = !!diseno && !sectorEncaja(d.sector, diseno.sectores, diseno.palabras);
  const titulo = (id: string) => esc((ajeno ? undefined : diseno?.titulos?.[id]) ?? TITULOS_GENERICOS[id] ?? id);
  const bloques: Record<string, string> = {
    sobre: d.sobre ? seccion('sobre', titulo('sobre'), `<div class="w-sobre">${parrafosHtml(d.sobre)}</div>`) : '',
    servicios: nS ? seccion('servicios', titulo('servicios'), `<ul class="w-servicios w-s-${vS}" data-n="${nS}">${servicios}</ul>`) : '',
    galeria: fotos ? seccion('galeria', titulo('galeria'), `<ul class="w-galeria w-g-${v('galeria')}" data-n="${d.galeria.length}">${fotos}</ul>`) : '',
    opiniones: opiniones
      ? seccion(
          'opiniones',
          titulo('opiniones'),
          `<ul class="w-opiniones w-o-${vO}" data-n="${d.opiniones.length}">${opiniones}</ul>${d.opinionesUrl ? `<p class="w-mas"><a href="${esc(d.opinionesUrl)}" rel="noopener">Ver todas las opiniones</a></p>` : ''}`,
        )
      : '',
    preguntas: preguntas ? seccion('preguntas', titulo('preguntas'), `<ul class="w-preguntas">${preguntas}</ul>`) : '',
    contacto: seccion(
      'contacto',
      titulo('contacto'),
      `<div class="w-contacto-bloque w-c-${v('contacto')}"><div class="w-contacto-cta"><p class="w-contacto-grande">${grande}</p>${bloqueAcciones}</div><ul class="w-contacto">${filasContacto.join('')}</ul></div>${formularioContacto(o.formulario)}`,
    ),
    zonas: conExtra.zonas ? seccion('zonas', titulo('zonas'), `<ul class="w-zonas">${zonas.map((z) => `<li>${esc(z)}</li>`).join('')}</ul>`) : '',
    horario: conExtra.horario ? seccion('horario', titulo('horario'), `<table class="w-horario"><tbody>${tabla}</tbody></table>`) : '',
    franja: conExtra.franja
      ? `<aside class="w-franja" aria-label="Contactar"><div class="w-in"><p>${textoFranja[listaAcciones[0]![1]]}</p>${bloqueAcciones}</div></aside>`
      : '',
  };

  // Orden: la plantilla coloca los extras; las secciones del cliente ocupan sus huecos en el orden
  // que él eligió. Si nunca lo tocó (orden por defecto), manda el de la plantilla.
  const elegido = ordenWeb(d.orden);
  const propio = elegido.join() !== ORDEN_POR_DEFECTO.join();
  const cola: string[] = [...elegido];
  const orden = p.orden.map((id) => (propio && (ORDEN_POR_DEFECTO as string[]).includes(id) ? cola.shift()! : id));

  const conFoto = Boolean(d.foto);
  const srcFoto = o.foto || d.foto;
  const imgFoto = conFoto ? `<img src="${esc(srcFoto)}" alt="${esc(d.negocio)}" decoding="async" fetchpriority="high">` : '';
  if (diseno) {
    const ctx: ContextoDiseno = {
      d,
      esc,
      icono: (k: IconoWeb) => icono(k),
      acciones,
      bloqueAcciones,
      principal: listaAcciones[0],
      tel,
      telTexto,
      grande,
      zonas,
      horario,
      foto: imgFoto,
      ajeno,
      ilustracion: (propia) => (ajeno ? ilustracionSector(sectorIdDe(d.sector), [...d.negocio.trim()][0]?.toUpperCase() ?? '', esc) : propia),
      titulo: (id) => (ajeno ? undefined : diseno.titulos?.[id]) ?? TITULOS_GENERICOS[id] ?? id,
      seccion: (id, t, cuerpo) => seccion(id, esc(t), cuerpo),
    };
    Object.assign(bloques, diseno.bloques?.(ctx) ?? {});
    // Barra superior: marca, hasta cuatro anclas a las secciones que existen y la acción principal.
    const presentes = orden.filter((id) => bloques[id] && id !== 'franja').slice(0, 4);
    const enlaces = presentes.map((id) => `<li><a href="#${id}">${esc(ctx.titulo(id))}</a></li>`).join('');
    const pri = listaAcciones[0];
    const nav = `<nav class="w-nav" aria-label="Secciones"><div class="w-in w-nav-in"><a class="w-nav-marca" href="#inicio">${esc(d.negocio)}</a>${enlaces ? `<ul>${enlaces}</ul>` : ''}${pri ? `<a class="w-boton w-boton-lleno" href="${esc(pri[0])}"${rel(pri[0])}>${icono(pri[1])}${pri[2]}</a>` : ''}</div></nav>`;
    return [
      `<div lang="es" class="w w-d w-d-${diseno.id}${clasesCapa(capa)}" style="${esc(vars)}" id="inicio"><div class="w-cuerpo">`,
      nav,
      diseno.cabecera(ctx),
      diseno.tras?.(ctx) ?? '',
      `<main>`,
      ...orden.map((id) => bloques[id] ?? ''),
      `</main>`,
      acciones ? `<nav class="w-barra" aria-label="Contactar">${acciones}</nav>` : '',
      `<footer class="w-pie"><div class="w-in">© ${esc(d.negocio)}${o.pie ? ` · ${o.pie}` : ''}</div></footer></div>`,
      granoCapa(capa),
    o.marca ? `<div class="w-marca" aria-hidden="true" style="background-image:${esc(fondoMarca(o.marca))}"></div>` : '',
      `</div>`,
    ].join('');
  }
  const primera = horario[0];
  const datoCab =
    vH === 4 && zonas.length
      ? `${icono('zona')}${esc(zonas.join(' · '))}`
      : primera
        ? `${icono('reloj')}${esc(primera[0] ? `${primera[0]}: ${primera[1]}` : primera[1])}`
        : '';
  return [
    `<div lang="es" class="w w-t-${p.id}${clasesCapa(capa)}" style="${esc(vars)}"><div class="w-cuerpo">`,
    `<header class="w-cab w-h-${vH}${conFoto ? '' : ' w-sin-foto'}"><div class="w-in w-cab-in"><div class="w-cab-txt">`,
    d.sector ? `<p class="w-sector">${esc(d.sector)}</p>` : '',
    `<h1>${esc(d.negocio)}</h1>`,
    d.lema ? `<p class="w-lema">${esc(d.lema)}</p>` : '',
    bloqueAcciones,
    datoCab ? `<p class="w-cab-dato">${datoCab}</p>` : '',
    `</div>`,
    conFoto ? `<figure class="w-cab-foto"><img src="${esc(srcFoto)}" alt="${esc(d.negocio)}" decoding="async" fetchpriority="high"></figure>` : '',
    `</div></header>`,
    `<main>`,
    ...orden.map((id) => bloques[id] ?? ''),
    `</main>`,
    // En pantallas estrechas los botones de contacto se quedan a mano abajo mientras se lee (sin JavaScript).
    acciones ? `<nav class="w-barra" aria-label="Contactar">${acciones}</nav>` : '',
    `<footer class="w-pie"><div class="w-in">© ${esc(d.negocio)}${o.pie ? ` · ${o.pie}` : ''}</div></footer></div>`,
    granoCapa(capa),
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
  const zonas = listaZonas(d.zonas);
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
export function documentoWeb(d: DatosWeb, url: string, tienda = '', imagen = '', galeria = '', formulario?: OpcionesWeb['formulario'], citas?: string): string {
  // «Nombre · Actividad en Zona»: la zona principal en el título ayuda a salir en búsquedas locales.
  const zona = listaZonas(d.zonas)[0];
  const titulo = (d.sector ? `${d.negocio} · ${d.sector}` : d.negocio) + (zona && d.sector ? ` en ${zona}` : '');
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
<meta property="og:locale" content="es_ES">
<meta property="og:site_name" content="${esc(d.negocio)}">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descripcion)}">
<meta property="og:url" content="${esc(url)}">
${d.foto && imagen ? `<meta property="og:image" content="${esc(imagen)}">\n<meta name="twitter:card" content="summary_large_image">\n` : ''}<meta name="theme-color" content="${esc(d.color)}">
<link rel="icon" href="${esc(tienda)}/favicon.svg">
<script type="application/ld+json">${fichaNegocio(d, url)}</script>
${fuentesDoc(d, tienda)}<style>body{margin:0}${cssWebDe(plantillaWeb(d.plantilla).id)}</style>
</head>
<body>
${renderWeb(d, { pie, galeria, formulario, citas, foto: d.foto && imagen ? urlFotoVersion(imagen, d.foto) : '' })}
</body>
</html>
`;
}

/** `@font-face` (y precarga del titular) del diseño de autor elegido; '' en las básicas o con otra letra. */
function fuentesDoc(d: DatosWeb, tienda: string): string {
  const x = disenoWeb(plantillaWeb(d.plantilla).id);
  if (!x || d.letra !== 'diseno') return '';
  const pre = `${tienda}/fonts/web/`;
  const primera = FUENTES_WEB[x.fuentes[0] ?? '']?.archivo;
  const precarga = primera ? `<link rel="preload" href="${esc(pre + primera)}" as="font" type="font/woff2" crossorigin>\n` : '';
  return `${precarga}<style>${cssFuentes(pre, x.fuentes)}</style>\n`;
}

/** Texto de la marca de agua de la vista previa del estudio. */
export const MARCA_WEB = 'VISTA PREVIA';

/**
 * Borrador compartido (/vista/<id>): misma web con marca de agua, sin indexar y con una barra que
 * invita a hacer la propia. Sin JavaScript.
 */
export function documentoVista(d: DatosWeb): string {
  const barra = `<a href="/servicios/web" style="position:fixed;inset:auto 12px 12px auto;z-index:99;background:#111;color:#fff;font:600 15px/1 system-ui,sans-serif;padding:14px 18px;border-radius:999px;text-decoration:none;box-shadow:0 6px 20px #0004">Hacer la mía</a>`;
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${esc(d.negocio)} · borrador</title>
<link rel="icon" href="/favicon.svg">
${fuentesDoc(d, '')}<style>body{margin:0;padding-bottom:76px}${cssWebDe(plantillaWeb(d.plantilla).id)}</style>
</head>
<body>
${renderWeb(d, { marca: MARCA_WEB })}
${barra}
</body>
</html>
`;
}

// ---------- Publicación (común a todas las páginas: paginas.ts) ----------

export type WebPublicada = PaginaPublicada<DatosWeb>;

export const webPorSlug = (db: D1Database, slug: string): Promise<WebPublicada | null> =>
  paginaPorSlug(db, 'web', slug, validarWeb);

export const webDePedido = (db: D1Database, pedido: string): Promise<WebPublicada | null> =>
  paginaDePedido(db, 'web', pedido, validarWeb);

/** La dirección se fija con el nombre del negocio la primera vez; republicar no la cambia. */
export const publicarWeb = (db: D1Database, pedido: string, datos: DatosWeb): Promise<string> =>
  publicarPagina(db, 'web', pedido, datos.negocio, datos);

// Miniaturas de los diseños de web en el paso 1 de /servicios/web.
//
// Antes se pintaban las 28 webs enteras en el navegador al abrir la página: 28 renderizados,
// 17 tipografías (~550 KB) y varios segundos en móvil hasta que se veían bien. Ahora cada
// miniatura es una imagen WebP pregenerada (public/images/webs/mini/<id>.webp, ~15 KB, carga
// diferida). Cada imagen guarda la huella del HTML y el CSS con que se hizo: si el diseño cambia
// y nadie la regenera, la huella no casa y esa miniatura vuelve a pintarse en vivo (nunca se
// enseña una imagen caducada). Regenerar: `node scripts/miniaturas-web.mjs` (ver su cabecera).
import manifiesto from './miniaturas-web.json';
import { cssWebDe, disenoWeb, EJEMPLO_WEB, huellaFnv as fnv, renderWeb, type DatosWeb } from './webs';

/** Carpeta pública de las imágenes. */
export const CARPETA_MINIATURAS = '/images/webs/mini/';

/**
 * La web a escala dentro de la tarjeta. La barra fija de WhatsApp/Llamar (sticky al borde de
 * la ventana) caía en cualquier punto de la miniatura y tapaba la portada: fuera.
 */
export const CSS_MINI = '.mini{width:250%;transform:scale(.4);transform-origin:0 0}.mini .w-barra{display:none}';

/**
 * Lo que la muestra de un diseño de autor con negocio propio no define sale de aquí, no del ejemplo
 * general (una peluquería): si no, la miniatura de un taller o de una panadería contaba «cuidando el
 * pelo» y opiniones de recogidos de boda. Textos que valen para cualquier negocio.
 */
export const MUESTRA_NEUTRA: Readonly<Partial<DatosWeb>> = {
  sobre:
    'Somos un negocio de barrio con muchos años de oficio. Te atendemos sin prisas, con precios claros y cumpliendo lo que decimos.\n\nEscríbenos por WhatsApp y te contestamos el mismo día.',
  opiniones: [
    { texto: 'Trato cercano y trabajo impecable. Se nota que les gusta lo que hacen.', autor: 'Lucía M.' },
    { texto: 'Me contestaron el mismo día y todo salió como habíamos quedado. Repetiré.', autor: 'Javier R.' },
  ],
  preguntas: [
    { pregunta: '¿Hace falta avisar antes?', respuesta: 'Te recomendamos escribirnos por WhatsApp: así te damos hora y no esperas.' },
    { pregunta: '¿Cómo puedo pagar?', respuesta: 'Con tarjeta, Bizum o en efectivo.' },
  ],
  direccion: 'Calle Mayor 1',
};

/** hola@<negocio sin tildes, espacios ni signos>.es */
export const correoMuestra = (negocio: string): string =>
  `hola@${negocio.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '') || 'tunegocio'}.es`;

/**
 * Datos con que se enseña cada diseño: los de autor, con su negocio de muestra, su color y su letra.
 * Si la muestra trae otro negocio, lo que no define sale de MUESTRA_NEUTRA y el correo, de su nombre.
 */
export function datosMiniatura(id: DatosWeb['plantilla'], ejemplo: DatosWeb = EJEMPLO_WEB): DatosWeb {
  const x = disenoWeb(id);
  if (!x) return { ...ejemplo, plantilla: id };
  const propio = x.muestra.negocio ? { ...MUESTRA_NEUTRA, email: correoMuestra(x.muestra.negocio) } : {};
  return { ...ejemplo, ...propio, ...x.muestra, plantilla: id, color: x.color, letra: 'diseno' };
}

const huellas = new Map<string, string>();
/**
 * Lo que se ve en la miniatura: el CSS que pinta ese diseño (básicas, común y solo el suyo, no el de
 * los demás: dar de alta o retocar otro diseño no caduca esta imagen), la escala y su HTML.
 */
export const materialHuella = (id: DatosWeb['plantilla']): string => `${cssWebDe(id)}\n${CSS_MINI}\n${renderWeb(datosMiniatura(id))}`;

/** Huella de `materialHuella`, calculada una vez por diseño. */
export function huellaMiniatura(id: DatosWeb['plantilla']): string {
  let h = huellas.get(id);
  if (!h) {
    h = fnv(materialHuella(id));
    huellas.set(id, h);
  }
  return h;
}

const guardadas: Readonly<Record<string, string>> = manifiesto;
/** URL de la imagen si está al día con el diseño; '' si hay que pintarla en vivo. */
export function miniaturaWeb(id: DatosWeb['plantilla']): string {
  const h = huellaMiniatura(id);
  return guardadas[id] === h ? `${CARPETA_MINIATURAS}${id}.webp?v=${h}` : '';
}

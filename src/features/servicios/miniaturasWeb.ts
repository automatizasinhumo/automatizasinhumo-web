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

/** Datos con que se enseña cada diseño: los de autor, con su negocio de muestra, su color y su letra. */
export function datosMiniatura(id: DatosWeb['plantilla'], ejemplo: DatosWeb = EJEMPLO_WEB): DatosWeb {
  const x = disenoWeb(id);
  return x ? { ...ejemplo, ...x.muestra, plantilla: id, color: x.color, letra: 'diseno' } : { ...ejemplo, plantilla: id };
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

/**
 * «Quiero este diseño»: la ficha enlaza a /empezar/<slug>?diseno=<plantilla> y la fábrica
 * prepara la vista previa con ESA plantilla (antes cogía siempre la primera del servicio).
 * Solo vale una plantilla de diseño que el propio servicio muestra como demo: un ?diseno=
 * inventado se ignora.
 */

import demosPorProducto from '../../data/demos-producto.json';

/** Clave en `campos` (la lee manual/fabrica/vistas-previas.py; no cambiarla sin tocar ambos). */
export const CAMPO_DISENO = 'Diseño elegido';

export type Diseno = { plantilla: string; titulo: string };

/** Ruta de la plantilla dentro del Worker de demos (`plantillas-negocio/.../spa-salon`). */
export function plantillaDeUrl(url: string): string | null {
  try {
    const ruta = new URL(url).pathname.replace(/^\/+|\/+$/g, '');
    return /^plantillas-[a-z0-9-]+(\/[a-z0-9._-]+){0,4}$/.test(ruta)
      ? ruta
      : null;
  } catch {
    return null;
  }
}

/** Diseños elegibles de un servicio (demos de tipo diseño con plantilla concreta). */
export function disenosDe(slug: string): Diseno[] {
  const tabla = demosPorProducto as Record<
    string,
    { url: string; titulo: string; tipo: string }[]
  >;
  // hasOwn: un slug como «constructor» no debe leer Object.prototype.
  const entrada = Object.hasOwn(tabla, slug) ? tabla[slug] : null;
  const demos = Array.isArray(entrada) ? entrada : [];
  const out: Diseno[] = [];
  for (const d of demos) {
    const plantilla = d.tipo === 'diseno' ? plantillaDeUrl(d.url) : null;
    // Con una sola carpeta («plantillas-eventos») es la galería, no un diseño.
    if (plantilla?.includes('/') && !out.some((x) => x.plantilla === plantilla))
      out.push({ plantilla, titulo: d.titulo });
  }
  return out;
}

/** El diseño pedido si el servicio lo ofrece; si no, null (la fábrica elige). */
export function disenoElegido(slug: string, valor: unknown): Diseno | null {
  const v = typeof valor === 'string' ? valor.trim().slice(0, 200) : '';
  return v ? (disenosDe(slug).find((d) => d.plantilla === v) ?? null) : null;
}

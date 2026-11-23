/**
 * Muestras de web ya rellenas para un sector: las tres plantillas recomendadas con los textos,
 * servicios y orden de ese negocio. Las usan las páginas de sector (/webs/<sector>) para enseñar
 * cómo quedaría la web antes de abrir el estudio. Sin DOM ni D1.
 */
import { disenoWeb } from './creativas';
import { disenosRecomendados, SECTOR_GENERICO, textosDeSector } from './sectores';
import { cssFuentes, cssWebDe, EJEMPLO_WEB, PLANTILLAS_WEB, renderWeb, validarWeb, type DatosWeb } from './webs';

export interface MuestraSector {
  id: string;
  nombre: string;
  datos: DatosWeb;
  html: string;
  /** Enlace al estudio con el sector y el diseño ya elegidos. */
  enlace: string;
}

export function muestrasDeSector(texto: string): MuestraSector[] {
  const { sector, ids } = disenosRecomendados(texto);
  const s = sector ?? SECTOR_GENERICO;
  const negocio = s.ejemplo ?? EJEMPLO_WEB.negocio;
  const t = textosDeSector(s.nombre, negocio);
  return ids.flatMap((id) => {
    const x = disenoWeb(id);
    const r = validarWeb({
      ...EJEMPLO_WEB,
      ...(x ? { color: x.color, letra: 'diseno' } : {}),
      plantilla: id,
      negocio,
      sector: s.nombre,
      lema: t.lema,
      sobre: t.sobre,
      servicios: t.servicios,
      orden: t.orden,
      preguntas: [],
      // Las opiniones de ejemplo son de peluquería: en otros sectores quedarían falsas.
      opiniones: s.id === 'peluqueria' ? EJEMPLO_WEB.opiniones : [],
    });
    if (!r.ok) return [];
    const nombre = PLANTILLAS_WEB.find((p) => p.id === id)?.nombre ?? id;
    const enlace = `/servicios/web?sector=${encodeURIComponent(s.nombre)}&diseno=${encodeURIComponent(id)}`;
    return [{ id, nombre, datos: r.datos, html: renderWeb(r.datos), enlace }];
  });
}

/** Fuentes de las muestras: van en el documento (las @font-face no funcionan dentro de la sombra). */
export const fuentesMuestras = (ms: MuestraSector[]) => cssFuentes('/fonts/web/', [...new Set(ms.flatMap((m) => disenoWeb(m.id)?.fuentes ?? []))]);

/**
 * Miniatura con Shadow DOM declarativo: el CSS de la plantilla queda aislado del de la tienda y no
 * hace falta iframe (el middleware prohíbe enmarcar). Se pinta a escritorio y se reduce al 30 %.
 */
export const miniaturaMuestra = (m: MuestraSector) =>
  `<template shadowrootmode="open"><style>:host{display:block;overflow:hidden;aspect-ratio:4/5}.mini{width:333.34%;transform:scale(.3);transform-origin:0 0;pointer-events:none}${cssWebDe(m.id)}</style><div class="mini">${m.html}</div></template>`;

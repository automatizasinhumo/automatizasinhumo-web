/**
 * Páginas «Currículum de <puesto>» (/curriculum/<slug>): una por búsqueda frecuente en España.
 * Cada una trae contenido propio (consejos, perfil de ejemplo, habilidades y preguntas) y tres
 * diseños que leen bien los ATS, enlazados al estudio con el diseño ya elegido.
 */
import puestos from '../../data/puestos-cv.json' with { type: 'json' };
import { DISENOS_ATS, DISENOS_CV } from './cv';
import type { PreguntaSector } from './faqSector';

export interface PuestoCv {
  slug: string;
  /** Nombre corto para enlaces y migas: «Camarero». */
  nombre: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  consejos: readonly string[];
  /** Perfil profesional de ejemplo (3-4 líneas), listo para adaptar. */
  perfil: string;
  habilidades: readonly string[];
  /** Tres ids de DISENOS_CV, todos legibles por ATS (el test lo comprueba). */
  disenos: readonly string[];
  preguntas: readonly PreguntaSector[];
}

/** El contenido vive en src/data/puestos-cv.json (como los sectores de webs): aquí solo su forma y la lógica. */
export const PUESTOS_CV: readonly PuestoCv[] = puestos;

const POR_SLUG = new Map(PUESTOS_CV.map((p) => [p.slug, p]));
export const puestoCv = (slug: string | undefined) => (slug ? POR_SLUG.get(slug) : undefined);

/** Enlace al estudio con el diseño ya elegido (el estudio lo lee de ?diseno= y lo limpia). */
export const enlaceEstudioCv = (diseno: string) => `/servicios/cv?diseno=${encodeURIComponent(diseno)}`;

/** Diseños de la página, con su nombre (los ids están comprobados en el test). */
export const disenosDePuesto = (p: PuestoCv) =>
  p.disenos.map((id) => DISENOS_CV.find((d) => d.id === id)).filter((d) => !!d && DISENOS_ATS.has(d.id));

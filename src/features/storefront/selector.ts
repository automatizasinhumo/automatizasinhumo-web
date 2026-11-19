import selectorData from '../../data/selector-servicios.json';
import demosPorProducto from '../../data/demos-producto.json';
import { getSector, type SectorPage } from '../blog/sectors';

type ServiceSlug = keyof typeof demosPorProducto;

export interface Objetivo {
  id: string;
  label: string;
  detalle: string;
  servicios: readonly ServiceSlug[];
}

export interface Modalidad {
  id: 'pro' | 'guia';
  label: string;
  detalle: string;
}

export const OBJETIVOS = selectorData.objetivos as readonly Objetivo[];
export const MODALIDADES = selectorData.modalidades as readonly Modalidad[];

export interface Recomendacion {
  objetivo: Objetivo | undefined;
  sector: SectorPage | undefined;
  modalidad: Modalidad | undefined;
  /** Servicios en orden de preferencia; la página enseña los dos primeros activos. */
  servicios: ServiceSlug[];
}

/**
 * «Dime qué necesitas»: de las respuestas (parámetros GET) a uno o dos servicios.
 * Con objetivo y oficio, primero los servicios del objetivo que el oficio ya usa.
 * Respuestas desconocidas se ignoran; sin objetivo ni oficio no hay recomendación.
 */
export function recomendar(params: URLSearchParams): Recomendacion | null {
  const objetivo = OBJETIVOS.find((o) => o.id === params.get('objetivo'));
  const sector = getSector(params.get('oficio') ?? undefined);
  const modalidad = MODALIDADES.find((m) => m.id === params.get('modalidad'));
  if (!objetivo && !sector) return null;

  let servicios: ServiceSlug[];
  if (objetivo) {
    const delOficio = sector ? objetivo.servicios.filter((s) => sector.serviceSlugs.includes(s)) : [];
    servicios = [...delOficio, ...objetivo.servicios.filter((s) => !delOficio.includes(s))];
  } else {
    servicios = [...(sector as SectorPage).serviceSlugs];
  }
  return { objetivo, sector, modalidad, servicios };
}

/** Enlace a «Empieza gratis» con la modalidad marcada si la eligió «listo». */
export function empezarHref(slug: string, modalidad: Modalidad | undefined): string {
  return modalidad?.id === 'pro' ? `/empezar/${slug}?modalidad=pro` : `/empezar/${slug}`;
}

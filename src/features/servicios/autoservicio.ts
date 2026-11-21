/**
 * Servicios de autoservicio: el cliente lo hace solo en un estudio y lo recibe al momento,
 * sin formulario de datos ni espera. La fuente es autoservicio.json (precio e ids públicos),
 * compartida con el seed del catálogo; aquí solo se le da tipo y se exponen ayudas.
 */
import datos from './autoservicio.json';

export interface VarianteAuto {
  sku: string;
  id: string;
  etiqueta: string;
  precio: number;
}
export interface ServicioAuto {
  producto: string;
  nombre: string;
  /** Página donde el cliente lo prepara y, con el pedido pagado, lo descarga o publica. */
  estudio: string;
  precio?: number;
  variantes?: Record<string, VarianteAuto>;
}

const { $comentario: _, ...servicios } = datos as unknown as Record<string, ServicioAuto> & { $comentario: string };
export const AUTOSERVICIO: Readonly<Record<string, ServicioAuto>> = servicios;

export const SLUG_CV = 'cv-profesional';
export const SLUG_TARJETA = 'tarjeta-digital';

export const esAutoservicio = (slug: string): boolean => Object.hasOwn(AUTOSERVICIO, slug);

/** Enlace del pedido pagado al estudio: el token viaja en el hash, que no llega a servidores ni referrers. */
export function enlaceAutoservicio(slug: string, token: string): string | null {
  const s = AUTOSERVICIO[slug];
  return s ? `${s.estudio}#pedido=${encodeURIComponent(token)}` : null;
}

/** sku pagado → clave de la variante en autoservicio.json («disenada», «personalizable»…). */
export function varianteDeSku(slug: string, sku: string | null | undefined): string | null {
  const vs = AUTOSERVICIO[slug]?.variantes;
  if (!vs || !sku) return null;
  return Object.entries(vs).find(([, v]) => v.sku === sku)?.[0] ?? null;
}

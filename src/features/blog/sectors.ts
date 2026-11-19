import type { D1Database } from '@cloudflare/workers-types';
import demosPorProducto from '../../data/demos-producto.json';
import sectoresData from '../../data/sectores.json';
import { getProductBySlug } from '../products/db';
import { listVariants } from '../products/variants';
import { formatMoney } from '../../money';

type ServiceSlug = keyof typeof demosPorProducto;

export interface SectorPage {
  slug: string;
  /** Nombre corto del oficio para menús y enlaces («Peluquerías»). */
  label: string;
  title: string;
  description: string;
  heading: string;
  introduction: string;
  considerations: readonly string[];
  serviceSlugs: readonly ServiceSlug[];
  /** Fragmentos de URL de las demos del oficio («plumber-home-services»): salen primero. */
  demoHints?: readonly string[];
}

export const SECTORS = sectoresData as readonly SectorPage[];

export interface SectorDemo {
  url: string;
  titulo: string;
  tipo: string;
}

export interface SectorService {
  slug: ServiceSlug;
  publicId: string | null;
  name: string;
  formattedPrice: string;
  demos: SectorDemo[];
}

export function getSector(slug: string | undefined): SectorPage | undefined {
  return SECTORS.find((sector) => sector.slug === slug);
}

const TODAS_LAS_DEMOS: SectorDemo[] = Object.values(demosPorProducto).flat();

/**
 * Hasta tres demos del servicio, con las del oficio delante: primero las interactivas
 * (se pueden probar), luego las suyas que encajan con el sector, luego una
 * plantilla del oficio aunque esté catalogada en otro servicio (la misma plantilla
 * sirve para cualquier web) y, por último, el resto de las suyas.
 */
export function demosForService(slug: ServiceSlug, hints: readonly string[] = []): SectorDemo[] {
  const demos = demosPorProducto[slug];
  if (!demos || demos.length === 0) {
    throw new Error(`Faltan demos publicadas para el servicio «${slug}».`);
  }
  const delOficio = (demo: SectorDemo) => hints.some((hint) => demo.url.includes(hint));
  const ordenadas = [
    ...demos.filter((demo) => demo.tipo === 'interactiva'),
    ...demos.filter(delOficio),
    ...TODAS_LAS_DEMOS.filter(delOficio),
    ...demos,
  ];
  return ordenadas.filter((demo, i) => ordenadas.findIndex((d) => d.url === demo.url) === i).slice(0, 3);
}

export async function servicesForSector(
  db: D1Database,
  sector: SectorPage,
  currency: string,
): Promise<SectorService[]> {
  const services = await Promise.all(
    sector.serviceSlugs.map(async (slug) => {
      const product = await getProductBySlug(db, slug);
      if (!product || !product.active) {
        return null;
      }

      // Mismo «Desde» que la ficha: con variantes, el precio mínimo de las activas.
      const variants = await listVariants(db, product.id);
      const fromCents = variants.length > 0 ? Math.min(...variants.map((v) => v.price_cents)) : product.price_cents;
      const demos = demosForService(slug, sector.demoHints);
      return {
        slug,
        publicId: product.public_id,
        name: product.name,
        formattedPrice: formatMoney(fromCents, currency),
        demos,
      };
    }),
  );
  return services.filter((service): service is SectorService => service !== null);
}

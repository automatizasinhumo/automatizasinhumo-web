import type { D1Database } from '@cloudflare/workers-types';
import demosPorProducto from '../../data/demos-producto.json';
import sectoresData from '../../data/sectores.json';
import { getProductBySlug } from '../products/db';
import { formatMoney } from '../../money';

type ServiceSlug = keyof typeof demosPorProducto;

export interface SectorPage {
  slug: string;
  title: string;
  description: string;
  heading: string;
  introduction: string;
  considerations: readonly string[];
  serviceSlugs: readonly ServiceSlug[];
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

export function demosForService(slug: ServiceSlug): SectorDemo[] {
  const demos = demosPorProducto[slug];
  if (!demos || demos.length === 0) {
    throw new Error(`Faltan demos publicadas para el servicio «${slug}».`);
  }
  return demos.slice(0, 3);
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

      const demos = demosForService(slug);
      return {
        slug,
        publicId: product.public_id,
        name: product.name,
        formattedPrice: formatMoney(product.price_cents, currency),
        demos,
      };
    }),
  );
  return services.filter((service): service is SectorService => service !== null);
}

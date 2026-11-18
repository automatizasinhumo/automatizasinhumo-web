import { describe, expect, it } from 'vitest';
import type { D1Database } from '@cloudflare/workers-types';
import type { Product } from '../products/db';
import demosPorProducto from '../../data/demos-producto.json';
import sectoresData from '../../data/sectores.json';
import { demosForService, SECTORS, servicesForSector, type SectorPage } from './sectors';

function fakeDb(
  findProduct: (slug: string) => Promise<Product | null>,
  variantPrices: number[] = [],
): D1Database {
  return {
    prepare: () => ({
      bind: (slug: string) => ({
        first: () => findProduct(slug),
        all: async () => ({ results: variantPrices.map((price_cents) => ({ price_cents })) }),
      }),
    }),
  } as unknown as D1Database;
}

function product(slug: string, active: number): Product {
  return {
    id: 1,
    public_id: `prod_${slug}`,
    name: slug,
    slug,
    description: null,
    price_cents: 14900,
    currency: 'EUR',
    image_key: null,
    stock: 10,
    active,
    variant_label: null,
    weight_grams: null,
    requires_shipping: 0,
    file_key: null,
    file_name: null,
    file_mime: null,
    file_size_bytes: null,
    related_ids: null,
    created_at: '2026-01-01 00:00:00',
  };
}

const sectorWithTwoServices: SectorPage = {
  slug: 'test',
  title: 'Sector de prueba',
  description: 'Descripción de prueba',
  heading: 'Sector de prueba',
  introduction: 'Introducción de prueba',
  considerations: [],
  serviceSlugs: ['web-una-pagina', 'reservas-salon'],
};

describe('sector pages', () => {
  it('validates unique JSON slugs and service references', () => {
    const slugs = sectoresData.map((sector) => sector.slug);
    const serviceSlugs = new Set(Object.keys(demosPorProducto));

    expect(new Set(slugs).size).toBe(slugs.length);
    for (const sector of sectoresData) {
      for (const slug of sector.serviceSlugs) {
        expect(serviceSlugs.has(slug)).toBe(true);
      }
    }
  });

  it('have unique titles and descriptions for all requested sectors', () => {
    expect(SECTORS).toHaveLength(5);
    expect(new Set(SECTORS.map((sector) => sector.title)).size).toBe(5);
    expect(new Set(SECTORS.map((sector) => sector.description)).size).toBe(5);
    expect(new Set(SECTORS.map((sector) => sector.description.slice(0, 160))).size).toBe(5);
  });

  it('links every sector to published service slugs and real demos', () => {
    for (const sector of SECTORS) {
      expect(sector.serviceSlugs.length).toBeGreaterThan(0);
      for (const slug of sector.serviceSlugs) {
        const demos = demosForService(slug);
        expect(demos.length).toBeGreaterThan(0);
        expect(demos[0].url).toMatch(/^https:\/\//);
      }
    }
  });

  it('keeps active services and omits inactive products', async () => {
    const active = product('web-una-pagina', 1);
    const inactive = product('reservas-salon', 0);
    const services = await servicesForSector(
      fakeDb(async (slug) => (slug === active.slug ? active : inactive)),
      sectorWithTwoServices,
      'EUR',
    );

    expect(services.map((service) => service.slug)).toEqual(['web-una-pagina']);
    expect(services[0].name).toBe('web-una-pagina');
  });

  it('shows the same starting price as the product page when there are variants', async () => {
    const active = product('web-una-pagina', 1);
    const services = await servicesForSector(
      fakeDb(async (slug) => (slug === active.slug ? active : null), [24900, 39900]),
      sectorWithTwoServices,
      'EUR',
    );
    expect(services[0].formattedPrice).toMatch(/249/);
    expect(services[0].formattedPrice).not.toMatch(/149/);
  });

  it('propagates database failures', async () => {
    const databaseError = new Error('Error de D1');

    await expect(
      servicesForSector(
        fakeDb(async () => {
          throw databaseError;
        }),
        sectorWithTwoServices,
        'EUR',
      ),
    ).rejects.toBe(databaseError);
  });
});

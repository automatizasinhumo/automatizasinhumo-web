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
    const n = SECTORS.length;
    expect(n).toBeGreaterThanOrEqual(6);
    expect(new Set(SECTORS.map((sector) => sector.title)).size).toBe(n);
    expect(new Set(SECTORS.map((sector) => sector.description)).size).toBe(n);
    expect(new Set(SECTORS.map((sector) => sector.description.slice(0, 160))).size).toBe(n);
  });

  // Cada oficio llega a una web que le sirve: una general o la hecha para él. Una web
  // de nicho de otro oficio (fontaneros → «Web para taller») confunde al comprador.
  const WEB_GENERAL = new Set(['web-una-pagina', 'web-corporativa-5-secciones']);
  const WEB_DE_NICHO: Record<string, string> = { 'web-taller': 'talleres', 'web-inmobiliaria': 'inmobiliarias' };

  it('offers every sector a general web or its own niche web, never the niche web of another trade', () => {
    for (const sector of SECTORS) {
      const webs = sector.serviceSlugs.filter((slug) => WEB_GENERAL.has(slug) || slug in WEB_DE_NICHO);
      expect(webs.length, sector.slug).toBeGreaterThan(0);
      for (const slug of sector.serviceSlugs) {
        if (slug in WEB_DE_NICHO) expect(WEB_DE_NICHO[slug], `${sector.slug} → ${slug}`).toBe(sector.slug);
      }
    }
  });

  it('puts a demo of the trade first in every sector card that has one', () => {
    for (const sector of SECTORS) {
      const hints = sector.demoHints ?? [];
      expect(hints.length, sector.slug).toBeGreaterThan(0);
      const first = demosForService(sector.serviceSlugs[0], hints).find((demo) => demo.tipo !== 'interactiva')!;
      expect(hints.some((hint) => first.url.includes(hint)), `${sector.slug}: ${first.url}`).toBe(true);
    }
  });

  it('keeps interactive demos and never repeats one', () => {
    const demos = demosForService('carta-qr', ['restaurant/restaurant']);
    expect(demos.some((demo) => demo.tipo === 'interactiva')).toBe(true);
    expect(new Set(demos.map((demo) => demo.url)).size).toBe(demos.length);
    expect(demos.length).toBeLessThanOrEqual(3);
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

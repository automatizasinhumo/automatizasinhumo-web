import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { D1Database } from '@cloudflare/workers-types';
import type { Product } from '../products/db';

vi.mock('../products/db', () => ({ getProductBySlug: vi.fn() }));
vi.mock('../products/variants', () => ({ listVariants: vi.fn() }));

import { getProductBySlug } from '../products/db';
import { listVariants } from '../products/variants';
import { loadHomeServices } from './homeServices';

const product = (slug: string, id: number): Product => ({
  id,
  public_id: `prod_${id}abcdefghi`,
  name: slug,
  slug,
  description: null,
  price_cents: 1000,
  currency: 'usd',
  image_key: 'media/service.jpg',
  stock: 1,
  active: 1,
  variant_label: null,
  weight_grams: null,
  requires_shipping: 0,
  file_key: null,
  file_name: null,
  file_mime: null,
  file_size_bytes: null,
  related_ids: null,
  created_at: '2026-01-01T00:00:00Z',
});

const db = {} as D1Database;
const options = {
  currency: 'usd',
  imageBaseUrl: 'https://img.example.com',
  delivery: 'cloudflare' as const,
};

describe('loadHomeServices', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(getProductBySlug).mockImplementation(async (_db, slug) =>
      product(slug, slug === 'carta-qr' ? 2 : slug === 'tarjeta-digital' ? 3 : 1),
    );
    vi.mocked(listVariants).mockResolvedValue([]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('uses the portada column layout to size responsive service images', async () => {
    const result = await loadHomeServices(db, options);

    expect(result.services[0].image.sizes).toBe('(max-width: 767px) 100vw, 33vw');
  });

  it('reports a D1 variant-load failure while keeping the other services', async () => {
    vi.mocked(listVariants).mockImplementation(async (_db, productId) => {
      if (productId === 2) throw new Error('D1 unavailable');
      return [];
    });

    const result = await loadHomeServices(db, options);

    expect(result.failed).toBe(true);
    expect(result.services).toHaveLength(2);
    expect(result.services.map((service) => service.href)).not.toContain('/products/carta-qr');
  });
});

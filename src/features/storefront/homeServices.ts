import type { D1Database } from '@cloudflare/workers-types';
import { formatMoney } from '../../money';
import { markdownFirstParagraphExcerpt } from '../pages/markdown.ts';
import { getProductBySlug } from '../products/db';
import { listVariants } from '../products/variants';
import type { ImageDelivery } from '../products/image';
import { buildProductCard } from './productCard';
import type { StorefrontImage } from './models';
import { classifyDeliveryModalities } from './deliveryModalities';

const FEATURED_SERVICES = [
  { slug: 'web-una-pagina', need: 'Necesito estar en internet' },
  { slug: 'carta-qr', need: 'Quiero dejar de reimprimir la carta' },
  { slug: 'tarjeta-digital', need: 'Quiero que me encuentren fácil' },
] as const;

export interface HomeService {
  need: string;
  name: string;
  href: string;
  description: string;
  image: StorefrontImage;
  templatePrice: string | null;
  setupPrice: string | null;
}

export interface HomeServiceOptions {
  currency: string;
  imageBaseUrl: string;
  delivery?: ImageDelivery;
}

export async function loadHomeServices(
  db: D1Database,
  options: HomeServiceOptions,
): Promise<HomeService[]> {
  const services: (HomeService | null)[] = await Promise.all(
    FEATURED_SERVICES.map(async ({ slug, need }) => {
      const product = await getProductBySlug(db, slug);
      if (!product || !product.active) return null;

      const [variants] = await Promise.all([listVariants(db, product.id)]);
      const card = buildProductCard(product, {
        currency: options.currency,
        baseUrl: options.imageBaseUrl,
        delivery: options.delivery,
        maxPriceCents:
          variants.length > 0
            ? Math.max(...variants.map((variant) => variant.price_cents))
            : undefined,
      });
      const { template, setup } = classifyDeliveryModalities(variants);

      return {
        need,
        name: card.name,
        href: card.href,
        description: product.description
          ? markdownFirstParagraphExcerpt(product.description, 150)
          : '',
        image: card.image,
        templatePrice: template ? formatMoney(template.price_cents, options.currency) : null,
        setupPrice: setup ? formatMoney(setup.price_cents, options.currency) : null,
      };
    }),
  );

  return services.filter((service): service is HomeService => service !== null);
}

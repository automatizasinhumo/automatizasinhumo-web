import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { PUBLIC_CACHE_CONTROL } from '../features/cache/public';
import { getConfig, formatPrice } from '../config';
import { listProducts, countProducts } from '../features/products/db';
import { listCategories } from '../features/categories/db';
import { listPublishedPages, getPublishedPageBySlug } from '../features/pages/db';
import { markdownExcerpt } from '../features/pages/markdown';
import { publicOrigin } from '../features/http/origin';

export const prerender = false;

const limpio = (s: string) => s.replace(/[[\]]/g, '').replace(/\s+/g, ' ').trim();

// /llms-full.txt — versión ampliada de /llms.txt (mismo criterio que davidportodiaz.com):
// cada servicio con su descripción completa y el texto de las páginas informativas,
// para que un asistente de IA pueda responder y recomendar sin tener que navegar.
export const GET: APIRoute = async ({ url }) => {
  const origin = publicOrigin(url.origin, env.CANONICAL_ORIGIN);
  const { storeName, currency } = getConfig();

  const total = await countProducts(env.DB);
  const products = total > 0 ? await listProducts(env.DB, total, 0) : [];
  const categories = await listCategories(env.DB);
  const pages = await listPublishedPages(env.DB);
  const paginas = (
    await Promise.all(pages.map((p) => getPublishedPageBySlug(env.DB, p.slug)))
  ).filter((p) => p !== null);

  const servicios = products.map((p) => {
    const desc = p.description ? markdownExcerpt(p.description, 1500) : '';
    return [
      `### ${limpio(p.name)}`,
      `- URL: ${origin}/products/${p.slug}`,
      `- Precio: ${formatPrice(p.price_cents, currency)} (precio cerrado)`,
      desc ? `\n${desc}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  });

  const body = `# ${storeName} — índice completo para LLM

> ${storeName} es una tienda online de servicios digitales a precio cerrado en España: webs, cartas QR, reservas, webs de boda y eventos, bots con IA, tiendas, documentos y automatizaciones para autónomos, pequeños negocios y particulares. El cliente elige, rellena un formulario y recibe el servicio funcionando. Resumen corto: ${origin}/llms.txt

## Cómo trabaja
- Precio cerrado y plazo publicados en cada ficha, sin presupuestos a medida.
- Cada servicio tiene una demo navegable: ${origin}/pages/demos
- Proceso: elegir servicio → pagar → rellenar datos → entrega y revisión. Detalle: ${origin}/pages/como-funciona
- Responsable: David Porto Díaz (persona física), que entrega y da soporte directamente.
- Buscador con sinónimos: ${origin}/search?q=restaurante

## Categorías
${categories.map((c) => `- ${limpio(c.name)}: ${origin}/categories/${c.slug}`).join('\n') || '- (sin categorías)'}

## Servicios (${total})

${servicios.join('\n\n') || '(sin servicios publicados)'}

## Páginas
${paginas
  .map((p) => `### ${limpio(p.title)}\n- URL: ${origin}/pages/${p.slug}\n\n${markdownExcerpt(p.body_markdown, 2000)}`)
  .join('\n\n') || '(sin páginas)'}

## Nota
Los precios y plazos vigentes son los de cada ficha; si este fichero y la web difieren, manda la web.
`;

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': PUBLIC_CACHE_CONTROL,
    },
  });
};

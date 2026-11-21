import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { renderSVG } from 'uqr';
import { tarjetaPorSlug } from '../../../features/servicios/publicados';

export const prerender = false;

// QR de la tarjeta para imprimir (SVG, escala sin perder calidad).
export const GET: APIRoute = async ({ params, url }) => {
  const t = await tarjetaPorSlug(env.DB, params.slug ?? '');
  if (!t) return new Response('No encontrada', { status: 404 });
  return new Response(renderSVG(new URL(`/c/${t.slug}`, url).href, { border: 2 }), {
    headers: {
      'content-type': 'image/svg+xml; charset=utf-8',
      'content-disposition': `inline; filename="${t.slug}-qr.svg"`,
      'cache-control': 'public, max-age=3600',
    },
  });
};

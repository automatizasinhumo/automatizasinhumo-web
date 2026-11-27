import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { cartelCarta } from '../../../../features/servicios/paginaCarta';
import { webPorSlug } from '../../../../features/servicios/webs';

export const prerender = false;

// Cartel A5 con el QR de la carta, para imprimir y ponerlo en las mesas o en la puerta.
export const GET: APIRoute = async ({ params, url }) => {
  const w = await webPorSlug(env.DB, params.slug ?? '');
  if (!w || !w.datos.carta.length) return new Response('Esta web no tiene carta', { status: 404, headers: { 'content-type': 'text/plain; charset=utf-8' } });
  return new Response(cartelCarta(w.datos, new URL(`/w/${w.slug}/carta`, url).href), {
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=300', 'x-robots-tag': 'noindex' },
  });
};

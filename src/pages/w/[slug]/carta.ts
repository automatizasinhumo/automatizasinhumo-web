import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { paginaCarta } from '../../../features/servicios/paginaCarta';
import { webPorSlug } from '../../../features/servicios/webs';

export const prerender = false;

// Carta de un bar o restaurante (platos, precios y alérgenos), publicada con su web. Sin JavaScript.
export const GET: APIRoute = async ({ params, url }) => {
  const w = await webPorSlug(env.DB, params.slug ?? '');
  if (!w || !w.datos.carta.length) return new Response('Esta web no tiene carta', { status: 404, headers: { 'content-type': 'text/plain; charset=utf-8' } });
  const propia = new URL(`/w/${w.slug}/carta`, url).href;
  return new Response(paginaCarta(w.datos, propia, `/w/${w.slug}`), {
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=60' },
  });
};

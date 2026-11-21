import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { documentoWeb, webPorSlug } from '../../features/servicios/webs';

export const prerender = false;

// Web de una página publicada por el cliente desde /servicios/web. HTML completo y propio
// (sin la cabecera de la tienda), sin JavaScript ni recursos externos.
export const GET: APIRoute = async ({ params, url }) => {
  const w = await webPorSlug(env.DB, params.slug ?? '');
  if (!w) return new Response('Web no encontrada', { status: 404, headers: { 'content-type': 'text/plain; charset=utf-8' } });
  const imagen = new URL(`/w/${w.slug}/foto`, url).href;
  return new Response(documentoWeb(w.datos, new URL(`/w/${w.slug}`, url).href, '', imagen), {
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=60' },
  });
};

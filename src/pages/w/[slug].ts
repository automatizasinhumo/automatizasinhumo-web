import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { contarVisita } from '../../features/servicios/panelCliente';
import { formularioWeb } from '../../features/servicios/mensajesWeb';
import { documentoWeb, webPorSlug } from '../../features/servicios/webs';

export const prerender = false;

// Web de una página publicada por el cliente desde /servicios/web. HTML completo y propio
// (sin la cabecera de la tienda), sin JavaScript ni recursos externos.
export const GET: APIRoute = async ({ params, url, request, locals }) => {
  const w = await webPorSlug(env.DB, params.slug ?? '');
  if (!w) return new Response('Web no encontrada', { status: 404, headers: { 'content-type': 'text/plain; charset=utf-8' } });
  locals.cfContext?.waitUntil(contarVisita(env.DB, 'web', w.slug, request.headers.get('user-agent')));
  const imagen = new URL(`/w/${w.slug}/foto`, url).href;
  const galeria = new URL(`/w/${w.slug}/galeria/`, url).href;
  const propia = new URL(`/w/${w.slug}`, url).href;
  const formulario = await formularioWeb(w.slug, `/w/${w.slug}/mensaje`, propia, env.AUTH_SECRET);
  return new Response(documentoWeb(w.datos, propia, '', imagen, galeria, formulario), {
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=60' },
  });
};

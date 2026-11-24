import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { bytesFoto, cacheFoto, webPorSlug } from '../../../features/servicios/webs';

export const prerender = false;

// Foto de portada de una web publicada como imagen normal: la usan og:image y twitter:image,
// que no aceptan data URL. Los bytes salen de los datos ya validados de la página.
export const GET: APIRoute = async ({ params, url }) => {
  const w = await webPorSlug(env.DB, params.slug ?? '');
  const f = w && bytesFoto(w.datos.foto);
  if (!f) return new Response('Sin foto', { status: 404, headers: { 'content-type': 'text/plain; charset=utf-8' } });
  return new Response(f.bytes, {
    headers: {
      'content-type': f.tipo,
      'cache-control': cacheFoto(w.datos.foto, url.searchParams.get('v')),
      'x-content-type-options': 'nosniff',
    },
  });
};

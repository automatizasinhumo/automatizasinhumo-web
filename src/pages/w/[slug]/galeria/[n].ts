import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { bytesFoto, cacheFoto, MAX_FOTO_GALERIA_WEB, webPorSlug } from '../../../../features/servicios/webs';

export const prerender = false;

// Foto n de la galería de una web publicada: la página publicada las enlaza aquí con carga
// diferida en lugar de llevar los bytes dentro del HTML. Salen de los datos ya validados.
export const GET: APIRoute = async ({ params, url }) => {
  const n = /^\d$/.test(params.n ?? '') ? Number(params.n) : -1;
  const w = n < 0 ? null : await webPorSlug(env.DB, params.slug ?? '');
  const f = w && bytesFoto(w.datos.galeria[n] ?? '', MAX_FOTO_GALERIA_WEB);
  if (!f) return new Response('Sin foto', { status: 404, headers: { 'content-type': 'text/plain; charset=utf-8' } });
  return new Response(f.bytes, {
    headers: {
      'content-type': f.tipo,
      'cache-control': cacheFoto(w.datos.galeria[n] ?? '', url.searchParams.get('v')),
      'x-content-type-options': 'nosniff',
    },
  });
};

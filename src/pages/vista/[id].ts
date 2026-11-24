import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { leerVista } from '../../features/servicios/vistaWeb';
import { documentoVista } from '../../features/servicios/webs';

export const prerender = false;

// GET /vista/<id> — borrador compartido del estudio, con marca de agua y sin indexar.
export const GET: APIRoute = async ({ params }) => {
  const d = await leerVista(env.DB, String(params.id ?? ''));
  if (!d) return new Response('Este borrador ya no existe.', { status: 404, headers: { 'content-type': 'text/plain; charset=utf-8', 'x-robots-tag': 'noindex' } });
  return new Response(documentoVista(d), {
    headers: { 'content-type': 'text/html; charset=utf-8', 'x-robots-tag': 'noindex, nofollow', 'cache-control': 'private, no-store' },
  });
};

import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { ficheroClave } from '../features/seo/indexnow';

export const prerender = false;

// /<clave>.txt de IndexNow. robots.txt, llms.txt y llms-full.txt tienen ruta propia y ganan a esta.
export const GET: APIRoute = ({ params }) => {
  const cuerpo = ficheroClave(params.clave, env.INDEXNOW_KEY);
  if (cuerpo === null) return new Response('Not found', { status: 404 });
  return new Response(cuerpo, { headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=86400' } });
};

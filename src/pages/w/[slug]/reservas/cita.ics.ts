import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { icsCita, leerCita, leerSelloCita, negocioDe } from '../../../../features/servicios/citasWeb';
import { webPorSlug } from '../../../../features/servicios/webs';

export const prerender = false;

// La cita en formato calendario (RFC 5545), con el mismo enlace firmado que la anulación.
export const GET: APIRoute = async ({ params, url }) => {
  const secret = env.AUTH_SECRET;
  const w = secret ? await webPorSlug(env.DB, params.slug ?? '') : null;
  const id = w && secret ? await leerSelloCita(url.searchParams.get('t') ?? '', w.slug, secret) : null;
  const cita = id ? await leerCita(env.DB, id) : null;
  if (!w || !cita || cita.slug !== w.slug) return new Response('Cita no encontrada', { status: 404 });
  const anular = new URL(`/w/${w.slug}/reservas/anular${url.search}`, url).href;
  return new Response(icsCita(cita, negocioDe(w.slug, w.datos), anular), {
    headers: {
      'content-type': 'text/calendar; charset=utf-8',
      'content-disposition': 'attachment; filename="cita.ics"',
      'cache-control': 'no-store',
      'referrer-policy': 'no-referrer',
    },
  });
};

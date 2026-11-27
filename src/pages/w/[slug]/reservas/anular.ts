import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getConfig } from '../../../../config';
import { getEmailProvider } from '../../../../features/email';
import { getSetting } from '../../../../features/settings/db';
import { anularCita, correoCitaAnulada, leerCita, leerSelloCita, negocioDe, paginaAnular, paginaError } from '../../../../features/servicios/citasWeb';
import { correoDueno } from '../../../../features/servicios/mensajesWeb';
import { webPorSlug } from '../../../../features/servicios/webs';

export const prerender = false;

const html = (cuerpo: string, status = 200) =>
  new Response(cuerpo, {
    status,
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'referrer-policy': 'no-referrer' },
  });
const NO_VALE = 'Este enlace no vale o ya ha caducado. Si necesitas cambiar la cita, llama al negocio.';

/** Cita del enlace firmado `?t=`; cita null si no vale (caducado, de otra web o borrada). */
async function cargar(slug: string, url: URL) {
  const secret = env.AUTH_SECRET;
  const w = secret ? await webPorSlug(env.DB, slug) : null;
  if (!w || !secret) return null;
  const id = await leerSelloCita(url.searchParams.get('t') ?? '', w.slug, secret);
  const cita = id ? await leerCita(env.DB, id) : null;
  return { n: negocioDe(w.slug, w.datos), cita: cita?.slug === w.slug ? cita : null, vuelta: new URL(`/w/${w.slug}`, url).href };
}

// Abrir el enlace solo pregunta: los antivirus y las vistas previas del correo lo abren solos.
export const GET: APIRoute = async ({ params, url }) => {
  const c = await cargar(params.slug ?? '', url);
  if (!c) return new Response('Web no encontrada', { status: 404 });
  if (!c.cita) return paginaError(c.n, NO_VALE, c.vuelta, 404);
  return html(paginaAnular(c.cita, c.n, url.pathname + url.search, c.vuelta));
};

export const POST: APIRoute = async ({ params, url, locals }) => {
  const c = await cargar(params.slug ?? '', url);
  if (!c) return new Response('Web no encontrada', { status: 404 });
  if (!c.cita) return paginaError(c.n, NO_VALE, c.vuelta, 404);
  const cita = c.cita;
  const hecho = cita.estado === 'confirmada' && (await anularCita(env.DB, cita.id));
  const anulada = { ...cita, estado: 'anulada' as const };
  if (hecho) {
    // El mismo enlace lo tienen el cliente y el dueño: se avisa a los dos.
    const avisar = async () => {
      try {
        const [dueno, emailer] = await Promise.all([correoDueno(env.DB, cita.slug), getEmailProvider()]);
        if (!emailer) return;
        const tienda = (await getSetting(env.DB, 'store_name')) || getConfig().storeName;
        await Promise.allSettled([
          emailer.send(correoCitaAnulada(cita.email, anulada, c.n, tienda, false)),
          dueno ? emailer.send(correoCitaAnulada(dueno.email, anulada, c.n, tienda, true)) : Promise.resolve(),
        ]);
      } catch (e) {
        console.error('Cita web: no se pudo avisar de la anulación', e instanceof Error ? e.message : 'error');
      }
    };
    if (locals.cfContext) locals.cfContext.waitUntil(avisar());
    else await avisar();
  }
  return html(paginaAnular(anulada, c.n, '', c.vuelta, hecho));
};

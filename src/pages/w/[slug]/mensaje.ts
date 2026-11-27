import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getConfig } from '../../../config';
import { getEmailProvider } from '../../../features/email';
import { getSetting } from '../../../features/settings/db';
import {
  correoDueno,
  correoMensaje,
  guardarMensaje,
  leerSello,
  paginaRespuesta,
  validarMensaje,
} from '../../../features/servicios/mensajesWeb';
import { webPorSlug } from '../../../features/servicios/webs';

export const prerender = false;

const html = (cuerpo: string, status = 200) =>
  new Response(cuerpo, { status, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } });

const AVISO = {
  rapido: 'Has enviado el formulario demasiado deprisa. Espera unos segundos y vuelve a enviarlo.',
  sello: 'El formulario ha caducado. Recarga la web y vuelve a escribir el mensaje.',
  contacto: 'Pon un email o un teléfono para que te puedan responder.',
  texto: 'Escribe el mensaje antes de enviarlo.',
  trampa: '',
} as const;

// Formulario de contacto de una web publicada (renderWeb → formularioContacto). Sin JavaScript:
// responde con una página propia y un botón para volver a la web (en /w/<slug> o en su dominio).
export const POST: APIRoute = async ({ params, request, url, locals }) => {
  const slug = params.slug ?? '';
  const secret = env.AUTH_SECRET;
  const w = secret ? await webPorSlug(env.DB, slug) : null;
  if (!w || !secret) return html(paginaRespuesta(false, '', 'Esta web no admite mensajes.'), 404);
  let f: FormData;
  try {
    f = await request.formData();
  } catch {
    return html(paginaRespuesta(false, `/w/${w.slug}`), 400);
  }
  const sello = await leerSello(String(f.get('sello') ?? ''), w.slug, secret);
  if ('error' in sello) return html(paginaRespuesta(false, `/w/${w.slug}`, AVISO[sello.error]), 400);
  const v = validarMensaje(f);
  // El robot que cae en la trampa ve un «enviado» y no aprende nada; no se guarda.
  if (!v.ok && v.error === 'trampa') return html(paginaRespuesta(true, sello.vuelta));
  if (!v.ok) return html(paginaRespuesta(false, sello.vuelta, AVISO[v.error]), 400);
  const id = await guardarMensaje(env.DB, w.slug, v.mensaje);
  const avisar = async () => {
    try {
      const [dueno, emailer] = await Promise.all([correoDueno(env.DB, w.slug), getEmailProvider()]);
      if (!dueno || !emailer) return;
      const tienda = (await getSetting(env.DB, 'store_name')) || getConfig().storeName;
      await emailer.send(correoMensaje(dueno.email, dueno.negocio, v.mensaje, new URL('/account', url).href, tienda, id));
    } catch (e) {
      console.error('Mensaje web: no se pudo avisar al dueño', e instanceof Error ? e.message : 'error');
    }
  };
  if (locals.cfContext) locals.cfContext.waitUntil(avisar());
  else await avisar();
  return html(paginaRespuesta(true, sello.vuelta));
};

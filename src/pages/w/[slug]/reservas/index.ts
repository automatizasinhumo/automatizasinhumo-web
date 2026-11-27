import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getConfig } from '../../../../config';
import { getEmailProvider } from '../../../../features/email';
import { getSetting } from '../../../../features/settings/db';
import {
  correoCitaCliente,
  correoCitaDueno,
  diasVista,
  enviarConAdjunto,
  guardarCita,
  huecosDelDia,
  negocioDe,
  ocupadas,
  paginaCitaHecha,
  paginaError,
  paginaReservas,
  selloCita,
  tramosHorario,
  validarCita,
  type Cita,
} from '../../../../features/servicios/citasWeb';
import { correoDueno, leerSello, selloFormulario } from '../../../../features/servicios/mensajesWeb';
import { citasActivas, webPorSlug } from '../../../../features/servicios/webs';

export const prerender = false;

const DIA = 86_400_000;
const html = (cuerpo: string, status = 200) =>
  new Response(cuerpo, { status, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } });
const sinCitas = () => new Response('Esta web no tiene citas', { status: 404, headers: { 'content-type': 'text/plain; charset=utf-8' } });

const AVISO = {
  rapido: 'Has enviado el formulario demasiado deprisa. Espera unos segundos y vuelve a enviarlo.',
  sello: 'La página ha caducado. Vuelve a elegir la hora.',
  hora: 'Elige una hora.',
  nombre: 'Pon tu nombre.',
  email: 'Revisa el email: ahí te llega la confirmación.',
  telefono: 'Revisa el teléfono: solo números, espacios y +.',
  ocupada: 'Esa hora se acaba de ocupar. Elige otra.',
  trampa: '',
} as const;

async function cargar(slug: string) {
  const w = await webPorSlug(env.DB, slug);
  if (!w || !citasActivas(w.datos)) return null;
  return { w, tramos: tramosHorario(w.datos.horario), dur: Number(w.datos.citas) };
}

async function vista(slug: string, url: URL, ahora: number, aviso = '', status = 200) {
  const c = await cargar(slug);
  const secret = env.AUTH_SECRET;
  if (!c || !secret) return sinCitas();
  const { w, tramos, dur } = c;
  const vuelta = new URL(`/w/${w.slug}`, url).href;
  const ocup = await ocupadas(env.DB, w.slug, ahora, ahora + 23 * DIA);
  const dias = diasVista(ahora).map((fecha) => ({ fecha, libres: huecosDelDia(fecha, tramos, dur, ocup, ahora).length }));
  const pedido = url.searchParams.get('dia') ?? '';
  const dia = dias.find((d) => d.fecha === pedido && d.libres)?.fecha ?? dias.find((d) => d.libres)?.fecha ?? dias[0]!.fecha;
  return html(
    paginaReservas({
      negocio: negocioDe(w.slug, w.datos),
      dur,
      dias,
      dia,
      huecos: huecosDelDia(dia, tramos, dur, ocup, ahora),
      vuelta,
      accion: `/w/${w.slug}/reservas`,
      sello: await selloFormulario(w.slug, vuelta, secret, ahora),
      aviso,
    }),
    status,
  );
}

// Citas de una web publicada (DatosWeb.citas): el día se elige con enlaces y la hora con radios.
export const GET: APIRoute = ({ params, url }) => vista(params.slug ?? '', url, Date.now());

export const POST: APIRoute = async ({ params, request, url, locals }) => {
  const ahora = Date.now();
  const slug = params.slug ?? '';
  const secret = env.AUTH_SECRET;
  const c = secret ? await cargar(slug) : null;
  if (!c || !secret) return sinCitas();
  const { w, tramos, dur } = c;
  const n = negocioDe(w.slug, w.datos);
  let f: FormData;
  try {
    f = await request.formData();
  } catch {
    return vista(slug, url, ahora, AVISO.sello, 400);
  }
  const sello = await leerSello(String(f.get('sello') ?? ''), w.slug, secret, ahora);
  if ('error' in sello) return vista(slug, url, ahora, AVISO[sello.error], 400);
  const v = validarCita(f);
  // El robot que cae en la trampa no reserva nada y no aprende por qué.
  if (!v.ok && v.error === 'trampa') return paginaError(n, 'No se ha podido reservar. Llama al negocio.', sello.vuelta, 200);
  const otra = (dia: string) => new URL(`/w/${w.slug}/reservas?dia=${encodeURIComponent(dia)}`, url);
  if (!v.ok) return vista(slug, otra(String(f.get('hora') ?? '').slice(0, 10)), ahora, AVISO[v.error], 400);
  // La hora se vuelve a comprobar aquí: el formulario pudo quedarse abierto mientras otro reservaba.
  const ocup = await ocupadas(env.DB, w.slug, ahora, ahora + 23 * DIA);
  const hueco = diasVista(ahora).includes(v.fecha) ? huecosDelDia(v.fecha, tramos, dur, ocup, ahora).find((h) => h.min === v.min) : undefined;
  if (!hueco) return vista(slug, otra(v.fecha), ahora, AVISO.ocupada, 409);
  const r = await guardarCita(env.DB, w.slug, v.datos, hueco);
  if ('ocupada' in r) return vista(slug, otra(v.fecha), ahora, AVISO.ocupada, 409);
  // Ya está guardada: la confirmación se arma con lo escrito, sin otra lectura que pueda fallar.
  const cita: Cita = { ...v.datos, inicio: hueco.inicio, fin: hueco.fin, id: r.id, slug: w.slug, estado: 'confirmada' };
  const t = encodeURIComponent(await selloCita(cita, secret, ahora));
  const anular = new URL(`/w/${w.slug}/reservas/anular?t=${t}`, url).href;
  const icsUrl = new URL(`/w/${w.slug}/reservas/cita.ics?t=${t}`, url).href;
  const avisar = async () => {
    try {
      const [dueno, emailer] = await Promise.all([correoDueno(env.DB, w.slug), getEmailProvider()]);
      if (!emailer) return;
      const tienda = (await getSetting(env.DB, 'store_name')) || getConfig().storeName;
      const envios = [enviarConAdjunto(emailer, correoCitaCliente(cita, n, anular, tienda))];
      if (dueno) envios.push(enviarConAdjunto(emailer, correoCitaDueno(dueno.email, cita, n, anular, new URL('/account', url).href, tienda)));
      for (const r of await Promise.allSettled(envios))
        if (r.status === 'rejected') console.error('Cita web: no se pudo enviar un correo', r.reason instanceof Error ? r.reason.message : 'error');
    } catch (e) {
      console.error('Cita web: no se pudieron enviar los correos', e instanceof Error ? e.message : 'error');
    }
  };
  if (locals.cfContext) locals.cfContext.waitUntil(avisar());
  else await avisar();
  return html(paginaCitaHecha(cita, n, anular, icsUrl, sello.vuelta));
};

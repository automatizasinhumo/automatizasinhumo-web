import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { accountsEnabled, getCustomerEmail } from '../../features/auth/customer';
import { cambiarEstadoMensaje, esEstadoMensaje } from '../../features/servicios/seguimientoMensajes';

export const prerender = false;

// Estado de un mensaje del panel. Llega por el formulario de cada mensaje (sin JS) o por
// sendBeacon al pulsar un botón de respuesta («contestado» sin que el dueño haga nada más).
// El guardia de origen del middleware ya rechaza los envíos desde otros sitios.
export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  if (!(await accountsEnabled())) return new Response(null, { status: 404 });
  const email = await getCustomerEmail(cookies);
  if (!email) return new Response(null, { status: 401 });
  const f = await request.formData().catch(() => null);
  const id = f?.get('id');
  const estado = f?.get('estado');
  if (typeof id !== 'string' || !id || id.length > 64 || !esEstadoMensaje(estado)) return new Response(null, { status: 400 });
  const ok = await cambiarEstadoMensaje(env.DB, email, id, estado);
  if (f?.get('beacon')) return new Response(null, { status: ok ? 204 : 404 });
  return redirect(`/account#m-${encodeURIComponent(id)}`, 303);
};

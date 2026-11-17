import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getProductBySlug } from '../../features/products/db';
import { getStoreSettings } from '../../features/settings/db';
import { getEmailProvider } from '../../features/email';
import { getConfig } from '../../config';
import { CAMPO_PEDIDO, camposDeDescripcion, crearSolicitud, resumenSolicitud, validarSolicitud } from '../../features/solicitudes';

export const prerender = false;

// POST del formulario «Empieza gratis». No cobra nada: guarda la solicitud para
// que David prepare la vista previa. El pago llega solo cuando el cliente la aprueba.
export const POST: APIRoute = async ({ request, redirect }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return redirect('/empezar/consulta?error=formulario', 303);
  }
  const slug = String(form.get('slug') ?? 'consulta').trim();
  const volver = `/empezar/${/^[a-z0-9-]{1,80}$/.test(slug) ? slug : 'consulta'}`;

  // Los campos válidos salen del servidor (ficha del servicio), no del navegador.
  let etiquetas: string[] = [];
  let producto: string | null = null;
  if (slug !== 'consulta') {
    const p = await getProductBySlug(env.DB, slug);
    if (!p) return redirect('/empezar/consulta?error=servicio', 303);
    etiquetas = camposDeDescripcion(p.description);
    producto = p.name;
  }
  form.set('producto', producto ?? 'Consulta general');

  const v = validarSolicitud(form, etiquetas);
  if (v.ok && v.spam) return redirect('/empezar/gracias', 303);
  if (!v.ok) {
    const primero = Object.keys(v.errores)[0] ?? 'datos';
    return redirect(`${volver}?error=${encodeURIComponent(primero)}`, 303);
  }

  let publicId: string;
  try {
    publicId = await crearSolicitud(env.DB, v.data);
  } catch (e) {
    console.error('solicitudes: no se pudo guardar', e);
    return redirect(`${volver}?error=guardar`, 303);
  }

  // Emails: mejor esfuerzo. Si fallan, la solicitud ya está guardada en el panel.
  try {
    const s = await getStoreSettings(env.DB);
    const mail = await getEmailProvider(s);
    if (mail) {
      const r = resumenSolicitud(v.data, publicId);
      const tienda = s.storeName ?? getConfig().storeName;
      const pagado = v.data.campos[CAMPO_PEDIDO];
      const intro = pagado
        ? `Gracias. Tenemos tus datos para el pedido ${pagado}. David Porto Díaz se pone con ello y te envía el resultado para que lo revises antes de entregarlo.`
        : 'Gracias. No has pagado nada. David Porto Díaz revisa tus datos y te envía una vista previa en 24-72 h laborables. Solo si te gusta, te mandamos el enlace de pago.';
      const seguimiento = new URL(`/empezar/estado?id=${encodeURIComponent(publicId)}`, request.url).toString();
      await mail.send({
        to: v.data.email,
        subject: `Hemos recibido tu solicitud ${publicId} · ${tienda}`,
        text: `Hola ${v.data.nombre}:\n\n${intro}\n\nSigue tu solicitud: ${seguimiento}\n\n${r.text}\n\nSi quieres añadir algo, responde a este email.`,
        html: `<p>Hola ${escapar(v.data.nombre)}:</p><p>${escapar(intro)}</p><p><a href="${escapar(seguimiento)}">Sigue tu solicitud</a></p>${r.html}<p>Si quieres añadir algo, responde a este email.</p>`,
        idempotencyKey: `solicitud-cliente-${publicId}`,
      });
      const aviso = s.emailNotifyTo || getConfig().email.notifyTo;
      if (aviso) {
        await mail.send({
          to: aviso,
          subject: `${pagado ? 'Datos de pedido pagado' : 'Nueva solicitud'} ${publicId}: ${v.data.producto ?? slug}`,
          text: `${r.text}\n\nPanel: /admin/solicitudes`,
          html: `${r.html}<p><a href="${new URL('/admin/solicitudes', request.url)}">Abrir panel de solicitudes</a></p>`,
          idempotencyKey: `solicitud-aviso-${publicId}`,
        });
      }
    }
  } catch (e) {
    console.error('solicitudes: email no enviado', e);
  }

  return redirect(`/empezar/gracias?id=${encodeURIComponent(publicId)}`, 303);
};

function escapar(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

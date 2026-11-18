import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getProductBySlug } from '../../features/products/db';
import { getStoreSettings } from '../../features/settings/db';
import { getEmailProvider } from '../../features/email';
import { getConfig } from '../../config';
import { resolverPedido } from '../../features/solicitudes/pedido';
import {
  CAMPO_PEDIDO,
  camposDeDescripcion,
  crearSolicitud,
  liberarCorreos,
  reclamarCorreos,
  resumenSolicitud,
  validarSolicitud,
} from '../../features/solicitudes';

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
  let pedido: Awaited<ReturnType<typeof resolverPedido>> = null;
  if (slug !== 'consulta') {
    const p = await getProductBySlug(env.DB, slug);
    if (!p) return redirect('/empezar/consulta?error=servicio', 303);
    etiquetas = camposDeDescripcion(p.description);
    producto = p.name;
    // Compra directa: el token del pedido se vuelve a comprobar aquí; un ?pedido= inventado no cuenta.
    const token = String(form.get('pedido') ?? '').slice(0, 80);
    if (token) pedido = await resolverPedido(env.DB, token, p.slug);
    // Servicio desactivado: solo quien ya lo pagó puede seguir mandando sus datos.
    if (!p.active && !pedido) return redirect('/empezar/consulta?error=servicio', 303);
  }
  form.set('producto', producto ?? 'Consulta general');

  const v = validarSolicitud(form, etiquetas);
  if (v.ok && v.spam) return redirect('/empezar/gracias', 303);
  if (!v.ok) {
    const primero = Object.keys(v.errores)[0] ?? 'datos';
    return redirect(`${volver}?error=${encodeURIComponent(primero)}`, 303);
  }
  if (pedido) {
    v.data.campos = { [CAMPO_PEDIDO]: pedido.ref, ...v.data.campos };
    if (pedido.modalidad) v.data.modalidad = pedido.modalidad; // la pagada, no la del formulario
  }
  const tipo = pedido ? 'pedido' : slug === 'consulta' ? 'consulta' : 'prueba';

  let publicId: string;
  try {
    publicId = await crearSolicitud(env.DB, v.data, pedido?.publicId ?? null);
  } catch (e) {
    console.error('solicitudes: no se pudo guardar', e);
    return redirect(`${volver}?error=guardar`, 303);
  }

  // Emails: mejor esfuerzo. Si fallan, la solicitud ya está guardada en el panel.
  // Un solo envío por solicitud: un reenvío del mismo formulario no los repite.
  let reclamado = false;
  try {
    const s = await getStoreSettings(env.DB);
    const mail = await getEmailProvider(s);
    if (mail && (reclamado = await reclamarCorreos(env.DB, publicId))) {
      const r = resumenSolicitud(v.data, publicId);
      const tienda = s.storeName ?? getConfig().storeName;
      const pagado = v.data.campos[CAMPO_PEDIDO];
      const intro = pagado
        ? `Hemos recibido los datos de tu pedido ${pagado}. Gracias. Revisamos la información y, si está completa, tendrás una primera versión en 24-72 h laborables. Si falta algo, te escribimos por este mismo correo. No tienes que volver a pagar.`
        : 'Gracias. No has pagado nada. David Porto Díaz revisa tus datos y te envía una vista previa en 24-72 h laborables. Solo si te gusta, te mandamos el enlace de pago.';
      const seguimiento = new URL(`/empezar/estado?id=${encodeURIComponent(publicId)}`, request.url).toString();
      await mail.send({
        to: v.data.email,
        subject: pagado ? `Ya tenemos tus datos · ${v.data.producto ?? tienda}` : `Hemos recibido tu solicitud ${publicId} · ${tienda}`,
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
    // La solicitud ya está guardada; el aviso queda en los logs del Worker para revisarlo.
    console.error(`solicitudes: email no enviado (${publicId})`, e);
    if (reclamado) await liberarCorreos(env.DB, publicId).catch(() => undefined);
  }

  return redirect(`/empezar/gracias?id=${encodeURIComponent(publicId)}&tipo=${tipo}`, 303);
};

function escapar(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

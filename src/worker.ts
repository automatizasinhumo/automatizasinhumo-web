import { handle } from '@astrojs/cloudflare/handler';
import { env } from 'cloudflare:workers';
import { sweepStaleNotifications } from './features/email/outbox';
import { releaseExpiredReservations } from './features/orders/reservations';
import { getSetting, getStoreSettings } from './features/settings/db';
import { getEmailProvider } from './features/email';
import { escapeHtml } from './features/email/layout';
import { enviarSeguimientos, enviarVistasPreviasListas } from './features/solicitudes/envio';
import { lanzarProgramados, marcasD1 } from './features/automatizacion/respaldoCron';
import { conciliar, textoAviso } from './features/solicitudes/conciliacion';
import { getConfig } from './config';
import { firmadorDecision } from './features/solicitudes/decision';

/**
 * Worker entrypoint.
 *
 * `fetch` is Astro's, unchanged — this file exists only so the Worker can also
 * export `scheduled`. (Astro's adapter generates the entry otherwise; the
 * wrangler `main` pointing here is what swaps it. See the Cloudflare adapter's
 * custom-entrypoint docs.)
 *
 * WHY a cron at all: every recurring job in minshop was previously driven by
 * incoming traffic — the notification sweep piggybacks on live settlements, and
 * expired inventory holds are released by the NEXT shopper's reservation. That
 * inverts the risk: the quieter the store, the longer a failed confirmation
 * email goes unretried and the longer sold-out-looking stock stays locked. A
 * store with one order a day could sit a full day in that state.
 *
 * Everything here is idempotent and bounded, because a cron can overlap a live
 * request doing the same work: the notification claim is a conditional UPDATE,
 * and reservation release is guarded per row. Nothing below is exclusive to the
 * cron — it is the same code the request paths call, just on a clock.
 */
async function runScheduledSweeps(cuando: Date): Promise<void> {
  const db = env.DB;

  // Inventory first: it needs no configuration and it is the one that silently
  // costs sales, since held stock reads as sold out to every shopper.
  try {
    await releaseExpiredReservations(db, 50);
  } catch (err) {
    console.error('Scheduled reservation sweep failed:', err);
  }

  // Notification retry needs an origin to build order links with, and a cron
  // has no request to take one from. rememberStoreUrl records it from live
  // traffic; until a first order has flowed there is nothing queued to retry
  // anyway, so skipping is correct rather than merely safe. Never guess here —
  // a wrong origin sends real customers dead links.
  try {
    const origin = await getSetting(db, 'store_url');
    if (origin) {
      await sweepStaleNotifications(db, origin);
    }
  } catch (err) {
    console.error('Scheduled notification sweep failed:', err);
  }

  // Vistas previas que la fábrica dejó con «QA ok»: correo de revisión al
  // cliente y estado «vista previa enviada», sin esperar a que David entre.
  // Enlace «Aprobar / Pedir cambios» en los correos: necesita el origen público (lo
  // guarda cada solicitud recibida) y AUTH_SECRET; sin ellos, el correo pide responder.
  const firmar = await getSetting(db, 'store_url').then((o) => firmadorDecision(o, env.AUTH_SECRET)).catch(() => null);
  try {
    await enviarVistasPreviasListas(db, await getEmailProvider(await getStoreSettings(db)), 10, firmar);
  } catch (err) {
    console.error('Scheduled preview email sweep failed:', err);
  }

  // Seguimiento sin respuesta: recordatorio al día 3, espera al día 7 y reseña a la
  // semana de entregar (solo con `resena_url`). Ver enviarSeguimientos.
  try {
    const ajustes = await getStoreSettings(db);
    await enviarSeguimientos(db, await getEmailProvider(ajustes), new Date(), await getSetting(db, 'resena_url'), 10, firmar);
  } catch (err) {
    console.error('Scheduled follow-up email sweep failed:', err);
  }

  // Conciliación de Stripe con pedidos y entregas (C39): una alerta por incidencia
  // al correo del dueño. No-op sin STRIPE_CONCILIACION_KEY (clave restringida, solo lectura).
  try {
    const s = await getStoreSettings(db);
    const para = s.emailNotifyTo || getConfig().email.notifyTo;
    await conciliar(db, env.STRIPE_CONCILIACION_KEY, cuando, async (i) => {
      if (!para) throw new Error('sin destinatario de avisos (email_notify_to)');
      const { asunto, texto } = textoAviso(i);
      const email = await getEmailProvider(s);
      if (!email) throw new Error('sin proveedor de correo');
      await email.send({ to: para, subject: asunto, text: texto, html: `<pre>${escapeHtml(texto)}</pre>`, idempotencyKey: `incidencia/${i.clave}/${i.detalle}` });
    });
  } catch (err) {
    console.error('Scheduled Stripe reconciliation failed:', err instanceof Error ? err.message : 'error');
  }

  // GitHub no dispara los `on: schedule` de este repo; el cron del Worker sí.
  // No-op sin GITHUB_DISPATCH_TOKEN y GITHUB_DISPATCH_REPO (ver respaldoCron.ts).
  try {
    await lanzarProgramados(cuando, env.GITHUB_DISPATCH_TOKEN, env.GITHUB_DISPATCH_REPO, marcasD1(db));
  } catch (err) {
    console.error('Scheduled workflow dispatch failed:', err);
  }
}

export default {
  fetch: handle,

  // Each sweep catches its own errors, so one failing job never strands the
  // others. waitUntil keeps the invocation alive for the whole pass.
  scheduled(controller, _env, ctx) {
    ctx.waitUntil(runScheduledSweeps(new Date(controller.scheduledTime)));
  },
  // Bindings are reached through the `cloudflare:workers` env import (as every
  // other module here does), so the handler itself needs no Env generic.
} satisfies ExportedHandler<Cloudflare.Env>;

import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getConfig } from '../../../config';
import { getEmailProvider } from '../../../features/email';
import { getSetting, getStoreSettings } from '../../../features/settings/db';
import { actualizarBorrador, correoValido, guardarRecuperacion, leerSeguir, recordarBorradores, sinBarraFinal } from '../../../features/servicios/recuperarWeb';
import { jsonLimitado, leerVista, validarBorrador } from '../../../features/servicios/vistaWeb';

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

/** Origen https de la tienda para los enlaces del correo: el ajuste o, si falta, el de la petición. */
async function origen(request: Request): Promise<string | null> {
  const o = sinBarraFinal((await getSetting(env.DB, 'store_url').catch(() => null)) || new URL(request.url).origin);
  return /^https:\/\/[^\s/]+$/.test(o) ? o : null;
}

// POST /api/web/borrador {datos, email, avisos} — «Guardar y seguir luego»: guarda el borrador y
// manda el enlace para seguir. Devuelve el token, con el que el estudio lo va actualizando.
export const POST: APIRoute = async ({ request }) => {
  if (!env.AUTH_SECRET) return json({ ok: false, error: 'no-disponible' }, 503);
  const leido = await jsonLimitado(request);
  if (leido === 'grande') return json({ ok: false, error: 'grande' }, 413);
  const body = leido as { datos?: unknown; email?: unknown; avisos?: unknown } | null;
  const email = correoValido(body?.email);
  if (!email) return json({ ok: false, error: 'email' }, 422);
  const v = validarBorrador(body?.datos);
  if (!v.ok) return json({ ok: false, error: v.error }, 422);
  const g = await guardarRecuperacion(env.DB, env.AUTH_SECRET, v.datos, email, body?.avisos === true);
  if (!g.ok) return json({ ok: false, error: g.error }, g.error === 'grande' ? 413 : 429);
  // El enlace sale ya; si falla, el barrido del cron lo reintenta (paso 0 sin enviar).
  const o = await origen(request);
  if (o) {
    try {
      const correo = await getEmailProvider(await getStoreSettings(env.DB));
      const tienda = (await getSetting(env.DB, 'store_name')) || getConfig().storeName;
      if (correo) await recordarBorradores(env.DB, correo, o, env.AUTH_SECRET, tienda, Date.now(), 1, g.id);
    } catch (err) {
      console.error('Enlace de borrador no enviado:', err instanceof Error ? err.message : 'error');
    }
  }
  return json({ ok: true, token: g.token });
};

// PUT /api/web/borrador {token, datos} — el estudio guarda los cambios en el borrador del enlace.
export const PUT: APIRoute = async ({ request }) => {
  const leido = await jsonLimitado(request);
  if (leido === 'grande') return json({ ok: false, error: 'grande' }, 413);
  const body = leido as { token?: unknown; datos?: unknown } | null;
  const id = await leerSeguir(typeof body?.token === 'string' ? body.token : null, env.AUTH_SECRET);
  if (!id) return json({ ok: false, error: 'enlace' }, 404);
  const v = validarBorrador(body?.datos);
  if (!v.ok) return json({ ok: false, error: v.error }, 422);
  return (await actualizarBorrador(env.DB, id, v.datos)) ? json({ ok: true }) : json({ ok: false, error: 'enlace' }, 404);
};

// GET /api/web/borrador?t=… — los datos del borrador para restaurarlo en el estudio.
export const GET: APIRoute = async ({ url }) => {
  const id = await leerSeguir(url.searchParams.get('t'), env.AUTH_SECRET);
  const datos = id ? await leerVista(env.DB, id) : null;
  return datos ? json({ ok: true, datos }) : json({ ok: false, error: 'enlace' }, 404);
};

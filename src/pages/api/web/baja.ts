import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { escapeHtml } from '../../../features/email/layout';
import { darDeBaja, leerBaja } from '../../../features/servicios/recuperarWeb';

export const prerender = false;

const pagina = (titulo: string, cuerpo: string, status = 200) =>
  new Response(
    `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${escapeHtml(titulo)}</title>` +
      `<style>body{font-family:system-ui,sans-serif;max-width:32rem;margin:4rem auto;padding:0 1rem;line-height:1.5;color:#1c1917}button{font:inherit;padding:.7rem 1.4rem;border-radius:.4rem;border:0;background:#1c1917;color:#fff;cursor:pointer}</style>` +
      `</head><body><h1>${escapeHtml(titulo)}</h1>${cuerpo}</body></html>`,
    { status, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex' } },
  );

// GET /api/web/baja?t=… — página con un botón (abrir el enlace no da de baja: los escáneres de
// correo lo abren solos). POST, el mismo enlace — la baja (One-Click de Gmail/Yahoo o el botón).
export const GET: APIRoute = async ({ url }) => {
  const t = url.searchParams.get('t') ?? '';
  if (!(await leerBaja(t, env.AUTH_SECRET))) return pagina('Enlace no válido', '<p>Este enlace ha caducado o no es correcto.</p>', 404);
  return pagina(
    'Dejar de recibir recordatorios',
    `<p>No te mandaremos más correos sobre la web que dejaste guardada. Tu borrador sigue disponible hasta que caduque.</p><form method="post" action="/api/web/baja?t=${escapeHtml(encodeURIComponent(t))}"><button type="submit">No quiero más recordatorios</button></form>`,
  );
};

export const POST: APIRoute = async ({ url }) => {
  const id = await leerBaja(url.searchParams.get('t'), env.AUTH_SECRET);
  if (!id) return pagina('Enlace no válido', '<p>Este enlace ha caducado o no es correcto.</p>', 404);
  await darDeBaja(env.DB, id);
  return pagina('Hecho', '<p>No recibirás más recordatorios sobre esta web.</p>');
};

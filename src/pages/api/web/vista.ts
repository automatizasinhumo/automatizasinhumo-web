import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { guardarVista, jsonLimitado, validarBorrador } from '../../../features/servicios/vistaWeb';

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

// POST /api/web/vista {datos} — guarda el borrador y devuelve un enlace para enseñarlo (30 días).
export const POST: APIRoute = async ({ request }) => {
  const leido = await jsonLimitado(request);
  if (leido === 'grande') return json({ ok: false, error: 'grande' }, 413);
  const body = leido as { datos?: unknown } | null;
  const v = validarBorrador(body?.datos);
  if (!v.ok) return json({ ok: false, error: v.error }, 422);
  const id = await guardarVista(env.DB, v.datos);
  if (!id) return json({ ok: false, error: 'grande' }, 413);
  return json({ ok: true, url: `/vista/${id}` });
};

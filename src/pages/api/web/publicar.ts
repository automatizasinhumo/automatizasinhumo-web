import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { pedidoWeb } from '../../../features/servicios/pedidoAuto';
import { publicarWeb, validarWeb } from '../../../features/servicios/webs';

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

// POST /api/web/publicar {token, datos} — publica (o actualiza) la web pagada en /w/<slug>.
export const POST: APIRoute = async ({ request }) => {
  const body = (await request.json().catch(() => null)) as { token?: unknown; datos?: unknown } | null;
  const p = await pedidoWeb(env.DB, body?.token);
  if (!p) return json({ ok: false, error: 'pedido' }, 403);
  const v = validarWeb(body?.datos);
  if (!v.ok) return json({ ok: false, error: v.error }, 422);
  const slug = await publicarWeb(env.DB, p.publicId, v.datos);
  return json({ ok: true, slug, url: `/w/${slug}` });
};

import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { pedidoAuto } from '../../../features/servicios/pedidoAuto';
import { publicarTarjeta, validarTarjeta } from '../../../features/servicios/publicados';

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

// POST /api/cv/publicar {token, datos} — publica (o actualiza) la tarjeta pagada en /c/<slug>.
export const POST: APIRoute = async ({ request }) => {
  const body = (await request.json().catch(() => null)) as { token?: unknown; datos?: unknown } | null;
  const p = await pedidoAuto(env.DB, body?.token);
  if (!p?.tarjeta) return json({ ok: false, error: 'pedido' }, 403);
  const v = validarTarjeta(body?.datos);
  if (!v.ok) return json({ ok: false, error: v.error }, 422);
  const slug = await publicarTarjeta(env.DB, p.publicId, v.datos);
  return json({ ok: true, slug, url: `/c/${slug}` });
};

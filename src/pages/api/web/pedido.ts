import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { pedidoWeb } from '../../../features/servicios/pedidoAuto';
import { webDePedido } from '../../../features/servicios/webs';

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

// POST /api/web/pedido {token} — el estudio pregunta si la web está pagada (y si ya se publicó).
// POST y no GET: el token no queda en registros de URL.
export const POST: APIRoute = async ({ request }) => {
  const body = (await request.json().catch(() => null)) as { token?: unknown } | null;
  const p = await pedidoWeb(env.DB, body?.token);
  if (!p) return json({ ok: false }, 404);
  const w = await webDePedido(env.DB, p.publicId);
  return json({ ok: true, ref: p.ref, slug: w?.slug ?? null, datos: w?.datos ?? null });
};

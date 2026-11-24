import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { pedidoAuto } from '../../../features/servicios/pedidoAuto';
import { tarjetaDePedido } from '../../../features/servicios/publicados';

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

// POST /api/cv/pedido {token} — el estudio pregunta qué se pagó para quitar la marca de agua
// y ofrecer la tarjeta. POST y no GET: el token no queda en registros de URL.
export const POST: APIRoute = async ({ request }) => {
  const body = (await request.json().catch(() => null)) as { token?: unknown } | null;
  const p = await pedidoAuto(env.DB, body?.token);
  if (!p) return json({ ok: false }, 404);
  const t = p.tarjeta ? await tarjetaDePedido(env.DB, p.publicId) : null;
  return json({ ok: true, ref: p.ref, cv: p.cv, linkedin: p.linkedin, infojobs: p.infojobs, tarjeta: p.tarjeta ? { slug: t?.slug ?? null, datos: t?.datos ?? null } : null });
};

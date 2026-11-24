import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { versionDePedido, versionesDePedido } from '../../../features/servicios/paginas';
import { pedidoWeb } from '../../../features/servicios/pedidoAuto';
import { publicarWeb, validarWeb } from '../../../features/servicios/webs';

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

// POST /api/web/restaurar {token, id} — vuelve a publicar una versión anterior de la web del pedido.
// Lo que estaba publicado pasa a su vez al historial: restaurar también se puede deshacer.
export const POST: APIRoute = async ({ request }) => {
  const body = (await request.json().catch(() => null)) as { token?: unknown; id?: unknown } | null;
  const p = await pedidoWeb(env.DB, body?.token);
  if (!p) return json({ ok: false, error: 'pedido' }, 403);
  const datos = await versionDePedido(env.DB, 'web', p.publicId, Number(body?.id), validarWeb);
  if (!datos) return json({ ok: false, error: 'version' }, 404);
  const slug = await publicarWeb(env.DB, p.publicId, datos);
  const versiones = await versionesDePedido(env.DB, 'web', p.publicId);
  return json({ ok: true, slug, url: `/w/${slug}`, datos, versiones });
};

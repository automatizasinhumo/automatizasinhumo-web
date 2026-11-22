import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { pedidoWeb } from '../../../features/servicios/pedidoAuto';
import { webDePedido } from '../../../features/servicios/webs';
import { ideasLibres } from '../../../features/servicios/ideasDominio';
import { avanzarDominio, configDominios, dominioDePedido, pedirDominio, type FilaDominio } from '../../../features/servicios/dominios';

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

const vista = (f: FilaDominio | null) =>
  f && {
    dominio: f.dominio,
    estado: f.estado,
    servidores: JSON.parse(f.servidores || '[]') as string[],
    detalle: f.detalle,
  };

const ERRORES = {
  dominio: 'Escribe solo tu dominio, por ejemplo peluquerialola.es (sin www ni subdominios).',
  ocupado: 'Ese dominio ya está conectado a otra web.',
  no_disponible: 'La conexión automática de dominios aún no está activa. Tu web sigue publicada en su dirección.',
  cloudflare: 'No hemos podido añadir el dominio. Vuelve a probar en un rato.',
} as const;

// POST /api/web/dominio {token, dominio?, ideas?}
//  - con `ideas: true`: nombres de dominio libres sacados del negocio (para quien aún no tiene);
//  - con `dominio`: lo añade a Cloudflare y devuelve los servidores DNS que el cliente pone en su registrador;
//  - sin él: estado actual, y da un paso de la conexión (no espera al cron de 5 minutos).
export const POST: APIRoute = async ({ request }) => {
  const body = (await request.json().catch(() => null)) as { token?: unknown; dominio?: unknown; ideas?: unknown } | null;
  const p = await pedidoWeb(env.DB, body?.token);
  if (!p) return json({ ok: false, error: 'pedido' }, 403);
  if (body?.ideas === true) {
    const w = await webDePedido(env.DB, p.publicId);
    const ideas = w ? await ideasLibres(w.datos.negocio, w.datos.direccion) : [];
    return json({ ok: true, ideas });
  }
  const cfg = configDominios(env);
  if (body?.dominio === undefined) {
    let fila = await dominioDePedido(env.DB, 'web', p.publicId);
    if (fila && cfg && fila.estado !== 'activo') fila = await avanzarDominio(env.DB, cfg, fila);
    return json({ ok: true, disponible: !!cfg, dominio: vista(fila) });
  }
  if (!(await webDePedido(env.DB, p.publicId))) return json({ ok: false, error: 'Publica la web antes de conectar tu dominio.' }, 409);
  const r = await pedirDominio(env.DB, cfg, 'web', p.publicId, body.dominio);
  if (!r.ok) {
    const status = r.error === 'dominio' ? 422 : r.error === 'no_disponible' ? 503 : 409;
    return json({ ok: false, error: r.detalle && r.error === 'cloudflare' ? r.detalle : ERRORES[r.error] }, status);
  }
  return json({ ok: true, disponible: true, dominio: vista(r.fila) });
};

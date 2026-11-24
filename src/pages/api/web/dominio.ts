import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { pedidoWeb } from '../../../features/servicios/pedidoAuto';
import { webDePedido } from '../../../features/servicios/webs';
import { ideasDominio, ideasLibres } from '../../../features/servicios/ideasDominio';
import { configRegistrador, cotizarDominios } from '../../../features/servicios/registrador';
import { nsActuales, proveedorDeNs } from '../../../features/servicios/proveedorDns';
import { avanzarDominio, comprarDominio, configDominios, dominioDePedido, esAvisoRegistro, pedirDominio, type FilaDominio } from '../../../features/servicios/dominios';

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
    aviso: f.estado === 'registrando' && esAvisoRegistro(f.detalle) ? f.detalle : null,
    comprado: !!f.registrador,
  };

/** Mientras el cliente tiene que cambiar los DNS, dónde está su dominio (para darle el camino exacto). */
async function vistaCompleta(f: FilaDominio | null) {
  const v = vista(f);
  if (!v || v.estado !== 'esperando_dns' || v.comprado) return v;
  return { ...v, proveedor: proveedorDeNs(await nsActuales(v.dominio)) };
}

const ERRORES = {
  dominio: 'Escribe solo tu dominio, por ejemplo peluquerialola.es (sin www ni subdominios).',
  ocupado: 'Ese dominio ya está conectado a otra web.',
  no_disponible: 'La conexión automática de dominios aún no está activa. Tu web sigue publicada en su dirección.',
  cloudflare: 'No hemos podido añadir el dominio. Vuelve a probar en un rato.',
  no_incluido: 'Ese dominio no se puede contratar incluido. Prueba otra de las ideas.',
  titular: 'Revisa los datos del titular.',
} as const;

const CAMPO: Record<string, string> = {
  nombre: 'Escribe nombre y apellidos del titular.',
  email: 'El correo del titular no es válido.',
  pais: 'Elige el país del titular.',
  telefono: 'El teléfono no es válido (en España, 9 cifras).',
  calle: 'Escribe la dirección (calle y número).',
  ciudad: 'Escribe la ciudad.',
  provincia: 'Escribe la provincia.',
  cp: 'El código postal no es válido (en España, 5 cifras).',
};

/** Candidatos .es y su versión .com: Cloudflare no vende .es, así que el .com es el que se contrata solo. */
function candidatos(negocio: string, direccion: string): string[] {
  const base = ideasDominio(negocio, direccion, 6);
  const com = base.map((d) => d.replace(/\.es$/, '.com'));
  return [...new Set([...base, ...com])].slice(0, 12);
}

// POST /api/web/dominio {token, dominio?, ideas?}
//  - con `ideas: true`: nombres de dominio libres sacados del negocio (para quien aún no tiene);
//  - con `dominio`: lo añade a Cloudflare y devuelve los servidores DNS que el cliente pone en su registrador;
//  - sin él: estado actual, y da un paso de la conexión (no espera al cron de 5 minutos).
export const POST: APIRoute = async ({ request }) => {
  const body = (await request.json().catch(() => null)) as {
    token?: unknown;
    dominio?: unknown;
    ideas?: unknown;
    comprar?: { dominio?: unknown; titular?: unknown };
  } | null;
  const p = await pedidoWeb(env.DB, body?.token);
  if (!p) return json({ ok: false, error: 'pedido' }, 403);
  const cfg = configDominios(env);
  const reg = configRegistrador(cfg, env);
  if (body?.ideas === true) {
    const w = await webDePedido(env.DB, p.publicId);
    if (!w) return json({ ok: true, ideas: [], ofertas: [] });
    // Con el registro activo: dominios que contratamos incluidos con la web, con su precio real.
    let ofertas: { dominio: string; precio: number | null; moneda: string | null }[] = [];
    if (reg) {
      try {
        ofertas = (await cotizarDominios(reg, candidatos(w.datos.negocio, w.datos.direccion)))
          .filter((c) => c.incluido)
          .slice(0, 5)
          .map(({ dominio, precio, moneda }) => ({ dominio, precio, moneda }));
      } catch {
        ofertas = [];
      }
    }
    const ideas = await ideasLibres(w.datos.negocio, w.datos.direccion);
    return json({ ok: true, ideas, ofertas });
  }
  if (body?.comprar && typeof body.comprar === 'object') {
    if (!(await webDePedido(env.DB, p.publicId))) return json({ ok: false, error: 'Publica la web antes de contratar tu dominio.' }, 409);
    const r = await comprarDominio(env.DB, reg, 'web', p.publicId, body.comprar.dominio, body.comprar.titular);
    if (!r.ok) {
      const status = r.error === 'dominio' || r.error === 'titular' ? 422 : r.error === 'no_disponible' ? 503 : 409;
      const error =
        r.error === 'titular' ? (CAMPO[r.detalle ?? ''] ?? ERRORES.titular) : r.detalle && (r.error === 'cloudflare' || r.error === 'no_incluido') ? r.detalle : ERRORES[r.error];
      return json({ ok: false, error, campo: r.error === 'titular' ? r.detalle : undefined }, status);
    }
    return json({ ok: true, disponible: true, dominio: vista(r.fila) });
  }
  if (body?.dominio === undefined) {
    let fila = await dominioDePedido(env.DB, 'web', p.publicId);
    if (fila && cfg && fila.estado !== 'activo') {
      fila = await avanzarDominio(env.DB, cfg, fila);
      // Reserva liberada (Registrar no la conocía): el cliente vuelve a ver las ofertas, con el aviso.
      if (!(await dominioDePedido(env.DB, 'web', p.publicId))) {
        return json({ ok: true, disponible: !!cfg, compra: !!reg, dominio: null, aviso: fila.detalle });
      }
    }
    return json({ ok: true, disponible: !!cfg, compra: !!reg, dominio: await vistaCompleta(fila) });
  }
  if (!(await webDePedido(env.DB, p.publicId))) return json({ ok: false, error: 'Publica la web antes de conectar tu dominio.' }, 409);
  const r = await pedirDominio(env.DB, cfg, 'web', p.publicId, body.dominio);
  if (!r.ok) {
    const status = r.error === 'dominio' ? 422 : r.error === 'no_disponible' ? 503 : 409;
    return json({ ok: false, error: r.detalle && r.error === 'cloudflare' ? r.detalle : ERRORES[r.error] }, status);
  }
  return json({ ok: true, disponible: true, dominio: await vistaCompleta(r.fila) });
};

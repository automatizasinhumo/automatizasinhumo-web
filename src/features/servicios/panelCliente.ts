/**
 * Panel del cliente en /account: sus páginas publicadas (web, tarjeta), con enlace para
 * editarlas en su estudio, su dominio y cuántas visitas han tenido. Todo en el servidor,
 * sin JavaScript en el navegador.
 */
import { getGuestAccess } from '../orders/guestAccess';
import { SLUG_TARJETA, SLUG_WEB, enlaceAutoservicio } from './autoservicio';
import { rutaPagina, type TipoPagina } from './paginas';
import { esBot } from '../embudo';

const SLUG_DE_TIPO: Record<TipoPagina, string> = { web: SLUG_WEB, tarjeta: SLUG_TARJETA };
export const NOMBRE_TIPO: Record<TipoPagina, string> = { web: 'Tu web', tarjeta: 'Tu tarjeta digital' };

export interface PaginaCliente {
  tipo: TipoPagina;
  /** Nombre del negocio o de la persona, para distinguir varias páginas; null si los datos no lo traen. */
  nombre: string | null;
  slug: string;
  ruta: string;
  editar: string | null;
  dominio: string | null;
  actualizada: string;
  visitas7: number;
  visitas30: number;
}

/** Día UTC «AAAA-MM-DD» de hace `n` días. */
export const diaHace = (n: number, hoy = new Date()) => new Date(hoy.getTime() - n * 86_400_000).toISOString().slice(0, 10);

export async function paginasDeCliente(db: D1Database, email: string, hoy = new Date()): Promise<PaginaCliente[]> {
  const { results } = await db
    .prepare(
      `SELECT p.tipo, p.slug, p.pedido_public_id, p.updated_at,
              COALESCE(json_extract(p.datos, '$.negocio'), json_extract(p.datos, '$.nombre')) AS nombre,
              (SELECT d.dominio FROM dominios_paginas d
                WHERE d.tipo = p.tipo AND d.pedido_public_id = p.pedido_public_id AND d.estado = 'activo'
                ORDER BY d.updated_at DESC LIMIT 1) AS dominio,
              COALESCE((SELECT SUM(v.n) FROM paginas_visitas v WHERE v.tipo = p.tipo AND v.slug = p.slug AND v.dia >= ?), 0) AS visitas7,
              COALESCE((SELECT SUM(v.n) FROM paginas_visitas v WHERE v.tipo = p.tipo AND v.slug = p.slug AND v.dia >= ?), 0) AS visitas30
         FROM paginas_publicadas p JOIN orders o ON o.public_id = p.pedido_public_id
        WHERE o.email = ?
        ORDER BY p.updated_at DESC LIMIT 20`,
    )
    .bind(diaHace(6, hoy), diaHace(29, hoy), email)
    .all<{ tipo: string; nombre: unknown; slug: string; pedido_public_id: string; updated_at: string; dominio: string | null; visitas7: number; visitas30: number }>();
  const filas = (results ?? []).filter((r): r is typeof r & { tipo: TipoPagina } => Object.hasOwn(SLUG_DE_TIPO, r.tipo));
  return Promise.all(
    filas.map(async (r) => {
      // Mismo token que el enlace de su correo de pedido: la cuenta es una posición autorizada.
      const acceso = r.pedido_public_id.startsWith('ord_') ? (await getGuestAccess(db, r.pedido_public_id))?.access_token : r.pedido_public_id;
      return {
        tipo: r.tipo,
        nombre: typeof r.nombre === 'string' && r.nombre.trim() ? r.nombre.trim() : null,
        slug: r.slug,
        ruta: rutaPagina(r.tipo, r.slug),
        editar: acceso ? enlaceAutoservicio(SLUG_DE_TIPO[r.tipo], acceso) : null,
        dominio: r.dominio,
        actualizada: r.updated_at,
        visitas7: Number(r.visitas7),
        visitas30: Number(r.visitas30),
      };
    }),
  );
}

/**
 * Suma una visita del día a una página publicada. Sin cookies ni datos de la persona; los robots
 * no cuentan. Nunca rompe la página: un fallo de D1 se anota y ya.
 */
export async function contarVisita(db: D1Database, tipo: TipoPagina, slug: string, ua: string | null, hoy = new Date()) {
  if (esBot(ua)) return;
  try {
    await db
      .prepare('INSERT INTO paginas_visitas (tipo, slug, dia, n) VALUES (?, ?, ?, 1) ON CONFLICT (tipo, slug, dia) DO UPDATE SET n = n + 1')
      .bind(tipo, slug, diaHace(0, hoy))
      .run();
  } catch (e) {
    console.error('Visitas: no se pudo contar', e);
  }
}

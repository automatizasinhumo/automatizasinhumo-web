/**
 * Qué ha pagado un pedido de autoservicio (CV y extras). Lo usan las API del estudio:
 * el token del pedido llega del navegador y aquí se vuelve a verificar contra D1.
 */
import { resolverPedido } from '../solicitudes/pedido';
import { SLUG_CV, SLUG_TARJETA, SLUG_WEB, varianteDeSku } from './autoservicio';

export interface PedidoAuto {
  ref: string;
  publicId: string;
  /** Variante del CV pagada, o null si el pedido no lleva CV. */
  cv: string | null;
  tarjeta: boolean;
}

export async function pedidoAuto(db: D1Database, token: unknown): Promise<PedidoAuto | null> {
  if (typeof token !== 'string' || token.length > 120) return null;
  const [cv, tarjeta] = await Promise.all([resolverPedido(db, token, SLUG_CV), resolverPedido(db, token, SLUG_TARJETA)]);
  const base = cv ?? tarjeta;
  if (!base) return null;
  return {
    ref: base.ref,
    publicId: base.publicId,
    cv: cv ? (varianteDeSku(SLUG_CV, cv.sku) ?? 'disenada') : null,
    tarjeta: Boolean(tarjeta),
  };
}

/** Pedido que lleva la web de una página (estudio /servicios/web). */
export async function pedidoWeb(db: D1Database, token: unknown): Promise<{ ref: string; publicId: string } | null> {
  if (typeof token !== 'string' || token.length > 120) return null;
  const w = await resolverPedido(db, token, SLUG_WEB);
  return w ? { ref: w.ref, publicId: w.publicId } : null;
}

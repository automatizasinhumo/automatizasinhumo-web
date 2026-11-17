// Compra directa: el enlace «Rellenar mis datos» de /order/<token> lleva el token
// de acceso del pedido (?pedido=otk_…). Nunca nos fiamos del parámetro: el pedido
// tiene que existir, estar pagado y sin reembolso total, y contener este servicio.
import { isAccessToken } from '../ids/token';
import { isLegacyPublicId, publicIdToken } from '../ids/publicId';
import { resolveAccessToken } from '../orders/guestAccess';
import { getOrderByPublicId } from '../orders/db';

export interface PedidoVerificado {
  /** Número que ve el cliente (parte del ord_ o el id antiguo). */
  ref: string;
  /** ord_… del pedido, para unir la solicitud en D1. */
  publicId: string;
  /** «Plantilla + guía» | «Te lo montamos» | null si el servicio no tiene modalidades. */
  modalidad: string | null;
  /** Lo pagado por esa línea (precio unitario × cantidad), en céntimos. */
  pagadoCents: number;
  currency: string;
}

/** Etiqueta de variante → modalidad corta que usa el formulario. */
export function modalidadDeEtiqueta(label: string | null | undefined): string | null {
  if (!label) return null;
  const l = label.toLowerCase();
  if (l.includes('montamos')) return 'Te lo montamos';
  if (l.includes('plantilla')) return 'Plantilla + guía';
  return label;
}

export async function resolverPedido(
  db: D1Database,
  token: string | null | undefined,
  slug: string,
): Promise<PedidoVerificado | null> {
  if (!token) return null;
  let publicId: string | null = null;
  if (isAccessToken(token)) publicId = (await resolveAccessToken(db, token))?.order_public_id ?? null;
  else if (isLegacyPublicId(token)) publicId = token;
  if (!publicId) return null;
  const order = await getOrderByPublicId(db, publicId);
  if (!order || order.status !== 'paid') return null;
  if (order.refunded_cents > 0 && order.refunded_cents >= order.amount_total_cents) return null;
  const linea = await db
    .prepare(
      `SELECT oi.price_cents, oi.quantity, v.label AS variante
         FROM order_items oi
         JOIN products p ON p.id = oi.product_id
         LEFT JOIN product_variants v ON v.id = oi.variant_id
        WHERE oi.order_id = ? AND p.slug = ?
        ORDER BY oi.id LIMIT 1`,
    )
    .bind(order.id, slug)
    .first<{ price_cents: number; quantity: number; variante: string | null }>();
  if (!linea) return null;
  return {
    ref: publicIdToken(order.public_id ?? '', 'order') ?? publicId,
    publicId,
    modalidad: modalidadDeEtiqueta(linea.variante),
    pagadoCents: linea.price_cents * linea.quantity,
    currency: order.currency,
  };
}

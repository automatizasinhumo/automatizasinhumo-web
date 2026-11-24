/**
 * Pedidos del estudio de CV que conviven en una pestaña: el del CV y los de extras comprados
 * después (tarjeta, LinkedIn, InfoJobs). Se unen para que volver de pagar un extra no esconda el
 * CV ya pagado (y no se cobre dos veces).
 */
import type { PedidoCargado } from './compraEstudio';
import type { ModalidadCv } from './cv';

export interface PagadoCv<T = unknown> {
  ref: string;
  cv: ModalidadCv | null;
  tarjeta: { slug: string | null; datos: T | null } | null;
  /** Referencia del pedido que pagó la tarjeta: identifica su borrador (no la del CV). */
  refTarjeta?: string;
  linkedin?: boolean;
  infojobs?: boolean;
}

/**
 * Une los pedidos (en orden de llegada). El CV es el de mayor alcance (personalizable sobre
 * diseñada) y su referencia es la que se muestra; los portales se suman; la tarjeta es la del
 * último pedido que la incluye y su token es el elegido, porque publicar la tarjeta exige el token
 * del pedido que la pagó. Sin tarjeta, manda el token del pedido del CV. El borrador de la tarjeta
 * se guarda con `refTarjeta`: con el CV A y la tarjeta B, llegar la tarjeta C no recupera el de B.
 */
export function combinarPedidosCv<T>(pedidos: readonly PedidoCargado<PagadoCv<T>>[]): PedidoCargado<PagadoCv<T>> | null {
  if (!pedidos.length) return null;
  const conCv = pedidos.find((p) => p.d.cv === 'personalizable') ?? pedidos.find((p) => p.d.cv);
  const conTarjeta = pedidos.findLast((p) => p.d.tarjeta);
  const base = conTarjeta ?? conCv ?? pedidos.at(-1)!;
  return {
    token: base.token,
    d: {
      ref: (conCv ?? base).d.ref,
      cv: conCv?.d.cv ?? null,
      tarjeta: conTarjeta?.d.tarjeta ?? null,
      ...(conTarjeta ? { refTarjeta: conTarjeta.d.ref } : {}),
      linkedin: pedidos.some((p) => p.d.linkedin),
      infojobs: pedidos.some((p) => p.d.infojobs),
    },
  };
}

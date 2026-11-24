/**
 * Comparativa de coste del primer año: la web de autoservicio frente a las alternativas habituales
 * en España. Sin precio tachado ni descuento ficticio: precios públicos de referencia (consultados
 * en noviembre de 2026) agrupados por tipo de proveedor, no por marca, para que no caduquen con una oferta.
 */
import { AUTOSERVICIO, SLUG_WEB } from './autoservicio';

export interface Alternativa {
  quien: string;
  /** Alta en céntimos (sin IVA si `masIva`). */
  alta: number;
  /** Cuota mensual en céntimos. */
  mes: number;
  masIva: boolean;
  nota: string;
  nuestra?: boolean;
}

export const CONSULTADO = 'noviembre de 2026';

export function alternativas(): Alternativa[] {
  const precio = AUTOSERVICIO[SLUG_WEB]!.precio ?? 0;
  return [
    { quien: 'Agencia económica (web de una página)', alta: 29_900, mes: 1_500, masIva: true, nota: 'Te la hacen, pero cada cambio pasa por ellos y la cuota no para.' },
    { quien: 'Web exprés con mantenimiento', alta: 9_900, mes: 900, masIva: true, nota: 'Más barata de entrada; la cuota mensual se come la diferencia.' },
    { quien: 'Constructor por cuotas', alta: 0, mes: 179, masIva: false, nota: 'La montas tú desde cero, y el precio de promoción suele subir al renovar.' },
    { quien: 'Aquí', alta: precio, mes: 0, masIva: false, nota: 'Ya sale hecha con los textos de tu sector; la cambias tú cuando quieras.', nuestra: true },
  ];
}

/** Coste del primer año en céntimos: alta + 12 cuotas. */
export const primerAnio = (a: Alternativa) => a.alta + 12 * a.mes;

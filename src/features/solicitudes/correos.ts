/**
 * Correos que David manda al cliente al cambiar el estado de una solicitud.
 * Puro: el admin prepara el texto con datos reales, David lo revisa y lo envía
 * una sola vez (tabla `notificaciones`, migración 0042). Nunca se aprueba,
 * entrega ni cobra nada por silencio: estos correos solo piden o informan.
 */
import type { Estado } from './index';

export const TIPOS_CORREO = [
  'revision',
  'recordatorio',
  'cambios_recibidos',
  'confirmar_aprobacion',
  'espera',
  'falta_informacion',
  'entregado',
] as const;
export type TipoCorreo = (typeof TIPOS_CORREO)[number];

export const TIPO_CORREO_LABEL: Record<TipoCorreo, string> = {
  revision: 'Listo para revisar',
  recordatorio: 'Recordatorio (día 3)',
  cambios_recibidos: 'Cambios recibidos',
  confirmar_aprobacion: 'Confirmar aprobación («me encanta»)',
  espera: 'En espera (día 7 sin respuesta)',
  falta_informacion: 'Falta información',
  entregado: 'Entregado',
};

export function esTipoCorreo(v: unknown): v is TipoCorreo {
  return typeof v === 'string' && (TIPOS_CORREO as readonly string[]).includes(v);
}

/** Correo que toca al pasar a cada estado (null = ese cambio no avisa al cliente). */
export function correoDeEstado(estado: Estado): TipoCorreo | null {
  switch (estado) {
    case 'vista_previa_enviada': return 'revision';
    case 'cambios_pedidos': return 'cambios_recibidos';
    case 'en_espera_cliente': return 'espera';
    case 'entregada': return 'entregado';
    default: return null;
  }
}

export interface DatosCorreo {
  nombre: string;
  servicio: string;
  /** Pedido pagado (compra directa) o prueba gratis. */
  esPedido: boolean;
  pedido?: string | null;
  /** Enlace a la versión para revisar o a la entrega. */
  enlace?: string | null;
  /** Lo que falta, una línea por dato (solo «Falta información»). */
  datosPendientes?: string | null;
}

export type Correo = { ok: true; asunto: string; texto: string } | { ok: false; error: string };

const FIRMA = '— David\nAutomatiza sin humo';

export function prepararCorreo(tipo: TipoCorreo, d: DatosCorreo): Correo {
  const nombre = d.nombre.trim().split(/\s+/)[0] || d.nombre.trim();
  const s = d.servicio;
  const enlace = (d.enlace ?? '').trim();
  const pendientes = (d.datosPendientes ?? '').trim();
  const necesitaEnlace = tipo === 'revision' || tipo === 'entregado';
  if (necesitaEnlace && !/^https?:\/\/\S+$/.test(enlace)) return { ok: false, error: 'Falta el enlace (https://…) a la versión o a la entrega.' };
  if (tipo === 'falta_informacion' && !pendientes) return { ok: false, error: 'Escribe qué datos faltan antes de enviar.' };

  const c = (asunto: string, cuerpo: string): Correo => ({ ok: true, asunto, texto: `${cuerpo}\n\n${FIRMA}` });
  switch (tipo) {
    case 'revision':
      return c(
        `Tu ${s} está listo para revisar`,
        `Hola, ${nombre}:\n\nYa puedes revisar tu ${s}: ${enlace}\n\nÉchale un vistazo y responde a este correo para decirme si te encaja o qué cambiarías. Tienes incluida una ronda de ajustes, que puedes pedir durante los próximos siete días.\n\n` +
          (d.esPedido
            ? 'Si te encaja, responde «Aprobado» y prepararé la entrega definitiva. No tienes que volver a pagar.'
            : 'Si te gusta, te enviaré el enlace para contratarlo. Si no, no pagas nada.'),
      );
    case 'recordatorio':
      return c(
        `¿Has podido revisar tu ${s}?`,
        `Hola, ${nombre}:\n\nTe recuerdo que tu ${s} está listo para revisar${enlace ? `: ${enlace}` : '.'}\n\nSi te encaja, responde «Aprobado». Si quieres cambiar algo, dímelo respondiendo a este correo.`,
      );
    case 'cambios_recibidos':
      return c(
        `He recibido tus cambios · ${s}`,
        `Hola, ${nombre}:\n\nHe recibido los cambios que me has indicado para ${s}. Los revisaré y te confirmaré la fecha de la nueva versión en un día laborable. Te avisaré cuando esté lista.`,
      );
    case 'confirmar_aprobacion':
      return c(
        `¿Damos tu ${s} por aprobado?`,
        `¡Qué bien, ${nombre}!\n\n¿Me confirmas que damos esta versión por aprobada y preparo la entrega definitiva? Basta con responder «Aprobado».`,
      );
    case 'espera':
      return c(
        `Tu ${s} queda en espera`,
        `Hola, ${nombre}:\n\nHace siete días te envié tu ${s} para revisarlo. Si te encaja, responde «Aprobado». Si necesitas algo, escríbeme.\n\nDe momento, el trabajo queda en espera y no realizaré más cambios ni lo daré por aprobado sin tu confirmación.`,
      );
    case 'falta_informacion':
      return c(
        `Nos falta un detalle para preparar tu ${s}`,
        `Hola, ${nombre}:\n\nHe revisado tu solicitud y me falta lo siguiente para continuar:\n\n${pendientes}\n\nPuedes responder directamente a este correo con la información. Si todavía no la tienes, dímelo y vemos cómo seguir.\n\nEl plazo de preparación empezará cuando tengamos los datos necesarios.`,
      );
    case 'entregado':
      return c(
        `Tu ${s} está entregado${d.pedido ? ` · ${d.pedido}` : ''}`,
        `Hola, ${nombre}:\n\nTu ${s} ya está listo para utilizarlo. Accede o descárgalo aquí: ${enlace}\n\nTambién encontrarás las instrucciones para utilizarlo.\n\nGracias por confiar en Automatiza sin humo.`,
      );
  }
}

/** HTML mínimo a partir del texto: escapado, párrafos y enlaces clicables. */
export function correoHtml(texto: string): string {
  const esc = (t: string) => t.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]!);
  return texto
    .split(/\n{2,}/)
    .map((p) => `<p>${esc(p).replace(/https?:\/\/[^\s<]+/g, (u) => `<a href="${u}">${u}</a>`).replace(/\n/g, '<br>')}</p>`)
    .join('');
}

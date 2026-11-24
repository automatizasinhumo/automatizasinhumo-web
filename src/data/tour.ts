/**
 * Manifiesto del tour de bienvenida (docs/antes-de-produccion.md §1).
 * Lo leen el tour (src/features/tour/TourInvitacion.astro) y sus pruebas
 * (tour.test.ts y tests/visual/tour.spec.ts). Cada paso apunta a un bloque marcado con
 * `data-tour="<id>"`: nunca a clases ni a textos, que cambian con el diseño.
 */
export interface PasoTour {
  id: string;
  titulo: string;
  texto: string;
}

/**
 * Claves de las guías de toda la web (src/features/tour/guia.ts). En localStorage, `CLAVE_GUIAS`
 * vale «no» si alguien pulsó «No volver a mostrar»; en sessionStorage, `VISTA_GUIA + clave`
 * marca la pantalla cuya guía ya salió sola en esta visita.
 */
export const CLAVE_GUIAS = 'ash:guias';
export const VISTA_GUIA = 'ash:guia-vista:';
/** Enlace que reabre la guía (pie de página): `/#guia`. */
export const ANCLA_TOUR = 'guia';

export const PASOS_TOUR: readonly PasoTour[] = [
  {
    id: 'vista-previa',
    titulo: 'Mira antes de pagar',
    texto: 'Abre las demos en vivo: así quedan las webs. La tuya la ves gratis antes de pagar.',
  },
  {
    id: 'modalidades',
    titulo: 'Dos formas de empezar',
    texto: 'Elige un servicio con precio cerrado o cuéntanos qué necesitas y te proponemos uno.',
  },
  {
    id: 'buscador',
    titulo: 'Busca por lo que necesitas',
    texto: 'Escribe con tus palabras: «carta QR», «reservas», «que me pidan cita»…',
  },
  {
    id: 'categorias',
    titulo: 'O explora por categorías',
    texto: 'Webs, automatizaciones, traducciones y plantillas, agrupadas por tipo.',
  },
  {
    id: 'servicios',
    titulo: 'Cada servicio, claro',
    texto: 'Precio cerrado, plazo de entrega y qué incluye. Entra en la ficha para ver los detalles.',
  },
  {
    id: 'consulta',
    titulo: '¿No sabes qué elegir?',
    texto: 'Cuéntanos tu caso y te respondemos por email o Telegram. Puedes volver a ver esta guía desde el pie de página.',
  },
];

/** Portada del tema limpio: la que tiene su propia Home.astro. */
export const PASOS_PORTADA_LIMPIO: readonly PasoTour[] = [
  { id: 'empieza', titulo: 'Empieza por aquí', texto: 'Haz el test y te recomendamos el servicio, o mira todos los que hay.' },
  { id: 'atajos', titulo: 'O ve directo', texto: 'Toca un servicio y empiezas a rellenarlo al momento.' },
  { id: 'como-funciona', titulo: 'Así de fácil', texto: 'Eliges, rellenas tus datos y lo ves terminado antes de pagar.' },
];

/** Catálogo (/servicios). */
export const PASOS_SERVICIOS: readonly PasoTour[] = [
  { id: 'familias', titulo: 'Elige una familia', texto: 'Currículum, webs, tarjetas… Toca una y te llevamos a sus servicios.' },
  { id: 'indice', titulo: 'Salta entre familias', texto: 'Esta barra te acompaña al bajar: tócala para cambiar de familia.' },
  { id: 'primera-familia', titulo: 'Entra en un servicio', texto: 'Cada tarjeta trae su precio. Lo rellenas y lo ves antes de pagar.' },
];

/** Guías por pantalla: TourInvitacion recibe la clave y saca de aquí sus pasos. */
export const GUIAS_PANTALLA = {
  portada: PASOS_TOUR,
  'portada-limpio': PASOS_PORTADA_LIMPIO,
  servicios: PASOS_SERVICIOS,
} as const satisfies Record<string, readonly PasoTour[]>;
export type PantallaGuia = keyof typeof GUIAS_PANTALLA;

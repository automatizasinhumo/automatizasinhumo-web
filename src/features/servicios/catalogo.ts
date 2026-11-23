/**
 * Catálogo nuevo (/servicios): servicios agrupados por familia, en el orden en que se
 * lanzan. Fuente única para la página, el menú y la portada: añadir un servicio es
 * añadir una línea aquí, y su color, viñetas y degradado salen de su familia
 * (tokens --ds-familia-<id> del tema), nunca de la página.
 *
 * Un servicio «pronto» se enseña pero no se enlaza: así el cliente ve lo que viene sin
 * acabar en una página a medias.
 */
import { AUTOSERVICIO, SLUG_WEB } from './autoservicio';
import { DISENOS_CV, EXTRAS_CV, PAQUETES_CV, miniaturaCv } from './cv';
import { EJEMPLO_WEB } from './webs';

export type IdFamilia = 'cv' | 'webs' | 'tiendas' | 'reservas' | 'automatizar' | 'eventos';

export interface ServicioCatalogo {
  id: string;
  nombre: string;
  texto: string;
  icono: string;
  /** Lo que recibe, en tres puntos como mucho (viñetas con el color de la familia). */
  puntos: readonly string[];
  /** Solo los disponibles tienen enlace y precio. */
  href?: string;
  /** Precio mínimo en céntimos. */
  desde?: number;
  /** Muestra del producto real en la tarjeta del catálogo (ver Servicios.astro). */
  muestra?: MuestraServicio;
}

/**
 * Lo que se ve en la cabecera de la tarjeta, siempre sacado del producto de verdad:
 * - abanico: miniaturas del propio estudio (las primeras del catálogo de diseños);
 * - tarjeta: la tarjeta de contacto con su QR (vCard) generado en el build;
 * - web: la web de ejemplo pintada con el mismo motor que publica (renderWeb).
 */
export type MuestraServicio =
  | { tipo: 'abanico'; imagenes: readonly string[] }
  | { tipo: 'tarjeta'; nombre: string; cargo: string; telefono: string; email: string }
  | { tipo: 'web'; url: string; datos: typeof EJEMPLO_WEB };

export interface FamiliaCatalogo {
  id: IdFamilia;
  nombre: string;
  /** Una palabra para el filtro de la página. */
  corto: string;
  /** Una frase: qué une a los servicios de la familia. */
  texto: string;
  icono: string;
  servicios: readonly ServicioCatalogo[];
}

const desdeCv = Math.min(PAQUETES_CV.disenada.precio, PAQUETES_CV.personalizable.precio);

export const FAMILIAS: readonly FamiliaCatalogo[] = [
  {
    id: 'cv',
    nombre: 'Currículum y marca personal',
    corto: 'Currículum',
    texto: 'Tu CV y lo que lo acompaña: escribes tus datos una vez y sirven para todo.',
    icono: 'id-badge-2',
    servicios: [
      {
        id: 'cv',
        nombre: 'Currículum con buen diseño',
        texto: 'Eliges un diseño, escribes tus datos y lo ves al momento. Lo descargas en PDF.',
        icono: 'file-text',
        puntos: [`${DISENOS_CV.length} diseños listos o uno a tu gusto`, 'Vista previa mientras escribes', 'PDF listo para enviar'],
        href: '/servicios/cv',
        desde: desdeCv,
        muestra: { tipo: 'abanico', imagenes: DISENOS_CV.slice(0, 3).map((d) => miniaturaCv(d.id)) },
      },
      {
        id: 'tarjeta',
        nombre: 'Tarjeta de visita digital',
        texto: 'Tu contacto en un QR: quien lo escanea te guarda en el móvil con un toque.',
        icono: 'qrcode',
        puntos: ['Con los datos de tu CV', 'Botón «Guardar contacto»', 'QR para imprimir'],
        href: '/servicios/cv#tarjeta',
        desde: EXTRAS_CV[0]!.precio,
        muestra: { tipo: 'tarjeta', nombre: 'Lucía Martín Ortega', cargo: 'Responsable de atención al cliente', telefono: '+34 600 123 456', email: 'lucia.martin@correo.es' },
      },
      {
        id: 'cv-web',
        nombre: 'Tu CV como página web',
        texto: 'Un enlace para LinkedIn y las ofertas, siempre al día con tu CV.',
        icono: 'world-www',
        puntos: ['Dirección propia incluida', 'Se actualiza con tu CV', 'Se ve bien en el móvil'],
      },
      {
        id: 'dominio',
        nombre: 'Tu nombre como dominio',
        texto: 'tunombre.es para tu CV y tu tarjeta, configurado sin que toques nada.',
        icono: 'link',
        puntos: ['Candado https', 'Configuración automática', 'Renovación sin avisos'],
      },
    ],
  },
  {
    id: 'webs',
    nombre: 'Webs',
    corto: 'Webs',
    texto: 'Plantillas que editas tú y se publican solas, con el mismo método que el CV.',
    icono: 'world-www',
    servicios: [
      {
        id: 'web-una-pagina',
        nombre: 'Web de una página',
        texto: 'Quién eres, qué ofreces y cómo contactarte, en una sola página clara.',
        icono: 'browser',
        puntos: ['3 diseños, tu color y tu letra', 'Llamada y WhatsApp a un toque', 'Publicada al momento, alojamiento incluido'],
        href: '/servicios/web',
        desde: AUTOSERVICIO[SLUG_WEB]!.precio,
        muestra: { tipo: 'web', url: 'peluquerialola.es', datos: { ...EJEMPLO_WEB, plantilla: 'salon' } },
      },
      {
        id: 'portafolio',
        nombre: 'Portafolio',
        texto: 'Tus trabajos con fotos grandes y un formulario para que te escriban.',
        icono: 'photo',
        puntos: ['Galería por proyectos', 'Formulario de contacto', 'Tu dominio o dirección incluida'],
      },
      {
        id: 'carta',
        nombre: 'Carta digital con QR',
        texto: 'La carta de tu bar o restaurante en el móvil, con alérgenos y precios.',
        icono: 'tools-kitchen-2',
        puntos: ['QR para las mesas', 'Cambias un precio y se ve al momento', 'Alérgenos por plato'],
      },
    ],
  },
  {
    id: 'tiendas',
    nombre: 'Tiendas online',
    corto: 'Tiendas',
    texto: 'Vende lo tuyo en internet sin pelearte con plataformas ni comisiones raras.',
    icono: 'shopping-bag',
    servicios: [
      { id: 'tienda', nombre: 'Tienda online', texto: 'Tu catálogo con fotos, carrito y pedidos que te llegan al correo.', icono: 'shopping-cart', puntos: ['Fichas con fotos y variantes', 'Pedidos al correo y al móvil', 'Alojamiento incluido'] },
      { id: 'pedido-whatsapp', nombre: 'Catálogo con pedido por WhatsApp', texto: 'El cliente elige y te llega el pedido escrito a tu WhatsApp.', icono: 'package', puntos: ['Sin cuentas ni contraseñas', 'Pedido ya ordenado', 'Ideal para tiendas de barrio'] },
      { id: 'digitales', nombre: 'Venta de productos digitales', texto: 'Plantillas, cursos o PDF que se descargan al momento tras comprar.', icono: 'photo-down', puntos: ['Descarga automática', 'Enlace que caduca', 'Factura sola'] },
    ],
  },
  {
    id: 'reservas',
    nombre: 'Reservas y citas',
    corto: 'Reservas',
    texto: 'Tu agenda abierta las 24 horas: el cliente elige hueco y tú solo atiendes.',
    icono: 'calendar-check',
    servicios: [
      { id: 'citas', nombre: 'Citas para tu negocio', texto: 'Peluquerías, clínicas o talleres: el cliente elige día y hora.', icono: 'calendar-check', puntos: ['Recordatorio antes de la cita', 'Cambia o anula solo', 'Tu agenda en el móvil'] },
      { id: 'mesas', nombre: 'Reservas de mesa', texto: 'Turnos de comida y cena con aforo, sin llamadas en plena hora punta.', icono: 'tools-kitchen-2', puntos: ['Aforo por turno', 'Confirmación al momento', 'Lista del día imprimible'] },
      { id: 'clases', nombre: 'Clases y talleres con plazas', texto: 'Grupos con plazas limitadas y lista de espera automática.', icono: 'chalkboard', puntos: ['Plazas que se descuentan solas', 'Lista de espera', 'Aviso a los apuntados'] },
    ],
  },
  {
    id: 'automatizar',
    nombre: 'Automatizaciones',
    corto: 'Automatizar',
    texto: 'Las tareas que repites cada día, hechas solas mientras tú trabajas.',
    icono: 'route',
    servicios: [
      { id: 'respuestas', nombre: 'Respuestas automáticas a clientes', texto: 'Las preguntas de siempre contestadas al momento, a cualquier hora.', icono: 'message-chatbot', puntos: ['Correo y formulario web', 'Con tus propias respuestas', 'Te avisa si hace falta una persona'] },
      { id: 'documentos', nombre: 'Facturas y documentos solos', texto: 'Presupuestos, facturas y contratos que se rellenan con tus datos.', icono: 'file-invoice', puntos: ['Plantillas con tu marca', 'PDF al correo del cliente', 'Archivo ordenado'] },
      { id: 'formularios', nombre: 'Formularios que llegan a tu hoja', texto: 'Cada contacto o pedido entra ordenado en una hoja de cálculo.', icono: 'forms', puntos: ['Sin copiar a mano', 'Aviso al móvil', 'Resumen semanal'] },
    ],
  },
  {
    id: 'eventos',
    nombre: 'Invitaciones y eventos',
    corto: 'Eventos',
    texto: 'Bodas, cumpleaños y celebraciones con su web, su invitación y sus confirmaciones.',
    icono: 'heart',
    servicios: [
      { id: 'boda', nombre: 'Web de boda', texto: 'Vuestra historia, el lugar, los horarios y la confirmación de invitados.', icono: 'heart', puntos: ['Confirmación con menú', 'Cuenta atrás', 'Mapa y alojamientos'] },
      { id: 'invitacion', nombre: 'Invitación digital', texto: 'Una invitación bonita para mandar por WhatsApp, con su enlace.', icono: 'confetti', puntos: ['Diseños para cada ocasión', 'Confirmación en un toque', 'Lista de asistentes'] },
      { id: 'regalos', nombre: 'Lista de regalos', texto: 'Los invitados eligen y nadie repite regalo.', icono: 'sparkles', puntos: ['Regalos que se tachan solos', 'Mensaje para los novios', 'Enlace en la invitación'] },
    ],
  },
];

/** Enlace a la sección de una familia dentro de /servicios. */
export const hrefFamilia = (id: IdFamilia) => `/servicios#${id}`;

/**
 * Las familias para menús y pies: nombre, frase, icono y sus servicios con enlace (los
 * que aún no están llevan a la sección de su familia y van marcados como «pronto»).
 */
export const familiasMenu = () =>
  FAMILIAS.map((f) => ({
    id: f.id,
    nombre: f.nombre,
    corto: f.corto,
    texto: f.texto,
    icono: f.icono,
    href: hrefFamilia(f.id),
    disponibles: f.servicios.filter(disponible).length,
    servicios: f.servicios.map((s) => ({ text: s.nombre, href: s.href ?? hrefFamilia(f.id), pronto: !s.href })),
  }));

/** Página del catálogo nuevo: a ella llevan «Ver todos los servicios» del tema. */
export const CATALOGO_HREF = '/servicios';

export const disponible = (s: ServicioCatalogo): s is ServicioCatalogo & { href: string } => Boolean(s.href);

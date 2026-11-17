// Demos publicadas en el Worker estático automatizasinhumo-demos.
export const DEMOS_URL = process.env.DEMOS_URL || 'https://automatizasinhumo-demos.davidpd89.workers.dev';

// [slug, repo/subcarpeta, título, producto relacionado]
export const DEMOS = [
  ['boda-blush', 'Poison675__free-wedding-website-templates/blush-modern', 'Web de boda · estilo Blush', 'web-boda-rsvp'],
  ['boda-midnight', 'Poison675__free-wedding-website-templates/midnight-gold', 'Web de boda · estilo Midnight Gold', 'web-boda-rsvp'],
  ['boda-sage', 'Poison675__free-wedding-website-templates/sage-garden', 'Web de boda · estilo Sage Garden', 'invitacion-digital'],
  ['tienda-descargas', 'Vojislav77__digital-downloads-website', 'Tienda de descargas digitales', 'tienda-productos-digitales'],
  ['inmobiliaria', 'arjoonarora__real-estate-website-template', 'Web inmobiliaria con buscador', 'web-inmobiliaria'],
  ['plantillas-eventos', 'micah-masuka__free-website-templates', 'Plantillas: restaurante, negocio, portfolio, invitaciones…', 'web-una-pagina'],
  ['carta-whatsapp', 'Shahabuddin-mahar__whatsapp-restaurant-qr-menu', 'Carta QR con pedido por WhatsApp', 'carta-pedidos-whatsapp'],
  ['testimonios', 'jhodges3401-code__kudoshelf-lite', 'Muro de testimonios', 'muro-testimonios'],
  ['plantillas-negocio', 'mmrahmanbappi__100-free-html-templates', '100 plantillas por sector', 'web-corporativa-5-secciones'],
  ['plantillas-bootstrap', 'ColorlibHQ__bootstrap-templates', 'Plantillas de estilo clásico', 'web-corporativa-5-secciones'],
  ['editor-bloques', 'givanz__VvvebJs', 'Editor de bloques: pruébalo en el navegador', 'web-editable-visual'],
];

// Demos que se pueden usar de verdad (no solo mirar). El resto son «diseños de ejemplo»:
// enseñan un estilo, no la funcionalidad. La ficha las separa para no confundir.
export const INTERACTIVAS = new Set(['editor-bloques', 'carta-whatsapp', 'testimonios']);

// Demos adicionales por producto: [ruta dentro del worker de demos, título].
const N = 'plantillas-negocio', E = 'plantillas-eventos/templates', BS = 'plantillas-bootstrap';
export const EXTRA = {
  'carta-qr': [['carta-whatsapp', 'Carta QR con pedido por WhatsApp'], [`${N}/restaurant/restaurant`, 'Restaurante'], [`${N}/restaurant/cafe-coffee-shop`, 'Cafetería'], [`${N}/restaurant/bar-lounge`, 'Bar de copas']],
  'reservas-restaurante': [[`${N}/restaurant/restaurant`, 'Web de restaurante'], [`${N}/restaurant/pizza-delivery`, 'Pizzería a domicilio']],
  'asistente-ia-pedidos': [[`${N}/restaurant/food-truck`, 'Food truck'], ['carta-whatsapp', 'Carta con pedido por WhatsApp']],
  'web-una-pagina': [[`${N}/health-fitness/spa-salon`, 'Peluquería y spa'], [`${E}/business-template`, 'Negocio local'], [`${N}/landing-pages/product-launch`, 'Lanzamiento de producto']],
  'web-corporativa-5-secciones': [[`${N}/business/consulting-firm`, 'Consultoría'], [`${N}/business/creative-agency`, 'Agencia creativa'], [`${BS}/atelier`, 'Atelier'], [`${BS}/ironworks`, 'Ironworks']],
  'web-taller': [[`${N}/local-services/auto-repair`, 'Taller mecánico'], [`${N}/local-services/plumber-home-services`, 'Fontanería'], [`${N}/local-services/cleaning-company`, 'Limpiezas']],
  'pagina-citas': [[`${N}/health-fitness/physiotherapy`, 'Fisioterapia'], [`${N}/health-fitness/dental-clinic`, 'Clínica dental'], [`${N}/health-fitness/nutritionist`, 'Nutricionista']],
  'reservas-salon': [[`${N}/health-fitness/spa-salon`, 'Peluquería y spa'], [`${N}/health-fitness/yoga-studio`, 'Estudio de yoga'], [`${N}/health-fitness/gym-fitness`, 'Gimnasio']],
  'web-inmobiliaria': [[`${N}/real-estate-travel/real-estate-agency`, 'Agencia inmobiliaria'], [`${N}/real-estate-travel/vacation-rental`, 'Alquiler vacacional']],
  'portfolio-editable': [[`${E}/portfolio-template`, 'Portfolio sencillo'], [`${N}/portfolio/photographer-portfolio`, 'Fotógrafo'], [`${N}/portfolio/architect-portfolio`, 'Arquitecto']],
  'cv-profesional': [[`${N}/portfolio/resume-cv`, 'Currículum web']],
  'link-in-bio': [[`${N}/landing-pages/link-in-bio`, 'Página de enlaces']],
  'lista-espera': [[`${N}/landing-pages/coming-soon`, 'Próximamente'], [`${N}/landing-pages/webinar-signup`, 'Inscripción a webinar']],
  'web-boda-rsvp': [[`${E}/rsvp-only`, 'Solo confirmación de asistencia'], [`${N}/events-community/wedding`, 'Boda clásica']],
  'invitacion-digital': [[`${E}/weekend-itinerary`, 'Itinerario de fin de semana']],
  'gestion-invitados-mesas': [[`${E}/rsvp-only`, 'Confirmación de asistencia'], [`${E}/registry-template`, 'Lista de regalos']],
  'galeria-privada-evento': [[`${N}/portfolio/photographer-portfolio`, 'Galería de fotógrafo']],
  'tienda-online': [[`${N}/ecommerce/fashion-store`, 'Tienda de moda'], [`${N}/ecommerce/cosmetics-skincare-store`, 'Cosmética'], [`${N}/ecommerce/single-product-store`, 'Tienda de un producto']],
  'tienda-productos-digitales': [[`${N}/landing-pages/ebook-download`, 'Descarga de ebook']],
  'web-wordpress': [[`${N}/business/corporate-company`, 'Empresa'], [`${N}/portfolio/writer-blogger`, 'Blog personal']],
  'web-blog-astro': [[`${N}/portfolio/writer-blogger`, 'Blog personal']],
  'web-multidioma': [[`${N}/real-estate-travel/hotel-resort`, 'Hotel'], [`${N}/real-estate-travel/tour-guide`, 'Guía turístico']],
  'auto-resenas': [['testimonios', 'Muro de testimonios']],
  'web-arrastrar-soltar': [['editor-bloques', 'Editor de bloques: pruébalo en el navegador']],
};

// tipo: 'interactiva' (se usa) | 'diseno' (se mira). La raíz de la ruta decide.
const tipo = (path) => (INTERACTIVAS.has(path.split('/')[0]) ? 'interactiva' : 'diseno');
export function demosDe(slugProducto) {
  // Primero las demos concretas (EXTRA); las colecciones de plantillas, al final.
  const out = (EXTRA[slugProducto] ?? []).map(([path, titulo]) => ({ url: `${DEMOS_URL}/${path}/`, titulo, tipo: tipo(path) }));
  for (const d of DEMOS.filter((d) => d[3] === slugProducto)) out.push({ url: `${DEMOS_URL}/${d[0]}/`, titulo: d[2], tipo: tipo(d[0]) });
  return out;
}

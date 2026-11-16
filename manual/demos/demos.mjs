// Demos publicadas en el Worker estático automatizasinhumo-demos.
export const DEMOS_URL = process.env.DEMOS_URL || 'https://automatizasinhumo-demos.davidpd89.workers.dev';

// [slug, repo/subcarpeta, título, producto relacionado]
export const DEMOS = [
  ['boda-blush', 'Poison675__free-wedding-website-templates/blush-modern', 'Web de boda · estilo Blush', 'web-boda-rsvp'],
  ['boda-midnight', 'Poison675__free-wedding-website-templates/midnight-gold', 'Web de boda · estilo Midnight Gold', 'web-boda-rsvp'],
  ['boda-sage', 'Poison675__free-wedding-website-templates/sage-garden', 'Web de boda · estilo Sage Garden', 'invitacion-digital'],
  ['tienda-descargas', 'Vojislav77__digital-downloads-website', 'Tienda de descargas digitales', 'tienda-productos-digitales'],
  ['inmobiliaria', 'arjoonarora__real-estate-website-template', 'Web inmobiliaria con buscador', 'web-inmobiliaria'],
  ['plantillas-eventos', 'micah-masuka__free-website-templates', 'Plantillas: restaurante, negocio, portfolio, RSVP…', 'web-una-pagina'],
  ['carta-whatsapp', 'Shahabuddin-mahar__whatsapp-restaurant-qr-menu', 'Carta QR con pedido por WhatsApp', 'carta-pedidos-whatsapp'],
  ['testimonios', 'jhodges3401-code__kudoshelf-lite', 'Muro de testimonios', 'muro-testimonios'],
  ['plantillas-negocio', 'mmrahmanbappi__100-free-html-templates', '100 plantillas por sector', 'web-corporativa-5-secciones'],
  ['plantillas-bootstrap', 'ColorlibHQ__bootstrap-templates', 'Plantillas Bootstrap (Colorlib)', 'web-corporativa-5-secciones'],
];

// Demos adicionales que encajan con otros productos.
export const EXTRA = {
  'carta-qr': ['carta-whatsapp', 'plantillas-eventos/restaurant-template'],
  'gestion-invitados-mesas': ['plantillas-eventos/rsvp-only'],
  'portfolio-editable': ['plantillas-eventos/portfolio-template'],
  'web-taller': ['plantillas-negocio'],
  'web-editable-visual': ['plantillas-bootstrap'],
  'auto-plantilla-medida': ['plantillas-negocio'],
  'auto-resenas': ['testimonios'],
};

export function demosDe(slugProducto) {
  const out = DEMOS.filter((d) => d[3] === slugProducto).map((d) => ({ url: `${DEMOS_URL}/${d[0]}/`, titulo: d[2] }));
  for (const path of EXTRA[slugProducto] ?? []) {
    const d = DEMOS.find((x) => x[0] === path.split('/')[0]);
    out.push({ url: `${DEMOS_URL}/${path}/`, titulo: path.includes('/') ? `${d[2].split(':')[0]} · ${path.split('/')[1].replace(/-template$/, '').replace(/-/g, ' ')}` : d[2] });
  }
  return out;
}

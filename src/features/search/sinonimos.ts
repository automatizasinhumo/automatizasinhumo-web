import { stemSpanishTerm, tokenizeSearchTerms } from './stemmer';

// Sinónimos de búsqueda: cómo lo dice el cliente → palabra que aparece en las fichas.
const SINONIMOS: Record<string, string> = {
  restaurante: 'carta', bar: 'carta', cafeteria: 'carta', cafetería: 'carta', menu: 'carta', hosteleria: 'carta', hostelería: 'carta',
  peluqueria: 'reservas', peluquería: 'reservas', estetica: 'reservas', clínica: 'reservas', clinica: 'reservas', dentista: 'reservas', fisio: 'reservas',
  cita: 'citas', agenda: 'citas', calendly: 'citas', turnos: 'citas',
  boda: 'boda', invitados: 'boda', evento: 'evento', bautizo: 'evento', comunion: 'evento',
  chatbot: 'bot', chat: 'bot', ia: 'IA', gpt: 'IA', chatgpt: 'IA', inteligencia: 'IA',
  landing: 'web', pagina: 'web', website: 'web', sitio: 'web', blog: 'blog',
  ecommerce: 'tienda', shop: 'tienda', vender: 'tienda', cobrar: 'tienda',
  qr: 'QR', enlaces: 'enlaces', linktree: 'enlaces', bio: 'enlaces',
  factura: 'facturas', presupuesto: 'facturas', pdf: 'PDF', contrato: 'documentos',
  correo: 'email', mail: 'email', newsletter: 'email', boletin: 'email',
  automatizar: 'automatización', automatico: 'automatización', zapier: 'automatización', n8n: 'automatización',
  resenas: 'reseñas', opiniones: 'reseñas', google: 'reseñas',
  instagram: 'redes', redes: 'redes', tiktok: 'redes', carrusel: 'carruseles',
  formulario: 'formulario', encuesta: 'formulario', leads: 'captación', clientes: 'captación',
  inmobiliaria: 'inmobiliaria', pisos: 'inmobiliaria', taller: 'taller', mecanico: 'taller',
  cv: 'CV', curriculum: 'CV', tarjeta: 'tarjeta', portfolio: 'portfolio',
  cookies: 'cookies', rgpd: 'cookies', analitica: 'analítica', estadisticas: 'analítica',
  telegram: 'Telegram', whatsapp: 'WhatsApp',
};

const SINONIMOS_POR_LEMA = new Map(
  Object.entries(SINONIMOS).map(([term, synonym]) => [stemSpanishTerm(term), synonym]),
);

/** Devuelve la consulta con sinónimos sustituidos, o null si no cambia nada. */
export function expandirSinonimos(q: string): string | null {
  let cambia = false;
  const out = q.split(/\s+/).map((w) => {
    const lema = stemSpanishTerm(w);
    const s = SINONIMOS_POR_LEMA.get(lema);
    if (s && stemSpanishTerm(s) !== lema) { cambia = true; return s; }
    return w;
  });
  return cambia ? out.join(' ') : null;
}

/** Búsquedas populares que se muestran como atajos en /search. */
export const POPULARES = ['web', 'carta QR', 'reservas', 'boda', 'bot IA', 'tienda', 'facturas', 'reseñas'];

// Palabras del cliente → categoría del menú, para ofrecer «Ver todo en …» encima de
// los resultados («boda» lleva a Bodas y eventos aunque un dossier mencione bodas).
const CATEGORIA_DE: Record<string, string> = {
  boda: 'bodas', evento: 'bodas', invitado: 'bodas', bautizo: 'bodas', comunion: 'bodas', fiesta: 'bodas',
  restaurante: 'hosteleria', bar: 'hosteleria', cafeteria: 'hosteleria', cafetería: 'hosteleria', carta: 'hosteleria', menu: 'hosteleria', hosteleria: 'hosteleria', hostelería: 'hosteleria',
  reserva: 'reservas', cita: 'reservas', peluqueria: 'reservas', peluquería: 'reservas', estetica: 'reservas', clinica: 'reservas', agenda: 'reservas',
  web: 'webs', pagina: 'webs', landing: 'webs',
  bot: 'bots', chatbot: 'bots', ia: 'bots',
  tienda: 'tiendas', vender: 'tiendas',
  cv: 'identidad', curriculum: 'identidad', tarjeta: 'identidad',
  automatizacion: 'automatizaciones', automatizar: 'automatizaciones',
  pdf: 'documentos', factura: 'documentos', documento: 'documentos',
  formulario: 'captacion', encuesta: 'captacion',
  redes: 'contenido', instagram: 'contenido', carrusel: 'contenido',
  qr: 'enlaces', enlace: 'enlaces',
};

const CATEGORIA_POR_LEMA = new Map(
  Object.entries(CATEGORIA_DE).map(([term, slug]) => [stemSpanishTerm(term), slug]),
);

/** Slugs de categoría que encajan con la consulta, sin repetir y en orden de aparición. */
export function categoriasPara(q: string): string[] {
  const out: string[] = [];
  for (const word of tokenizeSearchTerms(q)) {
    const slug = CATEGORIA_POR_LEMA.get(stemSpanishTerm(word));
    if (slug && !out.includes(slug)) out.push(slug);
  }
  return out;
}

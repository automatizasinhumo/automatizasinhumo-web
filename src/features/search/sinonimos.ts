import { stemSpanishTerm, tokenizeSearchTerms } from './stemmer';

// Sinónimos de búsqueda: cómo lo dice el cliente → palabra que aparece en las fichas.
const SINONIMOS: Record<string, string> = {
  restaurante: 'carta', bar: 'carta', cafeteria: 'carta', cafetería: 'carta', menu: 'carta', hosteleria: 'carta', hostelería: 'carta',
  peluqueria: 'reservas', peluquería: 'reservas', estetica: 'reservas', clínica: 'reservas', clinica: 'reservas', fisio: 'reservas',
  // Profesiones sanitarias → «clínica», que nombra la ficha de reservas (con «reservas»,
  // «web para dentista» daba la web de taller «con reserva de citas»).
  dentista: 'clinica', medico: 'clinica', veterinario: 'clinica', podologo: 'clinica', nutricionista: 'clinica',
  cita: 'citas', agenda: 'citas', calendly: 'citas', turnos: 'citas',
  boda: 'boda', invitados: 'boda', evento: 'evento', bautizo: 'evento', comunion: 'evento',
  chatbot: 'chat', asistente: 'chat', ia: 'IA', gpt: 'IA', chatgpt: 'IA', inteligencia: 'IA',
  landing: 'web', pagina: 'web', website: 'web', sitio: 'web', blog: 'blog',
  ecommerce: 'tienda', shop: 'tienda', vender: 'tienda', cobrar: 'tienda',
  // «que me paguen online»: sin esto, «paguen» busca el prefijo «pag*» y casa con «página».
  pagar: 'tienda', pago: 'tienda', pagos: 'tienda', cobros: 'tienda',
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
  fisioterapeuta: 'reservas', fisioterapia: 'reservas', psicologo: 'citas', masajes: 'reservas', centro: 'reservas',
  testimonios: 'opiniones', valoraciones: 'opiniones', logotipo: 'logo', page: 'web',
  ingles: 'idioma', traduccion: 'idioma', traducir: 'idioma', idiomas: 'idioma',
  lenta: 'velocidad', rapida: 'velocidad', posicionamiento: 'SEO',
  marketing: 'newsletter', caida: 'cae', caido: 'cae', manual: 'ayuda', area: 'portal', intranet: 'portal',
  ebook: 'ebooks', hosting: 'alojamiento', servidor: 'alojamiento',
  // «Que me llamen / me escriban»: lo que hace la ficha es recoger el contacto.
  llamar: 'contacto', llamada: 'contacto', escriban: 'contacto', contacten: 'contacto',
  // Despachos y servicios profesionales: web corporativa; oficios: web de negocio.
  abogado: 'corporativa', abogada: 'corporativa', despacho: 'corporativa', asesoria: 'corporativa',
  gestoria: 'corporativa', consultoria: 'corporativa', notaria: 'corporativa', empresa: 'corporativa',
  fontanero: 'negocio', electricista: 'negocio', autonomo: 'negocio', reformas: 'negocio', pintor: 'negocio',
};

/**
 * Términos de SINONIMOS agrupados por lema. Snowball junta a veces palabras que no tienen
 * nada que ver («pagar», «pago» y «page» dan `pag`): sin agrupar, la última entrada del
 * diccionario pisaba a las demás y «pagar» buscaba «web».
 */
export function gruposPorLema(): Map<string, Map<string, string[]>> {
  const grupos = new Map<string, Map<string, string[]>>();
  for (const [term, synonym] of Object.entries(SINONIMOS)) {
    const lema = stemSpanishTerm(term);
    const porSinonimo = grupos.get(lema) ?? new Map<string, string[]>();
    porSinonimo.set(synonym, [...(porSinonimo.get(synonym) ?? []), term]);
    grupos.set(lema, porSinonimo);
  }
  return grupos;
}

// Un lema compartido va al sinónimo con más términos («pag» → tienda: pagar, pago, pagos
// frente a page). La palabra exacta siempre gana, así que «page» sigue buscando «web».
const SINONIMOS_POR_LEMA = new Map(
  [...gruposPorLema()].map(([lema, porSinonimo]) => [
    lema,
    [...porSinonimo].sort((x, y) => y[1].length - x[1].length)[0][0],
  ]),
);

const sinTildes = (w: string) => w.normalize('NFD').replace(/\p{M}/gu, '');

/**
 * Lemas con los que se busca una palabra en los diccionarios: el suyo y el del
 * singular, porque Snowball deja algunos plurales enteros («webs» → «webs»).
 */
function lemas(word: string): string[] {
  const lema = stemSpanishTerm(word);
  return word.length > 3 && word.endsWith('s') ? [lema, stemSpanishTerm(word.slice(0, -1))] : [lema];
}

/** Devuelve la consulta con sinónimos sustituidos, o null si no cambia nada. */
export function expandirSinonimos(q: string): string | null {
  let cambia = false;
  const out = q.split(/\s+/).map((w) => {
    // «intranet,» busca «intranet»: la puntuación de los extremos no forma parte del lema.
    const palabra = w.toLowerCase().replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '');
    const exacta = Object.hasOwn(SINONIMOS, sinTildes(palabra)) ? SINONIMOS[sinTildes(palabra)] : undefined;
    const lema = palabra ? lemas(palabra).find((l) => SINONIMOS_POR_LEMA.has(l)) : undefined;
    const s = exacta ?? (lema ? SINONIMOS_POR_LEMA.get(lema) : undefined);
    if (s && lema && stemSpanishTerm(s) !== lema) { cambia = true; return s; }
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
  reserva: 'reservas', cita: 'reservas', peluqueria: 'reservas', peluquería: 'reservas', estetica: 'reservas', clinica: 'reservas', agenda: 'reservas', dentista: 'reservas',
  web: 'webs', pagina: 'webs', landing: 'webs',
  bot: 'bots', chatbot: 'bots', chat: 'bots', asistente: 'bots', ia: 'bots',
  contacto: 'captacion', llamar: 'captacion', llamada: 'captacion',
  tienda: 'tiendas', vender: 'tiendas', cobrar: 'tiendas', pagar: 'tiendas', pago: 'tiendas',
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
    const lema = lemas(word).find((l) => CATEGORIA_POR_LEMA.has(l));
    const slug = lema ? CATEGORIA_POR_LEMA.get(lema) : undefined;
    if (slug && !out.includes(slug)) out.push(slug);
  }
  return out;
}

/** Palabras que el buscador entiende sin estar en las fichas (para corregir erratas). */
export function vocabularioConsultas(): string[] {
  return [...Object.keys(SINONIMOS), ...Object.keys(CATEGORIA_DE)];
}

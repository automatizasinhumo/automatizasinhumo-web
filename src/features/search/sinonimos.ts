// Sinónimos de búsqueda: cómo lo dice el cliente → palabra que aparece en las fichas.
// Se usan solo cuando la búsqueda literal no da resultados (antes de la corrección de erratas).
const SINONIMOS: Record<string, string> = {
  restaurante: 'carta', bar: 'carta', cafeteria: 'carta', menu: 'carta', hosteleria: 'carta',
  peluqueria: 'reservas', estetica: 'reservas', clinica: 'reservas', dentista: 'reservas', fisio: 'reservas',
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

const plano = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

/** Devuelve la consulta con sinónimos sustituidos, o null si no cambia nada. */
export function expandirSinonimos(q: string): string | null {
  let cambia = false;
  const out = q.split(/\s+/).map((w) => {
    const s = SINONIMOS[plano(w).replace(/s$/, '')] ?? SINONIMOS[plano(w)];
    if (s && plano(s) !== plano(w)) { cambia = true; return s; }
    return w;
  });
  return cambia ? out.join(' ') : null;
}

/** Búsquedas populares que se muestran como atajos en /search. */
export const POPULARES = ['web', 'carta QR', 'reservas', 'boda', 'bot IA', 'tienda', 'facturas', 'reseñas'];

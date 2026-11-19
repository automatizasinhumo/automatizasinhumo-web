// Puerta de lanzamiento (ronda 18, «LaunchGate/FirstClick»): una web de negocio local se
// entrega para que la llamen, le escriban o le reserven. Un tel: mal escrito, un WhatsApp sin
// prefijo de país o un botón de contacto que en el móvil queda bajo el pliegue rompen
// justo eso, y ninguna otra prueba lo ve: el enlace «funciona» pero no llama a nadie.
// Funciones puras (sin navegador) para que el criterio se pruebe en Node; qa/funcional.mjs
// las aplica a lo que ve Chromium.

/** Cifras de un tel:, sin separadores visuales («+34 986 00 00 00» -> «+34986000000»). */
export function cifrasTel(href) {
  let n = href.replace(/^tel:/i, '').split(/[;,?]/)[0];
  try {
    n = decodeURIComponent(n);
  } catch {
    /* un % suelto se queda tal cual y no pasará la validación */
  }
  return n.replace(/[\s.\-()/]/g, '');
}

/**
 * Problema de un enlace de contacto (null = bien o no es de contacto).
 * - tel: de 9 a 15 cifras, con «+» solo al principio (E.164 admite 15; en España son 9).
 * - wa.me/NÚMERO: solo cifras y con prefijo de país (10-15); «wa.me/600…» sin 34 no abre el chat.
 * - api.whatsapp.com/send?phone=: lo mismo.
 * - mailto: con algo@dominio.tld.
 */
export function problemaContacto(href) {
  if (typeof href !== 'string') return null;
  const h = href.trim();
  if (/^tel:/i.test(h)) {
    const n = cifrasTel(h);
    if (!/^\+?\d{9,15}$/.test(n)) return `teléfono no válido: ${h.slice(0, 60)}`;
    return null;
  }
  if (/^mailto:/i.test(h)) {
    let dir = h.slice(7).split('?')[0];
    try {
      dir = decodeURIComponent(dir);
    } catch {
      /* se valida tal cual */
    }
    if (!dir.split(',').every((d) => /^[^\s@<>]+@[^\s@<>]+\.[a-z]{2,}$/i.test(d.trim()))) return `correo no válido: ${h.slice(0, 60)}`;
    return null;
  }
  let u;
  try {
    u = new URL(h);
  } catch {
    return null;
  }
  const host = u.hostname.replace(/^www\./, '').toLowerCase();
  let numero = null;
  if (host === 'wa.me') numero = u.pathname.slice(1).replace(/\/$/, '');
  else if (host === 'api.whatsapp.com' || host === 'whatsapp.com') numero = u.searchParams.get('phone');
  else return null;
  // wa.me/message/XXXX es un enlace corto de WhatsApp Business: válido sin número.
  if (host === 'wa.me' && /^message\/[A-Z0-9]+$/i.test(numero)) return null;
  if (numero === null || numero === '') return null; // «wa.me/?text=» deja elegir contacto: no es un error
  if (!/^\d{10,15}$/.test(numero)) return `WhatsApp no válido (solo cifras, con prefijo de país): ${h.slice(0, 70)}`;
  return null;
}

// Lo que un visitante de un negocio local busca primero: llamar, escribir, reservar, pedir cita.
const TEXTO_CTA = /\b(llam|reserv|cita|contact|whats|presupuest|pide|pedir|escr[ií]b|inscr[ií]b|apúntate|apuntate|consulta|confirma|rsvp|asist|compra|encarg|visítanos|visitanos|cómo llegar|como llegar)/i;
const HREF_CTA = /^(tel:|mailto:|sms:)|(\/\/(wa\.me|api\.whatsapp\.com)\/)|#(contact|reserv|cita|rsvp|presupuesto|pedido|inscrip)|\/(contact|reserv|cita|pedir|presupuesto|rsvp)/i;

/** ¿Este enlace o botón es una llamada a la acción de contacto? */
export function esCta({ texto = '', href = '' } = {}) {
  return HREF_CTA.test(href) || TEXTO_CTA.test(texto);
}

/**
 * Problemas de indexación para una web que se publica (no para la vista previa, que va
 * con noindex a propósito): noindex en meta o cabecera, y canonical que no apunta a sí misma.
 */
export function problemasIndexacion({ url, robotsMeta = [], robotsCabecera = '', canonicals = [] }) {
  const out = [];
  if ([...robotsMeta, robotsCabecera].some((r) => /\b(noindex|none)\b/i.test(r ?? ''))) out.push('la página lleva noindex (Google no la mostrará)');
  if (canonicals.length > 1) out.push(`varias etiquetas canonical (${canonicals.length})`);
  if (canonicals.length === 1) {
    const sin = (x) => {
      const v = new URL(x, url);
      v.hash = '';
      return v.href.replace(/\/$/, '');
    };
    try {
      if (sin(canonicals[0]) !== sin(url)) out.push(`canonical apunta a otra URL: ${canonicals[0].slice(0, 100)}`);
    } catch {
      out.push(`canonical no válido: ${String(canonicals[0]).slice(0, 100)}`);
    }
  }
  return out;
}

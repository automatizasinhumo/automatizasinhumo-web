/**
 * Web de una página hecha por el cliente en el estudio (/servicios/web) y publicada en
 * /w/<slug> en cuanto el pedido está pagado. Un solo modelo para las dos caras:
 *  - el estudio pinta la vista previa con `renderWeb` (con marca de agua) dentro de un Shadow DOM;
 *  - el servidor sirve la publicada con `documentoWeb` (sin marca), a partir de los datos
 *    validados por `validarWeb`, el mismo validador que se aplica al publicar y al leer.
 * Sin DOM: lo importan el navegador, la API y la página pública (D1 solo en las tres
 * funciones de publicación del final, que el navegador no usa).
 *
 * Plantillas = solo CSS sobre el mismo HTML. Añadir una es añadir su entrada en PLANTILLAS_WEB
 * y su bloque `.w-<id>` en CSS_WEB; el formulario, la validación y la publicación no cambian.
 */
import {
  COLOR_VALIDO,
  EMAIL,
  TELEFONO,
  paginaDePedido,
  paginaPorSlug,
  parrafos,
  publicarPagina,
  texto,
  urlSegura,
  type PaginaPublicada,
} from './paginas';

export const PLANTILLAS_WEB = [
  { id: 'clara', nombre: 'Clara', descripcion: 'Fondo blanco y tu color en los botones. Sobria y luminosa.' },
  { id: 'banda', nombre: 'Banda', descripcion: 'Portada a todo color y servicios en tarjetas. Llama la atención.' },
  { id: 'noche', nombre: 'Noche', descripcion: 'Fondo oscuro con tu color de acento. Elegante y moderna.' },
] as const;
export type IdPlantillaWeb = (typeof PLANTILLAS_WEB)[number]['id'];

/** Letras del sistema: cargan al instante y no dependen de ningún servicio externo. */
export const LETRAS_WEB = [
  {
    id: 'moderna',
    nombre: 'Moderna',
    descripcion: 'Limpia y fácil de leer',
    titulo: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    texto: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  },
  {
    id: 'clasica',
    nombre: 'Clásica',
    descripcion: 'Títulos con serifa, de toda la vida',
    titulo: "Georgia, 'Times New Roman', serif",
    texto: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  },
  {
    id: 'elegante',
    nombre: 'Elegante',
    descripcion: 'Serifa fina en títulos y texto',
    titulo: "'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif",
    texto: "'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif",
  },
  {
    id: 'cercana',
    nombre: 'Cercana',
    descripcion: 'Redondeada y amable',
    titulo: "'Trebuchet MS', 'Segoe UI', system-ui, sans-serif",
    texto: "'Trebuchet MS', 'Segoe UI', system-ui, sans-serif",
  },
] as const;
export type IdLetraWeb = (typeof LETRAS_WEB)[number]['id'];

export const COLORES_WEB = [
  { nombre: 'Azul', valor: '#2563eb' },
  { nombre: 'Verde', valor: '#15803d' },
  { nombre: 'Turquesa', valor: '#0f766e' },
  { nombre: 'Terracota', valor: '#c2410c' },
  { nombre: 'Granate', valor: '#9f1239' },
  { nombre: 'Morado', valor: '#6d28d9' },
  { nombre: 'Dorado', valor: '#b45309' },
  { nombre: 'Grafito', valor: '#334155' },
] as const;

export const PASOS_WEB = [
  { id: 'plantilla', titulo: 'Diseño' },
  { id: 'datos', titulo: 'Tu negocio' },
  { id: 'personaliza', titulo: 'Color y letra' },
  { id: 'publica', titulo: 'Publica' },
] as const;

export const MAX_SERVICIOS_WEB = 6;
export const MAX_ENLACES_WEB = 4;

export interface ServicioWeb {
  nombre: string;
  precio: string;
  texto: string;
}
export interface EnlaceWeb {
  etiqueta: string;
  url: string;
}
export interface DatosWeb {
  plantilla: IdPlantillaWeb;
  color: string;
  letra: IdLetraWeb;
  negocio: string;
  sector: string;
  lema: string;
  sobre: string;
  servicios: ServicioWeb[];
  telefono: string;
  whatsapp: string;
  email: string;
  direccion: string;
  horario: string;
  enlaces: EnlaceWeb[];
}

export const WEB_POR_DEFECTO: Pick<DatosWeb, 'plantilla' | 'color' | 'letra'> = {
  plantilla: 'clara',
  color: COLORES_WEB[0].valor,
  letra: 'moderna',
};

export type ResultadoWeb = { ok: true; datos: DatosWeb } | { ok: false; error: string };

const esDe = <T extends readonly { id: string }[]>(lista: T, v: unknown): v is T[number]['id'] =>
  lista.some((x) => x.id === v);

/** Comprueba y limpia lo que manda el navegador (o lo que hay guardado): nunca se confía en él. */
export function validarWeb(x: unknown): ResultadoWeb {
  if (!x || typeof x !== 'object') return { ok: false, error: 'datos' };
  const o = x as Record<string, unknown>;
  const negocio = texto(o.negocio, 80);
  if (!negocio) return { ok: false, error: 'negocio' };
  const telefono = texto(o.telefono, 24);
  if (telefono && !TELEFONO.test(telefono)) return { ok: false, error: 'telefono' };
  const whatsapp = texto(o.whatsapp, 24);
  if (whatsapp && !TELEFONO.test(whatsapp)) return { ok: false, error: 'whatsapp' };
  const email = texto(o.email, 254);
  if (email && !EMAIL.test(email)) return { ok: false, error: 'email' };
  if (!telefono && !whatsapp && !email) return { ok: false, error: 'contacto' };
  const servicios = (Array.isArray(o.servicios) ? o.servicios : [])
    .map((s) => {
      const r = (s ?? {}) as Record<string, unknown>;
      return { nombre: texto(r.nombre, 60), precio: texto(r.precio, 20), texto: texto(r.texto, 200) };
    })
    .filter((s) => s.nombre)
    .slice(0, MAX_SERVICIOS_WEB);
  const enlaces = (Array.isArray(o.enlaces) ? o.enlaces : [])
    .map((e) => {
      const r = (e ?? {}) as Record<string, unknown>;
      const url = urlSegura(r.url);
      return { etiqueta: texto(r.etiqueta, 30) || (url ? new URL(url).hostname.replace(/^www\./, '') : ''), url };
    })
    .filter((e) => e.url)
    .slice(0, MAX_ENLACES_WEB);
  return {
    ok: true,
    datos: {
      plantilla: esDe(PLANTILLAS_WEB, o.plantilla) ? o.plantilla : WEB_POR_DEFECTO.plantilla,
      color: typeof o.color === 'string' && COLOR_VALIDO.test(o.color) ? o.color.toLowerCase() : WEB_POR_DEFECTO.color,
      letra: esDe(LETRAS_WEB, o.letra) ? o.letra : WEB_POR_DEFECTO.letra,
      negocio,
      sector: texto(o.sector, 60),
      lema: texto(o.lema, 140),
      sobre: parrafos(o.sobre, 900),
      servicios,
      telefono,
      whatsapp,
      email,
      direccion: texto(o.direccion, 160),
      horario: parrafos(o.horario, 300),
      enlaces,
    },
  };
}

/** Ejemplo para «Rellenar con un ejemplo» y para las miniaturas de las plantillas. */
export const EJEMPLO_WEB: DatosWeb = {
  ...WEB_POR_DEFECTO,
  negocio: 'Peluquería Lola',
  sector: 'Peluquería y estética',
  lema: 'Cortes, color y peinados con cita, en el centro de Lugo.',
  sobre:
    'Llevamos doce años cuidando el pelo de nuestro barrio. Trabajamos con cita para que no esperes y usamos productos sin amoniaco.\n\nPide tu hora por WhatsApp y te contestamos el mismo día.',
  servicios: [
    { nombre: 'Corte y peinado', precio: '18 €', texto: 'Lavado, corte y secado a tu gusto.' },
    { nombre: 'Color', precio: 'desde 35 €', texto: 'Tinte, mechas o balayage sin amoniaco.' },
    { nombre: 'Recogidos', precio: '30 €', texto: 'Para bodas, comuniones y eventos.' },
    { nombre: 'Tratamientos', precio: '20 €', texto: 'Hidratación y reparación con keratina.' },
  ],
  telefono: '982 000 000',
  whatsapp: '600 000 000',
  email: 'hola@peluquerialola.es',
  direccion: 'Rúa da Raíña 1, Lugo',
  horario: 'Lunes a viernes: 9:30 – 20:00\nSábados: 9:30 – 14:00',
  enlaces: [{ etiqueta: 'Instagram', url: 'https://www.instagram.com/' }],
};

// ---------- Pintado ----------

const ESC: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
/** Escapa para texto y atributos entre comillas. */
export const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ESC[c]!);
const conSaltos = (s: string) => esc(s).replace(/\n/g, '<br>');
const parrafosHtml = (s: string) =>
  s
    .split(/\n{2,}/)
    .map((p) => `<p>${conSaltos(p)}</p>`)
    .join('');

/** Texto legible sobre el color de acento: oscuro si el acento es claro. */
export function sobreAcento(hex: string): string {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b! > 0.55 ? '#111827' : '#ffffff';
}

const digitos = (t: string) => t.replace(/[^\d+]/g, '');
/** wa.me quiere el número con prefijo de país y sin «+»; los móviles españoles se completan con 34. */
export function enlaceWhatsapp(t: string): string {
  let n = t.replace(/\D/g, '');
  if (n.startsWith('00')) n = n.slice(2);
  if (n.length === 9 && /^[67]/.test(n)) n = `34${n}`;
  return `https://wa.me/${n}`;
}
const enlaceMapa = (direccion: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;

const ICONO = {
  tel: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  wa: '<path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>',
  mail: '<path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/><path d="M3 7l9 6 9-6"/>',
  mapa: '<path d="M9 11a3 3 0 1 0 6 0 3 3 0 0 0-6 0"/><path d="M17.66 16.66 13.41 20.9a2 2 0 0 1-2.83 0l-4.24-4.24a8 8 0 1 1 11.32 0z"/>',
  reloj: '<path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0"/><path d="M12 7v5l3 3"/>',
  enlace: '<path d="M9 15l6-6"/><path d="M11 6l.46-.54a5 5 0 0 1 7.07 7.07L18 13"/><path d="M13 18l-.4.54a5.07 5.07 0 0 1-7.12 0 4.97 4.97 0 0 1 0-7.07L6 11"/>',
} as const;
const icono = (k: keyof typeof ICONO) =>
  `<svg class="w-ico" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONO[k]}</svg>`;

/** Marca de agua en mosaico como fondo SVG: no es texto de la página (no se copia ni se lee). */
function fondoMarca(marca: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="260" height="150"><text x="20" y="90" transform="rotate(-24 130 75)" font-family="system-ui,sans-serif" font-size="20" font-weight="700" fill="rgba(17,24,39,0.16)">${esc(marca)}</text></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/** CSS de todas las plantillas, con ámbito en `.w`: sirve igual en la página publicada y en el Shadow DOM. */
export const CSS_WEB = `
.w{--w-fondo:#fff;--w-tinta:#111827;--w-suave:#4b5563;--w-borde:#e5e7eb;--w-panel:#f9fafb;
  position:relative;container-type:inline-size;background:var(--w-fondo);color:var(--w-tinta);
  font-family:var(--w-ft-texto);line-height:1.6;-webkit-font-smoothing:antialiased;overflow-wrap:anywhere}
.w *,.w *::before,.w *::after{box-sizing:border-box}
.w h1,.w h2,.w h3{font-family:var(--w-ft-titulo);line-height:1.15;margin:0;color:inherit}
.w p{margin:0}
.w a{color:inherit}
.w-in{width:100%;max-width:1040px;margin:0 auto;padding:0 20px}
.w-ico{width:1.15em;height:1.15em;flex:none}
.w-cab{padding:56px 0 48px;text-align:center}
.w-sector{font-size:.8rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--w-c)}
.w-cab h1{font-size:clamp(2rem,9cqi,3.6rem);margin-top:10px}
.w-lema{max-width:36rem;margin:14px auto 0;font-size:1.15rem;color:var(--w-suave)}
.w-acciones{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:28px}
.w-boton{display:inline-flex;align-items:center;gap:8px;padding:12px 20px;border-radius:999px;font-weight:600;
  text-decoration:none;border:2px solid var(--w-c);color:var(--w-c);background:transparent}
.w-boton-lleno{background:var(--w-c);color:var(--w-s)}
.w-boton:focus-visible{outline:3px solid var(--w-c);outline-offset:3px}
.w-sec{padding:44px 0}
.w-sec h2{font-size:clamp(1.5rem,5cqi,2.1rem);margin-bottom:18px}
.w-sec h2::after{content:"";display:block;width:48px;height:4px;border-radius:4px;background:var(--w-c);margin-top:10px}
.w-sobre p+p{margin-top:12px}
.w-sobre{max-width:44rem;font-size:1.05rem;color:var(--w-suave)}
.w-servicios{display:grid;gap:14px;grid-template-columns:1fr;list-style:none;margin:0;padding:0}
.w-servicio{border:1px solid var(--w-borde);border-radius:16px;padding:18px 20px;background:var(--w-fondo)}
.w-servicio-cab{display:flex;justify-content:space-between;align-items:baseline;gap:12px}
.w-servicio h3{font-size:1.15rem}
.w-precio{font-weight:700;color:var(--w-c);white-space:nowrap}
.w-servicio p{margin-top:6px;color:var(--w-suave)}
.w-contacto{display:grid;gap:12px;grid-template-columns:1fr;list-style:none;margin:0;padding:0}
.w-dato{display:flex;gap:12px;align-items:flex-start;padding:14px 16px;border-radius:14px;background:var(--w-panel);text-decoration:none}
.w-dato .w-ico{color:var(--w-c);margin-top:3px}
.w-dato small{display:block;font-size:.78rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--w-suave)}
a.w-dato:hover,a.w-dato:focus-visible{outline:2px solid var(--w-c);outline-offset:0}
.w-pie{padding:28px 0 36px;text-align:center;font-size:.85rem;color:var(--w-suave);border-top:1px solid var(--w-borde)}
.w-pie a{color:inherit}
@container (min-width:640px){
  .w-servicios{grid-template-columns:repeat(2,1fr)}
  .w-contacto{grid-template-columns:repeat(2,1fr)}
  .w-cab{padding:88px 0 72px}
}
@container (min-width:960px){
  .w-servicios{grid-template-columns:repeat(3,1fr)}
}
/* Banda: portada a todo color */
.w-banda .w-cab{background:var(--w-c);color:var(--w-s)}
.w-banda .w-sector,.w-banda .w-lema{color:inherit;opacity:.9}
.w-banda .w-cab .w-boton{border-color:currentColor;color:inherit}
.w-banda .w-cab .w-boton-lleno{background:var(--w-s);color:var(--w-c);border-color:var(--w-s)}
.w-banda .w-servicios-sec{background:var(--w-panel)}
.w-banda .w-servicio{box-shadow:0 6px 20px rgb(0 0 0 / .06);border-color:transparent;border-top:4px solid var(--w-c)}
/* Clara: franja fina de color arriba */
.w-clara{border-top:6px solid var(--w-c)}
.w-clara .w-servicios-sec{border-top:1px solid var(--w-borde)}
/* Noche: fondo oscuro */
.w-noche{--w-fondo:#0f172a;--w-tinta:#f1f5f9;--w-suave:#94a3b8;--w-borde:#1e293b;--w-panel:#111c33}
.w-noche .w-cab{background:radial-gradient(60rem 30rem at 50% -10%,color-mix(in srgb,var(--w-c) 35%,transparent),transparent)}
.w-noche .w-servicio{background:var(--w-panel)}
.w-noche .w-boton{color:var(--w-tinta);border-color:var(--w-c)}
.w-noche .w-boton-lleno{color:var(--w-s)}
.w-marca{position:absolute;inset:0;pointer-events:none;z-index:5;background-repeat:repeat}
`.trim();

export interface OpcionesWeb {
  /** Texto de la marca de agua de la vista previa; vacío en la publicada. */
  marca?: string;
  /** Pie de la publicada (enlace a quien la hizo). */
  pie?: string;
}

/** HTML de la web (solo el contenido, con ámbito en `.w`). Todo texto del cliente va escapado. */
export function renderWeb(d: DatosWeb, o: OpcionesWeb = {}): string {
  const letra = LETRAS_WEB.find((l) => l.id === d.letra) ?? LETRAS_WEB[0];
  const vars = `--w-c:${d.color};--w-s:${sobreAcento(d.color)};--w-ft-titulo:${letra.titulo};--w-ft-texto:${letra.texto}`;
  const acciones = [
    d.whatsapp && `<a class="w-boton w-boton-lleno" href="${esc(enlaceWhatsapp(d.whatsapp))}" rel="noopener">${icono('wa')}WhatsApp</a>`,
    d.telefono && `<a class="w-boton${d.whatsapp ? '' : ' w-boton-lleno'}" href="tel:${esc(digitos(d.telefono))}">${icono('tel')}Llamar</a>`,
    !d.telefono && !d.whatsapp && d.email && `<a class="w-boton w-boton-lleno" href="mailto:${esc(d.email)}">${icono('mail')}Escríbenos</a>`,
  ].filter(Boolean);
  const dato = (ico: keyof typeof ICONO, titulo: string, valor: string, href?: string) =>
    href
      ? `<li><a class="w-dato" href="${esc(href)}"${href.startsWith('http') ? ' rel="noopener"' : ''}>${icono(ico)}<span><small>${esc(titulo)}</small>${conSaltos(valor)}</span></a></li>`
      : `<li><div class="w-dato">${icono(ico)}<span><small>${esc(titulo)}</small>${conSaltos(valor)}</span></div></li>`;
  const contacto = [
    d.telefono && dato('tel', 'Teléfono', d.telefono, `tel:${digitos(d.telefono)}`),
    d.whatsapp && dato('wa', 'WhatsApp', d.whatsapp, enlaceWhatsapp(d.whatsapp)),
    d.email && dato('mail', 'Correo', d.email, `mailto:${d.email}`),
    d.direccion && dato('mapa', 'Dirección', d.direccion, enlaceMapa(d.direccion)),
    d.horario && dato('reloj', 'Horario', d.horario),
    ...d.enlaces.map((e) => dato('enlace', e.etiqueta, new URL(e.url).hostname.replace(/^www\./, ''), e.url)),
  ].filter(Boolean);
  const servicios = d.servicios
    .map(
      (s) =>
        `<li class="w-servicio"><div class="w-servicio-cab"><h3>${esc(s.nombre)}</h3>${s.precio ? `<span class="w-precio">${esc(s.precio)}</span>` : ''}</div>${s.texto ? `<p>${esc(s.texto)}</p>` : ''}</li>`,
    )
    .join('');
  return [
    `<div class="w w-${d.plantilla}" style="${esc(vars)}">`,
    `<header class="w-cab"><div class="w-in">`,
    d.sector ? `<p class="w-sector">${esc(d.sector)}</p>` : '',
    `<h1>${esc(d.negocio)}</h1>`,
    d.lema ? `<p class="w-lema">${esc(d.lema)}</p>` : '',
    acciones.length ? `<div class="w-acciones">${acciones.join('')}</div>` : '',
    `</div></header>`,
    `<main>`,
    d.sobre ? `<section class="w-sec"><div class="w-in"><h2>Quiénes somos</h2><div class="w-sobre">${parrafosHtml(d.sobre)}</div></div></section>` : '',
    servicios ? `<section class="w-sec w-servicios-sec"><div class="w-in"><h2>Servicios</h2><ul class="w-servicios">${servicios}</ul></div></section>` : '',
    `<section class="w-sec"><div class="w-in"><h2>Contacto</h2><ul class="w-contacto">${contacto.join('')}</ul></div></section>`,
    `</main>`,
    `<footer class="w-pie"><div class="w-in">© ${esc(d.negocio)}${o.pie ? ` · ${o.pie}` : ''}</div></footer>`,
    o.marca ? `<div class="w-marca" aria-hidden="true" style="background-image:${esc(fondoMarca(o.marca))}"></div>` : '',
    `</div>`,
  ].join('');
}

/** Página publicada completa (/w/<slug>): ligera, sin JavaScript ni recursos externos. */
export function documentoWeb(d: DatosWeb, url: string): string {
  const titulo = d.sector ? `${d.negocio} · ${d.sector}` : d.negocio;
  const descripcion = (d.lema || d.sobre.replace(/\s+/g, ' ') || titulo).slice(0, 160);
  const pie = 'Web hecha con <a href="/servicios/web">Automatiza sin humo</a>';
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descripcion)}">
<link rel="canonical" href="${esc(url)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descripcion)}">
<meta property="og:url" content="${esc(url)}">
<meta name="theme-color" content="${esc(d.color)}">
<link rel="icon" href="/favicon.svg">
<style>body{margin:0}${CSS_WEB}</style>
</head>
<body>
${renderWeb(d, { pie })}
</body>
</html>
`;
}

/** Texto de la marca de agua de la vista previa del estudio. */
export const MARCA_WEB = 'VISTA PREVIA';

// ---------- Publicación (común a todas las páginas: paginas.ts) ----------

export type WebPublicada = PaginaPublicada<DatosWeb>;

export const webPorSlug = (db: D1Database, slug: string): Promise<WebPublicada | null> =>
  paginaPorSlug(db, 'web', slug, validarWeb);

export const webDePedido = (db: D1Database, pedido: string): Promise<WebPublicada | null> =>
  paginaDePedido(db, 'web', pedido, validarWeb);

/** La dirección se fija con el nombre del negocio la primera vez; republicar no la cambia. */
export const publicarWeb = (db: D1Database, pedido: string, datos: DatosWeb): Promise<string> =>
  publicarPagina(db, 'web', pedido, datos.negocio, datos);

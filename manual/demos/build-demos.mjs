// node manual/demos/build-demos.mjs  →  C:/GIT/automatizasinhumo-demos/site/ (fuera del repo)
// Copia SOLO ficheros estáticos de repos con licencia permisiva a un sitio de demos.
// No ejecuta nada de los repos. Quita analítica de terceros (GTM/gtag).
// Cada página lleva un aviso fijo en español: qué es (demo interactiva o diseño de
// ejemplo), de quién es, y enlace de vuelta a la tienda.
import { cpSync, mkdirSync, rmSync, readdirSync, statSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, extname, basename, dirname } from 'node:path';
import { DEMOS, INTERACTIVAS, CATALOGOS, TITULOS } from './demos.mjs';
import { TRADUCCIONES, traducir } from './traducciones.mjs';
import { limpiarCreditos } from './limpiar-creditos.mjs';

const SRC = 'C:/GIT/automatizasinhumo-productos';
const OUT = 'C:/GIT/automatizasinhumo-demos/site/';
const TIENDA = process.env.TIENDA_URL || 'https://automatizasinhumo.com';
const OK = new Set(['.html', '.css', '.js', '.json', '.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.otf', '.eot', '.mp4', '.webm', '.txt', '.xml', '.avif']);
const SKIP = new Set(['.git', 'node_modules', '.github', 'e2e', 'scripts']);
const MAX = 20 * 1024 * 1024;

const stripAnalytics = (html) => html
  .replace(/<script[^>]*googletagmanager\.com[^>]*>\s*<\/script>/gi, '')
  .replace(/<script>(?:(?!<\/script>)[\s\S])*?gtag\((?:(?!<\/script>)[\s\S])*?<\/script>/gi, '')
  .replace(/<noscript>\s*<iframe[^>]*googletagmanager[\s\S]*?<\/noscript>/gi, '');

// Aviso fijo en español. Las plantillas traen marcas inventadas en inglés
// (Brightline, Meridian…): el aviso deja claro que es un ejemplo nuestro.
const aviso = (interactiva, producto) => `<div id="ash-aviso" role="note" style="position:fixed;left:12px;bottom:12px;z-index:2147483647;max-width:min(92vw,520px);display:flex;gap:10px;align-items:center;padding:10px 12px;border-radius:10px;background:#172D2D;color:#F5F7F4;font:14px/1.35 system-ui,sans-serif;box-shadow:0 6px 24px rgba(0,0,0,.25)"><span><b>${interactiva ? 'Demo interactiva' : 'Diseño de ejemplo'}</b> de <a href="${TIENDA}/" style="color:#9fe0cf">Automatiza sin humo</a>. ${interactiva ? 'Pruébala: no se guarda nada.' : 'Tu versión lleva tus textos, fotos y colores, en español.'} ${producto ? `<a href="${TIENDA}/products/${producto}" style="color:#9fe0cf;font-weight:700">Lo quiero: ver precio →</a> · ` : ''}<a href="${TIENDA}/pages/demos" style="color:#9fe0cf">Ver todas</a></span><button type="button" aria-label="Cerrar aviso" onclick="this.parentNode.remove()" style="background:none;border:0;color:inherit;font-size:20px;cursor:pointer;line-height:1">×</button></div>`;
const conAviso = (html, interactiva, producto) => (html.includes('id="ash-aviso"') ? html
  : /<\/body>/i.test(html) ? html.replace(/<\/body>/i, `${aviso(interactiva, producto)}</body>`) : html + aviso(interactiva, producto));

// Título de cada página limpia: el nombre en español de su carpeta (TITULOS) o el de la demo.
// En las colecciones, el título de la colección no describe la plantilla: «Diseño de ejemplo».
const COLECCION = new Set(CATALOGOS.map((c) => c.split('/')[0]));
const tituloDe = (f, opts) => TITULOS[basename(dirname(f))] ?? (COLECCION.has(opts.slug) ? 'Diseño de ejemplo' : opts.titulo);

let files = 0, bytes = 0;
// opts: interactiva (tipo de aviso), aviso (false = no inyectar), soloRaiz (aviso solo en el primer nivel), skip (nombres a omitir)
function copy(from, to, opts = {}) {
  for (const name of readdirSync(from)) {
    if (SKIP.has(name) || name.startsWith('.') || opts.skip?.has(name)) continue;
    const f = join(from, name), t = join(to, name), st = statSync(f);
    if (st.isDirectory()) { copy(f, t, opts.soloRaiz ? { ...opts, aviso: false } : opts); continue; }
    if (!OK.has(extname(name).toLowerCase()) || st.size > MAX) continue;
    if (name === 'package.json' || name === 'package-lock.json' || name === 'tsconfig.json') continue;
    mkdirSync(to, { recursive: true });
    const ext = extname(name).toLowerCase();
    if (opts.slug && TRADUCCIONES[opts.slug] && (ext === '.html' || ext === '.js')) {
      const [es, usados] = traducir(opts.slug, readFileSync(f, 'utf8'));
      usados.forEach((i) => opts.usados.add(i));
      if (ext === '.js') { writeFileSync(t, es); files++; bytes += st.size; continue; }
      const limpio = opts.creditos === false ? es : limpiarCreditos(es, tituloDe(f, opts));
      writeFileSync(t, opts.aviso === false ? stripAnalytics(limpio) : conAviso(stripAnalytics(limpio), opts.interactiva, opts.producto));
      files++; bytes += st.size; continue;
    }
    if (ext === '.html') {
      const leido = readFileSync(f, 'utf8');
      const html = stripAnalytics(opts.creditos === false ? leido : limpiarCreditos(leido, tituloDe(f, opts)));
      writeFileSync(t, opts.aviso === false ? html : conAviso(html, opts.interactiva, opts.producto));
    } else cpSync(f, t);
    files++; bytes += st.size;
  }
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
for (const [slug, dir, titulo, producto] of DEMOS) {
  if (!existsSync(join(SRC, dir))) { console.error('falta', dir); continue; }
  // En el editor, las páginas de demo/ se editan dentro de un iframe: sin aviso.
  const editor = slug === 'editor-bloques';
  const usados = new Set();
  copy(join(SRC, dir), join(OUT, slug), { slug, producto, usados, interactiva: INTERACTIVAS.has(slug), soloRaiz: editor, skip: editor ? new Set(['landing']) : undefined, titulo, creditos: !editor });
  // Textos que la plantilla ya no trae: avisar para revisar la traducción.
  (TRADUCCIONES[slug] ?? []).forEach(([de], i) => { if (!usados.has(i)) console.warn(`traducción sin uso en ${slug}:`, String(de).slice(0, 60)); });
  // Ficheros ya en español (p. ej. la carta en euros) sustituyen a los originales.
  const es = join('manual/demos/es', slug);
  if (existsSync(es)) cpSync(es, join(OUT, slug), { recursive: true });
  const lic = ['LICENSE', 'LICENSE.md', 'LICENSE.txt'].map((l) => join(SRC, dir.split('/')[0], l)).find(existsSync);
  if (lic) cpSync(lic, join(OUT, slug, 'LICENSE.txt'));
}

const page = (title, intro, cards, back) => `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} · Automatiza sin humo</title><meta name="robots" content="noindex">
<style>body{font:16px/1.5 system-ui,sans-serif;margin:0;background:#f8fafc;color:#0f172a}main{max-width:960px;margin:auto;padding:32px 16px}
h1{font-size:28px;margin:0 0 4px}p{color:#475569}.g{display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(260px,1fr))}
.c{display:flex;flex-direction:column;gap:4px;padding:16px;border:1px solid #e2e8f0;border-radius:10px;background:#fff;color:inherit;text-decoration:none}
.c:hover{border-color:#0f172a}.c span{font-size:13px;color:#64748b}.c em{font-style:normal;font-size:14px;color:#2563eb}</style></head>
<body><main><h1>${title}</h1><p>${intro}</p><div class="g">${cards}</div><p>${back}</p></main></body></html>`;
const card = (href, title, sub, cta = 'Ver demo →') => `<a class="c" href="${href}"><b>${title}</b><span>${sub}</span><em>${cta}</em></a>`;

writeFileSync(join(OUT, 'index.html'), page('Demos y diseños de ejemplo',
  'Las <b>demos interactivas</b> se pueden usar ya con datos de ejemplo. Los <b>diseños de ejemplo</b> enseñan estilos: tu versión lleva tus textos, fotos y colores, en español.',
  DEMOS.map(([slug, , title]) => (INTERACTIVAS.has(slug)
    ? card(`/${slug}/`, title, 'Demo interactiva: pruébala', 'Probar →')
    : card(`/${slug}/`, title, 'Diseño de ejemplo', 'Ver diseño →'))).join(''),
  `<a href="${TIENDA}/">← Volver a la tienda</a>`));

// Las portadas de catálogo de las colecciones son la página promocional del autor
// («gratis, licencia MIT», enlaces a su repo): se sustituyen por un índice nuestro.
for (const ruta of CATALOGOS.flatMap((c) => (c.endsWith('/*')
  ? readdirSync(join(OUT, c.slice(0, -2))).filter((s) => statSync(join(OUT, c.slice(0, -2), s)).isDirectory()).map((s) => `${c.slice(0, -2)}/${s}`)
  : [c]))) {
  for (const f of ['index.html', '404.html', 'sitemap.xml', 'robots.txt']) rmSync(join(OUT, ruta, f), { force: true });
}
const nombre = (s) => (TITULOS[s] ?? s.replace(/[-_]/g, ' ').replace(/^\w/, (c) => c.toUpperCase()));
function indices(base, title, atras) {
  if (!existsSync(base)) return 0;
  const subs = readdirSync(base).filter((s) => !s.startsWith('_') && statSync(join(base, s)).isDirectory());
  for (const s of subs) if (!existsSync(join(base, s, 'index.html'))) indices(join(base, s), nombre(s), '<a href="../">← Volver</a>');
  if (existsSync(join(base, 'index.html')) || existsSync(join(base, 'editor.html'))) return 0;
  const con = subs.filter((s) => existsSync(join(base, s, 'index.html')));
  if (!con.length) return 0;
  writeFileSync(join(base, 'index.html'), page(title, `${con.length} diseños de ejemplo. Elige uno y lo adaptamos con tus textos, fotos y colores.`,
    con.map((s) => card(`./${s}/`, nombre(s), 'Diseño de ejemplo, listo para adaptar', 'Ver diseño →')).join(''), atras));
  return con.length;
}

// Colecciones sin índice propio: listamos sus subcarpetas con index.html.
for (const [slug, , title] of DEMOS) {
  indices(join(OUT, slug), title, '<a href="/">← Todas las demos</a>');
}

// Demo de testimonios con ejemplos en español.
if (existsSync(join(OUT, 'testimonios'))) {
  writeFileSync(join(OUT, 'testimonios', 'testimonials.json'), JSON.stringify([
    { name: 'Marta G.', role: 'Peluquería Marta, Vigo', text: 'Desde que tengo las reservas online, el teléfono ya no me interrumpe con las manos en el tinte.' },
    { name: 'Javier R.', role: 'Taller Rápido Ruiz', text: 'Los clientes ven el presupuesto en el móvil y lo aceptan con un clic. Ahorro una hora al día.' },
    { name: 'Lucía y Pablo', role: 'Boda en Sanxenxo', text: 'La web de la boda con confirmación de asistencia nos quitó cien WhatsApps de encima.' },
    { name: 'Bar La Esquina', role: 'Hostelería', text: 'Cambiamos precios de la carta QR en un minuto, sin reimprimir nada.' },
    { name: 'Ana P.', role: 'Fisioterapeuta', text: 'Las reseñas de Google se piden solas al terminar la sesión. Hemos pasado de 12 a 85.' },
    { name: 'Inmobiliaria Rías', role: 'Agencia', text: 'Los pisos se publican desde una hoja de cálculo y los contactos llegan a Telegram.' },
  ], null, 2));
  const f = join(OUT, 'testimonios', 'index.html');
  writeFileSync(f, readFileSync(f, 'utf8').replace('lang="en"', 'lang="es"').replace(/<title>[^<]*<\/title>/, '<title>Muro de testimonios · demo</title>').replace('What customers say', 'Lo que dicen nuestros clientes'));
}

// Editor de bloques (VvvebJs, Apache-2.0): abre una web de ejemplo en español,
// sin guardar en servidor (no copiamos PHP) y con la interfaz principal en español.
const ED = join(OUT, 'editor-bloques');
if (existsSync(join(ED, 'editor.html'))) {
  const pag = join(ED, 'demo', 'narrow-jumbotron', 'index.html');
  let w = readFileSync(pag, 'utf8')
    .replace(/ data-vvveb-(disabled-area|disabled|edit-exception)/g, '')
    .replace(/<html lang="en"/, '<html lang="es"')
    .replace(/<title>[^<]*<\/title>/, '<title>Peluquería Marta · web de ejemplo</title>')
    .replace(/>Home(\s*<span class="sr-only">)\(current\)/, '>Inicio$1(actual)')
    .replace('>About<', '>Servicios<').replace('>Contact<', '>Contacto<')
    .replaceAll('Project name', 'Peluquería Marta')
    .replace('Jumbotron heading !!!', 'Tu pelo, en buenas manos')
    .replace(/(<p class="lead"[^>]*>)[^<]*/, '$1Corte, color y peinados en el centro de Vigo. Reserva tu cita online en 30 segundos.')
    .replace('https://source.unsplash.com/9UVmlIb0wJU/500x500', '../../media/6.jpg" alt="Interior de la peluquería')
    .replace('Sign up today', 'Reservar cita')
    .replace('© Company 2017', '© Peluquería Marta · web de ejemplo');
  const bloques = [['Corte y peinado', 'Desde 18 €. Lavado incluido.'], ['Color y mechas', 'Tintes sin amoniaco y mechas a mano alzada.'], ['Tratamientos', 'Hidratación y keratina para pelo castigado.'],
    ['Horario', 'De martes a sábado, de 9:30 a 20:00.'], ['Dónde estamos', 'En el centro de Vigo, a dos minutos del puerto.'], ['Reservas', 'Online o por WhatsApp. Te avisamos el día antes.']];
  for (const [h, t] of bloques) {
    w = w.replace('<h4>Subheading</h4>', `<h4>${h}</h4>`)
      .replace(/(<h4>[^<]*<\/h4>\s*<p>)(?:Donec|Morbi|Maecenas)[^<]*/, (_, a) => a + t);
  }
  writeFileSync(pag, w);

  const es = [['Save changes (Ctrl + S)', 'Guardar (desactivado en la demo)'], ['Save changes', 'Guardar (desactivado en la demo)'], ['Undo (Ctrl/Cmd + Z)', 'Deshacer'], ['Redo (Ctrl/Cmd + Shift + Y)', 'Rehacer'],
    ['Preview', 'Vista previa'], ['Mobile view', 'Vista móvil'], ['Tablet view', 'Vista tableta'], ['Desktop view', 'Vista ordenador'], ['Mobile', 'Móvil'], ['Tablet', 'Tableta'], ['Desktop', 'Ordenador'], ['Fullscreen (F11)', 'Pantalla completa'], ['Fullscreen', 'Pantalla completa'],
    ['Components', 'Componentes'], ['Sections', 'Secciones'], ['Blocks', 'Bloques'], ['Properties', 'Propiedades'], ['Content', 'Contenido'], ['Style', 'Estilo'], ['Advanced', 'Avanzado'], ['Pages', 'Páginas'],
    ['Remove element', 'Borrar elemento'], ['Move element up', 'Subir'], ['Move element down', 'Bajar'], ['Select parent', 'Seleccionar contenedor'], ['Bold', 'Negrita'], ['Italic', 'Cursiva'], ['Underline', 'Subrayado'],
    ['Toggle navigator (Ctrl + Shift + N)', 'Mostrar estructura'], ['Toggle navigator', 'Mostrar estructura'], ['New page', 'Nueva página'], ['View page', 'Ver página'], ['Download', 'Descargar'], ['Export', 'Exportar'],
    ['Toggle navigator (Ctrl + Shift + L)', 'Mostrar estructura'], ['Toggle left column', 'Mostrar/ocultar panel izquierdo'], ['Toggle right column', 'Mostrar/ocultar panel derecho'], ['Toggle file manager', 'Mostrar páginas'], ['Toggle sidebar width', 'Ancho del panel'], ['Toggle', 'Mostrar/ocultar'], ['Expand All', 'Desplegar todo'],
    ['Remove section', 'Borrar sección'], ['New section (Ctrl + Shift + S)', 'Nueva sección'], ['New page (Ctrl + Shift + P)', 'Nueva página'], ['Tablet landscape', 'Tableta horizontal'], ['Laptop', 'Portátil'], ['Font family', 'Tipo de letra'],
    ['Edit html code', 'Editar código HTML'], ['Duplicate', 'Duplicar'], ['Rename', 'Renombrar'], ['Strikeout', 'Tachado'], ['Show hidden elements', 'Mostrar elementos ocultos'], ['Save as reusable', 'Guardar como bloque'], ['Translate text', 'Traducir texto'],
    ['Search components', 'Buscar componentes'], ['Search sections', 'Buscar secciones'], ['Search blocks', 'Buscar bloques'], ['Search', 'Buscar']];
  let e = readFileSync(join(ED, 'editor.html'), 'utf8').replace(/<html lang="en"/, '<html lang="es"')
    .replace(/<title>[^<]*<\/title>/, '<title>Editor de bloques · demo · Automatiza sin humo</title>');
  for (const [en, txt] of es.sort((a, b) => b[0].length - a[0].length)) {
    e = e.replaceAll(`title="${en}"`, `title="${txt}"`).replaceAll(`placeholder="${en}"`, `placeholder="${txt}"`)
      .replaceAll(`>${en}<`, `>${txt}<`).replaceAll(`> ${en}<`, `> ${txt}<`);
  }
  e = e.replace('<span>Save</span>', '<span>Guardar</span>').replace('<span>Add page</span>', '<span>Añadir página</span>')
    .replace('<div>Navigator</div>', '<div>Estructura</div>').replace('</i> Code editor', '</i> Código').replace('title="Code editor (Ctrl + E)"', 'title="Ver código"');
  if (!e.includes('let pages = defaultPages;')) throw new Error('VvvebJs: no encuentro "let pages = defaultPages;"');
  e = e.replace('let pages = defaultPages;', `let pages = { inicio: { name: 'inicio', filename: 'index.html', file: 'demo/narrow-jumbotron/index.html', url: 'demo/narrow-jumbotron/index.html', title: 'Peluquería Marta (ejemplo)', folder: null, description: 'Arrastra bloques desde la izquierda o haz clic en un texto para cambiarlo' } };`);
  writeFileSync(join(ED, 'index.html'), conAviso(e, true));
}

writeFileSync(join(OUT, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
console.log(`${files} ficheros, ${(bytes / 1048576).toFixed(1)} MB → ${OUT}`);

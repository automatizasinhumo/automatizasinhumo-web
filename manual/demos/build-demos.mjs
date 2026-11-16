// node manual/demos/build-demos.mjs  →  C:/GIT/automatizasinhumo-demos/site/ (fuera del repo)
// Copia SOLO ficheros estáticos de repos MIT a un sitio de demos.
// No ejecuta nada de los repos. Quita analítica de terceros (GTM/gtag).
import { cpSync, mkdirSync, rmSync, readdirSync, statSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { DEMOS } from './demos.mjs';

const SRC = 'C:/GIT/automatizasinhumo-productos';
const OUT = 'C:/GIT/automatizasinhumo-demos/site/';
const OK = new Set(['.html', '.css', '.js', '.json', '.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.otf', '.eot', '.mp4', '.webm', '.txt', '.xml', '.avif']);
const SKIP = new Set(['.git', 'node_modules', '.github', 'e2e', 'scripts']);
const MAX = 20 * 1024 * 1024;


const stripAnalytics = (html) => html
  .replace(/<script[^>]*googletagmanager\.com[^>]*>\s*<\/script>/gi, '')
  .replace(/<script>(?:(?!<\/script>)[\s\S])*?gtag\((?:(?!<\/script>)[\s\S])*?<\/script>/gi, '')
  .replace(/<noscript>\s*<iframe[^>]*googletagmanager[\s\S]*?<\/noscript>/gi, '');

let files = 0, bytes = 0;
function copy(from, to) {
  for (const name of readdirSync(from)) {
    if (SKIP.has(name) || name.startsWith('.')) continue;
    const f = join(from, name), t = join(to, name), st = statSync(f);
    if (st.isDirectory()) { copy(f, t); continue; }
    if (!OK.has(extname(name).toLowerCase()) || st.size > MAX) continue;
    if (name === 'package.json' || name === 'package-lock.json' || name === 'tsconfig.json') continue;
    mkdirSync(to, { recursive: true });
    if (extname(name).toLowerCase() === '.html') writeFileSync(t, stripAnalytics(readFileSync(f, 'utf8')));
    else cpSync(f, t);
    files++; bytes += st.size;
  }
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
for (const [slug, dir] of DEMOS) {
  if (!existsSync(join(SRC, dir))) { console.error('falta', dir); continue; }
  copy(join(SRC, dir), join(OUT, slug));
  const lic = ['LICENSE', 'LICENSE.md', 'LICENSE.txt'].map((l) => join(SRC, dir.split('/')[0], l)).find(existsSync);
  if (lic) cpSync(lic, join(OUT, slug, 'LICENSE.txt'));
}

const TIENDA = process.env.TIENDA_URL || 'https://automatizasinhumo.com';
const page = (title, intro, cards, back) => `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} · Automatiza sin humo</title><meta name="robots" content="noindex">
<style>body{font:16px/1.5 system-ui,sans-serif;margin:0;background:#f8fafc;color:#0f172a}main{max-width:960px;margin:auto;padding:32px 16px}
h1{font-size:28px;margin:0 0 4px}p{color:#475569}.g{display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(260px,1fr))}
.c{display:flex;flex-direction:column;gap:4px;padding:16px;border:1px solid #e2e8f0;border-radius:10px;background:#fff;color:inherit;text-decoration:none}
.c:hover{border-color:#0f172a}.c span{font-size:13px;color:#64748b}.c em{font-style:normal;font-size:14px;color:#2563eb}</style></head>
<body><main><h1>${title}</h1><p>${intro}</p><div class="g">${cards}</div><p>${back}</p></main></body></html>`;
const card = (href, title, sub, cta = 'Ver demo →') => `<a class="c" href="${href}"><b>${title}</b><span>${sub}</span><em>${cta}</em></a>`;

writeFileSync(join(OUT, 'index.html'), page('Demos en vivo',
  'Ejemplos reales de lo que recibes. Los textos y fotos se cambian por los tuyos. Código abierto con licencia MIT; cada demo incluye su LICENSE.txt.',
  DEMOS.map(([slug, dir, title, prod]) => card(`/${slug}/`, title, `Base: ${dir.split('/')[0].replace('__', '/')} · MIT`)).join(''),
  `<a href="${TIENDA}/">← Volver a la tienda</a>`));

// Colecciones sin índice propio: listamos sus subcarpetas con index.html.
for (const [slug, , title] of DEMOS) {
  const base = join(OUT, slug);
  if (!existsSync(base) || existsSync(join(base, 'index.html'))) continue;
  const subs = readdirSync(base).filter((s) => !s.startsWith('_') && existsSync(join(base, s, 'index.html')));
  writeFileSync(join(base, 'index.html'), page(title, `${subs.length} diseños. Elige uno y lo adaptamos con tus textos, fotos y colores.`,
    subs.map((s) => card(`./${s}/`, s.replace(/[-_]/g, ' ').replace(/^\w/, (c) => c.toUpperCase()), 'Diseño listo para adaptar')).join(''),
    '<a href="/">← Todas las demos</a>'));
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
writeFileSync(join(OUT, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
console.log(`${files} ficheros, ${(bytes / 1048576).toFixed(1)} MB → ${OUT}`);

// node manual/catalogo/gen-imagenes.mjs
// Portada JPEG 1200x900 por producto en public/images/productos/<slug>.jpg
// (estático de Workers, sin R2; también sirve de og:image).
//
// - Si el producto tiene captura de una demo real (public/images/demos/), la
//   portada es esa captura dentro de un marco de navegador.
// - Si no, un icono grande de Tabler Icons (MIT, src/icons/) sobre el papel de marca.
// El nombre y el precio ya salen debajo en la tarjeta: aquí no se repiten.
import { mkdirSync, readFileSync, existsSync, readdirSync, unlinkSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { categorias, productos } from './catalogo.mjs';
import { demosDe } from '../demos/demos.mjs';

const ROOT = new URL('../../', import.meta.url);
const OUT = new URL('public/images/productos/', ROOT);
const DEMOS = new URL('public/images/demos/', ROOT);
const ICONS = new URL('src/icons/', ROOT);
mkdirSync(OUT, { recursive: true });

// Icono por categoría y, cuando aporta, por producto.
export const ICONO_CAT = {
  webs: 'world-www', hosteleria: 'tools-kitchen-2', reservas: 'calendar-check', bodas: 'heart',
  identidad: 'id-badge-2', captacion: 'forms', bots: 'message-chatbot', automatizaciones: 'route',
  enlaces: 'qrcode', tiendas: 'shopping-bag', portales: 'layout-dashboard', documentos: 'file-text',
  contenido: 'photo-edit', planes: 'calendar-repeat',
};
export const ICONO_PROD = {
  // Sin logos de marcas ajenas: solo iconos genéricos.
  'formulario-aviso-telegram': 'bell-ringing', 'avisos-multicanal': 'bell-ringing', 'bot-telegram-chatgpt': 'message-chatbot',
  'bot-telegram-medida': 'robot', 'crm-whatsapp': 'users', 'auto-captacion-leads': 'user-plus', 'auto-facturas': 'file-invoice',
  'auto-tareas-programadas': 'clock-play', 'acortador-enlaces': 'link', 'qr-campanas': 'qrcode', 'analitica-sin-cookies': 'chart-bar',
  'marketplace-plantillas': 'building-store', 'portal-cliente': 'user-circle', 'plan-mantenimiento-web': 'tool', 'plan-hosting-dominio': 'server',
  'plan-automatizaciones': 'refresh', 'auditoria-web': 'report-search', 'vigilancia-caidas': 'heartbeat', 'facturas-presupuestos': 'receipt',
  'certificados-automaticos': 'certificate', 'transcripcion-audios': 'microphone', 'chat-ia-web': 'message-chatbot', 'centro-ayuda': 'help-circle',
  'newsletter-propia': 'mail', 'banner-cookies-rgpd': 'cookie', 'ficha-google': 'map-pin', 'fotos-producto-fondo': 'photo-scan',
  'firma-email': 'signature', 'pizarra-planos': 'chalkboard', 'vigilancia-precios': 'tag', 'aviso-cambios-web': 'eye',
  'etiquetas-codigo-barras': 'barcode', 'optimizar-imagenes': 'photo-down', 'logo-vectorial': 'vector', 'limpieza-csv': 'table',
  'plantilla-inventario': 'packages', 'informe-graficos': 'chart-pie', 'dossier-comercial': 'presentation', 'diagramas-procesos': 'sitemap',
  'descripciones-producto-ia': 'sparkles', 'carruseles-redes': 'carousel-horizontal', 'tarjeta-digital': 'id-badge-2', 'lista-espera': 'clock',
};
// Captura preferida cuando la primera demo es un índice genérico de plantillas.
const CAPTURA = {
  'web-una-pagina': 'cafe-coffee-shop', 'web-corporativa-5-secciones': 'consulting-firm', 'tarjeta-digital': 'link-in-bio',
  'auto-plantilla-medida': 'business-template', 'web-arrastrar-soltar': 'northstar', 'lista-espera': 'coming-soon',
};

const B = { bg: '#F5F7F4', ink: '#172D2D', brand: '#176B5A', acc: '#B34A28', line: '#D5DDD8', tint: '#E3EDE8' };
const FONT = "'Space Grotesk', 'Segoe UI', Arial, sans-serif";
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const catNombre = Object.fromEntries(categorias.map((c) => [c.slug, c.nombre]));

// Interior (paths) de un icono Tabler, para pintarlo dentro de otro SVG.
const icono = (n) => readFileSync(new URL(`${n}.svg`, ICONS), 'utf8').replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
const usa = (name, x, y, size, color, sw = 1.5) =>
  `<g transform="translate(${x} ${y}) scale(${size / 24})" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${icono(name)}</g>`;

function captura(p) {
  if (CAPTURA[p.slug]) return CAPTURA[p.slug];
  const ns = demosDe(p.slug).map((d) => new URL(d.url).pathname.split('/').filter(Boolean).pop())
    .filter((n) => n && existsSync(new URL(`${n}.png`, DEMOS)));
  return ns.find((n) => !n.startsWith('plantillas-')) ?? ns[0];
}

const fondo = `<defs><pattern id="d" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="12" cy="12" r="1.1" fill="#81938C" opacity=".45"/></pattern>
<filter id="s" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#172D2D" flood-opacity=".22"/></filter></defs>
<rect width="1200" height="900" fill="${B.bg}"/><rect width="1200" height="900" fill="url(#d)"/>`;

function pastilla(p, ico) {
  const t = catNombre[p.cat] ?? '';
  const w = t.length * 13.6 + 96;
  return `<rect x="70" y="52" width="${w}" height="60" rx="30" fill="#fff" stroke="${B.line}" stroke-width="2"/>
${usa(ico, 92, 66, 32, B.brand, 2)}<text x="138" y="92" font-family="${FONT}" font-size="26" font-weight="600" fill="${B.ink}">${esc(t)}</text>`;
}

// JPEG sin submuestreo de color (4:4:4): el texto de las capturas se ve nítido.
// Antes era PNG con paleta de 256 colores, que pixelaba degradados y fotos.
const JPG = { quality: 88, mozjpeg: true, chromaSubsampling: '4:4:4' };
const FW = 1060, FX = 70, FY = 150, BAR = 46;
async function conCaptura(p, nombre, ico) {
  const shot = await sharp(fileURLToPath(new URL(`${nombre}.png`, DEMOS))).resize({ width: FW }).toBuffer();
  const h = 900 - FY - BAR + 40; // sangra por abajo
  const recorte = await sharp(shot).extract({ left: 0, top: 0, width: FW, height: Math.min(h, (await sharp(shot).metadata()).height) }).toBuffer();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">${fondo}
<rect x="${FX}" y="${FY}" width="${FW}" height="900" rx="22" fill="#fff" stroke="${B.line}" stroke-width="2" filter="url(#s)"/>
<circle cx="${FX + 30}" cy="${FY + 23}" r="7" fill="${B.acc}" opacity=".75"/><circle cx="${FX + 54}" cy="${FY + 23}" r="7" fill="${B.line}"/><circle cx="${FX + 78}" cy="${FY + 23}" r="7" fill="${B.line}"/>
<rect x="${FX + 330}" y="${FY + 11}" width="400" height="24" rx="12" fill="${B.bg}"/>
${pastilla(p, ico)}</svg>`;
  return sharp(Buffer.from(svg)).composite([{ input: recorte, left: FX, top: FY + BAR }]).jpeg(JPG);
}

// Sin demo: una «ficha de entrega» que enseña QUÉ RECIBES y el plazo, para que la
// tarjeta explique el servicio por sí sola (antes era solo un icono genérico).
function lineas(t, max) {
  const out = [];
  let cur = '';
  for (const w of String(t).split(/\s+/)) {
    if ((cur + ' ' + w).trim().length > max && cur) { out.push(cur); cur = w; } else cur = (cur + ' ' + w).trim();
  }
  if (cur) out.push(cur);
  return out.length > 2 ? [out[0], out[1].replace(/[,.;:]?$/, '…')] : out;
}
function conFicha(p, ico) {
  const X = 70, Y = 150, W = 1060;
  const items = (p.recibes ?? []).slice(0, 4);
  // Letra grande y bloque centrado en el hueco: nada de media tarjeta vacía.
  const fs = items.length > 3 ? 40 : 46;
  const max = Math.floor(860 / (fs * 0.52));
  const partes = items.map((it) => lineas(it, max));
  const alto = partes.reduce((a, ls) => a + fs * 1.2 * ls.length + 44, -44);
  let y = Math.round(Y + 270 + Math.max(0, (900 - 40 - (Y + 270) - alto) / 2) + fs * 0.8), filas = '';
  for (const ls of partes) {
    filas += `<circle cx="${X + 78}" cy="${y - fs * 0.32}" r="26" fill="${B.tint}"/>${usa('check', X + 60, y - fs * 0.32 - 18, 36, B.brand, 2.5)}`;
    ls.forEach((l, i) => { filas += `<text x="${X + 124}" y="${y + i * fs * 1.2}" font-family="${FONT}" font-size="${fs}" fill="${B.ink}">${esc(l)}</text>`; });
    y += fs * 1.2 * ls.length + 44;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">${fondo}
<rect x="${X}" y="${Y}" width="${W}" height="${900 - Y + 40}" rx="28" fill="#fff" stroke="${B.line}" stroke-width="2" filter="url(#s)"/>
<rect x="${X + 50}" y="${Y + 50}" width="150" height="150" rx="32" fill="${B.tint}"/>
${usa(ico, X + 80, Y + 80, 90, B.brand, 1.6)}
<text x="${X + 240}" y="${Y + 105}" font-family="${FONT}" font-size="26" font-weight="700" letter-spacing="3" fill="${B.brand}">LO QUE RECIBES</text>
<text x="${X + 240}" y="${Y + 165}" font-family="${FONT}" font-size="46" font-weight="700" fill="${B.ink}">${esc(p.plazo ? `Listo en ${p.plazo}` : 'Precio cerrado')}</text>
<line x1="${X + 50}" y1="${Y + 240}" x2="${X + W - 50}" y2="${Y + 240}" stroke="${B.line}" stroke-width="2"/>
${filas}
${pastilla(p, ICONO_CAT[p.cat] ?? ico)}</svg>`;
  return sharp(Buffer.from(svg)).jpeg(JPG);
}

function conIcono(p, ico) {
  const cx = 600, cy = 500;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">${fondo}
<circle cx="${cx}" cy="${cy}" r="300" fill="${B.tint}" opacity=".7"/>
<rect x="${cx - 330}" y="${cy - 150}" width="200" height="200" rx="36" fill="#fff" stroke="${B.line}" stroke-width="2" transform="rotate(-8 ${cx - 230} ${cy - 50})" opacity=".85"/>
${usa(ICONO_CAT[p.cat] ?? 'sparkles', cx - 282, cy - 102, 104, B.ink, 1.25).replace('<g ', `<g opacity=".35" `)}
<rect x="${cx + 140}" y="${cy + 10}" width="180" height="180" rx="32" fill="#fff" stroke="${B.line}" stroke-width="2" transform="rotate(7 ${cx + 230} ${cy + 100})" opacity=".85"/>
${usa('check', cx + 185, cy + 55, 90, B.acc, 1.5)}
<rect x="${cx - 175}" y="${cy - 175}" width="350" height="350" rx="56" fill="#fff" stroke="${B.line}" stroke-width="2" filter="url(#s)"/>
${usa(ico, cx - 115, cy - 115, 230, B.brand, 1.25)}
${pastilla(p, ICONO_CAT[p.cat] ?? ico)}</svg>`;
  return sharp(Buffer.from(svg)).jpeg(JPG);
}

let n = 0;
for (const p of productos) {
  const ico = ICONO_PROD[p.slug] ?? ICONO_CAT[p.cat] ?? 'sparkles';
  const nombre = captura(p);
  const img = nombre ? await conCaptura(p, nombre, ICONO_CAT[p.cat] ?? ico) : conFicha(p, ico);
  await img.toFile(fileURLToPath(new URL(`${p.slug}.jpg`, OUT)));
  if (nombre) n++;
}
// Las portadas SVG y PNG antiguas ya no se usan.
for (const f of readdirSync(OUT)) if (/\.(svg|png)$/.test(f)) unlinkSync(fileURLToPath(new URL(f, OUT)));
console.error(`${productos.length} portadas (${n} con captura real) en public/images/productos/`);

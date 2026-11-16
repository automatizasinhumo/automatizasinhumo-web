// node manual/catalogo/gen-imagenes.mjs
// Genera una portada SVG por producto en public/images/productos/<slug>.svg.
// Cloudflare sirve /public como estático, así que no hace falta R2.
// También escribe <slug>.png: las redes sociales no leen SVG en og:image.
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { categorias, productos } from './catalogo.mjs';

const OUT = new URL('../../public/images/productos/', import.meta.url);
mkdirSync(OUT, { recursive: true });

// Paleta por categoría: [fondo, acento, tinta del motivo]
const PAL = {
  webs: ['#E8EEF6', '#2F5D9E', '#1F3F6E'],
  hosteleria: ['#F6ECE3', '#B5582B', '#7A3517'],
  reservas: ['#E7F2EE', '#2E7D62', '#1C5241'],
  bodas: ['#F7ECEF', '#B0566F', '#7C3349'],
  identidad: ['#EFEAF6', '#6B4FA3', '#45307A'],
  captacion: ['#FBF1DC', '#B7831C', '#7A5509'],
  bots: ['#E5F2F6', '#23809B', '#145669'],
  automatizaciones: ['#EAF1E4', '#4F7F2E', '#335619'],
  enlaces: ['#F3EBE6', '#8A5A44', '#5E3A2A'],
  tiendas: ['#F7E9E4', '#C0533D', '#8A3424'],
  portales: ['#E9ECF2', '#45526B', '#2A3447'],
  documentos: ['#F1EFE8', '#6E6A55', '#45422F'],
  planes: ['#E6F0F0', '#2C7873', '#1B4F4C'],
  contenido: ['#F8EAF2', '#A3487E', '#6E2A55'],
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Corta el nombre en líneas de ~maxCh caracteres
function lineas(texto, maxCh) {
  const out = [];
  let cur = '';
  for (const w of texto.split(' ')) {
    if ((cur + ' ' + w).trim().length > maxCh && cur) { out.push(cur); cur = w; }
    else cur = (cur + ' ' + w).trim();
  }
  if (cur) out.push(cur);
  return out;
}

// Motivos sencillos dibujados en un cuadro de 420x420 (se colocan arriba a la derecha)
const M = {
  webs: (a, t) => `<rect x="20" y="40" width="380" height="290" rx="22" fill="#fff" stroke="${t}" stroke-width="8"/><line x1="20" y1="100" x2="400" y2="100" stroke="${t}" stroke-width="8"/><circle cx="56" cy="70" r="10" fill="${a}"/><circle cx="88" cy="70" r="10" fill="${a}" opacity=".6"/><circle cx="120" cy="70" r="10" fill="${a}" opacity=".3"/><rect x="56" y="135" width="200" height="22" rx="11" fill="${t}"/><rect x="56" y="175" width="300" height="14" rx="7" fill="${a}" opacity=".45"/><rect x="56" y="203" width="260" height="14" rx="7" fill="${a}" opacity=".45"/><rect x="56" y="255" width="120" height="44" rx="22" fill="${a}"/>`,
  hosteleria: (a, t) => `<circle cx="210" cy="200" r="150" fill="#fff" stroke="${t}" stroke-width="8"/><circle cx="210" cy="200" r="100" fill="none" stroke="${a}" stroke-width="6" opacity=".5"/>${[0, 1, 2].map((i) => [0, 1, 2].map((j) => ((i + j) % 2 === 0 || (i === 1 && j === 1)) ? `<rect x="${160 + i * 34}" y="${150 + j * 34}" width="28" height="28" rx="4" fill="${t}"/>` : '').join('')).join('')}`,
  reservas: (a, t) => `<rect x="40" y="50" width="340" height="300" rx="24" fill="#fff" stroke="${t}" stroke-width="8"/><rect x="40" y="50" width="340" height="70" rx="24" fill="${a}"/><rect x="100" y="25" width="16" height="50" rx="8" fill="${t}"/><rect x="304" y="25" width="16" height="50" rx="8" fill="${t}"/>${Array.from({ length: 12 }, (_, k) => `<rect x="${72 + (k % 4) * 72}" y="${150 + Math.floor(k / 4) * 62}" width="48" height="40" rx="8" fill="${k === 6 ? a : t}" opacity="${k === 6 ? 1 : 0.15}"/>`).join('')}`,
  bodas: (a, t) => `<circle cx="160" cy="220" r="100" fill="none" stroke="${t}" stroke-width="18"/><circle cx="270" cy="220" r="100" fill="none" stroke="${a}" stroke-width="18"/><path d="M270 60 l14 24 l-14 18 l-14 -18z" fill="${a}"/>`,
  identidad: (a, t) => `<rect x="30" y="90" width="360" height="220" rx="24" fill="#fff" stroke="${t}" stroke-width="8"/><circle cx="120" cy="180" r="46" fill="${a}"/><rect x="190" y="150" width="160" height="20" rx="10" fill="${t}"/><rect x="190" y="190" width="120" height="14" rx="7" fill="${a}" opacity=".5"/><rect x="70" y="250" width="280" height="14" rx="7" fill="${t}" opacity=".2"/>`,
  captacion: (a, t) => `<path d="M40 60 h340 l-120 150 v120 l-100 40 v-160z" fill="#fff" stroke="${t}" stroke-width="8" stroke-linejoin="round"/><circle cx="120" cy="40" r="18" fill="${a}"/><circle cx="210" cy="30" r="18" fill="${a}" opacity=".7"/><circle cx="300" cy="40" r="18" fill="${a}" opacity=".5"/><circle cx="210" cy="400" r="20" fill="${a}"/>`,
  bots: (a, t) => `<rect x="30" y="50" width="260" height="140" rx="30" fill="${a}"/><path d="M80 190 l-20 46 l60 -46z" fill="${a}"/><rect x="130" y="210" width="260" height="130" rx="30" fill="#fff" stroke="${t}" stroke-width="8"/><circle cx="210" cy="275" r="12" fill="${t}"/><circle cx="260" cy="275" r="12" fill="${t}"/><circle cx="310" cy="275" r="12" fill="${t}"/><rect x="70" y="95" width="180" height="16" rx="8" fill="#fff"/><rect x="70" y="130" width="120" height="16" rx="8" fill="#fff" opacity=".7"/>`,
  automatizaciones: (a, t) => `<line x1="90" y1="110" x2="210" y2="210" stroke="${t}" stroke-width="8"/><line x1="210" y1="210" x2="340" y2="100" stroke="${t}" stroke-width="8"/><line x1="210" y1="210" x2="320" y2="330" stroke="${t}" stroke-width="8"/><line x1="90" y1="110" x2="90" y2="320" stroke="${t}" stroke-width="8" stroke-dasharray="14 12"/><circle cx="90" cy="110" r="44" fill="#fff" stroke="${t}" stroke-width="8"/><circle cx="210" cy="210" r="56" fill="${a}"/><circle cx="340" cy="100" r="38" fill="#fff" stroke="${t}" stroke-width="8"/><circle cx="320" cy="330" r="38" fill="#fff" stroke="${t}" stroke-width="8"/><circle cx="90" cy="320" r="30" fill="${a}" opacity=".5"/>`,
  enlaces: (a, t) => `<rect x="40" y="150" width="200" height="100" rx="50" fill="none" stroke="${t}" stroke-width="22"/><rect x="180" y="150" width="200" height="100" rx="50" fill="none" stroke="${a}" stroke-width="22"/>`,
  tiendas: (a, t) => `<path d="M70 130 h280 l-22 230 h-236z" fill="#fff" stroke="${t}" stroke-width="8" stroke-linejoin="round"/><path d="M140 130 v-30 a70 70 0 0 1 140 0 v30" fill="none" stroke="${a}" stroke-width="14"/><circle cx="160" cy="190" r="10" fill="${t}"/><circle cx="260" cy="190" r="10" fill="${t}"/><rect x="150" y="260" width="120" height="36" rx="18" fill="${a}"/>`,
  portales: (a, t) => `<rect x="30" y="50" width="360" height="300" rx="24" fill="#fff" stroke="${t}" stroke-width="8"/><rect x="30" y="50" width="100" height="300" rx="24" fill="${t}" opacity=".12"/>${[0, 1, 2, 3].map((k) => `<rect x="52" y="${90 + k * 50}" width="56" height="14" rx="7" fill="${t}" opacity=".5"/>`).join('')}<rect x="160" y="85" width="200" height="110" rx="14" fill="${a}" opacity=".25"/><rect x="160" y="215" width="94" height="100" rx="14" fill="${a}"/><rect x="266" y="215" width="94" height="100" rx="14" fill="${t}" opacity=".2"/>`,
  documentos: (a, t) => `<rect x="120" y="40" width="240" height="310" rx="18" fill="#fff" stroke="${t}" stroke-width="6" opacity=".6"/><rect x="70" y="80" width="240" height="310" rx="18" fill="#fff" stroke="${t}" stroke-width="8"/><rect x="105" y="125" width="130" height="20" rx="10" fill="${a}"/>${[0, 1, 2, 3, 4].map((k) => `<rect x="105" y="${175 + k * 34}" width="${k % 2 ? 140 : 170}" height="12" rx="6" fill="${t}" opacity=".3"/>`).join('')}`,
  planes: (a, t) => `<circle cx="210" cy="210" r="150" fill="#fff" stroke="${t}" stroke-width="8"/><path d="M210 90 a120 120 0 1 1 -104 60" fill="none" stroke="${a}" stroke-width="18" stroke-linecap="round"/><path d="M92 112 l14 40 l40 -16" fill="none" stroke="${a}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/><path d="M160 215 l35 35 l70 -80" fill="none" stroke="${t}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>`,
  contenido: (a, t) => `<rect x="150" y="40" width="230" height="300" rx="20" fill="${a}" opacity=".3"/><rect x="110" y="70" width="230" height="300" rx="20" fill="${a}" opacity=".6"/><rect x="60" y="100" width="230" height="300" rx="20" fill="#fff" stroke="${t}" stroke-width="8"/><circle cx="175" cy="210" r="50" fill="${a}"/><rect x="100" y="300" width="150" height="16" rx="8" fill="${t}" opacity=".4"/><rect x="100" y="336" width="100" height="16" rx="8" fill="${t}" opacity=".25"/>`,
};

const catNombre = Object.fromEntries(categorias.map((c) => [c.slug, c.nombre]));

for (const p of productos) {
  const [bg, a, t] = PAL[p.cat] ?? PAL.webs;
  const motivo = (M[p.cat] ?? M.webs)(a, t);
  const nombre = p.nombre.replace(/\s*\((mes|mensual)\)\s*$/i, '');
  const ls = lineas(nombre, 22).slice(0, 4);
  const fs = ls.length > 3 ? 66 : 76;
  const y0 = 1040 - (ls.length - 1) * (fs + 10) - 120;
  const precio = p.plazo === 'Mensual' ? `${p.p[0]} €/mes` : p.p.length === 2 ? `desde ${p.p[0]} €` : `${p.p[0]} €`;
  const plazo = p.plazo === 'Mensual' ? 'Sin permanencia' : `Entrega en ${p.plazo}`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" width="1200" height="1200" role="img" aria-label="${esc(nombre)}">
<rect width="1200" height="1200" fill="${bg}"/>
<circle cx="1050" cy="150" r="380" fill="${a}" opacity=".08"/>
<g transform="translate(680 190) scale(.88)">${motivo}</g>
<text x="90" y="150" font-family="Helvetica, Arial, sans-serif" font-size="30" letter-spacing="5" fill="${t}" font-weight="700">${esc((catNombre[p.cat] ?? '').toUpperCase())}</text>
${ls.map((l, i) => `<text x="90" y="${y0 + i * (fs + 10)}" font-family="Georgia, 'Times New Roman', serif" font-size="${fs}" fill="#1d1b17">${esc(l)}</text>`).join('\n')}
<rect x="90" y="1010" width="${precio.length * 24 + 70}" height="84" rx="42" fill="${a}"/>
<text x="${90 + 35}" y="1066" font-family="Helvetica, Arial, sans-serif" font-size="40" font-weight="700" fill="#fff">${esc(precio)}</text>
<text x="${90 + precio.length * 24 + 100}" y="1064" font-family="Helvetica, Arial, sans-serif" font-size="32" fill="${t}">${esc(plazo)}</text>
</svg>`;
  writeFileSync(new URL(`${p.slug}.svg`, OUT), svg);
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9, palette: true }).toFile(fileURLToPath(new URL(`${p.slug}.png`, OUT)));
}
console.error(`${productos.length} portadas en public/images/productos/`);

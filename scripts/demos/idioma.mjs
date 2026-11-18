// Vigilante de idioma de las demos (C20): cada demo que ve el cliente, en español de España.
//
//   node scripts/demos/idioma.mjs            → revisa las demos publicadas (DEMOS_URL)
//   node scripts/demos/idioma.mjs --json f   → además escribe los hallazgos en f (para regenerar)
//   node scripts/demos/idioma.mjs --dir d    → revisa una carpeta local (antes de desplegar)
//
// Mira las páginas de DEMOS y EXTRA (manual/demos/demos.mjs), que son las que enlaza la
// tienda. Marca restos en inglés (misma regla de palabras vacías que el test de C19),
// lugares y monedas de fuera, correos de ejemplo y calcos ya vistos. Sale con 1 si hay algo.
// El arreglo no es a mano: lo que falle se vuelve a adaptar con reescribir() de la fábrica.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { load } from 'cheerio';
import { DEMOS, DEMOS_URL, EXTRA } from '../../manual/demos/demos.mjs';

// Límites Unicode: con \b, «Allí» contaría como «All» y la «a» de «Lucía» como palabra suelta.
const palabras = (lista) => new RegExp(`(?<![\\p{L}\\p{N}])(?:${lista})(?![\\p{L}\\p{N}])`, 'giu');
const SPANISH_STOPWORDS = palabras('y|a|de|del|la|el|en|para|con|tu|tus|las|los|una?|por|sin|que|se|al|es|nos|os|mi|su');
const ENGLISH_STOPWORDS = palabras('the|and|of|for|with|your|to|an|by|in|on|is|are|we|you|our|it|this|at|from|my|all');
const ENGLISH_UI =
  /\b(?:Skip to (?:main )?content|Read more|Learn more|Get started|Contact us|About us|Sign up|Log in|Subscribe|Submit|Send message|Book now|Buy now|Add to cart|View all|See more|Home|Menu|Gallery|Testimonials|Pricing|Services|Our team|Follow us|All rights reserved|Privacy policy|Terms of service|Joyfully accepts?|Regretfully declines?|RSVP by|Save the date)\b/;
const FOREIGN_PLACES =
  /\b(?:Harare|Cotswolds|London|New York|NYC|Brooklyn|Manhattan|Los Angeles|San Francisco|Chicago|Boston|Seattle|Miami|Texas|California|Florida|Toronto|Vancouver|Sydney|Melbourne|Dublin|Edinburgh|Manchester|Nairobi|Lagos|Dhaka|Mumbai|Delhi|USA|U\.S\.A?\.|United States|United Kingdom)\b/;
const FOREIGN_MONEY = /(?:\$\s?\d|\d\s?(?:USD|GBP)\b|£\s?\d|\(555\)|\b555-\d{4}\b)/;
const PLACEHOLDER_MAIL = /\b[\w.+-]+@(?:example\.(?:com|org|net)|domain\.com|email\.com|yourdomain\.\w+|company\.com)\b/i;
// Calcos de traducción automática ya vistos en las demos; los nuevos los cubre la regla de palabras.
const CALCOS = /\b(?:Carne de carne|(?<!nos )vamos a casar|Saltar al contenido principal del sitio)\b/i;
const ATTRS = ['alt', 'title', 'placeholder', 'aria-label', 'value'];

export function pareceIngles(texto) {
  const es = texto.match(SPANISH_STOPWORDS)?.length ?? 0;
  const en = texto.match(ENGLISH_STOPWORDS)?.length ?? 0;
  return en > 0 && en >= es;
}

function limpio(t) {
  return t.replace(/\s+/g, ' ').trim();
}

const URLS = /\b(?:https?:\/\/|www\.)?[\w-]+(?:\.[\w-]+)+\/\S*/g;

/** Problemas de un texto suelto (lo comparte localizar-demos.mjs): lista de tipos, vacía si está bien. */
export function problemas(texto) {
  const t = limpio(texto);
  if (!t) return [];
  // Monedas y teléfonos de fuera, aunque el texto sea solo cifras («(512) 555-0163»).
  const fuera = FOREIGN_MONEY.test(t) ? ['moneda o teléfono de fuera'] : [];
  if (/^(?:https?:\/\/|[\d\s.,:;+\-–—/()%€]+$)/.test(t)) return fuera;
  const tipos = [];
  if (CALCOS.test(t)) tipos.push('calco');
  else if (ENGLISH_UI.test(t)) tipos.push('inglés');
  else {
    const sinUrls = t.replace(URLS, ' ');
    if (sinUrls.trim().split(/\s+/).length >= 2 && pareceIngles(sinUrls)) tipos.push('inglés');
  }
  if (FOREIGN_PLACES.test(t)) tipos.push('lugar de fuera');
  if (PLACEHOLDER_MAIL.test(t)) tipos.push('correo de ejemplo');
  return [...tipos, ...fuera];
}

/** Hallazgos de una página: [{tipo, texto}], sin repetidos. */
export function hallazgos(html) {
  const $ = load(html);
  $('script, style, noscript, template, svg, code, pre').remove();
  const textos = new Set();
  // Texto propio de cada elemento (sin el de sus hijos de bloque), para no mezclar frases.
  $('body *, title').each((_, el) => {
    const propio = limpio(
      $(el)
        .contents()
        .toArray()
        .map((n) => (n.type === 'text' ? n.data : ['a', 'b', 'strong', 'em', 'i', 'span', 'small', 'br'].includes(n.name) ? $(n).text() : ' '))
        .join(' '),
    );
    if (propio) textos.add(propio);
    for (const a of ATTRS) {
      const v = $(el).attr(a);
      if (v && !(a === 'value' && !['submit', 'button'].includes($(el).attr('type') ?? ''))) textos.add(limpio(v));
    }
  });
  const out = [];
  const marca = (tipo, texto) => out.push({ tipo, texto: texto.slice(0, 160) });
  for (const t of textos) for (const tipo of problemas(t)) marca(tipo, t);
  $('a[href^="mailto:"]').each((_, a) => {
    const href = $(a).attr('href') ?? '';
    if (PLACEHOLDER_MAIL.test(href)) marca('correo de ejemplo', href);
  });
  const lang = $('html').attr('lang');
  if (lang && !/^es\b/i.test(lang)) marca('lang', `<html lang="${lang}">`);
  const vistos = new Set();
  return out.filter((h) => !vistos.has(h.tipo + h.texto) && vistos.add(h.tipo + h.texto));
}

export function rutasDeDemos() {
  const rutas = new Set(DEMOS.map(([slug]) => slug));
  for (const lista of Object.values(EXTRA)) for (const [ruta] of lista) rutas.add(ruta);
  return [...rutas].sort((x, y) => x.localeCompare(y));
}

async function main() {
  const arg = (n) => (process.argv.includes(n) ? process.argv[process.argv.indexOf(n) + 1] : null);
  const json = arg('--json');
  const dir = arg('--dir');
  const informe = {};
  let fallos = 0;
  for (const ruta of rutasDeDemos()) {
    let html;
    try {
      if (dir) html = readFileSync(join(dir, ruta, 'index.html'), 'utf8');
      else {
        const r = await fetch(`${DEMOS_URL}/${ruta}/`, { headers: { 'user-agent': 'automatizasinhumo-idioma' } });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        html = await r.text();
      }
    } catch (e) {
      informe[ruta] = [{ tipo: 'sin respuesta', texto: String(e.message ?? e) }];
      fallos++;
      continue;
    }
    const h = hallazgos(html);
    if (h.length) {
      informe[ruta] = h;
      fallos++;
    }
  }
  const total = rutasDeDemos().length;
  const lineas = [`## Idioma de las demos: ${total - fallos}/${total} páginas limpias`, ''];
  for (const [ruta, hs] of Object.entries(informe)) {
    lineas.push(`- **${ruta}** (${hs.length}): ` + hs.slice(0, 6).map((h) => `${h.tipo}: «${h.texto}»`).join(' · ') + (hs.length > 6 ? ' …' : ''));
  }
  const md = lineas.join('\n');
  console.log(md);
  if (process.env.GITHUB_STEP_SUMMARY) writeFileSync(process.env.GITHUB_STEP_SUMMARY, md + '\n', { flag: 'a' });
  if (json) writeFileSync(json, JSON.stringify(informe, null, 2));
  process.exitCode = fallos ? 1 : 0;
}

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, '/').replace(/^(?=[A-Za-z]:)/, '/')}`) await main();

// Localiza a España lo que Argos deja mal en las demos ya traducidas (C20).
//
//   node manual/demos/localizar-demos.mjs [carpeta-site]     (tras traducir-demos.py)
//
// Recorre las páginas que revisa scripts/demos/idioma.mjs. Cada texto o atributo que el
// vigilante marca (inglés, $ o £, lugares de fuera, correos de ejemplo, calcos) se reescribe
// en español de España con el Llama de Workers AI, el mismo de la fábrica (cuota gratuita).
// Las monedas no pasan por la IA (cambiaba las cifras): aEuros() conserva el importe, también
// en precios partidos («£<span>11.00</span>») y en las plantillas de los scripts de la página.
// Solo se guarda una respuesta que el vigilante da por buena. Caché:
// manual/demos/localizaciones-cache.json (original -> español); una reconstrucción solo
// pide a la IA las frases nuevas, y una traducción se corrige a mano editando la caché.
import { execSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { load } from 'cheerio';
import { problemas, rutasDeDemos } from '../../scripts/demos/idioma.mjs';

const SITE = process.argv[2] || 'C:/GIT/automatizasinhumo-demos/site';
const CACHE = new URL('./localizaciones-cache.json', import.meta.url);
const MODELO = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';
const LOTE = 25;
const ATRIBUTOS = ['alt', 'title', 'placeholder', 'aria-label'];
const OMITIR = 'script, style, noscript, template, svg, code, pre, #ash-aviso';

export const SISTEMA =
  'Traduces y localizas a España textos sueltos de una web de ejemplo. Español de España, natural y breve, ' +
  'del mismo largo aproximado. No cambies ninguna cifra ni importe. ' +
  'Ciudades, barrios, universidades y lugares de fuera pasan a equivalentes de España. Teléfonos en formato ' +
  'español (912 345 678 o 612 345 678). Correos de ejemplo con @ejemplo.es. Horarios en 24 h (9:00, 17:30). ' +
  'Nombres de personas inventados pasan a nombres españoles; las marcas inventadas se traducen o se dejan si ' +
  'son un nombre propio corto. Conserva emojis, flechas y signos del principio y del final. ' +
  'Recibes un objeto JSON con claves numeradas; responde SOLO con un objeto JSON con las mismas claves.';

const MONEDA = /(?:US)?\$\s?(\d[\d,]*(?:\.\d+)?)\s?(k|m|bn)?\b|£\s?(\d[\d,]*(?:\.\d+)?)\s?(k|m|bn)?\b|(\d[\d,]*(?:\.\d+)?)\s?(?:USD|GBP)\b/gi;

function cifra(n) {
  const [ent, dec] = n.replace(/,/g, '').split('.');
  const miles = ent.length > 4 ? ent.replace(/\B(?=(\d{3})+$)/g, '.') : ent;
  return dec === undefined ? miles : `${miles},${dec}`;
}

/** Importes en $, US$, £, USD o GBP a euros con la misma cifra: «$1,250.50» → «1250,50 €», «£4.2bn» → «4,2 mil millones de €». */
export function aEuros(texto) {
  return texto
    .replace(MONEDA, (_, a, sa, b, sb, c) => {
      const n = cifra(a ?? b ?? c);
      const s = (sa ?? sb ?? '').toLowerCase();
      return s === 'k' ? `${n} mil €` : s === 'm' ? `${n} millones de €` : s === 'bn' ? `${n} mil millones de €` : `${n} €`;
    })
    .replace(/€\s?\/\s?mo\b/g, '€/mes');
}

/** En los scripts de la página: `£${x}` o `$${x}` → `${x} €`. */
export function eurosEnScript(js) {
  return js.replace(/(?:£|\$)\$\{([^{}]+)\}/g, '${$1} €');
}

/** Precios partidos: «£<span>11.00</span>» → «<span>11.00</span> €». */
function simbolosSueltos($) {
  let n = 0;
  $('body *').each((_, el) => {
    for (const nodo of $(el).contents().toArray()) {
      const sig = nodo.next;
      if (nodo.type !== 'text' || !/(?:US)?[£$]\s*$/.test(nodo.data) || sig?.type !== 'tag') continue;
      if (!/^\s*\d[\d.,]*\s*$/.test($(sig).text())) continue;
      nodo.data = nodo.data.replace(/(?:US)?[£$]\s*$/, '');
      $(sig).after(' €');
      n++;
    }
  });
  return n;
}

/** Reglas sin IA: monedas, scripts, precios partidos y correos de ejemplo en mailto. */
export function reglasFijas($) {
  let n = simbolosSueltos($);
  $('body *, title').each((_, el) => {
    if ($(el).is('script')) {
      if ($(el).attr('src')) return;
      const js = $(el).html() ?? '';
      const nuevo = eurosEnScript(js);
      if (nuevo !== js) ($(el).text(nuevo), n++);
      return;
    }
    if ($(el).closest(OMITIR).length) return;
    for (const nodo of $(el).contents().toArray()) {
      if (nodo.type !== 'text') continue;
      const nuevo = aEuros(nodo.data);
      if (nuevo !== nodo.data) ((nodo.data = nuevo), n++);
    }
    for (const a of [...ATRIBUTOS, 'href']) {
      const v = $(el).attr(a);
      if (!v) continue;
      const nuevo = a === 'href' ? v.replace(/^(mailto:[^@]+)@(?:example\.(?:com|org|net)|domain\.com|email\.com|company\.com)/i, '$1@ejemplo.es') : aEuros(v);
      if (nuevo !== v) ($(el).attr(a, nuevo), n++);
    }
  });
  return n;
}

/** Respuesta válida de la IA para un lote: solo las claves pedidas, con texto que el vigilante acepta. */
export function aceptadas(pedido, respuesta) {
  const buenas = {};
  for (const [k, original] of Object.entries(pedido)) {
    const v = respuesta?.[k];
    if (typeof v !== 'string' || !v.trim() || v.trim() === original.trim()) continue;
    if (problemas(v).length) continue;
    buenas[k] = v;
  }
  return buenas;
}

function credenciales() {
  let tok = process.env.CLOUDFLARE_API_TOKEN;
  let acc = process.env.CLOUDFLARE_ACCOUNT_ID;
  // whoami también renueva el token OAuth de wrangler si ha caducado (por eso va antes de leerlo).
  const quien = acc && tok ? '' : execSync('npx wrangler whoami', { encoding: 'utf8' });
  acc ||= quien.match(/[0-9a-f]{32}/)?.[0];
  if (!tok) {
    const cfg = join(process.env.APPDATA ?? '', 'xdg.config/.wrangler/config/default.toml');
    tok = readFileSync(cfg, 'utf8').match(/oauth_token\s*=\s*"([^"]+)"/)?.[1];
  }
  if (!tok || !acc) throw new Error('Sin credenciales de Cloudflare (CLOUDFLARE_API_TOKEN / CLOUDFLARE_ACCOUNT_ID o wrangler login)');
  return { tok, acc };
}

async function ia({ tok, acc }, contexto, pedido) {
  const r = await fetch(`https://api.cloudflare.com/client/v4/accounts/${acc}/ai/run/${MODELO}`, {
    method: 'POST',
    headers: { authorization: `Bearer ${tok}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      messages: [
        { role: 'system', content: SISTEMA },
        { role: 'user', content: `Página: ${contexto}\n\n${JSON.stringify(pedido)}` },
      ],
      max_tokens: 4096,
    }),
  });
  if (r.status === 401 || r.status === 403) {
    // Credencial caducada o sin permiso: reintentar página a página no arregla nada.
    console.error(`Workers AI HTTP ${r.status}: renueva la sesión (npx wrangler whoami) o el token`);
    process.exit(2);
  }
  if (!r.ok) throw new Error(`Workers AI HTTP ${r.status}`);
  const res = (await r.json()).result?.response;
  const texto = typeof res === 'string' ? res : JSON.stringify(res);
  return JSON.parse(texto.slice(texto.indexOf('{'), texto.lastIndexOf('}') + 1));
}

/** Puntos de una página que el vigilante marca: [{texto, poner(nuevo)}]. */
export function marcados($) {
  const out = [];
  $('body *, title').each((_, el) => {
    if ($(el).closest(OMITIR).length) return;
    for (const n of $(el).contents().toArray()) {
      if (n.type !== 'text' || !n.data.trim() || !problemas(n.data).length) continue;
      const ini = n.data.match(/^\s*/)[0];
      const fin = n.data.match(/\s*$/)[0];
      out.push({ texto: n.data.trim(), poner: (v) => (n.data = ini + v + fin) });
    }
    for (const a of ATRIBUTOS) {
      const v = $(el).attr(a);
      if (v && problemas(v).length) out.push({ texto: v.trim(), poner: (nuevo) => $(el).attr(a, nuevo) });
    }
  });
  return out;
}

async function main() {
  const cache = existsSync(CACHE) ? JSON.parse(readFileSync(CACHE, 'utf8')) : {};
  let cred = null;
  let pendientesTotal = 0;
  for (const ruta of rutasDeDemos()) {
    const f = join(SITE, ruta, 'index.html');
    if (!existsSync(f)) continue;
    const html = readFileSync(f, 'utf8');
    const $ = load(html);
    const fijos = reglasFijas($);
    const puntos = marcados($);
    if (!puntos.length) {
      if (fijos) writeFileSync(f, $.html());
      continue;
    }
    const nuevos = [...new Set(puntos.map((p) => p.texto).filter((t) => !(t in cache)))];
    const contexto = limpiar($('title').first().text()) || ruta;
    for (let i = 0; i < nuevos.length; i += LOTE) {
      cred ??= credenciales();
      let pedido = Object.fromEntries(nuevos.slice(i, i + LOTE).map((t, k) => [String(k), t]));
      for (let intento = 0; intento < 3 && Object.keys(pedido).length; intento++) {
        try {
          const buenas = aceptadas(pedido, await ia(cred, contexto, pedido));
          for (const [k, v] of Object.entries(buenas)) cache[pedido[k]] = v;
          pedido = Object.fromEntries(Object.entries(pedido).filter(([k]) => !(k in buenas)));
        } catch (e) {
          console.log(`  ${ruta}: lote ${i / LOTE} intento ${intento + 1}: ${e.message}`);
        }
      }
      pendientesTotal += Object.keys(pedido).length;
      const ordenada = Object.fromEntries(Object.entries(cache).sort(([x], [y]) => (x < y ? -1 : 1)));
      writeFileSync(CACHE, JSON.stringify(ordenada, null, 1) + '\n');
    }
    let cambios = 0;
    for (const p of puntos) if (p.texto in cache) (p.poner(cache[p.texto]), cambios++);
    if (cambios || fijos) writeFileSync(f, $.html());
    console.log(`${ruta}: ${fijos} por regla, ${cambios}/${puntos.length} con IA`);
  }
  console.log(`Sin localizar (la IA no dio una respuesta válida): ${pendientesTotal}`);
}

function limpiar(t) {
  return t.replace(/\s+/g, ' ').trim();
}

if (process.argv[1] && import.meta.url === (await import('node:url')).pathToFileURL(process.argv[1]).href) await main();

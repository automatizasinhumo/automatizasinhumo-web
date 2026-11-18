// Empleado «corrector»: pasa los textos del catálogo por LanguageTool (servidor
// local en CI, imagen erikvl87/languagetool) y lista erratas con su servicio y campo.
// uso: node qa/ortografia.mjs [lt=http://localhost:8010]
// Lee la fuente (manual/catalogo), no la web: llms-full.txt aplana cada ficha en
// una línea y las viñetas y tablas se leían como una sola frase (falsos avisos).
// Solo avisa: sale con 0 y escribe el resumen en $GITHUB_STEP_SUMMARY si existe.
import { appendFileSync, writeFileSync } from 'node:fs';
import { productos, paginas } from '../manual/catalogo/catalogo.mjs';
import { descripcion } from '../manual/catalogo/descripcion.mjs';

const [lt = 'http://localhost:8010'] = process.argv.slice(2);

// Reglas que solo hacen ruido en fichas comerciales (tipografía, estilo).
const OFF = ['WHITESPACE_RULE', 'UPPERCASE_SENTENCE_START', 'ES_QUESTION_MARK', 'TYPOGRAPHY',
  'DOUBLE_PUNCTUATION', 'COMMA_PARENTHESIS_WHITESPACE', 'ES_UNPAIRED_BRACKETS', 'UNPAIRED_BRACKETS'];
// Marcas y palabras propias que LanguageTool no conoce.
const PROPIAS = new Set(('WhatsApp Telegram Stripe WordPress Astro Cloudflare WebP AVIF JPG PNG SVG ' +
  'hreflang sitemap RSS SEO RGPD SSL Holded Brevo MailerLite GetResponse Hostinger Raiola Webempresa ' +
  'Kinsta Elementor Systeme Lighthouse llms Porto Díaz Calendly Notion Airtable n8n Zapier Make ' +
  'Google Meta Analytics QR PDF CSV Excel Gmail Outlook iCal Mailchimp Shopify Woo WooCommerce ' +
  'vCard Linktree bio portfolio online email emails chatbot bot bots landing newsletter').split(' ').map((w) => w.toLowerCase()));

// Markdown → frases sueltas: sin tablas, títulos, viñetas ni negritas, y con punto final
// para que LanguageTool no concuerde palabras de dos viñetas distintas.
const frases = (md) => String(md ?? '').split(/\r?\n/)
  .filter((l) => l.trim() && !l.trim().startsWith('|'))
  .map((l) => l.replace(/^\s*(#+|[-*>]|\d+\.)\s*/, '').replace(/\*\*|__|`/g, '').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').trim())
  .filter(Boolean).map((l) => (/[.:!?…»)]$/.test(l) ? l : l + '.'));

// Unidades a revisar: [dónde, frases[]]
const unidades = [];
for (const p of productos) {
  if (p.activo === false) continue;
  const campos = { nombre: [p.nombre], resumen: [p.resumen], recibes: p.recibes, noIncluye: p.noIncluye, campos: p.campos, ejemplo: [p.ejemplo], muestra: [p.muestra], extra: [p.extra] };
  for (const [k, v] of Object.entries(campos)) if (v?.filter(Boolean).length) unidades.push([`${p.slug} · ${k}`, v.filter(Boolean).flatMap(frases)]);
}
for (const pg of paginas) unidades.push([`página ${pg.slug}`, frases(pg.md)]);
// Parte común de las fichas (plazo, modalidades, cómo funciona): una sola vez.
const d = descripcion(productos.find((p) => p.p.length === 2)).split('\n');
unidades.push(['fichas · parte común', frases(d.slice(d.findIndex((l) => l.startsWith('**Plazo:**'))).join('\n'))]);

// Lotes de ~10.000 caracteres; cada frase es un párrafo y se recuerda su unidad.
const lotes = [];
let cur = { texto: '', mapa: [] };
for (const [donde, fs] of unidades) {
  for (const f of fs) {
    if (cur.texto.length + f.length > 10000 && cur.texto) { lotes.push(cur); cur = { texto: '', mapa: [] }; }
    cur.mapa.push([cur.texto.length, donde]);
    cur.texto += f + '\n\n';
  }
}
if (cur.texto) lotes.push(cur);

const hallazgos = [];
for (const { texto, mapa } of lotes) {
  const body = new URLSearchParams({ text: texto, language: 'es', disabledRules: OFF.join(','), level: 'default' });
  const r = await fetch(lt + '/v2/check', { method: 'POST', body }).catch((e) => ({ ok: false, status: e.cause?.code ?? e.message }));
  if (!r.ok) { console.log(`LanguageTool HTTP ${r.status}`); continue; }
  const { matches = [] } = await r.json();
  for (const m of matches) {
    const mal = texto.slice(m.offset, m.offset + m.length);
    if (PROPIAS.has(mal.toLowerCase()) || /[_/@#`*|]/.test(mal) || /^\d/.test(mal)) continue;
    const donde = mapa.filter(([o]) => o <= m.offset).at(-1)?.[1] ?? '?';
    const ctx = texto.slice(Math.max(0, m.offset - 40), m.offset + m.length + 40).replace(/\s+/g, ' ');
    hallazgos.push({ donde, regla: m.rule?.id, mal, propuesta: m.replacements?.slice(0, 3).map((x) => x.value).join(' / '), mensaje: m.message, ctx });
  }
}

const esc = (s) => String(s).replace(/\|/g, '\\|');
const lineas = [`## Corrector (LanguageTool): ${hallazgos.length} avisos en ${unidades.length} textos del catálogo`, '',
  '| Dónde | Texto | Propuesta | Contexto | Regla |', '|---|---|---|---|---|',
  ...hallazgos.slice(0, 200).map((h) => `| ${esc(h.donde)} | ${esc(h.mal)} | ${esc(h.propuesta || '—')} | …${esc(h.ctx)}… | ${h.regla} |`)];
console.log(lineas.join('\n'));
writeFileSync('ortografia.json', JSON.stringify(hallazgos, null, 2));
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, lineas.join('\n') + '\n');

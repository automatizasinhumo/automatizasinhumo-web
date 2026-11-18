// Empleado «corrector»: pasa el texto público de la tienda por LanguageTool
// (servidor local en CI, imagen erikvl87/languagetool) y lista las erratas.
// uso: node qa/ortografia.mjs <base> [lt=http://localhost:8010]
// Lee /llms-full.txt (todas las fichas y páginas) y /llms.txt. Solo avisa:
// sale con 0 y escribe el resumen en $GITHUB_STEP_SUMMARY si existe.
import { appendFileSync, writeFileSync } from 'node:fs';

const [base, lt = 'http://localhost:8010'] = process.argv.slice(2);
if (!base) { console.error('uso: node qa/ortografia.mjs <base> [lt]'); process.exit(2); }

// Reglas que solo hacen ruido en fichas comerciales (tipografía, estilo).
const OFF = ['WHITESPACE_RULE', 'UPPERCASE_SENTENCE_START', 'ES_QUESTION_MARK', 'TYPOGRAPHY',
  'DOUBLE_PUNCTUATION', 'COMMA_PARENTHESIS_WHITESPACE', 'ES_UNPAIRED_BRACKETS', 'UNPAIRED_BRACKETS'];
// Marcas y palabras propias que LanguageTool no conoce.
const PROPIAS = new Set(('WhatsApp Telegram Stripe WordPress Astro Cloudflare WebP AVIF JPG PNG SVG ' +
  'hreflang sitemap RSS SEO RGPD SSL Holded Brevo MailerLite GetResponse Hostinger Raiola Webempresa ' +
  'Kinsta Elementor Systeme Lighthouse llms Porto Díaz Calendly Notion Airtable n8n Zapier Make ' +
  'Google Meta Analytics QR PDF CSV Excel Gmail Outlook iCal Mailchimp Shopify Woo WooCommerce').split(' ').map((w) => w.toLowerCase()));

const textos = [];
for (const ruta of ['/llms-full.txt', '/llms.txt']) {
  const r = await fetch(base + ruta);
  if (r.ok) textos.push([ruta, await r.text()]);
  else console.log(`${ruta}: HTTP ${r.status}`);
}

// LanguageTool acepta peticiones de tamaño moderado: trocear por párrafos.
function trozos(t, max = 12000) {
  const out = []; let cur = '';
  for (const p of t.split(/\n{2,}/)) {
    if ((cur + p).length > max && cur) { out.push(cur); cur = ''; }
    cur += p + '\n\n';
  }
  if (cur.trim()) out.push(cur);
  return out;
}

const hallazgos = [];
for (const [ruta, t] of textos) {
  for (const trozo of trozos(t)) {
    const body = new URLSearchParams({ text: trozo, language: 'es', disabledRules: OFF.join(','), level: 'default' });
    const r = await fetch(lt + '/v2/check', { method: 'POST', body });
    if (!r.ok) { console.log(`LanguageTool HTTP ${r.status}`); continue; }
    const { matches = [] } = await r.json();
    for (const m of matches) {
      const mal = trozo.slice(m.offset, m.offset + m.length);
      if (PROPIAS.has(mal.toLowerCase()) || /[_/@#`*|]/.test(mal) || /^\d/.test(mal)) continue;
      const ctx = trozo.slice(Math.max(0, m.offset - 40), m.offset + m.length + 40).replace(/\s+/g, ' ');
      hallazgos.push({ ruta, regla: m.rule?.id, mal, propuesta: m.replacements?.slice(0, 3).map((x) => x.value).join(' / '), mensaje: m.message, ctx });
    }
  }
}

const lineas = [`## Corrector (LanguageTool): ${hallazgos.length} avisos`, '',
  '| Texto | Propuesta | Contexto | Regla |', '|---|---|---|---|',
  ...hallazgos.slice(0, 200).map((h) => `| ${h.mal} | ${h.propuesta || '—'} | …${h.ctx.replace(/\|/g, '\\|')}… | ${h.regla} |`)];
console.log(lineas.join('\n'));
writeFileSync('ortografia.json', JSON.stringify(hallazgos, null, 2));
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, lineas.join('\n') + '\n');

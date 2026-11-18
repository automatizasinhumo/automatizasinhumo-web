// Quita de las demos lo que delata la plantilla de origen: créditos al autor, enlaces a su
// repositorio, «plantilla gratuita» en el título, datos estructurados del autor y créditos de fotos.
// La licencia (LICENSE.txt) se conserva en el sitio; el cliente no la ve en la página.
// Parser: cheerio (MIT) — https://github.com/cheeriojs/cheerio
import * as cheerio from 'cheerio';

// Hosts de autores y catálogos de plantillas, y de bancos de fotos que no exigen atribución.
const HOSTS = /(^|\.)(github\.com|github\.io|gitlab\.com|uicookies\.com|colorlib\.com|themewagon\.com|bootstrapmade\.com|html5up\.net|startbootstrap\.com|templatemo\.com|tooplate\.com|unsplash\.com|pexels\.com)$/i;
// «free … template/kit», «plantilla gratuita», autor, licencia, fuente, banco de fotos (inglés y español).
const CREDITO = /\b(free|gratuit[ao]|gratis)\b.{0,40}\b(templates?|plantillas?|kit|pack|paquete|theme|tema)\b|\b(templates?|plantillas?|kit|paquete)\b.{0,20}\b(gratuit[ao]|gratis|free)\b|template by|designed by|dise[ñn]ad[ao] por|licencia (de )?MIT|MIT licen[cs]e|fuente en github|source on github|adaptada por automatiza|uicookies|colorlib|the company is fictional|la empresa es ficticia|fotos? (de |by )?(unsplash|pexels)|photos? (by|from) (unsplash|pexels)/i;
const TITULO = /plantilla|template|gratuit|free|\(html\)/i;
const MAX = 220; // un bloque con más texto no es un crédito: solo se quita el enlace

const host = (href) => { try { return new URL(href, 'https://x.invalid/').hostname; } catch { return ''; } };

export function limpiarCreditos(html, titulo = 'Diseño de ejemplo') {
  if (!/<html|<body|<footer/i.test(html)) return html;
  const $ = cheerio.load(html, { decodeEntities: false });
  $('script[type="application/ld+json"], meta[name="author"], meta[name="generator"], .credit, .credits').remove();
  // Metadatos que apuntan a la web del autor (canonical, og:url, og:image, twitter:image…).
  $('link[rel="canonical"], link[rel="alternate"], meta[content]').each((_, m) => {
    const v = $(m).attr('href') ?? $(m).attr('content') ?? '';
    if (/^https?:\/\//i.test(v) && HOSTS.test(host(v))) $(m).remove();
  });
  $('a[href]').each((_, a) => {
    if (!HOSTS.test(host($(a).attr('href')))) return;
    // El crédito suele ser el bloque pequeño que contiene el enlace («Plantilla gratuita de X»).
    const p = $(a).parent();
    const t = p.text().trim();
    if (p.length && !p.is('body, main, section, article, nav, ul, header') && t.length <= MAX && CREDITO.test(t + ' ' + $(a).text())) p.remove();
    else if (CREDITO.test($(a).text()) || /github|gitlab/i.test(host($(a).attr('href')))) $(a).remove();
  });
  // Textos sueltos de crédito sin enlace (p. ej. «Una plantilla gratuita para uicookies.»).
  $('footer p, footer span, footer small, footer div, p.small, small').each((_, el) => {
    const t = $(el).text().trim();
    if (t.length <= MAX && CREDITO.test(t) && $(el).children('a, button, form, input').length === 0) {
      // Conserva el «© año Negocio» si va en el mismo párrafo.
      const copy = t.match(/^©[^.—–·|]*?(?=\s*[.—–·|]|\s+(una?|a|plantilla|fotos?|photos?|template))/i);
      if (copy) $(el).text(copy[0].trim()); else $(el).remove();
    }
  });
  const tt = $('title');
  if (tt.length && TITULO.test(tt.text())) tt.text(`${titulo} · Automatiza sin humo`);
  $('meta[name="description"], meta[property="og:description"], meta[name="twitter:description"]').each((_, m) => {
    if (TITULO.test($(m).attr('content') ?? '')) $(m).attr('content', `${titulo}: diseño de ejemplo adaptable con tus textos, fotos y colores.`);
  });
  $('meta[property="og:title"], meta[name="twitter:title"]').each((_, m) => {
    if (TITULO.test($(m).attr('content') ?? '')) $(m).attr('content', `${titulo} · Automatiza sin humo`);
  });
  return $.html();
}

// Escáner de violaciones CSP: recorre portada + enlaces internos y cuenta los «Refused to…» de la consola.
// uso: node qa/csp-violaciones.mjs <base>   (con qa/navegador/node_modules enlazado)
import { chromium } from 'playwright';
const base = process.argv[2];
const br = await chromium.launch();
const pg = await br.newPage();
const v = new Set();
pg.on('console', m => { if (/Content Security Policy|Refused to/i.test(m.text())) v.add(pg.url().replace(base,'') + ' :: ' + m.text().slice(0, 220)); });
await pg.goto(base + '/', { waitUntil: 'load' });
const hrefs = [...new Set(await pg.$$eval('a[href^="/"]', as => as.map(a => a.getAttribute('href').split('#')[0])))].filter(h => !/^\/(api|logout|checkout)/.test(h)).slice(0, 40);
for (const h of ['/', '/search?q=web', '/admin/setup', ...hrefs]) {
  try { await pg.goto(base + h, { waitUntil: 'load', timeout: 20000 }); await pg.waitForTimeout(300); } catch {}
}
console.log('paginas:', hrefs.length + 3, 'violaciones:', v.size);
for (const x of [...v].slice(0, 25)) console.log(x);
await br.close();

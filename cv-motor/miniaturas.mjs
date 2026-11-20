// Miniaturas del selector de diseños: pinta el CV de ejemplo con cada plantilla en un
// navegador real y guarda la parte de arriba de la página en ../public/cv/miniaturas/<slug>.webp.
// Uso (después de construir): node --experimental-strip-types miniaturas.mjs
// Necesita Microsoft Edge o Chrome instalado (playwright-core no descarga navegadores).
import { createServer } from 'node:http';
import { mkdirSync, readFileSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import sharp from 'sharp';
import { CV_EJEMPLO, prepararCv } from '../src/features/cv/esquema.ts';

const publico = fileURLToPath(new URL('../public/', import.meta.url));
const salida = join(publico, 'cv', 'miniaturas');
mkdirSync(salida, { recursive: true });

const TIPOS = { '.js': 'text/javascript', '.json': 'application/json', '.html': 'text/html' };
const servidor = createServer((req, res) => {
  const ruta = normalize(join(publico, decodeURIComponent(new URL(req.url, 'https://local.invalid').pathname)));
  if (!ruta.startsWith(publico)) return res.writeHead(403).end();
  if (ruta.endsWith('vacia.html')) return res.writeHead(200, { 'content-type': 'text/html' }).end('<!doctype html><title>.</title>');
  try {
    res.writeHead(200, { 'content-type': TIPOS[extname(ruta)] ?? 'application/octet-stream' }).end(readFileSync(ruta));
  } catch {
    res.writeHead(404).end();
  }
}).listen(0);
const puerto = servidor.address().port;

const canal = process.env.CANAL_NAVEGADOR ?? 'msedge';
const navegador = await chromium.launch({ channel: canal });
const pagina = await navegador.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 1 });
await pagina.goto(`http://localhost:${puerto}/vacia.html`);
const plantillas = await pagina.evaluate(async () => (await import('/cv/motor/motor.js')).PLANTILLAS);
const cv = prepararCv(CV_EJEMPLO);
let fallos = 0;
for (const slug of plantillas) {
  try {
    const html = await pagina.evaluate(async ([s, datos]) => (await import('/cv/motor/motor.js')).renderizar(s, datos), [slug, cv]);
    await pagina.setContent(html, { waitUntil: 'load' });
    const png = await pagina.screenshot({ clip: { x: 0, y: 0, width: 794, height: 1123 } });
    await sharp(png).resize(320).webp({ quality: 70 }).toFile(join(salida, `${slug}.webp`));
    await pagina.goto(`http://localhost:${puerto}/vacia.html`);
  } catch (e) {
    fallos++;
    console.error(`${slug}: ${e.message}`);
  }
}
await navegador.close();
servidor.close();
console.log(`Miniaturas: ${plantillas.length - fallos}/${plantillas.length} en public/cv/miniaturas/`);
if (fallos) process.exit(1);

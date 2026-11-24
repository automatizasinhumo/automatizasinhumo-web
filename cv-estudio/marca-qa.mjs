// QA de la marca de agua: pinta cada plantilla con datos de cliente (con marca) para revisar
// que la marca no pisa texto ni cabeceras de color. Uso: npm run construir && node marca-qa.mjs [carpeta]
// Navegador: el Chromium de Playwright; si no está, Edge (CHROMIUM=ruta para forzar uno).
import { createServer } from 'node:http';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const publico = fileURLToPath(new URL('../public/', import.meta.url));
const salida = process.argv[2] ?? path.join(process.cwd(), 'marca-qa');
const ANCHO = 480; // 2x del ancho de la tarjeta en la galería

// Muestra de la plantilla personalizable: una base con formas, sombreado y color propio.
const PERSONALIZABLE = { plantilla: 'onyx', color: '#b34a28', decoracion: { forma: 'burbujas', color: '#b34a28', color2: '#e0a526', intensidad: 0.8, posicion: 'ambas', sombreado: 'cabecera', fondo: 'papel' } };

const tipos = { '.js': 'text/javascript', '.mjs': 'text/javascript', '.woff': 'font/woff', '.woff2': 'font/woff2' };
const srv = createServer((req, res) => {
  const ruta = decodeURIComponent((req.url ?? '/').split('?')[0]);
  if (ruta === '/') {
    res.writeHead(200, { 'content-type': 'text/html' });
    return res.end('<!doctype html><meta charset=utf-8><div id=v></div><script type=module src="/cv/estudio/motor/estudio.js"></script>');
  }
  try {
    const fichero = path.join(publico, path.normalize(ruta).replace(/^[\\/]+/, ''));
    if (!fichero.startsWith(publico)) throw new Error('fuera');
    res.writeHead(200, { 'content-type': tipos[path.extname(ruta)] ?? 'application/octet-stream' });
    res.end(readFileSync(fichero));
  } catch {
    res.writeHead(404);
    res.end();
  }
});
await new Promise((r) => srv.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${srv.address().port}/`;

async function abrir() {
  if (process.env.CHROMIUM) return chromium.launch({ executablePath: process.env.CHROMIUM });
  try {
    return await chromium.launch();
  } catch {
    return chromium.launch({ channel: 'msedge' });
  }
}

const nav = await abrir();
try {
  const p = await nav.newPage({ viewport: { width: ANCHO, height: 800 } });
  const errores = [];
  p.on('pageerror', (e) => errores.push(String(e)));
  await p.goto(base);
  await p.waitForFunction(() => window.CvEstudio, null, { timeout: 60000 });
  mkdirSync(salida, { recursive: true });
  const ids = process.env.PLANTILLAS?.split(',') ?? (await p.evaluate(() => window.CvEstudio.plantillas.map((t) => t.id)));
  for (const plantilla of ids) {
    const pdf = await p.evaluate(
      async ({ plantilla, ancho }) => {
        const E = window.CvEstudio;
        const datos = E.crearDatos(E.formEjemplo, plantilla);
        const blob = await E.crearPdf({ datos, plantilla, marcaAgua: 'VISTA PREVIA' });
        await E.pintarPdf(blob, document.getElementById('v'), { ancho, maxPaginas: 1 });
        const b = new Uint8Array(await blob.arrayBuffer());
        let s = ''; for (const x of b) s += String.fromCharCode(x);
        return btoa(s);
      },
      { plantilla, ancho: 700 },
    );
    if (process.env.PDF) writeFileSync(path.join(salida, `${plantilla}.pdf`), Buffer.from(pdf, 'base64'));
    await p.locator('#v canvas').first().screenshot({ path: path.join(salida, `${plantilla}.png`) });
  }
  if (errores.length) throw new Error(`Errores en el navegador: ${errores.join(' | ')}`);
  console.log(`${ids.length} vistas con marca en ${salida}`);
} finally {
  await nav.close();
  srv.close();
}

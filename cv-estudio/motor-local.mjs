// Motor de CV en local para los scripts de QA y miniaturas: sirve public/ y abre el estudio en un
// navegador sin cabeza. Navegador: el Chromium de Playwright; si no está, Edge (CHROMIUM=ruta para forzar uno).
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

export const publico = fileURLToPath(new URL('../public/', import.meta.url));
export const ANCHO = 480; // 2x del ancho de la tarjeta en la galería

// Muestra de la plantilla personalizable: una base con formas, sombreado y color propio.
export const PERSONALIZABLE = { plantilla: 'onyx', color: '#b34a28', decoracion: { forma: 'burbujas', color: '#b34a28', color2: '#e0a526', intensidad: 0.8, posicion: 'ambas', sombreado: 'cabecera', fondo: 'papel' } };

const tipos = { '.js': 'text/javascript', '.mjs': 'text/javascript', '.woff': 'font/woff', '.woff2': 'font/woff2' };

function servir() {
  return createServer((req, res) => {
    const ruta = decodeURIComponent((req.url ?? '/').split('?')[0]);
    if (ruta === '/') {
      res.writeHead(200, { 'content-type': 'text/html' });
      return res.end('<!doctype html><meta charset=utf-8><div id=v></div><script type=module src="/cv/estudio/motor/estudio.js"></script>');
    }
    let cuerpo;
    try {
      const fichero = path.join(publico, path.normalize(ruta).replace(/^[\/]+/, ''));
      if (!fichero.startsWith(publico)) throw new Error('fuera');
      cuerpo = readFileSync(fichero); // antes de la cabecera: si falta, el 404 aún se puede enviar
    } catch {
      res.writeHead(404);
      return res.end();
    }
    res.writeHead(200, { 'content-type': tipos[path.extname(ruta)] ?? 'application/octet-stream' });
    res.end(cuerpo);
  });
}

async function abrir() {
  if (process.env.CHROMIUM) return chromium.launch({ executablePath: process.env.CHROMIUM });
  try {
    return await chromium.launch();
  } catch {
    return chromium.launch({ channel: 'msedge' });
  }
}

/** Abre el estudio con el motor cargado; `trabajo(p, errores)` hace lo suyo y al final se cierra todo. */
export async function conMotor(trabajo) {
  const srv = servir();
  await new Promise((r) => srv.listen(0, '127.0.0.1', r));
  const nav = await abrir();
  try {
    const p = await nav.newPage({ viewport: { width: ANCHO, height: 800 } });
    const errores = [];
    p.on('pageerror', (e) => errores.push(String(e)));
    await p.goto(`http://127.0.0.1:${srv.address().port}/`);
    await p.waitForFunction(() => window.CvEstudio, null, { timeout: 60000 });
    await trabajo(p, errores);
  } finally {
    await nav.close();
    srv.close();
  }
}

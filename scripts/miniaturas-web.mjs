#!/usr/bin/env node
// Regenera las miniaturas de los diseños de web (public/images/webs/mini/<id>.webp) y su
// manifiesto de huellas (src/features/servicios/miniaturas-web.json). Ver miniaturasWeb.ts.
//
// Uso:
//   1. Arranca la web en local:   npx astro dev --port 4329
//   2. Arranca Edge o Chrome con depuración:
//        msedge --headless=new --remote-debugging-port=9251 --user-data-dir=<carpeta temporal>
//   3. node scripts/miniaturas-web.mjs [http://localhost:4329] [9251]
//
// Abre /servicios/web?miniaturas=vivas (todas pintadas en vivo), espera a las tipografías y
// fotografía cada miniatura al doble de resolución en WebP. Solo reescribe las que han cambiado.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const base = (process.argv[2] ?? 'http://localhost:4329').replace(/\/$/, '');
const puerto = Number(process.argv[3] ?? 9251);
const ANCHO = 600;
const raiz = new URL('../', import.meta.url);
const carpeta = new URL('public/images/webs/mini/', raiz);
const rutaManifiesto = new URL('src/features/servicios/miniaturas-web.json', raiz);
mkdirSync(carpeta, { recursive: true });

const pestana = await (await fetch(`http://127.0.0.1:${puerto}/json/new?about:blank`, { method: 'PUT' })).json();
// Solo el navegador local: nada de seguir una URL de depuración que apunte a otra máquina.
const urlWs = new URL(pestana.webSocketDebuggerUrl);
if (urlWs.protocol !== 'ws:' || !['127.0.0.1', 'localhost'].includes(urlWs.hostname)) throw new Error(`Depurador inesperado: ${urlWs.host}`);
const ws = new WebSocket(urlWs.href);
await new Promise((r, e) => {
  ws.addEventListener('open', r);
  ws.addEventListener('error', e);
});
let n = 0;
const pendientes = new Map();
ws.addEventListener('message', (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pendientes.has(m.id)) {
    const [ok, mal] = pendientes.get(m.id);
    pendientes.delete(m.id);
    if (m.error) mal(new Error(`${m.error.message} ${m.error.data ?? ''}`));
    else ok(m.result);
  }
});
const cdp = (method, params = {}) =>
  new Promise((ok, mal) => {
    const id = ++n;
    pendientes.set(id, [ok, mal]);
    ws.send(JSON.stringify({ id, method, params }));
  });
const evaluar = async (expression) => {
  const r = await cdp('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text);
  return r.result.value;
};
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  await cdp('Page.enable');
  // Escritorio: tarjetas de ~300 px de ancho. Sin animaciones, para no fotografiarlas a medias.
  await cdp('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 2, mobile: false });
  await cdp('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await cdp('Page.navigate', { url: `${base}/servicios/web?miniaturas=vivas` });
  let lista = false;
  for (let i = 0; i < 60 && !lista; i++) {
    lista = await evaluar(`document.readyState === 'complete' && !!document.querySelector('[data-mini][data-pintada]')`).catch(() => false);
    if (!lista) await esperar(500);
  }
  if (!lista) throw new Error('La página no pintó las miniaturas en 30 s: no se captura nada a medias.');
  // Sin guía ni avisos encima (se repite antes de cada captura: la guía puede abrirse tarde).
  const limpiar = () => evaluar(`document.querySelectorAll('.driver-popover, .driver-overlay, [data-aviso-cookies]').forEach((x) => x.remove()); true`);
  const minis = await evaluar(`[...document.querySelectorAll('[data-mini]')].map((el) => ({ id: el.dataset.mini, huella: el.dataset.huella }))`);
  if (!minis.length) throw new Error('No hay miniaturas en la página: ¿está arrancada la web?');
  const manifiesto = JSON.parse(readFileSync(rutaManifiesto, 'utf8'));
  let hechas = 0;
  for (const { id, huella } of minis) {
    if (!huella) throw new Error(`La miniatura ${id} no trae data-huella`);
    const caja = await evaluar(`(async () => {
      const el = document.querySelector('[data-mini="${id}"]');
      el.scrollIntoView({ block: 'center' });
      await document.fonts.ready;
      await new Promise((r) => setTimeout(r, 400));
      const r = el.getBoundingClientRect();
      return { x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height };
    })()`);
    await limpiar();
    const { data } = await cdp('Page.captureScreenshot', {
      format: 'webp',
      quality: 72,
      captureBeyondViewport: true,
      // Siempre 600 px de ancho (los width/height del <img>), sea cual sea el ancho de la tarjeta.
      clip: { x: caja.x, y: caja.y, width: caja.w, height: caja.h, scale: ANCHO / (caja.w * 2) },
    });
    writeFileSync(new URL(`${id}.webp`, carpeta), Buffer.from(data, 'base64'));
    if (manifiesto[id] !== huella) hechas++;
    manifiesto[id] = huella;
    console.log(`${id.padEnd(14)} ${huella} ${Math.round((data.length * 3) / 4 / 1024)} KB`);
  }
  const ordenado = Object.fromEntries(Object.keys(manifiesto).filter((k) => minis.some((m) => m.id === k)).sort((a, b) => a.localeCompare(b)).map((k) => [k, manifiesto[k]]));
  writeFileSync(rutaManifiesto, `${JSON.stringify(ordenado, null, 2)}\n`);
  console.log(`${minis.length} miniaturas (${hechas} con huella nueva). Manifiesto: src/features/servicios/miniaturas-web.json`);
} finally {
  await fetch(`http://127.0.0.1:${puerto}/json/close/${pestana.id}`).catch(() => {});
  ws.close();
}

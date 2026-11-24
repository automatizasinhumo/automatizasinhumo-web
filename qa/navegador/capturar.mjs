// Uso: node capturar.mjs <url> <salida.png> [ancho] [alto]   (captura de página completa; guías apagadas)
import { chromium } from 'playwright';
const [url, salida, ancho = '1280', alto = '900'] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +ancho, height: +alto } });
if (process.env.GUIAS !== 'si') await p.addInitScript(() => localStorage.setItem('ash:guias', 'no'));
await p.goto(url, { waitUntil: 'networkidle' });
await p.waitForTimeout(1500);
await p.screenshot({ path: salida, fullPage: process.env.COMPLETA !== 'no' });
await b.close();

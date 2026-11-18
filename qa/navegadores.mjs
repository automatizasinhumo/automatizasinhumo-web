// Empleado «multinavegador»: abre las páginas clave en Chromium, Firefox y
// WebKit (Safari) a 360 px y 1280 px. Falla si hay errores de JavaScript o
// de consola, o si la página se sale de ancho en móvil. Guarda capturas en
// capturas/ para revisarlas a ojo (artefacto del workflow).
// uso: node qa/navegadores.mjs <base> [fichero-de-rutas=qa/urls.txt]
import { readFileSync, mkdirSync, appendFileSync } from 'node:fs';
import { chromium, firefox, webkit } from 'playwright';

const [base, lista = 'qa/urls.txt'] = process.argv.slice(2);
const rutas = readFileSync(lista, 'utf8').split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
const ANCHOS = [360, 1280];
// Ruido conocido que no depende de la tienda (beacons de analítica bloqueados, etc.).
const IGNORAR = [/cloudflareinsights/i, /favicon/i, /Failed to load resource.*\b(404|net::ERR_BLOCKED)/i];
mkdirSync('capturas', { recursive: true });

const fallos = [];
for (const [nombre, tipo] of [['chromium', chromium], ['firefox', firefox], ['webkit', webkit]]) {
  const br = await tipo.launch();
  for (const ancho of ANCHOS) {
    const ctx = await br.newContext({ viewport: { width: ancho, height: 800 }, locale: 'es-ES' });
    for (const ruta of rutas) {
      const pg = await ctx.newPage();
      const errores = [];
      pg.on('pageerror', (e) => errores.push('JS: ' + e.message));
      pg.on('console', (m) => { if (m.type() === 'error' && !IGNORAR.some((r) => r.test(m.text()))) errores.push('consola: ' + m.text()); });
      try {
        const r = await pg.goto(base + ruta, { waitUntil: 'load', timeout: 45000 });
        if (!r || r.status() >= 400) errores.push(`HTTP ${r?.status()}`);
        await pg.waitForTimeout(800);
        const sobra = await pg.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        if (ancho <= 400 && sobra > 2) errores.push(`se sale ${sobra}px de ancho`);
        const fichero = `capturas/${nombre}-${ancho}-${ruta.replace(/[^a-z0-9]+/gi, '_') || 'home'}.png`;
        await pg.screenshot({ path: fichero, fullPage: false });
      } catch (e) { errores.push('carga: ' + e.message.split('\n')[0]); }
      for (const e of errores) fallos.push(`${nombre} ${ancho}px ${ruta} → ${e}`);
      await pg.close();
    }
    await ctx.close();
  }
  await br.close();
}

const resumen = fallos.length ? `## Multinavegador: ${fallos.length} fallos\n\n${fallos.map((f) => '- ' + f).join('\n')}\n`
  : `## Multinavegador: sin fallos (${rutas.length} rutas × 3 motores × ${ANCHOS.length} anchos)\n`;
console.log(resumen);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, resumen);
process.exit(fallos.length ? 1 : 0);

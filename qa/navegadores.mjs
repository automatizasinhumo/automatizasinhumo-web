// Empleado «multinavegador»: abre las páginas clave en Chromium, Firefox y WebKit (Safari)
// a 360, 390 y 1280 px con la prueba funcional común (qa/funcional.mjs): errores de
// JavaScript o de consola, recursos y enlaces internos rotos, formularios sin enviar o sin
// etiquetas, anclas sin destino y desbordamiento en móvil. Guarda capturas en capturas/
// para revisarlas a ojo (artefacto del workflow).
// uso: node qa/navegadores.mjs <base> [fichero-de-rutas=qa/urls.txt]
import { readFileSync, mkdirSync, appendFileSync } from 'node:fs';
import { chromium, firefox, webkit } from 'playwright';
import { ANCHOS, revisarPagina } from './funcional.mjs';

const [base, lista = 'qa/urls.txt'] = process.argv.slice(2);
const rutas = readFileSync(lista, 'utf8')
  .split(/\r?\n/)
  .map((s) => s.trim())
  .filter(Boolean);
mkdirSync('capturas', { recursive: true });

const fallos = [];
// Los enlaces internos se piden una vez por ejecución, no por motor ni por ancho.
const comprobados = new Set();
for (const [nombre, tipo] of [
  ['chromium', chromium],
  ['firefox', firefox],
  ['webkit', webkit],
]) {
  const br = await tipo.launch();
  for (const ancho of ANCHOS) {
    const ctx = await br.newContext({
      viewport: { width: ancho, height: 800 },
      locale: 'es-ES',
    });
    for (const ruta of rutas) {
      const captura = `capturas/${nombre}-${ancho}-${ruta.replace(/[^a-z0-9]+/gi, '_') || 'home'}.png`;
      for (const e of await revisarPagina(ctx, base + ruta, {
        ancho,
        captura,
        comprobados,
      }))
        fallos.push(`${nombre} ${ancho}px ${ruta} → ${e}`);
    }
    await ctx.close();
  }
  await br.close();
}

const resumen = fallos.length
  ? `## Multinavegador: ${fallos.length} fallos\n\n${fallos.map((f) => '- ' + f).join('\n')}\n`
  : `## Multinavegador: sin fallos (${rutas.length} rutas × 3 motores × ${ANCHOS.length} anchos)\n`;
console.log(resumen);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, resumen);
process.exit(fallos.length ? 1 : 0);

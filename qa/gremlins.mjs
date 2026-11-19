// Empleado «gremlins» (ronda 22, QA de caos): suelta una horda de gremlins.js (marmelab, MIT)
// en cada página principal y comprueba que ninguna interacción aleatoria (clics, toques,
// escritura en campos, scroll) provoca errores de JavaScript ni rompe la página.
// Seguridad: el navegador aborta toda petición que no sea GET y toda navegación posterior a
// la carga (con un 204), así que ningún formulario se envía y la horda se queda en su página.
// uso: node qa/gremlins.mjs <base> [acciones=1000]
// Repetir una tanda: SEMILLA=<n> node qa/gremlins.mjs <base>
import { appendFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

const [base, n = '1000'] = process.argv.slice(2);
if (!base) throw new Error('uso: node qa/gremlins.mjs <base> [acciones]');
const origen = new URL(base).origin;
const semilla = process.env.SEMILLA ? Number(process.env.SEMILLA) : Date.now() % 2 ** 31;
const script = createRequire(import.meta.url).resolve('gremlins.js/dist/gremlins.min.js');
const RUTAS = ['/', '/servicios', '/webs', '/blog', '/contacto', '/como-funciona', '/search?q=web'];
const IGNORAR = [/cloudflareinsights/i, /challenges\.cloudflare/i];
mkdirSync('capturas', { recursive: true });

const navegador = await chromium.launch();
const fallos = [];
let probadas = 0;
for (const [ancho, alto] of [[1280, 800], [390, 844]]) {
  const contexto = await navegador.newContext({ viewport: { width: ancho, height: alto }, hasTouch: ancho < 500 });
  for (const ruta of RUTAS) {
    const pagina = await contexto.newPage();
    const errores = [];
    let cargada = false;
    pagina.on('pageerror', (e) => errores.push(String(e.message || e)));
    pagina.on('dialog', (d) => d.dismiss().catch(() => {}));
    await pagina.route('**/*', (r) => {
      const q = r.request();
      if (q.method() !== 'GET') return r.abort();
      // Un 204 cancela la navegación sin salir de la página (abortar mostraría la página de error).
      if (cargada && q.isNavigationRequest() && q.frame() === pagina.mainFrame()) return r.fulfill({ status: 204 });
      return r.continue();
    });
    const url = origen + ruta;
    const resp = await pagina.goto(url, { waitUntil: 'load' }).catch((e) => ({ status: () => 0, e }));
    if (resp.status() === 404) { await pagina.close(); continue; } // ruta que este tema no tiene
    if (resp.status() >= 400 || resp.status() === 0) { fallos.push(`${url} @${ancho}: HTTP ${resp.status()}`); await pagina.close(); continue; }
    cargada = true;
    probadas++;
    await pagina.addScriptTag({ path: script });
    await pagina.evaluate(async ({ n, semilla }) => {
      const g = window.gremlins;
      await g.createHorde({
        randomizer: new g.Chance(semilla),
        species: [g.species.clicker(), g.species.toucher(), g.species.formFiller(), g.species.scroller(), g.species.typer()],
        mogwais: [g.mogwais.alert(), g.mogwais.gizmo({ maxErrors: 1000 })],
        strategies: [g.strategies.distribution({ delay: 5, nb: n })],
      }).unleash().catch(() => {});
    }, { n: Number(n), semilla }).catch((e) => errores.push(`horda: ${e.message}`));
    const vivos = await pagina.evaluate(() => document.body && document.body.innerText.trim().length > 0).catch(() => false);
    const propios = errores.filter((e) => !IGNORAR.some((r) => r.test(e)));
    if (propios.length || !vivos) {
      const nombre = `gremlins-${ancho}-${ruta.replace(/\W+/g, '_') || 'inicio'}.png`;
      await pagina.screenshot({ path: `capturas/${nombre}` }).catch(() => {});
      fallos.push(`${url} @${ancho}: ${!vivos ? 'página vacía tras la horda; ' : ''}${[...new Set(propios)].slice(0, 5).join(' | ')}`);
    }
    await pagina.close();
  }
  await contexto.close();
}
await navegador.close();
if (!probadas) fallos.push('ninguna ruta respondió: revisar RUTAS o la base');

const resumen = [`## Gremlins (semilla ${semilla}, ${n} acciones en ${probadas} páginas)`, '',
  fallos.length ? fallos.map((f) => `- ${f}`).join('\n') : 'Sin errores de JavaScript ni páginas rotas.', ''].join('\n');
console.log(resumen);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, resumen + '\n');
process.exit(fallos.length ? 1 : 0);

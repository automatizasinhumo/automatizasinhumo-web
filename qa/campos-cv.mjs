// Prueba de límites del formulario del CV (/servicios/cv/) en un navegador real: mínimos (sin nombre no
// se avanza), máximos (cada campo tiene tope y lo respeta; cada lista se para en su máximo) y formato
// (acentos, emojis, HTML y textos al límite llegan a la vista previa sin romperla; un correo, teléfono o
// enlace mal escrito se avisa en «Revisa»). Sale con código 1 y la lista de problemas si algo falla.
// Uso: node qa/campos-cv.mjs [http://localhost:4321]
import { chromium } from 'playwright';

const BASE = (process.argv[2] ?? 'http://localhost:4321').replace(/\/$/, '');
const RELLENO = 'Ñandú «café» <b>negrita</b> & 😀 ';
const problemas = [];
const mal = (m) => problemas.push(m);

const navegador = process.env.CHROMIUM ? await chromium.launch({ executablePath: process.env.CHROMIUM }) : await chromium.launch().catch(() => chromium.launch({ channel: 'msedge' }));
const pagina = await navegador.newPage({ viewport: { width: 1280, height: 900 } });
await pagina.addInitScript(() => localStorage.setItem('ash:guias', 'no'));
pagina.on('pageerror', (e) => mal(`error de JavaScript: ${e.message}`));
await pagina.goto(`${BASE}/servicios/cv/`, { waitUntil: 'networkidle' });

const visible = (sel) => pagina.locator(`section[data-paso]:not([hidden]) ${sel}`);
async function siguiente() {
  const b = visible('[data-siguiente]').first();
  await b.scrollIntoViewIfNeeded();
  await b.click();
  await pagina.waitForTimeout(400);
}
const pasoActual = () => pagina.evaluate(() => document.querySelector('section[data-paso]:not([hidden])')?.getAttribute('data-paso'));

// Paso 1 → Datos.
await siguiente();
if ((await pasoActual()) !== 'datos') mal(`tras «Siguiente» en el diseño se esperaba el paso datos y está en ${await pasoActual()}`);

// Mínimo: sin nombre no se pasa de «Datos».
await siguiente();
if ((await pasoActual()) !== 'datos') mal('sin nombre se ha podido pasar de «Datos»');
if (!(await pagina.locator('[data-error="datos"]').isVisible())) mal('sin nombre no se ve el aviso de error');
if ((await pagina.locator('[name="nombre"]').getAttribute('aria-invalid')) !== 'true') mal('sin nombre el campo no queda marcado como inválido');

// Máximos por lista: se añade hasta que el botón deja de sumar.
const mas = pagina.locator('[data-mas-apartados]');
if (await mas.count()) await mas.evaluate((d) => (d.open = true));
for (const fs of await pagina.locator('section[data-paso="datos"] [data-lista]').all()) {
  const lista = await fs.getAttribute('data-lista');
  const max = Number(await fs.getAttribute('data-max'));
  const boton = fs.locator('[data-anadir]');
  for (let i = 0; i < max + 2; i++) {
    if (!(await boton.isVisible()) || (await boton.isDisabled())) break;
    await boton.click();
  }
  const filas = await fs.locator('[data-items] > .item').count();
  if (filas !== max) mal(`lista ${lista}: ${filas} filas tras pulsar de más (máximo ${max})`);
}

// Máximo por campo: todos los campos de texto llevan tope y no lo superan con texto de sobra.
const campos = pagina.locator('section[data-paso="datos"] :is(input:not([type]), input[type="text"], input[type="email"], input[type="tel"], input[type="url"], textarea)');
const total = await campos.count();
for (let i = 0; i < total; i++) {
  const c = campos.nth(i);
  if (!(await c.isVisible())) continue;
  const quien = (await c.getAttribute('name')) ?? (await c.getAttribute('data-k')) ?? `campo ${i}`;
  const max = Number((await c.getAttribute('maxlength')) ?? 0);
  if (!max) {
    mal(`campo ${quien} sin maxlength`);
    continue;
  }
  await c.fill(RELLENO.repeat(Math.ceil((max + 40) / RELLENO.length)));
  const largo = await c.evaluate((e) => e.value.length);
  if (largo > max) mal(`campo ${quien}: admite ${largo} caracteres (máximo ${max})`);
}

// Formato: con todo al límite (HTML, emojis, acentos) la vista previa se genera.
await pagina.locator('[name="email"]').fill('esto-no-es-un-correo');
await pagina.locator('[name="telefono"]').fill('llámame');
await pagina.locator('[name="web"]').fill('javascript:alert(1)');
const estado = pagina.locator('[data-estado]');
await pagina.waitForFunction(() => !document.querySelector('[aria-busy="true"]'), null, { timeout: 120000 }).catch(() => undefined);
await pagina.waitForTimeout(1500);
await pagina.waitForFunction(() => !document.querySelector('[aria-busy="true"]'), null, { timeout: 120000 }).catch(() => mal('la vista previa no termina con todo al límite'));
const textoEstado = (await estado.count()) ? await estado.innerText() : '';
if (!/p[aá]gina/.test(textoEstado)) mal(`vista previa con todo al límite: «${textoEstado}»`);

// «Revisa» avisa de un correo, un teléfono o una web mal escritos.
await siguiente();
if ((await pasoActual()) !== 'revisa') mal(`con nombre lleno no se llega a «Revisa» (está en ${await pasoActual()})`);
const repaso = (await pagina.locator('[data-repaso]').innerText()).toLowerCase();
for (const [clave, texto] of [['correo', 'correo'], ['teléfono', 'teléfono'], ['web', 'web']])
  if (!repaso.includes(texto) || !/revisa|no parece|mal/.test(repaso)) mal(`«Revisa» no avisa de un ${clave} mal escrito`);

console.log(`campos revisados: ${total}; vista previa: «${textoEstado}»`);
await navegador.close();
if (problemas.length) {
  console.error(`✗ ${problemas.length} problema(s):\n- ${problemas.join('\n- ')}`);
  process.exit(1);
}
console.log('✓ límites del formulario del CV correctos');

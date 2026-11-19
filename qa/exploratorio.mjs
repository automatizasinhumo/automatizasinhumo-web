// Empleado «exploratorio» (ronda 22, D1): navega como una persona impaciente y comprueba
// que la web aguanta. fast-check (MIT) genera secuencias aleatorias de acciones —seguir un
// enlace interno, atrás, adelante, recargar, buscar desde la cabecera, doble clic, pasar de
// móvil a escritorio, abrir el contacto, Escape— y tras cada acción verifica invariantes
// (un enlace visible que no se puede pulsar también es fallo; con un modal abierto solo se
// usan sus enlaces):
//   · la página no da HTTP ≥ 400 ni lanza errores de JavaScript;
//   · seguimos en nuestro dominio y hay contenido (<main> con texto);
//   · a 390 px no hay desbordamiento horizontal.
// Si una secuencia falla, fast-check la reduce a la más corta que reproduce el fallo y
// imprime la semilla: `SEMILLA=<n> node qa/exploratorio.mjs <base>` la repite tal cual.
// No envía formularios ni pulsa botones de pago: solo navega y lee.
// uso: node qa/exploratorio.mjs <base> [recorridos=20]
import { appendFileSync, mkdirSync } from 'node:fs';
import fc from 'fast-check';
import { chromium } from 'playwright';

const [base, n = '20'] = process.argv.slice(2);
if (!base) throw new Error('uso: node qa/exploratorio.mjs <base> [recorridos]');
const origen = new URL(base).origin;
const semilla = process.env.SEMILLA ? Number(process.env.SEMILLA) : Date.now() % 2 ** 31;
const IGNORAR = [/cloudflareinsights/i, /favicon/i, /challenges\.cloudflare/i, /Failed to load resource.*\b(404|net::ERR_BLOCKED)/i];
// Rutas a las que el explorador no entra: privadas, de pago o que escriben datos.
const VETADAS = /^\/(admin|api|express|checkout|cart\/|login|logout|account|order\/)/i;
const TERMINOS = ['web', 'boda', 'traducir', 'automatizar', 'restaurante', 'gogle', 'qué necesito', '', 'ñandú', '<script>'];
mkdirSync('capturas', { recursive: true });

const accion = fc.oneof(
  { arbitrary: fc.record({ tipo: fc.constant('enlace'), i: fc.nat(200) }), weight: 5 },
  { arbitrary: fc.record({ tipo: fc.constant('atras') }), weight: 2 },
  { arbitrary: fc.record({ tipo: fc.constant('adelante') }), weight: 1 },
  { arbitrary: fc.record({ tipo: fc.constant('recargar') }), weight: 1 },
  { arbitrary: fc.record({ tipo: fc.constant('buscar'), q: fc.constantFrom(...TERMINOS) }), weight: 2 },
  { arbitrary: fc.record({ tipo: fc.constant('doble'), i: fc.nat(200) }), weight: 1 },
  { arbitrary: fc.record({ tipo: fc.constant('ancho'), w: fc.constantFrom(390, 1280) }), weight: 1 },
  { arbitrary: fc.record({ tipo: fc.constant('contacto') }), weight: 1 },
  { arbitrary: fc.record({ tipo: fc.constant('escape') }), weight: 1 },
);
const describir = (a) => a.tipo + (a.i != null ? `#${a.i}` : '') + (a.q != null ? `«${a.q}»` : '') + (a.w ? `@${a.w}` : '');

const br = await chromium.launch();

// Con un diálogo modal abierto (carrito, menú) la página de detrás no se puede pulsar, y es
// lo correcto: como una persona, solo se usan los enlaces de dentro del modal.
const MODAL = '[aria-modal="true"], dialog[open]';
async function ambito(pg) {
  const hay = await pg.evaluate((sel) => [...document.querySelectorAll(sel)].some((m) => m.checkVisibility({ visibilityProperty: true })), MODAL);
  // visibilityProperty: el carrito cerrado sigue con aria-modal pero con visibility:hidden.
  return hay ? MODAL.split(',').map((s) => s.trim() + ' ') : [''];
}

async function enlacesInternos(pg) {
  const pref = await ambito(pg);
  const sel = pref[0] ? pref.map((p) => p + 'a[href]').join(', ') : 'header a[href], main a[href], footer a[href]';
  // querySelectorAll, como en marcar(): el índice tiene que significar lo mismo en los dos.
  const hrefs = await pg.evaluate((sel) =>
    [...document.querySelectorAll(sel)]
      .map((a, indice) => ({ a, indice }))
      // checkVisibility y no offsetParent: un enlace dentro de un <details> cerrado conserva
      // offsetParent y tamaño, pero no se pinta (content-visibility) y no se puede pulsar.
      .filter(({ a }) => a.checkVisibility({ visibilityProperty: true }) && a.getClientRects().length > 0 && !a.target && !a.hasAttribute('download'))
      .map(({ a, indice }) => ({ indice, href: a.getAttribute('href') || '' })),
  sel);
  return hrefs
    .filter((h) => {
      if (!h.href.startsWith('/') || h.href.startsWith('//')) return false;
      return !VETADAS.test(h.href.split('#')[0]);
    })
    .map((h) => ({ ...h, sel }));
}

async function ejecutar(secuencia) {
  const ctx = await br.newContext({ viewport: { width: 390, height: 844 }, locale: 'es-ES' });
  const pg = await ctx.newPage();
  const errores = [];
  let ultimoEstado = 200;
  pg.on('pageerror', (e) => errores.push('JS: ' + e.message.split('\n')[0]));
  pg.on('console', (m) => {
    if (m.type() === 'error' && !IGNORAR.some((r) => r.test(m.text()))) errores.push('consola: ' + m.text().slice(0, 160));
  });
  pg.on('response', (r) => {
    if (r.request().isNavigationRequest() && r.frame() === pg.mainFrame()) ultimoEstado = r.status();
  });
  const hecho = [];
  try {
    await pg.goto(base + '/', { waitUntil: 'load', timeout: 45000 });
    for (const a of secuencia) {
      hecho.push(describir(a));
      let fallo = await paso(pg, a).then(() => null, (e) => e.message);
      await pg.waitForLoadState('load', { timeout: 30000 }).catch(() => {});
      fallo ??= await invariantes(pg, () => ultimoEstado, errores);
      if (fallo) {
        await pg.screenshot({ path: `capturas/exploratorio-fallo.png`, fullPage: true }).catch(() => {});
        throw new Error(`${fallo} en ${pg.url().replace(origen, '')} tras [${hecho.join(' → ')}]`);
      }
    }
  } finally {
    await ctx.close();
  }
}

// Marca el enlace elegido (por su posición entre los candidatos) para pulsar ese mismo
// elemento: con un selector por href, dos enlaces iguales en cabecera y pie serían el mismo.
async function marcar(pg, { sel, indice }) {
  await pg.evaluate(({ sel, indice }) => {
    document.querySelectorAll('[data-qa-explorar]').forEach((e) => e.removeAttribute('data-qa-explorar'));
    document.querySelectorAll(sel)[indice]?.setAttribute('data-qa-explorar', '');
  }, { sel, indice });
  return pg.locator('[data-qa-explorar]');
}

async function paso(pg, a) {
  // Acción que puede navegar: se espera a que cambie la URL (si cambia) y a que cargue.
  // Si la interacción falla (enlace visible pero tapado, por ejemplo) es un fallo de la web,
  // salvo que la navegación ya hubiera empezado: el segundo clic de un doble clic puede
  // encontrar el enlace ya desmontado.
  const nav = async (fn, que) => {
    const antes = pg.url();
    try {
      await fn();
    } catch (e) {
      if (pg.url() === antes) {
        // Del registro de Playwright, la última línea que explica por qué no pudo pulsar.
        const lineas = String(e.message).split('\n');
        const porque = lineas.filter((l) => /intercepts pointer|not visible|not stable|outside of the viewport|not enabled/.test(l)).pop();
        throw new Error(`no se pudo usar ${que}: ${lineas[0]}${porque ? ' — ' + porque.trim() : ''}`);
      }
    }
    await pg.waitForURL((u) => u.toString() !== antes, { timeout: 8000 }).catch(() => {});
    await pg.waitForLoadState('load', { timeout: 30000 }).catch(() => {});
  };
  switch (a.tipo) {
    case 'enlace': {
      const ls = await enlacesInternos(pg);
      if (!ls.length) return;
      const elegido = ls[a.i % ls.length];
      const objetivo = await marcar(pg, elegido);
      await nav(() => objetivo.click({ timeout: 10000 }), `el enlace ${elegido.href}`);
      return;
    }
    case 'doble': {
      const ls = await enlacesInternos(pg);
      if (!ls.length) return;
      const elegido = ls[a.i % ls.length];
      const objetivo = await marcar(pg, elegido);
      await nav(() => objetivo.dblclick({ timeout: 10000 }), `el enlace ${elegido.href} (doble clic)`);
      return;
    }
    case 'atras':
      await pg.goBack({ waitUntil: 'load', timeout: 30000 }).catch(() => {});
      // Atrás desde la primera página sale de la web (about:blank): la persona vuelve a entrar.
      if (!pg.url().startsWith(origen)) await pg.goto(base + '/', { waitUntil: 'load', timeout: 45000 });
      return;
    case 'adelante':
      await pg.goForward({ waitUntil: 'load', timeout: 30000 }).catch(() => {});
      return;
    case 'escape':
      await pg.keyboard.press('Escape');
      return;
    case 'recargar':
      await pg.reload({ waitUntil: 'load', timeout: 30000 });
      return;
    case 'ancho':
      await pg.setViewportSize({ width: a.w, height: a.w < 800 ? 844 : 900 });
      return;
    case 'contacto': {
      const c = pg.locator('[data-contacto] summary:visible').first();
      if (await c.count()) await c.click({ timeout: 5000 }).catch(() => {});
      return;
    }
    case 'buscar': {
      // Como una persona: el campo de la cabecera (o la lupa en móvil) y Enter.
      const lupa = pg.locator('header [data-search-disclosure] summary:visible').first();
      if (await lupa.count()) await lupa.click({ timeout: 5000 }).catch(() => {});
      const campo = pg.locator('header input[name="q"]:visible').first();
      if (!(await campo.count())) {
        await pg.goto(`${base}/search?q=${encodeURIComponent(a.q)}`, { waitUntil: 'load', timeout: 30000 });
        return;
      }
      await campo.fill(a.q);
      await nav(() => campo.press('Enter'));
      return;
    }
  }
}

async function invariantes(pg, estado, errores, intento = 0) {
  if (errores.length) return errores.splice(0).join(' | ');
  if (estado() >= 400) return `HTTP ${estado()}`;
  const url = new URL(pg.url());
  if (url.origin !== origen) return `salió del sitio a ${url.origin}`;
  let info;
  try {
    info = await pg.evaluate(() => ({
      texto: (document.querySelector('main')?.innerText || '').trim().length,
      desborda: document.documentElement.scrollWidth > window.innerWidth + 1,
      ancho: window.innerWidth,
    }));
  } catch (e) {
    // Una navegación tardía (redirección, doble clic) destruye el contexto: se espera a que
    // cargue el documento nuevo y se repiten TODAS las comprobaciones sobre él (estado HTTP,
    // errores y origen incluidos), no solo la lectura del DOM.
    if (intento >= 2) throw e;
    await pg.waitForLoadState('load', { timeout: 30000 }).catch(() => {});
    return invariantes(pg, estado, errores, intento + 1);
  }
  if (info.texto < 20) return 'página sin contenido en <main>';
  if (info.ancho <= 400 && info.desborda) return 'desbordamiento horizontal a ' + info.ancho + ' px';
  return null;
}

let resumen;
try {
  // fc.check en vez de fc.assert: así se sabe cuántos recorridos se hicieron de verdad si
  // el límite de tiempo (acotado para Actions) corta antes de llegar a los pedidos.
  const d = await fc.check(
    fc.asyncProperty(fc.array(accion, { minLength: 3, maxLength: 12 }), async (s) => {
      await ejecutar(s);
    }),
    { numRuns: Number(n), seed: semilla, interruptAfterTimeLimit: 12 * 60 * 1000, verbose: 0 },
  );
  const repetir = `Repetir: \`SEMILLA=${semilla} node qa/exploratorio.mjs <base> ${n}\``;
  if (d.failed) {
    const sec = d.counterexample?.[0]?.map(describir).join(' → ') ?? '?';
    const causa = String(d.errorInstance?.message ?? d.error ?? '').split('\n')[0];
    resumen = `## Exploratorio: fallo (semilla ${semilla})\n\n${repetir}\n\n\`\`\`\nSecuencia mínima (${d.numShrinks} reducciones): ${sec}\n${causa}\n\`\`\`\n`;
    process.exitCode = 1;
  } else if (d.interrupted) {
    // Cortado por tiempo: no se anuncian los recorridos pedidos, sino los hechos. Si no dio
    // tiempo ni a la mitad, el resultado no vale como prueba y se marca como fallo.
    const ok = d.numRuns >= Number(n) / 2;
    resumen = `## Exploratorio: interrumpido por tiempo (${d.numRuns} de ${n} recorridos sin fallos, semilla ${semilla})\n\n${repetir}\n`;
    if (!ok) process.exitCode = 1;
  } else {
    resumen = `## Exploratorio: sin fallos (${d.numRuns} recorridos aleatorios, semilla ${semilla})\n`;
  }
} finally {
  await br.close();
}
console.log(resumen);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, resumen);

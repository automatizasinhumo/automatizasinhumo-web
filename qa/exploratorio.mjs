// Empleado «exploratorio» (ronda 22, D1): navega como una persona impaciente y comprueba
// que la web aguanta. fast-check (MIT) genera secuencias aleatorias de acciones —seguir un
// enlace interno, atrás, adelante, recargar, buscar desde la cabecera, doble clic, pasar de
// móvil a escritorio, abrir el contacto— y tras cada acción verifica invariantes:
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
);
const describir = (a) => a.tipo + (a.i != null ? `#${a.i}` : '') + (a.q != null ? `«${a.q}»` : '') + (a.w ? `@${a.w}` : '');

const br = await chromium.launch();

async function enlacesInternos(pg) {
  const hrefs = await pg.$$eval('header a[href], main a[href], footer a[href]', (as) =>
    as
      .filter((a) => a.offsetParent !== null && !a.target && !a.hasAttribute('download'))
      .map((a, i) => ({ i, href: a.getAttribute('href') || '' })),
  );
  return hrefs.filter((h) => {
    if (!h.href.startsWith('/') || h.href.startsWith('//')) return false;
    return !VETADAS.test(h.href.split('#')[0]);
  });
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
      await paso(pg, a);
      await pg.waitForLoadState('load', { timeout: 30000 }).catch(() => {});
      const fallo = await invariantes(pg, ultimoEstado, errores);
      if (fallo) {
        await pg.screenshot({ path: `capturas/exploratorio-fallo.png`, fullPage: true }).catch(() => {});
        throw new Error(`${fallo} en ${pg.url().replace(origen, '')} tras [${hecho.join(' → ')}]`);
      }
    }
  } finally {
    await ctx.close();
  }
}

async function paso(pg, a) {
  // Acción que puede navegar: se espera a que cambie la URL (si cambia) y a que cargue.
  const nav = async (fn) => {
    const antes = pg.url();
    await fn();
    await pg.waitForURL((u) => u.toString() !== antes, { timeout: 8000 }).catch(() => {});
    await pg.waitForLoadState('load', { timeout: 30000 }).catch(() => {});
  };
  switch (a.tipo) {
    case 'enlace': {
      const ls = await enlacesInternos(pg);
      if (!ls.length) return;
      const href = ls[a.i % ls.length].href;
      const el = pg.locator(`a[href="${href.replace(/"/g, '\\"')}"]:visible`).first();
      await nav(() => el.click({ timeout: 10000 }).catch(() => pg.goto(new URL(href, base).toString())));
      return;
    }
    case 'doble': {
      const ls = await enlacesInternos(pg);
      if (!ls.length) return;
      const href = ls[a.i % ls.length].href;
      await nav(() => pg.locator(`a[href="${href.replace(/"/g, '\\"')}"]:visible`).first().dblclick({ timeout: 10000 }).catch(() => {}));
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

async function invariantes(pg, estado, errores) {
  if (errores.length) return errores.splice(0).join(' | ');
  if (estado >= 400) return `HTTP ${estado}`;
  const url = new URL(pg.url());
  if (url.origin !== origen) return `salió del sitio a ${url.origin}`;
  const leer = () => pg.evaluate(() => ({
    texto: (document.querySelector('main')?.innerText || '').trim().length,
    desborda: document.documentElement.scrollWidth > window.innerWidth + 1,
    ancho: window.innerWidth,
  }));
  // Una navegación tardía (redirección, doble clic) destruye el contexto: se espera y se relee.
  const info = await leer().catch(async () => {
    await pg.waitForLoadState('load', { timeout: 30000 }).catch(() => {});
    return leer();
  });
  if (info.texto < 20) return 'página sin contenido en <main>';
  if (info.ancho <= 400 && info.desborda) return 'desbordamiento horizontal a ' + info.ancho + ' px';
  return null;
}

let resumen;
try {
  await fc.assert(
    fc.asyncProperty(fc.array(accion, { minLength: 3, maxLength: 12 }), async (s) => {
      await ejecutar(s);
    }),
    {
      numRuns: Number(n),
      seed: semilla,
      // Acotado para Actions: si reducir el fallo tarda demasiado, se informa lo que haya.
      interruptAfterTimeLimit: 12 * 60 * 1000,
      markInterruptAsFailure: false,
      verbose: 0,
    },
  );
  resumen = `## Exploratorio: sin fallos (${n} recorridos aleatorios, semilla ${semilla})\n`;
} catch (e) {
  const lineas = String(e.message).split('\n');
  const i = lineas.findIndex((l) => /Got error/.test(l));
  // fast-check 4 deja el error original en e.cause.
  const causa = e.cause?.message ? [String(e.cause.message).split('\n')[0]] : i >= 0 ? lineas.slice(i, i + 3) : [];
  const msg = [...lineas.filter((l) => /Counterexample|Shrunk/.test(l)), ...causa].join('\n');
  resumen = `## Exploratorio: fallo (semilla ${semilla})\n\nRepetir: \`SEMILLA=${semilla} node qa/exploratorio.mjs <base> ${n}\`\n\n\`\`\`\n${msg || String(e.message).slice(0, 1500)}\n\`\`\`\n`;
  process.exitCode = 1;
} finally {
  await br.close();
}
console.log(resumen);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, resumen);

// Empleado «recorrido del cliente» (C22): hace en un navegador real lo que hace un cliente,
// a 390 px (móvil) y a 1280 px:
//   portada → ficha del servicio → «Contratar ahora» abre el pago (sin pagar)
//   (en autoservicio: «Empezar ahora» abre el estudio y el pago está en «¿Prefieres pagar primero?»)
//   → «Empieza gratis» (o /empezar/<slug>) → formulario por pasos → gracias con su número → página de estado
//   → el mismo formulario enviado otra vez devuelve la misma solicitud (no crea otra)
//   → cada servicio de autoservicio (autoservicio.json) entra en el carrito.
// Falla si falta un botón, si una página da error o si salta un error de JavaScript.
// El correo es la dirección de pruebas de Resend (delivered@resend.dev): no escribe a nadie real.
// uso: node qa/recorrido-cliente.mjs <base> [slug=web-una-pagina]
import { appendFileSync, mkdirSync, readFileSync } from 'node:fs';
import { chromium } from 'playwright';

const [base, slug = 'web-una-pagina'] = process.argv.slice(2);
if (!base) throw new Error('uso: node qa/recorrido-cliente.mjs <base> [slug]');
const ANCHOS = [390, 1280];
const IGNORAR = [/cloudflareinsights/i, /favicon/i, /Failed to load resource.*\b(404|net::ERR_BLOCKED)/i];
mkdirSync('capturas', { recursive: true });

const fallos = [];
const pasos = [];

async function recorrido(ctx, ancho) {
  const pg = await ctx.newPage();
  const errores = [];
  pg.on('pageerror', (e) => errores.push('JS: ' + e.message));
  pg.on('console', (m) => {
    if (m.type() === 'error' && !IGNORAR.some((r) => r.test(m.text()))) errores.push('consola: ' + m.text());
  });
  const paso = async (nombre, fn) => {
    try {
      await fn();
      pasos.push(`${ancho}px ✔ ${nombre}`);
    } catch (e) {
      fallos.push(`${ancho}px ${nombre} → ${e.message.split('\n')[0]}`);
      await pg.screenshot({ path: `capturas/recorrido-${ancho}-fallo.png`, fullPage: true }).catch(() => {});
      throw e;
    }
  };
  const ir = async (url) => {
    const r = await pg.goto(new URL(url, base).toString(), { waitUntil: 'load', timeout: 45000 });
    if (!r || r.status() >= 400) throw new Error(`HTTP ${r?.status()} en ${url}`);
  };

  try {
    // Las guías Driver.js salen solas la primera vez y tapan la página mientras están abiertas:
    // se comprueba que un visitante nuevo las puede cerrar, y el resto del recorrido va sin ellas.
    await paso('la guía de bienvenida se cierra con la X', async () => {
      await ir('/');
      const guia = pg.locator('.driver-popover');
      if (await guia.first().waitFor({ state: 'visible', timeout: 8000 }).then(() => true, () => false)) {
        await pg.locator('.driver-popover-close-btn').first().click();
        await guia.first().waitFor({ state: 'hidden', timeout: 5000 });
      }
      await pg.evaluate((k) => localStorage.setItem(k, 'no'), 'ash:guias');
    });

    // La portada clásica enlaza la ficha directamente; la nueva (tema limpio) lleva por familias
    // y categorías. Lo que importa al cliente es llegar: a la ficha como mucho a dos clics.
    await paso('la portada lleva al servicio en dos clics como mucho', async () => {
      await ir('/');
      const destino = `/products/${slug}`;
      if (await pg.locator(`a[href="${destino}"]`).count()) return;
      const internos = await pg.locator('a[href^="/"]').evaluateAll((as) => [...new Set(as.map((a) => a.getAttribute('href').split('#')[0]))]);
      for (const href of internos.filter((h) => /^\/(categories|servicios|products)(\/|$)/.test(h))) {
        const r = await pg.request.get(new URL(href, base).toString());
        if (r.ok() && (await r.text()).includes(`href="${destino}"`)) return;
      }
      throw new Error(`sin camino de la portada a ${destino} en dos clics`);
    });

    // Un error a mitad del HTML (p. ej. D1 sin cupo) deja la página con 200 pero cortada:
    // sin pie ni scripts, y los menús no abren. Se comprueba el final de la página y el menú,
    // también al volver con atrás/adelante. Playwright desactiva el bfcache, así que esto cubre
    // la carga desde el historial, no la restauración desde bfcache.
    await paso('la portada llega entera: pie y menú, también tras atrás/adelante', async () => {
      await comprobarPieYMenu(pg, ancho);
      await ir(`/products/${slug}`);
      await comprobarPieYMenu(pg, ancho);
      await pg.goBack({ waitUntil: 'load' });
      await comprobarPieYMenu(pg, ancho);
      await pg.goForward({ waitUntil: 'load' });
      await comprobarPieYMenu(pg, ancho);
    });

    // Dos fichas: la de compra directa («Contratar ahora» + «Empieza gratis») y la de
    // autoservicio («Empezar ahora» al estudio; el pago, dentro de «¿Prefieres pagar primero?»).
    let autoservicio = false;
    await paso('la ficha tiene su camino de compra y de prueba', async () => {
      await ir(`/products/${slug}`);
      await pg.locator('[data-compra-directa], [data-ir-estudio]').first().waitFor({ state: 'visible', timeout: 10000 });
      autoservicio = (await pg.locator('[data-ir-estudio]').count()) > 0;
      if (autoservicio) return;
      await pg.getByRole('button', { name: /Contratar/i }).first().waitFor({ state: 'visible', timeout: 10000 });
      await pg.getByRole('link', { name: /Empieza gratis/i }).first().waitFor({ state: 'visible', timeout: 10000 });
    });

    await paso('«Empezar ahora» abre el estudio', async () => {
      if (!autoservicio) return;
      // El destino se comprueba por su cuenta: un enlace roto a /empezar/<slug> también tiene formulario.
      await Promise.all([
        pg.waitForURL((u) => u.pathname.startsWith('/servicios/'), { timeout: 30000 }),
        pg.locator('[data-ir-estudio]').first().click(),
      ]);
      await pg.locator('[data-vista]').first().waitFor({ state: 'attached', timeout: 30000 });
      await pg.screenshot({ path: `capturas/recorrido-${ancho}-estudio.png` });
      await ir(`/products/${slug}`);
      await pg.locator('[data-pagar-primero] summary').first().click();
    });

    await paso('«Contratar ahora» abre el pago', async () => {
      // Solo cuenta si llega a la página de pago (/express) y esta trae su formulario de cobro:
      // una redirección a otra página con título normal no vale como éxito.
      await Promise.all([
        pg.waitForURL((u) => u.pathname === '/express', { timeout: 30000 }),
        pg.getByRole('button', { name: /Contratar/i }).first().click(),
      ]);
      await pg.locator('form[action="/api/checkout"]').first().waitFor({ state: 'visible', timeout: 30000 });
      await pg.screenshot({ path: `capturas/recorrido-${ancho}-pago.png` });
    });

    await paso('«Empieza gratis» abre el formulario', async () => {
      if (autoservicio) {
        // La ficha de autoservicio ya no enlaza al formulario, pero sigue siendo la entrada de
        // quien quiere que se lo hagamos (enlaces de correo, campañas).
        await ir(`/empezar/${slug}`);
        await pg.locator('#solicitud-form').waitFor();
        return;
      }
      await ir(`/products/${slug}`);
      await Promise.all([
        pg.waitForURL(`**/empezar/${slug}**`, { timeout: 30000 }),
        pg.getByRole('link', { name: /Empieza gratis/i }).first().click(),
      ]);
      await pg.locator('#solicitud-form').waitFor();
    });

    let enviado;
    await paso('el formulario por pasos se rellena y se envía', async () => {
      const f = pg.locator('#solicitud-form');
      const valores = {
        nombre: 'Prueba automática',
        email: 'delivered@resend.dev',
        campo_0: 'Peluquería de prueba (recorrido automático)',
        mensaje: 'Solicitud de prueba del recorrido automático. Se puede borrar.',
      };
      const enviar = f.locator('button[type=submit]');
      for (let i = 0; i < 8 && !(await enviar.isVisible()); i++) {
        await rellenarVisibles(f, valores);
        await f.locator('[data-siguiente]').click();
      }
      await rellenarVisibles(f, valores);
      await f.locator('input[name=consentimiento]').check();
      enviado = await f.evaluate((form) => Object.fromEntries(new FormData(form)));
      await pg.screenshot({ path: `capturas/recorrido-${ancho}-formulario.png` });
      await Promise.all([pg.waitForURL('**/empezar/gracias**', { timeout: 30000 }), enviar.click()]);
    });

    const id = new URL(pg.url()).searchParams.get('id');
    await paso('la página de gracias da el número de solicitud', async () => {
      if (!/^S-[A-Z0-9]{8}$/.test(id ?? '')) throw new Error(`número de solicitud raro: ${id}`);
      await pg.getByText(id).first().waitFor({ timeout: 10000 });
    });

    await paso('la página de estado encuentra la solicitud', async () => {
      await ir(`/empezar/estado?id=${encodeURIComponent(id)}`);
      await pg.getByText(id).first().waitFor({ timeout: 10000 });
      await pg.screenshot({ path: `capturas/recorrido-${ancho}-estado.png` });
    });

    await paso('el mismo envío repetido no crea otra solicitud', async () => {
      if (!enviado?.envio) throw new Error('el formulario no lleva token de envío');
      // Origin explícito: el middleware rechaza (403) el POST de formulario sin origen coincidente.
      const r = await pg.request.post(new URL('/api/solicitudes', base).toString(), {
        form: enviado,
        maxRedirects: 0,
        headers: { Origin: new URL(base).origin },
      });
      if (r.status() !== 303) throw new Error(`el reenvío respondió HTTP ${r.status()} en vez de 303`);
      const otra = new URL(r.headers().location ?? '', base).searchParams.get('id');
      if (otra !== id) throw new Error(`el reenvío creó ${otra} en vez de devolver ${id}`);
    });
    // Los estudios llenan el carrito con ids públicos de autoservicio.json; si la D1 tiene
    // otros ids, resolveCart descarta la línea en silencio y el carrito sale vacío.
    await paso('cada servicio de autoservicio entra en el carrito', async () => {
      const auto = JSON.parse(readFileSync(new URL('../src/features/servicios/autoservicio.json', import.meta.url), 'utf8'));
      const claves = Object.entries(auto)
        .filter(([k]) => !k.startsWith('$'))
        .flatMap(([, p]) => (p.variantes ? Object.values(p.variantes).map((v) => `${p.producto}:${v.id}`) : [p.producto]));
      for (const key of claves) {
        const r = await pg.request.post(new URL('/api/cart', base).toString(), {
          multipart: { _action: 'update', key, qty: '1' },
          headers: { Origin: new URL(base).origin, 'x-partial': '1' },
        });
        if (r.status() >= 400) throw new Error(`/api/cart respondió HTTP ${r.status()} con ${key}`);
      }
      await ir('/cart');
      const html = await pg.content();
      const faltan = claves.filter((k) => !html.includes(`value="${k}"`));
      if (faltan.length) throw new Error(`el carrito no muestra ${faltan.join(', ')}`);
      await pg.screenshot({ path: `capturas/recorrido-${ancho}-carrito.png`, fullPage: true });
    });
  } catch {
    // El fallo ya está anotado en su paso; los siguientes dependen de él.
  } finally {
    for (const e of errores) fallos.push(`${ancho}px ${e}`);
    await pg.close();
  }
}

/** El pie está y el menú principal abre y cierra (hamburguesa en móvil, «Servicios» en escritorio). */
async function comprobarPieYMenu(pg, ancho) {
  const pie = pg.locator('footer').last();
  await pie.scrollIntoViewIfNeeded({ timeout: 10000 });
  await pie.waitFor({ state: 'visible', timeout: 10000 });
  await pg.evaluate(() => window.scrollTo(0, 0));
  if (ancho < 1280) {
    const menu = pg.locator('details[data-nav-disclosure]').first();
    if (await menu.evaluate((d) => d.open)) throw new Error('el menú móvil aparece abierto al cargar');
    await menu.locator('summary').click();
    await menu.locator('a').first().waitFor({ state: 'visible', timeout: 5000 });
    await menu.locator('summary').click();
    await menu.locator('a').first().waitFor({ state: 'hidden', timeout: 5000 });
  } else {
    const boton = pg.getByRole('button', { name: 'Servicios' }).first();
    await boton.click();
    await pg.waitForFunction((b) => b.getAttribute('aria-expanded') === 'true', await boton.elementHandle(), { timeout: 5000 });
    const panel = pg.locator(`[id="${await boton.getAttribute('aria-controls')}"]`);
    await panel.locator('a').first().waitFor({ state: 'visible', timeout: 5000 });
    await pg.keyboard.press('Escape');
    await pg.waitForFunction((b) => b.getAttribute('aria-expanded') === 'false', await boton.elementHandle(), { timeout: 5000 });
    await panel.locator('a').first().waitFor({ state: 'hidden', timeout: 5000 });
  }
}

/** Rellena los campos conocidos que se ven y están vacíos (el formulario muestra un paso cada vez). */
async function rellenarVisibles(form, valores) {
  for (const [nombre, valor] of Object.entries(valores)) {
    const campo = form.locator(`[name="${nombre}"]`);
    if ((await campo.count()) && (await campo.isVisible()) && !(await campo.inputValue())) await campo.fill(valor);
  }
}

const br = await chromium.launch();
for (const ancho of ANCHOS) {
  const ctx = await br.newContext({ viewport: { width: ancho, height: 850 }, locale: 'es-ES' });
  await recorrido(ctx, ancho);
  await ctx.close();
}
await br.close();

const resumen = [
  `## Recorrido del cliente: ${fallos.length ? `${fallos.length} fallos` : 'completo'} (${ANCHOS.join(' y ')} px)`,
  '',
  ...pasos.map((p) => `- ${p}`),
  ...fallos.map((f) => `- ✘ ${f}`),
].join('\n');
console.log(resumen);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, resumen + '\n');
process.exit(fallos.length ? 1 : 0);

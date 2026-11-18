// Prueba funcional de una página en un navegador real (Playwright). La usan el empleado
// «multinavegador» (qa/navegadores.mjs) y la puerta de la fábrica (qa/demo-funcional.mjs):
// una demo con errores de JavaScript, recursos rotos, enlaces muertos, formularios sin
// enviar ni etiquetas o que se sale de ancho en móvil no se da por buena.

export const ANCHOS = [360, 390, 1280];
// Ruido que no depende de la página (analítica bloqueada, favicon).
export const IGNORAR = [/cloudflareinsights/i, /favicon/i, /Failed to load resource.*\bnet::ERR_BLOCKED/i];
const ignorado = (t) => IGNORAR.some((r) => r.test(t));
const MAX_ENLACES = 40;

/**
 * Abre `url` en una página nueva del contexto `ctx` y devuelve la lista de problemas
 * (vacía = bien). Con `comprobados`, comprueba también los enlaces internos (una vez por URL,
 * no por ancho: se pasa el Set de ya comprobados).
 */
export async function revisarPagina(ctx, url, { ancho, captura, comprobados } = {}) {
  const pg = await ctx.newPage();
  const problemas = [];
  pg.on('pageerror', (e) => problemas.push('JS: ' + e.message.split('\n')[0]));
  pg.on('console', (m) => {
    if (m.type() === 'error' && !ignorado(m.text()) && !/^Failed to load resource/.test(m.text())) problemas.push('consola: ' + m.text().slice(0, 200));
  });
  // Recursos (imágenes, CSS, JS, fuentes) que no cargan; las peticiones de analítica no cuentan.
  pg.on('response', (r) => {
    if (r.status() >= 400 && r.request().resourceType() !== 'document' && !ignorado(r.url())) problemas.push(`recurso ${r.status()}: ${r.url().slice(0, 150)}`);
  });
  pg.on('requestfailed', (r) => {
    const motivo = r.failure()?.errorText ?? '';
    if (!ignorado(r.url()) && !/ERR_ABORTED|NS_BINDING_ABORTED|cancelled/i.test(motivo))
      problemas.push(`recurso sin cargar (${motivo}): ${r.url().slice(0, 150)}`);
  });
  try {
    const r = await pg.goto(url, { waitUntil: 'load', timeout: 45000 });
    if (!r || r.status() >= 400) problemas.push(`HTTP ${r?.status()}`);
    await pg.waitForTimeout(800);
    // Imágenes que el navegador no pudo pintar (también las de CSS en línea que fallan arriba).
    const rotas = await pg.$$eval('img', (is) => is.filter((i) => i.complete && i.currentSrc && i.naturalWidth === 0).map((i) => i.currentSrc));
    for (const s of rotas.slice(0, 5)) problemas.push('imagen rota: ' + s.slice(0, 150));
    if (ancho <= 400) {
      const sobra = await pg.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (sobra > 2) problemas.push(`se sale ${sobra}px de ancho a ${ancho}px`);
    }
    problemas.push(...(await revisarFormularios(pg)));
    problemas.push(...(await revisarAnclas(pg)));
    if (comprobados) problemas.push(...(await revisarEnlaces(pg, comprobados)));
    if (captura) await pg.screenshot({ path: captura, fullPage: false });
  } catch (e) {
    problemas.push('carga: ' + e.message.split('\n')[0]);
  }
  await pg.close();
  return [...new Set(problemas)];
}

/** Cada formulario visible se puede enviar y cada campo tiene nombre y etiqueta. */
async function revisarFormularios(pg) {
  return pg.$$eval('form', (fs) => {
    const visible = (e) => !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
    const out = [];
    fs.filter(visible).forEach((f, k) => {
      const id = f.id ? `#${f.id}` : `nº ${k + 1}`;
      if (!f.querySelector('button:not([type=button]):not([type=reset]), input[type=submit], input[type=image]'))
        out.push(`formulario ${id} sin botón de enviar`);
      const accion = f.getAttribute('action') ?? '';
      if (/^(javascript:|#$)/i.test(accion.trim())) out.push(`formulario ${id} sin destino (${accion})`);
      for (const c of f.querySelectorAll('input, select, textarea')) {
        if (/^(hidden|submit|button|reset|image)$/i.test(c.type) || !visible(c)) continue;
        if (!c.name) out.push(`formulario ${id}: campo sin name (${c.type || c.tagName.toLowerCase()})`);
        const etiqueta = c.labels?.length || c.getAttribute('aria-label') || c.getAttribute('aria-labelledby') || c.title;
        if (!etiqueta) out.push(`formulario ${id}: campo «${c.name || c.type}» sin etiqueta`);
      }
    });
    return out;
  });
}

/** Los enlaces «#algo» apuntan a un elemento que existe. */
async function revisarAnclas(pg) {
  return pg.$$eval('a[href^="#"]', (as) =>
    [...new Set(as.map((a) => a.getAttribute('href')))]
      .filter((h) => h.length > 1 && !h.startsWith('#!'))
      .filter((h) => {
        const id = decodeURIComponent(h.slice(1));
        return !document.getElementById(id) && !document.getElementsByName(id).length;
      })
      .map((h) => `ancla sin destino: ${h}`),
  );
}

/** Enlaces del mismo sitio que responden con error (cada URL una sola vez por ejecución). */
async function revisarEnlaces(pg, comprobados) {
  const origen = new URL(pg.url()).origin;
  const hrefs = await pg.$$eval('a[href]', (as) => as.map((a) => a.href));
  const internos = [...new Set(hrefs.map((h) => h.split('#')[0]).filter((h) => h.startsWith(origen + '/') || h === origen))];
  const out = [];
  for (const h of internos.filter((x) => !comprobados.has(x)).slice(0, MAX_ENLACES)) {
    comprobados.add(h);
    try {
      const r = await pg.request.get(h, { timeout: 20000, maxRedirects: 5 });
      if (r.status() >= 400) out.push(`enlace ${r.status()}: ${h.slice(origen.length) || '/'}`);
    } catch (e) {
      out.push(`enlace sin respuesta: ${h.slice(origen.length) || '/'} (${e.message.split('\n')[0].slice(0, 80)})`);
    }
  }
  return out;
}

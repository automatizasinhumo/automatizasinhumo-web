// Prueba funcional de una página en un navegador real (Playwright). La usan el empleado
// «multinavegador» (qa/navegadores.mjs) y la puerta de la fábrica (qa/demo-funcional.mjs):
// una demo con errores de JavaScript, recursos rotos, enlaces muertos, formularios sin
// enviar ni etiquetas o que se sale de ancho en móvil no se da por buena. Tampoco una con un
// teléfono, WhatsApp o correo mal escritos (qa/contacto.mjs); con `primerClic`, la que en el
// móvil no enseña ningún botón de contacto en la primera pantalla, y con `publicar`, la que
// lleva noindex o un canonical a otra URL.
import { esCta, problemaContacto, problemasIndexacion } from './contacto.mjs';

export const ANCHOS = [360, 390, 1280];
// Ruido que no depende de la página (analítica bloqueada, favicon).
export const IGNORAR = [/cloudflareinsights/i, /favicon/i, /Failed to load resource.*\bnet::ERR_BLOCKED/i];
const ignorado = (t) => IGNORAR.some((r) => r.test(t));
const MAX_ENLACES = 40;
// Errores de transporte (no de la web): conexión cortada, reiniciada o agotada.
const RED = /net::ERR_(CONNECTION_(RESET|CLOSED|REFUSED|TIMED_OUT)|TIMED_OUT|NETWORK_CHANGED|EMPTY_RESPONSE|HTTP2_PROTOCOL_ERROR)|NS_ERROR_NET_(RESET|INTERRUPT|TIMEOUT)|NS_ERROR_CONNECTION_REFUSED|Timeout \d+ms exceeded|network connection was lost|Could not connect to the server|socket hang up|ECONNRESET|ECONNREFUSED|ETIMEDOUT|EPIPE/i;
// Solo el motivo del fallo cuenta, nunca la URL: una ruta con «ECONNRESET» no convierte
// un fallo de DNS en uno de red.
function motivo(p) {
  if (p.startsWith('recurso sin cargar (')) return p.match(/^recurso sin cargar \((.*?)\): /)?.[1] ?? null;
  if (p.startsWith('enlace sin respuesta: ')) return p.match(/\(([^()]*)\)$/)?.[1] ?? null;
  if (p.startsWith('carga: ')) return p.slice(7).replace(/ at https?:\/\/\S+/g, '');
  return null;
}
const deRed = (p) => {
  const m = motivo(p);
  return m !== null && RED.test(m);
};

/**
 * Abre `url` en una página nueva del contexto `ctx` y devuelve la lista de problemas
 * (vacía = bien). Con `comprobados`, comprueba también los enlaces internos (una vez por URL,
 * no por ancho: se pasa el Set de ya comprobados).
 */
export async function revisarPagina(ctx, url, opciones = {}) {
  const primero = await revisarUnaVez(ctx, url, opciones);
  // Un corte de red puntual (reset, timeout) entre el runner y Cloudflare no es un fallo de
  // la web: si todo lo hallado es de transporte, se repite una vez y solo cuenta lo que vuelva.
  // Un error de JS, de consola o de contenido nunca se reintenta.
  if (!primero.length || !primero.every(deRed)) return primero;
  const segundo = await revisarUnaVez(ctx, url, opciones);
  if (!segundo.length) console.log(`aviso: ${url} (${opciones.ancho ?? '?'}px) falló por red y pasó al repetir (${primero[0]})`);
  return segundo;
}

async function revisarUnaVez(ctx, url, { ancho, captura, comprobados, primerClic, publicar } = {}) {
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
    const pendientes = await cargarDiferidas(pg);
    for (const s of pendientes.slice(0, 5)) problemas.push('imagen sin terminar de cargar en 10 s: ' + s.slice(0, 150));
    // Imágenes que el navegador no pudo pintar (también las de CSS en línea que fallan arriba).
    const rotas = await pg.$$eval('img', (is) => is.filter((i) => i.complete && i.currentSrc && i.naturalWidth === 0).map((i) => i.currentSrc));
    for (const s of rotas.slice(0, 5)) problemas.push('imagen rota: ' + s.slice(0, 150));
    if (ancho <= 400) {
      const sobra = await pg.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (sobra > 2) problemas.push(`se sale ${sobra}px de ancho a ${ancho}px`);
    }
    problemas.push(...(await revisarFormularios(pg)));
    problemas.push(...(await revisarAnclas(pg)));
    problemas.push(...(await revisarContacto(pg, { primerClic: primerClic && ancho <= 400 })));
    if (publicar) problemas.push(...(await revisarIndexacion(pg, r)));
    if (comprobados) problemas.push(...(await revisarEnlaces(pg, comprobados)));
    if (captura) await pg.screenshot({ path: captura, fullPage: false });
  } catch (e) {
    problemas.push('carga: ' + e.message.split('\n')[0]);
  }
  await pg.close();
  return [...new Set(problemas)];
}

/**
 * Fuerza la carga de las imágenes diferidas (loading="lazy" o por IntersectionObserver):
 * recorre la página hasta abajo y espera a que cada imagen termine (carga o error), para
 * que una imagen rota bajo el pliegue también se vea. Vuelve arriba para la captura.
 * Devuelve las que siguen sin terminar pasado el límite (no se da por buena la página).
 */
async function cargarDiferidas(pg, limiteMs = 10000) {
  return pg.evaluate(async (limite) => {
    for (const i of document.querySelectorAll('img[loading="lazy"]')) i.loading = 'eager';
    const paso = Math.max(200, window.innerHeight * 0.8);
    for (let y = 0, n = 0; y < document.documentElement.scrollHeight && n < 60; y += paso, n++) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
    // networkidle no sirve: puede haberse alcanzado antes de activar estas cargas.
    const abiertas = () => [...document.images].filter((i) => (i.currentSrc || i.getAttribute('src')) && !i.complete);
    const fin = Date.now() + limite;
    while (abiertas().length && Date.now() < fin) await new Promise((r) => setTimeout(r, 100));
    return abiertas().map((i) => i.currentSrc || i.getAttribute('src'));
  }, limiteMs);
}

/**
 * ¿Hay un manejador «submit» para el formulario nº `k`? El evento sube por todos sus
 * ancestros hasta document y window, así que se mira en cada uno.
 * Solo Chromium expone los listeners (CDP); en otros motores devuelve null (no se sabe).
 */
async function tieneSubmitJs(pg, k) {
  let cdp;
  try {
    cdp = await pg.context().newCDPSession(pg);
  } catch {
    return null;
  }
  try {
    const nodo = (d) => `(() => { let e = document.querySelectorAll('form')[${k}]; for (let i = 0; i < ${d} && e; i++) e = e.parentNode; return e; })()`;
    // El formulario, sus ancestros (parentNode de <html> es document) y por último window.
    for (let d = 0; d < 200; d++) {
      const { result } = await cdp.send('Runtime.evaluate', { expression: nodo(d) });
      if (!result.objectId) break;
      const { listeners } = await cdp.send('DOMDebugger.getEventListeners', { objectId: result.objectId });
      if (listeners.some((l) => l.type === 'submit')) return true;
    }
    for (const expr of ['window']) {
      const { result } = await cdp.send('Runtime.evaluate', { expression: expr });
      if (!result.objectId) continue;
      const { listeners } = await cdp.send('DOMDebugger.getEventListeners', { objectId: result.objectId });
      if (listeners.some((l) => l.type === 'submit')) return true;
    }
    return false;
  } finally {
    await cdp.detach().catch(() => {});
  }
}

/** Cada formulario visible se puede enviar y cada campo tiene nombre y etiqueta. */
async function revisarFormularios(pg) {
  const out = await pg.$$eval('form', (fs) => {
    const visible = (e) => !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
    const out = [];
    fs.filter(visible).forEach((f, k) => {
      const id = f.id ? `#${f.id}` : `nº ${k + 1}`;
      if (!f.querySelector('button:not([type=button]):not([type=reset]), input[type=submit], input[type=image]'))
        out.push(`formulario ${id} sin botón de enviar`);
      // action="#"/javascript: solo es un fallo si además ningún JavaScript gestiona el envío
      // (se comprueba fuera, con los listeners): se marca con el índice para resolverlo.
      const accion = f.getAttribute('action') ?? '';
      if (/^(javascript:|#$)/i.test(accion.trim()) && !f.getAttribute('onsubmit')) out.push({ k: fs.indexOf(f), texto: `formulario ${id} sin destino (${accion})` });
      for (const c of f.querySelectorAll('input, select, textarea')) {
        if (/^(hidden|submit|button|reset|image)$/i.test(c.type) || !visible(c)) continue;
        if (!c.name) out.push(`formulario ${id}: campo sin name (${c.type || c.tagName.toLowerCase()})`);
        const etiqueta = c.labels?.length || c.getAttribute('aria-label') || c.getAttribute('aria-labelledby') || c.title;
        if (!etiqueta) out.push(`formulario ${id}: campo «${c.name || c.type}» sin etiqueta`);
      }
    });
    return out;
  });
  const res = [];
  for (const p of out) {
    if (typeof p === 'string') res.push(p);
    else if ((await tieneSubmitJs(pg, p.k)) === false) res.push(p.texto);
  }
  return res;
}

/** Los enlaces «#algo» apuntan a un elemento que existe («#top» siempre lleva arriba). */
async function revisarAnclas(pg) {
  return pg.$$eval('a[href^="#"]', (as) =>
    [...new Set(as.map((a) => a.getAttribute('href')))]
      .filter((h) => h.length > 1 && !h.startsWith('#!') && h.toLowerCase() !== '#top')
      .filter((h) => {
        const id = decodeURIComponent(h.slice(1));
        return !document.getElementById(id) && !document.getElementsByName(id).length;
      })
      .map((h) => `ancla sin destino: ${h}`),
  );
}

/**
 * Enlaces tel:, WhatsApp y mailto bien escritos; con `primerClic`, al menos una llamada a la
 * acción de contacto (o un formulario) visible sin desplazarse.
 */
async function revisarContacto(pg, { primerClic }) {
  const { enlaces, arriba, formArriba } = await pg.evaluate(() => {
    const visible = (e) => {
      const r = e.getBoundingClientRect();
      const st = getComputedStyle(e);
      return r.width > 0 && r.height > 0 && st.visibility !== 'hidden' && st.display !== 'none' && Number(st.opacity) > 0;
    };
    const enPantalla = (e) => {
      const r = e.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0 && visible(e);
    };
    window.scrollTo(0, 0);
    const clicables = [...document.querySelectorAll('a[href], button, input[type=submit], [role=button]')];
    return {
      enlaces: [...new Set([...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')))],
      arriba: clicables
        .filter(enPantalla)
        .map((e) => ({ texto: (e.innerText || e.value || e.getAttribute('aria-label') || '').trim().slice(0, 80), href: e.getAttribute('href') || '' })),
      formArriba: [...document.querySelectorAll('form')].some(enPantalla),
    };
  });
  const out = enlaces.map(problemaContacto).filter(Boolean);
  if (primerClic && !formArriba && !arriba.some(esCta)) out.push('sin botón de contacto (llamar, WhatsApp, reservar…) en la primera pantalla del móvil');
  return out;
}

/** Web que se publica: indexable y con canonical a sí misma. */
async function revisarIndexacion(pg, respuesta) {
  const { robotsMeta, canonicals } = await pg.evaluate(() => ({
    robotsMeta: [...document.querySelectorAll('meta[name=robots i], meta[name=googlebot i]')].map((m) => m.content),
    canonicals: [...document.querySelectorAll('link[rel~=canonical i]')].map((l) => l.getAttribute('href')),
  }));
  return problemasIndexacion({ url: pg.url(), robotsMeta, robotsCabecera: respuesta?.headers()['x-robots-tag'] ?? '', canonicals });
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

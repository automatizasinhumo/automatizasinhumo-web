// Regresión visual (C23): cada página clave a 360, 390, 768 y 1280 px comparada con su captura
// de referencia (tests/visual/capturas/). Si desaparece el buscador, un botón de compra o se
// rompe la maqueta, la PR se pone en rojo y el informe enseña la diferencia.
// Para aceptar un cambio visual a propósito: lanzar el workflow «QA visual» a mano con
// actualizar=true y fusionar las capturas nuevas que sube como commit.
import { expect, test, type Page } from '@playwright/test';

const ANCHOS = [360, 390, 768, 1280] as const;
const PAGINAS = [
  ['inicio', '/'],
  ['productos', '/products'],
  ['producto', '/products/web-una-pagina'],
  ['como-funciona', '/pages/como-funciona'],
  ['preguntas', '/pages/preguntas-frecuentes'],
  ['buscar', '/search?q=web'],
] as const;

/** Deja la página quieta: fuentes cargadas, imágenes diferidas pintadas y sin cursores. */
async function estabilizar(pg: Page) {
  await pg.evaluate(async () => {
    // decoding="async" deja que Chromium pinte un hueco en las imágenes fuera de pantalla
    // durante la captura de página completa: dos fotos seguidas no coincidían.
    for (const i of document.querySelectorAll<HTMLImageElement>('img')) {
      i.loading = 'eager';
      i.decoding = 'sync';
    }
    const paso = Math.max(200, window.innerHeight * 0.8);
    for (let y = 0, n = 0; y < document.documentElement.scrollHeight && n < 60; y += paso, n++) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 30));
    }
    window.scrollTo(0, 0);
    await document.fonts.ready;
    await Promise.all(
      [...document.images]
        .filter((i) => !i.complete)
        .map(
          (i) =>
            new Promise((r) => {
              i.addEventListener('load', r, { once: true });
              i.addEventListener('error', r, { once: true });
            }),
        ),
    );
  });
  await pg.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
  // Las imágenes con fundido (data-image-fade) siguen transparentes hasta que el script de
  // Layout las marca como cargadas: sin esto la captura sale a medias según la carrera.
  await pg.waitForFunction(() => [...document.querySelectorAll('img[data-image-fade]')].every((i) => i.hasAttribute('data-image-loaded')), null, { timeout: 15000 });
  await pg.evaluate(() => Promise.all([...document.images].map((i) => i.decode().catch(() => {}))));
}

for (const ancho of ANCHOS) {
  test.describe(`${ancho}px`, () => {
    test.use({ viewport: { width: ancho, height: 800 } });
    for (const [nombre, ruta] of PAGINAS) {
      test(`${nombre}`, async ({ page }) => {
        const r = await page.goto(ruta, { waitUntil: 'load' });
        expect(r?.status(), `${ruta} responde`).toBeLessThan(400);
        await estabilizar(page);
        await expect(page).toHaveScreenshot(`${nombre}-${ancho}.png`, {
          fullPage: true,
          // Contenido que cambia solo (fechas, contadores aleatorios): se tapa.
          mask: [page.locator('time, [data-visual-variable]')],
        });
      });
    }
  });
}

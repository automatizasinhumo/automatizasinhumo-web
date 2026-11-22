// Menús de cabecera al ir atrás/adelante (19/11): Chrome y Safari restauran la página desde la
// bfcache tal como se dejó, con el panel abierto. Playwright desactiva la bfcache, así que se
// simulan sus eventos (pagehide al salir, pageshow persisted al volver) y se comprueba que cierran.
// La navegación real atrás/adelante también se recorre: el pie y los menús deben seguir vivos.
import { expect, test, type Page } from '@playwright/test';
import { CLAVE_GUIAS } from '../../src/data/tour';

// Las guías salen solas y su capa tapa el menú: aquí se prueba el menú, no la guía.
test.beforeEach(({ page }) => page.addInitScript((k) => localStorage.setItem(k, 'no'), CLAVE_GUIAS));

const simular = (page: Page, tipo: 'pagehide' | 'pageshow') =>
  page.evaluate((t) => window.dispatchEvent(new PageTransitionEvent(t, { persisted: true })), tipo);

test.describe('menús y bfcache 1280px', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  for (const tipo of ['pagehide', 'pageshow'] as const) {
    test(`el mega menú se cierra en ${tipo}`, async ({ page }) => {
      await page.goto('/');
      const disparador = page.locator('header [data-slot="navigation-menu-trigger"]').first();
      await disparador.click();
      await expect(disparador).toHaveAttribute('data-state', 'open');
      await simular(page, tipo);
      await expect(disparador).toHaveAttribute('data-state', 'closed');
    });
  }

  test('atrás y adelante: el menú reabre y el pie sigue', async ({ page }) => {
    await page.goto('/');
    const disparador = page.locator('header [data-slot="navigation-menu-trigger"]').first();
    await disparador.click();
    await page.locator('[data-slot="navigation-menu-content"] a:visible').first().click();
    await page.waitForLoadState();
    await page.goBack();
    await page.goForward();
    await page.goBack();
    await expect(page.locator('footer')).toBeVisible();
    await disparador.click();
    await expect(disparador).toHaveAttribute('data-state', 'open');
  });
});

test.describe('menús y bfcache 390px', () => {
  test.use({ viewport: { width: 390, height: 800 } });

  for (const tipo of ['pagehide', 'pageshow'] as const) {
    test(`la hamburguesa se cierra en ${tipo}`, async ({ page }) => {
      await page.goto('/');
      const menu = page.locator('header details[data-nav-disclosure]');
      await menu.locator('summary').click();
      await expect(menu).toHaveAttribute('open', '');
      await simular(page, tipo);
      await expect(menu).not.toHaveAttribute('open');
    });
  }
});

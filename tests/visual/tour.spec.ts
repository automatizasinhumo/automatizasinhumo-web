// Tour de bienvenida (src/data/tour.ts): cada paso apunta a un bloque visible y único de la
// portada, en escritorio y en móvil. Sale solo una vez por visita; avanzar, retroceder, Escape,
// «No volver a mostrar» y el enlace del pie que la reabre.
import { expect, test } from '@playwright/test';
import { CLAVE_GUIAS, PASOS_TOUR } from '../../src/data/tour';

for (const ancho of [390, 1280]) {
  test.describe(`tour ${ancho}px`, () => {
    test.use({ viewport: { width: ancho, height: 800 } });

    test('cada paso tiene un bloque visible y único', async ({ page }) => {
      await page.goto('/');
      for (const { id } of PASOS_TOUR) {
        const bloque = page.locator(`[data-tour="${id}"]`);
        await expect(bloque, id).toHaveCount(1);
        await expect(bloque, id).toBeVisible();
      }
    });

    test('sale sola, avanza, retrocede, Escape y no se repite en la visita', async ({ page }) => {
      await page.goto('/');
      const globo = page.locator('.driver-popover');
      await expect(globo).toContainText(PASOS_TOUR[0].titulo);
      await expect(globo).toContainText(`1 de ${PASOS_TOUR.length}`);
      await expect(globo.getByRole('button', { name: 'Cerrar la guía' })).toBeVisible();
      await globo.getByRole('button', { name: /Siguiente/ }).click();
      await expect(globo).toContainText(PASOS_TOUR[1].titulo);
      await globo.getByRole('button', { name: /Anterior/ }).click();
      await expect(globo).toContainText(PASOS_TOUR[0].titulo);
      await page.keyboard.press('Escape');
      await expect(globo).toHaveCount(0);
      await page.reload();
      await page.waitForLoadState('networkidle');
      await expect(globo).toHaveCount(0);
    });

    test('«No volver a mostrar» la apaga; el enlace del pie la reabre', async ({ page }) => {
      await page.goto('/');
      await page.locator('.driver-popover').getByRole('button', { name: 'No volver a mostrar' }).click();
      expect(await page.evaluate((k) => localStorage.getItem(k), CLAVE_GUIAS)).toBe('no');
      await page.evaluate(() => sessionStorage.clear());
      await page.reload();
      await page.waitForLoadState('networkidle');
      await expect(page.locator('.driver-popover')).toHaveCount(0);
      await page.getByRole('link', { name: 'Ver guía de la web' }).click();
      await expect(page.locator('.driver-popover')).toContainText(PASOS_TOUR[0].titulo);
    });
  });
}

// Tour de bienvenida (src/data/tour.ts): cada paso apunta a un bloque visible y único de la
// portada, en escritorio y en móvil; avanzar, retroceder, Escape, «Ahora no» y recarga.
import { expect, test } from '@playwright/test';
import { CLAVE_TOUR, PASOS_TOUR } from '../../src/data/tour';

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

    test('empezar, avanzar, retroceder y Escape', async ({ page }) => {
      await page.goto('/');
      const aviso = page.locator('#tour-invitacion');
      await expect(aviso).toBeVisible();
      await aviso.getByRole('button', { name: 'Empezar guía' }).click();
      const globo = page.locator('.driver-popover');
      await expect(globo).toContainText(PASOS_TOUR[0].titulo);
      await expect(globo).toContainText(`1 de ${PASOS_TOUR.length}`);
      await globo.getByRole('button', { name: /Siguiente/ }).click();
      await expect(globo).toContainText(PASOS_TOUR[1].titulo);
      await globo.getByRole('button', { name: /Anterior/ }).click();
      await expect(globo).toContainText(PASOS_TOUR[0].titulo);
      await page.keyboard.press('Escape');
      await expect(globo).toHaveCount(0);
      expect(await page.evaluate((k) => localStorage.getItem(k), CLAVE_TOUR)).toBe('visto');
      await page.reload();
      await expect(aviso).toBeHidden();
    });

    test('«Ahora no» no vuelve a ofrecerla; el enlace del pie la reabre', async ({ page }) => {
      await page.goto('/');
      await page.locator('#tour-invitacion').getByRole('button', { name: 'Ahora no' }).click();
      await page.reload();
      await expect(page.locator('#tour-invitacion')).toBeHidden();
      await page.getByRole('link', { name: 'Ver guía de la web' }).click();
      await expect(page.locator('.driver-popover')).toContainText(PASOS_TOUR[0].titulo);
    });
  });
}

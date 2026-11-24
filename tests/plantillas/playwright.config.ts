// QA geométrico de las plantillas de web: cada diseño con datos normales y adversarios a 390, 768 y
// 1280 px. Falla si algo desborda en horizontal o si un titular parte una palabra por la mitad.
// No necesita servidor: renderiza con documentoWeb() y sirve las fuentes de public/.
// uso: qa/navegador/node_modules/.bin/playwright test -c tests/plantillas
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  outputDir: '../../test-results/plantillas',
  fullyParallel: true,
  retries: 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never', outputFolder: '../../playwright-report-plantillas' }]] : 'list',
  timeout: 60_000,
  use: { locale: 'es-ES', browserName: 'chromium' },
});

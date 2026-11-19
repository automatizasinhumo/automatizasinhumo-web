// Regresión visual (C23): toHaveScreenshot() de Playwright contra la web de la PR servida en local
// (build + D1 local con el catálogo real de manual/catalogo/seed.sql). Las capturas de referencia
// son de Linux (las genera el propio workflow): en Windows/macOS solo sirven para mirar.
// uso: qa/navegador/node_modules/.bin/playwright test -c tests/visual [--update-snapshots]
import { defineConfig } from '@playwright/test';

const PUERTO = Number(process.env.VISUAL_PORT ?? 8790);

export default defineConfig({
  testDir: '.',
  outputDir: '../../test-results/visual',
  snapshotPathTemplate: '{testDir}/capturas/{arg}{ext}',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never', outputFolder: '../../playwright-report' }]] : 'list',
  timeout: 60_000,
  expect: {
    toHaveScreenshot: {
      // Mismo motor, mismo sistema y mismas fuentes: el ruido es casi nulo. Un buscador o
      // un botón que desaparece cambia miles de píxeles.
      maxDiffPixels: 150,
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
    },
  },
  use: {
    baseURL: `http://127.0.0.1:${PUERTO}`,
    locale: 'es-ES',
    timezoneId: 'Europe/Madrid',
    colorScheme: 'light',
    reducedMotion: 'reduce',
    browserName: 'chromium',
  },
  webServer: {
    // Necesita `npm run build` y la D1 local preparada (ver .github/workflows/qa-visual.yml).
    command: `npx wrangler dev --config dist/server/wrangler.json --persist-to .wrangler/visual --var AUTH_SECRET:visual-auth-secret-0123456789abcdef --ip 127.0.0.1 --port ${PUERTO}`,
    cwd: '../..',
    url: `http://127.0.0.1:${PUERTO}/`,
    env: { X_LOCAL_OBSERVABILITY: 'false' },
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});

# Continuidad 18-11-2026 — C19, idioma del escaparate

- **Rama y PR**: `copilot/c19-idioma`, commit `fb091e3`; [PR #31](https://github.com/automatizasinhumo/automatizasinhumo-web/pull/31) abierta contra `main`, sin fusionar.
- **Cambios**: textos de `/express`, carrito, checkout, configuración de pagos, compra de prueba y pago Lightning traducidos; etiquetas predeterminadas de envío y países localizadas. Añadido `tests/idioma.test.ts` con `franc-min`, recorrido del Worker y rutas públicas; excluye `/admin`. `@types/node` 22 habilita la comprobación de tipos del test.
- **Verificado**:
  - Antes de traducir, el test detectó inglés real en `/express` y `/payment-setup`; después: `npx vitest run tests/idioma.test.ts` pasa (1 test).
  - `npx vitest run src/features/shipping/calculator.test.ts src/features/shipping/settings.test.ts`: 74 tests pasan.
  - `npm run check`: 0 errores y 0 avisos (148 pistas informativas).
  - `git diff --check` pasa.
- **Fallos resueltos**: falsos positivos de `franc-min` con nombres de marca y texto de prueba breve; definiciones de Node ausentes al principio de `npm run check`. Se ajustaron las excepciones/datos de prueba y se añadió `@types/node`.
- **Pendiente**: revisión y CI de la PR; no fusionar hasta aprobación. `npm install` notificó 14 vulnerabilidades altas; no se ejecutó `npm audit fix`.
- **Enlaces**: [PR #31](https://github.com/automatizasinhumo/automatizasinhumo-web/pull/31) · [tarea C19](../manual/equipo/copilot.md).

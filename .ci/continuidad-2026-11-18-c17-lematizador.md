# Continuidad C17 — 2026-11-18

- **Rama y PR**: `copilot/c17-lematizador`; [PR #36](https://github.com/automatizasinhumo/automatizasinhumo-web/pull/36), abierta contra `main`. Push solo a `origin`.
- **Cambios**: Snowball en español para los términos de consulta y el vocabulario de producto; prefijos FTS5; sinónimos sumados siempre; prioridad para los productos activos de la categoría reconocida. Test D1 para bodas, eventos, peluquerías y sinónimos concurrentes con coincidencias literales.
- **Verificado**: el test D1 falló antes de implementar (4 casos de bodas) y pasó después; pruebas dirigidas 9/9; `npm test` 967/967; `npm run check` con 0 errores y 0 advertencias; `npm run build` correcto; `git diff --check` correcto.
- **Fallos y pendientes**: no quedan fallos locales. Los checks de GitHub estaban en cola/en curso al crear la PR. C18 queda pendiente de que C17 se fusione; C21, de la fusión de C18.

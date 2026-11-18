# Continuidad C4 — 2026-11-18

- Cambios: correcciones acotadas de `css:S8778`, `S2871`, `typescript:S3923`, `plsql:NullComparison`, `python:S8904`, `typescript:S6324` y `jssecurity:S5145/S5144/S8476`.
- Verificaciones: `npx vitest run` (939/939), `npx astro build`, comprobación sintáctica JavaScript/Python, equivalencia de predicados SQLite y rechazo de un host no permitido.
- Fallos: una primera ejecución de Vitest tuvo un timeout aislado; la repetición completa pasó.
- SonarCloud Code Analysis: PASS en la PR.
- Pendiente: finalización de los checks de Actions y CodeRabbit; están en estado pending al cierre.
- PR: [#15](https://github.com/automatizasinhumo/automatizasinhumo-web/pull/15), título «C4: hallazgos reales de SonarCloud».
- SonarCloud: https://sonarcloud.io/project/issues?id=davidpd89_automatizasinhumo-web&resolved=false&types=BUG,VULNERABILITY

## Seguimiento CodeRabbit — 2026-11-18

- Cambios: restauradas `migrations/0002_product_slug.sql` y `migrations/0009_product_images.sql` desde `origin/main`; README actualizado con `tienda.example.com`; mensajes de `agent-demo.mjs` traducidos y `safeLog` ampliado para controles C1.
- Migraciones: no se añade una migración nueva; el cambio anterior solo sustituía predicados equivalentes para el analizador, sin necesidad de alterar el comportamiento.
- Verificaciones: `npx vitest run test/scripts/agent-demo-logging.test.mjs` (1/1); `npm run check` (0 errores, 0 advertencias y 3 sugerencias preexistentes); `node --check` en ambos scripts; `git diff --check`; comparación exacta de ambas migraciones con `origin/main`.
- Fallos: ninguno.
- Pendiente: revisar y resolver los hilos de CodeRabbit manualmente; no se han resuelto desde esta tarea. No se consultó el estado actual de Actions.
- PR: [#15](https://github.com/automatizasinhumo/automatizasinhumo-web/pull/15).

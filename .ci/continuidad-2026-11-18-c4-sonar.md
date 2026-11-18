# Continuidad C4 — 2026-11-18

- Cambios: correcciones acotadas de `css:S8778`, `S2871`, `typescript:S3923`, `plsql:NullComparison`, `python:S8904`, `typescript:S6324` y `jssecurity:S5145/S5144/S8476`.
- Verificaciones: `npx vitest run` (939/939), `npx astro build`, comprobación sintáctica JavaScript/Python, equivalencia de predicados SQLite y rechazo de un host no permitido.
- Fallos: una primera ejecución de Vitest tuvo un timeout aislado; la repetición completa pasó.
- SonarCloud Code Analysis: PASS en la PR.
- Pendiente: finalización de los checks de Actions y CodeRabbit; están en estado pending al cierre.
- PR: [#15](https://github.com/davidpd89/automatizasinhumo-web/pull/15), título «C4: hallazgos reales de SonarCloud».
- SonarCloud: https://sonarcloud.io/project/issues?id=davidpd89_automatizasinhumo-web&resolved=false&types=BUG,VULNERABILITY

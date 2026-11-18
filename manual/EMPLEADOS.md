# Empleados automáticos

Revisores gratuitos que trabajan solos. Cada uno es una herramienta pública mantenida
por terceros; en el repo solo está el pegamento (workflow + script corto).
Regla: antes de programar un revisor, buscar uno público que ya lo haga.

Presupuesto: el repo es privado y tiene 2.000 min/mes gratis de Actions. Lo pesado va semanal.

## En marcha

| Empleado | Herramienta (licencia) | Cuándo | Dónde | ¿Pone rojo? | Qué hacer con su aviso |
|---|---|---|---|---|---|
| Verificador | vitest, astro check, build, integración D1, MCP | push y PR | `verify.yml` | Sí | Arreglar antes de seguir: es la puerta |
| Humo | curl (`qa/smoke.sh`) | push a main y lunes | `empleados-qa.yml` | Sí | La web de staging no responde o falta algo básico |
| Lighthouse 6 URL | @lhci/cli (Apache-2.0) | push a main y lunes | `empleados-qa.yml` | Sí, por umbral (`lighthouserc.json`) | Ver el informe en el artefacto |
| Accesibilidad | pa11y-ci, WCAG2AA (LGPL) | push a main y lunes | `empleados-qa.yml` | Sí | El log dice el elemento y la regla (H30.2, etc.) |
| Enlaces | lychee (MIT/Apache) | push a main y lunes | `empleados-qa.yml` | Sí | Corregir o quitar el enlace roto |
| Lighthouse de toda la web | unlighthouse (MIT) | lunes 06:41 UTC y a mano | `empleados-semanales.yml` | No | Tabla con las peores páginas en el resumen; informe HTML en el artefacto `unlighthouse` |
| Cabeceras de seguridad | Mozilla HTTP Observatory (MPL-2.0) | lunes y a mano | `empleados-semanales.yml` | No | Nota y tests fallidos; se arregla en `src/middleware.ts` |
| Corrector | LanguageTool en Docker (LGPL) | lunes y a mano | `empleados-semanales.yml` + `qa/ortografia.mjs` | No | Tabla «Dónde · Texto · Propuesta». Se corrige en `manual/catalogo/catalogo.mjs` y se aplica con `gen-update.mjs`. Las marcas nuevas van a `PROPIAS` |
| Multinavegador | Playwright: Chromium, Firefox y WebKit a 360 y 1280 px (Apache-2.0) | lunes y a mano | `empleados-semanales.yml` + `qa/navegadores.mjs` | Sí | Errores de JS o consola, HTTP ≥400 o desborde en móvil. Capturas en el artefacto `capturas`. Rutas en `qa/urls-navegadores.txt` |
| HTML válido | html-validate (MIT), todas las URL del sitemap | lunes y a mano | `empleados-semanales.yml` + `qa/htmlvalidate.json` | Sí | `001.html:línea:col regla`; el número se traduce a URL en el desplegable del resumen. Apagadas a propósito: estilos en línea, `role="list"` (Safari lo necesita con `list-style:none`) y la barra de progreso propia |
| Secretos | gitleaks (MIT), todo el historial | push a main y lunes | `seguridad.yml` | Sí | Si es real: rotar la clave YA y luego limpiar. Si es falso: su huella a `.gitleaksignore` |
| Dependencias | npm audit (producción, altas y críticas) | push a main y lunes | `seguridad.yml` | No | Esperar a la PR de Dependabot o `npm audit fix` (nunca `--force` sin revisar) |
| Actualizador | Dependabot (GitHub) | mensual, agrupado | `.github/dependabot.yml` | — | PR con el verificador en verde → fusionar. Las versiones mayores, una a una |
| Auditor GPT | ChatGPT por chat (proyecto «Creación Webs») | a mano, por rondas | `scripts/gpt/` + `manual/auditorias-gpt/` | — | Ver abajo |

Lanzar a mano: `gh workflow run -R davidpd89/automatizasinhumo-web empleados-semanales.yml`
(o `seguridad.yml`, `empleados-qa.yml`). El resumen de cada run sale en la pestaña del run.

### Auditor GPT (local)

Necesita Edge con depuración en el puerto 9241 y la sesión de ChatGPT iniciada (no se cierra ni se reinicia).

1. `node scripts/gpt/ronda.mjs <n> "<qué se aplicó de la ronda anterior>"` coge los 10 siguientes
   servicios sin auditar (`manual/auditorias-gpt/auditados.txt`) y escribe `ronda-NN-pregunta.txt`.
2. `python -I -X utf8 scripts/gpt/ask.py manual/auditorias-gpt/ronda-NN-pregunta.txt manual/auditorias-gpt/ronda-NN-respuesta.md --wait 30`
   (sigue en el último chat; `--new` abre otro en el proyecto). Si dice `LOGIN_REQUERIDO`, iniciar sesión en ese Edge.
3. Aplicar en `manual/catalogo/catalogo.mjs`, `node manual/catalogo/gen-update.mjs` → D1 de staging, desplegar.

## Pendientes de decisión de David

- **Repo público** → gratis CodeRabbit (revisión de cada PR) y SonarCloud (calidad y seguridad del código),
  y minutos de Actions sin límite. Hoy no se puede por ser privado.
- **Upptime** (upptime/upptime, MIT): monitor cada 5 min + página de estado, todo en GitHub.
  Necesita un repo público propio (p. ej. `davidpd89/estado`) y un token (PAT) como secreto.

## Candidatos por probar (públicos y gratis)

Clonar en `C:/GIT/automatizasinhumo-terceros/` (directorio vacío, sin ejecutar su código) para leerlos;
en CI se usan por su paquete o binario publicado y con versión fija.

| Qué | Herramienta | Para qué nos sirve |
|---|---|---|
| Código muerto | knip (ISC) | Ficheros, exports y dependencias que ya no usa nadie |
| Accesibilidad 2.º motor | @axe-core/cli (MPL-2.0) | Complementa pa11y; reglas distintas |
| Rendimiento real | sitespeed.io (MIT) | Vídeo de carga, métricas y comparación entre semanas |
| Datos estructurados | schemarama / validator de Schema.org | Comprobar el JSON-LD de las fichas (Product, Offer) |
| Peso de la web | size-limit (MIT) | Avisar si el JS o el CSS crecen de golpe |

## Plantilla para clientes

Cuando se entregue una web a un cliente, copiar `empleados-qa.yml`, `empleados-semanales.yml`
(cambiando `BASE`/`HOST`), `seguridad.yml`, `dependabot.yml` y `qa/` a su repo: así sale con
sus revisores puestos desde el primer día.

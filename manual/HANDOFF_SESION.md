# Traspaso de sesión — Automatiza sin humo (18-11-2026)

## Pedido
- Tienda 100 % automatizada y gratuita, con el mínimo de tokens.
- Claude hace de **arquitecto**: adopta repos públicos (MIT/Apache) en vez de desarrollar de cero y homogeneiza en lugar de parchear.
- El equipo:
  - GPT (Edge 9241) busca.
  - Copilot (chat de VS Code) programa.
  - CodeRabbit y SonarCloud revisan.
  - Claude reparte el trabajo, revisa y fusiona.
- Todo cambio va por PR.
- El Edge 9241 se cierra cuando no se usa, porque gasta mucha RAM.

## Hecho hoy
- **Mapa de adopción** (GPT, ronda 07): `manual/auditorias-gpt/ronda-07-respuesta.md`, con 10 adopciones priorizadas y los repos comprobados.
- **PR #7 fusionada** (`e723ea9`):
  - Demos sin `#template-bar` y con las 309 páginas traducidas. El worker de demos está desplegado.
  - Ciudad limpia en las vistas previas.
  - **Puerta de QA** en `manual/fabrica/vistas-previas.py`: la web responde, aparece el nombre del negocio, no quedan correos ni teléfonos de la plantilla y no hay imágenes rotas. Si la pasa, la nota lleva «QA ok».
  - **Tarea programada** `automatizasinhumo-vistas-previas` (cada 15 min). Se colgaba porque wrangler esperaba una respuesta por consola; ahora usa `CI=1`, `timeout` y `stdin` a DEVNULL. Comprobado: termina en 12 s.
  - `scripts/gpt/ask.py`:
    - Abre y cierra el Edge 9241 por su cuenta. El perfil se ha movido a `%LOCALAPPDATA%\automatizasinhumo\edge-9241`.
    - No pisa la salida si no hay respuesta, y `--leer` acepta respuestas cortas.
- **SonarCloud** importado: `davidpd89_automatizasinhumo-web`. Revisa cada PR y la #7 quedó en verde.
- **Dependabot**: #2 (vitest 5) y #4 (stripe 23) fusionadas. Verify de main en verde.
- Borrados los workers de prueba `web-prueba-fontaneria-lois` y `web-s-gh2qc2aw`.
- **Cola de Copilot** en `manual/equipo/copilot.md`:
  - C1: componentes.
  - C2: blog y sectores, con 3 artículos.
  - C3: correo de vista previa y recordatorios a 3 y 7 días desde el cron.
  - C4: hallazgos reales de Sonar.
  - C5 y C6 (aprobación → pago y versiones): en la PR #8.

## Falta
1. **Copilot, C1**: está a medias en `C:\GIT\automatizasinhumo-copilot`, rama `copilot/c1-componentes`. Tiene `homeServices.ts` y `sections/` sin commit.
   - Un `git reset --hard` mío deshizo sus cambios en `HomeHero.astro`, `index.astro`, `products/[slug].astro` y `ProductDetail.astro`. Ya le he pedido que los vuelva a aplicar.
   - **David**: mira la ventana de VS Code del worktree por si Copilot espera confirmación.
   - Después: revisar la PR, fusionarla y encargar C2, C3, C4…
2. **PR #8** (cola C5 y C6): fusionar cuando esté en verde.
3. **Traducción de las demos**: quedan restos como «Skip to content», «Check», «£» y algún calco («Tratos»). Hace falta un glosario o una pasada final.
4. Hacerlo por adopción, no a mano:
   - 10.1: fábrica en GitHub Actions con wrangler-action.
   - 10.2: solicitud → fábrica sin el PC encendido.
5. Sonar en main: 24 bugs y 29 vulnerabilidades. Copilot arregla los reales (C4); el resto es ruido (migraciones, `npx`), que se puede marcar en Sonar con la sesión de David.
6. Pendientes de David del 17/11 (contacto en Ajustes, pasarela, MX, aviso legal, dominio).

## Estado vivo
- `main` = `origin/main`.
- Árbol principal en la rama `docs/cola-copilot-c5-c6` (PR #8).
- La tarea programada ejecuta el `.py` del árbol principal: dejarlo en main o en una rama derivada de main.
- Edge 9241 cerrado. Lo abre `scripts/gpt/ask.py` cuando hace falta.
- Encargar a Copilot desde su worktree: `cd C:/GIT/automatizasinhumo-copilot && code chat -r -m agent "<tarea>"`.
  - **Nunca** usar `git reset` ni `git checkout` en ese worktree.

## Reglas del proyecto
- **Norma de trabajo** (`.github/copilot-instructions.md`, cargada también en `CLAUDE.md`): ante cualquier fallo, hueco o necesidad, se busca un repo público que ya funcione, se clona, se adapta, se prueba y se sube por PR. Si no encaja, se usa otro repo; no se desarrolla desde cero ni se parchea.
- **Repos**:
  - No tocar `davidpd89/saas-automation-lab` (producción).
  - `C:\GIT\new-website` es de solo lectura.
  - Push solo a `origin`, nunca a `upstream`.
  - Con `gh`, siempre `-R davidpd89/automatizasinhumo-web`.
  - Sin `git stash`.
- **Datos y dinero**:
  - Nunca mostrar secretos (`manual/CREDENCIALES_STAGING.local`).
  - Nada de pagos ni tarjetas reales (Stripe en modo test, sí: lo exige la prueba de C5).
  - Datos personales: el nombre sí, la dirección no.
- **Estilo y commits**:
  - CRLF.
  - Nunca decir «código abierto».
  - Commits con `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Prompt para continuar
> Automatiza sin humo (`C:\GIT\automatizasinhumo`). Lee `manual/HANDOFF_SESION.md` y sigue desde «Falta»: revisa el avance de Copilot en C1 (worktree `C:\GIT\automatizasinhumo-copilot`, sin resetearlo), fusiona la PR #8 si está en verde y encarga la siguiente tarea de `manual/equipo/copilot.md`. Eres el arquitecto: adopción de repos, no desarrollo de cero; todo por PR.

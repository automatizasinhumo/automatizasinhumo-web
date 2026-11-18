# Traspaso de sesión — Automatiza sin humo (18-11-2026)

## Pedido
- Tienda 100 % automatizada y gratuita, con el mínimo de tokens.
- Claude hace de **arquitecto**: adopta repos públicos (MIT/Apache/BSD) en vez de desarrollar de cero. El código propio es solo pegamento.
- El equipo:
  - GPT (Edge 9241, `scripts/gpt/ask.py`) busca.
  - Copilot (chat de la **única** ventana de VS Code de David) programa. David pega los prompts que prepara Claude.
  - CodeRabbit, SonarCloud y Codex revisan.
  - Claude reparte, revisa, resuelve hilos y fusiona.
- Todo cambio va por PR. Lo útil para web-escritor se le deja como PR de aviso en `docs/pending/` (solo abrirla).

## Hecho hoy
- **Repo trasladado a la organización `automatizasinhumo`** (cupo de Actions propio). CodeQL y secret scanning reactivados; Apps instaladas en la organización; SonarCloud con organización y proyecto nuevos (`automatizasinhumo_automatizasinhumo-web`).
- **Fusionadas**: #9 (C1 componentes), #11 (fábrica en Actions; tarea local desactivada), #12 (rondas 08-10), #13 (zizmor, Dependency Review, Scorecard), #14, #16 y #18 (Dependabot).
- **#17** (endurecer el workflow de la fábrica): acciones fijadas por SHA y `persist-credentials: false`. Harden-Runner se quitó a propósito: en un repo público su informe de red mostraría el host `web-<id>` de cada vista previa.
- Referencias al nombre viejo del repo corregidas en `manual/` (esta PR).

## Falta
1. **#15 (C4, Sonar)**: Copilot debe atender los hilos de CodeRabbit (no reescribir migraciones 0002 y 0009, dominio de ejemplo sin `<>` en el README, mensajes de `scripts/agent-demo.mjs` en español, `safeLog` sin controles C1). Después, resolver hilos y fusionar.
2. **#19 (C2, blog y sectores, adaptado de ScrewFast)**: leer CodeRabbit, pedir arreglos a Copilot si los hay y fusionar.
3. **#17**: fusionar si sigue en verde.
4. Siguiente encargo a Copilot: C3 (correo de vista previa y recordatorios) y después C5, C7, C9, C11 según `manual/equipo/copilot.md`.
5. Borrar en SonarCloud el proyecto viejo `davidpd89_automatizasinhumo-web` cuando el nuevo haya analizado varias PR. **No** tocar `davidpd89_web-escritor`.
6. Traducción de restos en las demos («Skip to content», «£», calcos): glosario o pasada final.
7. Pendientes de David: ver el final de `manual/ESTADO.md` (dominio, pasarela, contacto, MX, aviso legal).

## Estado vivo
- El árbol principal (`C:\GIT\automatizasinhumo`) se queda en `main`. El trabajo se hace en worktrees `C:\GIT\ash-*`.
- Copilot trabaja en `C:\GIT\ash-c4` (rama `copilot/c4-sonar`) y `C:\GIT\ash-c2` (rama `copilot/c2-blog`). **Nunca** usar `git reset` ni `git checkout` en sus worktrees.
- Quedan carpetas huérfanas que Windows no dejó borrar: `C:\GIT\ash-c1fix`, `C:\GIT\ash-fabrica`, `C:\GIT\automatizasinhumo-copilot`. Se pueden borrar a mano con VS Code cerrado.
- Edge 9241 cerrado. Lo abre `scripts/gpt/ask.py` cuando hace falta.

## Reglas del proyecto
- **Norma de trabajo** (`.github/copilot-instructions.md`): ante cualquier hueco se busca un repo público que ya funcione, se clona en una carpeta vacía (sin ejecutarlo), se adapta, se prueba y se sube por PR. Si no encaja, otro repo.
- **Repos**:
  - No tocar `davidpd89/saas-automation-lab` (producción).
  - `C:\GIT\new-website` es de solo lectura.
  - Push solo a `origin`.
  - Con `gh`, siempre `-R automatizasinhumo/automatizasinhumo-web` (avisos: `-R davidpd89/web-escritor`).
  - Sin `git stash`.
- **Datos y dinero**:
  - Nunca mostrar secretos (`manual/CREDENCIALES_STAGING.local`, `.dev.vars`).
  - El repo y sus registros de Actions son públicos: ni datos de clientes ni artefactos con ellos.
  - Nada de pagos ni tarjetas reales (Stripe en modo test, sí).
  - Datos personales: el nombre sí, la dirección no.
- **Estilo y commits**: CRLF; nunca decir «código abierto»; leer CodeRabbit antes de fusionar; commits con `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Prompt para continuar
> Automatiza sin humo (`C:\GIT\automatizasinhumo`, repo `automatizasinhumo/automatizasinhumo-web`). Lee `manual/HANDOFF_SESION.md` y sigue desde «Falta»: revisa #15 y #19 de Copilot (sin resetear sus worktrees), resuelve los hilos de CodeRabbit, fusiona lo que esté en verde y prepara el prompt del siguiente encargo de `manual/equipo/copilot.md`. Eres el arquitecto: adopción de repos públicos, no desarrollo de cero; todo por PR.

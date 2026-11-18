# Tareas para GitHub Copilot (chat de VS Code, créditos gratuitos)

El agente de Copilot no se puede asignar desde GitHub en este repo, así que trabaja desde el chat de VS Code de David.

Funcionamiento:

1. David abre el chat de Copilot en modo **Agent** y pega: «Haz la primera tarea en estado PENDIENTE de `manual/equipo/copilot.md`».
2. Copilot crea la rama `copilot/<n>`, hace la tarea, abre una PR y cambia el estado de la tarea a `EN PR #<n>`.
3. CodeRabbit y la CI revisan la PR. Claude la revisa y la fusiona o la devuelve con comentarios.

Reglas para Copilot:
- Reutilizar código de repos públicos (MIT/Apache) en vez de escribirlo desde cero.
- Ficheros con CRLF.
- Textos visibles en español de España.
- Push solo a `origin`, nunca a `upstream`.
- No tocar `.instances/` ni `manual/CREDENCIALES_STAGING.local`.

## Cola

Las tareas salen del mapa de adopción (`manual/auditorias-gpt/ronda-07-respuesta.md`). Cada una dice qué clonar, qué copiar y dónde, y la prueba que demuestra que funciona.

<!-- TAREAS -->

### C1 · Componentes comerciales Astro (mapa ronda 07, adopción 8) — PENDIENTE
Clona fulldotdev/ui (MIT) y konstantinWDK/astro-components (MIT) en una carpeta temporal fuera del repo. Copia:
- fulldotdev/ui/src/components/blocks/services-1.astro -> src/features/storefront/sections/ServiciosPorNecesidad.astro
- fulldotdev/ui/src/components/blocks/pricing-1.astro -> src/features/storefront/sections/ComparativaModalidades.astro
- konstantinWDK/astro-components/src/components/lib/cards/PricingCompareMiniCard.astro -> src/features/storefront/sections/TarjetaComparacion.astro
Adáptalos a los tokens y clases Tailwind v4 del tema actual (sin añadir dependencias nuevas salvo que sean imprescindibles), con datos del catálogo real. Úsalos en la portada y en las fichas donde la comparación aporte información. Prueba: `npx astro build` sin errores y capturas a 360 y 1280 px de la portada y de tres fichas, adjuntas a la PR.

### C2 · Blog y páginas por sector en el sitemap (mapa ronda 07, adopción 9) — PENDIENTE
Clona mearashadowfax/ScrewFast (MIT). Copia src/views/BlogIndexView.astro, src/views/BlogPostView.astro, src/components/ui/cards/CardBlog.astro, src/utils/content.ts y src/utils/metadata.ts a src/features/blog/ y src/features/seo/metadata.ts. Crea src/pages/blog/ y src/pages/webs/[sector].astro (peluquerías, fontaneros, restaurantes, abogados, fisioterapeutas) enlazando a los servicios y demos reales. Añade las rutas a src/pages/sitemap.xml.ts. Prueba: build sin errores; cada página con title y description únicos; las rutas aparecen en /sitemap.xml.

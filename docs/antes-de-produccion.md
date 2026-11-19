# Lista «antes de producción»

Cosas decididas que **no** se montan hasta que la web esté estable (menús y fichas cerrados). Fuente:
ronda 22 de GPT (`manual/auditorias-gpt/ronda-22-respuesta.md`) y decisiones de David del 19/11/2026.
Cada punto dice qué repo se adopta y el plan corto. Cuando un punto se haga, se marca y se enlaza la PR.

## 1. Tour guiado de bienvenida

- **Repo:** [Driver.js](https://github.com/nilbuild/driver.js), MIT, JavaScript puro y sin framework.
  Descartados: Shepherd e Intro.js (AGPL o licencia de pago para uso comercial) y Reactour, Joyride y
  Onborda (necesitan React).
- **Qué más trae el repo:** `hints` (pistas sueltas sin tour), `checklist` (sirve también en el
  seguimiento del pedido), `headless`, docs hechas con Astro y playground con tests Playwright en los 3
  motores.
- **Plan:**
  1. Marcar los bloques con `data-tour="buscador|categorias|modalidades|vista-previa|seguimiento"`, nunca
     con clases ni texto.
  2. `src/data/tour.ts` con un manifiesto de pasos (id, ruta, selector, título, texto). Lo leen el tour y
     el test.
  3. En la primera visita, aviso «¿Quieres conocer la web en un minuto?» con «Empezar guía» y «Ahora no».
     La elección se guarda en `localStorage` (`tour:v1:estado`) y queda un enlace «Ver guía» en Ayuda.
  4. Accesibilidad: foco atrapado, Escape, devolver el foco y animación reducida. En móvil abre antes el
     menú si el destino está oculto.
  5. Test Playwright que lee el manifiesto: cada selector existe una sola vez y es visible, en escritorio
     y en móvil, y se prueban avanzar, retroceder, Escape, «Ahora no» y la recarga.

## 2. Vídeos explicativos automáticos (web y YouTube)

- **Cadena:** guion YAML → Playwright graba acciones reales → [kokoro-onnx](https://github.com/thewh1teagle/kokoro-onnx)
  (MIT, trae `examples/spanish.py`) pone la voz → [Motion Canvas](https://github.com/motion-canvas/motion-canvas)
  (MIT) añade rótulos y resaltados → FFmpeg monta, subtitula (SRT) y exporta en horizontal y vertical.
- **Descartados por licencia:** Remotion (condiciones para uso comercial), Piper (GPL) y edge-tts (LGPL).
- **Plan:** probar primero un vídeo de 45–60 s («cómo pedir una web»): calidad de la voz en español,
  consumo de CPU y zoom estable. Los selectores `data-video` se ponen en los mismos bloques que
  `data-tour`. La subida a YouTube con OAuth va aparte y al final.

## 3. Cabecera y menús (UX)

Prioridades de la ronda 22, con estudios de Baymard (búsqueda, filtros y navegación móvil) y NN/g (mega
menús, migas):

| Prioridad | Cambio | Prueba automática |
| --- | --- | --- |
| P0 | Buscador siempre visible en escritorio, a un toque en móvil; entiende necesidades, erratas y sinónimos | «quiero que me pidan cita», «gogle», «traducir web» devuelven algo útil |
| P0 | 14 categorías agrupadas en 4 áreas (Webs, Automatizaciones, Traducciones, Plantillas), como mucho 2 niveles | Toda categoría se alcanza en ≤ 2 clics |
| P0 | Tarjetas iguales: qué resuelve, precios, modalidad, demo y CTA | Ningún producto sin esos campos |
| P0 | Filtros por sector, objetivo, precio y modalidad, combinables, que sobreviven a recargar y volver | `qa/exploratorio.mjs` + test de filtros |
| P0 | Una búsqueda sin resultados ofrece sinónimos, categorías y «Cuéntanos qué necesitas» | Términos sin coincidencias |
| P1 | Asistente «no sé qué necesito» de 3 preguntas (para qué → qué conseguir → plantilla o te lo montamos), con reglas del catálogo y sin IA | Cada respuesta lleva a 1–3 productos |
| P1 | Comparador de hasta 3 servicios: incluye, no incluye, plazo y precio | Coherente con los datos |
| P1 | Mega menú agrupado por tarea, accesible con teclado ([Floating UI](https://github.com/floating-ui/floating-ui), MIT, solo `@floating-ui/dom`) | Tab, Escape y móvil |
| P1 | Migas con `BreadcrumbList`; CTA fijo en móvil solo en fichas | Capturas a 320, 375, 390 y 768 px |

Para presentar las sugerencias del buscador sin cambiar el motor propio se usa
[Algolia Autocomplete](https://github.com/algolia/autocomplete) (MIT, núcleo sin la nube de Algolia).

## 4. Asistente de dudas

- **Primero, sin IA:** respuestas aprobadas en `src/data/ayuda/` (pregunta, variantes, respuesta,
  servicios y URL) que entran en el buscador actual. La búsqueda devuelve dos grupos: «Respuesta a tu
  duda» y «Servicios que te pueden ayudar». En D1 se guardan las preguntas sin respuesta para mejorar
  sinónimos y FAQ.
- **Ayuda larga:** [Pagefind](https://github.com/Pagefind/pagefind) (MIT) para `/ayuda`. Si faltan
  resaltado o persistencia: [Orama](https://github.com/oramasearch/orama) (Apache-2.0, `plugin-astro`).
- **Después, con IA:** Workers AI + Vectorize (incluidos en el plan gratuito), solo para preguntas
  ambiguas y siempre citando la ficha de origen.
- **Pasar a una persona:** «Enviar consulta» (formulario), «Recibir respuesta por correo» y «Abrir
  Telegram» (usuario público). **Nunca WhatsApp ni número de teléfono.** Se adjuntan la pregunta, la
  página y el servicio consultado.
- **Descartados:** Typebot (licencia FSL), Botpress (comercial) y Chatwoot (MIT, pero es un servidor
  entero).

## 5. Contacto

- Canales: email, formulario y Telegram por usuario. `contact_whatsapp` vacío en Admin → Ajustes.
- Quien quiera WhatsApp lo pide por el formulario o por email y deja **su** número.
- Pendiente: el usuario de Telegram de David para rellenar `contact_telegram` en el staging.

## 6. Entrega y alojamiento

Ver [entrega-y-alojamiento.md](entrega-y-alojamiento.md). La FAQ de entrega se publica cuando el
paquete ZIP y el dominio del cliente funcionen.

## Ya adoptado (ronda 22, «ahora»)

- [x] `qa/exploratorio.mjs`: [fast-check](https://github.com/dubzzz/fast-check) (MIT) genera
      secuencias aleatorias de navegación (enlaces, atrás, adelante, recargar, buscar, doble clic, cambio
      de ancho) y comprueba invariantes. Si algo falla, reduce la secuencia a la mínima y da la semilla.
      Lo ejecuta el job `exploratorio` de `empleados-semanales.yml`.
- [x] Dependency Review ya estaba en `vigilantes-cadena.yml`.

## Siguientes «ahora» de QA (por impacto)

- [ ] Schemathesis (MIT) sobre un `openapi.yaml` de los endpoints públicos, contra `wrangler dev` con D1
      de prueba.
- [ ] Danger JS (MIT) con reglas de PR: si cambia un precio, pide su test; si cambia el checkout, pide
      el recorrido; si cambia un menú, pide capturas móviles.
- [ ] reviewdog (MIT) para comentar en la línea los resultados que CSpell y Stylelint ya producen.
- [ ] gremlins.js (MIT, sin actividad desde 2022) como prueba no bloqueante de monos.
- [ ] browser-use o Stagehand con Ollama local: solo en local, como experimento; no van a CI.

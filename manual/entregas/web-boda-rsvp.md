# Web de boda con confirmación de asistencia

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Bodas y eventos |
| Precio | Lo montas tú 99 € · Te lo montamos 249 € |
| Plazo publicado | 3 días |
| Nivel | **A · Un prompt** (5–15 min de tu tiempo; se entrega el mismo día) |
| Dónde vive | Web estática en un Worker propio de Cloudflare (gratis) |
| Base | demos boda-blush / boda-midnight / boda-sage (Poison675, MIT) |

**Qué es:** Toda la información de la boda en una web y los invitados confirman asistencia y menú.

**Ejemplo:** Lucía & Pablo: 140 invitados confirman desde el móvil y descargáis el Excel para el catering.

## 1. Qué le pides al cliente

- Nombres y fecha
- Lugar de ceremonia y banquete
- Programa del día
- Fotos
- Opciones de menú

**Accesos:**
- Opcional: Telegram para recibir cada confirmación al momento

Email listo para mandar:

```text
Asunto: Tu pedido «Web de boda con confirmación de asistencia»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Nombres y fecha
- Lugar de ceremonia y banquete
- Programa del día
- Fotos
- Opciones de menú

Y además (te guiamos paso a paso si no sabes cómo):
- Opcional: Telegram para recibir cada confirmación al momento

En cuanto lo tengamos, el plazo es de 3 días.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs web-boda-rsvp` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto web-boda-rsvp («Web de boda con confirmación de asistencia») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel A.
Base: demos boda-blush / boda-midnight / boda-sage (Poison675, MIT). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Web estática en un Worker propio de Cloudflare (gratis).
Campos del cliente:
- Nombres y fecha: <...>
- Lugar de ceremonia y banquete: <...>
- Programa del día: <...>
- Fotos: <...>
- Opciones de menú: <...>
Accesos que ya me ha dado el cliente:
- Opcional: Telegram para recibir cada confirmación al momento: <sí/no>
Tiene que quedar: Web con historia, programa, cómo llegar y alojamiento; Formulario RSVP con menú y alergias; Lista de confirmados descargable; Preguntas frecuentes.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs web-boda-rsvp tu`.

## 3. Qué entregas

- [ ] Web con historia, programa, cómo llegar y alojamiento
- [ ] Formulario RSVP con menú y alergias
- [ ] Lista de confirmados descargable
- [ ] Preguntas frecuentes
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Web de boda con confirmación de asistencia

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Web con historia, programa, cómo llegar y alojamiento
- Formulario RSVP con menú y alergias
- Lista de confirmados descargable
- Preguntas frecuentes

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- Demo: [Web de boda · estilo Blush](https://automatizasinhumo-demos.davidpd89.workers.dev/boda-blush/)
- Demo: [Web de boda · estilo Midnight Gold](https://automatizasinhumo-demos.davidpd89.workers.dev/boda-midnight/)
- Demo: [Solo confirmación de asistencia](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-eventos/templates/rsvp-only/)
- Demo: [Boda clásica](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/events-community/wedding/)
- [Holojerm/nuxt-wedding-template](https://github.com/Holojerm/nuxt-wedding-template) · MIT
- [kbichave/wedding-invite](https://github.com/kbichave/wedding-invite) · ISC
- [zachspiel/wedding-rsvp](https://github.com/zachspiel/wedding-rsvp) · MIT
- [sotomaque/wedding-website](https://github.com/sotomaque/wedding-website) · NONE
- [1molehayo/wedding-website-builder](https://github.com/1molehayo/wedding-website-builder) · GPL-3.0

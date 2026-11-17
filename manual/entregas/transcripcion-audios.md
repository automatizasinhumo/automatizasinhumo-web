# Transcripción automática de audios y reuniones

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Documentos, PDF e IA |
| Precio | Lo montas tú 49 € · Te lo montamos 149 € |
| Plazo publicado | 48 h |
| Nivel | **B · Prompt + accesos del cliente** (30–90 min de tu tiempo, casi todo esperando al cliente) |
| Dónde vive | Worker con Whisper de Workers AI (capa gratuita) o Groq |
| Base | openai/whisper (MIT) |

**Qué es:** Mandas un audio o una grabación y recibes el texto y un resumen con tareas. Funciona con audios de WhatsApp.

**Ejemplo:** Gestoría: reenvía al bot la nota de voz del cliente y recibe «Pide cita para la renta, trae 3 nóminas».

## 1. Qué le pides al cliente

- Dónde te llegan los audios (WhatsApp, Telegram, carpeta)
- Dónde quieres el texto
- Idioma principal

**Accesos:**
- Bot de Telegram (token del cliente con @BotFather)
- Opcional: carpeta de Drive

Email listo para mandar:

```text
Asunto: Tu pedido «Transcripción automática de audios y reuniones»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Dónde te llegan los audios (WhatsApp, Telegram, carpeta)
- Dónde quieres el texto
- Idioma principal

Y además (te guiamos paso a paso si no sabes cómo):
- Bot de Telegram (token del cliente con @BotFather)
- Opcional: carpeta de Drive

En cuanto lo tengamos, el plazo es de 48 h.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs transcripcion-audios` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto transcripcion-audios («Transcripción automática de audios y reuniones») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel B.
Base: openai/whisper (MIT). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Worker con Whisper de Workers AI (capa gratuita) o Groq.
Campos del cliente:
- Dónde te llegan los audios (WhatsApp, Telegram, carpeta): <...>
- Dónde quieres el texto: <...>
- Idioma principal: <...>
Accesos que ya me ha dado el cliente:
- Bot de Telegram (token del cliente con @BotFather): <sí/no>
- Opcional: carpeta de Drive: <sí/no>
Tiene que quedar: Carpeta o bot donde dejar los audios; Texto completo en español; Resumen con puntos y tareas; Copia en Google Docs o email.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs transcripcion-audios tu`.

## 3. Qué entregas

- [ ] Carpeta o bot donde dejar los audios
- [ ] Texto completo en español
- [ ] Resumen con puntos y tareas
- [ ] Copia en Google Docs o email
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Transcripción automática de audios y reuniones

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Carpeta o bot donde dejar los audios
- Texto completo en español
- Resumen con puntos y tareas
- Copia en Google Docs o email

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [openai/whisper](https://github.com/openai/whisper) · MIT

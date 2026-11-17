# Chat con IA en tu web que responde con tus datos

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Bots e IA |
| Precio | Lo montas tú 199 € · Te lo montamos 449 € |
| Plazo publicado | 5 días |
| Nivel | **B · Prompt + accesos del cliente** (30–90 min de tu tiempo, casi todo esperando al cliente) |
| Dónde vive | Worker de Cloudflare + widget en su web |
| Base | mckaywrigley/chatbot-ui (MIT) |

**Qué es:** Un asistente en tu web que contesta horarios, precios y dudas frecuentes usando tu información, y te pasa los contactos.

**Ejemplo:** Clínica dental: «¿Abrís el sábado?» → «Sí, de 10 a 14. ¿Te reservo una revisión?» y llega el contacto al móvil.

## 1. Qué le pides al cliente

- Web donde va el chat
- Documentos o FAQ
- Tono (cercano / formal)
- Email o Telegram para avisos

**Accesos:**
- Clave de IA del cliente (OpenAI, Gemini o Groq; Groq y Gemini tienen capa gratuita)
- Acceso para pegar el widget en su web

Email listo para mandar:

```text
Asunto: Tu pedido «Chat con IA en tu web que responde con tus datos»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Web donde va el chat
- Documentos o FAQ
- Tono (cercano / formal)
- Email o Telegram para avisos

Y además (te guiamos paso a paso si no sabes cómo):
- Clave de IA del cliente (OpenAI, Gemini o Groq; Groq y Gemini tienen capa gratuita)
- Acceso para pegar el widget en su web

En cuanto lo tengamos, el plazo es de 5 días.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs chat-ia-web` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto chat-ia-web («Chat con IA en tu web que responde con tus datos») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel B.
Base: mckaywrigley/chatbot-ui (MIT). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Worker de Cloudflare + widget en su web.
Campos del cliente:
- Web donde va el chat: <...>
- Documentos o FAQ: <...>
- Tono (cercano / formal): <...>
- Email o Telegram para avisos: <...>
Accesos que ya me ha dado el cliente:
- Clave de IA del cliente (OpenAI, Gemini o Groq; Groq y Gemini tienen capa gratuita): <sí/no>
- Acceso para pegar el widget en su web: <sí/no>
Tiene que quedar: Chat en tu web o en una página propia; Entrenado con tus textos, PDFs y preguntas frecuentes; Aviso cuando alguien deja sus datos; Panel para revisar conversaciones.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs chat-ia-web tu`.

## 3. Qué entregas

- [ ] Chat en tu web o en una página propia
- [ ] Entrenado con tus textos, PDFs y preguntas frecuentes
- [ ] Aviso cuando alguien deja sus datos
- [ ] Panel para revisar conversaciones
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Chat con IA en tu web que responde con tus datos

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Chat en tu web o en una página propia
- Entrenado con tus textos, PDFs y preguntas frecuentes
- Aviso cuando alguien deja sus datos
- Panel para revisar conversaciones

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [mckaywrigley/chatbot-ui](https://github.com/mckaywrigley/chatbot-ui) · MIT

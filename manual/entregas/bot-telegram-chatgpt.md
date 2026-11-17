# Bot de Telegram con IA

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Bots e IA |
| Precio | Lo montas tú 99 € · Te lo montamos 249 € |
| Plazo publicado | 48 h |
| Nivel | **B · Prompt + accesos del cliente** (30–90 min de tu tiempo, casi todo esperando al cliente) |
| Dónde vive | Worker de Cloudflare |
| Base | tbxark/ChatGPT-Telegram-Workers |

**Qué es:** Un asistente con IA en Telegram para tu negocio o comunidad, con tus instrucciones.

**Ejemplo:** Gimnasio: bot que responde horarios, tarifas y ejercicios a los socios a cualquier hora.

## 1. Qué le pides al cliente

- Nombre del bot
- Para qué sirve
- Instrucciones/tono
- Usuarios permitidos

**Accesos:**
- Bot de Telegram (token del cliente con @BotFather)
- Clave de IA del cliente (OpenAI, Gemini o Groq; Groq y Gemini tienen capa gratuita)

Email listo para mandar:

```text
Asunto: Tu pedido «Bot de Telegram con IA»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Nombre del bot
- Para qué sirve
- Instrucciones/tono
- Usuarios permitidos

Y además (te guiamos paso a paso si no sabes cómo):
- Bot de Telegram (token del cliente con @BotFather)
- Clave de IA del cliente (OpenAI, Gemini o Groq; Groq y Gemini tienen capa gratuita)

En cuanto lo tengamos, el plazo es de 48 h.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs bot-telegram-chatgpt` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto bot-telegram-chatgpt («Bot de Telegram con IA») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel B.
Base: tbxark/ChatGPT-Telegram-Workers. Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Worker de Cloudflare.
Campos del cliente:
- Nombre del bot: <...>
- Para qué sirve: <...>
- Instrucciones/tono: <...>
- Usuarios permitidos: <...>
Accesos que ya me ha dado el cliente:
- Bot de Telegram (token del cliente con @BotFather): <sí/no>
- Clave de IA del cliente (OpenAI, Gemini o Groq; Groq y Gemini tienen capa gratuita): <sí/no>
Tiene que quedar: Bot de Telegram publicado; Personalidad e instrucciones a medida; Control de quién puede usarlo; Alojamiento sin servidor.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs bot-telegram-chatgpt tu`.

## 3. Qué entregas

- [ ] Bot de Telegram publicado
- [ ] Personalidad e instrucciones a medida
- [ ] Control de quién puede usarlo
- [ ] Alojamiento sin servidor
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Bot de Telegram con IA

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Bot de Telegram publicado
- Personalidad e instrucciones a medida
- Control de quién puede usarlo
- Alojamiento sin servidor

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [tbxark/ChatGPT-Telegram-Workers](https://github.com/tbxark/ChatGPT-Telegram-Workers) · MIT

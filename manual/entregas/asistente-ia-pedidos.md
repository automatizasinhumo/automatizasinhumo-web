# Asistente IA que toma pedidos

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Restaurantes y bares |
| Precio | Lo montas tú 299 € · Te lo montamos 599 € |
| Plazo publicado | 7 días |
| Nivel | **C · Proyecto por fases** (1–3 días de trabajo) |
| Dónde vive | Worker de Cloudflare con bot de Telegram o chat web |
| Base | tbxark/ChatGPT-Telegram-Workers |

**Qué es:** Un asistente que contesta dudas de la carta y toma pedidos por chat, 24 horas.

**Ejemplo:** «¿Tenéis algo sin gluten?» → el asistente recomienda 3 platos y apunta el pedido.

## 1. Qué le pides al cliente

- Carta completa
- Preguntas frecuentes
- Horarios y zonas
- Canal (web, Telegram o WhatsApp)

**Accesos:**
- Clave de IA del cliente (OpenAI, Gemini o Groq; Groq y Gemini tienen capa gratuita)
- Bot de Telegram (token del cliente con @BotFather)

Email listo para mandar:

```text
Asunto: Tu pedido «Asistente IA que toma pedidos»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Carta completa
- Preguntas frecuentes
- Horarios y zonas
- Canal (web, Telegram o WhatsApp)

Y además (te guiamos paso a paso si no sabes cómo):
- Clave de IA del cliente (OpenAI, Gemini o Groq; Groq y Gemini tienen capa gratuita)
- Bot de Telegram (token del cliente con @BotFather)

En cuanto lo tengamos, el plazo es de 7 días.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs asistente-ia-pedidos` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto asistente-ia-pedidos («Asistente IA que toma pedidos») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel C.
Base: tbxark/ChatGPT-Telegram-Workers. Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Worker de Cloudflare con bot de Telegram o chat web.
Campos del cliente:
- Carta completa: <...>
- Preguntas frecuentes: <...>
- Horarios y zonas: <...>
- Canal (web, Telegram o WhatsApp): <...>
Accesos que ya me ha dado el cliente:
- Clave de IA del cliente (OpenAI, Gemini o Groq; Groq y Gemini tienen capa gratuita): <sí/no>
- Bot de Telegram (token del cliente con @BotFather): <sí/no>
Tiene que quedar: Asistente entrenado con tu carta; Respuestas sobre alérgenos y horarios; Pedido resumido para cocina; Informe de preguntas frecuentes.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Haz primero un plan de entrega por fases (máx. 3) y entrega la fase 1 funcionando.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs asistente-ia-pedidos tu`.

## 3. Qué entregas

- [ ] Asistente entrenado con tu carta
- [ ] Respuestas sobre alérgenos y horarios
- [ ] Pedido resumido para cocina
- [ ] Informe de preguntas frecuentes
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Asistente IA que toma pedidos

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Asistente entrenado con tu carta
- Respuestas sobre alérgenos y horarios
- Pedido resumido para cocina
- Informe de preguntas frecuentes

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- Demo: [Food truck](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/restaurant/food-truck/)
- Demo: [Carta con pedido por WhatsApp](https://automatizasinhumo-demos.davidpd89.workers.dev/carta-whatsapp/)
- [thisyourei/fastfood-ai-assistant](https://github.com/thisyourei/fastfood-ai-assistant) · NONE
- [tbxark/ChatGPT-Telegram-Workers](https://github.com/tbxark/ChatGPT-Telegram-Workers) · MIT

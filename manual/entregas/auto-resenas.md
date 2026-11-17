# Resumen semanal de reseñas

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Automatizaciones |
| Precio | Lo montas tú 99 € · Te lo montamos 199 € |
| Plazo publicado | 3 días |
| Nivel | **B · Prompt + accesos del cliente** (30–90 min de tu tiempo, casi todo esperando al cliente) |
| Dónde vive | Flujo de n8n o Worker programado (cron) en Cloudflare (gratis) |
| Base | plantilla propia (ningún repo base tiene licencia libre) |

**Qué es:** Cada lunes recibes un resumen con IA de lo que dicen tus clientes: lo bueno, lo malo y qué responder.

**Ejemplo:** Hotel rural: «Esta semana 12 reseñas, 2 quejas por el wifi», con respuesta sugerida.

## 1. Qué le pides al cliente

- Dónde están tus reseñas
- Email/Telegram de destino

**Accesos:**
- Ficha de Google Business (gestor)
- Bot de Telegram (token del cliente con @BotFather)

Email listo para mandar:

```text
Asunto: Tu pedido «Resumen semanal de reseñas»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Dónde están tus reseñas
- Email/Telegram de destino

Y además (te guiamos paso a paso si no sabes cómo):
- Ficha de Google Business (gestor)
- Bot de Telegram (token del cliente con @BotFather)

En cuanto lo tengamos, el plazo es de 3 días.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs auto-resenas` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto auto-resenas («Resumen semanal de reseñas») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel B.
Base: plantilla propia (ningún repo base tiene licencia libre). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Flujo de n8n o Worker programado (cron) en Cloudflare (gratis).
Campos del cliente:
- Dónde están tus reseñas: <...>
- Email/Telegram de destino: <...>
Accesos que ya me ha dado el cliente:
- Ficha de Google Business (gestor): <sí/no>
- Bot de Telegram (token del cliente con @BotFather): <sí/no>
Tiene que quedar: Flujo semanal programado; Resumen con IA; Borradores de respuesta; Envío por email o Telegram.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs auto-resenas tu`.

## 3. Qué entregas

- [ ] Flujo semanal programado
- [ ] Resumen con IA
- [ ] Borradores de respuesta
- [ ] Envío por email o Telegram
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Resumen semanal de reseñas

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Flujo semanal programado
- Resumen con IA
- Borradores de respuesta
- Envío por email o Telegram

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- Demo: [Muro de testimonios](https://automatizasinhumo-demos.davidpd89.workers.dev/testimonios/)
- [vixonoffice/n8n-automation-templates](https://github.com/vixonoffice/n8n-automation-templates) · NONE
- [enescingoz/awesome-n8n-templates](https://github.com/enescingoz/awesome-n8n-templates) · NOASSERTION

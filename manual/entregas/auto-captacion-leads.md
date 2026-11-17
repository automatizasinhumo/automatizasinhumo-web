# Captación de clientes automática

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Automatizaciones |
| Precio | Lo montas tú 149 € · Te lo montamos 299 € |
| Plazo publicado | 3 días |
| Nivel | **B · Prompt + accesos del cliente** (30–90 min de tu tiempo, casi todo esperando al cliente) |
| Dónde vive | Flujo de n8n o Worker programado (cron) en Cloudflare (gratis) |
| Base | plantilla propia (ningún repo base tiene licencia libre) |

**Qué es:** Formulario → hoja de cálculo → email de bienvenida → aviso a tu móvil. Sin copiar y pegar.

**Ejemplo:** Academia: cada interesado queda en la hoja, recibe el temario y tú te enteras al momento.

## 1. Qué le pides al cliente

- Formulario de origen
- Hoja de destino
- Texto del email
- Canal de aviso

**Accesos:**
- Acceso de editor a su Hoja de Google o Drive (comparte con tu email)
- Email remitente (SMTP o Brevo gratis)
- Bot de Telegram (token del cliente con @BotFather)

Email listo para mandar:

```text
Asunto: Tu pedido «Captación de clientes automática»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Formulario de origen
- Hoja de destino
- Texto del email
- Canal de aviso

Y además (te guiamos paso a paso si no sabes cómo):
- Acceso de editor a su Hoja de Google o Drive (comparte con tu email)
- Email remitente (SMTP o Brevo gratis)
- Bot de Telegram (token del cliente con @BotFather)

En cuanto lo tengamos, el plazo es de 3 días.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs auto-captacion-leads` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto auto-captacion-leads («Captación de clientes automática») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel B.
Base: plantilla propia (ningún repo base tiene licencia libre). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Flujo de n8n o Worker programado (cron) en Cloudflare (gratis).
Campos del cliente:
- Formulario de origen: <...>
- Hoja de destino: <...>
- Texto del email: <...>
- Canal de aviso: <...>
Accesos que ya me ha dado el cliente:
- Acceso de editor a su Hoja de Google o Drive (comparte con tu email): <sí/no>
- Email remitente (SMTP o Brevo gratis): <sí/no>
- Bot de Telegram (token del cliente con @BotFather): <sí/no>
Tiene que quedar: Flujo n8n importado y probado; Registro en Google Sheets; Email automático al cliente; Aviso a Telegram.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs auto-captacion-leads tu`.

## 3. Qué entregas

- [ ] Flujo n8n importado y probado
- [ ] Registro en Google Sheets
- [ ] Email automático al cliente
- [ ] Aviso a Telegram
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Captación de clientes automática

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Flujo n8n importado y probado
- Registro en Google Sheets
- Email automático al cliente
- Aviso a Telegram

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [yusizer/n8n-lead-automation](https://github.com/yusizer/n8n-lead-automation) · NONE
- [n8n-io/n8n](https://github.com/n8n-io/n8n) · NOASSERTION

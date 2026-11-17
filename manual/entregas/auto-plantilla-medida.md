# Una automatización a elegir del catálogo

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Automatizaciones |
| Precio | Lo montas tú 99 € · Te lo montamos 199 € |
| Plazo publicado | 3 días |
| Nivel | **B · Prompt + accesos del cliente** (30–90 min de tu tiempo, casi todo esperando al cliente) |
| Dónde vive | Flujo de n8n o Worker programado (cron) en Cloudflare (gratis) |
| Base | plantilla propia (ningún repo base tiene licencia libre) |

**Qué es:** Elige entre más de 280 flujos probados (Gmail, WhatsApp, Notion, Drive, IA…) y lo dejamos funcionando con tus cuentas.

**Ejemplo:** Guardar adjuntos de Gmail en Drive por cliente, o publicar en redes lo que subes al blog.

## 1. Qué le pides al cliente

- Qué tarea repetitiva quieres quitarte
- Herramientas que usas
- Accesos (te guiamos)

**Accesos:**
- Accesos a las herramientas implicadas (se guía al cliente)

Email listo para mandar:

```text
Asunto: Tu pedido «Una automatización a elegir del catálogo»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Qué tarea repetitiva quieres quitarte
- Herramientas que usas
- Accesos (te guiamos)

Y además (te guiamos paso a paso si no sabes cómo):
- Accesos a las herramientas implicadas (se guía al cliente)

En cuanto lo tengamos, el plazo es de 3 días.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs auto-plantilla-medida` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto auto-plantilla-medida («Una automatización a elegir del catálogo») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel B.
Base: plantilla propia (ningún repo base tiene licencia libre). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Flujo de n8n o Worker programado (cron) en Cloudflare (gratis).
Campos del cliente:
- Qué tarea repetitiva quieres quitarte: <...>
- Herramientas que usas: <...>
- Accesos (te guiamos): <...>
Accesos que ya me ha dado el cliente:
- Accesos a las herramientas implicadas (se guía al cliente): <sí/no>
Tiene que quedar: Flujo instalado y conectado; Prueba con datos reales; Guía de uso de 1 página.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs auto-plantilla-medida tu`.

## 3. Qué entregas

- [ ] Flujo instalado y conectado
- [ ] Prueba con datos reales
- [ ] Guía de uso de 1 página
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Una automatización a elegir del catálogo

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Flujo instalado y conectado
- Prueba con datos reales
- Guía de uso de 1 página

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- Demo: [Catálogo de 100 plantillas por sector](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/)
- [enescingoz/awesome-n8n-templates](https://github.com/enescingoz/awesome-n8n-templates) · NOASSERTION
- [n8n-io/n8n](https://github.com/n8n-io/n8n) · NOASSERTION
- [activepieces/activepieces](https://github.com/activepieces/activepieces) · NOASSERTION
- [automatisch/automatisch](https://github.com/automatisch/automatisch) · NOASSERTION

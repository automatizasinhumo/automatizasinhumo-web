# Automatizaciones vigiladas (mes)

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Planes mensuales |
| Precio | 39 € |
| Plazo publicado | Mensual |
| Nivel | **B · Prompt + accesos del cliente** (30–90 min de tu tiempo, casi todo esperando al cliente) |
| Dónde vive | Flujo de n8n o Worker programado (cron) en Cloudflare (gratis) |
| Base | plantilla propia (ningún repo base tiene licencia libre) |

**Qué es:** Mantenemos tus automatizaciones en marcha: si una falla, la arreglamos antes de que lo notes.

**Ejemplo:** El token de Google caduca un viernes por la noche: lo renovamos y el flujo sigue.

## 1. Qué le pides al cliente

- Automatizaciones actuales
- Canal de aviso

**Accesos:**
- Accesos a sus herramientas

Email listo para mandar:

```text
Asunto: Tu pedido «Automatizaciones vigiladas (mes)»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Automatizaciones actuales
- Canal de aviso

Y además (te guiamos paso a paso si no sabes cómo):
- Accesos a sus herramientas

En cuanto lo tengamos, el plazo es de Mensual.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs plan-automatizaciones` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto plan-automatizaciones («Automatizaciones vigiladas (mes)») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel B.
Base: plantilla propia (ningún repo base tiene licencia libre). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Flujo de n8n o Worker programado (cron) en Cloudflare (gratis).
Campos del cliente:
- Automatizaciones actuales: <...>
- Canal de aviso: <...>
Accesos que ya me ha dado el cliente:
- Accesos a sus herramientas: <sí/no>
Tiene que quedar: Servidor n8n/Activepieces gestionado; Vigilancia de errores; 1 flujo nuevo pequeño al mes.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.
```

## 3. Qué entregas

- [ ] Servidor n8n/Activepieces gestionado
- [ ] Vigilancia de errores
- [ ] 1 flujo nuevo pequeño al mes
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Automatizaciones vigiladas (mes)

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Servidor n8n/Activepieces gestionado
- Vigilancia de errores
- 1 flujo nuevo pequeño al mes

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [n8n-io/n8n](https://github.com/n8n-io/n8n) · NOASSERTION
- [activepieces/activepieces](https://github.com/activepieces/activepieces) · NOASSERTION

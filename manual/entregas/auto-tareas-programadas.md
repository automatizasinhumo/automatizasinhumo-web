# Tareas programadas en la nube

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Automatizaciones |
| Precio | Lo montas tú 199 € · Te lo montamos 399 € |
| Plazo publicado | 5 días |
| Nivel | **B · Prompt + accesos del cliente** (30–90 min de tu tiempo, casi todo esperando al cliente) |
| Dónde vive | Cloudflare Workflows o Cron Trigger (gratis) |
| Base | cloudflare/workflows-starter (Apache-2.0) |

**Qué es:** Procesos que se ejecutan solos cada hora/día: copias, informes, sincronizaciones, recordatorios.

**Ejemplo:** Cada noche se copian los pedidos del día a la hoja de contabilidad y se envía el total por email.

## 1. Qué le pides al cliente

- Qué hay que hacer
- Cada cuánto
- Origen y destino de los datos

**Accesos:**
- Accesos al origen y destino de los datos

Email listo para mandar:

```text
Asunto: Tu pedido «Tareas programadas en la nube»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Qué hay que hacer
- Cada cuánto
- Origen y destino de los datos

Y además (te guiamos paso a paso si no sabes cómo):
- Accesos al origen y destino de los datos

En cuanto lo tengamos, el plazo es de 5 días.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs auto-tareas-programadas` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto auto-tareas-programadas («Tareas programadas en la nube») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel B.
Base: cloudflare/workflows-starter (Apache-2.0). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Cloudflare Workflows o Cron Trigger (gratis).
Campos del cliente:
- Qué hay que hacer: <...>
- Cada cuánto: <...>
- Origen y destino de los datos: <...>
Accesos que ya me ha dado el cliente:
- Accesos al origen y destino de los datos: <sí/no>
Tiene que quedar: Proceso en Cloudflare con reintentos; Registro de ejecuciones; Aviso si algo falla.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs auto-tareas-programadas tu`.

## 3. Qué entregas

- [ ] Proceso en Cloudflare con reintentos
- [ ] Registro de ejecuciones
- [ ] Aviso si algo falla
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Tareas programadas en la nube

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Proceso en Cloudflare con reintentos
- Registro de ejecuciones
- Aviso si algo falla

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [cloudflare/workflows-starter](https://github.com/cloudflare/workflows-starter) · Apache-2.0

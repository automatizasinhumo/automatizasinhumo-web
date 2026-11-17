# Gestión de invitados y plano de mesas

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Bodas y eventos |
| Precio | Lo montas tú 79 € · Te lo montamos 179 € |
| Plazo publicado | 3 días |
| Nivel | **B · Prompt + accesos del cliente** (30–90 min de tu tiempo, casi todo esperando al cliente) |
| Dónde vive | Worker de Cloudflare + base de datos D1 (gratis hasta 5 GB) |
| Base | inonalfa/wedding-rsvp-seating (MIT, ya hecho para Cloudflare Workers + D1) |

**Qué es:** Lista de invitados, confirmaciones, llamadas pendientes y plano de mesas en PDF.

**Ejemplo:** Plano de 15 mesas generado en PDF para el restaurante a partir de las confirmaciones.

## 1. Qué le pides al cliente

- Lista de invitados
- Número de mesas y capacidad
- Restricciones (quién no con quién)

**Accesos:**
- Excel o Google Sheet con la lista de invitados

Email listo para mandar:

```text
Asunto: Tu pedido «Gestión de invitados y plano de mesas»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Lista de invitados
- Número de mesas y capacidad
- Restricciones (quién no con quién)

Y además (te guiamos paso a paso si no sabes cómo):
- Excel o Google Sheet con la lista de invitados

En cuanto lo tengamos, el plazo es de 3 días.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs gestion-invitados-mesas` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto gestion-invitados-mesas («Gestión de invitados y plano de mesas») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel B.
Base: inonalfa/wedding-rsvp-seating (MIT, ya hecho para Cloudflare Workers + D1). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Worker de Cloudflare + base de datos D1 (gratis hasta 5 GB).
Campos del cliente:
- Lista de invitados: <...>
- Número de mesas y capacidad: <...>
- Restricciones (quién no con quién): <...>
Accesos que ya me ha dado el cliente:
- Excel o Google Sheet con la lista de invitados: <sí/no>
Tiene que quedar: Panel de invitados; Seguimiento de confirmaciones; Plano de mesas imprimible; Exportación a Excel.
Ojo: El repo base está en hebreo y RTL: el prompt incluye traducir textos al español y cambiar la dirección a LTR. El plano de mesas sale en PDF desde el propio panel.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs gestion-invitados-mesas tu`.

> **Ojo:** El repo base está en hebreo y RTL: el prompt incluye traducir textos al español y cambiar la dirección a LTR. El plano de mesas sale en PDF desde el propio panel.

## 3. Qué entregas

- [ ] Panel de invitados
- [ ] Seguimiento de confirmaciones
- [ ] Plano de mesas imprimible
- [ ] Exportación a Excel
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Gestión de invitados y plano de mesas

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Panel de invitados
- Seguimiento de confirmaciones
- Plano de mesas imprimible
- Exportación a Excel

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- Demo: [Confirmación de asistencia](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-eventos/templates/rsvp-only/)
- Demo: [Lista de regalos](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-eventos/templates/registry-template/)
- [inonalfa/wedding-rsvp-seating](https://github.com/inonalfa/wedding-rsvp-seating) · MIT
- [JacobStephens2/wedding-platform](https://github.com/JacobStephens2/wedding-platform) · MIT

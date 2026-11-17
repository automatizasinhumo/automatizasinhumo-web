# Pizarra online privada para tu equipo

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Documentos, PDF e IA |
| Precio | Lo montas tú 49 € · Te lo montamos 129 € |
| Plazo publicado | 48 h |
| Nivel | **B · Prompt + accesos del cliente** (30–90 min de tu tiempo, casi todo esperando al cliente) |
| Dónde vive | Excalidraw estático en Workers |
| Base | excalidraw/excalidraw |

**Qué es:** Una pizarra colaborativa propia para esquemas, planos de local o diagramas, con tu dominio y sin cuentas de terceros.

**Ejemplo:** Reformas López dibuja con el cliente la cocina nueva en la tablet y le manda el PDF al terminar.

## 1. Qué le pides al cliente

- Subdominio deseado
- Uso principal (planos, esquemas, clases)
- Logo

**Accesos:**
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev

Email listo para mandar:

```text
Asunto: Tu pedido «Pizarra online privada para tu equipo»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Subdominio deseado
- Uso principal (planos, esquemas, clases)
- Logo

Y además (te guiamos paso a paso si no sabes cómo):
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev

En cuanto lo tengamos, el plazo es de 48 h.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs pizarra-planos` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto pizarra-planos («Pizarra online privada para tu equipo») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel B.
Base: excalidraw/excalidraw. Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Excalidraw estático en Workers.
Campos del cliente:
- Subdominio deseado: <...>
- Uso principal (planos, esquemas, clases): <...>
- Logo: <...>
Accesos que ya me ha dado el cliente:
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev: <sí/no>
Tiene que quedar: Pizarra colaborativa publicada en tu dominio; Bibliotecas de iconos para tu sector; Exportación a PNG y PDF.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs pizarra-planos tu`.

## 3. Qué entregas

- [ ] Pizarra colaborativa publicada en tu dominio
- [ ] Bibliotecas de iconos para tu sector
- [ ] Exportación a PNG y PDF
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Pizarra online privada para tu equipo

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Pizarra colaborativa publicada en tu dominio
- Bibliotecas de iconos para tu sector
- Exportación a PNG y PDF

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [excalidraw/excalidraw](https://github.com/excalidraw/excalidraw) · MIT

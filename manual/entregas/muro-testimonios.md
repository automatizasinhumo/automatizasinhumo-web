# Muro de opiniones de clientes

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Tarjetas, link-in-bio y CV |
| Precio | Lo montas tú 49 € · Te lo montamos 119 € |
| Plazo publicado | 48 h |
| Nivel | **A · Un prompt** (5–15 min de tu tiempo; se entrega el mismo día) |
| Dónde vive | Web estática en un Worker propio de Cloudflare (gratis) |
| Base | jhodges3401-code/kudoshelf-lite (demo testimonios) |

**Qué es:** Recoge opiniones con un enlace, apruébalas y muéstralas en tu web.

**Ejemplo:** Academia de inglés: tras cada curso envía el enlace y las mejores opiniones salen en su portada.

## 1. Qué le pides al cliente

- Nombre del negocio
- Preguntas para el cliente
- Web donde insertarlo

No hace falta ninguna cuenta ni acceso del cliente.

Email listo para mandar:

```text
Asunto: Tu pedido «Muro de opiniones de clientes»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Nombre del negocio
- Preguntas para el cliente
- Web donde insertarlo

En cuanto lo tengamos, el plazo es de 48 h.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs muro-testimonios` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto muro-testimonios («Muro de opiniones de clientes») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel A.
Base: jhodges3401-code/kudoshelf-lite (demo testimonios). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Web estática en un Worker propio de Cloudflare (gratis).
Campos del cliente:
- Nombre del negocio: <...>
- Preguntas para el cliente: <...>
- Web donde insertarlo: <...>
Tiene que quedar: Formulario para dejar opinión; Panel para aprobar; Muro/widget para tu web; Opiniones con foto y estrellas.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs muro-testimonios tu`.

## 3. Qué entregas

- [ ] Formulario para dejar opinión
- [ ] Panel para aprobar
- [ ] Muro/widget para tu web
- [ ] Opiniones con foto y estrellas
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Muro de opiniones de clientes

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Formulario para dejar opinión
- Panel para aprobar
- Muro/widget para tu web
- Opiniones con foto y estrellas

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- Demo: [Muro de testimonios](https://automatizasinhumo-demos.davidpd89.workers.dev/testimonios/)
- [jhodges3401-code/kudoshelf-lite](https://github.com/jhodges3401-code/kudoshelf-lite) · MIT
- [AnandSundar/Kindwords](https://github.com/AnandSundar/Kindwords) · MIT

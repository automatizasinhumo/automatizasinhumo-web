# Descripciones de producto escritas con IA y revisadas

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Contenido y redes |
| Precio | Lo montas tú 29 € · Te lo montamos 69 € |
| Plazo publicado | 48 h |
| Nivel | **A · Un prompt** (5–15 min de tu tiempo; se entrega el mismo día) |
| Dónde vive | Archivo entregado por email o enlace de descarga (sin servidor) |
| Base | plantilla propia (ningún repo base tiene licencia libre) |

**Qué es:** Títulos y descripciones de venta para tu tienda, con tus palabras clave, revisados por una persona antes de entregarlos.

**Ejemplo:** Tienda de té: «Rooibos vainilla 100 g · sin teína, para después de cenar» en lugar de «Té rojo 100g».

## 1. Qué le pides al cliente

- Catálogo (nombre y características)
- Público al que vendes
- Tono (cercano, técnico, premium)
- Palabras clave

No hace falta ninguna cuenta ni acceso del cliente.

Email listo para mandar:

```text
Asunto: Tu pedido «Descripciones de producto escritas con IA y revisadas»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Catálogo (nombre y características)
- Público al que vendes
- Tono (cercano, técnico, premium)
- Palabras clave

En cuanto lo tengamos, el plazo es de 48 h.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs descripciones-producto-ia` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto descripciones-producto-ia («Descripciones de producto escritas con IA y revisadas») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel A.
Base: plantilla propia (ningún repo base tiene licencia libre). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Archivo entregado por email o enlace de descarga (sin servidor).
Campos del cliente:
- Catálogo (nombre y características): <...>
- Público al que vendes: <...>
- Tono (cercano, técnico, premium): <...>
- Palabras clave: <...>
Tiene que quedar: 20 títulos y descripciones (ampliable); Palabras clave para Google; Archivo CSV listo para importar; Guía de tono para las siguientes.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs descripciones-producto-ia tu`.

## 3. Qué entregas

- [ ] 20 títulos y descripciones (ampliable)
- [ ] Palabras clave para Google
- [ ] Archivo CSV listo para importar
- [ ] Guía de tono para las siguientes
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Descripciones de producto escritas con IA y revisadas

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- 20 títulos y descripciones (ampliable)
- Palabras clave para Google
- Archivo CSV listo para importar
- Guía de tono para las siguientes

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias


# Tu web en inglés (u otro idioma)

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Webs para tu negocio |
| Precio | Lo montas tú 99 € · Te lo montamos 249 € |
| Plazo publicado | 4 días |
| Nivel | **B · Prompt + accesos del cliente** (30–90 min de tu tiempo, casi todo esperando al cliente) |
| Dónde vive | Copia traducida de su web en Workers |
| Base | plantilla propia (ningún repo base tiene licencia libre) |

**Qué es:** Añadimos un segundo idioma a tu web con selector, URLs propias y SEO para que te encuentren turistas y clientes de fuera.

**Ejemplo:** Restaurante en Sevilla con carta y reservas en inglés: el turista que busca «tapas Seville» llega a una web que entiende y reserva.

## 1. Qué le pides al cliente

- URL de la web
- Idioma
- Textos que no se traducen (marcas, platos…)

**Accesos:**
- Acceso a su web o al código

Email listo para mandar:

```text
Asunto: Tu pedido «Tu web en inglés (u otro idioma)»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- URL de la web
- Idioma
- Textos que no se traducen (marcas, platos…)

Y además (te guiamos paso a paso si no sabes cómo):
- Acceso a su web o al código

En cuanto lo tengamos, el plazo es de 4 días.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs web-multidioma` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto web-multidioma («Tu web en inglés (u otro idioma)») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel B.
Base: plantilla propia (ningún repo base tiene licencia libre). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Copia traducida de su web en Workers.
Campos del cliente:
- URL de la web: <...>
- Idioma: <...>
- Textos que no se traducen (marcas, platos…): <...>
Accesos que ya me ha dado el cliente:
- Acceso a su web o al código: <sí/no>
Tiene que quedar: Versión completa en el idioma elegido; Selector de idioma; Etiquetas hreflang para Google; Revisión humana de textos clave.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs web-multidioma tu`.

## 3. Qué entregas

- [ ] Versión completa en el idioma elegido
- [ ] Selector de idioma
- [ ] Etiquetas hreflang para Google
- [ ] Revisión humana de textos clave
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Tu web en inglés (u otro idioma)

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Versión completa en el idioma elegido
- Selector de idioma
- Etiquetas hreflang para Google
- Revisión humana de textos clave

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- Demo: [Hotel](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/real-estate-travel/hotel-resort/)
- Demo: [Guía turístico](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/real-estate-travel/tour-guide/)

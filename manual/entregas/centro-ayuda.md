# Centro de ayuda o manual para tus clientes

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Portales y webs editables |
| Precio | Lo montas tú 149 € · Te lo montamos 349 € |
| Plazo publicado | 4 días |
| Nivel | **B · Prompt + accesos del cliente** (30–90 min de tu tiempo, casi todo esperando al cliente) |
| Dónde vive | Starlight (Astro) estático en Workers |
| Base | withastro/starlight |

**Qué es:** Una web de ayuda con buscador para que tus clientes resuelvan dudas solos: guías, preguntas frecuentes y tutoriales.

**Ejemplo:** Software de reservas para gimnasios: «Cómo cancelar una clase», «Cómo cambiar la tarifa»… y bajan los emails de soporte.

## 1. Qué le pides al cliente

- Nombre del producto o servicio
- Temas y preguntas
- Capturas o vídeos
- Logo y colores

**Accesos:**
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev

Email listo para mandar:

```text
Asunto: Tu pedido «Centro de ayuda o manual para tus clientes»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Nombre del producto o servicio
- Temas y preguntas
- Capturas o vídeos
- Logo y colores

Y además (te guiamos paso a paso si no sabes cómo):
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev

En cuanto lo tengamos, el plazo es de 4 días.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs centro-ayuda` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto centro-ayuda («Centro de ayuda o manual para tus clientes») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel B.
Base: withastro/starlight. Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Starlight (Astro) estático en Workers.
Campos del cliente:
- Nombre del producto o servicio: <...>
- Temas y preguntas: <...>
- Capturas o vídeos: <...>
- Logo y colores: <...>
Accesos que ya me ha dado el cliente:
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev: <sí/no>
Tiene que quedar: Web de documentación con buscador; Menú lateral por temas; Modo claro/oscuro y versión móvil; Fácil de ampliar escribiendo textos.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs centro-ayuda tu`.

## 3. Qué entregas

- [ ] Web de documentación con buscador
- [ ] Menú lateral por temas
- [ ] Modo claro/oscuro y versión móvil
- [ ] Fácil de ampliar escribiendo textos
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Centro de ayuda o manual para tus clientes

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Web de documentación con buscador
- Menú lateral por temas
- Modo claro/oscuro y versión móvil
- Fácil de ampliar escribiendo textos

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [withastro/starlight](https://github.com/withastro/starlight) · MIT

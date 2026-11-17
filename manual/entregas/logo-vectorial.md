# Tu logo en vectorial y en todos los tamaños

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Tarjetas, link-in-bio y CV |
| Precio | Lo montas tú 19 € · Te lo montamos 49 € |
| Plazo publicado | 48 h |
| Nivel | **A · Un prompt** (5–15 min de tu tiempo; se entrega el mismo día) |
| Dónde vive | Archivo entregado por email o enlace de descarga (sin servidor) |
| Base | svg/svgo (MIT) |

**Qué es:** Tu logo limpio en SVG y en todos los formatos que te pedirán: web, redes, favicon, imprenta y fondo oscuro.

**Ejemplo:** Peluquería con el logo solo en una foto del cartel: recibe el SVG, el favicon y la versión blanca para Instagram.

## 1. Qué le pides al cliente

- Logo actual (el mejor archivo que tengas)
- Colores corporativos
- Dónde lo vas a usar

No hace falta ninguna cuenta ni acceso del cliente.

Email listo para mandar:

```text
Asunto: Tu pedido «Tu logo en vectorial y en todos los tamaños»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Logo actual (el mejor archivo que tengas)
- Colores corporativos
- Dónde lo vas a usar

En cuanto lo tengamos, el plazo es de 48 h.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs logo-vectorial` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto logo-vectorial («Tu logo en vectorial y en todos los tamaños») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel A.
Base: svg/svgo (MIT). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Archivo entregado por email o enlace de descarga (sin servidor).
Campos del cliente:
- Logo actual (el mejor archivo que tengas): <...>
- Colores corporativos: <...>
- Dónde lo vas a usar: <...>
Tiene que quedar: SVG optimizado; PNG en 6 tamaños; Favicon e icono de app; Versión en blanco para fondos oscuros.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs logo-vectorial tu`.

## 3. Qué entregas

- [ ] SVG optimizado
- [ ] PNG en 6 tamaños
- [ ] Favicon e icono de app
- [ ] Versión en blanco para fondos oscuros
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Tu logo en vectorial y en todos los tamaños

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- SVG optimizado
- PNG en 6 tamaños
- Favicon e icono de app
- Versión en blanco para fondos oscuros

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [svg/svgo](https://github.com/svg/svgo) · MIT

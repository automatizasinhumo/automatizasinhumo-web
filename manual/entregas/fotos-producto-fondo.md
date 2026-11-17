# Fotos de producto con fondo blanco automático

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Tiendas y productos digitales |
| Precio | Lo montas tú 29 € · Te lo montamos 79 € |
| Plazo publicado | 24 h |
| Nivel | **A · Un prompt** (5–15 min de tu tiempo; se entrega el mismo día) |
| Dónde vive | Archivo entregado por email o enlace de descarga (sin servidor) |
| Base | danielgatis/rembg (MIT) |

**Qué es:** Subes las fotos hechas con el móvil y te devolvemos las imágenes recortadas, con fondo blanco y tamaño para tu tienda.

**Ejemplo:** Tienda de cerámica: 36 fotos hechas en la mesa de la cocina, listas para la web en una tarde.

## 1. Qué le pides al cliente

- Fotos (carpeta o zip)
- Color de fondo
- Medidas que necesitas

No hace falta ninguna cuenta ni acceso del cliente.

Email listo para mandar:

```text
Asunto: Tu pedido «Fotos de producto con fondo blanco automático»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Fotos (carpeta o zip)
- Color de fondo
- Medidas que necesitas

En cuanto lo tengamos, el plazo es de 24 h.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs fotos-producto-fondo` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto fotos-producto-fondo («Fotos de producto con fondo blanco automático») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel A.
Base: danielgatis/rembg (MIT). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Archivo entregado por email o enlace de descarga (sin servidor).
Campos del cliente:
- Fotos (carpeta o zip): <...>
- Color de fondo: <...>
- Medidas que necesitas: <...>
Tiene que quedar: Hasta 50 fotos recortadas (ampliable); Fondo blanco o de color; Tamaños para web, Amazon e Instagram; Carpeta compartida para nuevas tandas.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs fotos-producto-fondo tu`.

## 3. Qué entregas

- [ ] Hasta 50 fotos recortadas (ampliable)
- [ ] Fondo blanco o de color
- [ ] Tamaños para web, Amazon e Instagram
- [ ] Carpeta compartida para nuevas tandas
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Fotos de producto con fondo blanco automático

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Hasta 50 fotos recortadas (ampliable)
- Fondo blanco o de color
- Tamaños para web, Amazon e Instagram
- Carpeta compartida para nuevas tandas

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [danielgatis/rembg](https://github.com/danielgatis/rembg) · MIT

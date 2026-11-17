# Optimización de imágenes para tu web

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Webs para tu negocio |
| Precio | Lo montas tú 14 € · Te lo montamos 39 € |
| Plazo publicado | 24 h |
| Nivel | **A · Un prompt** (5–15 min de tu tiempo; se entrega el mismo día) |
| Dónde vive | Archivo entregado por email o enlace de descarga (sin servidor) |
| Base | lovell/sharp (Apache-2.0) |

**Qué es:** Tus fotos pesadas, convertidas a WebP o AVIF con el tamaño justo: la web carga más rápido sin perder calidad visible.

**Ejemplo:** Casa rural: 60 fotos de 5 MB sacadas con la cámara, convertidas a WebP de 1600 px listas para la galería.

## 1. Qué le pides al cliente

- Imágenes (carpeta o zip)
- Formato deseado
- Ancho máximo
- Calidad (alta / equilibrada)

No hace falta ninguna cuenta ni acceso del cliente.

Email listo para mandar:

```text
Asunto: Tu pedido «Optimización de imágenes para tu web»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Imágenes (carpeta o zip)
- Formato deseado
- Ancho máximo
- Calidad (alta / equilibrada)

En cuanto lo tengamos, el plazo es de 24 h.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs optimizar-imagenes` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto optimizar-imagenes («Optimización de imágenes para tu web») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel A.
Base: lovell/sharp (Apache-2.0). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Archivo entregado por email o enlace de descarga (sin servidor).
Campos del cliente:
- Imágenes (carpeta o zip): <...>
- Formato deseado: <...>
- Ancho máximo: <...>
- Calidad (alta / equilibrada): <...>
Tiene que quedar: Hasta 100 imágenes optimizadas; Formato WebP o AVIF + copia JPG; Nombres de archivo amigables para SEO; Informe de peso antes / después.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs optimizar-imagenes tu`.

## 3. Qué entregas

- [ ] Hasta 100 imágenes optimizadas
- [ ] Formato WebP o AVIF + copia JPG
- [ ] Nombres de archivo amigables para SEO
- [ ] Informe de peso antes / después
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Optimización de imágenes para tu web

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Hasta 100 imágenes optimizadas
- Formato WebP o AVIF + copia JPG
- Nombres de archivo amigables para SEO
- Informe de peso antes / después

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [lovell/sharp](https://github.com/lovell/sharp) · Apache-2.0

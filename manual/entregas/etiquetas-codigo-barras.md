# Etiquetas con código de barras listas para imprimir

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Tiendas y productos digitales |
| Precio | Lo montas tú 19 € · Te lo montamos 49 € |
| Plazo publicado | 24 h |
| Nivel | **A · Un prompt** (5–15 min de tu tiempo; se entrega el mismo día) |
| Dónde vive | Archivo entregado por email o enlace de descarga (sin servidor) |
| Base | lindell/JsBarcode (MIT) |

**Qué es:** Nos pasas tu lista de productos y recibes un PDF con las etiquetas (código de barras, nombre y precio) al tamaño de tu papel.

**Ejemplo:** Artesana de jabones: 40 referencias con código, nombre y PVP en hojas A4 de 24 etiquetas.

## 1. Qué le pides al cliente

- Lista de referencias (Excel o CSV)
- Nombre y precio de cada producto
- Tamaño de etiqueta / hoja
- Unidades por referencia

No hace falta ninguna cuenta ni acceso del cliente.

Email listo para mandar:

```text
Asunto: Tu pedido «Etiquetas con código de barras listas para imprimir»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Lista de referencias (Excel o CSV)
- Nombre y precio de cada producto
- Tamaño de etiqueta / hoja
- Unidades por referencia

En cuanto lo tengamos, el plazo es de 24 h.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs etiquetas-codigo-barras` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto etiquetas-codigo-barras («Etiquetas con código de barras listas para imprimir») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel A.
Base: lindell/JsBarcode (MIT). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Archivo entregado por email o enlace de descarga (sin servidor).
Campos del cliente:
- Lista de referencias (Excel o CSV): <...>
- Nombre y precio de cada producto: <...>
- Tamaño de etiqueta / hoja: <...>
- Unidades por referencia: <...>
Tiene que quedar: PDF con hasta 100 etiquetas (ampliable); Códigos CODE128 o EAN-13; Tamaño adaptado a tu hoja o impresora; Plantilla para volver a generarlas tú.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs etiquetas-codigo-barras tu`.

## 3. Qué entregas

- [ ] PDF con hasta 100 etiquetas (ampliable)
- [ ] Códigos CODE128 o EAN-13
- [ ] Tamaño adaptado a tu hoja o impresora
- [ ] Plantilla para volver a generarlas tú
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Etiquetas con código de barras listas para imprimir

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- PDF con hasta 100 etiquetas (ampliable)
- Códigos CODE128 o EAN-13
- Tamaño adaptado a tu hoja o impresora
- Plantilla para volver a generarlas tú

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [lindell/JsBarcode](https://github.com/lindell/JsBarcode) · MIT
- [Hopding/pdf-lib](https://github.com/Hopding/pdf-lib) · MIT

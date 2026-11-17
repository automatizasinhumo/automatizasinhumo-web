# Plantilla de inventario a medida en Excel

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Documentos, PDF e IA |
| Precio | Lo montas tú 29 € · Te lo montamos 69 € |
| Plazo publicado | 48 h |
| Nivel | **A · Un prompt** (5–15 min de tu tiempo; se entrega el mismo día) |
| Dónde vive | Archivo entregado por email o enlace de descarga (sin servidor) |
| Base | exceljs/exceljs (MIT) |

**Qué es:** Un Excel con tus productos y categorías que avisa en rojo cuando algo baja del mínimo y calcula lo que vale tu stock.

**Ejemplo:** Bar de barrio: la hoja marca en rojo «tónica: quedan 6» antes de hacer el pedido del lunes.

## 1. Qué le pides al cliente

- Categorías
- Lista de productos
- Stock mínimo de cada uno
- Coste y precio de venta

No hace falta ninguna cuenta ni acceso del cliente.

Email listo para mandar:

```text
Asunto: Tu pedido «Plantilla de inventario a medida en Excel»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Categorías
- Lista de productos
- Stock mínimo de cada uno
- Coste y precio de venta

En cuanto lo tengamos, el plazo es de 48 h.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs plantilla-inventario` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto plantilla-inventario («Plantilla de inventario a medida en Excel») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel A.
Base: exceljs/exceljs (MIT). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Archivo entregado por email o enlace de descarga (sin servidor).
Campos del cliente:
- Categorías: <...>
- Lista de productos: <...>
- Stock mínimo de cada uno: <...>
- Coste y precio de venta: <...>
Tiene que quedar: Excel con tus productos y categorías; Alertas de stock mínimo; Valoración del inventario; Hoja de entradas y salidas.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs plantilla-inventario tu`.

## 3. Qué entregas

- [ ] Excel con tus productos y categorías
- [ ] Alertas de stock mínimo
- [ ] Valoración del inventario
- [ ] Hoja de entradas y salidas
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Plantilla de inventario a medida en Excel

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Excel con tus productos y categorías
- Alertas de stock mínimo
- Valoración del inventario
- Hoja de entradas y salidas

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [exceljs/exceljs](https://github.com/exceljs/exceljs) · MIT

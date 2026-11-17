# Informe con gráficos a partir de tu Excel

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Documentos, PDF e IA |
| Precio | Lo montas tú 29 € · Te lo montamos 79 € |
| Plazo publicado | 48 h |
| Nivel | **A · Un prompt** (5–15 min de tu tiempo; se entrega el mismo día) |
| Dónde vive | Archivo entregado por email o enlace de descarga (sin servidor) |
| Base | chartjs/Chart.js (MIT) |

**Qué es:** Nos mandas tus datos de ventas, socios o visitas y recibes un PDF claro con gráficos listo para presentar.

**Ejemplo:** Asociación de vecinos: informe anual de cuotas y actividades para la asamblea, con logo y 6 gráficos.

## 1. Qué le pides al cliente

- Archivo de datos
- Qué quieres medir
- Periodo
- Logo y colores

No hace falta ninguna cuenta ni acceso del cliente.

Email listo para mandar:

```text
Asunto: Tu pedido «Informe con gráficos a partir de tu Excel»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Archivo de datos
- Qué quieres medir
- Periodo
- Logo y colores

En cuanto lo tengamos, el plazo es de 48 h.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs informe-graficos` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto informe-graficos («Informe con gráficos a partir de tu Excel») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel A.
Base: chartjs/Chart.js (MIT). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Archivo entregado por email o enlace de descarga (sin servidor).
Campos del cliente:
- Archivo de datos: <...>
- Qué quieres medir: <...>
- Periodo: <...>
- Logo y colores: <...>
Tiene que quedar: PDF con hasta 10 gráficos; Resumen en una página; Plantilla para repetirlo cada mes.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs informe-graficos tu`.

## 3. Qué entregas

- [ ] PDF con hasta 10 gráficos
- [ ] Resumen en una página
- [ ] Plantilla para repetirlo cada mes
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Informe con gráficos a partir de tu Excel

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- PDF con hasta 10 gráficos
- Resumen en una página
- Plantilla para repetirlo cada mes

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [chartjs/Chart.js](https://github.com/chartjs/Chart.js) · MIT
- [Hopding/pdf-lib](https://github.com/Hopding/pdf-lib) · MIT

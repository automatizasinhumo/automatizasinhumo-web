# Pack de códigos QR para campañas

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Enlaces, QR y analítica |
| Precio | Lo montas tú 19 € · Te lo montamos 49 € |
| Plazo publicado | 24 h |
| Nivel | **A · Un prompt** (5–15 min de tu tiempo; se entrega el mismo día) |
| Dónde vive | Archivo entregado por email o enlace de descarga (sin servidor) |
| Base | investblog/qr-generator |

**Qué es:** QR en vector listos para imprenta, con enlace editable y medición.

**Ejemplo:** QR en escaparate, carta y tarjetas, cada uno medido por separado.

## 1. Qué le pides al cliente

- Destinos de cada QR
- Colores / logo

No hace falta ninguna cuenta ni acceso del cliente.

Email listo para mandar:

```text
Asunto: Tu pedido «Pack de códigos QR para campañas»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Destinos de cada QR
- Colores / logo

En cuanto lo tengamos, el plazo es de 24 h.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs qr-campanas` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto qr-campanas («Pack de códigos QR para campañas») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel A.
Base: investblog/qr-generator. Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Archivo entregado por email o enlace de descarga (sin servidor).
Campos del cliente:
- Destinos de cada QR: <...>
- Colores / logo: <...>
Tiene que quedar: Hasta 10 QR en SVG/PNG; Enlaces editables después de imprimir; Medición de escaneos.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs qr-campanas tu`.

## 3. Qué entregas

- [ ] Hasta 10 QR en SVG/PNG
- [ ] Enlaces editables después de imprimir
- [ ] Medición de escaneos
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Pack de códigos QR para campañas

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Hasta 10 QR en SVG/PNG
- Enlaces editables después de imprimir
- Medición de escaneos

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [investblog/qr-generator](https://github.com/investblog/qr-generator) · MIT

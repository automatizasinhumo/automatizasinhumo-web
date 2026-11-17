# Limpieza de listados de clientes y productos

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Documentos, PDF e IA |
| Precio | Lo montas tú 29 € · Te lo montamos 69 € |
| Plazo publicado | 48 h |
| Nivel | **A · Un prompt** (5–15 min de tu tiempo; se entrega el mismo día) |
| Dónde vive | Archivo entregado por email o enlace de descarga (sin servidor) |
| Base | mholt/PapaParse (MIT) |

**Qué es:** Ese Excel lleno de duplicados, mayúsculas mezcladas y teléfonos con formatos distintos, ordenado y listo para importar.

**Ejemplo:** Autoescuela: 3 hojas de alumnos de distintos años unidas en una sola, sin repetidos, lista para el email de bienvenida.

## 1. Qué le pides al cliente

- Archivo (Excel o CSV)
- Columna que identifica cada registro
- Columnas que quieres conservar
- Programa al que lo vas a importar

No hace falta ninguna cuenta ni acceso del cliente.

Email listo para mandar:

```text
Asunto: Tu pedido «Limpieza de listados de clientes y productos»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Archivo (Excel o CSV)
- Columna que identifica cada registro
- Columnas que quieres conservar
- Programa al que lo vas a importar

En cuanto lo tengamos, el plazo es de 48 h.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs limpieza-csv` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto limpieza-csv («Limpieza de listados de clientes y productos») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel A.
Base: mholt/PapaParse (MIT). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Archivo entregado por email o enlace de descarga (sin servidor).
Campos del cliente:
- Archivo (Excel o CSV): <...>
- Columna que identifica cada registro: <...>
- Columnas que quieres conservar: <...>
- Programa al que lo vas a importar: <...>
Tiene que quedar: Archivo limpio sin duplicados exactos; Columnas unificadas (nombres, teléfonos, emails); Informe de lo que se ha corregido; Formato listo para tu CRM o tienda.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs limpieza-csv tu`.

## 3. Qué entregas

- [ ] Archivo limpio sin duplicados exactos
- [ ] Columnas unificadas (nombres, teléfonos, emails)
- [ ] Informe de lo que se ha corregido
- [ ] Formato listo para tu CRM o tienda
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Limpieza de listados de clientes y productos

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Archivo limpio sin duplicados exactos
- Columnas unificadas (nombres, teléfonos, emails)
- Informe de lo que se ha corregido
- Formato listo para tu CRM o tienda

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [mholt/PapaParse](https://github.com/mholt/PapaParse) · MIT

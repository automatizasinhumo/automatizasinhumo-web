# Dossier comercial en PDF con tu marca

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Documentos, PDF e IA |
| Precio | Lo montas tú 39 € · Te lo montamos 99 € |
| Plazo publicado | 3 días |
| Nivel | **A · Un prompt** (5–15 min de tu tiempo; se entrega el mismo día) |
| Dónde vive | Archivo entregado por email o enlace de descarga (sin servidor) |
| Base | Hopding/pdf-lib (MIT) |

**Qué es:** Un PDF de 4 páginas para mandar por email o WhatsApp: quién eres, qué ofreces, por qué tú y cómo contratarte.

**Ejemplo:** Fotógrafo de bodas: dossier con 3 packs, fotos de muestra y botón de WhatsApp para pedir fecha.

## 1. Qué le pides al cliente

- Nombre comercial y logo
- Servicios y precios
- Por qué elegirte (3 razones)
- Datos de contacto

No hace falta ninguna cuenta ni acceso del cliente.

Email listo para mandar:

```text
Asunto: Tu pedido «Dossier comercial en PDF con tu marca»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Nombre comercial y logo
- Servicios y precios
- Por qué elegirte (3 razones)
- Datos de contacto

En cuanto lo tengamos, el plazo es de 3 días.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs dossier-comercial` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto dossier-comercial («Dossier comercial en PDF con tu marca») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel A.
Base: Hopding/pdf-lib (MIT). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Archivo entregado por email o enlace de descarga (sin servidor).
Campos del cliente:
- Nombre comercial y logo: <...>
- Servicios y precios: <...>
- Por qué elegirte (3 razones): <...>
- Datos de contacto: <...>
Tiene que quedar: PDF de 4 páginas con tu marca; Versión ligera para WhatsApp; Archivo editable para actualizar precios.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs dossier-comercial tu`.

## 3. Qué entregas

- [ ] PDF de 4 páginas con tu marca
- [ ] Versión ligera para WhatsApp
- [ ] Archivo editable para actualizar precios
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Dossier comercial en PDF con tu marca

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- PDF de 4 páginas con tu marca
- Versión ligera para WhatsApp
- Archivo editable para actualizar precios

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [Hopding/pdf-lib](https://github.com/Hopding/pdf-lib) · MIT

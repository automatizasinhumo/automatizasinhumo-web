# Galería privada de fotos del evento

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Bodas y eventos |
| Precio | Lo montas tú 69 € · Te lo montamos 149 € |
| Plazo publicado | 48 h |
| Nivel | **A · Un prompt** (5–15 min de tu tiempo; se entrega el mismo día) |
| Dónde vive | Galería estática con contraseña en un Worker; las fotos de invitados se suben a una carpeta de Google Drive del cliente |
| Base | t0ma5/tinygallery (MIT) |

**Qué es:** Álbum privado con enlace: los invitados ven y suben sus fotos, tú las descargas todas.

**Ejemplo:** Tras la boda, 300 fotos de invitados reunidas en un solo álbum privado.

## 1. Qué le pides al cliente

- Nombre del evento
- Fotos iniciales
- Contraseña o enlace privado

**Accesos:**
- Carpeta compartida (Drive) donde subir fotos

Email listo para mandar:

```text
Asunto: Tu pedido «Galería privada de fotos del evento»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Nombre del evento
- Fotos iniciales
- Contraseña o enlace privado

Y además (te guiamos paso a paso si no sabes cómo):
- Carpeta compartida (Drive) donde subir fotos

En cuanto lo tengamos, el plazo es de 48 h.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs galeria-privada-evento` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto galeria-privada-evento («Galería privada de fotos del evento») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel A.
Base: t0ma5/tinygallery (MIT). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Galería estática con contraseña en un Worker; las fotos de invitados se suben a una carpeta de Google Drive del cliente.
Campos del cliente:
- Nombre del evento: <...>
- Fotos iniciales: <...>
- Contraseña o enlace privado: <...>
Accesos que ya me ha dado el cliente:
- Carpeta compartida (Drive) donde subir fotos: <sí/no>
Tiene que quedar: Galería privada con enlace; Subida de fotos de invitados; Favoritas y descarga; Panel de administración.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs galeria-privada-evento tu`.

## 3. Qué entregas

- [ ] Galería privada con enlace
- [ ] Subida de fotos de invitados
- [ ] Favoritas y descarga
- [ ] Panel de administración
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Galería privada de fotos del evento

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Galería privada con enlace
- Subida de fotos de invitados
- Favoritas y descarga
- Panel de administración

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- Demo: [Galería de fotógrafo](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/portfolio/photographer-portfolio/)
- [t0ma5/tinygallery](https://github.com/t0ma5/tinygallery) · MIT
- [BartekBis/wedding-website](https://github.com/BartekBis/wedding-website) · NONE

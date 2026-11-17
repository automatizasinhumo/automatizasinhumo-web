# Tarjeta de visita digital con QR

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Tarjetas, link-in-bio y CV |
| Precio | Lo montas tú 29 € · Te lo montamos 69 € |
| Plazo publicado | 24 h |
| Nivel | **A · Un prompt** (5–15 min de tu tiempo; se entrega el mismo día) |
| Dónde vive | Web estática en un Worker propio de Cloudflare (gratis) |
| Base | plantilla propia (vCard + QR con investblog/qr-generator) |

**Qué es:** Tu tarjeta en el móvil: un QR y el cliente guarda tu contacto con un toque.

**Ejemplo:** Javier, comercial: enseña el QR en una feria y el contacto queda guardado en el móvil del cliente.

## 1. Qué le pides al cliente

- Nombre y cargo
- Foto
- Teléfono, email y web
- Redes sociales

No hace falta ninguna cuenta ni acceso del cliente.

Email listo para mandar:

```text
Asunto: Tu pedido «Tarjeta de visita digital con QR»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Nombre y cargo
- Foto
- Teléfono, email y web
- Redes sociales

En cuanto lo tengamos, el plazo es de 24 h.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs tarjeta-digital` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto tarjeta-digital («Tarjeta de visita digital con QR») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel A.
Base: plantilla propia (vCard + QR con investblog/qr-generator). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Web estática en un Worker propio de Cloudflare (gratis).
Campos del cliente:
- Nombre y cargo: <...>
- Foto: <...>
- Teléfono, email y web: <...>
- Redes sociales: <...>
Tiene que quedar: Tarjeta web personal; Botón «Guardar contacto» (vCard); QR para imprimir; Enlaces a redes y WhatsApp.
Ojo: No usar Kahaan83/digital-cards: está excluido.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs tarjeta-digital tu`.

> **Ojo:** No usar Kahaan83/digital-cards: está excluido.

## 3. Qué entregas

- [ ] Tarjeta web personal
- [ ] Botón «Guardar contacto» (vCard)
- [ ] QR para imprimir
- [ ] Enlaces a redes y WhatsApp
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Tarjeta de visita digital con QR

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Tarjeta web personal
- Botón «Guardar contacto» (vCard)
- QR para imprimir
- Enlaces a redes y WhatsApp

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [Kahaan83/digital-cards](https://github.com/Kahaan83/digital-cards) · EXCLUIDO, no usar

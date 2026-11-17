# Carta digital con código QR

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Restaurantes y bares |
| Precio | Lo montas tú 49 € · Te lo montamos 129 € |
| Plazo publicado | 24 h |
| Nivel | **A · Un prompt** (5–15 min de tu tiempo; se entrega el mismo día) |
| Dónde vive | Web estática en un Worker propio de Cloudflare (gratis) |
| Base | demo carta-whatsapp sin carrito, o plantillas-negocio/restaurant |

**Qué es:** Tu carta en el móvil del cliente con un QR en la mesa. Cambias precios cuando quieras, sin reimprimir.

**Ejemplo:** Bar La Esquina: QR en cada mesa → carta con tapas, raciones y bebidas, en español e inglés.

## 1. Qué le pides al cliente

- Nombre del local
- Platos (nombre, precio, alérgenos)
- Fotos (opcional)
- Idiomas

No hace falta ninguna cuenta ni acceso del cliente.

Email listo para mandar:

```text
Asunto: Tu pedido «Carta digital con código QR»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Nombre del local
- Platos (nombre, precio, alérgenos)
- Fotos (opcional)
- Idiomas

En cuanto lo tengamos, el plazo es de 24 h.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs carta-qr` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto carta-qr («Carta digital con código QR») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel A.
Base: demo carta-whatsapp sin carrito, o plantillas-negocio/restaurant. Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Web estática en un Worker propio de Cloudflare (gratis).
Campos del cliente:
- Nombre del local: <...>
- Platos (nombre, precio, alérgenos): <...>
- Fotos (opcional): <...>
- Idiomas: <...>
Tiene que quedar: Carta digital por secciones; QR listo para imprimir; Alérgenos e idiomas; Cambios ilimitados de precios.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs carta-qr tu`.

## 3. Qué entregas

- [ ] Carta digital por secciones
- [ ] QR listo para imprimir
- [ ] Alérgenos e idiomas
- [ ] Cambios ilimitados de precios
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Carta digital con código QR

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Carta digital por secciones
- QR listo para imprimir
- Alérgenos e idiomas
- Cambios ilimitados de precios

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- Demo: [Carta QR con pedido por WhatsApp](https://automatizasinhumo-demos.davidpd89.workers.dev/carta-whatsapp/)
- Demo: [Restaurante](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/restaurant/restaurant/)
- Demo: [Cafetería](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/restaurant/cafe-coffee-shop/)
- Demo: [Bar de copas](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/restaurant/bar-lounge/)
- [dumbuk12/qr-menu-guide](https://github.com/dumbuk12/qr-menu-guide) · MIT
- [investblog/qr-generator](https://github.com/investblog/qr-generator) · MIT
- [kirollosfayezh/tabla-qr-menu-saas](https://github.com/kirollosfayezh/tabla-qr-menu-saas) · MIT

# Tienda de productos digitales

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Tiendas y productos digitales |
| Precio | Lo montas tú 299 € · Te lo montamos 599 € |
| Plazo publicado | 5 días |
| Nivel | **B · Prompt + accesos del cliente** (30–90 min de tu tiempo, casi todo esperando al cliente) |
| Dónde vive | Minshop (esta misma tienda) en Workers + D1 |
| Base | ddyy/minshop |

**Qué es:** Vende ebooks, plantillas, cursos o presets: el cliente paga y descarga al momento.

**Ejemplo:** Diseñadora vende packs de plantillas de Canva a 9 € con descarga instantánea.

## 1. Qué le pides al cliente

- Productos y precios
- Archivos a entregar
- Cuenta de cobro (Stripe)

**Accesos:**
- Cuenta de Stripe del cliente (la conecta él desde el panel)
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev

Email listo para mandar:

```text
Asunto: Tu pedido «Tienda de productos digitales»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Productos y precios
- Archivos a entregar
- Cuenta de cobro (Stripe)

Y además (te guiamos paso a paso si no sabes cómo):
- Cuenta de Stripe del cliente (la conecta él desde el panel)
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev

En cuanto lo tengamos, el plazo es de 5 días.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs tienda-productos-digitales` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto tienda-productos-digitales («Tienda de productos digitales») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel B.
Base: ddyy/minshop. Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Minshop (esta misma tienda) en Workers + D1.
Campos del cliente:
- Productos y precios: <...>
- Archivos a entregar: <...>
- Cuenta de cobro (Stripe): <...>
Accesos que ya me ha dado el cliente:
- Cuenta de Stripe del cliente (la conecta él desde el panel): <sí/no>
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev: <sí/no>
Tiene que quedar: Tienda con pago online; Entrega automática del archivo; Panel de pedidos; Emails de compra.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs tienda-productos-digitales tu`.

## 3. Qué entregas

- [ ] Tienda con pago online
- [ ] Entrega automática del archivo
- [ ] Panel de pedidos
- [ ] Emails de compra
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Tienda de productos digitales

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Tienda con pago online
- Entrega automática del archivo
- Panel de pedidos
- Emails de compra

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- Demo: [Tienda de descargas digitales](https://automatizasinhumo-demos.davidpd89.workers.dev/tienda-descargas/)
- Demo: [Descarga de ebook](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/landing-pages/ebook-download/)
- [ddyy/minshop](https://github.com/ddyy/minshop) · ¿?
- [Vojislav77/digital-downloads-website](https://github.com/Vojislav77/digital-downloads-website) · MIT
- [fengyiqicoder/astro-ai-shop](https://github.com/fengyiqicoder/astro-ai-shop) · MIT
- [Paymug/paymug](https://github.com/Paymug/paymug) · NOASSERTION

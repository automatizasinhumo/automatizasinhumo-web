# Tienda online completa

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Tiendas y productos digitales |
| Precio | Lo montas tú 499 € · Te lo montamos 999 € |
| Plazo publicado | 7 días |
| Nivel | **C · Proyecto por fases** (1–3 días de trabajo) |
| Dónde vive | Minshop (esta misma tienda) en Workers + D1 |
| Base | ddyy/minshop |

**Qué es:** Catálogo, variantes, carrito, pagos, envíos y panel de pedidos. Sin comisiones de plataforma.

**Ejemplo:** Tienda de cerámica artesana con 40 productos, envío a península y aviso de cada venta.

## 1. Qué le pides al cliente

- Productos, variantes y fotos
- Tarifas de envío
- Datos legales
- Cuenta de cobro

**Accesos:**
- Cuenta de Stripe del cliente (la conecta él desde el panel)
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev
- Datos legales del cliente

Email listo para mandar:

```text
Asunto: Tu pedido «Tienda online completa»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Productos, variantes y fotos
- Tarifas de envío
- Datos legales
- Cuenta de cobro

Y además (te guiamos paso a paso si no sabes cómo):
- Cuenta de Stripe del cliente (la conecta él desde el panel)
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev
- Datos legales del cliente

En cuanto lo tengamos, el plazo es de 7 días.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs tienda-online` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto tienda-online («Tienda online completa») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel C.
Base: ddyy/minshop. Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Minshop (esta misma tienda) en Workers + D1.
Campos del cliente:
- Productos, variantes y fotos: <...>
- Tarifas de envío: <...>
- Datos legales: <...>
- Cuenta de cobro: <...>
Accesos que ya me ha dado el cliente:
- Cuenta de Stripe del cliente (la conecta él desde el panel): <sí/no>
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev: <sí/no>
- Datos legales del cliente: <sí/no>
Tiene que quedar: Tienda con tu marca; Pagos con tarjeta; Gestión de stock y envíos; Panel de administración.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Haz primero un plan de entrega por fases (máx. 3) y entrega la fase 1 funcionando.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs tienda-online tu`.

## 3. Qué entregas

- [ ] Tienda con tu marca
- [ ] Pagos con tarjeta
- [ ] Gestión de stock y envíos
- [ ] Panel de administración
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Tienda online completa

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Tienda con tu marca
- Pagos con tarjeta
- Gestión de stock y envíos
- Panel de administración

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- Demo: [Tienda de moda](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/ecommerce/fashion-store/)
- Demo: [Cosmética](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/ecommerce/cosmetics-skincare-store/)
- Demo: [Tienda de un producto](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/ecommerce/single-product-store/)
- [ddyy/minshop](https://github.com/ddyy/minshop) · ¿?
- [russellkmoore/mercora](https://github.com/russellkmoore/mercora) · MIT

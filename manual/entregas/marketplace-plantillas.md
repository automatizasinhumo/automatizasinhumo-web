# Marketplace de productos digitales

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Tiendas y productos digitales |
| Precio | Lo montas tú 699 € · Te lo montamos 1299 € |
| Plazo publicado | 10 días |
| Nivel | **C · Proyecto por fases** (1–3 días de trabajo) |
| Dónde vive | Workers + D1 |
| Base | Kylelau339/digital-sales-platform (MIT) |

**Qué es:** Plataforma donde varios creadores venden plantillas, presets o cursos y tú cobras comisión.

**Ejemplo:** Marketplace de plantillas de Notion para estudiantes con 15 creadores.

## 1. Qué le pides al cliente

- Nombre y nicho
- Comisión
- Categorías
- Primeros vendedores

**Accesos:**
- Cuenta de Stripe del cliente (la conecta él desde el panel)
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev

Email listo para mandar:

```text
Asunto: Tu pedido «Marketplace de productos digitales»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Nombre y nicho
- Comisión
- Categorías
- Primeros vendedores

Y además (te guiamos paso a paso si no sabes cómo):
- Cuenta de Stripe del cliente (la conecta él desde el panel)
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev

En cuanto lo tengamos, el plazo es de 10 días.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs marketplace-plantillas` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto marketplace-plantillas («Marketplace de productos digitales») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel C.
Base: Kylelau339/digital-sales-platform (MIT). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Workers + D1.
Campos del cliente:
- Nombre y nicho: <...>
- Comisión: <...>
- Categorías: <...>
- Primeros vendedores: <...>
Accesos que ya me ha dado el cliente:
- Cuenta de Stripe del cliente (la conecta él desde el panel): <sí/no>
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev: <sí/no>
Tiene que quedar: Marketplace multivendedor; Previsualizaciones; Pagos y descargas protegidas; Panel de vendedores.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Haz primero un plan de entrega por fases (máx. 3) y entrega la fase 1 funcionando.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs marketplace-plantillas tu`.

## 3. Qué entregas

- [ ] Marketplace multivendedor
- [ ] Previsualizaciones
- [ ] Pagos y descargas protegidas
- [ ] Panel de vendedores
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Marketplace de productos digitales

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Marketplace multivendedor
- Previsualizaciones
- Pagos y descargas protegidas
- Panel de vendedores

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [Kylelau339/digital-sales-platform](https://github.com/Kylelau339/digital-sales-platform) · MIT
- [w4seemdev/Templix](https://github.com/w4seemdev/Templix) · NOASSERTION
- [playlikeboy/scriptly.store](https://github.com/playlikeboy/scriptly.store) · NONE
- [vignesh-gupta/digibee-marketplace](https://github.com/vignesh-gupta/digibee-marketplace) · MIT

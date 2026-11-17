# Web que editas arrastrando bloques

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Portales y webs editables |
| Precio | Lo montas tú 199 € · Te lo montamos 449 € |
| Plazo publicado | 5 días |
| Nivel | **C · Proyecto por fases** (1–3 días de trabajo) |
| Dónde vive | Editor visual sobre Workers |
| Base | microweber/microweber (MIT) |

**Qué es:** Tu web en un editor visual de código abierto: cambias textos, fotos y secciones arrastrando, sin tocar código ni pagar cuota.

**Ejemplo:** Tienda de muebles: monta ella misma la página de ofertas de enero arrastrando el bloque «producto destacado».

## 1. Qué le pides al cliente

- Sector
- Páginas que necesitas
- Logo, colores y fotos
- Dominio

**Accesos:**
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev

Email listo para mandar:

```text
Asunto: Tu pedido «Web que editas arrastrando bloques»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Sector
- Páginas que necesitas
- Logo, colores y fotos
- Dominio

Y además (te guiamos paso a paso si no sabes cómo):
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev

En cuanto lo tengamos, el plazo es de 5 días.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs web-arrastrar-soltar` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto web-arrastrar-soltar («Web que editas arrastrando bloques») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel C.
Base: microweber/microweber (MIT). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Editor visual sobre Workers.
Campos del cliente:
- Sector: <...>
- Páginas que necesitas: <...>
- Logo, colores y fotos: <...>
- Dominio: <...>
Accesos que ya me ha dado el cliente:
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev: <sí/no>
Tiene que quedar: Editor visual instalado y configurado; Web inicial de 4 páginas con tus datos; Bloques de tu sector listos para usar; Formación de 30 minutos.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Haz primero un plan de entrega por fases (máx. 3) y entrega la fase 1 funcionando.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs web-arrastrar-soltar tu`.

## 3. Qué entregas

- [ ] Editor visual instalado y configurado
- [ ] Web inicial de 4 páginas con tus datos
- [ ] Bloques de tu sector listos para usar
- [ ] Formación de 30 minutos
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Web que editas arrastrando bloques

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Editor visual instalado y configurado
- Web inicial de 4 páginas con tus datos
- Bloques de tu sector listos para usar
- Formación de 30 minutos

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- Demo: [Galería de 40 diseños Bootstrap](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-bootstrap/)
- [microweber/microweber](https://github.com/microweber/microweber) · MIT
- [frappe/builder](https://github.com/frappe/builder) · MIT
- [GrapesJS/grapesjs](https://github.com/GrapesJS/grapesjs) · NOASSERTION

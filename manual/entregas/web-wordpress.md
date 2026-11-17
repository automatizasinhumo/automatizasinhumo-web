# Web WordPress llave en mano

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Webs para tu negocio |
| Precio | Lo montas tú 249 € · Te lo montamos 549 € |
| Plazo publicado | 5 días |
| Nivel | **C · Proyecto por fases** (1–3 días de trabajo) |
| Dónde vive | Hosting del cliente (WordPress necesita PHP) |
| Base | WordPress/wordpress-develop (GPL-2.0) |

**Qué es:** Si prefieres WordPress: instalada, con tema ligero, tus páginas, formulario, copias automáticas y seguridad básica.

**Ejemplo:** Academia de música: inicio, profesores, horarios, precios y contacto; la dueña cambia los horarios ella misma.

## 1. Qué le pides al cliente

- Dominio y hosting (o te recomendamos uno)
- Textos de las 5 páginas
- Logo y fotos
- Colores

**Accesos:**
- Hosting y dominio del cliente

Email listo para mandar:

```text
Asunto: Tu pedido «Web WordPress llave en mano»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Dominio y hosting (o te recomendamos uno)
- Textos de las 5 páginas
- Logo y fotos
- Colores

Y además (te guiamos paso a paso si no sabes cómo):
- Hosting y dominio del cliente

En cuanto lo tengamos, el plazo es de 5 días.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs web-wordpress` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto web-wordpress («Web WordPress llave en mano») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel C.
Base: WordPress/wordpress-develop (GPL-2.0). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Hosting del cliente (WordPress necesita PHP).
Campos del cliente:
- Dominio y hosting (o te recomendamos uno): <...>
- Textos de las 5 páginas: <...>
- Logo y fotos: <...>
- Colores: <...>
Accesos que ya me ha dado el cliente:
- Hosting y dominio del cliente: <sí/no>
Tiene que quedar: WordPress instalado en tu hosting; 5 páginas con tus textos y fotos; Formulario de contacto y aviso legal; Copias de seguridad y actualizaciones automáticas; Vídeo de 10 minutos para editarla tú.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Haz primero un plan de entrega por fases (máx. 3) y entrega la fase 1 funcionando.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs web-wordpress tu`.

## 3. Qué entregas

- [ ] WordPress instalado en tu hosting
- [ ] 5 páginas con tus textos y fotos
- [ ] Formulario de contacto y aviso legal
- [ ] Copias de seguridad y actualizaciones automáticas
- [ ] Vídeo de 10 minutos para editarla tú
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Web WordPress llave en mano

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- WordPress instalado en tu hosting
- 5 páginas con tus textos y fotos
- Formulario de contacto y aviso legal
- Copias de seguridad y actualizaciones automáticas
- Vídeo de 10 minutos para editarla tú

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- Demo: [Empresa](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/business/corporate-company/)
- Demo: [Blog personal](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/portfolio/writer-blogger/)
- [WordPress/wordpress-develop](https://github.com/WordPress/wordpress-develop) · GPL-2.0

# Alojamiento + dominio gestionado (mes)

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Planes mensuales |
| Precio | 9 € |
| Plazo publicado | Mensual |
| Nivel | **B · Prompt + accesos del cliente** (30–90 min de tu tiempo, casi todo esperando al cliente) |
| Dónde vive | Cloudflare Workers (gratis) + dominio a nombre del cliente |
| Base | coollabsio/coolify (Apache-2.0) |

**Qué es:** Tu web publicada en Cloudflare con SSL y tu dominio, sin preocuparte de renovaciones.

**Ejemplo:** tunegocio.es apuntando a tu web, renovado cada año sin que tengas que hacer nada.

## 1. Qué le pides al cliente

- Dominio deseado
- Web a alojar

**Accesos:**
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev

Email listo para mandar:

```text
Asunto: Tu pedido «Alojamiento + dominio gestionado (mes)»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Dominio deseado
- Web a alojar

Y además (te guiamos paso a paso si no sabes cómo):
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev

En cuanto lo tengamos, el plazo es de Mensual.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs plan-hosting-dominio` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto plan-hosting-dominio («Alojamiento + dominio gestionado (mes)») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel B.
Base: coollabsio/coolify (Apache-2.0). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Cloudflare Workers (gratis) + dominio a nombre del cliente.
Campos del cliente:
- Dominio deseado: <...>
- Web a alojar: <...>
Accesos que ya me ha dado el cliente:
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev: <sí/no>
Tiene que quedar: Alojamiento rápido con SSL; Gestión del dominio; Email de reenvío.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.
```

## 3. Qué entregas

- [ ] Alojamiento rápido con SSL
- [ ] Gestión del dominio
- [ ] Email de reenvío
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Alojamiento + dominio gestionado (mes)

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Alojamiento rápido con SSL
- Gestión del dominio
- Email de reenvío

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [coollabsio/coolify](https://github.com/coollabsio/coolify) · Apache-2.0

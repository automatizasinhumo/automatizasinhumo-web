# Web para taller con cita previa

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Webs para tu negocio |
| Precio | Lo montas tú 249 € · Te lo montamos 449 € |
| Plazo publicado | 4 días |
| Nivel | **B · Prompt + accesos del cliente** (30–90 min de tu tiempo, casi todo esperando al cliente) |
| Dónde vive | Worker de Cloudflare + base de datos D1 (gratis hasta 5 GB) |
| Base | CCCrafts/punctual (MIT) |

**Qué es:** Taller mecánico, de bicis o de reparación: servicios, precios orientativos y cita online.

**Ejemplo:** Talleres Pérez: «Cambio de aceite – 45 min – desde 59 €» y el cliente reserva el hueco del jueves.

## 1. Qué le pides al cliente

- Nombre del taller
- Servicios y duración
- Horario y huecos disponibles
- Fotos del taller

**Accesos:**
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev
- Email donde recibir las citas

Email listo para mandar:

```text
Asunto: Tu pedido «Web para taller con cita previa»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Nombre del taller
- Servicios y duración
- Horario y huecos disponibles
- Fotos del taller

Y además (te guiamos paso a paso si no sabes cómo):
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev
- Email donde recibir las citas

En cuanto lo tengamos, el plazo es de 4 días.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs web-taller` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto web-taller («Web para taller con cita previa») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel B.
Base: CCCrafts/punctual (MIT). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Worker de Cloudflare + base de datos D1 (gratis hasta 5 GB).
Campos del cliente:
- Nombre del taller: <...>
- Servicios y duración: <...>
- Horario y huecos disponibles: <...>
- Fotos del taller: <...>
Accesos que ya me ha dado el cliente:
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev: <sí/no>
- Email donde recibir las citas: <sí/no>
Tiene que quedar: Web con servicios y precios; Calendario de citas; Aviso de cada cita por email; Mapa y horario.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs web-taller tu`.

## 3. Qué entregas

- [ ] Web con servicios y precios
- [ ] Calendario de citas
- [ ] Aviso de cada cita por email
- [ ] Mapa y horario
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Web para taller con cita previa

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Web con servicios y precios
- Calendario de citas
- Aviso de cada cita por email
- Mapa y horario

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- Demo: [Taller mecánico](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/local-services/auto-repair/)
- Demo: [Fontanería](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/local-services/plumber-home-services/)
- Demo: [Limpiezas](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/local-services/cleaning-company/)
- [MohamadTaher/mechanic-shop](https://github.com/MohamadTaher/mechanic-shop) · NONE
- [CCCrafts/punctual](https://github.com/CCCrafts/punctual) · MIT

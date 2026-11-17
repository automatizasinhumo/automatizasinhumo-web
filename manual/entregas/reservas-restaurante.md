# Reservas de mesa online

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Restaurantes y bares |
| Precio | Lo montas tú 149 € · Te lo montamos 299 € |
| Plazo publicado | 3 días |
| Nivel | **B · Prompt + accesos del cliente** (30–90 min de tu tiempo, casi todo esperando al cliente) |
| Dónde vive | Worker de Cloudflare + base de datos D1 (gratis hasta 5 GB) |
| Base | RamtinBabaei/quickdine-platform (MIT) |

**Qué es:** Sistema propio de reservas sin pagar comisión por comensal a plataformas.

**Ejemplo:** Restaurante El Puerto: el cliente reserva para 4 el sábado a las 14:30 y tú lo ves en el panel.

## 1. Qué le pides al cliente

- Turnos y aforo
- Mesas
- Días de cierre
- Email / teléfono de avisos

**Accesos:**
- Email o Telegram para avisos de reserva

Email listo para mandar:

```text
Asunto: Tu pedido «Reservas de mesa online»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Turnos y aforo
- Mesas
- Días de cierre
- Email / teléfono de avisos

Y además (te guiamos paso a paso si no sabes cómo):
- Email o Telegram para avisos de reserva

En cuanto lo tengamos, el plazo es de 3 días.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs reservas-restaurante` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto reservas-restaurante («Reservas de mesa online») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel B.
Base: RamtinBabaei/quickdine-platform (MIT). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Worker de Cloudflare + base de datos D1 (gratis hasta 5 GB).
Campos del cliente:
- Turnos y aforo: <...>
- Mesas: <...>
- Días de cierre: <...>
- Email / teléfono de avisos: <...>
Accesos que ya me ha dado el cliente:
- Email o Telegram para avisos de reserva: <sí/no>
Tiene que quedar: Página de reservas; Panel para ver y confirmar reservas; Avisos al cliente; Control de aforo por turno.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs reservas-restaurante tu`.

## 3. Qué entregas

- [ ] Página de reservas
- [ ] Panel para ver y confirmar reservas
- [ ] Avisos al cliente
- [ ] Control de aforo por turno
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Reservas de mesa online

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Página de reservas
- Panel para ver y confirmar reservas
- Avisos al cliente
- Control de aforo por turno

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- Demo: [Web de restaurante](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/restaurant/restaurant/)
- Demo: [Pizzería a domicilio](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/restaurant/pizza-delivery/)
- [RamtinBabaei/quickdine-platform](https://github.com/RamtinBabaei/quickdine-platform) · MIT

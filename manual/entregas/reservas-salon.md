# Reservas para peluquería, estética o clínica

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Reservas y citas |
| Precio | Lo montas tú 199 € · Te lo montamos 399 € |
| Plazo publicado | 5 días |
| Nivel | **C · Proyecto por fases** (1–3 días de trabajo) |
| Dónde vive | Worker de Cloudflare + base de datos D1 (gratis hasta 5 GB) |
| Base | Salora-Software/Salora (AGPL-3.0) |

**Qué es:** Motor de reservas por servicio y profesional, con ficha de cliente.

**Ejemplo:** Centro Bella: «Manicura con Laura – martes 17:00 – 25 €», con recordatorio el día antes.

## 1. Qué le pides al cliente

- Servicios, duración y precio
- Profesionales y horarios
- Política de cancelación

**Accesos:**
- Email de avisos
- Lista de profesionales con su horario

Email listo para mandar:

```text
Asunto: Tu pedido «Reservas para peluquería, estética o clínica»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Servicios, duración y precio
- Profesionales y horarios
- Política de cancelación

Y además (te guiamos paso a paso si no sabes cómo):
- Email de avisos
- Lista de profesionales con su horario

En cuanto lo tengamos, el plazo es de 5 días.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs reservas-salon` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto reservas-salon («Reservas para peluquería, estética o clínica») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel C.
Base: Salora-Software/Salora (AGPL-3.0). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Worker de Cloudflare + base de datos D1 (gratis hasta 5 GB).
Campos del cliente:
- Servicios, duración y precio: <...>
- Profesionales y horarios: <...>
- Política de cancelación: <...>
Accesos que ya me ha dado el cliente:
- Email de avisos: <sí/no>
- Lista de profesionales con su horario: <sí/no>
Tiene que quedar: Reserva por servicio y profesional; Ficha e historial de clientes; Recordatorios; Widget para tu web.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Haz primero un plan de entrega por fases (máx. 3) y entrega la fase 1 funcionando.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs reservas-salon tu`.

## 3. Qué entregas

- [ ] Reserva por servicio y profesional
- [ ] Ficha e historial de clientes
- [ ] Recordatorios
- [ ] Widget para tu web
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Reservas para peluquería, estética o clínica

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Reserva por servicio y profesional
- Ficha e historial de clientes
- Recordatorios
- Widget para tu web

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- Demo: [Peluquería y spa](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/health-fitness/spa-salon/)
- Demo: [Estudio de yoga](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/health-fitness/yoga-studio/)
- Demo: [Gimnasio](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/health-fitness/gym-fitness/)
- [Salora-Software/Salora](https://github.com/Salora-Software/Salora) · AGPL-3.0
- [nabinbabuuranw/palo](https://github.com/nabinbabuuranw/palo) · MIT

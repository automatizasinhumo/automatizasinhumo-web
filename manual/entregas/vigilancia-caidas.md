# Aviso si tu web se cae + página de estado

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Planes mensuales |
| Precio | Lo montas tú 39 € · Te lo montamos 99 € |
| Plazo publicado | 24 h |
| Nivel | **B · Prompt + accesos del cliente** (30–90 min de tu tiempo, casi todo esperando al cliente) |
| Dónde vive | Worker con Cron Trigger que comprueba las URLs |
| Base | louislam/uptime-kuma (MIT) |

**Qué es:** Comprobamos tu web cada minuto y te avisamos al móvil si deja de funcionar, con una página pública de estado.

**Ejemplo:** La tienda de Ana cae un sábado a las 23:10; a las 23:11 le llega «tienda caída» al Telegram y lo arreglamos.

## 1. Qué le pides al cliente

- Webs a vigilar (URLs)
- Canal de aviso (Telegram / email)
- Logo

**Accesos:**
- Bot de Telegram (token del cliente con @BotFather)

Email listo para mandar:

```text
Asunto: Tu pedido «Aviso si tu web se cae + página de estado»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Webs a vigilar (URLs)
- Canal de aviso (Telegram / email)
- Logo

Y además (te guiamos paso a paso si no sabes cómo):
- Bot de Telegram (token del cliente con @BotFather)

En cuanto lo tengamos, el plazo es de 24 h.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs vigilancia-caidas` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto vigilancia-caidas («Aviso si tu web se cae + página de estado») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel B.
Base: louislam/uptime-kuma (MIT). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Worker con Cron Trigger que comprueba las URLs.
Campos del cliente:
- Webs a vigilar (URLs): <...>
- Canal de aviso (Telegram / email): <...>
- Logo: <...>
Accesos que ya me ha dado el cliente:
- Bot de Telegram (token del cliente con @BotFather): <sí/no>
Tiene que quedar: Vigilancia cada 60 s de webs, tiendas o reservas; Aviso por Telegram o email; Página de estado con tu logo; Informe mensual de disponibilidad.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs vigilancia-caidas tu`.

## 3. Qué entregas

- [ ] Vigilancia cada 60 s de webs, tiendas o reservas
- [ ] Aviso por Telegram o email
- [ ] Página de estado con tu logo
- [ ] Informe mensual de disponibilidad
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Aviso si tu web se cae + página de estado

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Vigilancia cada 60 s de webs, tiendas o reservas
- Aviso por Telegram o email
- Página de estado con tu logo
- Informe mensual de disponibilidad

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [louislam/uptime-kuma](https://github.com/louislam/uptime-kuma) · MIT

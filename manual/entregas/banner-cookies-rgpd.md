# Banner de cookies legal y textos RGPD

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Webs para tu negocio |
| Precio | Lo montas tú 29 € · Te lo montamos 79 € |
| Plazo publicado | 24 h |
| Nivel | **A · Un prompt** (5–15 min de tu tiempo; se entrega el mismo día) |
| Dónde vive | Script de orestbida/cookieconsent para pegar en su web |
| Base | orestbida/cookieconsent (MIT) |

**Qué es:** Pon tu web en regla: banner de cookies que bloquea de verdad hasta que el usuario acepta, y textos legales base.

**Ejemplo:** Tienda con píxel de Meta: el píxel ya no se carga hasta que el cliente pulsa «Aceptar».

## 1. Qué le pides al cliente

- URL de la web
- Datos del titular
- Herramientas que usas (Analytics, Meta…)

**Accesos:**
- Acceso para pegar el script en su web

Email listo para mandar:

```text
Asunto: Tu pedido «Banner de cookies legal y textos RGPD»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- URL de la web
- Datos del titular
- Herramientas que usas (Analytics, Meta…)

Y además (te guiamos paso a paso si no sabes cómo):
- Acceso para pegar el script en su web

En cuanto lo tengamos, el plazo es de 24 h.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs banner-cookies-rgpd` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto banner-cookies-rgpd («Banner de cookies legal y textos RGPD») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel A.
Base: orestbida/cookieconsent (MIT). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Script de orestbida/cookieconsent para pegar en su web.
Campos del cliente:
- URL de la web: <...>
- Datos del titular: <...>
- Herramientas que usas (Analytics, Meta…): <...>
Accesos que ya me ha dado el cliente:
- Acceso para pegar el script en su web: <sí/no>
Tiene que quedar: Banner de cookies con aceptar / rechazar / configurar; Bloqueo real de analítica y píxeles; Plantillas de aviso legal, privacidad y cookies; Instalado en tu web (modalidad «Te lo montamos»).
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs banner-cookies-rgpd tu`.

## 3. Qué entregas

- [ ] Banner de cookies con aceptar / rechazar / configurar
- [ ] Bloqueo real de analítica y píxeles
- [ ] Plantillas de aviso legal, privacidad y cookies
- [ ] Instalado en tu web (modalidad «Te lo montamos»)
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Banner de cookies legal y textos RGPD

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Banner de cookies con aceptar / rechazar / configurar
- Bloqueo real de analítica y píxeles
- Plantillas de aviso legal, privacidad y cookies
- Instalado en tu web (modalidad «Te lo montamos»)

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [orestbida/cookieconsent](https://github.com/orestbida/cookieconsent) · MIT

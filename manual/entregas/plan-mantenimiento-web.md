# Mantenimiento web (mes)

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Planes mensuales |
| Precio | 19 € |
| Plazo publicado | Mensual |
| Nivel | **B · Prompt + accesos del cliente** (30–90 min de tu tiempo, casi todo esperando al cliente) |
| Dónde vive | Lo que ya tenga + revisión mensual de los empleados QA |
| Base | plantilla propia (ningún repo base tiene licencia libre) |

**Qué es:** Nos ocupamos de que tu web siga funcionando: copias, actualizaciones y pequeños cambios.

**Ejemplo:** Cambiar el horario de verano o subir la nueva carta: nos lo mandas y está hecho.

## 1. Qué le pides al cliente

- Web a mantener
- Accesos (te guiamos)

**Accesos:**
- Accesos a su web

Email listo para mandar:

```text
Asunto: Tu pedido «Mantenimiento web (mes)»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Web a mantener
- Accesos (te guiamos)

Y además (te guiamos paso a paso si no sabes cómo):
- Accesos a su web

En cuanto lo tengamos, el plazo es de Mensual.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs plan-mantenimiento-web` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto plan-mantenimiento-web («Mantenimiento web (mes)») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel B.
Base: plantilla propia (ningún repo base tiene licencia libre). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Lo que ya tenga + revisión mensual de los empleados QA.
Campos del cliente:
- Web a mantener: <...>
- Accesos (te guiamos): <...>
Accesos que ya me ha dado el cliente:
- Accesos a su web: <sí/no>
Tiene que quedar: Copias de seguridad; Actualizaciones de seguridad; 30 min de cambios al mes; Vigilancia de caídas.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.
```

## 3. Qué entregas

- [ ] Copias de seguridad
- [ ] Actualizaciones de seguridad
- [ ] 30 min de cambios al mes
- [ ] Vigilancia de caídas
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Mantenimiento web (mes)

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Copias de seguridad
- Actualizaciones de seguridad
- 30 min de cambios al mes
- Vigilancia de caídas

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias


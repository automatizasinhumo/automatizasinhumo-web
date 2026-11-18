# Norma de trabajo de Automatiza sin humo: adoptar, no desarrollar

Esta web se construye con código público que ya funciona y que otras personas usan, adaptado a la tienda. No se desarrolla desde cero.

1. **Todo se resuelve adoptando.** Esto vale para cualquier necesidad de cualquier parte de la web: un fallo, un hueco, una plantilla que falta, un paso de la fábrica que no está automatizado, unos pagos que no funcionan, un diseño, la experiencia de uso, una automatización o una forma nueva de crear webs. La solución es encontrar un repositorio público que ya lo tenga funcionando:
   - Se busca con GPT (búsqueda web activada) o en GitHub.
   - Se clona en una carpeta temporal fuera del repo.
   - Se copia lo necesario, se adapta, se prueba y se sube por PR.
2. **Mirada de arquitecto.** Cada fallo representa una clase de problema. Se busca la pieza que cubra el conjunto, como un flujo de pago entero o un sistema de plantillas, y no el parche del caso concreto.
3. **Si no encaja o falla, se cambia de repo.** No se parchea código adoptado para que funcione a la fuerza. Se descarta y se busca otro repositorio que sí funcione.
4. **Código propio, solo el mínimo:**
   - El pegamento que conecta la pieza adoptada con nuestros datos: catálogo, D1 y ajustes.
   - Textos, colores y tokens del tema.
   - Arreglos muy pequeños que valgan para toda la web.
   Quedan fuera los refactors, las capturas manuales (las hace la CI) y los tests nuevos que la tarea no pida.
5. **Licencias:**
   - Solo se copia código con licencia MIT, Apache-2.0 o BSD. Un repo sin licencia sirve solo de referencia.
   - Se conserva el aviso de copyright: una cabecera en cada fichero copiado y el texto completo en `licencias/<repo>.txt`.
6. **Cada PR dice qué se adoptó:** el repo, la licencia, los ficheros copiados, lo que se ha cambiado y la prueba que demuestra que funciona.

Reglas de forma: ficheros con CRLF, textos visibles en español de España, push solo a `origin` y nunca tocar `.instances/` ni `manual/CREDENCIALES_STAGING.local`.

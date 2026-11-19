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
   Quedan fuera los refactors, las capturas y los tests nuevos, salvo que la tarea los pida. Claude revisa el resultado visual en staging después de fusionar.
5. **Licencias:**
   - Solo se copia código con licencia MIT, Apache-2.0 o BSD. Un repo sin licencia sirve solo de referencia.
   - Se conserva el aviso de copyright: una cabecera en cada fichero copiado (si el formato no admite comentarios, como JSON, el aviso va en `licencias/<repo>.txt` con la lista de esos ficheros) y el texto completo en `licencias/<repo>.txt`.
6. **Cada PR dice qué se adoptó:** el repo, la licencia, los ficheros copiados, lo que se ha cambiado y la prueba que demuestra que funciona.
7. **Madurez antes de adoptar.** «Publicado» no es «probado en producción». Antes de copiar se anota en la PR:
   - Uso real: estrellas, forks, dependientes, descargas y cuántas personas contribuyen. Un repo reciente con 1–2 personas es un prototipo y se trata como código propio: con pruebas propias desde el primer día.
   - Pruebas y CI propias del repo, y si están en verde.
   - Actividad: último commit, incidencias abiertas y tiempo de respuesta.
   - Se prefieren piezas pequeñas y muy usadas (librerías) a aplicaciones enteras de poco uso.
8. **Separar sus fallos de los nuestros.** Nuestras pruebas (CSP estricta, accesibilidad, exploratorio) son más duras que las del original. Cuando una prueba falla:
   - Se pasa primero contra el original sin tocar. Si también falla allí, el fallo es del original: se arregla una vez y se propone el arreglo al repo de origen.
   - Si solo falla en lo nuestro, el fallo es de la adaptación y se corrige en el pegamento, no en la pieza adoptada.

Reglas de forma: ficheros con CRLF, textos visibles en español de España, push solo a `origin` y nunca tocar `.instances/` ni `manual/CREDENCIALES_STAGING.local`.

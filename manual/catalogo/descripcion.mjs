// Markdown de la ficha de un servicio. Lo usan gen-sql.mjs (seed completo) y
// gen-update.mjs (actualizar un entorno con pedidos sin borrar nada).
// La sección «## Campos que rellenas» la lee camposDeDescripcion() para montar
// el formulario de /empezar: no cambiar el título sin cambiar el parser.
export function descripcion(p) {
  const l = [];
  l.push(p.resumen, '');
  l.push('## Qué recibes', ...p.recibes.map((x) => `- ${x}`), '');
  if (p.noIncluye?.length) l.push('## No incluye', ...p.noIncluye.map((x) => `- ${x}`), '');
  l.push('## Campos que rellenas', ...p.campos.map((x) => `- ${x}`), '');
  l.push('## Ejemplo', `> ${p.ejemplo}`, '');
  if (p.extra) l.push(p.extra, '');
  if (p.auto) return autoservicio(p, l);
  l.push(p.plazo === 'Mensual'
    ? '**Plazo:** puesta en marcha en 24–72 horas laborables desde que recibimos los datos necesarios; después, servicio mensual.'
    : '**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.', '');
  if (p.p.length === 2) {
    l.push('## Plantilla + guía o te lo montamos',
      '**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.', '',
      '| | Plantilla + guía | Te lo montamos |',
      '|---|---|---|',
      `| Precio | **${p.p[0]} €** | **${p.p[1]} €** |`,
      '| Preparado con tus datos | Sí | Sí |',
      '| Guía paso a paso para publicarlo | Sí | No hace falta |',
      '| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |',
      '| Ronda de ajustes | Sí | Sí |', '');
  }
  const muestra = p.muestra ? ` (en este servicio, ${p.muestra})` : '';
  l.push('## Cómo funciona',
    '**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.', '',
    `**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información${muestra}. Si te gusta, lo contratas; si no, no pagas nada.`, '',
    '_Te atiende David Porto Díaz, una persona real que responde a tus dudas._', '');
  return l.join('\n');
}

// Servicio de autoservicio: sin espera ni formulario; se prepara en el estudio y se entrega al pagar.
function autoservicio(p, l) {
  l.push('**Plazo:** al momento. Lo preparas tú en el estudio y, al pagar, lo descargas o queda publicado sin esperas.', '');
  if (p.auto.variantes?.length > 1)
    l.push('## Modalidades', ...p.auto.variantes.map((v) => `- **${v.etiqueta}:** ${(v.precio / 100).toLocaleString('es-ES')} €`), '');
  l.push('## Cómo funciona',
    `**Hazlo ahora en el [estudio](${p.auto.estudio}):** eliges el diseño, rellenas tus datos y lo ves al momento con una marca de agua de vista previa.`, '',
    '**Al pagar** se quita la marca: descargas la versión final o se publica en tu enlace, y queda guardado en tu pedido.', '',
    '_Te atiende David Porto Díaz, una persona real que responde a tus dudas._', '');
  return l.join('\n');
}

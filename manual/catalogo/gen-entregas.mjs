// Guías de entrega por producto.
//
//   node manual/catalogo/gen-entregas.mjs                → reescribe manual/entregas/*.md
//   node manual/catalogo/gen-entregas.mjs <slug> [tu|nos] → imprime el prompt del pedido
//
// Fuente: catalogo.mjs (campos, precios, plazo), entrega.mjs (nivel, accesos,
// dónde vive), repos_meta.csv (licencias) y demos.mjs (demos en vivo).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { categorias, productos } from './catalogo.mjs';
import { ENTREGA, NIVELES } from './entrega.mjs';
import { demosDe } from '../demos/demos.mjs';

const here = new URL('.', import.meta.url);
const EXCLUIDOS = new Set(['kahaan83/digital-cards']);
const meta = new Map();
for (const line of readFileSync(new URL('repos_meta.csv', here), 'utf8').split(/\r?\n/).slice(1)) {
  const [name, , lic] = line.split(';');
  if (name) meta.set(name.toLowerCase(), lic || '');
}
const libre = (lic) => lic && !['NONE', 'NOASSERTION'].includes(lic);
const licDe = (r) => meta.get(r.toLowerCase()) || '¿?';

const faltan = productos.filter((p) => !ENTREGA[p.slug]).map((p) => p.slug);
if (faltan.length) throw new Error(`Falta la entrega de: ${faltan.join(', ')} (añádelos en entrega.mjs)`);

function baseDe(p, e) {
  if (e.base) return e.base;
  const r = p.repos.find((x) => !EXCLUIDOS.has(x.toLowerCase()) && libre(licDe(x)));
  return r ? `${r} (${licDe(r)})` : 'plantilla propia (ningún repo base tiene licencia libre)';
}

export function prompt(p, modalidad = 'Te lo montamos') {
  const e = ENTREGA[p.slug];
  const lineas = [
    `Entrega del pedido <nº> · producto ${p.slug} («${p.nombre}») · modalidad ${modalidad}`,
    `Trabaja en C:\\GIT\\automatizasinhumo-demos\\clientes\\<slug-cliente>\\. Nivel ${e.n}.`,
    `Base: ${baseDe(p, e)}. Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.`,
    `Dónde vive: ${e.run}.`,
    'Campos del cliente:',
    ...p.campos.map((c) => `- ${c}: <...>`),
    ...(e.acc.length ? ['Accesos que ya me ha dado el cliente:', ...e.acc.map((a) => `- ${a}: <sí/no>`)] : []),
    `Tiene que quedar: ${p.recibes.join('; ')}.`,
    ...(e.nota ? [`Ojo: ${e.nota}`] : []),
    'Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,',
    'revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.',
    'Devuélveme el enlace, una captura y el email de entrega para el cliente.',
  ];
  if (modalidad === 'Plantilla + guía' || modalidad === 'Lo montas tú') lineas.push('Genera además un ZIP con la plantilla rellenada y una guía paso a paso (con capturas) para publicarla él.');
  if (e.n === 'B') lineas.push('Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.');
  if (e.n === 'C') lineas.push('Haz primero un plan de entrega por fases (máx. 3) y entrega la fase 1 funcionando.');
  return lineas.join('\n');
}

function emailDatos(p) {
  const e = ENTREGA[p.slug];
  return [
    `Asunto: Tu pedido «${p.nombre}»: necesitamos estos datos`,
    '',
    '¡Gracias por tu compra! Para empezar, contesta a este email con:',
    ...p.campos.map((c) => `- ${c}`),
    ...(e.acc.length ? ['', 'Y además (te guiamos paso a paso si no sabes cómo):', ...e.acc.map((a) => `- ${a}`)] : []),
    '',
    `En cuanto lo tengamos, el plazo es de ${p.plazo}.`,
    'Un saludo,',
    'David · Automatiza sin humo',
  ].join('\n');
}

function emailEntrega(p) {
  return [
    `Asunto: Ya está listo: ${p.nombre}`,
    '',
    'Hola, ya tienes tu encargo publicado:',
    '<enlace>',
    '',
    'Qué incluye:',
    ...p.recibes.map((r) => `- ${r}`),
    '',
    'Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.',
    'Un saludo,',
    'David · Automatiza sin humo',
  ].join('\n');
}

function guia(p) {
  const e = ENTREGA[p.slug];
  const cat = categorias.find((c) => c.slug === p.cat)?.nombre ?? p.cat;
  const demos = demosDe(p.slug);
  const precios = p.p.length === 2 ? `Plantilla + guía ${p.p[0]} € · Te lo montamos ${p.p[1]} €` : `${p.p[0]} €`;
  const l = [
    `# ${p.nombre}`,
    '',
    `> Generado por \`manual/catalogo/gen-entregas.mjs\`. No editar a mano: cambia \`catalogo.mjs\` o \`entrega.mjs\` y vuelve a generarlo.`,
    '',
    `| | |`, `|---|---|`,
    `| Categoría | ${cat} |`,
    `| Precio | ${precios} |`,
    `| Plazo publicado | ${p.plazo} |`,
    `| Nivel | **${e.n} · ${NIVELES[e.n].nombre}** (${NIVELES[e.n].tiempo}) |`,
    `| Dónde vive | ${e.run} |`,
    `| Base | ${baseDe(p, e)} |`,
    '',
    `**Qué es:** ${p.resumen}`,
    '',
    `**Ejemplo:** ${p.ejemplo}`,
    '',
    '## 1. Qué le pides al cliente',
    '',
    ...p.campos.map((c) => `- ${c}`),
    ...(e.acc.length ? ['', '**Accesos:**', ...e.acc.map((a) => `- ${a}`)] : ['', 'No hace falta ninguna cuenta ni acceso del cliente.']),
    '',
    'Email listo para mandar:',
    '',
    '```text', emailDatos(p), '```',
    '',
    '## 2. Cómo lo generas',
    '',
    'Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs ' + p.slug + '` para sacarlo ya en la terminal):',
    '',
    '```text', prompt(p), '```',
    '',
    ...(p.p.length === 2 ? ['Para la modalidad **Plantilla + guía**: `node manual/catalogo/gen-entregas.mjs ' + p.slug + ' tu`.', ''] : []),
    ...(e.nota ? [`> **Ojo:** ${e.nota}`, ''] : []),
    '## 3. Qué entregas',
    '',
    ...p.recibes.map((r) => `- [ ] ${r}`),
    '- [ ] Revisado en móvil',
    '- [ ] Sin textos ni imágenes de demo',
    '',
    '```text', emailEntrega(p), '```',
    '',
    '## Referencias',
    '',
    ...(demos.length ? demos.map((d) => `- Demo: [${d.titulo}](${d.url})`) : []),
    ...p.repos.map((r) => `- [${r}](https://github.com/${r}) · ${EXCLUIDOS.has(r.toLowerCase()) ? 'EXCLUIDO, no usar' : licDe(r)}`),
    '',
  ];
  return l.join('\n');
}

const [slug, mod] = process.argv.slice(2);
if (slug) {
  const p = productos.find((x) => x.slug === slug);
  if (!p) { console.error(`No existe el producto «${slug}». Mira manual/entregas/README.md`); process.exit(1); }
  console.log(prompt(p, mod === 'tu' ? 'Plantilla + guía' : 'Te lo montamos'));
} else {
  const dir = new URL('../entregas/', here);
  mkdirSync(dir, { recursive: true });
  for (const p of productos) writeFileSync(new URL(`${p.slug}.md`, dir), guia(p));
  const idx = [
    '# Guías de entrega',
    '',
    '> Generado por `manual/catalogo/gen-entregas.mjs`.',
    '',
    'Cuando entra un pedido: abre la guía del producto, manda el email de datos, y cuando contesten pega el prompt con sus datos.',
    '',
    ...Object.entries(NIVELES).map(([k, v]) => `- **${k} · ${v.nombre}:** ${v.tiempo}`),
    '',
  ];
  for (const c of categorias) {
    const ps = productos.filter((p) => p.cat === c.slug);
    if (!ps.length) continue;
    idx.push(`## ${c.nombre}`, '', '| Producto | Nivel | Plazo | Precio |', '|---|---|---|---|');
    for (const p of ps) idx.push(`| [${p.nombre}](${p.slug}.md) | ${ENTREGA[p.slug].n} | ${p.plazo} | ${p.p.join(' / ')} € |`);
    idx.push('');
  }
  writeFileSync(new URL('README.md', dir), idx.join('\n'));
  console.error(`${productos.length} guías en manual/entregas/`);
}

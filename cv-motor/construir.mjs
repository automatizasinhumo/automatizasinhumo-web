// Empaqueta para el navegador el motor del constructor de CV:
//  - 160 plantillas JSON Resume (MIT) sobre @jsonresume/theme-primitives: render(cv) -> HTML.
//  - @json-editor/json-editor (MIT): formulario generado desde un esquema JSON.
//  - catalogo.json: nombre, estilo, maquetación y color de cada plantilla, en español.
// Salida: ../public/cv/motor/ (se sube al repo; el build de Astro no depende de esto).
// Uso: npm ci && npm run construir
import { build } from 'esbuild';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const aqui = (p) => fileURLToPath(new URL(p, import.meta.url));
const require = createRequire(import.meta.url);
const pkg = JSON.parse(readFileSync(aqui('./package.json'), 'utf8'));
const salida = aqui('../public/cv/motor/');
const gen = aqui('./.gen/');

// Plantilla = paquete jsonresume-theme-<slug> (o @jsonresume/jsonresume-theme-<slug>).
const temas = Object.keys(pkg.dependencies)
  .map((nombre) => ({ nombre, slug: /(?:^|\/)jsonresume-theme-(.+)$/.exec(nombre)?.[1] }))
  .filter((t) => t.slug)
  .sort((a, b) => a.slug.localeCompare(b.slug));

const ESTILO = {
  classic: 'Clásico', minimal: 'Minimalista', modern: 'Moderno', editorial: 'Editorial', bold: 'Llamativo',
  creative: 'Creativo', technical: 'Técnico', retro: 'Retro', playful: 'Desenfadado',
};
const MAQUETACION = {
  single: 'Una columna', left: 'Barra a la izquierda', right: 'Barra a la derecha', columns: 'Dos columnas',
  dates: 'Fechas al margen', timeline: 'Línea de tiempo', asymmetric: 'Asimétrico',
};
const COLOR = {
  mono: 'Blanco y negro', blue: 'Azul', green: 'Verde', warm: 'Tonos cálidos', yellow: 'Amarillo y naranja',
  red: 'Rojo y coral', purple: 'Morado y rosa', multi: 'Multicolor',
};

const { THEME_METADATA, RECOMMENDED_THEMES } = require('@jsonresume/theme-metadata');
const catalogo = temas.map(({ slug }) => {
  const m = THEME_METADATA[slug] ?? {};
  return {
    slug,
    nombre: m.name ?? slug,
    estilo: m.style ?? null,
    maquetacion: m.layout ?? null,
    color: m.color ?? null,
    recomendado: RECOMMENDED_THEMES.includes(slug),
  };
});
const sinFicha = catalogo.filter((t) => !t.estilo).map((t) => t.slug);
if (sinFicha.length) console.warn('Plantillas sin metadatos:', sinFicha.join(', '));

rmSync(gen, { recursive: true, force: true });
mkdirSync(gen, { recursive: true });
writeFileSync(
  `${gen}motor.js`,
  `const TEMAS = {\n${temas.map((t) => `  ${JSON.stringify(t.slug)}: () => import(${JSON.stringify(t.nombre)}),`).join('\n')}\n};\n` +
    `export const PLANTILLAS = Object.keys(TEMAS);\n` +
    `export async function renderizar(slug, cv) {\n  const cargar = TEMAS[slug];\n  if (!cargar) throw new Error('Plantilla desconocida: ' + slug);\n  const m = await cargar();\n  return (m.render || m.default.render)(cv);\n}\n`,
);
// json-editor es UMD: lo exportamos como módulo.
writeFileSync(`${gen}editor.js`, `import * as m from '@json-editor/json-editor';\nconst d = m.default ?? {};\nexport const JSONEditor = m.JSONEditor ?? d.JSONEditor ?? d;\n`);
// styled-components importa "stream" para el render en streaming, que aquí no se usa.
writeFileSync(`${gen}vacio.js`, 'export default {};\nexport const Transform = class {};\n');

rmSync(salida, { recursive: true, force: true });
await build({
  entryPoints: [`${gen}motor.js`, `${gen}editor.js`],
  outdir: salida,
  bundle: true,
  splitting: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  minify: true,
  legalComments: 'linked',
  entryNames: '[name]',
  chunkNames: 'c/[hash]',
  alias: { stream: `${gen}vacio.js` },
  define: { 'process.env.NODE_ENV': '"production"' },
  nodePaths: [aqui('./node_modules')],
  logLevel: 'warning',
});

writeFileSync(
  `${salida}catalogo.json`,
  `${JSON.stringify({ estilos: ESTILO, maquetaciones: MAQUETACION, colores: COLOR, plantillas: catalogo })}\n`,
);
console.log(`Motor listo: ${temas.length} plantillas en public/cv/motor/`);

// Empaqueta para el navegador el motor del estudio de CV (/servicios/cv):
//  - 15 plantillas PDF de Reactive Resume (MIT), tal como las publica Resumv (MIT) en vendor/.
//  - src/react-pdf.tsx sustituye a "#react-pdf-renderer" para añadir decoración y marca de agua.
//  - pdf.js (Apache-2.0) pinta la vista previa en lienzos.
// Salida: ../public/cv/estudio/motor/ (se sube al repo; el build de Astro no depende de esto).
// Uso: npm ci && npm run construir
import { build } from 'esbuild';
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const aqui = (p) => fileURLToPath(new URL(p, import.meta.url));
const require = createRequire(import.meta.url);
const salida = aqui('../public/cv/estudio/motor/');
const vendor = aqui('./vendor/');

// Alias de Resumv (tsconfig paths) y los «?url» de Vite, en esbuild.
const resolver = {
  name: 'alias-resumv',
  setup(b) {
    b.onResolve({ filter: /^#react-pdf-renderer$/ }, () => ({ path: aqui('./src/react-pdf.tsx') }));
    // Solo los iconos de src/iconos.ts (generar-iconos.mjs), no los ~1.500 x 6 pesos del paquete.
    b.onResolve({ filter: /^phosphor-icons-react-pdf\/dynamic$/ }, () => ({ path: aqui('./src/iconos.ts') }));
    b.onResolve({ filter: /^@reactive-resume\// }, async (args) => {
      const resto = args.path.slice('@reactive-resume/'.length);
      return b.resolve(`./${resto}`, { resolveDir: vendor, kind: args.kind });
    });
    b.onResolve({ filter: /\?url$/ }, (args) => ({ path: require.resolve(args.path.slice(0, -4), { paths: [args.resolveDir] }) }));
  },
};

rmSync(salida, { recursive: true, force: true });
mkdirSync(salida, { recursive: true });
const r = await build({
  entryPoints: { estudio: aqui('./src/entrada.ts') },
  outdir: salida,
  bundle: true,
  splitting: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  minify: true,
  jsx: 'automatic',
  legalComments: 'linked',
  banner: { js: '/* Contiene software MIT/Apache-2.0 de terceros (Reactive Resume, Resumv, react-pdf, pdf.js, React, Phosphor). Licencias: /cv/estudio/motor/LICENCIAS.txt */' },
  entryNames: '[name]',
  chunkNames: 'c/[hash]',
  assetNames: 'f/[name]-[hash]',
  publicPath: '/cv/estudio/motor/',
  loader: { '.woff': 'file', '.woff2': 'file', '.ttf': 'file', '.svg': 'text' },
  define: { 'process.env.NODE_ENV': '"production"' },
  plugins: [resolver],
  nodePaths: [aqui('./node_modules')],
  logLevel: 'warning',
  metafile: !!process.env.META,
});

if (process.env.META) writeFileSync(process.env.META, JSON.stringify(r.metafile));
// pdf.js necesita su worker como fichero aparte, junto al motor.
copyFileSync(require.resolve('pdfjs-dist/build/pdf.worker.min.mjs'), path.join(salida, 'pdf.worker.min.mjs'));

// Lee la licencia del directorio del paquete (los «exports» impiden resolver /LICENSE).
const dirPaquete = (p) => path.join(aqui('./node_modules/'), p);
const SEP = '\n\n----------------------------------------\n\n';
const licencia = (titulo, fichero) => {
  if (existsSync(fichero)) return `${titulo}\n\n${readFileSync(fichero, 'utf8').trim()}`;
  // Algunos paquetes no publican el fichero: se cita la licencia declarada y su origen.
  const pkg = JSON.parse(readFileSync(path.join(path.dirname(fichero), 'package.json'), 'utf8'));
  const autor = typeof pkg.author === 'string' ? pkg.author : (pkg.author?.name ?? '');
  const repo = typeof pkg.repository === 'string' ? pkg.repository : (pkg.repository?.url ?? pkg.homepage ?? '');
  const lic = String(pkg.license);
  return `${titulo}\n\n${pkg.name}@${pkg.version}: licencia ${lic}${autor ? `, ${autor}` : ''}.\nTexto: https://opensource.org/license/${lic.toLowerCase()}${repo ? `\nOrigen: ${repo}` : ''}`;
};
writeFileSync(
  path.join(salida, 'LICENCIAS.txt'),
  [
    licencia('Reactive Resume — plantillas PDF (MIT)', aqui('./vendor/LICENSE')),
    licencia('Resumv (MIT)', aqui('./vendor/LICENSE-resumv')),
    licencia('@react-pdf/renderer (MIT)', path.join(dirPaquete('@react-pdf/renderer'), 'LICENSE')),
    licencia('pdf.js (Apache-2.0)', path.join(dirPaquete('pdfjs-dist'), 'LICENSE')),
    licencia('React (MIT)', path.join(dirPaquete('react'), 'LICENSE')),
    licencia('Phosphor Icons (MIT) vía phosphor-icons-react-pdf', path.join(dirPaquete('phosphor-icons-react-pdf'), 'LICENSE')),
    licencia('Lato (OFL-1.1) vía @fontsource/lato', path.join(dirPaquete('@fontsource/lato'), 'LICENSE')),
  ].join(SEP) + '\n',
);
console.log('Motor del estudio listo en public/cv/estudio/motor/');

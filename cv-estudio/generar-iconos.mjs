// Genera src/iconos.ts: sustituto de "phosphor-icons-react-pdf/dynamic" con solo los
// iconos útiles en un CV (peso regular). El paquete completo son ~1.500 iconos x 6 pesos
// (5,6 MB); las plantillas solo piden por nombre. Un nombre fuera de la lista no pinta nada
// (mismo comportamiento que createIconComponent del paquete).
// Uso: node generar-iconos.mjs  (después: npm run construir)
import { existsSync, writeFileSync } from 'node:fs';

const ICONOS = `
at envelope envelope-simple phone map-pin globe link house user identification-card calendar
article star heart circle square diamond hexagon check-circle check
briefcase graduation-cap code code-simple brackets-curly compass-tool translate football trophy
certificate books book-open hand-heart messenger-logo game-controller pen-nib robot cpu
chart-line-up brain git-branch shooting-star lightbulb microphone music-notes camera palette
airplane car bicycle users handshake megaphone medal flag rocket wrench gear target
github-logo gitlab-logo linkedin-logo x-logo twitter-logo instagram-logo facebook-logo youtube-logo
tiktok-logo medium-logo dribbble-logo behance-logo stack-overflow-logo whatsapp-logo telegram-logo
threads-logo pinterest-logo figma-logo
`.trim().split(/\s+/);

const pascal = (n) => n.split('-').map((p) => p[0].toUpperCase() + p.slice(1)).join('');
const lineas = [];
for (const n of ICONOS) {
  const f = `node_modules/phosphor-icons-react-pdf/dist/regular/${pascal(n)}.es.js`;
  if (!existsSync(f)) throw new Error(`Icono inexistente: ${n}`);
}
const imports = ICONOS.map((n) => `import { ${pascal(n)}Icon as I${pascal(n)} } from "phosphor-icons-react-pdf/regular/${pascal(n)}";`);
const mapa = ICONOS.map((n) => `\t"${n}": I${pascal(n)},`);
writeFileSync(
  new URL('./src/iconos.ts', import.meta.url),
  `// GENERADO por generar-iconos.mjs; no editar a mano.\n` +
    `import { createElement, type ComponentType } from "react";\n` +
    imports.join('\n') +
    `\n\ntype Props = { name: string; weight?: string; [k: string]: unknown };\n` +
    `// eslint-disable-next-line @typescript-eslint/no-explicit-any\n` +
    `export const icons: Record<string, ComponentType<any>> = {\n${mapa.join('\n')}\n};\n\n` +
    `/** Solo peso regular: las plantillas no piden otro. */\n` +
    `export function Icon({ name, weight: _w, ...props }: Props) {\n\tconst C = icons[name];\n\treturn C ? createElement(C, props) : null;\n}\n`,
);
console.log(`src/iconos.ts: ${ICONOS.length} iconos`);

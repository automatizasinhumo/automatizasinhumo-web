#!/usr/bin/env node
/**
 * Límite que solo baja para el sistema de diseño del tema limpio: cuenta, por fichero,
 * los valores de diseño escritos a mano en vez de salir de los tokens --ds-*:
 *  - clases arbitrarias de Tailwind con medida fija (py-[73px], text-[37px], rounded-[21px]);
 *  - font-size, border-radius, box-shadow y gap/padding/margin con px o rem literales en CSS.
 * Un fichero no puede tener más que su base (scripts/tokens-diseno-base.json) y un fichero
 * nuevo parte de 0: cada componente nuevo nace dentro del sistema, y lo antiguo se migra poco
 * a poco sin bloquear nada. `--actualizar` guarda la base nueva (solo cuando baja).
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const RAIZ = 'src/themes/limpio';
const BASE = 'scripts/tokens-diseno-base.json';
const IGNORAR = new Set(['tokens.css']); // aquí se definen los tokens: valores literales por diseño

const ARBITRARIA = /\b(?:[a-z-]+:)*(?:p[xytblr]?|m[xytblr]?|gap(?:-[xy])?|text|rounded|max-w|min-w|w|h|shadow|leading|tracking)-\[-?[\d.]+(?:px|rem|em)\]/g;
const DECLARACION = /\b(?:font-size|border-radius|box-shadow|gap|row-gap|column-gap|padding(?:-(?:block|inline|top|bottom|left|right))?|margin(?:-(?:block|inline|top|bottom|left|right))?)\s*:\s*([^;}{]+)[;}]/g;

function ficheros(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    if (e.isDirectory()) return ficheros(p);
    return /\.(astro|css)$/.test(e.name) && !IGNORAR.has(e.name) ? [p] : [];
  });
}

function contar(texto) {
  let n = (texto.match(ARBITRARIA) ?? []).length;
  for (const m of texto.matchAll(DECLARACION)) {
    const valor = m[1];
    if (/clamp\(|calc\(|min\(|max\(/.test(valor)) continue; // fluido
    const sinTokens = valor.replace(/var\([^)]*\)/g, ' '); // un literal junto a un token también cuenta
    if (/\b0*\.?\d+(?:\.\d+)?(?:px|rem|em)\b/.test(sinTokens) && !/^\s*0(?:px|rem)?\s*$/.test(sinTokens)) n += 1;
  }
  return n;
}

const actual = {};
for (const f of ficheros(RAIZ)) {
  const n = contar(readFileSync(f, 'utf8'));
  if (n > 0) actual[relative('.', f).split(sep).join('/')] = n;
}

if (process.argv.includes('--actualizar')) {
  const previa = existsSync(BASE) ? JSON.parse(readFileSync(BASE, 'utf8')) : null;
  const sube = previa ? Object.entries(actual).filter(([f, n]) => n > (previa[f] ?? 0)) : [];
  if (sube.length) {
    console.error('tokens-diseno: --actualizar solo baja la base; suben: ' + sube.map(([f]) => f).join(', '));
    process.exit(1);
  }
  const orden = Object.fromEntries(Object.entries(actual).sort(([a], [b]) => a.localeCompare(b)));
  writeFileSync(BASE, JSON.stringify(orden, null, 2) + '\n');
  console.log(`tokens-diseno: base guardada (${Object.values(actual).reduce((a, b) => a + b, 0)} valores a mano en ${Object.keys(actual).length} ficheros)`);
  process.exit(0);
}

const base = existsSync(BASE) ? JSON.parse(readFileSync(BASE, 'utf8')) : {};
const peor = Object.entries(actual).filter(([f, n]) => n > (base[f] ?? 0));
if (peor.length) {
  console.error('tokens-diseno: valores de diseño escritos a mano por encima de la base. Usa un token --ds-* (o añádelo a tokens.css):');
  for (const [f, n] of peor) console.error(`- ${f}: ${n} (base ${base[f] ?? 0})`);
  process.exit(1);
}
const total = Object.values(actual).reduce((a, b) => a + b, 0);
const totalBase = Object.values(base).reduce((a, b) => a + b, 0);
console.log(`tokens-diseno: ok (${total} valores a mano, base ${totalBase}${total < totalBase ? '; baja la base con --actualizar' : ''})`);

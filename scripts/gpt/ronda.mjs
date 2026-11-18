// Genera la pregunta de la siguiente ronda de auditoría de servicios para GPT.
// uso: node scripts/gpt/ronda.mjs <n-ronda> "<qué se aplicó en la ronda anterior>" [cuántos=10]
// Coge los siguientes servicios activos del catálogo que no estén en
// manual/auditorias-gpt/auditados.txt, escribe manual/auditorias-gpt/ronda-NN-pregunta.txt
// y los apunta como auditados. Después: python -I -X utf8 scripts/gpt/ask.py <pregunta> <respuesta>
import { readFileSync, writeFileSync, appendFileSync, existsSync, mkdirSync } from 'node:fs';
import { productos, categorias } from '../../manual/catalogo/catalogo.mjs';
import { descripcion } from '../../manual/catalogo/descripcion.mjs';

const [n, aplicado = '', cuantos = '10'] = process.argv.slice(2);
if (!n) { console.error('uso: node scripts/gpt/ronda.mjs <n> "<aplicado>" [cuantos]'); process.exit(2); }
const DIR = 'manual/auditorias-gpt';
mkdirSync(DIR, { recursive: true }); // carpeta solo local (ignorada): en un clon nuevo no existe
const hechos = new Set((existsSync(`${DIR}/auditados.txt`) ? readFileSync(`${DIR}/auditados.txt`, 'utf8') : '').split(/\r?\n/).filter((l) => l && !l.startsWith('#')).map((l) => l.split(' ')[0]));
const lote = productos.filter((p) => p.activo !== false && !hechos.has(p.slug)).slice(0, +cuantos);
if (!lote.length) { console.log('No quedan servicios sin auditar.'); process.exit(0); }
const cat = (s) => categorias.find((c) => c.slug === s)?.nombre ?? s;
const pendientes = productos.filter((p) => p.activo !== false && !hechos.has(p.slug)).length;

// La parte común (plazo, modalidades, cómo funciona) es igual en todas: se muestra una vez.
const comun = descripcion(lote.find((p) => p.p.length === 2) ?? lote[0]).split('\n');
const iniComun = comun.findIndex((l) => l.startsWith('**Plazo:**'));
const especifico = (p) => { const l = descripcion(p).split('\n'); return l.slice(0, l.findIndex((x) => x.startsWith('**Plazo:**'))).join('\n').trim(); };

const nn = String(n).padStart(2, '0');
const txt = [
  `Ronda ${n}. Auditoría de servicios: ${lote.length} servicios más (quedan ${pendientes - lote.length} después de esta).`,
  aplicado && `Aplicado de la ronda anterior: ${aplicado}`, '',
  'Te paso cada servicio con la parte específica de su ficha. La parte común de todas las fichas (plazo, tabla de modalidades y «Cómo funciona») va una sola vez al final: ya la auditaste, no la repitas salvo que choque con un servicio concreto.',
  'Para cada servicio devuélveme:',
  '- Decisión: Mantener / Corregir / Fusionar (con cuál) / Retirar',
  '- P0 (bloquea vender o engaña), P1 (confunde o resta conversión), P2 (pulido)',
  '- Si es Corregir: en un bloque de código, el objeto corregido con los campos que cambian (resumen, recibes[], noIncluye[], campos[], ejemplo, muestra, extra, p:[diy, pro], activo), en español de España, sin jerga y sin prometer lo que no podamos cumplir.',
  '- Precio: ¿coherente con el resto y con lo que se entrega en cada modalidad?',
  '- Exclusiones que falten (dominio, hosting, costes externos, cuotas de terceros, textos legales, etc.).',
  'Al final: solapamientos entre estos servicios y con los ya auditados, y los 3 cambios con más impacto. No hace falta preguntar nada a David: decide con lo que hay.', '',
  ...lote.flatMap((p, i) => [
    `=== ${i + 1}. ${p.nombre} ===`,
    `slug: ${p.slug} · categoría: ${cat(p.cat)} · precios: ${p.p.join(' / ')} € · plazo interno: ${p.plazo} · ficha: /products/${p.slug}`, '',
    especifico(p), '']),
  '=== Parte común de todas las fichas ===', comun.slice(iniComun).join('\n').trim(), '',
].filter((x) => x !== false && x !== '' || x === '').join('\n');

const destino = `${DIR}/ronda-${nn}-pregunta.txt`;
// No se pisa una pregunta ya generada (p. ej. si falta auditados.txt en un clon nuevo).
if (existsSync(destino)) { console.error(`${destino} ya existe: bórrala a mano si quieres regenerarla.`); process.exit(1); }
writeFileSync(destino, txt.replace(/\r?\n/g, '\r\n'));
appendFileSync(`${DIR}/auditados.txt`, lote.map((p) => `${p.slug} ${n}\r\n`).join(''));
console.log(`${DIR}/ronda-${nn}-pregunta.txt: ${lote.length} servicios (${lote.map((p) => p.slug).join(', ')}), ${txt.length} caracteres`);

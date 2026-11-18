// Lanza cada consulta de consultas.tsv contra /search de una web servida y escribe un
// «run» TREC (qid Q0 slug rango puntuación etiqueta) con el orden en que salen las fichas.
// Uso: node qa/search/ejecutar.mjs http://127.0.0.1:8790 salida.run
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const [base = 'http://127.0.0.1:8790', salida = 'busqueda.run'] = process.argv.slice(2);
const dir = dirname(fileURLToPath(import.meta.url));
const consultas = readFileSync(join(dir, 'consultas.tsv'), 'utf8')
  .split(/\r?\n/)
  .slice(1)
  .filter(Boolean)
  .map((l) => l.split('\t'));

const PROFUNDIDAD = 20;

// El servidor local limita /search por cliente (SEARCH_RATE_LIMITER). Cada consulta va
// con su propio cf-connecting-ip; si aun así llega un 429, se espera lo que pida.
async function buscar(q, qid) {
  for (let intento = 0; intento < 5; intento++) {
    const res = await fetch(`${base}/search?q=${encodeURIComponent(q)}`, {
      headers: { 'cf-connecting-ip': `10.0.${Number(qid.slice(1)) >> 8}.${Number(qid.slice(1)) & 255}` },
    });
    if (res.ok) return res;
    if (res.status !== 429) throw new Error(`${q}: HTTP ${res.status}`);
    await new Promise((r) => setTimeout(r, 1000 * Number(res.headers.get('retry-after') ?? 10)));
  }
  throw new Error(`${q}: sigue limitada tras 5 intentos`);
}
const lineas = [];
for (const [qid, q] of consultas) {
  const res = await buscar(q, qid);
  const html = await res.text();
  // Solo los resultados de la búsqueda: el relleno «de las mismas categorías» va después
  // del marcador y no cuenta como respuesta del buscador.
  const corte = html.indexOf('data-relleno');
  const zona = corte > 0 ? html.slice(0, corte) : html;
  const slugs = [...new Set([...zona.matchAll(/href="\/products\/([a-z0-9-]+)/g)].map((m) => m[1]))];
  slugs.slice(0, PROFUNDIDAD).forEach((slug, i) => lineas.push(`${qid} Q0 ${slug} ${i + 1} ${PROFUNDIDAD - i} web`));
}
writeFileSync(salida, lineas.join('\n') + '\n');
console.log(`${consultas.length} consultas → ${salida}`);

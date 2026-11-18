import type { D1Database } from '@cloudflare/workers-types';
import type { Product } from './db';
import { normalizeSearchQuery } from '../search/query';
import { stemSpanishTerm, tokenizeSearchTerms } from '../search/stemmer';
import { vocabularioConsultas } from '../search/sinonimos';

// Palabras que no distinguen un producto de otro: «web para mi peluquería» busca
// «web peluquería». Si la consulta solo tiene estas, se usan tal cual.
const VACIAS = new Set([
  'a', 'al', 'busco', 'como', 'con', 'de', 'del', 'el', 'en', 'es', 'la', 'las', 'lo', 'los',
  'me', 'mi', 'mis', 'necesito', 'o', 'para', 'por', 'que', 'quiero', 'se', 'sin', 'su', 'sus',
  'tu', 'tus', 'un', 'una', 'unas', 'uno', 'unos', 'y', 'yo',
]);

/** Quita tildes y diéresis, como hace el tokenizador unicode61 de FTS5. */
export function fold(value: string): string {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
}

/** Términos con significado de la consulta (sin palabras vacías). */
export function contentTerms(query: string): string[] {
  const tokens = tokenizeSearchTerms(normalizeSearchQuery(query));
  const content = tokens.filter((token) => !VACIAS.has(token));
  return content.length > 0 ? content : tokens;
}

/**
 * Prefijos con los que un término casa con el texto indexado. Snowball no siempre
 * recorta: «asistencia» da «asistent», que no es prefijo de la palabra indexada (el
 * índice FTS5 no lematiza), así que se busca también la literal. Y no quita la «s» de
 * algunos plurales («webs» → «webs»), así que se añade el singular.
 */
export function termPrefixes(token: string): string[] {
  const candidates = [stemSpanishTerm(token), token];
  if (token.length > 3 && token.endsWith('s')) candidates.push(token.slice(0, -1));
  const sorted = [...new Set(candidates)].sort((a, b) => a.length - b.length);
  // Un prefijo más corto ya cubre a los que empiezan por él.
  return sorted.filter((prefix, i) => !sorted.slice(0, i).some((shorter) => prefix.startsWith(shorter)));
}

function termQuery(token: string): string {
  const prefixes = termPrefixes(token).map((prefix) => `${prefix}*`);
  return prefixes.length === 1 ? prefixes[0] : `(${prefixes.join(' OR ')})`;
}

/**
 * Turn raw user input into a safe FTS5 MATCH query. FTS5 throws a syntax error
 * on bare special characters (`-`, `"`, `:`, `*`, etc.), so we keep only
 * alphanumeric tokens and prefix-match each one (`tee` → `tee*`). Returns null
 * when there's nothing searchable. `all` exige todos los términos de una variante;
 * `any` vale con uno (para reunir candidatos que luego se ordenan en el Worker).
 */
export function toFtsQuery(raw: string | readonly string[], mode: 'all' | 'any' = 'all'): string | null {
  const queries = typeof raw === 'string' ? [raw] : raw;
  if (mode === 'any') {
    const terms = [...new Set(queries.flatMap(contentTerms).map(termQuery))];
    return terms.length > 0 ? terms.join(' OR ') : null;
  }
  const expressions = [
    ...new Set(
      queries
        .map((query) => {
          const terms = contentTerms(query).map(termQuery);
          if (terms.length === 0) return null;
          // FTS5 no admite AND implícito junto a un grupo entre paréntesis.
          return terms.join(terms.some((t) => t.startsWith('(')) ? ' AND ' : ' ');
        })
        .filter((query): query is string => query !== null),
    ),
  ];
  if (expressions.length === 0) return null;
  // Terms are ANDed within an expression; synonym expressions are ORed together.
  return expressions.length === 1
    ? expressions[0]
    : expressions.map((expression) => `(${expression})`).join(' OR ');
}

function exclusionSql(ids: number[]): string {
  return ids.length > 0 ? ` AND p.id NOT IN (${ids.map(() => '?').join(',')})` : '';
}

// Tope de candidatos que se ordenan en el Worker. El catálogo de una tienda pequeña
// cabe entero; en uno grande, FTS ya entrega los mejores por bm25 antes del corte.
const MAX_CANDIDATES = 500;
// El nombre pesa más que la descripción: «Mantenimiento web» gana a una ficha que
// solo menciona el mantenimiento de pasada.
const BM25 = 'bm25(products_fts, 8.0, 1.0)';

export interface RankedSearch {
  products: Product[];
  /** Fracción de términos que cubre el mejor resultado de cada variante (0–1). */
  coverageByVariant: number[];
}

interface Scored {
  product: Product;
  score: number;
  coverage: number;
  /** Cobertura de la consulta tal cual la escribió el cliente (sin sinónimos). */
  literal: number;
  /** El nombre de la ficha contiene todas las palabras del cliente y empieza por una. */
  literalInName: boolean;
  nameCoverage: number;
  inCategory: boolean;
}

/** Fracción de términos de la consulta que aparecen (por prefijo) en el texto. */
function coverage(terms: string[][], text: string): number {
  if (terms.length === 0) return 0;
  const words = tokenizeSearchTerms(fold(text));
  const hits = terms.filter((prefixes) => words.some((word) => prefixes.some((p) => word.startsWith(p))));
  return hits.length / terms.length;
}

/**
 * Búsqueda ordenada por relevancia. Reúne los productos que casan con alguno de los
 * términos (y los de las categorías que nombra la consulta) y los ordena así:
 * 1) cubren todos los términos y son de la categoría; 2) cubren todos los términos;
 * 3) son de la categoría; 4) el resto (con `categoryFirst`, la categoría antes que
 * la cobertura). Dentro de cada grupo, más términos en el
 * nombre y después bm25. Así «carta qr» da primero las cartas QR y no los QR de
 * campañas, y «mantenimiento web» el mantenimiento y no cualquier web.
 */
export async function rankSearchProducts(
  db: D1Database,
  variants: readonly string[],
  categorySlugs: readonly string[] = [],
  excludeIds: number[] = [],
  categoryFirst = false,
): Promise<RankedSearch> {
  const query = toFtsQuery(variants, 'any');
  if (!query) return { products: [], coverageByVariant: variants.map(() => 0) };

  const textRows = await db
    .prepare(
      `SELECT p.*, ${BM25} AS search_score
         FROM products_fts
         JOIN products p ON p.id = products_fts.rowid
        WHERE products_fts MATCH ? AND p.active = 1${exclusionSql(excludeIds)}
        ORDER BY search_score
        LIMIT ?`,
    )
    .bind(query, ...excludeIds, MAX_CANDIDATES)
    .all<Product & { search_score: number }>();

  const categoryIds = new Set<number>();
  const categoryOnly: Product[] = [];
  if (categorySlugs.length > 0) {
    const marks = categorySlugs.map(() => '?').join(',');
    const rows = await db
      .prepare(
        `SELECT DISTINCT p.*
           FROM products p
           JOIN product_categories pc ON pc.product_id = p.id
           JOIN categories c ON c.id = pc.category_id
          WHERE c.slug IN (${marks}) AND p.active = 1${exclusionSql(excludeIds)}
          ORDER BY p.id
          LIMIT ?`,
      )
      .bind(...categorySlugs, ...excludeIds, MAX_CANDIDATES)
      .all<Product>();
    for (const product of rows.results ?? []) {
      categoryIds.add(product.id);
      categoryOnly.push(product);
    }
  }

  const variantTerms = variants.map((variant) =>
    contentTerms(variant).map((term) => termPrefixes(term).map(fold)),
  );
  const coverageByVariant = variants.map(() => 0);
  const seen = new Set<number>();
  const scored: Scored[] = [];
  const add = (product: Product, score: number) => {
    if (seen.has(product.id)) return;
    seen.add(product.id);
    let best = 0;
    let bestName = 0;
    variantTerms.forEach((terms, i) => {
      const all = coverage(terms, `${product.name} ${product.description ?? ''}`);
      const name = coverage(terms, product.name);
      coverageByVariant[i] = Math.max(coverageByVariant[i], all);
      if (all > best || (all === best && name > bestName)) {
        best = all;
        bestName = name;
      }
    });
    const literal = variantTerms.length > 0 ? coverage(variantTerms[0], `${product.name} ${product.description ?? ''}`) : 0;
    const head = tokenizeSearchTerms(fold(product.name))[0] ?? '';
    const literalInName =
      variantTerms.length > 0 &&
      coverage(variantTerms[0], product.name) === 1 &&
      variantTerms[0].some((prefixes) => prefixes.some((p) => head.startsWith(p)));
    scored.push({ product, score, coverage: best, literal, literalInName, nameCoverage: bestName, inCategory: categoryIds.has(product.id) });
  };
  for (const { search_score, ...product } of textRows.results ?? []) add(product as Product, search_score);
  for (const product of categoryOnly) add(product, Number.POSITIVE_INFINITY);

  // Si la categoría explica toda la consulta («bodas», «restaurante») es la mejor
  // respuesta y va delante; si solo explica una parte («carta qr»), manda el texto.
  // Fuera de la categoría solo se adelanta la ficha que trata de eso: su nombre empieza
  // por las palabras del cliente («facturas» → «Facturas recibidas a hoja de cálculo»).
  // La que solo las menciona («Diplomas para eventos», «un dossier útil para bodas») o
  // casa por sinónimo va después de la categoría.
  const tier = categoryFirst
    ? (s: Scored) =>
        s.inCategory && s.coverage === 1 ? 0 : s.literalInName ? 1 : s.inCategory ? 2 : s.coverage === 1 ? 3 : 4
    : (s: Scored) => (s.coverage === 1 ? 0 : s.inCategory ? 1 : 2);
  // Dentro de la categoría que explica la consulta manda el orden del catálogo (la
  // ficha principal primero); fuera, bm25.
  const curated = (a: Scored, b: Scored) =>
    categoryFirst && a.inCategory && b.inCategory ? a.product.id - b.product.id : a.score - b.score;
  scored.sort(
    (a, b) =>
      tier(a) - tier(b) ||
      b.nameCoverage - a.nameCoverage ||
      b.literal - a.literal ||
      Number(b.inCategory) - Number(a.inCategory) ||
      b.coverage - a.coverage ||
      curated(a, b) ||
      a.product.id - b.product.id,
  );
  return { products: scored.map((s) => s.product), coverageByVariant };
}

/** Levenshtein edit distance between two strings. */
export function editDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const curr = [i];
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    prev = curr;
  }
  return prev[n];
}

/**
 * Palabras conocidas, sin tildes: las de los productos activos (nombre y
 * descripción) y las que el buscador ya entiende por sinónimo o categoría.
 */
async function knownWords(db: D1Database): Promise<Map<string, string>> {
  const { results } = await db
    .prepare('SELECT name, description FROM products WHERE active = 1')
    .all<{ name: string; description: string | null }>();
  const words = new Map<string, string>();
  const texts = (results ?? []).map((r) => `${r.name} ${r.description ?? ''}`);
  for (const word of [...vocabularioConsultas(), ...texts.flatMap((text) => tokenizeSearchTerms(text))]) {
    const key = fold(word);
    if (key.length >= 3 && !words.has(key)) words.set(key, word);
  }
  return words;
}

/**
 * When a search finds nothing, propose a corrected query by snapping each token
 * to the nearest known word within a small edit distance («pelukeria» →
 * «peluquería»). Returns null if no token is improved. Runs in the Worker (no
 * spellfix1 needed on D1).
 */
export async function suggestQuery(db: D1Database, raw: string): Promise<string | null> {
  const tokens = tokenizeSearchTerms(raw);
  if (!tokens || tokens.length === 0) return null;
  const vocab = await knownWords(db);
  if (vocab.size === 0) return null;
  const known = new Set([...vocab.keys()].map(stemSpanishTerm));

  let changed = false;
  const corrected = tokens.map((tok) => {
    const key = fold(tok);
    if (VACIAS.has(tok) || vocab.has(key) || known.has(stemSpanishTerm(key))) return tok;
    let best = tok;
    let bestDist = Infinity;
    for (const [candidate, word] of vocab) {
      if (Math.abs(candidate.length - key.length) > 2) continue;
      const d = editDistance(key, candidate);
      if (d < bestDist) {
        bestDist = d;
        best = word;
      }
    }
    const maxDist = key.length <= 4 ? 1 : 2;
    if (best !== tok && bestDist <= maxDist) {
      changed = true;
      return best;
    }
    return tok;
  });

  return changed ? corrected.join(' ') : null;
}

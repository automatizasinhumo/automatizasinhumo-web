import type { D1Database } from '@cloudflare/workers-types';
import type { Product } from './db';
import { normalizeSearchQuery } from '../search/query';
import { stemSpanishTerm, tokenizeSearchTerms } from '../search/stemmer';

/**
 * Turn raw user input into a safe FTS5 MATCH query. FTS5 throws a syntax error
 * on bare special characters (`-`, `"`, `:`, `*`, etc.), so we keep only
 * alphanumeric tokens and prefix-match each one (`tee` → `tee*`). Returns null
 * when there's nothing searchable.
 */
export function toFtsQuery(raw: string | readonly string[]): string | null {
  const queries = typeof raw === 'string' ? [raw] : raw;
  const expressions = [
    ...new Set(
      queries
        .map((query) => {
          const terms = tokenizeSearchTerms(normalizeSearchQuery(query)).map(termQuery);
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

/**
 * Snowball no siempre recorta: «asistencia» da «asistent», que no es prefijo de la
 * palabra indexada (el índice FTS5 no lematiza). Entonces se busca también la literal.
 */
function termQuery(token: string): string {
  const stem = stemSpanishTerm(token);
  return token.startsWith(stem) ? `${stem}*` : `(${stem}* OR ${token}*)`;
}

function exclusionSql(ids: number[]): string {
  return ids.length > 0 ? ` AND p.id NOT IN (${ids.map(() => '?').join(',')})` : '';
}

function categoryResultsSql(categorySlug: string | null): string {
  if (!categorySlug) return '';
  return `UNION
      SELECT pc.product_id AS id
        FROM product_categories pc
        JOIN categories c ON c.id = pc.category_id
       WHERE c.slug = ?`;
}

function categoryMatchSql(): string {
  return `p.id IN (
    SELECT pc.product_id
      FROM product_categories pc
      JOIN categories c ON c.id = pc.category_id
     WHERE c.slug = ?
  )`;
}

/** Count active FTS matches, optionally excluding results supplied elsewhere. */
export async function countSearchProducts(
  db: D1Database,
  raw: string | readonly string[],
  excludeIds: number[] = [],
  categorySlug: string | null = null,
): Promise<number> {
  const query = toFtsQuery(raw);
  if (!query) return 0;

  const bindings: (string | number)[] = [query];
  if (categorySlug) bindings.push(categorySlug);
  bindings.push(...excludeIds);
  const row = await db
    .prepare(
      `WITH matching_ids AS (
         SELECT rowid AS id FROM products_fts WHERE products_fts MATCH ?
         ${categoryResultsSql(categorySlug)}
       )
       SELECT COUNT(*) AS n
         FROM matching_ids m
         JOIN products p ON p.id = m.id
        WHERE p.active = 1${exclusionSql(excludeIds)}`,
    )
    .bind(...bindings)
    .first<{ n: number }>();
  return row?.n ?? 0;
}

/** One page of active FTS matches, ranked by relevance (bm25). */
export async function searchProducts(
  db: D1Database,
  raw: string | readonly string[],
  limit = 50,
  offset = 0,
  excludeIds: number[] = [],
  categorySlug: string | null = null,
): Promise<Product[]> {
  const query = toFtsQuery(raw);
  if (!query || limit <= 0) return [];

  const pageSize = limit + offset;
  const textBindings: (string | number)[] = [query, ...excludeIds, pageSize];
  const textResults = await db
    .prepare(
      `SELECT p.*
         FROM products_fts
         JOIN products p ON p.id = products_fts.rowid
        WHERE products_fts MATCH ? AND p.active = 1${exclusionSql(excludeIds)}
        ORDER BY bm25(products_fts)
        LIMIT ?`,
    )
    .bind(...textBindings)
    .all<Product>();
  if (!categorySlug) return (textResults.results ?? []).slice(offset);

  const categoryBindings: (string | number)[] = [query, categorySlug, ...excludeIds, pageSize];
  const categoryMatches = await db
    .prepare(
      `SELECT p.*
         FROM products_fts
         JOIN products p ON p.id = products_fts.rowid
        WHERE products_fts MATCH ? AND p.active = 1 AND ${categoryMatchSql()}${exclusionSql(excludeIds)}
        ORDER BY bm25(products_fts)
        LIMIT ?`,
    )
    .bind(...categoryBindings)
    .all<Product>();
  const categoryProducts = await db
    .prepare(
      `SELECT p.*
         FROM products p
         JOIN product_categories pc ON pc.product_id = p.id
         JOIN categories c ON c.id = pc.category_id
        WHERE c.slug = ? AND p.active = 1${exclusionSql(excludeIds)}
        ORDER BY p.id
        LIMIT ?`,
    )
    .bind(categorySlug, ...excludeIds, pageSize)
    .all<Product>();

  const matched = categoryMatches.results ?? [];
  const matchedIds = new Set(matched.map((product) => product.id));
  const prioritized = [
    ...matched,
    ...(categoryProducts.results ?? []).filter((product) => !matchedIds.has(product.id)),
  ];
  const prioritizedIds = new Set(prioritized.map((product) => product.id));
  const combined = [
    ...prioritized,
    ...(textResults.results ?? []).filter((product) => !prioritizedIds.has(product.id)),
  ];
  return combined.slice(offset, offset + limit);
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

/** Distinct Snowball stems from active products' name + description. */
async function productVocabulary(db: D1Database): Promise<Map<string, string>> {
  const { results } = await db
    .prepare('SELECT name, description FROM products WHERE active = 1')
    .all<{ name: string; description: string | null }>();
  const words = new Map<string, string>();
  for (const r of results ?? []) {
    for (const word of tokenizeSearchTerms(`${r.name} ${r.description ?? ''}`)) {
      const stem = stemSpanishTerm(word);
      if (stem.length >= 3 && !words.has(stem)) words.set(stem, word);
    }
  }
  return words;
}

/**
 * When a search finds nothing, propose a corrected query by snapping each token
 * to the nearest product word within a small edit distance. Returns null if no
 * token is improved. Runs in the Worker (no spellfix1 needed on D1).
 */
export async function suggestQuery(db: D1Database, raw: string): Promise<string | null> {
  const tokens = tokenizeSearchTerms(raw);
  if (!tokens || tokens.length === 0) return null;
  const vocab = await productVocabulary(db);
  if (vocab.size === 0) return null;

  let changed = false;
  const corrected = tokens.map((tok) => {
    const stem = stemSpanishTerm(tok);
    if (vocab.has(stem)) return tok;
    let best = tok;
    let bestStem = stem;
    let bestDist = Infinity;
    for (const [candidateStem, word] of vocab) {
      if (Math.abs(candidateStem.length - stem.length) > 2) continue;
      const d = editDistance(stem, candidateStem);
      if (d < bestDist) {
        bestDist = d;
        best = word;
        bestStem = candidateStem;
      }
    }
    const maxDist = stem.length <= 4 ? 1 : 2;
    if (bestStem !== stem && bestDist <= maxDist) {
      changed = true;
      return best;
    }
    return tok;
  });

  return changed ? corrected.join(' ') : null;
}

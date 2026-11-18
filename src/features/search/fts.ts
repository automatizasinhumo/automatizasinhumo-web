import type { D1Database } from '@cloudflare/workers-types';
import type { SearchProvider, SearchResult } from './provider';
import { contentTerms, rankSearchProducts, suggestQuery, type RankedSearch } from '../products/search';
import { normalizeSearchQuery } from './query';
import { categoriasPara, expandirSinonimos } from './sinonimos';

/**
 * Keyword search (SQLite FTS5) with typo-correction fallback — the default
 * backend: $0, fully local, exact-match-friendly. Encapsulates the "search → if
 * nothing covers the query, suggest a correction → search again" flow.
 */
export function createFtsSearch(db: D1Database): SearchProvider {
  function variantsFor(query: string): string[] {
    const synonym = expandirSinonimos(query);
    return synonym ? [query, synonym] : [query];
  }

  function categoriesFor(queries: string[]): string[] {
    return [...new Set(queries.flatMap(categoriasPara))];
  }

  /** Hay una categoría que explica todos los términos de alguna variante. */
  function categoryCoversQuery(queries: string[]): boolean {
    return queries.some((variant) => {
      const perTerm = contentTerms(variant).map(categoriasPara);
      return perTerm.length > 0 && perTerm[0].some((slug) => perTerm.every((cats) => cats.includes(slug)));
    });
  }

  async function run(query: string, excludeIds: number[]): Promise<RankedSearch & { variants: string[] }> {
    const variants = variantsFor(query);
    const ranked = await rankSearchProducts(
      db,
      variants,
      categoriesFor(variants),
      excludeIds,
      categoryCoversQuery(variants),
    );
    return { ...ranked, variants };
  }

  return {
    async search(query, options = {}): Promise<SearchResult> {
      const normalized = normalizeSearchQuery(query);
      if (!normalized) return { products: [], total: 0, correctedTo: null };
      const limit = Math.max(0, Math.trunc(options.limit ?? 50));
      const offset = Math.max(0, Math.trunc(options.offset ?? 0));
      const excludeIds = options.excludeIds ?? [];

      let result = await run(normalized, excludeIds);
      let correctedTo: string | null = null;
      const best = Math.max(0, ...result.coverageByVariant);
      // Si ninguna ficha cubre la consulta entera, quizá hay una errata («pelukeria»).
      if (best < 1) {
        const suggestion = await suggestQuery(db, normalized);
        if (suggestion) {
          const corrected = await run(suggestion, excludeIds);
          if (Math.max(0, ...corrected.coverageByVariant) > best) {
            result = corrected;
            correctedTo = suggestion;
          }
        }
      }
      // Sin nada literal, lo hallado viene del sinónimo: se dice qué se ha buscado.
      if (!correctedTo && result.variants.length > 1 && result.coverageByVariant[0] === 0 && result.products.length > 0) {
        correctedTo = result.variants[1];
      }
      return {
        products: result.products.slice(offset, offset + limit),
        total: result.products.length,
        correctedTo,
      };
    },
  };
}

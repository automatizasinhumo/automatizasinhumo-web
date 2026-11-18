import type { D1Database } from '@cloudflare/workers-types';
import type { SearchProvider, SearchResult } from './provider';
import { countSearchProducts, searchProducts, suggestQuery } from '../products/search';
import { normalizeSearchQuery } from './query';
import { categoriasPara, expandirSinonimos } from './sinonimos';

/**
 * Keyword search (SQLite FTS5) with typo-correction fallback — the default
 * backend: $0, fully local, exact-match-friendly. Encapsulates the "search → if
 * empty, suggest a correction → search again" flow the /search page used inline.
 */
export function createFtsSearch(db: D1Database): SearchProvider {
  function variantsFor(query: string): string[] {
    const synonym = expandirSinonimos(query);
    return synonym ? [query, synonym] : [query];
  }

  function categoryFor(queries: string[]): string | null {
    const categories = queries.flatMap(categoriasPara);
    return categories[categories.length - 1] ?? null;
  }

  return {
    async search(query, options = {}): Promise<SearchResult> {
      const normalized = normalizeSearchQuery(query);
      if (!normalized) return { products: [], total: 0, correctedTo: null };
      const limit = Math.max(0, Math.trunc(options.limit ?? 50));
      const offset = Math.max(0, Math.trunc(options.offset ?? 0));
      const excludeIds = options.excludeIds ?? [];
      const variants = variantsFor(normalized);
      const category = categoryFor(variants);
      const directTotal = await countSearchProducts(db, normalized);
      const total = await countSearchProducts(db, variants, excludeIds, category);
      if (total > 0) {
        const products = await searchProducts(db, variants, limit, offset, excludeIds, category);
        const correctedTo = directTotal === 0 && variants.length > 1 ? variants[1] : null;
        return { products, total, correctedTo };
      }

      const suggestion = await suggestQuery(db, normalized);
      if (suggestion) {
        const correctedVariants = variantsFor(suggestion);
        const correctedCategory = categoryFor(correctedVariants);
        const correctedTotal = await countSearchProducts(
          db,
          correctedVariants,
          [],
          correctedCategory,
        );
        if (correctedTotal > 0) {
          const total =
            excludeIds.length > 0
              ? await countSearchProducts(
                  db,
                  correctedVariants,
                  excludeIds,
                  correctedCategory,
                )
              : correctedTotal;
          const products = await searchProducts(
            db,
            correctedVariants,
            limit,
            offset,
            excludeIds,
            correctedCategory,
          );
          return { products, total, correctedTo: suggestion };
        }
      }
      return { products: [], total: 0, correctedTo: null };
    },
  };
}

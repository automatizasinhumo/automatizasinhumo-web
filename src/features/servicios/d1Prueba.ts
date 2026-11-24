// Solo para tests: D1 sobre node:sqlite con las migraciones reales.
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import type { D1Database } from '@cloudflare/workers-types';

/** D1 mínimo sobre SQLite de Node con las migraciones reales, con lote transaccional como D1. */
export function d1(migraciones: string[], extra = ''): D1Database & { sql: DatabaseSync } {
  const sql = new DatabaseSync(':memory:');
  if (extra) sql.exec(extra);
  for (const m of migraciones) sql.exec(readFileSync(new URL(`../../../migrations/${m}`, import.meta.url), 'utf8'));
  const prep = (q: string, args: unknown[] = []) => {
    const a = args as (string | number | null)[];
    const st = () => sql.prepare(q);
    return {
      bind: (...nuevos: unknown[]) => prep(q, nuevos),
      first: async () => (st().get(...a) as unknown) ?? null,
      all: async () => ({ results: st().all(...a) }),
      run: async () => ({ meta: { changes: Number(st().run(...a).changes) } }),
      todo: () => ({ results: st().all(...a) }),
    };
  };
  const batch = async (ps: ReturnType<typeof prep>[]) => {
    sql.exec('BEGIN');
    try {
      const r = ps.map((p) => p.todo());
      sql.exec('COMMIT');
      return r;
    } catch (e) {
      sql.exec('ROLLBACK');
      throw e;
    }
  };
  return { sql, prepare: (q: string) => prep(q), batch } as unknown as D1Database & { sql: DatabaseSync };
}

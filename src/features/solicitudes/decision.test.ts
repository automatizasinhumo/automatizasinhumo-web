import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { describe, expect, it } from 'vitest';
import type { D1Database } from '@cloudflare/workers-types';
import { signToken } from '../auth/token';
import { decidir, firmadorDecision, leerDecision, TTL_DECISION } from './decision';

function d1(): D1Database & { sql: DatabaseSync } {
  const sql = new DatabaseSync(':memory:');
  for (const m of ['0040_solicitudes.sql', '0041_solicitudes_pedido.sql']) {
    sql.exec(readFileSync(new URL(`../../../migrations/${m}`, import.meta.url), 'utf8'));
  }
  const prep = (q: string, args: unknown[] = []) => {
    const st = sql.prepare(q);
    const a = args as (string | number | null)[];
    return {
      bind: (...n: unknown[]) => prep(q, n),
      first: async () => (st.get(...a) as unknown) ?? null,
      run: async () => ({ meta: { changes: Number(st.run(...a).changes) } }),
    };
  };
  return { sql, prepare: (q: string) => prep(q) } as unknown as D1Database & { sql: DatabaseSync };
}

function alta(db: ReturnType<typeof d1>, id: string, estado: string, nota: string | null) {
  db.sql
    .prepare(`INSERT INTO solicitudes (public_id, slug, nombre, email, campos, estado, nota) VALUES (?, 'web', 'Ana', 'ana@example.es', '{}', ?, ?)`)
    .run(id, estado, nota);
}
const fila = (db: ReturnType<typeof d1>, id: string) =>
  db.sql.prepare('SELECT estado, nota FROM solicitudes WHERE public_id = ?').get(id) as { estado: string; nota: string };

const SECRETO = 'secreto-de-prueba-0123456789abcdef';
const AHORA = Date.UTC(2026, 10, 19, 15);

describe('enlace de decisión', () => {
  it('firma y lee el id; caduca y rechaza otros secretos', async () => {
    const firmar = firmadorDecision('https://tienda.example/', SECRETO, AHORA)!;
    const url = (await firmar('S-ABC12345'))!;
    expect(url).toMatch(/^https:\/\/tienda\.example\/empezar\/revision\?t=/);
    const t = new URL(url).searchParams.get('t');
    expect(await leerDecision(t, SECRETO, AHORA)).toBe('S-ABC12345');
    expect(await leerDecision(t, 'otro-secreto-0123456789abcdef0123', AHORA)).toBeNull();
    expect(await leerDecision(t, SECRETO, AHORA + (TTL_DECISION + 86400) * 1000)).toBeNull();
    // Mismo día → mismo enlace (cuerpo estable para los reintentos del correo).
    expect(await firmadorDecision('https://tienda.example', SECRETO, AHORA + 3600_000)!('S-ABC12345')).toBe(url);
  });

  it('no acepta un token de login (payload sin prefijo) ni orígenes no https', async () => {
    const login = await signToken('ana@example.es', SECRETO, 600, AHORA / 1000);
    expect(await leerDecision(login, SECRETO, AHORA)).toBeNull();
    expect(firmadorDecision('http://localhost:4321', SECRETO)).toBeNull();
    expect(firmadorDecision('https://tienda.example', undefined)).toBeNull();
  });
});

describe('decidir', () => {
  it('aprueba solo si espera decisión y conserva la nota anterior', async () => {
    const db = d1();
    alta(db, 'S-1', 'vista_previa_enviada', 'Vista previa automática: https://x · QA ok');
    expect(await decidir(db, 'S-1', 'aprobar', '')).toBe(true);
    expect(fila(db, 'S-1').estado).toBe('aprobada');
    expect(fila(db, 'S-1').nota).toMatch(/^Aprobada por el cliente[\s\S]*QA ok$/);
    // Segundo envío: ya no está esperando.
    expect(await decidir(db, 'S-1', 'cambios', 'otro color')).toBe(false);
    expect(fila(db, 'S-1').estado).toBe('aprobada');
  });

  it('pide cambios desde la espera y exige texto', async () => {
    const db = d1();
    alta(db, 'S-2', 'en_espera_cliente', null);
    expect(await decidir(db, 'S-2', 'cambios', '   ')).toBe(false);
    expect(await decidir(db, 'S-2', 'cambios', 'Logo más grande')).toBe(true);
    expect(fila(db, 'S-2')).toEqual({ estado: 'cambios_pedidos', nota: 'Cambios pedidos por el cliente:\nLogo más grande' });
  });

  it('no toca solicitudes en otros estados', async () => {
    const db = d1();
    alta(db, 'S-3', 'en_preparacion', null);
    expect(await decidir(db, 'S-3', 'aprobar', '')).toBe(false);
    expect(fila(db, 'S-3').estado).toBe('en_preparacion');
  });
});

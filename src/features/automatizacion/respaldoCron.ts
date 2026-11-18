/**
 * Respaldo de los `on: schedule` de GitHub Actions desde el cron del Worker.
 *
 * Desde que el repo existe (16/11/2026), GitHub no ha disparado ni un solo
 * evento `schedule`; push, pull_request y workflow_dispatch sí funcionan. El cron
 * de Cloudflare (cada 5 minutos, ver `src/worker.ts`) es fiable, así que lanza
 * los mismos workflows con la API oficial de `workflow_dispatch`:
 * https://docs.github.com/en/rest/actions/workflows#create-a-workflow-dispatch-event
 *
 * Solo actúa si la instancia tiene `GITHUB_DISPATCH_TOKEN` (secreto, token
 * fine-grained con Actions: write en un único repo) y `GITHUB_DISPATCH_REPO`
 * (`dueño/repo`). Sin ellos no hace nada: cualquier otra tienda minshop queda igual.
 *
 * Cada workflow tiene un periodo (la franja de 15 minutos de la fábrica, la semana
 * de los semanales) y una marca en D1. Antes de lanzar se reclama de forma atómica
 * con `periodo@franja` (reserva); si GitHub acepta, pasa a `periodo@~` (hecho).
 * Así un tick repetido no despacha dos veces. Si GitHub rechaza el envío se suelta
 * la reserva, y si el Worker muere a medias la reserva caduca a los 30 minutos: en
 * ambos casos el siguiente tick lo reintenta. Un envío aceptado cuya respuesta se
 * pierde puede repetirse una vez (al menos una vez, nunca ninguna).
 */

import type { D1Database } from '@cloudflare/workers-types';

export interface Programado {
  workflow: string;
  inputs?: Record<string, string>;
  /** Periodo al que pertenece este tick, o null si en este tick no toca. */
  periodo: (cuando: Date) => string | null;
}

/** Franja de 5 minutos del tick, en UTC: `YYYY-MM-DDTHH:MM`. Ordena como texto. */
export function franja(cuando: Date): string {
  const d = new Date(cuando);
  d.setUTCMinutes(Math.floor(d.getUTCMinutes() / 5) * 5, 0, 0);
  return d.toISOString().slice(0, 16);
}

const LUNES_0620_MS = (6 * 60 + 20) * 60 * 1000;
const SEMANA_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Semana del tick: el último lunes a las 06:20 UTC (junto a los cron semanales del
 * repo, 06:19 y 06:43). Toda la semana pertenece a ese periodo, así un fallo del
 * lunes se reintenta en los ticks siguientes en vez de esperar siete días.
 */
export function semana(cuando: Date): string {
  const dia = new Date(Date.UTC(cuando.getUTCFullYear(), cuando.getUTCMonth(), cuando.getUTCDate()));
  dia.setUTCDate(dia.getUTCDate() - ((dia.getUTCDay() + 6) % 7)); // lunes de esta semana
  let inicio = dia.getTime() + LUNES_0620_MS;
  if (cuando.getTime() < inicio) inicio -= SEMANA_MS;
  return new Date(inicio).toISOString().slice(0, 16);
}

/** Cada 15 minutos (05, 20, 35, 50), como `7-59/15` en el workflow. */
const cadaQuinceMinutos = (cuando: Date) => {
  const f = franja(cuando);
  return Number(f.slice(14)) % 15 === 5 ? f : null;
};

export const PROGRAMADOS: Programado[] = [
  { workflow: 'fabrica-vistas-previas.yml', inputs: { max: '3' }, periodo: cadaQuinceMinutos },
  { workflow: 'empleados-qa.yml', periodo: semana },
  { workflow: 'seguridad.yml', periodo: semana },
  { workflow: 'empleados-semanales.yml', periodo: semana },
  { workflow: 'vigilantes-cadena.yml', periodo: semana },
];

/** Marcas por workflow: `periodo@franja` (reservado) o `periodo@~` (hecho). */
export interface Marcas {
  leer(): Promise<Record<string, string>>;
  /** Escribe `valor` solo si el guardado es menor (como texto); true si lo escribió. */
  reclamar(workflow: string, valor: string): Promise<boolean>;
  /** Cambia `actual` por `nuevo` (o lo borra si `nuevo` es undefined) solo si sigue siendo `actual`. */
  cambiar(workflow: string, actual: string, nuevo: string | undefined): Promise<void>;
}

const HECHO = '~'; // ordena después de cualquier franja: un hecho no se puede volver a reclamar
const RESERVA_MS = 30 * 60 * 1000;

/** Workflows que tocan en este tick y no están hechos ni reservados en su periodo. */
export function pendientes(cuando: Date, marcas: Record<string, string>) {
  const lista: { programado: Programado; periodo: string }[] = [];
  const caducada = franja(new Date(cuando.getTime() - RESERVA_MS));
  for (const programado of PROGRAMADOS) {
    const periodo = programado.periodo(cuando);
    if (!periodo) continue;
    const [hecho, estado] = (marcas[programado.workflow] ?? '').split('@');
    const libre = !hecho || hecho < periodo || (hecho === periodo && estado !== HECHO && estado <= caducada);
    if (libre) lista.push({ programado, periodo });
  }
  return lista;
}

const PREFIJO = 'cron_dispatch:';

/** Marcas en la tabla `settings` (claves `cron_dispatch:<workflow>`), sin migración. */
export function marcasD1(db: D1Database): Marcas {
  return {
    async leer() {
      const { results } = await db
        .prepare("SELECT key, value FROM settings WHERE key LIKE 'cron\\_dispatch:%' ESCAPE '\\'")
        .all<{ key: string; value: string }>();
      return Object.fromEntries(results.map((r) => [r.key.slice(PREFIJO.length), r.value]));
    },
    async reclamar(workflow, valor) {
      const r = await db
        .prepare(
          `INSERT INTO settings (key, value) VALUES (?, ?)
           ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')
           WHERE settings.value < excluded.value`,
        )
        .bind(PREFIJO + workflow, valor)
        .run();
      return (r.meta?.changes ?? 0) === 1;
    },
    async cambiar(workflow, actual, nuevo) {
      // Solo si la marca sigue siendo la nuestra: no pisar la de otro tick.
      const q =
        nuevo === undefined
          ? db.prepare('DELETE FROM settings WHERE key = ? AND value = ?').bind(PREFIJO + workflow, actual)
          : db
              .prepare("UPDATE settings SET value = ?, updated_at = datetime('now') WHERE key = ? AND value = ?")
              .bind(nuevo, PREFIJO + workflow, actual);
      await q.run();
    },
  };
}

const REPO_VALIDO = /^[A-Za-z0-9-]+\/[A-Za-z0-9._-]+$/;

export async function lanzarProgramados(
  cuando: Date,
  token: string | undefined,
  repo: string | undefined,
  marcas: Marcas,
  pedir: typeof fetch = fetch,
): Promise<{ lanzados: string[]; fallidos: string[] }> {
  const resultado = { lanzados: [] as string[], fallidos: [] as string[] };
  if (!token || !repo) return resultado;
  if (!REPO_VALIDO.test(repo)) {
    console.error('GITHUB_DISPATCH_REPO no tiene la forma dueño/repo');
    return resultado;
  }
  // Solo los ticks de la fábrica (uno de cada tres) leen las marcas; los semanales
  // pendientes se recogen en ellos. El lunes 06:20 también es tick de la fábrica.
  if (!cadaQuinceMinutos(cuando)) return resultado;
  const guardadas = await marcas.leer();
  for (const { programado, periodo } of pendientes(cuando, guardadas)) {
    const { workflow, inputs } = programado;
    const reserva = `${periodo}@${franja(cuando)}`;
    if (!(await marcas.reclamar(workflow, reserva))) continue; // otro tick ya lo tiene
    let ok = false;
    try {
      const r = await pedir(
        `https://api.github.com/repos/${repo}/actions/workflows/${workflow}/dispatches`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${token}`,
            'X-GitHub-Api-Version': '2022-11-28',
            'User-Agent': 'minshop-cron',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ref: 'main', ...(inputs ? { inputs } : {}) }),
        },
      );
      // 204 sin cuerpo; 200 con el id del run en versiones recientes de la API.
      ok = r.ok;
      // Solo el estado: el cuerpo de error no aporta y nunca se registra el token.
      if (!ok) console.error(`workflow_dispatch ${workflow}: HTTP ${r.status}`);
    } catch (err) {
      console.error(`workflow_dispatch ${workflow} falló:`, err instanceof Error ? err.message : 'error');
    }
    if (ok) {
      resultado.lanzados.push(workflow);
      await marcas.cambiar(workflow, reserva, `${periodo}@${HECHO}`);
    } else {
      resultado.fallidos.push(workflow);
      await marcas.cambiar(workflow, reserva, guardadas[workflow]);
    }
  }
  return resultado;
}

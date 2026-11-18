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
 * Si los cron de GitHub vuelven, un workflow puede correr dos veces en la misma
 * franja; la fábrica tiene `concurrency` y los semanales son idempotentes.
 */

export interface Programado {
  workflow: string;
  inputs?: Record<string, string>;
}

/** Ticks del cron del Worker: minutos múltiplos de 5 (`*\/5 * * * *`). */
const FABRICA: Programado = { workflow: 'fabrica-vistas-previas.yml', inputs: { max: '3' } };
const SEMANALES: Programado[] = [
  { workflow: 'empleados-qa.yml' },
  { workflow: 'seguridad.yml' },
  { workflow: 'empleados-semanales.yml' },
  { workflow: 'vigilantes-cadena.yml' },
];

/**
 * Workflows que tocan en este tick. Un tick se identifica por su minuto
 * redondeado a 5, así un cron que llega con algo de retraso cae en su franja.
 */
export function programadosEn(cuando: Date): Programado[] {
  const minuto = Math.floor(cuando.getUTCMinutes() / 5) * 5;
  const debidos: Programado[] = [];
  // Cada 15 minutos (05, 20, 35, 50), como `7-59/15` en el workflow.
  if (minuto % 15 === 5) debidos.push(FABRICA);
  // Lunes a las 06:20 UTC, junto a los cron semanales del repo (06:19 y 06:43).
  if (cuando.getUTCDay() === 1 && cuando.getUTCHours() === 6 && minuto === 20) {
    debidos.push(...SEMANALES);
  }
  return debidos;
}

const REPO_VALIDO = /^[A-Za-z0-9-]+\/[A-Za-z0-9._-]+$/;

export async function lanzarProgramados(
  cuando: Date,
  token: string | undefined,
  repo: string | undefined,
  pedir: typeof fetch = fetch,
): Promise<{ lanzados: string[]; fallidos: string[] }> {
  const resultado = { lanzados: [] as string[], fallidos: [] as string[] };
  if (!token || !repo) return resultado;
  if (!REPO_VALIDO.test(repo)) {
    console.error('GITHUB_DISPATCH_REPO no tiene la forma dueño/repo');
    return resultado;
  }
  for (const { workflow, inputs } of programadosEn(cuando)) {
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
      if (r.ok) resultado.lanzados.push(workflow);
      else {
        resultado.fallidos.push(workflow);
        // Solo el estado: el cuerpo de error no aporta y nunca se registra el token.
        console.error(`workflow_dispatch ${workflow}: HTTP ${r.status}`);
      }
    } catch (err) {
      resultado.fallidos.push(workflow);
      console.error(`workflow_dispatch ${workflow} falló:`, err instanceof Error ? err.message : 'error');
    }
  }
  return resultado;
}

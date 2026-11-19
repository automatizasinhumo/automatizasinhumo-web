import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { esBot, leerEvento, registrar } from '../../features/embudo';

export const prerender = false;

// Recibe el sendBeacon del embudo (ver Layout). Siempre 204: quien lo llame no
// aprende nada (ni si se ha contado ni por qué no). El middleware ya rechaza los
// POST de otro origen.
const MAX_BYTES = 2048;

/** Lee como mucho MAX_BYTES del cuerpo; si hay más, corta la lectura y devuelve ''. */
async function cuerpoLimitado(request: Request): Promise<string> {
  const lector = request.body?.getReader();
  if (!lector) return '';
  const trozos: Uint8Array[] = [];
  let total = 0;
  try {
    for (;;) {
      const { done, value } = await lector.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_BYTES) {
        await lector.cancel().catch(() => {});
        return '';
      }
      trozos.push(value);
    }
  } catch {
    return '';
  }
  const todo = new Uint8Array(total);
  let i = 0;
  for (const t of trozos) {
    todo.set(t, i);
    i += t.byteLength;
  }
  return new TextDecoder().decode(todo);
}

const vacio = () => new Response(null, { status: 204, headers: { 'cache-control': 'no-store' } });

export const POST: APIRoute = async ({ request, url }) => {
  if (esBot(request.headers.get('user-agent'))) return vacio();
  const evento = leerEvento(await cuerpoLimitado(request), url.hostname);
  if (!evento) return vacio();
  try {
    await registrar(env.DB, evento, new Date().toISOString().slice(0, 10));
  } catch (error) {
    // Medir nunca puede romper nada: un fallo de D1 se anota y ya.
    console.error('Embudo: no se pudo registrar', error);
  }
  return vacio();
};

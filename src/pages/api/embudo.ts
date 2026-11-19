import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { esBot, leerEvento, registrar } from '../../features/embudo';

export const prerender = false;

// Recibe el sendBeacon del embudo (ver Layout). Siempre 204: quien lo llame no
// aprende nada (ni si se ha contado ni por qué no). El middleware ya rechaza los
// POST de otro origen.
const vacio = () => new Response(null, { status: 204, headers: { 'cache-control': 'no-store' } });

export const POST: APIRoute = async ({ request, url }) => {
  if (esBot(request.headers.get('user-agent'))) return vacio();
  const evento = leerEvento(await request.text().catch(() => ''), url.hostname);
  if (!evento) return vacio();
  try {
    await registrar(env.DB, evento, new Date().toISOString().slice(0, 10));
  } catch (error) {
    // Medir nunca puede romper nada: un fallo de D1 se anota y ya.
    console.error('Embudo: no se pudo registrar', error);
  }
  return vacio();
};

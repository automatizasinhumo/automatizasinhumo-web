import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { publicOrigin } from '../features/http/origin';

export const prerender = false;

// Bots de buscadores e IA a los que damos paso explícito (mismo criterio que davidportodiaz.com):
// queremos que ChatGPT, Claude, Perplexity y Gemini puedan leer y recomendar el catálogo.
const BOTS_IA = [
  'GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot',
  'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot', 'DuckAssistBot',
];
const PRIVADO = ['/admin', '/api/', '/cart', '/checkout', '/express', '/account', '/order/', '/pay/'];

export const GET: APIRoute = ({ url }) => {
  const origin = publicOrigin(url.origin, env.CANONICAL_ORIGIN);
  const headers = { 'content-type': 'text/plain; charset=utf-8' };
  // Staging (*.workers.dev): no indexar nada.
  if (origin.includes('.workers.dev')) return new Response('User-agent: *\nDisallow: /\n', { headers });
  const bloque = (ua: string) => [`User-agent: ${ua}`, 'Allow: /', ...PRIVADO.map((p) => `Disallow: ${p}`)].join('\n');
  const body = `# Automatiza sin humo: catálogo público abierto a buscadores y asistentes de IA.
${bloque('*')}

${BOTS_IA.map(bloque).join('\n\n')}

# Guía para LLM: ${origin}/llms.txt
# Índice completo para LLM: ${origin}/llms-full.txt
Sitemap: ${origin}/sitemap.xml
`;
  return new Response(body, { headers });
};

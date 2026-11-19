/**
 * Quién puede indexarse y qué ve cada buscador. Una sola regla para la etiqueta
 * <meta name="robots">, robots.txt y el sitemap, para que no se contradigan.
 *
 * Falla cerrado: solo un origen HTTPS con dominio propio es indexable. Staging
 * (*.workers.dev), vistas previas (*.pages.dev), localhost e IPs nunca lo son.
 */
const NO_INDEXABLE = [/\.workers\.dev$/i, /\.pages\.dev$/i, /^localhost$/i, /^\d{1,3}(\.\d{1,3}){3}$/, /^\[/];

export function esIndexable(origin: string): boolean {
  let url: URL;
  try {
    url = new URL(origin);
  } catch {
    return false;
  }
  return url.protocol === 'https:' && !NO_INDEXABLE.some((r) => r.test(url.hostname));
}

/** Rutas privadas: ni en robots.txt como permitidas ni en el sitemap. */
export const RUTAS_PRIVADAS = ['/admin', '/api/', '/cart', '/checkout', '/express', '/account', '/order/', '/pay/'] as const;

/** Misma semántica que Disallow en robots.txt: coincidencia por prefijo. */
export function esPrivada(pathname: string): boolean {
  return RUTAS_PRIVADAS.some((p) => pathname.startsWith(p));
}

// Bots de buscadores e IA a los que damos paso explícito (mismo criterio que davidportodiaz.com):
// queremos que ChatGPT, Claude, Perplexity y Gemini puedan leer y recomendar el catálogo.
export const BOTS_IA = [
  'GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot',
  'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot', 'DuckAssistBot',
] as const;

export function robotsTxt(origin: string): string {
  if (!esIndexable(origin)) return 'User-agent: *\nDisallow: /\n';
  const bloque = (ua: string) => [`User-agent: ${ua}`, 'Allow: /', ...RUTAS_PRIVADAS.map((p) => `Disallow: ${p}`)].join('\n');
  return `# Automatiza sin humo: catálogo público abierto a buscadores y asistentes de IA.
${bloque('*')}

${BOTS_IA.map(bloque).join('\n\n')}

# Guía para LLM: ${origin}/llms.txt
# Índice completo para LLM: ${origin}/llms-full.txt
Sitemap: ${origin}/sitemap.xml
`;
}

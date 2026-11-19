import type { RateLimit } from '@cloudflare/workers-types';

export type RateLimitBucket = 'auth' | 'checkout' | 'search';

/** Public routes that can spend scarce resources or amplify credential abuse. */
export function rateLimitBucket(
  method: string,
  pathname: string,
  hasSearchQuery = false,
): RateLimitBucket | null {
  if (
    method === 'GET' &&
    hasSearchQuery &&
    (pathname === '/search' || pathname === '/api/products')
  ) {
    return 'search';
  }
  if (method !== 'POST') return null;
  if (pathname === '/admin/login' || pathname === '/account/login') return 'auth';
  if (
    pathname === '/api/checkout' ||
    pathname === '/checkout' ||
    pathname.startsWith('/pay/') ||
    pathname === '/api/solicitudes'
  ) {
    return 'checkout';
  }
  return null;
}

/**
 * Anonymous auth and checkout requests have no trustworthy user id yet. Scope the
 * edge counter to the store + route + connecting client. The route keeps login
 * and checkout budgets independent; the host prevents shared namespace ids from
 * coupling separately provisioned stores in one Cloudflare account.
 */
export function anonymousRateLimitKey(request: Request, pathname: string): string {
  const client = request.headers.get('cf-connecting-ip')?.trim() || 'unknown-client';
  return `${new URL(request.url).hostname}:${pathname}:${client}`;
}

/**
 * Freno a bots y rastreadores: cada página servida lee D1 (ajustes y menús), y una IP
 * que pide más de PAGE_LIMIT páginas por minuto no es una persona navegando.
 * La clave es por IP (no por ruta), para que repartir peticiones entre URLs no lo esquive.
 */
export function isThrottledPage(method: string, pathname: string): boolean {
  return (
    (method === 'GET' || method === 'HEAD') &&
    !pathname.startsWith('/api/') &&
    !pathname.startsWith('/_') &&
    !pathname.startsWith('/partials/') &&
    !pathname.startsWith('/admin')
  );
}

export async function checkPageRateLimit(
  limiter: RateLimit | undefined,
  request: Request,
): Promise<boolean> {
  // En local (CI de las PR, wrangler dev) los navegadores de QA salen todos de la misma IP.
  const host = new URL(request.url).hostname;
  if (host === 'localhost' || host === '127.0.0.1') return true;
  return checkRateLimit(limiter, request, '*pagina*');
}

export async function checkRateLimit(
  limiter: RateLimit | undefined,
  request: Request,
  pathname: string,
): Promise<boolean> {
  // Old/custom Wrangler configs may not have adopted the binding yet. Keep the
  // storefront available while the checked-in configs make throttling the normal
  // production path.
  if (!limiter) return true;
  const result = await limiter.limit({ key: anonymousRateLimitKey(request, pathname) });
  return result.success;
}

export function rateLimitedResponse(pathname: string): Response {
  const api = pathname.startsWith('/api/');
  return new Response(
    api
      ? JSON.stringify({ error: 'Too many requests. Try again shortly.' })
      : 'Too many requests. Try again shortly.',
    {
      status: 429,
      headers: {
        'cache-control': 'no-store',
        'content-type': api ? 'application/json; charset=utf-8' : 'text/plain; charset=utf-8',
        'retry-after': '60',
        ...(pathname === '/api/checkout' || pathname === '/api/products'
          ? { 'access-control-allow-origin': '*' }
          : {}),
      },
    },
  );
}

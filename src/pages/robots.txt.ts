import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { publicOrigin } from '../features/http/origin';
import { robotsTxt } from '../features/http/indexable';

export const prerender = false;

export const GET: APIRoute = ({ url }) => {
  const origin = publicOrigin(url.origin, env.CANONICAL_ORIGIN);
  return new Response(robotsTxt(origin), { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};

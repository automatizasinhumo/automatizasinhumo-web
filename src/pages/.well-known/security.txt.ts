import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { publicOrigin } from '../../features/http/origin';
import { CONTACT_EMAIL } from '../../contacto';

export const prerender = false;

// RFC 9116. «Expires» se calcula al servir (a 180 días) para que nunca caduque por olvido.
export const GET: APIRoute = ({ url }) => {
  const origin = publicOrigin(url.origin, env.CANONICAL_ORIGIN);
  const expires = new Date(Date.now() + 180 * 86_400_000).toISOString().replace(/\.\d{3}Z$/, 'Z');
  const body = `Contact: mailto:${CONTACT_EMAIL}
Expires: ${expires}
Preferred-Languages: es, en
Canonical: ${origin}/.well-known/security.txt
`;
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};

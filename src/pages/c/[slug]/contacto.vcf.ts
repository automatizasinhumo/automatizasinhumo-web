import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { tarjetaPorSlug, vcard } from '../../../features/servicios/publicados';

export const prerender = false;

// «Guardar contacto» de la tarjeta publicada: vCard que el móvil abre como contacto nuevo.
export const GET: APIRoute = async ({ params, url }) => {
  const t = await tarjetaPorSlug(env.DB, params.slug ?? '');
  if (!t) return new Response('No encontrada', { status: 404 });
  return new Response(vcard(t.datos, new URL(`/c/${t.slug}`, url).href), {
    headers: {
      'content-type': 'text/vcard; charset=utf-8',
      'content-disposition': `attachment; filename="${t.slug}.vcf"`,
      'cache-control': 'public, max-age=60',
    },
  });
};

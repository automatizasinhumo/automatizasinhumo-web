// Adaptado del ejemplo oficial de Cloudflare «Store and retrieve static assets» con Workers KV
// (https://developers.cloudflare.com/kv/examples/workers-kv-to-serve-assets/). Sin R2 ni plan de pago.
const TIPOS = {
  html: 'text/html; charset=utf-8', css: 'text/css; charset=utf-8', js: 'text/javascript; charset=utf-8',
  mjs: 'text/javascript; charset=utf-8', json: 'application/json', svg: 'image/svg+xml', png: 'image/png',
  jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', avif: 'image/avif', gif: 'image/gif',
  ico: 'image/x-icon', woff: 'font/woff', woff2: 'font/woff2', ttf: 'font/ttf', txt: 'text/plain; charset=utf-8',
  xml: 'application/xml', pdf: 'application/pdf', mp4: 'video/mp4', webmanifest: 'application/manifest+json',
};
const BASE = { 'X-Robots-Tag': 'noindex', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin' };
const ID = /^[a-z0-9-]{1,60}$/;

function noEncontrada() {
  return new Response('<!doctype html><html lang="es"><meta charset="utf-8"><title>Vista previa no disponible</title>' +
    '<p>Esta vista previa no existe o ya ha caducado. Escríbenos y te preparamos otra.</p>',
    { status: 404, headers: { ...BASE, 'Content-Type': TIPOS.html } });
}

export default {
  async fetch(request, env) {
    if (request.method !== 'GET' && request.method !== 'HEAD') return new Response(null, { status: 405, headers: { ...BASE, Allow: 'GET, HEAD' } });
    const url = new URL(request.url);
    if (url.pathname === '/robots.txt') return new Response('User-agent: *\nDisallow: /\n', { headers: { ...BASE, 'Content-Type': TIPOS.txt } });
    // ZIP de la entrega (manual/fabrica/entregar.py): el token aleatorio del enlace es la única llave.
    const entrega = /^\/entrega\/([A-Za-z0-9_-]{32})\.zip$/.exec(url.pathname);
    if (entrega) {
      const zip = await env.VISTAS.get(`entregas/${entrega[1]}.zip`, 'stream');
      if (zip === null) return noEncontrada();
      return new Response(request.method === 'HEAD' ? null : zip, {
        headers: { ...BASE, 'Content-Type': 'application/zip', 'Content-Disposition': 'attachment; filename="tu-web.zip"', 'Cache-Control': 'private, no-store' },
      });
    }
    let ruta;
    try { ruta = decodeURIComponent(url.pathname); } catch { return noEncontrada(); }
    const [, id, ...resto] = ruta.split('/');
    if (!id || !ID.test(id) || resto.some((s) => s === '..' || s === '.')) return noEncontrada();
    // /<id> sin barra: redirige para que las rutas relativas de la plantilla funcionen.
    if (resto.length === 0) return Response.redirect(`${url.origin}/${id}/${url.search}`, 301);
    let clave = `sites/${id}/${resto.join('/')}`;
    if (clave.endsWith('/')) clave += 'index.html';
    let valor = await env.VISTAS.get(clave, 'stream');
    if (valor === null && !/\.[a-z0-9]+$/i.test(clave)) {
      // /<id>/seccion con seccion/index.html: redirige con barra para que sus rutas relativas resuelvan bien.
      if (await env.VISTAS.get(`${clave}/index.html`, 'stream') !== null) {
        return Response.redirect(`${url.origin}${url.pathname}/${url.search}`, 301);
      }
    }
    if (valor === null) return noEncontrada();
    const ext = clave.split('.').pop().toLowerCase();
    return new Response(request.method === 'HEAD' ? null : valor, {
      headers: { ...BASE, 'Content-Type': TIPOS[ext] || 'application/octet-stream', 'Cache-Control': 'public, max-age=300' },
    });
  },
};

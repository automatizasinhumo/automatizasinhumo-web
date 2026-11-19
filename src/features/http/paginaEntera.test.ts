import { describe, expect, it } from 'vitest';
import { asegurarPaginaEntera } from './paginaEntera';

const html = { 'content-type': 'text/html; charset=utf-8' };

/** Un stream que emite la cabecera y luego falla, como Astro cuando un componente lanza. */
function streamQueFalla(): ReadableStream<Uint8Array> {
  const enc = new TextEncoder();
  return new ReadableStream({
    pull(c) {
      c.enqueue(enc.encode('<!doctype html><html><body><header>menú</header>'));
      c.error(new Error('D1_ERROR: daily limit exceeded'));
    },
  });
}

describe('asegurarPaginaEntera', () => {
  it('deja pasar la página completa con su estado y cabeceras', async () => {
    const res = await asegurarPaginaEntera('GET', new Response('<html><body>ok<footer></footer></body></html>\n', { headers: { ...html, 'x-a': '1' } }), '/');
    expect(res.status).toBe(200);
    expect(res.headers.get('x-a')).toBe('1');
    expect(await res.text()).toContain('<footer>');
  });

  it('un error a mitad del stream da 503 completo, no la página cortada', async () => {
    const res = await asegurarPaginaEntera('GET', new Response(streamQueFalla(), { headers: html }), '/');
    expect(res.status).toBe(503);
    expect(res.headers.get('cache-control')).toBe('no-store');
    const cuerpo = await res.text();
    expect(cuerpo).toContain('</html>');
    expect(cuerpo).not.toContain('menú');
  });

  it('acepta scripts que Astro emite detrás de </html>', async () => {
    const res = await asegurarPaginaEntera('GET', new Response('<html><body></body></html><script>x()</script>', { headers: html }), '/empezar/x');
    expect(res.status).toBe(200);
  });

  it('un documento que no llega a cerrarse da 503', async () => {
    const res = await asegurarPaginaEntera('GET', new Response('<!doctype html><html><body><main>', { headers: html }), '/');
    expect(res.status).toBe(503);
  });

  it('no toca parciales, JSON, redirecciones, errores ni POST', async () => {
    const parcial = await asegurarPaginaEntera('GET', new Response('<div>carrito</div>', { headers: html }), '/partials/cart');
    expect(parcial.status).toBe(200);
    const json = new Response('{"a":', { headers: { 'content-type': 'application/json' } });
    expect(await asegurarPaginaEntera('GET', json, '/api')).toBe(json);
    const r404 = new Response('<html><body>', { status: 404, headers: html });
    expect(await asegurarPaginaEntera('GET', r404, '/x')).toBe(r404);
    const post = new Response('<html>', { headers: html });
    expect(await asegurarPaginaEntera('POST', post, '/x')).toBe(post);
  });
});

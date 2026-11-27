import { describe, expect, it, vi } from 'vitest';
import { d1 } from './d1Prueba';
import { correoResena, enlaceResena, pedirResenas, placeIdDeFeature, resolverCorto } from './resenasCitas';

const MIGRACIONES = ['0048_paginas_publicadas.sql', '0051_paginas_versiones.sql', '0055_citas_web.sql', '0056_citas_resena.sql'];
const HORA = 3_600_000;
const DIA = 24 * HORA;
const AHORA = Date.UTC(2026, 10, 27, 12, 0);
const G_PAGE = 'https://g.page/r/AbC123/review';
const FEATURE = 'https://www.google.com/maps/place/Taller/data=!4m2!3m1!1s0x47c9cd2a9b3d0f7b:0x1a2b3c4d5e6f7a8b';

function base() {
  const db = d1(MIGRACIONES);
  let n = 0;
  const web = (opinionesUrl: string) => {
    const slug = `web-${++n}`;
    db.sql.prepare(`INSERT INTO paginas_publicadas (tipo, slug, pedido_public_id, datos) VALUES ('web', ?, ?, ?)`).run(
      slug,
      `p${n}`,
      JSON.stringify({ negocio: 'Peluquería Ñandú', opinionesUrl }),
    );
    return slug;
  };
  const cita = (id: string, fin: number, slug: string, estado = 'confirmada') =>
    db.sql
      .prepare(`INSERT INTO citas (id, slug, inicio, fin, estado, nombre, email) VALUES (?, ?, ?, ?, ?, ?, ?)`)
      .run(id, slug, fin - HORA, fin, estado, `Cliente ${id}`, `${id}@example.test`);
  const estado = (id: string) => (db.sql.prepare(`SELECT resena_estado AS e FROM citas WHERE id = ?`).get(id) as { e: string }).e;
  return { db, web, cita, estado };
}

describe('enlaceResena', () => {
  it('normaliza g.page y convierte Place ID e id de Maps en «escribir reseña»', () => {
    expect(enlaceResena('g.page/r/AbC123')).toBe(G_PAGE);
    expect(enlaceResena('https://www.google.com/maps/search/?api=1&query_place_id=ChIJ1234567890123456789012')).toBe(
      'https://search.google.com/local/writereview?placeid=ChIJ1234567890123456789012',
    );
    const id = placeIdDeFeature('0x47c9cd2a9b3d0f7b', '0x1a2b3c4d5e6f7a8b')!;
    expect(enlaceResena(FEATURE)).toBe(`https://search.google.com/local/writereview?placeid=${id}`);
  });

  it('el id de Maps se codifica como el protobuf de Place ID (ChIJ… con los dos enteros)', () => {
    const id = placeIdDeFeature('0x47c9cd2a9b3d0f7b', '0x1a2b3c4d5e6f7a8b')!;
    expect(id.startsWith('ChIJ')).toBe(true);
    const bytes = Uint8Array.from(atob(id.replace(/-/g, '+').replace(/_/g, '/') + '='), (c) => c.charCodeAt(0));
    const v = new DataView(bytes.buffer);
    expect(v.getBigUint64(3, true)).toBe(0x47c9cd2a9b3d0f7bn);
    expect(v.getBigUint64(12, true)).toBe(0x1a2b3c4d5e6f7a8bn);
  });

  it('acepta plataformas de reseñas conocidas y rechaza lo demás', () => {
    expect(enlaceResena('https://www.trustpilot.com/review/example.com#x')).toBe('https://www.trustpilot.com/review/example.com');
    expect(enlaceResena('http://www.google.com/maps/place/x/data=!1s0x1:0x2')).toBeNull();
    expect(enlaceResena('https://google.com.evil.example/maps?placeid=ChIJ1234567890123456789012')).toBeNull();
    expect(enlaceResena('https://maps.app.goo.gl/abc123')).toBeNull();
    expect(enlaceResena('https://www.google.com/maps/place/Taller/@40.4,-3.7,17z')).toBeNull();
    expect(enlaceResena('javascript:alert(1)')).toBeNull();
  });
});

describe('resolverCorto', () => {
  it('sigue la redirección de Google y no sale de Google', async () => {
    const ok = vi.fn().mockResolvedValue(new Response(null, { status: 302, headers: { location: FEATURE } }));
    expect(await resolverCorto('https://maps.app.goo.gl/abc', ok)).toMatch(/^https:\/\/search\.google\.com\/local\/writereview\?placeid=ChIJ/);
    const fuera = vi.fn().mockResolvedValue(new Response(null, { status: 302, headers: { location: 'https://evil.example/maps' } }));
    expect(await resolverCorto('https://maps.app.goo.gl/abc', fuera)).toBeNull();
    const roto = vi.fn().mockRejectedValue(new Error('red'));
    expect(await resolverCorto('https://maps.app.goo.gl/abc', roto)).toBeNull();
  });
});

describe('correoResena', () => {
  it('mismo texto para todos, nombre escapado y clave por cita', () => {
    const m = correoResena({ id: 'c1', inicio: AHORA, nombre: '<img src=x>', email: 'ana@example.test' }, 'Taller Norte', G_PAGE, 'Automatiza sin humo');
    expect(m.to).toBe('ana@example.test');
    expect(m.subject).toContain('Taller Norte');
    expect(m.html).toContain('&lt;img');
    expect(m.html).not.toContain('<img src=x>');
    expect(m.text).toContain(G_PAGE);
    expect(m.idempotencyKey).toBe('cita-resena/c1');
    expect(m.text).not.toMatch(/descuento|regalo|estrellas/i);
  });
});

describe('pedirResenas', () => {
  it('solo citas confirmadas acabadas hace entre 72 h y 7 días, y una sola vez', async () => {
    const { db, web, cita, estado } = base();
    const w = web(G_PAGE);
    cita('buena', AHORA - 4 * DIA, w);
    cita('reciente', AHORA - 2 * DIA, w);
    cita('antigua', AHORA - 8 * DIA, w);
    cita('anulada', AHORA - 4 * DIA, w, 'anulada');
    const send = vi.fn(async () => undefined);
    expect(await pedirResenas(db, { send }, 'Tienda', AHORA)).toBe(1);
    expect(await pedirResenas(db, { send }, 'Tienda', AHORA + 5 * 60_000)).toBe(0);
    expect(send).toHaveBeenCalledTimes(1);
    expect(send.mock.calls[0]).toEqual([expect.objectContaining({ to: 'buena@example.test', subject: '¿Qué tal tu visita a Peluquería Ñandú?' })]);
    expect([estado('buena'), estado('reciente'), estado('antigua'), estado('anulada')]).toEqual(['enviada', 'pendiente', 'pendiente', 'pendiente']);
  });

  it('un fallo de envío no se reintenta', async () => {
    const { db, web, cita, estado } = base();
    cita('fallo', AHORA - 4 * DIA, web(G_PAGE));
    const send = vi.fn(async () => {
      throw new Error('smtp');
    });
    expect(await pedirResenas(db, { send }, 'T', AHORA)).toBe(0);
    expect(await pedirResenas(db, { send }, 'T', AHORA + 5 * 60_000)).toBe(0);
    expect(send).toHaveBeenCalledTimes(1);
    expect(estado('fallo')).toBe('fallida');
  });

  it('dos barridos a la vez envían un único correo', async () => {
    const { db, web, cita, estado } = base();
    cita('doble', AHORA - 4 * DIA, web(G_PAGE));
    const send = vi.fn(async () => undefined);
    const r = await Promise.all([pedirResenas(db, { send }, 'T', AHORA), pedirResenas(db, { send }, 'T', AHORA)]);
    expect(r[0] + r[1]).toBe(1);
    expect(send).toHaveBeenCalledTimes(1);
    expect(estado('doble')).toBe('enviada');
  });

  it('sin enlace sigue pendiente; enlace no reconocible queda omitida; corto se resuelve una vez', async () => {
    const { db, web, cita, estado } = base();
    cita('sin', AHORA - 4 * DIA, web(''));
    cita('mala', AHORA - 4 * DIA, web('https://example.com/opiniones'));
    const corto = web('https://maps.app.goo.gl/abc');
    cita('corto1', AHORA - 4 * DIA, corto);
    cita('corto2', AHORA - 4 * DIA, corto);
    const f = vi.fn().mockResolvedValue(new Response(null, { status: 302, headers: { location: FEATURE } }));
    const send = vi.fn(async () => undefined);
    expect(await pedirResenas(db, { send }, 'T', AHORA, 20, f)).toBe(2);
    expect(f).toHaveBeenCalledTimes(1);
    expect([estado('sin'), estado('mala'), estado('corto1'), estado('corto2')]).toEqual(['pendiente', 'omitida', 'enviada', 'enviada']);
  });
});

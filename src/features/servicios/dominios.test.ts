import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { describe, expect, it, vi } from 'vitest';
import type { D1Database } from '@cloudflare/workers-types';
import {
  avanzarDominios,
  avisarDominiosActivos,
  configDominios,
  normalizarDominio,
  pedirDominio,
  servirDominio,
  type ConfigDominios,
} from './dominios';

/** D1 mínimo sobre SQLite de Node con las migraciones reales (mismo patrón que envio.test.ts). */
function d1(): D1Database & { sql: DatabaseSync } {
  const sql = new DatabaseSync(':memory:');
  sql.exec('CREATE TABLE orders (public_id TEXT PRIMARY KEY, email TEXT)');
  for (const m of ['0048_paginas_publicadas.sql', '0049_dominios_paginas.sql']) {
    sql.exec(readFileSync(new URL(`../../../migrations/${m}`, import.meta.url), 'utf8'));
  }
  const prep = (q: string, args: unknown[] = []) => {
    const st = sql.prepare(q);
    const a = args as (string | number | null)[];
    return {
      bind: (...nuevos: unknown[]) => prep(q, nuevos),
      first: async () => (st.get(...a) as unknown) ?? null,
      all: async () => ({ results: st.all(...a) }),
      run: async () => ({ meta: { changes: Number(st.run(...a).changes) } }),
    };
  };
  return { sql, prepare: (q: string) => prep(q) } as unknown as D1Database & { sql: DatabaseSync };
}

const CFG: ConfigDominios = { token: 't', cuenta: 'acc', worker: 'tienda' };
const ok = (result: unknown) => new Response(JSON.stringify({ success: true, result }));
const fallo = (code: number) => new Response(JSON.stringify({ success: false, errors: [{ code, message: `error ${code}` }] }), { status: 400 });

/** fetch simulado: una función por «MÉTODO ruta» (la ruta sin el prefijo de la API). */
function api(rutas: Record<string, (init?: RequestInit) => Response>) {
  const llamadas: string[] = [];
  const f = vi.fn(async (url: string | URL | Request, init?: RequestInit) => {
    const u = String(url).replace('https://api.cloudflare.com/client/v4', '');
    const k = `${init?.method ?? 'GET'} ${u}`;
    llamadas.push(k);
    const h = rutas[k] ?? Object.entries(rutas).find(([r]) => k.startsWith(r))?.[1];
    if (!h) throw new Error(`sin simular: ${k}`);
    return h(init);
  });
  return { f: f as unknown as typeof fetch, llamadas };
}

function publicada(db: ReturnType<typeof d1>, pedido = 'p1', slug = 'peluqueria-lola') {
  db.sql.prepare("INSERT INTO paginas_publicadas (tipo, slug, pedido_public_id, datos) VALUES ('web', ?, ?, '{}')").run(slug, pedido);
  db.sql.prepare('INSERT INTO orders (public_id, email) VALUES (?, ?)').run(pedido, 'lola@example.es');
}

describe('normalizarDominio', () => {
  it.each([
    ['peluquerialola.es', 'peluquerialola.es'],
    ['  https://www.PeluqueriaLola.es/inicio?x=1 ', 'peluquerialola.es'],
    ['lola.com.es', 'lola.com.es'],
    ['www.lola.com.es', 'lola.com.es'],
    ['peluquería-lola.es', 'xn--peluquera-lola-7lb.es'],
  ])('%s → %s', (e, s) => expect(normalizarDominio(e)).toBe(s));

  it.each(['', 'lola', 'tienda.lola.es', '1.2.3.4', 'lola.es:8080x', 'ana@lola.es', 'lola .es', 'x.workers.dev', 'automatizasinhumo.es', 'localhost', 42])(
    'rechaza %s',
    (e) => expect(normalizarDominio(e)).toBeNull(),
  );
});

describe('configDominios', () => {
  it('necesita token, cuenta y Worker', () => {
    expect(configDominios({ CF_DOMINIOS_TOKEN: 't', CF_ACCOUNT_ID: 'a' })).toBeNull();
    expect(configDominios({ CF_DOMINIOS_TOKEN: 't', CF_ACCOUNT_ID: 'a', CF_WORKER_NOMBRE: 'w' })).toEqual({ token: 't', cuenta: 'a', worker: 'w' });
  });
});

describe('pedirDominio', () => {
  it('crea la zona y guarda los servidores DNS', async () => {
    const db = d1();
    publicada(db);
    const { f } = api({ 'POST /zones': () => ok({ id: 'z1', name: 'lola.es', status: 'pending', name_servers: ['ana.ns.cloudflare.com', 'bob.ns.cloudflare.com'] }) });
    const r = await pedirDominio(db, CFG, 'web', 'p1', 'https://www.lola.es', f);
    expect(r.ok && r.fila).toMatchObject({ dominio: 'lola.es', estado: 'esperando_dns', zona_id: 'z1' });
    expect(r.ok && JSON.parse(r.fila.servidores!)).toEqual(['ana.ns.cloudflare.com', 'bob.ns.cloudflare.com']);
  });

  it('reutiliza la zona si ya está en nuestra cuenta (1061) y sustituye un dominio mal escrito', async () => {
    const db = d1();
    publicada(db);
    const primero = api({ 'POST /zones': () => ok({ id: 'z0', name: 'lol.es', status: 'pending', name_servers: [] }) });
    await pedirDominio(db, CFG, 'web', 'p1', 'lol.es', primero.f);
    const { f } = api({
      'POST /zones': () => fallo(1061),
      'GET /zones?name=lola.es': () => ok([{ id: 'z1', name: 'lola.es', status: 'pending', name_servers: ['a.ns', 'b.ns'] }]),
    });
    const r = await pedirDominio(db, CFG, 'web', 'p1', 'lola.es', f);
    expect(r.ok && r.fila.zona_id).toBe('z1');
    expect(db.sql.prepare('SELECT dominio FROM dominios_paginas').all()).toEqual([{ dominio: 'lola.es' }]);
  });

  it('no da un dominio de otro pedido, ni sin configuración, ni uno no registrado', async () => {
    const db = d1();
    publicada(db);
    publicada(db, 'p2', 'otra');
    await pedirDominio(db, CFG, 'web', 'p1', 'lola.es', api({ 'POST /zones': () => ok({ id: 'z1', name_servers: [] }) }).f);
    expect(await pedirDominio(db, CFG, 'web', 'p2', 'lola.es')).toEqual({ ok: false, error: 'ocupado' });
    expect(await pedirDominio(db, null, 'web', 'p2', 'pepe.es')).toEqual({ ok: false, error: 'no_disponible' });
    expect(await pedirDominio(db, CFG, 'web', 'p2', 'pepe')).toEqual({ ok: false, error: 'dominio' });
    const r = await pedirDominio(db, CFG, 'web', 'p2', 'noexiste.es', api({ 'POST /zones': () => fallo(1097) }).f);
    expect(r).toMatchObject({ ok: false, error: 'cloudflare', detalle: expect.stringContaining('no está registrado') });
  });
});

describe('avanzarDominios', () => {
  async function conZona(db: ReturnType<typeof d1>) {
    publicada(db);
    await pedirDominio(db, CFG, 'web', 'p1', 'lola.es', api({ 'POST /zones': () => ok({ id: 'z1', name_servers: ['a.ns'] }) }).f);
  }

  it('zona pendiente: pide la comprobación y sigue esperando', async () => {
    const db = d1();
    await conZona(db);
    const { f, llamadas } = api({ 'GET /zones/z1': () => ok({ id: 'z1', status: 'pending' }), 'PUT /zones/z1/activation_check': () => fallo(429) });
    const [fila] = await avanzarDominios(db, CFG, 20, f);
    expect(fila!.estado).toBe('esperando_dns');
    expect(llamadas).toEqual(['GET /zones/z1', 'PUT /zones/z1/activation_check']);
  });

  it('zona activa: conecta dominio y www, y queda activo cuando responde por HTTPS', async () => {
    const db = d1();
    await conZona(db);
    const conectados: unknown[] = [];
    const { f } = api({
      'GET /zones/z1': () => ok({ id: 'z1', status: 'active' }),
      'PUT /accounts/acc/workers/domains': (init) => (conectados.push(JSON.parse(String(init!.body))), ok({})),
      'GET https://lola.es/': () => new Response('<html>', { headers: { 'x-pagina-dominio': 'lola.es' } }),
    });
    const [fila] = await avanzarDominios(db, CFG, 20, f);
    expect(fila!.estado).toBe('activo');
    expect(conectados).toEqual([
      { environment: 'production', hostname: 'lola.es', service: 'tienda', zone_id: 'z1' },
      { environment: 'production', hostname: 'www.lola.es', service: 'tienda', zone_id: 'z1' },
    ]);
  });

  it('un fallo de la API guarda el detalle sin cambiar el estado; el certificado pendiente deja «conectando»', async () => {
    const db = d1();
    await conZona(db);
    const [a] = await avanzarDominios(db, CFG, 20, api({ 'GET /zones/z1': () => fallo(10000) }).f);
    expect(a).toMatchObject({ estado: 'esperando_dns', detalle: 'error 10000' });
    const { f } = api({
      'GET /zones/z1': () => ok({ status: 'active' }),
      'PUT /accounts/acc/workers/domains': () => ok({}),
      'GET https://lola.es/': () => {
        throw new TypeError('certificado aún no emitido');
      },
    });
    const [b] = await avanzarDominios(db, CFG, 20, f);
    expect(b).toMatchObject({ estado: 'conectando', detalle: null });
  });

  it('sin configuración no hace nada', async () => {
    expect(await avanzarDominios(d1(), null)).toEqual([]);
  });
});

describe('avisarDominiosActivos', () => {
  it('un correo por dominio activo, una sola vez; si el envío falla, se reintenta', async () => {
    const db = d1();
    publicada(db);
    db.sql.prepare("INSERT INTO dominios_paginas (dominio, tipo, pedido_public_id, estado) VALUES ('lola.es', 'web', 'p1', 'activo')").run();
    const roto = vi.fn().mockRejectedValue(new Error('smtp'));
    await expect(avisarDominiosActivos(db, roto)).rejects.toThrow('smtp');
    const enviar = vi.fn().mockResolvedValue(undefined);
    expect(await avisarDominiosActivos(db, enviar)).toBe(1);
    expect(await avisarDominiosActivos(db, enviar)).toBe(0);
    expect(enviar).toHaveBeenCalledWith({ para: 'lola@example.es', dominio: 'lola.es' });
  });
});

describe('servirDominio', () => {
  async function activo(estado = 'activo') {
    const db = d1();
    publicada(db);
    db.sql.prepare("INSERT INTO dominios_paginas (dominio, tipo, pedido_public_id, estado) VALUES ('lola.es', 'web', 'p1', ?)").run(estado);
    return db;
  }
  const doc = vi.fn(async (_t: string, slug: string, url: string) => `<p>${slug} ${url}</p>`);

  it('sirve la web en la raíz con cabecera de comprobación', async () => {
    const r = await servirDominio(new Request('https://lola.es/'), await activo(), doc);
    expect(r!.status).toBe(200);
    expect(r!.headers.get('x-pagina-dominio')).toBe('lola.es');
    expect(await r!.text()).toBe('<p>peluqueria-lola https://lola.es/</p>');
  });

  it('www, http y otras rutas redirigen a la raíz del dominio', async () => {
    const db = await activo();
    for (const [u, destino] of [
      ['https://www.lola.es/contacto?a=1', 'https://lola.es/contacto?a=1'],
      ['http://lola.es/', 'https://lola.es/'],
      ['https://lola.es/w/peluqueria-lola', 'https://lola.es/'],
    ]) {
      const r = await servirDominio(new Request(u!), db, doc);
      expect([r!.status, r!.headers.get('location')]).toEqual([301, destino]);
    }
  });

  it('robots.txt y sitemap.xml propios del dominio (indexables)', async () => {
    const db = await activo();
    expect(await (await servirDominio(new Request('https://lola.es/robots.txt'), db, doc))!.text()).toContain('Sitemap: https://lola.es/sitemap.xml');
    expect(await (await servirDominio(new Request('https://lola.es/sitemap.xml'), db, doc))!.text()).toContain('<loc>https://lola.es/</loc>');
  });

  it('hosts nuestros, desconocidos o aún sin DNS siguen a la tienda', async () => {
    const db = await activo('esperando_dns');
    expect(await servirDominio(new Request('https://lola.es/'), db, doc)).toBeNull();
    expect(await servirDominio(new Request('https://otro.es/'), db, doc)).toBeNull();
    expect(await servirDominio(new Request('https://x.workers.dev/'), db, doc)).toBeNull();
  });
});

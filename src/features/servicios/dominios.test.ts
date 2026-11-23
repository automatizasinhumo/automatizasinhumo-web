import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { describe, expect, it, vi } from 'vitest';
import type { D1Database } from '@cloudflare/workers-types';
import {
  avanzarDominios,
  avisarDominiosActivos,
  comprarDominio,
  esAvisoRegistro,
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
  for (const m of ['0048_paginas_publicadas.sql', '0049_dominios_paginas.sql', '0050_dominios_registro.sql']) {
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

  it('no entrega una zona ya activa de nuestra cuenta que no tiene fila (sería de otro pedido)', async () => {
    const db = d1();
    publicada(db);
    const { f } = api({
      'POST /zones': () => fallo(1061),
      'GET /zones?name=lola.es': () => ok([{ id: 'z9', name: 'lola.es', status: 'active', name_servers: ['a.ns'] }]),
    });
    expect(await pedirDominio(db, CFG, 'web', 'p1', 'lola.es', f)).toMatchObject({ ok: false, error: 'cloudflare' });
    expect(db.sql.prepare('SELECT count(*) AS n FROM dominios_paginas').get()).toEqual({ n: 0 });
  });

  it('no sustituye un dominio que el cron activó mientras se creaba la zona nueva', async () => {
    const db = d1();
    publicada(db);
    await pedirDominio(db, CFG, 'web', 'p1', 'lol.es', api({ 'POST /zones': () => ok({ id: 'z0', name_servers: [] }) }).f);
    db.sql.prepare("UPDATE dominios_paginas SET estado = 'conectando'").run();
    const { f } = api({
      'POST /zones': () => {
        db.sql.prepare("UPDATE dominios_paginas SET estado = 'activo'").run();
        return ok({ id: 'z1', name_servers: [] });
      },
    });
    expect(await pedirDominio(db, CFG, 'web', 'p1', 'lola.es', f)).toEqual({ ok: false, error: 'ocupado', detalle: 'lol.es' });
    expect(db.sql.prepare('SELECT dominio, estado FROM dominios_paginas').all()).toEqual([{ dominio: 'lol.es', estado: 'activo' }]);
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
    // El intento fallido cuenta: la fila pasa al final de la cola del cron.
    db.sql.prepare("UPDATE dominios_paginas SET updated_at = '2000-01-01 00:00:00'").run();
    await avanzarDominios(db, CFG, 20, f);
    expect(db.sql.prepare('SELECT updated_at > ? AS movido FROM dominios_paginas').get('2000-01-01 00:00:00')).toEqual({ movido: 1 });
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

describe('comprarDominio', () => {
  const REG = { ...CFG, precioMax: 15 };
  const TITULAR = {
    nombre: 'Lola Pérez',
    email: 'lola@example.es',
    telefono: '612 345 678',
    calle: 'Calle Mayor 3',
    ciudad: 'Madrid',
    provincia: 'Madrid',
    cp: '28013',
    pais: 'ES',
  };
  const ESTADO = 'GET /accounts/acc/registrar/registrations/lola.com/registration-status';
  const libre =
    (precio = '10.46') =>
    () =>
      ok({ domains: [{ name: 'lola.com', registrable: true, tier: 'standard', pricing: { currency: 'USD', registration_cost: precio, renewal_cost: precio } }] });

  it('registra a nombre del titular, una sola vez, y el cron lo conecta sin pasos del cliente', async () => {
    const db = d1();
    publicada(db);
    let cuerpo: Record<string, unknown> = {};
    const compra = api({
      'POST /accounts/acc/registrar/domain-check': libre(),
      'POST /accounts/acc/registrar/registrations': (init) => ((cuerpo = JSON.parse(String(init!.body))), ok({ state: 'in_progress', completed: false })),
    });
    const r = await comprarDominio(db, REG, 'web', 'p1', 'lola.com', TITULAR, compra.f);
    expect(r.ok && r.fila).toMatchObject({ dominio: 'lola.com', estado: 'registrando', registrador: 'cloudflare' });
    expect(cuerpo).toMatchObject({ domain_name: 'lola.com', auto_renew: true, contacts: { registrant: { phone: '+34.612345678' } } });
    // Doble clic: no se paga otro registro.
    const otra = api({});
    expect(await comprarDominio(db, REG, 'web', 'p1', 'lola.com', TITULAR, otra.f)).toMatchObject({ ok: true });
    expect(otra.llamadas).toEqual([]);
    // Ni otro dominio para el mismo pedido, ni sustituirlo conectando uno propio.
    expect(await comprarDominio(db, REG, 'web', 'p1', 'otra.com', TITULAR, otra.f)).toMatchObject({ ok: false, error: 'ocupado' });
    expect(await pedirDominio(db, CFG, 'web', 'p1', 'mio.es', otra.f)).toMatchObject({ ok: false, error: 'ocupado' });

    const pendiente = api({ [ESTADO]: () => ok({ state: 'in_progress', completed: false }) });
    expect((await avanzarDominios(db, CFG, 20, pendiente.f))[0]!.estado).toBe('registrando');
    const hecho = api({
      [ESTADO]: () => ok({ state: 'succeeded', completed: true }),
      'POST /zones': () => fallo(1061),
      // Registrar ya creó la zona activa: al ser nuestra compra, se acepta.
      'GET /zones?name=lola.com': () => ok([{ id: 'z7', name: 'lola.com', status: 'active', name_servers: ['a.ns'] }]),
      'GET /zones/z7': () => ok({ id: 'z7', status: 'active' }),
      'PUT /accounts/acc/workers/domains': () => ok({}),
      'GET https://lola.com/': () => new Response('<html>', { headers: { 'x-pagina-dominio': 'lola.com' } }),
    });
    expect((await avanzarDominios(db, CFG, 20, hecho.f))[0]).toMatchObject({ estado: 'activo', zona_id: 'z7' });
  });

  it('rechaza titular incompleto, dominio no incluido o sin registro activo, sin dejar fila', async () => {
    const db = d1();
    publicada(db);
    expect(await comprarDominio(db, REG, 'web', 'p1', 'lola.com', { ...TITULAR, telefono: '123' })).toEqual({ ok: false, error: 'titular', detalle: 'telefono' });
    expect(await comprarDominio(db, null, 'web', 'p1', 'lola.com', TITULAR)).toEqual({ ok: false, error: 'no_disponible' });
    const caro = api({ 'POST /accounts/acc/registrar/domain-check': libre('60.00') });
    expect(await comprarDominio(db, REG, 'web', 'p1', 'lola.com', TITULAR, caro.f)).toMatchObject({ ok: false, error: 'no_incluido' });
    const es = api({ 'POST /accounts/acc/registrar/domain-check': () => fallo(1008) });
    expect(await comprarDominio(db, REG, 'web', 'p1', 'lola.es', TITULAR, es.f)).toMatchObject({
      ok: false,
      error: 'no_incluido',
      detalle: expect.stringContaining('terminación'),
    });
    expect(db.sql.prepare('SELECT count(*) AS n FROM dominios_paginas').get()).toEqual({ n: 0 });
  });

  it('si Registrar falla al pedirlo, libera la reserva; si el registro falla después, queda en error', async () => {
    const db = d1();
    publicada(db);
    const caida = api({ 'POST /accounts/acc/registrar/domain-check': libre(), 'POST /accounts/acc/registrar/registrations': () => fallo(10000) });
    expect(await comprarDominio(db, REG, 'web', 'p1', 'lola.com', TITULAR, caida.f)).toMatchObject({ ok: false, error: 'cloudflare' });
    expect(db.sql.prepare('SELECT count(*) AS n FROM dominios_paginas').get()).toEqual({ n: 0 });
    const lenta = api({
      'POST /accounts/acc/registrar/domain-check': libre(),
      'POST /accounts/acc/registrar/registrations': () => ok({ state: 'pending', completed: false }),
    });
    await comprarDominio(db, REG, 'web', 'p1', 'lola.com', TITULAR, lenta.f);
    const rechazo = api({ [ESTADO]: () => ok({ state: 'failed', completed: true, error: { message: 'Contacto no válido' } }) });
    expect((await avanzarDominios(db, CFG, 20, rechazo.f))[0]).toMatchObject({ estado: 'error', detalle: 'Contacto no válido' });
  });

  it('respuesta cortada: conserva la reserva (sin segunda compra) y el cron la libera solo si Registrar no la conoce', async () => {
    const db = d1();
    publicada(db);
    const cortada = api({
      'POST /accounts/acc/registrar/domain-check': libre(),
      'POST /accounts/acc/registrar/registrations': () => {
        throw new TypeError('network connection lost');
      },
    });
    expect(await comprarDominio(db, REG, 'web', 'p1', 'lola.com', TITULAR, cortada.f)).toMatchObject({ ok: true, fila: { estado: 'registrando' } });
    expect(await comprarDominio(db, REG, 'web', 'p1', 'otra.com', TITULAR, api({}).f)).toMatchObject({ ok: false, error: 'ocupado' });
    // Un 5xx tampoco es un rechazo seguro.
    const caida = api({ [ESTADO]: () => new Response(JSON.stringify({ success: false, errors: [{ code: 10000, message: 'interno' }] }), { status: 502 }) });
    expect((await avanzarDominios(db, CFG, 20, caida.f))[0]).toMatchObject({ estado: 'registrando' });
    const desconocido = api({ [ESTADO]: () => new Response(JSON.stringify({ success: false, errors: [{ code: 404, message: 'not found' }] }), { status: 404 }) });
    // Reciente: la compra puede seguir en vuelo, no se libera.
    expect((await avanzarDominios(db, CFG, 20, desconocido.f))[0]).toMatchObject({ estado: 'registrando' });
    expect(db.sql.prepare('SELECT count(*) AS n FROM dominios_paginas').get()).toEqual({ n: 1 });
    db.sql.prepare("UPDATE dominios_paginas SET created_at = datetime('now', '-31 minutes')").run();
    expect((await avanzarDominios(db, CFG, 20, desconocido.f))[0]).toMatchObject({ estado: 'error' });
    expect(db.sql.prepare('SELECT count(*) AS n FROM dominios_paginas').get()).toEqual({ n: 0 });
  });

  it('«blocked» y «action_required» siguen en curso con un aviso para el cliente y terminan conectándose', async () => {
    const db = d1();
    publicada(db);
    const compra = api({
      'POST /accounts/acc/registrar/domain-check': libre(),
      'POST /accounts/acc/registrar/registrations': () => ok({ state: 'action_required', completed: false, context: { action: 'registrant_email_confirmation_pending' } }),
    });
    const r = await comprarDominio(db, REG, 'web', 'p1', 'lola.com', TITULAR, compra.f);
    expect(r.ok && r.fila.detalle).toContain('Confirma el correo');
    expect(esAvisoRegistro(r.ok ? r.fila.detalle : null)).toBe(true);
    const bloqueado = api({ [ESTADO]: () => ok({ state: 'blocked', completed: false }) });
    const b = (await avanzarDominios(db, CFG, 20, bloqueado.f))[0]!;
    expect(b).toMatchObject({ estado: 'registrando' });
    expect(b.detalle).toContain('revisando');
    // Un error interno de la API no es un aviso para el cliente.
    expect(esAvisoRegistro('error 10000')).toBe(false);
    const hecho = api({ [ESTADO]: () => ok({ state: 'succeeded', completed: true }), 'POST /zones': () => ok({ id: 'z7', status: 'pending', name_servers: [] }),
      'GET /zones/z7': () => ok({ id: 'z7', status: 'pending' }),
      'PUT /zones/z7/activation_check': () => ok({}),
    });
    expect((await avanzarDominios(db, CFG, 20, hecho.f))[0]).toMatchObject({ estado: 'esperando_dns', detalle: null });
  });
});

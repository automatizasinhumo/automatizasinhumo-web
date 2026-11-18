// C22: un doble envío del formulario (doble clic, reintento) no crea dos solicitudes.
import { readFileSync } from 'node:fs';
import { Miniflare } from 'miniflare';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { confirmarCorreos, crearSolicitud, liberarCorreos, reclamarCorreos, validarSolicitud, type SolicitudInput } from './index';

const MIGRACIONES = ['0040_solicitudes.sql', '0041_solicitudes_pedido.sql', '0044_solicitudes_envio.sql'];

let miniflare: Miniflare;
let db: D1Database;

function datos(envio: string | null): SolicitudInput {
  const f = new FormData();
  f.set('slug', 'consulta');
  f.set('nombre', 'Ana');
  f.set('email', 'ana@ejemplo.es');
  f.set('consentimiento', 'si');
  f.set('mensaje', 'Quiero una web');
  if (envio) f.set('envio', envio);
  const v = validarSolicitud(f, []);
  if (!v.ok || v.spam) throw new Error('formulario de prueba no válido');
  return v.data;
}

async function contar(): Promise<number> {
  return (await db.prepare('SELECT COUNT(*) AS n FROM solicitudes').first<number>('n')) ?? 0;
}

describe('idempotencia de solicitudes', () => {
  beforeAll(async () => {
    miniflare = new Miniflare({
      modules: true,
      script: 'export default { fetch() { return new Response("ok") } }',
      compatibilityDate: '2026-07-20',
      d1Databases: ['DB'],
    });
    db = (await miniflare.getD1Database('DB')) as unknown as D1Database;
    for (const m of MIGRACIONES) {
      const sql = readFileSync(new URL(`../../../migrations/${m}`, import.meta.url), 'utf8').replace(/--.*$/gm, '');
      for (const sentencia of sql.split(';').map((x) => x.trim()).filter(Boolean)) await db.prepare(sentencia).run();
    }
  });

  afterAll(async () => {
    await miniflare?.dispose();
  });

  it('el mismo token devuelve la misma solicitud y no crea otra', async () => {
    const token = crypto.randomUUID();
    const a = await crearSolicitud(db, datos(token));
    const b = await crearSolicitud(db, datos(token));
    expect(b).toBe(a);
    expect(await contar()).toBe(1);
  });

  it('dos envíos a la vez con el mismo token dejan una sola fila', async () => {
    const token = crypto.randomUUID();
    const antes = await contar();
    const [a, b] = await Promise.all([crearSolicitud(db, datos(token)), crearSolicitud(db, datos(token))]);
    expect(b).toBe(a);
    expect(await contar()).toBe(antes + 1);
  });

  it('sin token (formularios antiguos) cada envío sigue creando su solicitud', async () => {
    const antes = await contar();
    const a = await crearSolicitud(db, datos(null));
    const b = await crearSolicitud(db, datos(null));
    expect(a).not.toBe(b);
    expect(await contar()).toBe(antes + 2);
  });

  it('los correos se reclaman una sola vez, también con dos envíos a la vez', async () => {
    const id = await crearSolicitud(db, datos(crypto.randomUUID()));
    const [a, b] = await Promise.all([reclamarCorreos(db, id), reclamarCorreos(db, id)]);
    expect([a, b].filter(Boolean)).toHaveLength(1);
    expect(await reclamarCorreos(db, id)).toBe(false);
  });

  it('si el envío falla, el reclamo se libera y el reintento manda los correos', async () => {
    const id = await crearSolicitud(db, datos(crypto.randomUUID()));
    expect(await reclamarCorreos(db, id)).toBe(true);
    await liberarCorreos(db, id);
    expect(await reclamarCorreos(db, id)).toBe(true);
  });

  it('una reserva sin confirmar (Worker cortado) caduca y el reintento manda los correos', async () => {
    const id = await crearSolicitud(db, datos(crypto.randomUUID()));
    expect(await reclamarCorreos(db, id)).toBe(true);
    expect(await reclamarCorreos(db, id)).toBe(false);
    await db.prepare("UPDATE solicitudes SET correos_at = datetime('now', '-11 minutes') WHERE public_id = ?").bind(id).run();
    expect(await reclamarCorreos(db, id)).toBe(true);
  });

  it('con los correos confirmados no hay más envíos, aunque pase el tiempo o se libere', async () => {
    const id = await crearSolicitud(db, datos(crypto.randomUUID()));
    expect(await reclamarCorreos(db, id)).toBe(true);
    await confirmarCorreos(db, id);
    await liberarCorreos(db, id);
    await db.prepare("UPDATE solicitudes SET correos_at = datetime('now', '-1 day') WHERE public_id = ?").bind(id).run();
    expect(await reclamarCorreos(db, id)).toBe(false);
  });

  it('un token con forma rara se descarta en vez de guardarse', () => {
    expect(datos('corto').envio).toBeNull();
    expect(datos("x'; DROP TABLE solicitudes; --1234567").envio).toBeNull();
  });
});

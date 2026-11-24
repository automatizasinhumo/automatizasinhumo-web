import { describe, expect, it } from 'vitest';
import { d1 } from './d1Prueba';
import { publicarPagina } from './paginas';
import { contarVisita, diaHace, paginasDeCliente } from './panelCliente';

const PEDIDOS = `
CREATE TABLE orders (id INTEGER PRIMARY KEY, public_id TEXT UNIQUE, email TEXT);
CREATE TABLE order_guest_access (order_public_id TEXT PRIMARY KEY, access_token TEXT NOT NULL UNIQUE, generation INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')), rotated_at TEXT, hidden_at TEXT);`;
const MIGRACIONES = ['0048_paginas_publicadas.sql', '0049_dominios_paginas.sql', '0050_dominios_registro.sql', '0051_paginas_versiones.sql', '0052_paginas_visitas.sql'];
const NAVEGADOR = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
const HOY = new Date('2026-11-24T10:00:00Z');

async function montar() {
  const db = d1(MIGRACIONES, PEDIDOS);
  db.sql.exec(`INSERT INTO orders (id, public_id, email) VALUES (1, 'ord_a', 'ana@x.es'), (2, 'ord_b', 'otro@x.es');
    INSERT INTO order_guest_access (order_public_id, access_token) VALUES ('ord_a', 'tok-a'), ('ord_b', 'tok-b');`);
  const web = await publicarPagina(db, 'web', 'ord_a', 'Peluquería Ana', { n: 1 });
  await publicarPagina(db, 'web', 'ord_b', 'Bar Otro', { n: 1 });
  return { db, web };
}

describe('panel del cliente', () => {
  it('lista solo las páginas de su correo, con enlace para editar y su dominio activo', async () => {
    const { db, web } = await montar();
    db.sql.exec(`INSERT INTO dominios_paginas (dominio, tipo, pedido_public_id, estado) VALUES ('ana.es', 'web', 'ord_a', 'activo')`);
    const ps = await paginasDeCliente(db, 'ana@x.es', HOY);
    expect(ps).toHaveLength(1);
    expect(ps[0]).toMatchObject({ tipo: 'web', slug: web, ruta: `/w/${web}`, dominio: 'ana.es', visitas7: 0, visitas30: 0 });
    expect(ps[0]!.editar).toContain('#pedido=tok-a');
    expect(await paginasDeCliente(db, 'nadie@x.es', HOY)).toEqual([]);
  });

  it('un dominio aún sin DNS no se enseña como suyo', async () => {
    const { db } = await montar();
    db.sql.exec(`INSERT INTO dominios_paginas (dominio, tipo, pedido_public_id) VALUES ('ana.es', 'web', 'ord_a')`);
    expect((await paginasDeCliente(db, 'ana@x.es', HOY))[0]!.dominio).toBeNull();
  });

  it('cuenta visitas por día, sin robots, y las suma a 7 y 30 días', async () => {
    const { db, web } = await montar();
    await contarVisita(db, 'web', web, NAVEGADOR, HOY);
    await contarVisita(db, 'web', web, NAVEGADOR, HOY);
    await contarVisita(db, 'web', web, 'Googlebot/2.1 (+http://www.google.com/bot.html)', HOY);
    await contarVisita(db, 'web', web, null, HOY);
    await contarVisita(db, 'web', web, NAVEGADOR, new Date(HOY.getTime() - 10 * 86_400_000));
    await contarVisita(db, 'web', web, NAVEGADOR, new Date(HOY.getTime() - 40 * 86_400_000));
    const [p] = await paginasDeCliente(db, 'ana@x.es', HOY);
    expect(p).toMatchObject({ visitas7: 2, visitas30: 3 });
    expect(db.sql.prepare('SELECT n FROM paginas_visitas WHERE dia = ?').get(diaHace(0, HOY))).toEqual({ n: 2 });
  });

  it('un fallo de la base al contar no rompe la página', async () => {
    const roto = { prepare: () => { throw new Error('D1 caída'); } } as unknown as D1Database;
    await expect(contarVisita(roto, 'web', 'x', NAVEGADOR, HOY)).resolves.toBeUndefined();
  });
});

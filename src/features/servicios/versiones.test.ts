import { d1 as d1Prueba } from './d1Prueba';
import { describe, expect, it } from 'vitest';
import { fechaVersion } from './estudioWeb';
import { MAX_VERSIONES, paginaDePedido, publicarPagina, versionDePedido, versionesDePedido, type Validador } from './paginas';

const d1 = () => d1Prueba(['0048_paginas_publicadas.sql', '0051_paginas_versiones.sql']);

type D = { n: number };
const validar: Validador<D> = (x) =>
  typeof (x as D)?.n === 'number' && (x as D).n >= 0 ? { ok: true, datos: x as D } : { ok: false, error: 'n' };

describe('versiones de páginas publicadas', () => {
  it('la primera publicación no deja versión; republicar guarda la anterior', async () => {
    const db = d1();
    const slug = await publicarPagina(db, 'web', 'p1', 'Lola', { n: 1 });
    expect(await versionesDePedido(db, 'web', 'p1')).toEqual([]);
    expect(await publicarPagina(db, 'web', 'p1', 'Otro nombre', { n: 2 })).toBe(slug);
    const vs = await versionesDePedido(db, 'web', 'p1');
    expect(vs).toHaveLength(1);
    expect(await versionDePedido(db, 'web', 'p1', vs[0]!.id, validar)).toEqual({ n: 1 });
    expect((await paginaDePedido(db, 'web', 'p1', validar))?.datos).toEqual({ n: 2 });
  });

  it('guardar sin cambios no llena el historial', async () => {
    const db = d1();
    await publicarPagina(db, 'web', 'p1', 'Lola', { n: 1 });
    await publicarPagina(db, 'web', 'p1', 'Lola', { n: 1 });
    await publicarPagina(db, 'web', 'p1', 'Lola', { n: 1 });
    expect(await versionesDePedido(db, 'web', 'p1')).toEqual([]);
  });

  it(`se conservan las ${MAX_VERSIONES} más recientes, de la última a la primera`, async () => {
    const db = d1();
    for (let n = 0; n <= MAX_VERSIONES + 5; n++) await publicarPagina(db, 'web', 'p1', 'Lola', { n });
    const vs = await versionesDePedido(db, 'web', 'p1');
    expect(vs).toHaveLength(MAX_VERSIONES);
    expect(await versionDePedido(db, 'web', 'p1', vs[0]!.id, validar)).toEqual({ n: MAX_VERSIONES + 4 });
    expect(await versionDePedido(db, 'web', 'p1', vs.at(-1)!.id, validar)).toEqual({ n: 5 });
  });

  it('una versión de otro pedido o tipo nunca se entrega', async () => {
    const db = d1();
    await publicarPagina(db, 'web', 'p1', 'Lola', { n: 1 });
    await publicarPagina(db, 'web', 'p1', 'Lola', { n: 2 });
    const [v] = await versionesDePedido(db, 'web', 'p1');
    expect(await versionDePedido(db, 'web', 'p2', v!.id, validar)).toBeNull();
    expect(await versionDePedido(db, 'tarjeta', 'p1', v!.id, validar)).toBeNull();
    expect(await versionesDePedido(db, 'web', 'p2')).toEqual([]);
    for (const id of [0, -1, 1.5, Number.NaN]) expect(await versionDePedido(db, 'web', 'p1', id, validar)).toBeNull();
  });

  it('una versión que ya no pasa el validador actual no se restaura', async () => {
    const db = d1();
    await publicarPagina(db, 'web', 'p1', 'Lola', { n: -1 });
    await publicarPagina(db, 'web', 'p1', 'Lola', { n: 2 });
    const [v] = await versionesDePedido(db, 'web', 'p1');
    expect(await versionDePedido(db, 'web', 'p1', v!.id, validar)).toBeNull();
  });

  it('restaurar es republicar: lo que había pasa al historial y se puede deshacer', async () => {
    const db = d1();
    await publicarPagina(db, 'web', 'p1', 'Lola', { n: 1 });
    await publicarPagina(db, 'web', 'p1', 'Lola', { n: 2 });
    const [v] = await versionesDePedido(db, 'web', 'p1');
    await publicarPagina(db, 'web', 'p1', 'Lola', (await versionDePedido(db, 'web', 'p1', v!.id, validar))!);
    expect((await paginaDePedido(db, 'web', 'p1', validar))?.datos).toEqual({ n: 1 });
    const vs = await versionesDePedido(db, 'web', 'p1');
    expect(await versionDePedido(db, 'web', 'p1', vs[0]!.id, validar)).toEqual({ n: 2 });
  });

  it('la fecha de la versión guarda cuándo se publicó aquella, no cuándo se reemplazó', async () => {
    const db = d1();
    await publicarPagina(db, 'web', 'p1', 'Lola', { n: 1 });
    db.sql.prepare("UPDATE paginas_publicadas SET updated_at = '2026-01-02 08:30:00'").run();
    await publicarPagina(db, 'web', 'p1', 'Lola', { n: 2 });
    expect((await versionesDePedido(db, 'web', 'p1'))[0]!.created_at).toBe('2026-01-02 08:30:00');
  });

  it('fecha legible en la hora local del cliente', () => {
    expect(fechaVersion('2026-01-02 08:30:00', 'es-ES', 'Europe/Madrid')).toMatch(/2 ene 2026.*09:30/);
    expect(fechaVersion('basura')).toBe('basura');
  });
});

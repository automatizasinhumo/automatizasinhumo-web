import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TTL_MS, conCache, esLectura, olvidarCacheTienda } from './cacheTienda';

describe('cacheTienda', () => {
  beforeEach(() => olvidarCacheTienda());

  it('lee una vez por TTL', async () => {
    const cargar = vi.fn(async () => 'a');
    await conCache(cargar, 0);
    await conCache(cargar, TTL_MS - 1);
    expect(cargar).toHaveBeenCalledTimes(1);
    await conCache(cargar, TTL_MS);
    expect(cargar).toHaveBeenCalledTimes(2);
  });

  it('una escritura la vacía', async () => {
    const cargar = vi.fn(async () => 'a');
    await conCache(cargar, 0);
    olvidarCacheTienda();
    await conCache(cargar, 1);
    expect(cargar).toHaveBeenCalledTimes(2);
  });

  it('no guarda un fallo', async () => {
    await expect(conCache(async () => { throw new Error('D1'); }, 0)).rejects.toThrow('D1');
    expect(await conCache(async () => 'b', 1)).toBe('b');
  });

  it('solo GET y HEAD son lecturas', () => {
    expect(esLectura('GET')).toBe(true);
    expect(esLectura('HEAD')).toBe(true);
    for (const m of ['POST', 'PUT', 'PATCH', 'DELETE']) expect(esLectura(m)).toBe(false);
  });
});

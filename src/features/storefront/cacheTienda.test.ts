import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TTL_MS, conCache, esLectura, olvidarCacheTienda, ttlDesdeEnv } from './cacheTienda';

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
  it('las peticiones concurrentes comparten una carga', async () => {
    let soltar!: (v: string) => void;
    const cargar = vi.fn(() => new Promise<string>((r) => { soltar = r; }));
    const a = conCache(cargar, 0);
    const b = conCache(cargar, 1);
    soltar('x');
    expect(await Promise.all([a, b])).toEqual(['x', 'x']);
    expect(cargar).toHaveBeenCalledTimes(1);
  });

  it('una carga anterior al vaciado no vuelve a guardarse', async () => {
    let soltar!: (v: string) => void;
    const vieja = conCache(() => new Promise<string>((r) => { soltar = r; }), 0);
    olvidarCacheTienda();
    const cargar = vi.fn(async () => 'nuevo');
    soltar('viejo');
    expect(await vieja).toBe('viejo');
    expect(await conCache(cargar, 1)).toBe('nuevo');
    expect(await conCache(cargar, 2)).toBe('nuevo');
    expect(cargar).toHaveBeenCalledTimes(1);
  });

  it('STORE_CACHE_TTL_MS=0 desactiva la caché; valores no válidos usan TTL_MS', async () => {
    expect(ttlDesdeEnv('0')).toBe(0);
    expect(ttlDesdeEnv('5000')).toBe(5000);
    for (const v of [undefined, '', 'x', '-1', '1.5', 3]) expect(ttlDesdeEnv(v)).toBe(TTL_MS);
    const cargar = vi.fn(async () => 'v');
    await conCache(cargar, 10, 0);
    await conCache(cargar, 10, 0);
    expect(cargar).toHaveBeenCalledTimes(2);
  });
});

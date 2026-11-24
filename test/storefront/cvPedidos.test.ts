// Volver de pagar un extra suelto no esconde el CV ya pagado (CodeRabbit en #192, 24/11).
import { describe, expect, it } from 'vitest';
import { MAX_TOKENS, consultarPedidos, leerTokens, sumarToken } from '../../src/features/servicios/compraEstudio';
import { combinarPedidosCv, type PagadoCv } from '../../src/features/servicios/cvPedidos';

const p = (token: string, d: Partial<PagadoCv>) => ({ token, d: { ref: `R-${token}`, cv: null, tarjeta: null, ...d } as PagadoCv });

describe('tokens de la pestaña', () => {
  it('lee la lista y también el token suelto de antes', () => {
    expect(leerTokens('')).toEqual([]);
    expect(leerTokens('abc')).toEqual(['abc']);
    expect(leerTokens('["a","b"]')).toEqual(['a', 'b']);
    expect(leerTokens('[roto')).toEqual([]);
    expect(leerTokens('[1,"a",""]')).toEqual(['a']);
  });
  it('un token nuevo se suma sin repetir y la lista no crece sin límite', () => {
    expect(sumarToken(['a', 'b'], 'a')).toEqual(['b', 'a']);
    const muchos = Array.from({ length: MAX_TOKENS + 3 }, (_, i) => `t${i}`).reduce<string[]>((l, t) => sumarToken(l, t), []);
    expect(muchos).toHaveLength(MAX_TOKENS);
    expect(muchos.at(-1)).toBe(`t${MAX_TOKENS + 2}`);
  });
});

describe('combinarPedidosCv', () => {
  it('sin pedidos, nada', () => {
    expect(combinarPedidosCv([])).toBeNull();
  });
  it('el CV pagado sigue pagado al volver con el pedido de un portal', () => {
    const r = combinarPedidosCv([p('cv', { cv: 'disenada' }), p('li', { linkedin: true })])!;
    expect(r.d).toMatchObject({ cv: 'disenada', ref: 'R-cv', linkedin: true, infojobs: false });
    expect(r.token).toBe('cv');
  });
  it('con una tarjeta comprada aparte, el token es el de la tarjeta (para publicarla)', () => {
    const tarjeta = { slug: 'ana', datos: null };
    const r = combinarPedidosCv([p('cv', { cv: 'personalizable', infojobs: true }), p('tj', { tarjeta })])!;
    expect(r.token).toBe('tj');
    expect(r.d).toMatchObject({ cv: 'personalizable', ref: 'R-cv', tarjeta, infojobs: true });
  });
  it('personalizable gana a diseñada aunque llegue antes', () => {
    expect(combinarPedidosCv([p('a', { cv: 'personalizable' }), p('b', { cv: 'disenada' })])!.d.cv).toBe('personalizable');
  });
  it('solo un extra, sin CV: cv null (se ofrece comprar el CV, no se regala)', () => {
    const r = combinarPedidosCv([p('li', { linkedin: true })])!;
    expect(r.d.cv).toBeNull();
    expect(r.token).toBe('li');
  });
});

describe('borrador de la tarjeta', () => {
  it('va con la referencia del pedido que pagó la tarjeta, no con la del CV', () => {
    const tj = (s: string) => ({ slug: s, datos: null });
    const b = combinarPedidosCv([p('cv', { cv: 'disenada' }), p('B', { tarjeta: tj('b') })])!;
    expect(b.d).toMatchObject({ ref: 'R-cv', refTarjeta: 'R-B' });
    const c = combinarPedidosCv([p('cv', { cv: 'disenada' }), p('B', { tarjeta: tj('b') }), p('C', { tarjeta: tj('c') })])!;
    expect(c).toMatchObject({ token: 'C', d: { ref: 'R-cv', refTarjeta: 'R-C' } });
    // Añadir un portal no cambia la tarjeta ni su borrador.
    expect(combinarPedidosCv([p('cv', { cv: 'disenada' }), p('B', { tarjeta: tj('b') }), p('li', { linkedin: true })])!.d.refTarjeta).toBe('R-B');
    expect(combinarPedidosCv([p('cv', { cv: 'disenada' })])!.d.refTarjeta).toBeUndefined();
  });
});

describe('consultarPedidos', () => {
  const resp = (status: number, d?: unknown) => ({ status, ok: status < 300, json: async () => d }) as Response;
  it('un 503 o un fallo de red no es un pedido caducado ni tumba los demás', async () => {
    const pedir = (async (_u: string, i: RequestInit) => {
      const t = JSON.parse(String(i.body)).token as string;
      if (t === 'red') throw new Error('sin red');
      return t === 'cv' ? resp(503) : t === 'viejo' ? resp(404) : resp(200, { ref: t });
    }) as typeof fetch;
    const r = await consultarPedidos(['cv', 'red', 'viejo', 'li'], '/x', () => true, pedir);
    expect(r.fallidos).toEqual(['cv', 'red']);
    expect(r.caducados).toEqual(['viejo']);
    expect(r.cargados).toEqual([{ token: 'li', d: { ref: 'li' } }]);
  });
  it('deja de consultar si cambia el pedido a mitad', async () => {
    let n = 0;
    const pedir = (async () => (n++, resp(200, {}))) as unknown as typeof fetch;
    await consultarPedidos(['a', 'b', 'c'], '/x', () => n < 1, pedir);
    expect(n).toBe(1);
  });
});

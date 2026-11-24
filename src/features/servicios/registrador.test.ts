import { describe, expect, it, vi } from 'vitest';
import { configRegistrador, cotizarDominios, validarTitular } from './registrador';

const CFG = { token: 't', cuenta: 'acc', worker: 'tienda', precioMax: 15 };

describe('configRegistrador', () => {
  it('solo con dominios configurados y CF_REGISTRAR_ACTIVO=1; precio máximo por defecto 15', () => {
    const base = { token: 't', cuenta: 'acc', worker: 'w' };
    expect(configRegistrador(base, {})).toBeNull();
    // Sin cobro del dominio en el carrito no se ofrece ni se registra ninguno.
    expect(configRegistrador(base, { CF_REGISTRAR_ACTIVO: '1' })).toBeNull();
    expect(configRegistrador(null, { CF_REGISTRAR_ACTIVO: '1', CF_DOMINIO_COBRO: '1' })).toBeNull();
    expect(configRegistrador(base, { CF_REGISTRAR_ACTIVO: '1', CF_DOMINIO_COBRO: '1' })?.precioMax).toBe(15);
    expect(configRegistrador(base, { CF_REGISTRAR_ACTIVO: '1', CF_DOMINIO_COBRO: '1', CF_DOMINIO_PRECIO_MAX: '25' })?.precioMax).toBe(25);
  });
});

describe('cotizarDominios', () => {
  it('clasifica incluido, ocupado, premium, caro y extensión no vendida', async () => {
    const f = vi.fn(async () =>
      new Response(
        JSON.stringify({
          success: true,
          result: {
            domains: [
              { name: 'lola.com', registrable: true, tier: 'standard', pricing: { currency: 'USD', registration_cost: '10.46', renewal_cost: '10.46' } },
              { name: 'pepe.com', registrable: false, reason: 'domain_unavailable' },
              { name: 'oro.com', registrable: false, reason: 'domain_premium', tier: 'premium' },
              { name: 'lola.io', registrable: true, tier: 'standard', pricing: { currency: 'USD', registration_cost: '50.00', renewal_cost: '50.00' } },
            ],
          },
        }),
      ),
    ) as unknown as typeof fetch;
    const r = await cotizarDominios(CFG, ['lola.com', 'pepe.com', 'oro.com', 'lola.io', 'lola.es', 'lola.com'], f);
    expect(r.map((c) => [c.dominio, c.incluido, c.motivo])).toEqual([
      ['lola.com', true, null],
      ['pepe.com', false, 'ocupado'],
      ['oro.com', false, 'premium'],
      ['lola.io', false, 'caro'],
      ['lola.es', false, 'extension'],
    ]);
    expect(r[0]!.precio).toBe(10.46);
  });
});

describe('validarTitular', () => {
  const ok = {
    nombre: 'Lola Pérez',
    email: 'Lola@Example.es',
    telefono: '+34 612 345 678',
    calle: 'Calle Mayor 3',
    ciudad: 'Madrid',
    provincia: 'Madrid',
    cp: '28013',
    pais: 'es',
  };
  it('normaliza correo, país y teléfono al formato del registro', () => {
    const r = validarTitular(ok);
    expect(r.ok && r.titular).toMatchObject({ email: 'lola@example.es', pais: 'ES', telefono: '+34.612345678', empresa: '' });
    const pt = validarTitular({ ...ok, pais: 'PT', telefono: '00351 912 345 678', cp: '1000-001' });
    expect(pt.ok && pt.titular.telefono).toBe('+351.912345678');
  });
  it.each([
    [{ nombre: 'Lola' }, 'nombre'],
    [{ email: 'lola@' }, 'email'],
    [{ pais: 'ZZ' }, 'pais'],
    [{ telefono: '512345678' }, 'telefono'],
    [{ calle: 'C/' }, 'calle'],
    [{ cp: '2801' }, 'cp'],
  ])('señala el campo que falla: %o → %s', (cambio, campo) => {
    expect(validarTitular({ ...ok, ...cambio })).toEqual({ ok: false, campo });
  });
});

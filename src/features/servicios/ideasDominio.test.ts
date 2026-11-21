import { describe, expect, it, vi } from 'vitest';
import { dominioLibre, ideasDominio, ideasLibres } from './ideasDominio';

const dns = (libres: string[]) =>
  vi.fn(async (url: string | URL | Request) => {
    const nombre = new URL(String(url)).searchParams.get('name')!;
    return new Response(JSON.stringify({ Status: libres.includes(nombre) ? 3 : 0 }));
  }) as unknown as typeof fetch;

describe('ideasDominio', () => {
  it('quita tildes, sociedad y artículos, y añade la localidad', () => {
    const c = ideasDominio('Peluquería La Lola, S.L.', 'Calle Mayor 3, 28013 Madrid');
    expect(c[0]).toBe('peluquerialola.es');
    expect(c).toContain('peluquerialalola.es');
    expect(c).toContain('peluquerialola.com');
    expect(c).toContain('peluquerialolamadrid.es');
    expect(c.length).toBeLessThanOrEqual(5);
    expect(new Set(c).size).toBe(c.length);
  });
  it('sin nombre útil no propone nada', () => {
    expect(ideasDominio('  ¡!  ')).toEqual([]);
  });
  it('cambia la ñ por n', () => {
    expect(ideasDominio('Panadería Muñoz')[0]).toBe('panaderiamunoz.es');
  });
});

describe('dominioLibre', () => {
  it('NXDOMAIN es libre, NOERROR ocupado, el resto desconocido', async () => {
    const f = dns(['libre.es']);
    expect(await dominioLibre('libre.es', f)).toBe(true);
    expect(await dominioLibre('ocupado.es', f)).toBe(false);
    const roto = vi.fn(async () => {
      throw new Error('red');
    }) as unknown as typeof fetch;
    expect(await dominioLibre('x.es', roto)).toBeNull();
    const raro = vi.fn(async () => new Response(JSON.stringify({ Status: 2 }))) as unknown as typeof fetch;
    expect(await dominioLibre('x.es', raro)).toBeNull();
  });
});

describe('ideasLibres', () => {
  it('devuelve solo las libres, en orden', async () => {
    const f = dns(['bartito.com', 'bartitosevilla.es']);
    expect(await ideasLibres('Bar Tito', 'Plaza Nueva 1, Sevilla', f)).toEqual(['bartito.com', 'bartitosevilla.es']);
  });
});

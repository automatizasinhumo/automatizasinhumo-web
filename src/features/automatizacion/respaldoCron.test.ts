import { describe, expect, it, vi } from 'vitest';
import { franja, lanzarProgramados, programadosEn } from './respaldoCron';

const nombres = (d: string) => programadosEn(new Date(d)).map((p) => p.workflow);

describe('programadosEn', () => {
  it('la fábrica toca a los 05, 20, 35 y 50 de cada hora', () => {
    for (const m of ['05', '20', '35', '50']) {
      expect(nombres(`2026-11-18T10:${m}:00Z`)).toContain('fabrica-vistas-previas.yml');
    }
    for (const m of ['00', '10', '15', '30', '45', '55']) {
      expect(nombres(`2026-11-18T10:${m}:00Z`)).toEqual([]);
    }
  });

  it('un tick con retraso cae en su franja y no dispara dos veces', () => {
    expect(nombres('2026-11-18T10:07:40Z')).toEqual(['fabrica-vistas-previas.yml']);
    expect(nombres('2026-11-18T10:10:02Z')).toEqual([]);
  });

  it('los semanales solo el lunes a las 06:20 UTC', () => {
    // 2026-11-23 es lunes.
    expect(nombres('2026-11-23T06:20:00Z')).toEqual([
      'fabrica-vistas-previas.yml',
      'empleados-qa.yml',
      'seguridad.yml',
      'empleados-semanales.yml',
      'vigilantes-cadena.yml',
    ]);
    expect(nombres('2026-11-24T06:20:00Z')).toEqual(['fabrica-vistas-previas.yml']);
    expect(nombres('2026-11-23T07:20:00Z')).toEqual(['fabrica-vistas-previas.yml']);
  });
});

describe('lanzarProgramados', () => {
  const tick = new Date('2026-11-18T10:05:00Z');

  it('sin token o sin repo no llama a nada', async () => {
    const pedir = vi.fn();
    expect(await lanzarProgramados(tick, undefined, 'a/b', pedir)).toEqual({ lanzados: [], fallidos: [] });
    expect(await lanzarProgramados(tick, 't', undefined, pedir)).toEqual({ lanzados: [], fallidos: [] });
    expect(pedir).not.toHaveBeenCalled();
  });

  it('rechaza un repo que no es dueño/repo', async () => {
    const pedir = vi.fn();
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    await lanzarProgramados(tick, 't', 'a/b/../../x', pedir);
    expect(pedir).not.toHaveBeenCalled();
    error.mockRestore();
  });

  it('lanza la fábrica en main con max=3 y el token en la cabecera', async () => {
    const pedir = vi.fn(async () => new Response(null, { status: 204 }));
    const r = await lanzarProgramados(tick, 'secreto', 'org/repo', pedir as unknown as typeof fetch);
    expect(r).toEqual({ lanzados: ['fabrica-vistas-previas.yml'], fallidos: [] });
    const [url, init] = pedir.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('https://api.github.com/repos/org/repo/actions/workflows/fabrica-vistas-previas.yml/dispatches');
    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer secreto');
    expect(JSON.parse(init.body as string)).toEqual({ ref: 'main', inputs: { max: '3' } });
  });

  it('franja redondea a 5 minutos en UTC', () => {
    expect(franja(new Date('2026-11-18T10:07:40Z'))).toBe('2026-11-18T10:05');
  });

  it('si la franja ya está reclamada no lanza nada', async () => {
    const pedir = vi.fn();
    const reclamar = vi.fn(async () => false);
    const r = await lanzarProgramados(tick, 't', 'org/repo', pedir, reclamar);
    expect(r).toEqual({ lanzados: [], fallidos: [] });
    expect(reclamar).toHaveBeenCalledWith('2026-11-18T10:05');
    expect(pedir).not.toHaveBeenCalled();
  });

  it('sin nada debido no reclama la franja', async () => {
    const reclamar = vi.fn(async () => true);
    await lanzarProgramados(new Date('2026-11-18T10:00:00Z'), 't', 'org/repo', vi.fn(), reclamar);
    expect(reclamar).not.toHaveBeenCalled();
  });

  it('un fallo HTTP se anota sin registrar el token', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const pedir = vi.fn(async () => new Response('Bad credentials secreto', { status: 401 }));
    const r = await lanzarProgramados(tick, 'secreto', 'org/repo', pedir as unknown as typeof fetch);
    expect(r.fallidos).toEqual(['fabrica-vistas-previas.yml']);
    expect(JSON.stringify(error.mock.calls)).not.toContain('secreto');
    error.mockRestore();
  });
});

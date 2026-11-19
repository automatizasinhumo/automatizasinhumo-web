import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it, vi } from 'vitest';
import { franja, lanzarProgramados, type Marcas, PROGRAMADOS, pendientes, semana } from './respaldoCron';

const nombres = (d: string, hechos: Record<string, string> = {}) =>
  pendientes(new Date(d), hechos).map((p) => p.programado.workflow);

const SEMANALES = ['empleados-qa.yml', 'seguridad.yml', 'empleados-semanales.yml', 'vigilantes-cadena.yml', 'desplegar-staging.yml'];
/** Diarios ya lanzados en cualquier periodo de estas pruebas (se prueban aparte). */
const DIARIOS_HECHOS = { 'indexnow.yml': '9999-12-31@~' };

/** Marcas en memoria con la misma semántica (comparar e intercambiar) que D1. */
function marcasMemoria(inicial: Record<string, string> = {}): Marcas & { datos: Record<string, string> } {
  const datos = { ...inicial };
  return {
    datos,
    leer: async () => ({ ...datos }),
    reclamar: async (w, leida, v) => {
      if (datos[w] !== leida) return false;
      datos[w] = v;
      return true;
    },
    cambiar: async (w, actual, nuevo) => {
      if (datos[w] !== actual) return;
      if (nuevo === undefined) delete datos[w];
      else datos[w] = nuevo;
    },
  };
}

const ok = () => vi.fn(async () => new Response(null, { status: 204 }));

describe('periodos', () => {
  it('franja redondea a 5 minutos en UTC', () => {
    expect(franja(new Date('2026-11-18T10:07:40Z'))).toBe('2026-11-18T10:05');
  });

  it('semana empieza el lunes a las 06:20 UTC', () => {
    // 2026-11-23 es lunes.
    expect(semana(new Date('2026-11-23T06:19:59Z'))).toBe('2026-11-16T06:20');
    expect(semana(new Date('2026-11-23T06:20:00Z'))).toBe('2026-11-23T06:20');
    expect(semana(new Date('2026-11-29T23:59:00Z'))).toBe('2026-11-23T06:20');
  });
});

describe('pendientes', () => {
  const semanaPasada = { ...Object.fromEntries(SEMANALES.map((w) => [w, '2026-11-16T06:20@~'])), ...DIARIOS_HECHOS };

  it('la fábrica toca a los 05, 20, 35 y 50 de cada hora', () => {
    for (const m of ['05', '20', '35', '50']) {
      expect(nombres(`2026-11-18T10:${m}:00Z`, semanaPasada)).toEqual(['fabrica-vistas-previas.yml']);
    }
    for (const m of ['00', '10', '15', '30', '45', '55']) {
      expect(nombres(`2026-11-18T10:${m}:00Z`, semanaPasada)).toEqual([]);
    }
  });

  it('un tick con retraso cae en su franja', () => {
    expect(nombres('2026-11-18T10:07:40Z', semanaPasada)).toEqual(['fabrica-vistas-previas.yml']);
  });

  it('los semanales tocan desde el lunes 06:20 hasta que se lanzan', () => {
    expect(nombres('2026-11-23T06:15:00Z', semanaPasada)).toEqual([]);
    expect(nombres('2026-11-23T06:20:00Z', semanaPasada)).toEqual(['fabrica-vistas-previas.yml', ...SEMANALES]);
    // Un semanal que falló el lunes sigue pendiente el martes.
    const hechos: Record<string, string> = { ...DIARIOS_HECHOS };
    for (const w of SEMANALES) hechos[w] = w === 'seguridad.yml' ? '2026-11-16T06:20@~' : '2026-11-23T06:20@~';
    expect(nombres('2026-11-24T09:00:00Z', hechos)).toEqual(['seguridad.yml']);
  });

  it('indexnow toca una vez al día desde las 05:23 UTC', () => {
    const resto = { ...semanaPasada };
    delete (resto as Record<string, string>)['indexnow.yml'];
    expect(nombres('2026-11-18T10:00:00Z', resto)).toEqual(['indexnow.yml']);
    expect(nombres('2026-11-18T10:00:00Z', { ...resto, 'indexnow.yml': '2026-11-18@~' })).toEqual([]);
    expect(nombres('2026-11-19T05:20:00Z', { ...resto, 'indexnow.yml': '2026-11-18@~' })).toEqual(['fabrica-vistas-previas.yml']);
    expect(nombres('2026-11-19T05:30:00Z', { ...resto, 'indexnow.yml': '2026-11-18@~' })).toEqual(['indexnow.yml']);
  });

  it('una reserva sin confirmar bloquea 30 minutos y luego caduca', () => {
    const reservada = { ...semanaPasada, 'seguridad.yml': '2026-11-23T06:20@2026-11-23T06:20' };
    expect(nombres('2026-11-23T06:35:00Z', reservada)).toEqual(['fabrica-vistas-previas.yml', ...SEMANALES.filter((w) => w !== 'seguridad.yml')]);
    expect(nombres('2026-11-23T06:50:00Z', reservada)).toContain('seguridad.yml');
  });
});

describe('lanzarProgramados', () => {
  const tick = new Date('2026-11-18T10:05:00Z');
  const semanaHecha = { ...Object.fromEntries(SEMANALES.map((w) => [w, '2026-11-16T06:20@~'])), ...DIARIOS_HECHOS };

  it('sin token o sin repo no llama a nada', async () => {
    const pedir = vi.fn();
    const m = marcasMemoria();
    expect(await lanzarProgramados(tick, undefined, 'a/b', m, pedir)).toEqual({ lanzados: [], fallidos: [] });
    expect(await lanzarProgramados(tick, 't', undefined, m, pedir)).toEqual({ lanzados: [], fallidos: [] });
    expect(pedir).not.toHaveBeenCalled();
  });

  it('rechaza un repo que no es dueño/repo', async () => {
    const pedir = vi.fn();
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    await lanzarProgramados(tick, 't', 'a/b/../../x', marcasMemoria(), pedir);
    expect(pedir).not.toHaveBeenCalled();
    error.mockRestore();
  });

  it('lanza la fábrica en main con max=3 y el token en la cabecera', async () => {
    const pedir = ok();
    const r = await lanzarProgramados(tick, 'secreto', 'org/repo', marcasMemoria(semanaHecha), pedir as unknown as typeof fetch);
    expect(r).toEqual({ lanzados: ['fabrica-vistas-previas.yml'], fallidos: [] });
    const [url, init] = pedir.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('https://api.github.com/repos/org/repo/actions/workflows/fabrica-vistas-previas.yml/dispatches');
    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer secreto');
    expect(JSON.parse(init.body as string)).toEqual({ ref: 'main', inputs: { max: '3' } });
  });

  it('un tick repetido no despacha dos veces', async () => {
    const m = marcasMemoria(semanaHecha);
    const pedir = ok();
    await lanzarProgramados(tick, 't', 'org/repo', m, pedir as unknown as typeof fetch);
    await lanzarProgramados(tick, 't', 'org/repo', m, pedir as unknown as typeof fetch);
    expect(pedir).toHaveBeenCalledTimes(1);
    expect(m.datos['fabrica-vistas-previas.yml']).toBe('2026-11-18T10:05@~');
  });

  it('una reserva caducada (Worker caído a medias) se reintenta, y un hecho no se reclama', async () => {
    const m = marcasMemoria({ ...semanaHecha, 'seguridad.yml': '2026-11-23T06:20@2026-11-23T06:20' });
    const pedir = ok();
    const r = await lanzarProgramados(new Date('2026-11-23T06:50:00Z'), 't', 'org/repo', m, pedir as unknown as typeof fetch);
    expect(r.lanzados).toContain('seguridad.yml');
    expect(m.datos['seguridad.yml']).toBe('2026-11-23T06:20@~');
    expect(await m.reclamar('seguridad.yml', '2026-11-23T06:20@2026-11-23T06:20', '2026-11-23T06:20@2026-11-23T07:05')).toBe(false);
  });

  it('dos ticks que leen antes de reclamar despachan una sola vez', async () => {
    const m = marcasMemoria(semanaHecha);
    const leer = m.leer;
    // Ambos leen la marca ausente antes de que ninguno reclame.
    const lecturas = [await leer(), await leer()];
    m.leer = async () => lecturas.shift()!;
    const pedir = ok();
    await Promise.all([
      lanzarProgramados(new Date('2026-11-18T10:05:00Z'), 't', 'org/repo', m, pedir as unknown as typeof fetch),
      lanzarProgramados(new Date('2026-11-18T10:07:00Z'), 't', 'org/repo', m, pedir as unknown as typeof fetch),
    ]);
    expect(pedir).toHaveBeenCalledTimes(1);
  });

  it('en un tick sin nada debido no lee marcas', async () => {
    const m = marcasMemoria(semanaHecha);
    const leer = vi.spyOn(m, 'leer');
    await lanzarProgramados(new Date('2026-11-18T10:00:00Z'), 't', 'org/repo', m, vi.fn());
    expect(leer).not.toHaveBeenCalled();
  });

  it('un fallo parcial reintenta solo el fallido y no registra el token', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const lunes = new Date('2026-11-23T06:20:00Z');
    const m = marcasMemoria(semanaHecha);
    const pedir = vi.fn(async (url: string) =>
      url.includes('seguridad')
        ? new Response('Bad credentials secreto', { status: 503 })
        : new Response(null, { status: 204 }),
    );
    const r = await lanzarProgramados(lunes, 'secreto', 'org/repo', m, pedir as unknown as typeof fetch);
    expect(r.fallidos).toEqual(['seguridad.yml']);
    expect(m.datos['seguridad.yml']).toBe('2026-11-16T06:20@~');
    expect(JSON.stringify(error.mock.calls)).not.toContain('secreto');

    // El siguiente tick de la fábrica reintenta solo seguridad.yml.
    const r2 = await lanzarProgramados(
      new Date('2026-11-23T06:35:00Z'),
      'secreto',
      'org/repo',
      m,
      ok() as unknown as typeof fetch,
    );
    expect(r2.lanzados).toEqual(['fabrica-vistas-previas.yml', 'seguridad.yml']);
    error.mockRestore();
  });
});

describe('cobertura del respaldo', () => {
  // GitHub no dispara `schedule` en este repo: un workflow programado fuera de la lista no correría nunca.
  it('todo workflow con `schedule` está en PROGRAMADOS', () => {
    const dir = new URL('../../../.github/workflows/', import.meta.url);
    const programados = readdirSync(dir)
      .filter((f) => /\.ya?ml$/.test(f) && /^\s*schedule:/m.test(readFileSync(new URL(f, dir), 'utf8')))
      .sort();
    expect(PROGRAMADOS.map((p) => p.workflow).sort()).toEqual(programados);
  });
});

import { describe, expect, it } from 'vitest';
import { CLAVE_INICIO, guardarInicio, limpiarNegocio, MAX_NEGOCIO, tomarInicio } from './inicioRapido';

function memoria() {
  const m = new Map<string, string>();
  return {
    m,
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => void m.set(k, v),
    removeItem: (k: string) => void m.delete(k),
  };
}

describe('inicio rápido desde la ficha', () => {
  it('guarda el nombre limpio y el estudio lo toma una sola vez', () => {
    const a = memoria();
    expect(guardarInicio('  Peluquería   Alba ', a)).toBe(true);
    expect(tomarInicio(a)).toBe('Peluquería Alba');
    expect(tomarInicio(a)).toBe('');
    expect(a.m.has(CLAVE_INICIO)).toBe(false);
  });

  it('no guarda un nombre vacío ni sin almacenamiento', () => {
    expect(guardarInicio('   ', memoria())).toBe(false);
    expect(guardarInicio('Alba', null)).toBe(false);
    expect(tomarInicio(null)).toBe('');
  });

  it('recorta nombres larguísimos', () => {
    expect(limpiarNegocio('a'.repeat(200))).toHaveLength(MAX_NEGOCIO);
  });

  it('descarta contenido corrupto u otra versión, y lo borra', () => {
    for (const crudo of ['{', 'null', '"Alba"', '{"v":2,"negocio":"Alba"}', '{"v":1,"negocio":5}']) {
      const a = memoria();
      a.m.set(CLAVE_INICIO, crudo);
      expect(tomarInicio(a)).toBe('');
      expect(a.m.has(CLAVE_INICIO)).toBe(false);
    }
  });

  it('sobrevive a un almacenamiento que falla al escribir', () => {
    const a = { ...memoria(), setItem: () => { throw new Error('lleno'); } };
    expect(guardarInicio('Alba', a)).toBe(false);
  });
});

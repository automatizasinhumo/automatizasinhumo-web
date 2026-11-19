import { describe, expect, it } from 'vitest';
import { categoriasPara, expandirSinonimos } from './sinonimos';

describe('categoriasPara', () => {
  it('lleva las palabras del cliente a su categoría', () => {
    expect(categoriasPara('boda')).toEqual(['bodas']);
    expect(categoriasPara('Bodas')).toEqual(['bodas']);
    expect(categoriasPara('restaurantes')).toEqual(['hosteleria']);
    expect(categoriasPara('peluquería')).toEqual(['reservas']);
    expect(categoriasPara('página web')).toEqual(['webs']);
  });
  it('no inventa categorías', () => {
    expect(categoriasPara('xyz')).toEqual([]);
  });
});

describe('expandirSinonimos', () => {
  it('cambia restaurante por carta', () => {
    expect(expandirSinonimos('restaurante')).toBe('carta');
  });
  it('ignora la puntuación pegada a la palabra', () => {
    expect(expandirSinonimos('intranet,')).toBe('portal');
    expect(expandirSinonimos('¿restaurante?')).toBe('carta');
  });
});

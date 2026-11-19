import { describe, expect, it } from 'vitest';
import { categoriasPara, expandirSinonimos, gruposPorLema } from './sinonimos';

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

describe('lemas compartidos', () => {
  it('pagar, pago y paguen buscan tienda; page sigue buscando web', () => {
    expect(expandirSinonimos('pagar')).toBe('tienda');
    expect(expandirSinonimos('pago')).toBe('tienda');
    expect(expandirSinonimos('paguen online')).toBe('tienda online');
    expect(expandirSinonimos('page')).toBe('web');
  });

  it('ningún lema compartido queda empatado entre dos sinónimos', () => {
    // Si dos sinónimos empatan, el que gana depende del orden del diccionario.
    const empates = [...gruposPorLema()]
      .filter(([, porSinonimo]) => porSinonimo.size > 1)
      .filter(([, porSinonimo]) => {
        const tamaños = [...porSinonimo.values()].map((t) => t.length).sort((a, b) => b - a);
        return tamaños[0] === tamaños[1];
      })
      .map(([lema, porSinonimo]) => `${lema}: ${JSON.stringify(Object.fromEntries(porSinonimo))}`);
    expect(empates).toEqual([]);
  });
});

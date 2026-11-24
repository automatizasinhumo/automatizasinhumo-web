// Guías que salen solas (24/11): una vez por pantalla, cortas y nunca encima de quien escribe.
import { describe, expect, it } from 'vitest';
import { MAX_AUTO, pasosAMostrar } from '../../src/features/tour/guia';

const pasos = ['a', 'b', 'c', 'd', 'e', 'f'];
const base = { auto: true, apagadas: false, vista: false, escribiendo: false };

describe('pasosAMostrar', () => {
  it('sola, la primera vez, enseña solo los primeros MAX_AUTO pasos', () => {
    expect(MAX_AUTO).toBeLessThanOrEqual(3);
    expect(pasosAMostrar(pasos, base)).toEqual(pasos.slice(0, MAX_AUTO));
  });
  it('una pantalla ya enseñada no repite sola, aunque la cerraran sin terminar', () => {
    expect(pasosAMostrar(pasos, { ...base, vista: true })).toEqual([]);
  });
  it('no salta encima de alguien que ya está escribiendo', () => {
    expect(pasosAMostrar(pasos, { ...base, escribiendo: true })).toEqual([]);
  });
  it('apagadas con «No volver a mostrar», no salen solas', () => {
    expect(pasosAMostrar(pasos, { ...base, apagadas: true })).toEqual([]);
  });
  it('con el botón «Guía» sale entera, aunque ya se viera o estuvieran apagadas', () => {
    expect(pasosAMostrar(pasos, { auto: false, apagadas: true, vista: true, escribiendo: true })).toEqual(pasos);
  });
});

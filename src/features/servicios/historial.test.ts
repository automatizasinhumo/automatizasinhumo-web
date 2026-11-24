import { describe, expect, it } from 'vitest';
import { Historial } from './historial';

const nuevo = () => new Historial<string>((v) => v, 5, 1000);

describe('deshacer y rehacer del estudio', () => {
  it('el estado inicial no se puede deshacer', () => {
    const h = nuevo();
    h.registrar('a', 0);
    expect(h.puedeDeshacer).toBe(false);
    expect(h.deshacer()).toBeUndefined();
  });
  it('deshace y rehace pasos separados en el tiempo', () => {
    const h = nuevo();
    h.registrar('a', 0);
    h.registrar('b', 5000);
    h.registrar('c', 10000);
    expect(h.deshacer()).toBe('b');
    expect(h.deshacer()).toBe('a');
    expect(h.rehacer()).toBe('b');
    expect(h.rehacer()).toBe('c');
    expect(h.puedeRehacer).toBe(false);
  });
  it('escribir seguido es un solo paso, pero nunca se funde con el estado inicial', () => {
    const h = nuevo();
    h.registrar('', 0);
    h.registrar('H', 100);
    h.registrar('Ho', 300);
    h.registrar('Hol', 500);
    expect(h.deshacer()).toBe('');
    expect(h.rehacer()).toBe('Hol');
  });
  it('un estado igual al actual no cuenta como paso', () => {
    const h = nuevo();
    h.registrar('a', 0);
    expect(h.registrar('a', 5000)).toBe(false);
    expect(h.puedeDeshacer).toBe(false);
  });
  it('cambiar algo tras deshacer borra lo que quedaba por rehacer y no pisa el punto al que se volvió', () => {
    const h = nuevo();
    h.registrar('a', 0);
    h.registrar('b', 5000);
    h.registrar('c', 5500);
    expect(h.deshacer()).toBe('a');
    h.registrar('x', 5600);
    expect(h.puedeRehacer).toBe(false);
    expect(h.deshacer()).toBe('a');
  });
  it('guarda como mucho max pasos', () => {
    const h = nuevo();
    for (let n = 0; n < 9; n++) h.registrar(String(n), n * 5000);
    let pasos = 0;
    while (h.deshacer() !== undefined) pasos++;
    expect(pasos).toBe(4);
  });
});

import { describe, expect, it } from 'vitest';
import { revisarWeb, TOCABLES } from './estudioWeb';
import { EJEMPLO_WEB } from './webs';

describe('revisión antes de publicar', () => {
  it('una web vacía avisa de lo importante y cada aviso lleva a un campo tocable', () => {
    const avisos = revisarWeb({ negocio: 'X', servicios: [], preguntas: [], opiniones: [] });
    const campos = avisos.map((a) => a[0]);
    expect(campos).toEqual(expect.arrayContaining(['[name="lema"]', '[name="foto"]', '[name="telefono"]', '[data-lista="servicios"]', '[name="horario"]']));
    const validos = new Set(TOCABLES.map((t) => t[1]));
    for (const c of campos) expect(validos.has(c), c).toBe(true);
  });
  it('una web completa no tiene avisos', () => {
    expect(
      revisarWeb({
        ...EJEMPLO_WEB,
        foto: 'data:image/jpeg;base64,/9j/AAAA',
        telefono: '600123456',
        horario: 'L-V 9-14',
        servicios: [{ nombre: 'Corte', precio: '15 €', texto: '' }],
        opiniones: [{ texto: 'Genial', autor: 'Ana' }],
        preguntas: [{ pregunta: '¿Abrís?', respuesta: 'Sí' }],
      }),
    ).toEqual([]);
  });
  it('detecta preguntas sin respuesta y servicios sin precio', () => {
    const c = revisarWeb({ ...EJEMPLO_WEB, servicios: [{ nombre: 'Corte', precio: '', texto: '' }], preguntas: [{ pregunta: '¿Y?', respuesta: '' }] }).map((a) => a[1]);
    expect(c.some((t) => t.includes('sin respuesta'))).toBe(true);
    expect(c.some((t) => t.includes('precio'))).toBe(true);
  });
});

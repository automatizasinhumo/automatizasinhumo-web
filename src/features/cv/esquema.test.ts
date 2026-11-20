import { describe, expect, it } from 'vitest';
import { CV_EJEMPLO, ESQUEMA_CV, leerJsonResume, limpiar, nombreFichero, prepararCv } from './esquema';

describe('limpiar', () => {
  it('quita textos, listas y objetos vacíos que crea el formulario', () => {
    expect(limpiar({ a: ' ', b: [], c: { d: '' }, e: [{ f: '' }], g: ' hola ' })).toEqual({ g: 'hola' });
  });
  it('conserva números y booleanos', () => {
    expect(limpiar({ n: 0, b: false })).toEqual({ n: 0, b: false });
  });
  it('devuelve undefined si no queda nada', () => {
    expect(limpiar({ basics: { name: '' } })).toBeUndefined();
  });
});

describe('prepararCv', () => {
  it('pone nombre por defecto y el idioma en español', () => {
    expect(prepararCv({})).toEqual({ basics: { name: 'Tu nombre' }, meta: { language: 'es' } });
  });
  it('respeta los datos y fuerza meta.language=es', () => {
    const cv = prepararCv({ ...CV_EJEMPLO, meta: { language: 'en', version: 'v1' } });
    expect((cv.basics as { name: string }).name).toBe('Lucía Martín Ortega');
    expect(cv.meta).toEqual({ language: 'es', version: 'v1' });
    expect(Array.isArray(cv.work)).toBe(true);
  });
});

describe('leerJsonResume', () => {
  it('acepta un JSON Resume', () => {
    expect(leerJsonResume(JSON.stringify(CV_EJEMPLO))).not.toBeNull();
  });
  it('rechaza JSON que no es un CV, listas y texto roto', () => {
    expect(leerJsonResume('{"foo":1}')).toBeNull();
    expect(leerJsonResume('[1,2]')).toBeNull();
    expect(leerJsonResume('{roto')).toBeNull();
  });
  it('rechaza secciones con el tipo equivocado', () => {
    expect(leerJsonResume('{"basics":null}')).toBeNull();
    expect(leerJsonResume('{"work":{}}')).toBeNull();
    expect(leerJsonResume('{"skills":["a"]}')).toBeNull();
    expect(leerJsonResume('{"basics":{"name":"A"},"work":[]}')).not.toBeNull();
  });
});

describe('nombreFichero', () => {
  it('quita tildes y signos', () => {
    expect(nombreFichero('Íñigo Peña Muñoz', 'pdf')).toBe('cv-inigo-pena-munoz.pdf');
  });
  it('tiene nombre de reserva', () => {
    expect(nombreFichero(undefined, 'json')).toBe('cv-sin-nombre.json');
    expect(nombreFichero('***', 'html')).toBe('cv-sin-nombre.html');
  });
});

describe('ESQUEMA_CV', () => {
  it('cubre las secciones de JSON Resume que pintan las plantillas', () => {
    const secciones = Object.keys((ESQUEMA_CV as { properties: Record<string, unknown> }).properties);
    for (const s of ['basics', 'work', 'education', 'skills', 'languages', 'projects']) expect(secciones).toContain(s);
  });
});

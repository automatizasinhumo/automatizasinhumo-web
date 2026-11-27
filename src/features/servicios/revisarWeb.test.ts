import { describe, expect, it } from 'vitest';
import { revisarWeb, TOCABLES } from './estudioWeb';
import { EJEMPLO_WEB } from './webs';

const foto = 'data:image/jpeg;base64,/9j/AAAA';
const completa = {
  ...EJEMPLO_WEB,
  foto,
  galeria: [foto, foto, foto],
  telefono: '600123456',
  horario: 'L-V 9-14',
  zonas: 'Centro',
  sobre: 'Somos dos',
  sector: 'Peluquería',
  lema: 'Cortes rápidos',
  servicios: [{ nombre: 'Corte', precio: '15 €', texto: '' }],
  opiniones: [{ texto: 'Genial', autor: 'Ana' }],
  preguntas: [{ pregunta: '¿Abrís?', respuesta: 'Sí' }],
};

describe('revisión antes de publicar', () => {
  it('una web vacía apenas puntúa y cada aviso lleva a un campo tocable', () => {
    const r = revisarWeb({ negocio: 'X', servicios: [], preguntas: [], opiniones: [] });
    expect(r.puntos).toBe(8); // el precio no se penaliza dos veces; sin citas no hace falta enlace de opiniones
    const campos = r.avisos.map((a) => a[0]);
    expect(campos).toEqual(expect.arrayContaining(['[name="lema"]', '[data-foto-elegir]', '[name="telefono"]', '[data-lista="servicios"]', '[name="horario"]']));
    const validos = new Set(TOCABLES.map((t) => t[1]));
    for (const c of campos) expect(validos.has(c), c).toBe(true);
  });
  it('una web completa puntúa 100 sin avisos', () => {
    expect(revisarWeb(completa)).toEqual({ puntos: 100, avisos: [] });
  });
  it('los avisos van de más a menos puntos y suman lo que falta', () => {
    const r = revisarWeb({ ...completa, horario: '', galeria: [foto] });
    expect(r.puntos).toBe(85);
    expect(r.avisos.map((a) => a[2])).toEqual([10, 5]);
  });
  it('enlace de opiniones: avisa si no se reconoce, o si hay citas y falta', () => {
    const conCitas = { ...completa, citas: '30' as const, horario: 'Lunes a viernes 9-14' };
    expect(revisarWeb(conCitas).avisos.map((a) => a[2])).toEqual([3]);
    expect(revisarWeb({ ...conCitas, opinionesUrl: 'https://g.page/r/AbC123/review' }).puntos).toBe(100);
    expect(revisarWeb({ ...conCitas, opinionesUrl: 'https://maps.app.goo.gl/abc' }).puntos).toBe(100);
    const mala = revisarWeb({ ...completa, opinionesUrl: 'https://mi-web.es/opiniones' });
    expect(mala.puntos).toBe(97);
    expect(mala.avisos[0]![1]).toContain('no podremos pedir reseñas');
  });
  it('detecta preguntas sin respuesta y servicios sin precio', () => {
    const r = revisarWeb({ ...completa, servicios: [{ nombre: 'Corte', precio: '', texto: '' }], preguntas: [{ pregunta: '¿Y?', respuesta: '' }] });
    const textos = r.avisos.map((a) => a[1]);
    expect(textos.some((t) => t.includes('sin respuesta'))).toBe(true);
    expect(textos.some((t) => t.includes('precio'))).toBe(true);
  });
});

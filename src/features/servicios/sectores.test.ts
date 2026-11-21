import { describe, expect, it } from 'vitest';
import { MAX_SERVICIOS_WEB, validarWeb } from './webs';
import { lugarDe, SECTOR_GENERICO, SECTORES_WEB, sectorDe, textosDeSector } from './sectores';

describe('sectorDe', () => {
  it.each([
    ['Fontanería', 'fontaneria'],
    ['fontanero y calefacción', 'fontaneria'],
    ['Peluquería y estética', 'peluqueria'],
    ['Barbería', 'peluqueria'],
    ['Bar de tapas', 'bar'],
    ['Clínica de fisioterapia', 'salud'],
    ['Taller de coches', 'taller'],
    ['ASESORÍA FISCAL', 'asesoria'],
    ['Panadería artesana', 'alimentacion'],
    ['Peluquería canina', 'mascotas'],
  ])('%s → %s', (texto, id) => expect(sectorDe(texto)?.id).toBe(id));

  it('nada reconocible: null', () => {
    expect(sectorDe('')).toBeNull();
    expect(sectorDe('xyz')).toBeNull();
    expect(sectorDe('Embarcaciones')).toBeNull(); // «bar» solo como palabra
  });
});

describe('lugarDe', () => {
  it.each([
    ['Rúa da Raíña 1, Lugo', 'Lugo'],
    ['Calle Mayor 3, 28013, Madrid', 'Madrid'],
    ['Calle Mayor 3, 28013 Madrid', 'Madrid'],
    ['Calle Mayor 3', ''],
    ['', ''],
    ['Polígono Norte, nave 4', ''],
  ])('%s → %s', (d, l) => expect(lugarDe(d)).toBe(l));
});

describe('textosDeSector', () => {
  it('pone el nombre del negocio y el lugar', () => {
    const t = textosDeSector('Fontanería', 'Fontanería Pérez', 'Avda. de Galicia 12, Ourense');
    expect(t.lema).toBe('Fontanería y calefacción: averías y obras, con presupuesto sin compromiso en Ourense.');
    expect(t.sobre).toMatch(/^En Fontanería Pérez /);
    expect(t.servicios[0]).toEqual({ nombre: 'Averías y urgencias', precio: '', texto: 'Fugas, atascos y roturas.' });
  });

  it('sin sector conocido usa los genéricos', () => {
    const t = textosDeSector('Algo raro', '');
    expect(t.lema).toBe(`${SECTOR_GENERICO.lema}.`);
    expect(t.sobre).toMatch(/^En nuestro negocio /);
  });

  it('todos los sectores pasan la validación de la web y caben en sus límites', () => {
    for (const s of [...SECTORES_WEB, SECTOR_GENERICO]) {
      const t = textosDeSector(s.nombre || 'otro', 'Un negocio con un nombre bastante largo', 'Calle 1, Villanueva de la Serena');
      expect(t.servicios.length).toBeLessThanOrEqual(MAX_SERVICIOS_WEB);
      const r = validarWeb({ negocio: 'X', telefono: '600000000', ...t });
      expect(r.ok, s.id).toBe(true);
      if (r.ok) {
        expect(r.datos.lema, s.id).toBe(t.lema);
        expect(r.datos.sobre, s.id).toBe(t.sobre);
        expect(r.datos.servicios, s.id).toEqual(t.servicios);
      }
    }
  });

  it('ids únicos', () => {
    const ids = SECTORES_WEB.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

import { describe, expect, it } from 'vitest';
import { MAX_PREGUNTAS_WEB, MAX_SERVICIOS_WEB, ordenWeb, PLANTILLAS_WEB, validarWeb } from './webs';
import { disenosRecomendados, esOrdenDeSector, esPreguntaDeSector, lugarDe, SECTOR_GENERICO, SECTORES_WEB, sectorDe, textosDeSector } from './sectores';

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

  it('el nombre del negocio va tal cual, aunque lleve $& o $1', () => {
    expect(textosDeSector('bar', 'Bar $& $1', '').sobre).toContain('Bar $& $1');
  });

  it('ids únicos', () => {
    const ids = SECTORES_WEB.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('orden y preguntas de partida', () => {
  it.each([...SECTORES_WEB, SECTOR_GENERICO].map((s) => [s.id ?? 'generico', s] as const))('%s: orden completo y preguntas válidas', (_id, s) => {
    expect(ordenWeb(s.orden)).toEqual(s.orden);
    expect(s.preguntas.length).toBeGreaterThan(0);
    expect(s.preguntas.length).toBeLessThanOrEqual(MAX_PREGUNTAS_WEB);
    expect(new Set(s.preguntas).size).toBe(s.preguntas.length);
    for (const p of s.preguntas) expect(p).toMatch(/^¿.+\?$/);
  });

  it('las preguntas salen sin respuesta y no se publican hasta responderlas', () => {
    const t = textosDeSector('Fontanería', 'Fontanería Pérez');
    expect(t.preguntas[0]).toEqual({ pregunta: '¿Atendéis urgencias?', respuesta: '' });
    const r = validarWeb({ negocio: 'Fontanería Pérez', telefono: '600123123', preguntas: t.preguntas });
    expect(r.ok && r.datos.preguntas).toEqual([]);
  });

  it('negocios visuales empiezan por la galería; oficios, por servicios', () => {
    expect(textosDeSector('Reformas', 'x').orden[0]).toBe('galeria');
    expect(textosDeSector('Fontanería', 'x').orden[0]).toBe('servicios');
  });

  it('distingue lo que puso el sistema de lo que escribió el cliente', () => {
    expect(esPreguntaDeSector('¿Atendéis urgencias?')).toBe(true);
    expect(esPreguntaDeSector('¿Abrís los domingos?')).toBe(false);
    expect(esOrdenDeSector(ordenWeb([]))).toBe(true);
    expect(esOrdenDeSector(textosDeSector('Reformas', 'x').orden)).toBe(true);
    for (const p of PLANTILLAS_WEB) expect(esOrdenDeSector(ordenWeb(p.orden as never)), p.id).toBe(true);
    expect(esOrdenDeSector(['contacto', 'sobre', 'servicios', 'galeria', 'opiniones', 'preguntas'])).toBe(false);
  });
  it('cada sector recomienda tres diseños que existen y son distintos', () => {
    const ids = new Set(PLANTILLAS_WEB.map((p) => p.id as string));
    for (const s of [...SECTORES_WEB, SECTOR_GENERICO]) {
      expect(s.disenos, s.id).toHaveLength(3);
      expect(new Set(s.disenos).size, s.id).toBe(3);
      for (const id of s.disenos) expect(ids.has(id), `${s.id} → ${id}`).toBe(true);
    }
  });
  it('recomienda por lo que escribe el cliente y, si no encaja, los de cualquier negocio', () => {
    expect(disenosRecomendados('Barbería Roble').ids).toContain('navaja');
    expect(disenosRecomendados('fontanero urgente').ids[0]).toBe('urgente');
    const otro = disenosRecomendados('fabricamos velas');
    expect(otro.sector).toBeNull();
    expect(otro.ids).toEqual(SECTOR_GENERICO.disenos);
    expect(otro.ids).toHaveLength(3);
  });
});

describe('servicios puestos por nosotros', () => {
  it('reconoce los de un sector sin tocar y respeta los del cliente', async () => {
    const { esServicioDeSector, textosDeSector } = await import('./sectores');
    const [fonta] = textosDeSector('Fontanería', 'X').servicios;
    expect(esServicioDeSector(fonta)).toBe(true);
    expect(esServicioDeSector({ nombre: '', precio: '', texto: '' })).toBe(true);
    expect(esServicioDeSector({ ...fonta, precio: '40 €' })).toBe(false);
    expect(esServicioDeSector({ ...fonta, texto: 'Lo mío' })).toBe(false);
    expect(esServicioDeSector({ nombre: 'Corte', precio: '', texto: 'A mi manera' })).toBe(false);
  });
});

describe('ideas para la frase de presentación', () => {
  it('da tres frases distintas, con el lugar y sin pasar de 140', async () => {
    const { ideasDeLema } = await import('./sectores');
    const ideas = ideasDeLema('peluquería', 'Peluquería Ana', 'Calle Mayor 3, Vigo');
    expect(ideas).toHaveLength(3);
    expect(ideas.every((t) => t.includes('Vigo') && t.length <= 140)).toBe(true);
    expect(ideas[1]).toContain('reservar cita');
  });
  it('funciona sin sector conocido ni negocio', async () => {
    const { ideasDeLema } = await import('./sectores');
    const ideas = ideasDeLema('', '');
    expect(ideas.length).toBeGreaterThanOrEqual(2);
    expect(ideas.every((t) => t.trim().length > 5)).toBe(true);
  });
});

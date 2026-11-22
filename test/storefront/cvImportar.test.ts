// Contrato del importador de CV (cv-estudio/src/importar.ts): lo que leen los lectores de Reactive Resume
// se deja como lo escribe un CV en España. Funciones puras: sin pdf.js ni navegador.
import { describe, expect, it } from 'vitest';
import { aFormulario, periodoEs, tipoDe } from '../../cv-estudio/src/importar';

type Datos = Parameters<typeof aFormulario>[0];
const datos = (basics: object, sections: object) => ({ basics, sections }) as unknown as Datos;

describe('tipoDe', () => {
  const b = (s: string) => new TextEncoder().encode(s);
  it('decide por los bytes, no por la extensión', () => {
    expect(tipoDe(b('%PDF-1.7'), 'cv.docx')).toBe('pdf');
    expect(tipoDe(b('PK\u0003\u0004'), 'cv.docx')).toBe('docx');
    expect(tipoDe(b('PK\u0003\u0004'), 'Basic_LinkedInDataExport.zip')).toBe('linkedin');
    expect(tipoDe(b('  {"basics":{}}'), 'cv.txt')).toBe('json');
    expect(tipoDe(b('hola'), 'cv.pdf')).toBeNull();
  });
});

describe('periodoEs', () => {
  it('pasa las fechas al castellano', () => {
    expect(periodoEs('Mar 2021 – Present')).toBe('mar 2021 – actualidad');
    expect(periodoEs('Jan 2018 – Feb 2021')).toBe('ene 2018 – feb 2021');
    expect(periodoEs('septiembre 2019 - actualidad')).toBe('sept 2019 – actualidad');
    expect(periodoEs('2013 – 2017')).toBe('2013 – 2017');
  });
  it('deja tal cual lo que no entiende', () => {
    expect(periodoEs('')).toBe('');
    expect(periodoEs('verano intensivo')).toBe('verano intensivo');
  });
});

describe('aFormulario', () => {
  it('saca el lugar de la línea de contacto', () => {
    const f = aFormulario(datos({ name: 'Ana', location: 'ana@x.es · 612 345 678 · Sevilla' }, {}));
    expect(f.ubicacion).toBe('Sevilla');
    expect(aFormulario(datos({ location: 'Sevilla, España' }, {})).ubicacion).toBe('Sevilla, España');
  });

  it('pone el puesto antes que la empresa y separa la ciudad', () => {
    const f = aFormulario(
      datos({}, { experience: { items: [{ company: 'Responsable de tienda', position: 'Moda Sur S.L., Málaga', period: '2019 - 2022' }] } }),
    );
    expect(f.experiencia[0]).toMatchObject({ puesto: 'Responsable de tienda', empresa: 'Moda Sur S.L.', lugar: 'Málaga', periodo: '2019 – 2022' });
  });

  it('no da la vuelta a lo que ya viene bien', () => {
    const f = aFormulario(datos({}, { experience: { items: [{ company: 'Grupo Norte', position: 'Incidencias y devoluciones' }] } }));
    expect(f.experiencia[0]).toMatchObject({ puesto: 'Incidencias y devoluciones', empresa: 'Grupo Norte' });
  });

  it('pone el título antes que el centro', () => {
    const f = aFormulario(datos({}, { education: { items: [{ degree: 'Universidad de Sevilla', school: 'Grado en Publicidad' }] } }));
    expect(f.formacion[0]).toMatchObject({ titulo: 'Grado en Publicidad', centro: 'Universidad de Sevilla' });
  });

  it('separa idioma y nivel y deduce los puntos', () => {
    const f = aFormulario(
      datos({}, { languages: { items: [{ language: 'Español: nativo' }, { language: 'Inglés (C1)' }, { language: 'Francés', fluency: 'básico' }] } }),
    );
    expect(f.idiomas).toEqual([
      { idioma: 'Español', nivel: 'nativo', puntos: 5 },
      { idioma: 'Inglés', nivel: 'C1', puntos: 4 },
      { idioma: 'Francés', nivel: 'básico', puntos: 2 },
    ]);
  });

  it('junta el nivel que el PDF a dos columnas deja en su propia línea', () => {
    const lenguas = ['Español', 'Nativo', 'Inglés', 'C1', 'Valenciano', 'B2', 'Francés: básico'].map((language) => ({ language }));
    const aptitudes = ['Atención multicanal', 'Avanzado', 'Zendesk', 'Análisis de datos', 'Intermedio'].map((name) => ({ name }));
    const f = aFormulario(datos({}, { languages: { items: lenguas }, skills: { items: aptitudes } }));
    expect(f.idiomas).toEqual([
      { idioma: 'Español', nivel: 'Nativo', puntos: 5 },
      { idioma: 'Inglés', nivel: 'C1', puntos: 4 },
      { idioma: 'Valenciano', nivel: 'B2', puntos: 3 },
      { idioma: 'Francés', nivel: 'básico', puntos: 2 },
    ]);
    expect(f.habilidades.map((h) => [h.nombre, h.nivel])).toEqual([
      ['Atención multicanal', 4],
      ['Zendesk', 3],
      ['Análisis de datos', 3],
    ]);
  });

  it('no junta un nivel a lo que ya trae el suyo ni deja un nivel huérfano fuera', () => {
    const f = aFormulario(datos({}, { languages: { items: [{ language: 'Inglés (C1)' }, { language: 'C2' }] }, skills: { items: [{ name: 'Experto' }] } }));
    expect(f.idiomas.map((i) => i.idioma)).toEqual(['Inglés', 'C2']);
    expect(f.habilidades.map((h) => h.nombre)).toEqual(['Experto']);
  });

  it('omite lo oculto y respeta los límites del estudio', () => {
    const items = Array.from({ length: 20 }, (_, i) => ({ company: `Empresa ${i}`, position: 'Puesto', hidden: i === 0 }));
    const f = aFormulario(datos({}, { experience: { items } }));
    expect(f.experiencia).toHaveLength(12);
    expect(f.experiencia[0].empresa).toBe('Empresa 1');
  });
});

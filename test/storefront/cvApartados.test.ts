// Apartados opcionales del CV (web, LinkedIn, carnet, cursos, proyectos, voluntariado, premios,
// publicaciones, referencias, aficiones): llegan al esquema de Reactive Resume y vuelven intactos.
import { describe, expect, it } from 'vitest';
import { FORM_VACIO, crearDatos, enlace, perfilLinkedin, type FormCv } from '../../cv-estudio/src/formulario';
import { aFormulario } from '../../cv-estudio/src/importar';

const completo: FormCv = {
  ...FORM_VACIO,
  nombre: 'Ana Pérez',
  web: 'anaperez.es',
  linkedin: 'https://www.linkedin.com/in/ana-perez/',
  carnet: 'B, vehículo propio',
  cursos: [{ titulo: 'Prevención de riesgos', entidad: 'SEPE', fecha: '2023' }],
  premios: [{ titulo: 'Mejor TFG', entidad: 'UV', fecha: '2019' }],
  publicaciones: [{ titulo: 'Guía de atención', entidad: 'Revista X', fecha: '2021' }],
  proyectos: [{ nombre: 'Tienda online', periodo: '2024', enlace: 'github.com/ana/tienda', descripcion: 'Montaje\nVentas +20 %' }],
  voluntariado: [{ organizacion: 'Cruz Roja', lugar: 'Valencia', periodo: '2022', descripcion: 'Reparto' }],
  referencias: [{ nombre: 'Luis Gil', cargo: 'Jefe de tienda', contacto: '600 000 000' }],
  intereses: [{ nombre: 'Fotografía' }],
};

describe('enlace', () => {
  it('completa dominios y solo acepta http(s)', () => {
    expect(enlace('anaperez.es')).toBe('https://anaperez.es/');
    expect(enlace('http://a.es/x')).toBe('http://a.es/x');
    expect(enlace('javascript:alert(1)')).toBe('');
    expect(enlace('data:text/html,hola')).toBe('');
    expect(enlace('')).toBe('');
  });
  it('saca el usuario de LinkedIn', () => {
    expect(perfilLinkedin('linkedin.com/in/ana-perez')?.usuario).toBe('ana-perez');
    expect(perfilLinkedin('')).toBeNull();
  });
  it('un escape roto en LinkedIn omite el perfil sin romper el CV', () => {
    expect(perfilLinkedin('https://www.linkedin.com/in/ana%')).toBeNull();
    expect(() => crearDatos({ ...FORM_VACIO, nombre: 'Ana', linkedin: 'https://www.linkedin.com/in/ana%' })).not.toThrow();
  });
});

describe('apartados opcionales', () => {
  const d = crearDatos(completo);
  it('van a sus secciones del esquema', () => {
    const s = d.sections as unknown as Record<string, { items: unknown[] }>;
    for (const k of ['certifications', 'awards', 'publications', 'projects', 'volunteer', 'references', 'interests', 'profiles'])
      expect(s[k].items.length, k).toBeGreaterThan(0);
    expect(d.basics.website.url).toBe('https://anaperez.es/');
    expect(JSON.stringify(d.basics.customFields)).toContain('Carnet B, vehículo propio');
  });
  it('vuelven al formulario tal cual (importar un CV propio exportado)', () => {
    // Sin DOM en las pruebas: las descripciones HTML (las lee DOMParser) se quitan antes.
    const sinHtml = JSON.parse(JSON.stringify(d), (k, v) => (k === 'description' ? '' : v));
    const f = aFormulario(sinHtml);
    expect(f.web).toBe('https://anaperez.es/');
    expect(f.linkedin).toContain('ana-perez');
    expect(f.carnet).toBe('B, vehículo propio');
    expect(f.cursos).toEqual(completo.cursos);
    expect(f.premios).toEqual(completo.premios);
    expect(f.publicaciones).toEqual(completo.publicaciones);
    expect(f.voluntariado).toEqual([{ ...completo.voluntariado![0], descripcion: '' }]);
    expect(f.referencias).toEqual(completo.referencias);
    expect(f.intereses).toEqual(completo.intereses);
    expect(f.proyectos?.[0]?.nombre).toBe('Tienda online');
  });
  it('un CV sin extras no crea secciones vacías', () => {
    const v = crearDatos({ ...FORM_VACIO, nombre: 'X' });
    const s = v.sections as unknown as Record<string, { items: unknown[] }>;
    expect(s.volunteer.items).toHaveLength(0);
    expect(v.basics.customFields).toHaveLength(0);
  });
});

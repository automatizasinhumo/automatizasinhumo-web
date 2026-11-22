// Paso «Añade»: los datos del CV en trozos para pegar en LinkedIn o InfoJobs.
import { describe, expect, it } from 'vitest';
import { GUIA_CV, PASOS_CV } from '../../src/features/servicios/cv';
import { LIMITES_PORTAL, gruposPortales, sobra } from '../../src/features/servicios/cvPortales';

describe('pasos del CV', () => {
  it('«Añade» va entre Revisa y Descarga y tiene guía propia', () => {
    const ids = PASOS_CV.map((p) => p.id);
    expect(ids.indexOf('anade')).toBe(ids.indexOf('revisa') + 1);
    expect(ids.at(-1)).toBe('descarga');
    expect(GUIA_CV.anade?.map((g) => g.guia)).toEqual(['portales', 'extras', 'tarjeta']);
    // La tarjeta ya no se configura en la descarga.
    expect(GUIA_CV.descarga?.some((g) => g.guia === 'tarjeta' || g.guia === 'extras')).toBe(false);
  });
});

describe('gruposPortales', () => {
  it('un CV vacío no da nada que copiar', () => {
    expect(gruposPortales({})).toEqual([]);
    expect(gruposPortales({ experiencia: 'no es lista', habilidades: [null, 3] })).toEqual([]);
  });
  it('reparte perfil, experiencia, formación, aptitudes, idiomas y contacto', () => {
    const g = gruposPortales({
      titular: 'Técnica de soporte',
      resumen: 'Ocho años en atención al cliente.',
      ubicacion: 'Valencia',
      email: 'ana@correo.es',
      experiencia: [
        { puesto: 'Agente', empresa: 'Tienda S. L.', periodo: '2020 - 2024', descripcion: 'Chat y correo' },
        { puesto: '', empresa: '' },
      ],
      formacion: [{ titulo: 'Grado en ADE', centro: 'UV', periodo: '2016' }],
      habilidades: [{ nombre: 'Zendesk' }, { nombre: '' }, { nombre: 'Excel' }],
      idiomas: [{ idioma: 'Inglés', nivel: 'C1' }],
      cursos: [{ titulo: 'PRL', entidad: 'SEPE', fecha: '2023' }],
    });
    expect(g.map((x) => x.titulo)).toEqual([
      'Perfil',
      'Experiencia: Agente · Tienda S. L.',
      'Formación: Grado en ADE · UV',
      'Aptitudes',
      'Idiomas',
      'Licencias y certificaciones',
      'Contacto',
    ]);
    expect(g[0].trozos.map((t) => t.etiqueta)).toEqual(['Titular', 'Ubicación', 'Acerca de']);
    expect(g[3].trozos[0].texto).toBe('Zendesk, Excel');
    expect(g[4].trozos[0].texto).toBe('Inglés · C1');
    expect(g[5].trozos[0].texto).toBe('PRL · SEPE · 2023');
  });
  it('avisa (sin cortar) cuando un texto no cabe en LinkedIn', () => {
    const largo = 'a'.repeat(LIMITES_PORTAL.titular + 5);
    const [perfil] = gruposPortales({ titular: largo });
    expect(perfil.trozos[0].texto).toBe(largo);
    expect(sobra(perfil.trozos[0])).toBe(5);
    expect(sobra({ etiqueta: 'x', texto: 'corto', limite: 10 })).toBe(0);
    expect(sobra({ etiqueta: 'x', texto: 'a'.repeat(50) })).toBe(0);
  });
});

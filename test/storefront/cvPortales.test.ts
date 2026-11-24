// Paso «Añade»: extras de pago «Tu CV en LinkedIn» y «Tu CV en InfoJobs» (antes gratis, 24/11).
import { describe, expect, it } from 'vitest';
import { GUIA_CV, PASOS_CV } from '../../src/features/servicios/cv';
import { EXTRAS_CV } from '../../src/features/servicios/cv';
import { LIMITES_PORTAL, PASOS_PORTAL, PORTALES, gruposPortales, muestraTrozo, sobra, textoPortal } from '../../src/features/servicios/cvPortales';
import { readFileSync } from 'node:fs';

describe('pasos del CV', () => {
  it('«Añade» va entre Revisa y Descarga y tiene guía propia', () => {
    const ids = PASOS_CV.map((p) => p.id);
    expect(ids.indexOf('anade')).toBe(ids.indexOf('revisa') + 1);
    expect(ids.at(-1)).toBe('descarga');
    expect(GUIA_CV.anade?.map((g) => g.guia)).toEqual(['extras', 'tarjeta']);
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

const CV = { titular: 'Técnica de soporte', resumen: 'Ocho años en atención al cliente.', ubicacion: 'Valencia', experiencia: [{ puesto: 'Agente', empresa: 'Tienda S. L.' }] };

describe('portales de pago', () => {
  it('LinkedIn e InfoJobs son extras de pago del CV, sin marcar por defecto', () => {
    for (const p of PORTALES) {
      const x = EXTRAS_CV.find((e) => e.id === p);
      expect(x?.precio).toBe(500);
      expect(x?.producto).toMatch(/^prod_/);
      expect(PASOS_PORTAL[p].length).toBeGreaterThanOrEqual(4);
    }
  });
  it('cada portal usa el nombre de sus casillas', () => {
    expect(gruposPortales(CV, 'infojobs')[0].trozos.map((t) => t.etiqueta)).toEqual(['Puesto que buscas', 'Localidad', 'Carta de presentación o resumen']);
    expect(gruposPortales(CV, 'infojobs')[1].trozos[0].etiqueta).toBe('Puesto');
  });
  it('los topes de LinkedIn no se aplican en InfoJobs', () => {
    const largo = { titular: 'a'.repeat(LIMITES_PORTAL.titular + 5) };
    expect(sobra(gruposPortales(largo, 'linkedin')[0].trozos[0])).toBe(5);
    expect(sobra(gruposPortales(largo, 'infojobs')[0].trozos[0])).toBe(0);
  });
  it('la vista previa recorta sin dar el texto entero', () => {
    expect(muestraTrozo('Ocho años en atención al cliente.')).toBe('Ocho años en atenc…');
    expect(muestraTrozo('corto')).toBe('corto');
    expect(muestraTrozo('a  b\nc')).toBe('a b c');
  });
  it('el .txt lleva guía y todos los trozos completos', () => {
    const t = textoPortal(CV, 'linkedin');
    expect(t.startsWith('TU CV EN LINKEDIN')).toBe(true);
    expect(t).toContain(`1. ${PASOS_PORTAL.linkedin[0]}`);
    expect(t).toContain('[Acerca de]\nOcho años en atención al cliente.');
  });
  it('el estudio ya no ofrece el paso a portales como gratis', () => {
    const astro = readFileSync(new URL('../../src/pages/servicios/cv.astro', import.meta.url), 'utf8');
    expect(astro).not.toMatch(/class="gratis"|data-portales[ >]/);
    expect(astro).toContain('data-portal={p}');
  });
});

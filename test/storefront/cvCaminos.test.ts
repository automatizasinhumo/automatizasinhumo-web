// Primer paso del estudio de CV: tres caminos (plantilla, diseño propio, asesoría) de menos a más.
import { describe, expect, it } from 'vitest';
import { ASESORIA_CV, CAMINOS_CV, CAMINOS_IDS, DISENOS_ATS, DISENOS_CV, DISENO_DESDE_CERO, DISENO_POR_DEFECTO, FILTROS_DISENO, GUIA_CV, esCamino } from '../../src/features/servicios/cv';
import { mensajeDeTema, mensajeDesdeBusqueda } from '../../src/features/search/sinResultados';

describe('caminos del CV', () => {
  it('van de lo más barato a la asesoría', () => {
    expect(CAMINOS_CV.map((c) => c.id)).toEqual([...CAMINOS_IDS]);
    const precios = CAMINOS_CV.map((c) => c.precio);
    expect([...precios].sort((a, b) => a - b)).toEqual(precios);
    expect(CAMINOS_CV.at(-1)).toMatchObject({ id: 'asesoria', desde: true, precio: ASESORIA_CV.desde });
  });
  it('esCamino solo acepta los tres', () => {
    for (const id of CAMINOS_IDS) expect(esCamino(id)).toBe(true);
    for (const v of ['personalizar', '', null, undefined, 1]) expect(esCamino(v)).toBe(false);
  });
  it('«desde cero» parte de un diseño de una columna que existe', () => {
    expect(DISENOS_CV.find((d) => d.id === DISENO_DESDE_CERO)?.columnas).toBe(1);
  });
  it('la lista ATS (medida con cv-estudio/ats.mjs) solo nombra diseños que existen', () => {
    const ids = new Set(DISENOS_CV.map((d) => d.id));
    for (const id of DISENOS_ATS) expect(ids.has(id)).toBe(true);
    // El diseño por defecto y el de «desde cero» tienen que pasar un ATS.
    expect(DISENOS_ATS.has(DISENO_POR_DEFECTO)).toBe(true);
    expect(DISENOS_ATS.has(DISENO_DESDE_CERO)).toBe(true);
    const filtro = FILTROS_DISENO.find((f) => f.id === 'ats');
    expect(DISENOS_CV.filter((d) => filtro?.cumple(d)).length).toBe(DISENOS_ATS.size);
  });
  it('la guía del primer paso explica los caminos', () => {
    expect(GUIA_CV.diseno?.[0]?.guia).toBe('caminos');
  });
  it('la asesoría abre la consulta con el mensaje empezado', () => {
    expect(ASESORIA_CV.enlace).toMatch(/^\/empezar\/consulta\?tema=cv$/);
    expect(mensajeDeTema('cv')).toContain('currículum');
    expect(mensajeDeTema('toString')).toBe('');
    expect(mensajeDeTema(null)).toBe('');
    // La búsqueda sin resultados manda sobre el tema.
    expect(mensajeDesdeBusqueda('cv')).toContain('«cv»');
  });
});

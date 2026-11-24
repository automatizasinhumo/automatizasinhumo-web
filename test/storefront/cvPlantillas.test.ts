// Una plantilla del estudio vive en cinco sitios: el enum del esquema, el manifiesto semántico, la lista
// de plantillas (templates.ts), su variante creativa y DISENOS_CV, más su miniatura. Si falta en el
// enum, el motor la descarta y pinta la genérica sin avisar (24/11): este test lo impide.
import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { DISENOS_CV } from '../../src/features/servicios/cv';

const leer = (r: string) => readFileSync(new URL(`../../${r}`, import.meta.url), 'utf8');
const ordenar = (xs: Iterable<string>) => [...new Set(xs)].sort();

const esquema = ordenar([...leer('cv-estudio/vendor/schema/templates.ts').matchAll(/^\t"([a-z]+)",$/gm)].map((m) => m[1]!));
const manifiesto = ordenar([...leer('cv-estudio/vendor/pdf/semantic/template-manifest.ts').split('TEMPLATE_SEMANTIC_MANIFESTS = {')[1]!.split('} as const')[0]!.matchAll(/^\t([a-z]+): \w+/gm)].map((m) => m[1]!));
const tuplas = [...leer('cv-estudio/src/adoptado/templates.ts').matchAll(/\[\s*"([a-z]+)",\s*"[^"]*",\s*"([a-z]+)"/g)].map((m) => ({ id: m[1]!, tipo: m[2]! }));
const fuenteVariantes = leer('cv-estudio/vendor/pdf/templates/creativos/variantes.ts');
const variantes = ordenar([...fuenteVariantes.matchAll(/^\t([a-z]+): \{ cabecera:/gm)].map((m) => m[1]!));
const laterales = new Map([...fuenteVariantes.matchAll(/^\t([a-z]+): \{ cabecera:.*?lateral: "([a-z]+)"/gm)].map((m) => [m[1]!, m[2]!]));

describe('registro de plantillas del CV', () => {
  it('el esquema, el manifiesto y la lista del estudio tienen los mismos ids', () => {
    expect(esquema.length).toBeGreaterThan(30);
    expect(manifiesto).toEqual(esquema);
    expect(ordenar(tuplas.map((t) => t.id))).toEqual(esquema);
  });
  it('cada variante creativa está en la lista del estudio como «creative»', () => {
    expect(variantes.length).toBeGreaterThanOrEqual(24);
    const creativas = new Set(tuplas.filter((t) => t.tipo === 'creative').map((t) => t.id));
    expect(variantes.filter((id) => !creativas.has(id))).toEqual([]);
  });
  it('DISENOS_CV ofrece justo las plantillas del motor, cada una con su miniatura', () => {
    const ids = DISENOS_CV.map((d) => d.id).filter((id) => id !== 'personalizable');
    expect(ordenar(ids)).toEqual(esquema);
    const creativos = new Set(DISENOS_CV.filter((d) => d.creativo).map((d) => d.id));
    expect(variantes.filter((id) => !creativos.has(id))).toEqual([]);
    for (const id of DISENOS_CV.map((d) => d.id)) expect(existsSync(new URL(`../../public/cv/estudio/miniaturas/${id}.jpg`, import.meta.url)), id).toBe(true);
  });
  it('el filtro por columnas dice la verdad: una variante con lateral se ofrece como de dos columnas', () => {
    expect(laterales.size).toBe(variantes.length);
    const mal = DISENOS_CV.filter((d) => laterales.has(d.id) && d.columnas !== (laterales.get(d.id) === 'ninguno' ? 1 : 2)).map((d) => d.id);
    expect(mal).toEqual([]);
  });
});

import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { EJEMPLO_WEB, PLANTILLAS_WEB, renderWeb, siguienteVariante, varianteDe, VARIANTES_WEB, variantesWeb } from './webs';

const basica = PLANTILLAS_WEB.find((p) => p.hero > 0)!;
const autor = PLANTILLAS_WEB.find((p) => p.hero === 0);

describe('variantes por sección', () => {
  it('normaliza: cinco números en rango, lo raro a 0', () => {
    expect(variantesWeb(undefined)).toBe('0.0.0.0.0');
    expect(variantesWeb('2.9.-1.x')).toBe('2.0.0.0.0');
    expect(variantesWeb('6.5.4.3.4')).toBe('6.5.4.3.4');
  });
  it('rota todas las variantes y al volver a la de la plantilla guarda 0', () => {
    for (const x of VARIANTES_WEB) {
      const base = basica[x.id];
      let v = '0.0.0.0.0';
      const vistas = new Set<number>();
      for (let i = 0; i < x.max; i++) {
        vistas.add(varianteDe(v, x.id, base));
        v = siguienteVariante(v, x.id, base);
      }
      expect(vistas.size, x.id).toBe(x.max);
      expect(v, x.id).toBe('0.0.0.0.0');
    }
  });
  it('la vista pinta la variante elegida sin cambiar de plantilla', () => {
    const d = { ...EJEMPLO_WEB, plantilla: basica.id };
    const otraH = (basica.hero % 6) + 1;
    const otraG = (basica.galeria % 4) + 1;
    const v = `${otraH}.0.${otraG}.0.0`;
    const h = renderWeb({ ...d, variantes: v, galeria: [EJEMPLO_WEB.foto || 'data:image/jpeg;base64,/9j/AAAA'] });
    expect(h).toContain(`w-h-${otraH}`);
    expect(h).toContain(`w-g-${otraG}`);
    expect(h).toContain(`w-t-${basica.id}`);
  });
  it('cada variante tiene su CSS en las plantillas (no hay botones que no cambian nada)', () => {
    const css = readFileSync(new URL('./plantillasWeb.ts', import.meta.url), 'utf8');
    for (let n = 1; n <= 6; n++) expect(css, `w-h-${n}`).toContain(`w-h-${n}`);
    for (let n = 1; n <= 5; n++) expect(css, `w-s-${n}`).toContain(`w-s-${n}`);
    for (let n = 1; n <= 4; n++) expect(css, `w-g-${n}`).toContain(`w-g-${n}`);
    for (let n = 1; n <= 3; n++) expect(css, `w-o-${n}`).toContain(`w-o-${n}`);
    for (let n = 1; n <= 4; n++) expect(css, `w-c-${n}`).toContain(`w-c-${n}`);
  });
  it.runIf(!!autor)('en un diseño de autor la portada sigue siendo la suya', () => {
    const h = renderWeb({ ...EJEMPLO_WEB, plantilla: autor!.id, variantes: '3.0.0.0.0' });
    expect(h).not.toContain('w-h-3');
  });
  it('el editor tiene el campo y un botón por variante', () => {
    const pagina = readFileSync(new URL('../../pages/servicios/web.astro', import.meta.url), 'utf8');
    expect(pagina).toContain('name="variantes"');
    expect(pagina).toContain('data-variante={x.id}');
  });
});

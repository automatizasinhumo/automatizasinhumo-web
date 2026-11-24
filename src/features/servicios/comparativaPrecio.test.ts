import { describe, expect, it } from 'vitest';
import { AUTOSERVICIO, SLUG_WEB } from './autoservicio';
import { alternativas, primerAnio } from './comparativaPrecio';

describe('comparativa de precio', () => {
  it('nuestra fila sale del precio real del catálogo y sin cuota', () => {
    const nuestra = alternativas().find((a) => a.nuestra)!;
    expect(nuestra.alta).toBe(AUTOSERVICIO[SLUG_WEB]!.precio);
    expect(nuestra.mes).toBe(0);
    expect(primerAnio(nuestra)).toBe(nuestra.alta);
  });
  it('el primer año suma el alta y doce cuotas', () => {
    expect(primerAnio({ quien: 'x', alta: 9_900, mes: 900, masIva: true, nota: '' })).toBe(20_700);
  });
  it('solo hay una fila nuestra y es más barata que las alternativas hechas por otros', () => {
    const as = alternativas();
    expect(as.filter((a) => a.nuestra)).toHaveLength(1);
    const nuestra = primerAnio(as.find((a) => a.nuestra)!);
    for (const a of as.filter((x) => !x.nuestra && x.alta > 0)) expect(nuestra).toBeLessThan(primerAnio(a));
  });
});

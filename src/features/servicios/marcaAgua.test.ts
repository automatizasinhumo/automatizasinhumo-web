import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// La marca de agua del CV vive en el motor (cv-estudio, react-pdf); aquí se vigila su forma.
const fuente = readFileSync(new URL('../../../cv-estudio/src/decoracion.tsx', import.meta.url), 'utf8');
const capa = fuente.slice(fuente.indexOf('export function capaMarcaAgua'), fuente.indexOf('\n}\n', fuente.indexOf('export function capaMarcaAgua')));

describe('marca de agua de la vista previa del CV', () => {
  it('va solo en los bordes: cintas arriba, abajo y en los cantos, sin mosaico sobre el texto', () => {
    expect(capa).toContain('export function capaMarcaAgua');
    for (const k of ['"arriba"', '"abajo"', '"izq"', '"der"']) expect(capa).toContain(k);
    expect(capa).not.toMatch(/rotate\(-32deg\)|for \(let i = 0; i < 14/);
    expect(fuente).toMatch(/export const CINTA = (\d+);/);
    expect(Number(fuente.match(/export const CINTA = (\d+);/)![1])).toBeLessThanOrEqual(14);
  });
  it('el texto no depende del centrado flex de su caja (react-pdf lo dejaba sin líneas y sin marca)', () => {
    expect(capa).not.toMatch(/justifyContent: "center" \} \}, h\(Text/);
    expect(capa).toMatch(/paddingTop/);
  });
  it('la opacidad va en el fondo, no en la cinta entera (si no, apaga también el texto)', () => {
    expect(capa).toMatch(/backgroundColor: "#ffffff", opacity/);
  });
  it('el motor publicado está reconstruido con la marca en bordes', () => {
    const motor = readFileSync(new URL('../../../public/cv/estudio/motor/estudio.js', import.meta.url), 'utf8');
    expect(motor).toContain('rotate(-90deg)');
    expect(motor).not.toContain('rotate(-32deg)');
  });
});

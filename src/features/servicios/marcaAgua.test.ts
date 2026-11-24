import { readdirSync, readFileSync } from 'node:fs';
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
    // El empaquetador reparte el código común en trozos (c/*.js): se mira el motor entero.
    const dir = new URL('../../../public/cv/estudio/motor/', import.meta.url);
    const motor = ['estudio.js', ...readdirSync(new URL('c/', dir)).map((f) => `c/${f}`)]
      .filter((f) => f.endsWith('.js'))
      .map((f) => readFileSync(new URL(f, dir), 'utf8'))
      .join('\n');
    expect(motor).toContain('rotate(-90deg)');
    expect(motor).not.toContain('rotate(-32deg)');
  });
  it('con marca, el margen de página nunca queda por debajo de la cinta (datos importados con 0)', () => {
    const entrada = readFileSync(new URL('../../../cv-estudio/src/entrada.ts', import.meta.url), 'utf8');
    expect(entrada).toMatch(/if \(!limpio\) \{[\s\S]{0,400}CINTA \+ 3[\s\S]{0,200}marginX = Math\.max[\s\S]{0,120}marginY = Math\.max/);
  });
  it('un texto de marca vacío nunca la quita: el PDF limpio solo con `sinMarca` o la muestra', () => {
    const entrada = readFileSync(new URL('../../../cv-estudio/src/entrada.ts', import.meta.url), 'utf8');
    expect(entrada).toMatch(/const limpio = muestra === true \|\| sinMarca === true;/);
    expect(entrada).toMatch(/fijarCapas\([^)]*marcaAgua\?\.trim\(\) \|\| MARCA_POR_DEFECTO, limpio\)/);
  });
  it('la descarga del pedido pagado sale sin marca, y es el único sitio que la pide', () => {
    const estudio = readFileSync(new URL('./estudioCv.ts', import.meta.url), 'utf8');
    const desde = estudio.indexOf('async function descargar(');
    const descargar = estudio.slice(desde, estudio.indexOf('\n  }\n', desde));
    expect(descargar).toContain('crearPdf(await motor(), null, personal)');
    expect(estudio.match(/crearPdf\([^\n]*?, null,/g)).toHaveLength(1);
    expect(estudio).toMatch(/sinMarca: marcaAgua === null/);
  });
});

import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

/** Llaves cuadradas en cada hoja: una fusión que se coma un «}» rompe el build de Tailwind en CI. */
const hojas = readdirSync(new URL('.', import.meta.url)).filter((f) => f.endsWith('.css'));
describe('hojas de estilo', () => {
  it.each(hojas)('%s tiene las llaves cuadradas', (f) => {
    const css = readFileSync(new URL(f, import.meta.url), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/(["'])(?:\.|(?!\1).)*\1/g, '');
    let n = 0;
    for (const [i, c] of [...css].entries()) {
      if (c === '{') n++;
      else if (c === '}' && --n < 0) throw new Error(`«}» de más en el carácter ${i}`);
    }
    expect(n, 'llaves sin cerrar').toBe(0);
  });
});

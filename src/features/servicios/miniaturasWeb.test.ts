import { readFileSync, statSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import manifiesto from './miniaturas-web.json';
import { CARPETA_MINIATURAS, huellaMiniatura, miniaturaWeb } from './miniaturasWeb';
import { PLANTILLAS_WEB } from './webs';

const ids = PLANTILLAS_WEB.map((p) => p.id);
const imagen = (id: string) => new URL(`../../../public${CARPETA_MINIATURAS}${id}.webp`, import.meta.url);

describe('miniaturas de los diseños de web', () => {
  it('el manifiesto solo lista diseños que existen', () => {
    for (const id of Object.keys(manifiesto)) expect(ids).toContain(id);
  });

  it('cada miniatura listada tiene su WebP y pesa poco', () => {
    for (const id of Object.keys(manifiesto)) {
      const kb = statSync(imagen(id)).size / 1024;
      expect(readFileSync(imagen(id)).subarray(8, 12).toString('latin1'), id).toBe('WEBP');
      expect(kb, id).toBeLessThan(40);
    }
  });

  it('la huella es estable y distinta por diseño', () => {
    const hs = ids.map((id) => huellaMiniatura(id));
    expect(ids.map((id) => huellaMiniatura(id))).toEqual(hs);
    expect(new Set(hs).size).toBe(ids.length);
    for (const h of hs) expect(h).toMatch(/^[0-9a-f]{8}$/);
  });

  it('solo se sirve imagen si la huella casa; si no, se pinta en vivo', () => {
    for (const id of ids) {
      const url = miniaturaWeb(id);
      const guardada = (manifiesto as Record<string, string>)[id];
      if (guardada === huellaMiniatura(id)) expect(url).toBe(`${CARPETA_MINIATURAS}${id}.webp?v=${guardada}`);
      else expect(url).toBe('');
    }
  });

  // Con miniaturas caducadas la página sigue bien (las pinta en vivo), pero vuelve la carga lenta
  // sin que nadie lo note. Por eso falla: quien cambia un diseño regenera sus miniaturas.
  it('todas las miniaturas están al día', () => {
    const caducadas = ids.filter((id) => !miniaturaWeb(id));
    expect(caducadas, 'Regenera con node scripts/miniaturas-web.mjs').toEqual([]);
  });
});

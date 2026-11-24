import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { GUIAS_PANTALLA, PASOS_PORTADA_LIMPIO, PASOS_SERVICIOS, PASOS_TOUR } from './tour';

function astros(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? astros(p) : p.endsWith('.astro') ? [p] : [];
  });
}

describe('manifiesto del tour', () => {
  // Cada tema es una web aparte: se cuenta lo común (fuera de src/themes) más un tema.
  const leer = (ps: string[]) => ps.map((p) => readFileSync(p, 'utf8')).join('\n');
  const enTemas = /[\\/]themes[\\/]/;
  const comunes = leer(astros('src').filter((p) => !enTemas.test(p)));
  const temas = readdirSync('src/themes').filter((n) => statSync(join('src/themes', n)).isDirectory());
  const fuentesDe = (t: string) => comunes + '\n' + leer(astros(join('src/themes', t)));

  it('ids únicos y en minúsculas con guiones', () => {
    const ids = PASOS_TOUR.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z]+(-[a-z]+)*$/);
  });

  it('cada paso tiene un único bloque data-tour en las plantillas', () => {
    for (const t of temas) {
      const fuentes = fuentesDe(t);
      for (const { id } of PASOS_TOUR) {
        const n = fuentes.split(`data-tour="${id}"`).length - 1;
        // default lleva el tour entero; otro tema puede no traer un bloque, pero nunca dos.
        if (t === 'default') expect(n, `${t}: ${id}`).toBe(1);
        else expect(n, `${t}: ${id}`).toBeLessThanOrEqual(1);
      }
    }
  });

  it('textos breves para que el globo quepa en móvil', () => {
    for (const p of PASOS_TOUR) {
      expect(p.titulo.length, p.id).toBeLessThanOrEqual(40);
      expect(p.texto.length, p.id).toBeLessThanOrEqual(140);
    }
  });
});

describe('guías por pantalla del tema limpio', () => {
  const leer = (p: string) => readFileSync(p, 'utf8');
  const casos = [
    ['portada-limpio', PASOS_PORTADA_LIMPIO, 'src/themes/limpio/Home.astro', 'src/pages/index.astro'],
    ['servicios', PASOS_SERVICIOS, 'src/themes/limpio/Servicios.astro', 'src/pages/servicios/index.astro'],
  ] as const;
  it.each(casos)('%s: cada paso tiene un único bloque y la página monta la guía', (clave, pasos, tema, pagina) => {
    const fuente = leer(tema);
    for (const { id } of pasos) {
      const n = fuente.split(`data-tour="${id}"`).length - 1 + fuente.split(`'${id}'`).length - 1;
      expect(n, id).toBe(1);
    }
    expect(leer(pagina)).toContain(`<TourInvitacion pantalla="${clave}" />`);
    expect(GUIAS_PANTALLA[clave]).toBe(pasos);
  });
  it('textos breves en todas las guías', () => {
    for (const pasos of Object.values(GUIAS_PANTALLA))
      for (const p of pasos) {
        expect(p.titulo.length, p.id).toBeLessThanOrEqual(40);
        expect(p.texto.length, p.id).toBeLessThanOrEqual(140);
      }
  });
  it('/servicios ya no explica cuántos servicios y familias hay', () => {
    expect(leer('src/themes/limpio/Servicios.astro')).not.toMatch(/servicios listos hoy|totalListos/);
  });
  it('los pasos de «Así de fácil» no dependen de una animación de scroll para verse', () => {
    expect(leer('src/themes/limpio/ui/Pasos.astro')).not.toMatch(/animation-timeline/);
  });
});

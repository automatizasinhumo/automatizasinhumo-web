// C20: el vigilante de idioma de las demos y las reglas fijas del localizador.
import { load } from 'cheerio';
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { aceptadas, aEuros, esFinal, eurosEnScript, marcados, reglasFijas } from '../../manual/demos/localizar-demos.mjs';
import { hallazgos, problemas, rutasDeDemos } from '../../scripts/demos/idioma.mjs';

const pagina = (cuerpo) => `<!doctype html><html lang="es"><head><title>Boda</title></head><body>${cuerpo}</body></html>`;

describe('vigilante de idioma', () => {
  it('marca la demo de boda tal como estaba («Travel and Stay») y acepta la regenerada', () => {
    const vieja = hallazgos(pagina('<h2>Travel and Stay</h2><p>Os esperamos en Segovia.</p>'));
    expect(vieja.map((h) => h.tipo)).toContain('inglés');
    expect(hallazgos(pagina('<h2>Viaje y alojamiento</h2><p>Os esperamos en Segovia.</p>'))).toEqual([]);
  });

  it('no confunde palabras con tilde con inglés («Allí», «Lucía»)', () => {
    expect(problemas('Allí estaremos con Lucía y su familia')).toEqual([]);
  });

  it('marca monedas, teléfonos y correos de fuera aunque el texto sea solo cifras', () => {
    expect(problemas('(512) 555-0163')).toContain('moneda o teléfono de fuera');
    expect(problemas('Desde $40 al mes')).toContain('moneda o teléfono de fuera');
    expect(problemas('Escríbenos a hola@example.com')).toContain('correo de ejemplo');
    expect(problemas('912 345 678')).toEqual([]);
  });

  it('distingue el calco «Vamos a casar» de «Nos vamos a casar»', () => {
    expect(problemas('Vamos a casar')).toContain('calco');
    expect(problemas('¡Nos vamos a casar!')).toEqual([]);
  });

  it('revisa todas las demos del catálogo', () => {
    expect(rutasDeDemos().length).toBeGreaterThanOrEqual(50);
  });
});

describe('localizador', () => {
  it('pasa importes a euros sin tocar la cifra', () => {
    expect(aEuros('Desde $40/mo')).toBe('Desde 40 €/mes');
    expect(aEuros('Total: £1,250.50')).toBe('Total: 1250,50 €');
    expect(aEuros('Ventas de £4.2bn')).toBe('Ventas de 4,2 mil millones de €');
    expect(aEuros('Ganamos 12000 USD')).toBe('Ganamos 12.000 €');
    expect(aEuros('Desde $40 por persona')).toBe('Desde 40 € por persona');
    expect(aEuros('Desde $40 kilos')).toBe('Desde 40 € kilos');
    expect(eurosEnScript('x=`£${p.toFixed(2)}`')).toBe('x=`${p.toFixed(2)} €`');
  });

  it('arregla precios partidos, scripts y mailto sin IA', () => {
    const $ = load(pagina('<p>🛒 £<span id="ct">0.00</span></p><a href="mailto:rsvp@example.com">x</a><script>t=`$${n}`</script>'));
    expect(reglasFijas($)).toBeGreaterThanOrEqual(3);
    expect($('p').text()).toBe('🛒 0.00 €');
    expect($('a').attr('href')).toBe('mailto:rsvp@ejemplo.es');
    expect($('script').html()).toBe('t=`${n} €`');
  });

  it('solo acepta respuestas de la IA que el vigilante da por buenas', () => {
    const pedido = { 0: 'Travel and Stay', 1: 'RSVP by June', 2: 'Our menu' };
    const respuesta = { 0: 'Viaje y alojamiento', 1: 'RSVP by June', 2: 'Our full menu', 3: 'sobra' };
    expect(aceptadas(pedido, respuesta)).toEqual({ 0: 'Viaje y alojamiento' });
  });

  it('rechaza respuestas con alternativas o razonamiento y exige las mismas etiquetas', () => {
    expect(esFinal('Helicopter flight', 'Vuelo -> Vuelo en helicóptero, por ejemplo')).toBe(false);
    expect(esFinal('Travel <span>and</span> Stay', 'Viaje <span>y</span> alojamiento')).toBe(true);
    expect(esFinal('Travel <span>and</span> Stay', 'Viaje y alojamiento')).toBe(false);
  });

  it('la caché solo guarda traducciones finales', () => {
    const cache = JSON.parse(readFileSync(new URL('../../manual/demos/localizaciones-cache.json', import.meta.url), 'utf8'));
    const malas = Object.entries(cache).filter(([o, v]) => /->|\bpor ejemplo\b|\bEntonces:/i.test(v) && !/->/.test(o));
    expect(malas).toEqual([]);
  });

  it('localiza frases repartidas en elementos en línea, botones con value y lang', () => {
    const $ = load('<html lang="en"><body><h2>Travel <span class="x">and</span> Stay</h2><input type="submit" value="Submit"><input name="q" value="Send"></body></html>');
    expect(reglasFijas($)).toBeGreaterThanOrEqual(1);
    expect($('html').attr('lang')).toBe('es');
    const puntos = marcados($);
    const textos = puntos.map((p) => p.texto);
    expect(textos).toContain('Travel <span class="x">and</span> Stay');
    expect(textos).toContain('Submit');
    expect(textos).not.toContain('Send');
    puntos.find((p) => p.texto.startsWith('Travel')).poner('Viaje <span class="x">y</span> alojamiento');
    expect($('h2').html()).toBe('Viaje <span class="x">y</span> alojamiento');
  });
});

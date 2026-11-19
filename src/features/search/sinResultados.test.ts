import { describe, expect, it } from 'vitest';
import { enlaceConsulta, eventoSinResultados, limpiarBusqueda, MAX_BUSQUEDA, mensajeDesdeBusqueda } from './sinResultados';

describe('búsqueda sin resultados', () => {
  it('lleva la consulta al formulario codificada', () => {
    expect(enlaceConsulta('web para mi perro & gato')).toBe('/empezar/consulta?busqueda=web%20para%20mi%20perro%20%26%20gato');
    expect(enlaceConsulta('   ')).toBe('/empezar/consulta');
  });

  it('limpia controles, espacios y longitud', () => {
    expect(limpiarBusqueda(' a\u0000b​  c\n ')).toBe('a b c');
    expect(limpiarBusqueda(null)).toBe('');
    expect(limpiarBusqueda('x'.repeat(500))).toHaveLength(MAX_BUSQUEDA);
  });

  it('prepara el mensaje solo si hay búsqueda', () => {
    expect(mensajeDesdeBusqueda('gogle maps')).toBe('Busqué «gogle maps» en la web y no encontré lo que necesito. ');
    expect(mensajeDesdeBusqueda('')).toBe('');
  });

  it('registra un evento JSON con la consulta limpia', () => {
    expect(JSON.parse(eventoSinResultados(' zzqx '))).toEqual({ event: 'busqueda_sin_resultados', q: 'zzqx' });
  });
});

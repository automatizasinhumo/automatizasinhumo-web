import { describe, expect, it } from 'vitest';
import { horarioSchema, tipoNegocio } from './negocioSchema';
import { EJEMPLO_WEB, fichaNegocio } from './webs';

describe('tipoNegocio', () => {
  it('deduce el subtipo del sector, sin importar tildes ni mayúsculas', () => {
    expect(tipoNegocio('Peluquería y estética')).toBe('HairSalon');
    expect(tipoNegocio('CLÍNICA DENTAL')).toBe('Dentist');
    expect(tipoNegocio('Taller mecánico')).toBe('AutoRepair');
    expect(tipoNegocio('Bar de tapas')).toBe('Restaurant');
    expect(tipoNegocio('Barbería')).toBe('HairSalon');
    expect(tipoNegocio('Salón de uñas')).toBe('NailSalon');
    expect(tipoNegocio('Tienda de aceitunas')).toBe('Store');
  });
  it('si no lo reconoce, LocalBusiness', () => {
    expect(tipoNegocio('')).toBe('LocalBusiness');
    expect(tipoNegocio('Consultoría de ingeniería')).toBe('LocalBusiness');
  });
});

describe('horarioSchema', () => {
  it('entiende rangos de días, plurales y dos tramos', () => {
    expect(horarioSchema('Lunes a viernes: 9:30 – 14:00 y 17:00 – 20:00\nSábados: 10 a 14 h')).toEqual([
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:30', closes: '14:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '17:00', closes: '20:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '10:00', closes: '14:00' },
    ]);
  });
  it('listas, abreviaturas y guiones', () => {
    expect(horarioSchema('Lun, mié y vie de 8.00 a 15.00')?.[0]?.dayOfWeek).toEqual(['Monday', 'Wednesday', 'Friday']);
    expect(horarioSchema('lunes-jueves 9-13')?.[0]?.dayOfWeek).toEqual(['Monday', 'Tuesday', 'Wednesday', 'Thursday']);
  });
  it('ignora las líneas de cerrado', () => {
    expect(horarioSchema('Lunes a sábado: 9:00 - 21:00\nDomingos: cerrado')).toHaveLength(1);
  });
  it('un día cerrado sale de los rangos que lo incluyen', () => {
    expect(horarioSchema('Lunes a viernes: 9-14\nMiércoles: cerrado')?.[0]?.dayOfWeek).toEqual(['Monday', 'Tuesday', 'Thursday', 'Friday']);
    expect(horarioSchema('Domingo: 10-14\nDomingo: cerrado')).toBeUndefined();
  });
  it('si una línea no se entiende, no emite nada', () => {
    expect(horarioSchema('Lunes a viernes: 9:30 – 20:00\nVerano: 8 – 15')).toBeUndefined();
    expect(horarioSchema('Mañanas de 9 a 14')).toBeUndefined();
    expect(horarioSchema('Lunes: 25:00 - 26:00')).toBeUndefined();
    expect(horarioSchema('Lunes: 09:00 - 24:30')).toBeUndefined();
    expect(horarioSchema('Viernes: 20:00 - 24:00')?.[0]?.closes).toBe('24:00');
    expect(horarioSchema('Viernes a lunes: 9 - 14')).toBeUndefined();
    expect(horarioSchema('')).toBeUndefined();
  });
});

describe('fichaNegocio: tipo y horario', () => {
  it('el ejemplo sale como peluquería con su horario', () => {
    const f = JSON.parse(fichaNegocio(EJEMPLO_WEB, 'https://x.es'));
    expect(f['@type']).toBe('HairSalon');
    expect(f.openingHoursSpecification).toHaveLength(2);
  });
});

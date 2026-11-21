import { describe, expect, it } from 'vitest';
import { AUTOSERVICIO, SLUG_CV, SLUG_TARJETA, enlaceAutoservicio, varianteDeSku } from '../../src/features/servicios/autoservicio';
import { COLOR_POR_DEFECTO, SLUG_TARJETA_VALIDO, slugBase, urlSegura, validarTarjeta, vcard } from '../../src/features/servicios/publicados';

describe('urlSegura', () => {
  it('completa https:// y acepta http(s)', () => {
    expect(urlSegura('linkedin.com/in/ana')).toBe('https://linkedin.com/in/ana');
    expect(urlSegura('http://ana.es')).toBe('http://ana.es/');
  });
  it('descarta otros esquemas y textos sin dominio', () => {
    expect(urlSegura('javascript:alert(1)')).toBe('');
    expect(urlSegura('data:text/html,hola')).toBe('');
    expect(urlSegura('mailto:a@b.es')).toBe('');
    expect(urlSegura('hola')).toBe('');
    expect(urlSegura(42)).toBe('');
  });
});

describe('validarTarjeta', () => {
  const base = { nombre: '  Ana Pérez ', email: 'ana@correo.es' };
  it('limpia y completa los datos', () => {
    const r = validarTarjeta({ ...base, web: 'ana.es', color: '#AABBCC', enlaces: [{ etiqueta: '', url: 'linkedin.com/in/ana' }] });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.datos.nombre).toBe('Ana Pérez');
    expect(r.datos.web).toBe('https://ana.es/');
    expect(r.datos.color).toBe('#aabbcc');
    expect(r.datos.enlaces).toEqual([{ etiqueta: 'linkedin.com', url: 'https://linkedin.com/in/ana' }]);
  });
  it('exige nombre y al menos una forma de contacto', () => {
    expect(validarTarjeta({ email: 'a@b.es' })).toEqual({ ok: false, error: 'nombre' });
    expect(validarTarjeta({ nombre: 'Ana' })).toEqual({ ok: false, error: 'contacto' });
    expect(validarTarjeta(null)).toEqual({ ok: false, error: 'datos' });
  });
  it('rechaza correo y teléfono mal escritos', () => {
    expect(validarTarjeta({ ...base, email: 'ana@' })).toEqual({ ok: false, error: 'email' });
    expect(validarTarjeta({ ...base, telefono: 'llámame' })).toEqual({ ok: false, error: 'telefono' });
  });
  it('quita enlaces peligrosos, el duplicado de la web y limita a 6', () => {
    const enlaces = [{ url: 'javascript:x' }, { url: 'ana.es' }, ...Array.from({ length: 9 }, (_, i) => ({ etiqueta: `E${i}`, url: `e${i}.es` }))];
    const r = validarTarjeta({ ...base, web: 'ana.es', enlaces });
    expect(r.ok && r.datos.enlaces.map((e) => e.etiqueta)).toEqual(['E0', 'E1', 'E2', 'E3', 'E4', 'E5']);
  });
  it('color no válido → color por defecto', () => {
    const r = validarTarjeta({ ...base, color: 'red' });
    expect(r.ok && r.datos.color).toBe(COLOR_POR_DEFECTO);
  });
});

describe('slugBase', () => {
  it('sin tildes, en minúsculas y con guiones', () => {
    expect(slugBase('José Pérez Núñez')).toBe('jose-perez-nunez');
    expect(slugBase('  ¡¡Ana!!  ')).toBe('ana');
    expect(slugBase('***')).toBe('tarjeta');
  });
  it('siempre produce una dirección válida, también con sufijo', () => {
    for (const n of ['José Pérez Núñez', 'x'.repeat(200), 'a- -b', 'Ñ']) {
      expect(SLUG_TARJETA_VALIDO.test(slugBase(n))).toBe(true);
      expect(SLUG_TARJETA_VALIDO.test(`${slugBase(n)}-9`)).toBe(true);
    }
  });
});

describe('vcard', () => {
  it('escapa separadores y termina en CRLF', () => {
    const r = validarTarjeta({ nombre: 'Ana Pérez Gil', cargo: 'Jefa; ventas, norte', email: 'ana@correo.es', resumen: 'Hola' });
    if (!r.ok) throw new Error('tarjeta no válida');
    const v = vcard(r.datos, 'https://x.es/c/ana');
    expect(v.startsWith('BEGIN:VCARD\r\nVERSION:3.0\r\n')).toBe(true);
    expect(v).toContain('N:Pérez Gil;Ana;;;');
    expect(v).toContain('TITLE:Jefa\\; ventas\\, norte');
    expect(v.endsWith('END:VCARD\r\n')).toBe(true);
  });
});

describe('autoservicio', () => {
  it('cada variante del CV se recupera por su sku', () => {
    for (const [clave, v] of Object.entries(AUTOSERVICIO[SLUG_CV]!.variantes!)) expect(varianteDeSku(SLUG_CV, v.sku)).toBe(clave);
    expect(varianteDeSku(SLUG_CV, 'cv-profesional-diy')).toBeNull();
    expect(varianteDeSku(SLUG_TARJETA, null)).toBeNull();
  });
  it('el enlace del pedido lleva el token en el hash', () => {
    expect(enlaceAutoservicio(SLUG_CV, 'a b')).toBe(`${AUTOSERVICIO[SLUG_CV]!.estudio}#pedido=a%20b`);
    expect(enlaceAutoservicio('web-corporativa', 't')).toBeNull();
  });
});

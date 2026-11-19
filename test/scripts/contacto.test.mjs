import { describe, expect, it } from 'vitest';
import { cifrasTel, esCta, problemaContacto, problemasIndexacion } from '../../qa/contacto.mjs';

describe('enlaces de contacto', () => {
  it('acepta teléfonos españoles e internacionales con separadores', () => {
    for (const h of ['tel:986000000', 'tel:+34 986 00 00 00', 'tel:+34-600-000-000', 'tel:(+34)600.000.000', 'tel:%2B34600000000']) {
      expect(problemaContacto(h), h).toBeNull();
    }
    expect(cifrasTel('tel:+34 600 00 00 00')).toBe('+34600000000');
  });

  it('rechaza teléfonos cortos, vacíos, con letras o con «+» en medio', () => {
    for (const h of ['tel:', 'tel:600', 'tel:+1 555', 'tel:98600000X', 'tel:34+600000000', 'tel:0000']) {
      expect(problemaContacto(h), h).toMatch(/^teléfono no válido/);
    }
  });

  it('WhatsApp: solo cifras y con prefijo de país', () => {
    expect(problemaContacto('https://wa.me/34600000000')).toBeNull();
    expect(problemaContacto('https://wa.me/34600000000?text=Hola')).toBeNull();
    expect(problemaContacto('https://api.whatsapp.com/send?phone=34600000000')).toBeNull();
    expect(problemaContacto('https://wa.me/message/ABCDEF123')).toBeNull();
    expect(problemaContacto('https://wa.me/?text=hola')).toBeNull();
    expect(problemaContacto('https://wa.me/600000000')).toMatch(/^WhatsApp no válido/);
    expect(problemaContacto('https://wa.me/+34600000000')).toMatch(/^WhatsApp no válido/);
    expect(problemaContacto('https://wa.me/34%20600000000')).toMatch(/^WhatsApp no válido/);
    expect(problemaContacto('https://api.whatsapp.com/send?phone=600')).toMatch(/^WhatsApp no válido/);
    expect(problemaContacto('//wa.me/600000000')).toMatch(/^WhatsApp no válido/);
  });

  it('correo con dominio', () => {
    expect(problemaContacto('mailto:hola@negocio.es')).toBeNull();
    expect(problemaContacto('mailto:hola@negocio.es?subject=Cita')).toBeNull();
    expect(problemaContacto('mailto:')).toMatch(/^correo no válido/);
    expect(problemaContacto('mailto:hola@')).toMatch(/^correo no válido/);
  });

  it('el resto de enlaces no son asunto suyo', () => {
    for (const h of ['/reservar', '#contacto', 'https://example.com/', 'javascript:void(0)', null]) expect(problemaContacto(h)).toBeNull();
  });
});

describe('primer clic', () => {
  it('reconoce llamadas a la acción por destino o por texto', () => {
    expect(esCta({ href: 'tel:986000000' })).toBe(true);
    expect(esCta({ href: 'https://wa.me/34600000000' })).toBe(true);
    expect(esCta({ href: '#contacto' })).toBe(true);
    expect(esCta({ texto: 'Reservar mesa' })).toBe(true);
    expect(esCta({ texto: 'Pide cita' })).toBe(true);
    expect(esCta({ texto: 'Confirmar asistencia' })).toBe(true);
  });
  it('no cuenta la navegación ni el menú', () => {
    expect(esCta({ texto: 'Inicio', href: '/' })).toBe(false);
    expect(esCta({ texto: 'Menú', href: '' })).toBe(false);
    expect(esCta({ texto: 'Servicios', href: '#servicios' })).toBe(false);
    expect(esCta({ texto: 'Pagos', href: '/contactless-payments' })).toBe(false);
    expect(esCta({ texto: 'Ver', href: '/contacto/' })).toBe(true);
  });
});

describe('indexación al publicar', () => {
  const url = 'https://negocio.es/';
  it('una página limpia no tiene problemas', () => {
    expect(problemasIndexacion({ url, canonicals: ['https://negocio.es'] })).toEqual([]);
    expect(problemasIndexacion({ url, canonicals: [] })).toEqual([]);
    expect(problemasIndexacion({ url: 'https://negocio.es/carta', canonicals: ['/carta'] })).toEqual([]);
  });
  it('marca noindex en meta o cabecera', () => {
    expect(problemasIndexacion({ url, robotsMeta: ['noindex, follow'] })).toHaveLength(1);
    expect(problemasIndexacion({ url, robotsCabecera: 'noindex' })).toHaveLength(1);
    expect(problemasIndexacion({ url, robotsMeta: ['none'] })).toHaveLength(1);
    expect(problemasIndexacion({ url, robotsMeta: ['index, follow'] })).toEqual([]);
    expect(problemasIndexacion({ url, robotsMeta: ['index, max-image-preview:none'] })).toEqual([]);
    expect(problemasIndexacion({ url, robotsCabecera: 'googlebot: noindex' })).toHaveLength(1);
  });
  it('marca canonical a otra URL o duplicado', () => {
    expect(problemasIndexacion({ url, canonicals: ['https://plantilla.test/'] })[0]).toMatch(/canonical apunta/);
    expect(problemasIndexacion({ url, canonicals: ['https://negocio.es/', 'https://negocio.es/'] })[0]).toMatch(/varias/);
  });
});

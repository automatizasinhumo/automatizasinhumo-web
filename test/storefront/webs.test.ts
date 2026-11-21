import { describe, expect, it } from 'vitest';
import {
  CSS_WEB,
  EJEMPLO_WEB,
  LETRAS_WEB,
  MAX_ENLACES_WEB,
  MAX_SERVICIOS_WEB,
  PLANTILLAS_WEB,
  WEB_POR_DEFECTO,
  documentoWeb,
  enlaceWhatsapp,
  esc,
  renderWeb,
  sobreAcento,
  validarWeb,
} from '../../src/features/servicios/webs';

const base = { negocio: '  Bar Pepe ', telefono: '982 11 22 33' };

describe('validarWeb', () => {
  it('limpia y completa con los valores por defecto', () => {
    const r = validarWeb({ ...base, plantilla: 'inventada', letra: 'comic', color: 'red' });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.datos.negocio).toBe('Bar Pepe');
    expect(r.datos.plantilla).toBe(WEB_POR_DEFECTO.plantilla);
    expect(r.datos.letra).toBe(WEB_POR_DEFECTO.letra);
    expect(r.datos.color).toBe(WEB_POR_DEFECTO.color);
    expect(r.datos.servicios).toEqual([]);
  });
  it('exige nombre y una forma de contacto', () => {
    expect(validarWeb(null)).toEqual({ ok: false, error: 'datos' });
    expect(validarWeb({ telefono: '600000000' })).toEqual({ ok: false, error: 'negocio' });
    expect(validarWeb({ negocio: 'Bar' })).toEqual({ ok: false, error: 'contacto' });
  });
  it('rechaza teléfono, WhatsApp y correo mal escritos', () => {
    expect(validarWeb({ ...base, telefono: 'llámame' })).toEqual({ ok: false, error: 'telefono' });
    expect(validarWeb({ ...base, whatsapp: 'no' })).toEqual({ ok: false, error: 'whatsapp' });
    expect(validarWeb({ ...base, email: 'pepe@' })).toEqual({ ok: false, error: 'email' });
  });
  it('quita servicios sin nombre, enlaces peligrosos y respeta los máximos', () => {
    const servicios = [{ nombre: '' }, ...Array.from({ length: 10 }, (_, i) => ({ nombre: `S${i}` }))];
    const enlaces = [{ url: 'javascript:alert(1)' }, ...Array.from({ length: 9 }, (_, i) => ({ url: `e${i}.es` }))];
    const r = validarWeb({ ...base, servicios, enlaces });
    if (!r.ok) throw new Error(r.error);
    expect(r.datos.servicios).toHaveLength(MAX_SERVICIOS_WEB);
    expect(r.datos.servicios[0]!.nombre).toBe('S0');
    expect(r.datos.enlaces).toHaveLength(MAX_ENLACES_WEB);
    expect(r.datos.enlaces[0]).toEqual({ etiqueta: 'e0.es', url: 'https://e0.es/' });
  });
  it('el ejemplo es válido tal cual', () => {
    expect(validarWeb(EJEMPLO_WEB)).toEqual({ ok: true, datos: EJEMPLO_WEB });
  });
});

describe('renderWeb', () => {
  it('escapa todo lo que escribe el cliente', () => {
    const r = validarWeb({ ...base, negocio: '<script>x</script>', lema: '"><img src=x onerror=alert(1)>', servicios: [{ nombre: '<b>', precio: '<i>' }] });
    if (!r.ok) throw new Error(r.error);
    const html = renderWeb(r.datos);
    expect(html).not.toMatch(/<script|<img|<b>|<i>/);
    expect(html).toContain('&lt;script&gt;');
  });
  it('cada plantilla y letra cambia solo la clase y las variables', () => {
    for (const p of PLANTILLAS_WEB) {
      expect(renderWeb({ ...EJEMPLO_WEB, plantilla: p.id })).toContain(`class="w w-${p.id}"`);
      expect(CSS_WEB).toContain(`.w-${p.id}`);
    }
    for (const l of LETRAS_WEB) expect(renderWeb({ ...EJEMPLO_WEB, letra: l.id })).toContain(`--w-ft-titulo:${esc(l.titulo)}`);
  });
  it('marca de agua solo en la vista previa', () => {
    expect(renderWeb(EJEMPLO_WEB, { marca: 'VISTA PREVIA' })).toContain('class="w-marca"');
    expect(renderWeb(EJEMPLO_WEB)).not.toContain('class="w-marca"');
    const doc = documentoWeb(EJEMPLO_WEB, 'https://x.es/w/peluqueria-lola');
    expect(doc).not.toContain('class="w-marca"');
    expect(doc).toContain('<link rel="canonical" href="https://x.es/w/peluqueria-lola">');
    expect(doc).not.toMatch(/<script/);
  });
});

describe('ayudas', () => {
  it('enlace de WhatsApp con prefijo español en móviles', () => {
    expect(enlaceWhatsapp('600 11 22 33')).toBe('https://wa.me/34600112233');
    expect(enlaceWhatsapp('+34 600112233')).toBe('https://wa.me/34600112233');
    expect(enlaceWhatsapp('0044 7700 900123')).toBe('https://wa.me/447700900123');
  });
  it('texto legible sobre el acento', () => {
    expect(sobreAcento('#ffffff')).toBe('#111827');
    expect(sobreAcento('#1f2937')).toBe('#ffffff');
  });
});

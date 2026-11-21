import { describe, expect, it } from 'vitest';
import {
  CSS_WEB,
  EJEMPLO_WEB,
  LETRAS_WEB,
  MAX_ENLACES_WEB,
  MAX_SERVICIOS_WEB,
  PLANTILLAS_WEB,
  WEB_POR_DEFECTO,
  CONTRASTE_AA,
  FONDO_TEXTO_CLARO,
  FONDO_TEXTO_OSCURO,
  acentoSobre,
  contraste,
  documentoWeb,
  fichaNegocio,
  MAX_FOTO_WEB,
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
    expect(validarWeb({ ...base, telefono: '......' })).toEqual({ ok: false, error: 'telefono' });
    expect(validarWeb({ ...base, whatsapp: '(  ) -' })).toEqual({ ok: false, error: 'whatsapp' });
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
    expect(html).not.toMatch(/<script|<img|<b>|<i>/i);
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
    // Sin JavaScript: el único <script> es la ficha de datos para buscadores.
    expect(doc.match(/<script[^>]*>/gi)).toEqual(['<script type="application/ld+json">']);
  });

  it('desde el dominio del cliente, el pie y el icono apuntan a nuestra tienda', () => {
    const doc = documentoWeb(EJEMPLO_WEB, 'https://lola.es/', 'https://tienda.example');
    expect(doc).toContain('<link rel="canonical" href="https://lola.es/">');
    expect(doc).toContain('href="https://tienda.example/servicios/web"');
    expect(doc).toContain('<link rel="icon" href="https://tienda.example/favicon.svg">');
    expect(documentoWeb(EJEMPLO_WEB, 'https://x.es/w/a')).toContain('href="/servicios/web"');
  });
});

describe('ayudas', () => {
  it('enlace de WhatsApp con prefijo español en móviles', () => {
    expect(enlaceWhatsapp('600 11 22 33')).toBe('https://wa.me/34600112233');
    expect(enlaceWhatsapp('+34 600112233')).toBe('https://wa.me/34600112233');
    expect(enlaceWhatsapp('0044 7700 900123')).toBe('https://wa.me/447700900123');
  });
  it('texto legible sobre el acento', () => {
    expect(sobreAcento('#ffffff')).toBe('#000000');
    expect(sobreAcento('#1f2937')).toBe('#ffffff');
    // Con luminancia lineal: el gris medio lleva texto negro (el blanco se queda en 3,9:1).
    expect(sobreAcento('#808080')).toBe('#000000');
  });
  it('cualquier acento cumple AA como texto en claro y en oscuro, y sobre el acento', () => {
    const muestras = ['#ffffff', '#000000', '#808080', '#2563eb', '#facc15', '#22c55e', '#0f172a', '#f472b6'];
    for (const c of muestras) {
      expect(contraste(acentoSobre(c, FONDO_TEXTO_CLARO), FONDO_TEXTO_CLARO)).toBeGreaterThanOrEqual(CONTRASTE_AA);
      expect(contraste(acentoSobre(c, '#ffffff'), '#ffffff')).toBeGreaterThanOrEqual(CONTRASTE_AA);
      expect(contraste(acentoSobre(c, FONDO_TEXTO_OSCURO), FONDO_TEXTO_OSCURO)).toBeGreaterThanOrEqual(CONTRASTE_AA);
      expect(contraste(sobreAcento(c), c)).toBeGreaterThanOrEqual(CONTRASTE_AA);
    }
    expect(acentoSobre('#1d4ed8', FONDO_TEXTO_CLARO)).toBe('#1d4ed8');
  });
});

describe('fichaNegocio', () => {
  it('describe el negocio para buscadores con lo que el cliente rellenó', () => {
    const f = JSON.parse(fichaNegocio(EJEMPLO_WEB, 'https://lola.es/'));
    expect(f['@type']).toBe('LocalBusiness');
    expect(f.name).toBe(EJEMPLO_WEB.negocio);
    expect(f.url).toBe('https://lola.es/');
    expect(f.telephone).toBe(EJEMPLO_WEB.telefono);
    expect(f.makesOffer.length).toBe(EJEMPLO_WEB.servicios.filter((s) => s.nombre).length);
    const doc = documentoWeb(EJEMPLO_WEB, 'https://lola.es/');
    expect(doc).toContain(`<script type="application/ld+json">${fichaNegocio(EJEMPLO_WEB, 'https://lola.es/')}</script>`);
  });

  it('omite lo vacío', () => {
    const r = validarWeb(base);
    if (!r.ok) throw new Error(r.error);
    const f = JSON.parse(fichaNegocio(r.datos, 'https://x.es/w/bar-pepe'));
    expect(f).not.toHaveProperty('email');
    expect(f).not.toHaveProperty('address');
    expect(f).not.toHaveProperty('sameAs');
    expect(f).not.toHaveProperty('makesOffer');
  });

  it('ningún texto puede cerrar la etiqueta <script>', () => {
    const r = validarWeb({ ...base, sobre: 'Hola </script><script>alert(1)</script>' });
    if (!r.ok) throw new Error(r.error);
    const json = fichaNegocio(r.datos, 'https://x.es/w/a');
    expect(json).not.toContain('<');
    expect(JSON.parse(json).description).toContain('</script>');
  });
});

describe('foto de portada', () => {
  const foto = 'data:image/webp;base64,UklGRhIAAABXRUJQVlA4TAYAAAAvAAAAAAA=';
  it('se guarda y se pinta si es una imagen reducida válida', () => {
    const r = validarWeb({ ...base, foto });
    if (!r.ok) throw new Error(r.error);
    expect(r.datos.foto).toBe(foto);
    expect(renderWeb(r.datos)).toContain(`<img src="${foto}"`);
  });

  it('se descarta sin error si no es una foto válida o es demasiado grande', () => {
    for (const mala of [
      'javascript:alert(1)',
      'data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=',
      'data:image/webp;base64,AAA" onerror="alert(1)',
      'data:image/webp;base64,' + 'A'.repeat(MAX_FOTO_WEB),
      42,
    ]) {
      const r = validarWeb({ ...base, foto: mala });
      if (!r.ok) throw new Error(r.error);
      expect(r.datos.foto).toBe('');
      expect(renderWeb(r.datos)).not.toContain('w-portada');
    }
  });
});

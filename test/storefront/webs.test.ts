import { describe, expect, it } from 'vitest';
import {
  bytesFoto,
  CSS_WEB,
  EJEMPLO_WEB,
  LETRAS_WEB,
  MAX_ENLACES_WEB,
  MAX_SERVICIOS_WEB,
  PLANTILLAS_WEB,
  PLANTILLAS_ANTIGUAS,
  resolverPlantilla,
  type DatosWeb,
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
      expect(renderWeb({ ...EJEMPLO_WEB, plantilla: p.id })).toContain(`class="w w-t-${p.id}"`);
      expect(CSS_WEB).toContain(`.w-t-${p.id}`);
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
  it('el fondo de referencia es el más desfavorable de todos los paneles de las plantillas', () => {
    const fondos = [...CSS_WEB.matchAll(/--w-(?:fondo|panel):(#[0-9a-f]{3,6})/g)].map((m) => m[1]!.length === 4 ? `#${[...m[1]!.slice(1)].map((x) => x + x).join('')}` : m[1]!);
    for (const c of ['#777777', '#808080', '#2563eb', '#facc15', '#f472b6']) {
      for (const f of fondos) {
        const fondo = contraste(f, '#ffffff') < contraste(f, '#000000') ? FONDO_TEXTO_CLARO : FONDO_TEXTO_OSCURO;
        expect(contraste(acentoSobre(c, fondo), f), `${c} sobre ${f}`).toBeGreaterThanOrEqual(CONTRASTE_AA);
      }
    }
  });
});

describe('fichaNegocio', () => {
  it('describe el negocio para buscadores con lo que el cliente rellenó', () => {
    const f = JSON.parse(fichaNegocio(EJEMPLO_WEB, 'https://lola.es/'));
    expect(f['@type']).toBe('HairSalon');
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

  it('sale como imagen al compartir (og:image) solo si hay foto', () => {
    const r = validarWeb({ ...base, foto });
    if (!r.ok) throw new Error(r.error);
    const img = 'https://x.test/w/lola/foto';
    expect(documentoWeb(r.datos, 'https://x.test/w/lola', '', img)).toContain(`<meta property="og:image" content="${img}">`);
    expect(documentoWeb({ ...r.datos, foto: '' }, 'https://x.test/w/lola', '', img)).not.toContain('og:image');
    const b = bytesFoto(foto)!;
    expect(b.tipo).toBe('image/webp');
    expect(String.fromCharCode(...b.bytes.slice(0, 4))).toBe('RIFF');
    expect(bytesFoto('javascript:alert(1)')).toBeNull();
    expect(bytesFoto('data:image/png;base64,A')).toBeNull();
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
      expect(renderWeb(r.datos)).not.toContain('w-cab-foto');
    }
  });
});

describe('renderWeb: plantillas compuestas', () => {
  const con = (x: Record<string, unknown>) => {
    const r = validarWeb({ ...base, ...x });
    if (!r.ok) throw new Error(r.error);
    return r.datos;
  };
  it('los ids antiguos se traducen a la plantilla nueva más parecida', () => {
    for (const [viejo, nuevo] of Object.entries(PLANTILLAS_ANTIGUAS)) {
      expect(PLANTILLAS_WEB.some((p) => p.id === nuevo)).toBe(true);
      expect(con({ plantilla: viejo }).plantilla).toBe(nuevo);
      expect(resolverPlantilla(viejo)).toBe(nuevo);
    }
    expect(resolverPlantilla('inventada')).toBeUndefined();
  });
  it('cada plantilla pinta su portada, sus variantes y una identidad propia en el CSS', () => {
    const vistas = new Set<string>();
    for (const p of PLANTILLAS_WEB) {
      const html = renderWeb({ ...EJEMPLO_WEB, plantilla: p.id });
      expect(html).toContain(`w-cab w-h-${p.hero} w-sin-foto`);
      expect(html).toContain(`w-contacto-bloque w-c-${p.contacto}`);
      vistas.add(`${p.hero}${p.servicios}${p.galeria}${p.opiniones}${p.contacto}`);
      expect(p.orden.at(-1)).toBe('contacto');
    }
    expect(vistas.size).toBeGreaterThanOrEqual(10);
    for (const v of ['w-h-1', 'w-h-6', 'w-s-5', 'w-g-4', 'w-o-3', 'w-c-4', 'w-zonas', 'w-horario', 'w-franja']) expect(CSS_WEB).toContain(`.${v}`);
    expect(CSS_WEB).not.toMatch(/@media[^{]*width/);
  });
  it('con foto, va en la portada; sin foto, la portada lo sabe', () => {
    const foto = 'data:image/webp;base64,AAAA';
    const html = renderWeb(con({ plantilla: 'barra', foto }));
    expect(html).toContain('<header class="w-cab w-h-2">');
    expect(html).toContain(`<figure class="w-cab-foto"><img src="${foto}"`);
  });
  it('las variantes se degradan con pocos datos', () => {
    const uno = renderWeb(con({ plantilla: 'salon', servicios: [{ nombre: 'Corte', precio: '15 €' }] }));
    expect(uno).toContain('w-servicios w-s-3" data-n="1"');
    const sinPrecio = renderWeb(con({ plantilla: 'salon', servicios: [{ nombre: 'Corte' }, { nombre: 'Tinte' }] }));
    expect(sinPrecio).toContain('w-servicios w-s-5"');
    const conPrecio = renderWeb(con({ plantilla: 'salon', servicios: [{ nombre: 'Corte', precio: '15 €' }, { nombre: 'Tinte' }] }));
    expect(conPrecio).toContain('w-servicios w-s-2"');
    const opinion = renderWeb(con({ plantilla: 'barra', opiniones: [{ texto: 'Genial', autor: 'Ana' }] }));
    expect(opinion).toContain('w-opiniones w-o-1"');
  });
  it('zonas y horario tienen sección propia si la plantilla la trae, y si no van en contacto', () => {
    const d = { horario: 'Lunes a viernes: 9:30–20:00\nSábados cerrado', zonas: 'Vigo, Redondela; Cangas' };
    const guardia = renderWeb(con({ ...d, plantilla: 'guardia' }));
    expect(guardia).toContain('<ul class="w-zonas"><li>Vigo</li><li>Redondela</li><li>Cangas</li></ul>');
    expect(guardia).toContain('<tr><th scope="row">Lunes a viernes</th><td>9:30–20:00</td></tr><tr><td colspan="2">Sábados cerrado</td></tr>');
    expect(guardia).not.toContain('<small>Horario</small>');
    expect(guardia).toContain('<p class="w-cab-dato">');
    const encuadre = renderWeb(con({ ...d, plantilla: 'encuadre' }));
    expect(encuadre).not.toContain('id="horario"');
    expect(encuadre).toContain('<small>Horario</small>');
    expect(encuadre).toContain('<small>Zonas que atendemos</small>');
  });
  it('la franja invita con la acción principal', () => {
    expect(renderWeb(con({ plantilla: 'salon', reservas: 'https://booksy.com/x' }))).toContain('<p>¿Te reservamos cita?</p>');
    expect(renderWeb(con({ plantilla: 'salon' }))).toContain('<p>Llámanos y te atendemos</p>');
    expect(renderWeb(con({ plantilla: 'consulta' }))).not.toContain('w-franja');
  });
  it('sin orden propio manda el de la plantilla; con orden propio, el del cliente', () => {
    const datosRicos = { ...EJEMPLO_WEB, galeria: ['data:image/webp;base64,AAAA'] };
    const pos = (html: string, id: string) => html.indexOf(`id="${id}"`);
    const obra = renderWeb({ ...datosRicos, plantilla: 'obra' });
    expect(pos(obra, 'galeria')).toBeLessThan(pos(obra, 'servicios'));
    const propio = renderWeb({ ...datosRicos, plantilla: 'obra', orden: ['servicios', 'galeria', 'sobre', 'opiniones', 'preguntas', 'contacto'].reverse() as DatosWeb['orden'] });
    expect(pos(propio, 'contacto')).toBeLessThan(pos(propio, 'servicios'));
  });
});

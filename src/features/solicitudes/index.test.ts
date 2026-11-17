import { describe, expect, it } from 'vitest';
import {
  CAMPO_PEDIDO,
  PASOS_PEDIDO,
  pasoPedido,
  textoPedido,
  camposDeDescripcion,
  esEstado,
  nombreCampo,
  nuevoPublicId,
  resumenSolicitud,
  validarSolicitud,
} from './index';

const fd = (o: Record<string, string>) => {
  const f = new FormData();
  for (const [k, v] of Object.entries(o)) f.set(k, v);
  return f;
};
const base = { slug: 'web-peluqueria', nombre: 'Ana', email: 'Ana@Ejemplo.com', consentimiento: 'si' };

describe('camposDeDescripcion', () => {
  it('lee las viñetas de «Campos que rellenas» hasta el siguiente título', () => {
    const md = 'Intro\r\n\r\n### Campos que rellenas\r\n- **Nombre del negocio**\r\n* Horario\r\ntexto suelto\r\n### Otra cosa\r\n- No';
    expect(camposDeDescripcion(md)).toEqual(['Nombre del negocio', 'Horario']);
  });
  it('sin sección o vacío → []', () => {
    expect(camposDeDescripcion('## Nada')).toEqual([]);
    expect(camposDeDescripcion(null)).toEqual([]);
  });
});

describe('validarSolicitud', () => {
  it('acepta un envío correcto y normaliza email y campos', () => {
    const r = validarSolicitud(fd({ ...base, campo_0: ' Peluquería Ana ', campo_1: '' }), ['Negocio', 'Horario']);
    expect(r.ok && !r.spam).toBe(true);
    if (r.ok && !r.spam) {
      expect(r.data.email).toBe('ana@ejemplo.com');
      expect(r.data.campos).toEqual({ Negocio: 'Peluquería Ana' });
      expect(r.data.telefono).toBeNull();
    }
  });
  it('compra directa: el formulario nunca marca un pedido como pagado (lo comprueba la API en D1)', () => {
    const ok = validarSolicitud(fd({ ...base, pedido: 'AB12cd34' }), ['Negocio']);
    expect(ok.ok && !ok.spam && ok.data.campos[CAMPO_PEDIDO]).toBeUndefined();
    const raro = validarSolicitud(fd({ ...base, pedido: '<script>' }), ['Negocio']);
    expect(raro.ok && !raro.spam && raro.data.campos[CAMPO_PEDIDO]).toBeUndefined();
  });
  it('honeypot lleno = spam, sin errores', () => {
    expect(validarSolicitud(fd({ web: 'http://x' }), [])).toEqual({ ok: true, spam: true });
  });
  it('marca nombre, email, teléfono, consentimiento y slug', () => {
    const r = validarSolicitud(fd({ slug: '../x', nombre: 'A', email: 'malo', telefono: 'abc' }), ['X']);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(Object.keys(r.errores).sort()).toEqual(['consentimiento', 'email', 'nombre', 'slug', 'telefono']);
  });
  it('consulta sin campos exige mensaje', () => {
    const r = validarSolicitud(fd({ ...base, slug: 'consulta' }), []);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errores.mensaje).toBeTruthy();
    expect(validarSolicitud(fd({ ...base, slug: 'consulta', mensaje: 'Quiero reservas' }), []).ok).toBe(true);
  });
  it('acepta teléfonos españoles habituales', () => {
    expect(validarSolicitud(fd({ ...base, telefono: '+34 600 12 34 56' }), ['X']).ok).toBe(true);
  });
});

describe('ids y estados', () => {
  it('public id con el formato que valida la página de gracias', () => {
    for (let i = 0; i < 50; i++) expect(nuevoPublicId()).toMatch(/^S-[A-Z0-9]{6,12}$/);
  });
  it('esEstado', () => {
    expect(esEstado('pagada')).toBe(true);
    expect(esEstado('borrada')).toBe(false);
    expect(nombreCampo(3)).toBe('campo_3');
  });
  it('resumen escapa HTML', () => {
    const { html, text } = resumenSolicitud(
      { slug: 's', producto: null, modalidad: null, nombre: '<b>x</b>', email: 'a@b.es', telefono: null, campos: {}, mensaje: 'a\nb', utm_source: null, utm_medium: null, utm_campaign: null, referrer: null },
      'S-ABCDEFGH',
    );
    expect(html).toContain('&lt;b&gt;x&lt;/b&gt;');
    expect(html).toContain('a<br>b');
    expect(text).toContain('Solicitud: S-ABCDEFGH');
  });
});

describe('pasoPedido', () => {
  it('sin datos enviados = pendiente de datos; luego avanza sin paso de pago', () => {
    expect(pasoPedido(null)).toBe(0);
    expect(pasoPedido('nueva')).toBe(1);
    expect(pasoPedido('en_preparacion')).toBe(1);
    expect(pasoPedido('vista_previa_enviada')).toBe(2);
    expect(pasoPedido('aprobada')).toBe(3);
    expect(pasoPedido('entregada')).toBe(4);
    expect(pasoPedido('descartada')).toBe(-1);
    expect(PASOS_PEDIDO).toHaveLength(5);
    expect(PASOS_PEDIDO.some((p) => /pago/i.test(p.titulo))).toBe(false);
  });
});

describe('estados nuevos del pedido', () => {
  it('cambios y espera caen en su paso y su texto', () => {
    expect(pasoPedido('cambios_pedidos')).toBe(3);
    expect(pasoPedido('en_espera_cliente')).toBe(2);
    expect(textoPedido('cambios_pedidos')).not.toMatch(/aprobado/i);
    expect(textoPedido('en_espera_cliente')).toContain('esperando');
    expect(textoPedido('descartada')).toContain('cerrado');
  });
});

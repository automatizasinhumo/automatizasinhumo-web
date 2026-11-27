import { describe, expect, it, vi } from 'vitest';
import { HtmlValidate, type ConfigData } from 'html-validate';
import { d1 } from './d1Prueba';
import { publicarPagina } from './paginas';
import {
  anularCita,
  citasDeCliente,
  cubos,
  diasVista,
  enviarConAdjunto,
  festivoNacional,
  guardarCita,
  huecosDelDia,
  ics,
  instante,
  leerCita,
  leerSelloCita,
  local,
  negocioDe,
  ocupadas,
  paginaAnular,
  paginaCitaHecha,
  paginaReservas,
  paso,
  selloCita,
  tramosHorario,
  validarCita,
  correoCitaCliente,
  type Cita,
} from './citasWeb';
import { CAMPO_TRAMPA, citasActivas, documentoWeb, EJEMPLO_WEB, validarWeb } from './webs';

const SECRETO = 'secreto-de-prueba-con-entropia-suficiente';
const MIN = 60_000;
// Jueves 26 de noviembre de 2026, 9:00 en Madrid (8:00 UTC).
const AHORA = Date.parse('2026-11-26T08:00:00Z');
const PEDIDOS = `CREATE TABLE orders (id INTEGER PRIMARY KEY, public_id TEXT UNIQUE, email TEXT);`;
const MIGRACIONES = ['0048_paginas_publicadas.sql', '0051_paginas_versiones.sql', '0055_citas_web.sql'];
const TRAMOS = tramosHorario('Lunes a viernes: 9:30 – 14:00 y 17:00 – 20:00\nSábados: 10 a 14 h');
const N = negocioDe('ana', { negocio: 'Peluquería Ana', direccion: 'Calle Mayor 1, Lugo', telefono: '600 123 456', color: '#0f766e' });

const form = (campos: Record<string, string>) => {
  const f = new FormData();
  for (const [k, v] of Object.entries(campos)) f.set(k, v);
  return f;
};
const cita = (x: Partial<Cita> = {}): Cita => ({
  id: '11111111-2222-3333-4444-555555555555',
  slug: 'ana',
  inicio: instante('2026-11-27', 600),
  fin: instante('2026-11-27', 630),
  nombre: 'Luis',
  email: 'luis@x.es',
  telefono: '',
  nota: '',
  estado: 'confirmada',
  ...x,
});

describe('horas libres', () => {
  it('saca los tramos del horario escrito en la web', () => {
    expect(TRAMOS.filter((t) => t.dia === 1)).toEqual([
      { dia: 1, abre: 570, cierra: 840 },
      { dia: 1, abre: 1020, cierra: 1200 },
    ]);
    expect(TRAMOS.filter((t) => t.dia === 6)).toEqual([{ dia: 6, abre: 600, cierra: 840 }]);
    expect(TRAMOS.some((t) => t.dia === 7)).toBe(false);
    expect(tramosHorario('Llamar antes')).toEqual([]);
  });

  it('solo hay citas con duración y horario que se entienda', () => {
    expect(citasActivas({ citas: '30', horario: 'Lunes a viernes 9-14' })).toBe(true);
    expect(citasActivas({ citas: '', horario: 'Lunes a viernes 9-14' })).toBe(false);
    expect(citasActivas({ citas: '30', horario: 'Llamar antes' })).toBe(false);
  });

  it('cada cuánto empieza una cita según dure', () => {
    expect([15, 20, 30, 45, 60, 90].map(paso)).toEqual([15, 20, 30, 15, 30, 30]);
  });

  it('ofrece horas dentro del horario, con una hora de antelación y sin pisar otras citas', () => {
    // Hoy jueves a las 9:00: la primera hora con antelación suficiente es las 10:00.
    const hoy = huecosDelDia('2026-11-26', TRAMOS, 30, [], AHORA).map((h) => h.min);
    expect(hoy[0]).toBe(600);
    expect(hoy).toContain(810); // 13:30, que acaba justo al cerrar
    expect(hoy).not.toContain(840);
    expect(hoy).toContain(1020);
    const otra = { inicio: instante('2026-11-27', 600) + 10 * MIN, fin: instante('2026-11-27', 640) };
    const viernes = huecosDelDia('2026-11-27', TRAMOS, 30, [otra], AHORA).map((h) => h.min);
    expect(viernes).toEqual(expect.arrayContaining([570, 660]));
    expect(viernes).not.toContain(600);
    expect(viernes).not.toContain(630);
    expect(huecosDelDia('2026-11-29', TRAMOS, 30, [], AHORA)).toEqual([]); // domingo
  });

  it('respeta el cambio de hora: la hora que no existe no se ofrece y las horas son de Madrid', () => {
    const t = tramosHorario('Domingos de 1:00 a 4:00');
    const ahora = Date.parse('2027-03-20T00:00:00Z');
    const domingo = huecosDelDia('2027-03-28', t, 30, [], ahora);
    expect(domingo.map((h) => h.min)).not.toContain(120);
    expect(domingo.map((h) => h.min)).not.toContain(150);
    for (const h of domingo) expect(local(h.inicio)).toEqual({ fecha: '2027-03-28', min: h.min });
    // En invierno las 10:00 de Madrid son las 9:00 UTC; en verano, las 8:00.
    expect(new Date(instante('2026-11-27', 600)).toISOString()).toBe('2026-11-27T09:00:00.000Z');
    expect(new Date(instante('2027-06-04', 600)).toISOString()).toBe('2027-06-04T08:00:00.000Z');
  });

  it('enseña tres semanas a partir de hoy en Madrid', () => {
    const d = diasVista(Date.parse('2026-12-31T23:30:00Z'));
    expect(d).toHaveLength(21);
    expect(d[0]).toBe('2027-01-01');
  });

  it('una cita bloquea sus tramos de 5 minutos', () => {
    const i = instante('2026-11-27', 600);
    expect(cubos({ inicio: i, fin: i + 30 * MIN })).toHaveLength(6);
    expect(cubos({ inicio: i, fin: i + 30 * MIN })[0]).toBe(i);
  });
});

describe('formulario de cita', () => {
  it('acepta la hora, limpia los datos y rechaza lo que no vale', () => {
    const ok = validarCita(form({ hora: '2026-11-27T10:30', nombre: '  Luis   Gil ', email: 'luis@x.es', telefono: '600 123 456', nota: 'Corte\r\n\r\n\r\ny barba' }));
    expect(ok).toEqual({ ok: true, fecha: '2026-11-27', min: 630, datos: { nombre: 'Luis Gil', email: 'luis@x.es', telefono: '600 123 456', nota: 'Corte\n\ny barba' } });
    const base = { hora: '2026-11-27T10:30', nombre: 'Luis', email: 'luis@x.es' };
    expect(validarCita(form({ ...base, [CAMPO_TRAMPA]: 'http://spam' }))).toEqual({ ok: false, error: 'trampa' });
    expect(validarCita(form({ ...base, hora: '2026-02-30T10:00' }))).toEqual({ ok: false, error: 'hora' });
    expect(validarCita(form({ ...base, hora: '2026-11-27T25:00' }))).toEqual({ ok: false, error: 'hora' });
    expect(validarCita(form({ ...base, nombre: 'L' }))).toEqual({ ok: false, error: 'nombre' });
    expect(validarCita(form({ ...base, email: 'luis' }))).toEqual({ ok: false, error: 'email' });
    expect(validarCita(form({ ...base, telefono: 'llámame' }))).toEqual({ ok: false, error: 'telefono' });
  });
});

describe('reservar y anular en D1', () => {
  it('no deja reservar dos veces la misma hora, ni una que se solape', async () => {
    const db = d1(MIGRACIONES, PEDIDOS);
    const datos = { nombre: 'Luis', email: 'luis@x.es', telefono: '', nota: '' };
    const i = instante('2026-11-27', 600);
    const a = await guardarCita(db, 'ana', datos, { inicio: i, fin: i + 30 * MIN });
    expect('id' in a).toBe(true);
    expect(await guardarCita(db, 'ana', datos, { inicio: i, fin: i + 30 * MIN })).toEqual({ ocupada: true });
    expect(await guardarCita(db, 'ana', datos, { inicio: i + 15 * MIN, fin: i + 45 * MIN })).toEqual({ ocupada: true });
    // Otra web, misma hora: sin problema; justo detrás: sin problema.
    expect('id' in (await guardarCita(db, 'otra', datos, { inicio: i, fin: i + 30 * MIN }))).toBe(true);
    expect('id' in (await guardarCita(db, 'ana', datos, { inicio: i + 30 * MIN, fin: i + 60 * MIN }))).toBe(true);
    expect(await ocupadas(db, 'ana', AHORA, AHORA + 7 * 86_400_000)).toHaveLength(2);

    const id = 'id' in a ? a.id : '';
    expect(await anularCita(db, id)).toBe(true);
    expect(await anularCita(db, id)).toBe(false);
    expect((await leerCita(db, id))?.estado).toBe('anulada');
    // Anulada, la hora vuelve a estar libre.
    expect('id' in (await guardarCita(db, 'ana', datos, { inicio: i, fin: i + 30 * MIN }))).toBe(true);
  });

  it('el área del dueño ve solo las próximas citas de sus webs', async () => {
    const db = d1(MIGRACIONES, PEDIDOS);
    db.sql.exec(`INSERT INTO orders (id, public_id, email) VALUES (1, 'ord_a', 'ana@x.es'), (2, 'ord_b', 'otro@x.es')`);
    const web = await publicarPagina(db, 'web', 'ord_a', 'Peluquería Ana', { negocio: 'Peluquería Ana' });
    const otra = await publicarPagina(db, 'web', 'ord_b', 'Bar Otro', { negocio: 'Bar Otro' });
    const datos = { nombre: 'Luis', email: 'luis@x.es', telefono: '', nota: '' };
    const i = instante('2026-11-27', 600);
    await guardarCita(db, web, datos, { inicio: i, fin: i + 30 * MIN });
    await guardarCita(db, web, datos, { inicio: AHORA - 120 * MIN, fin: AHORA - 90 * MIN });
    await guardarCita(db, otra, datos, { inicio: i, fin: i + 30 * MIN });
    const cs = await citasDeCliente(db, 'ana@x.es', AHORA);
    expect(cs).toHaveLength(1);
    expect(cs[0]).toMatchObject({ slug: web, negocio: 'Peluquería Ana', nombre: 'Luis', inicio: i });
  });
});

describe('enlace firmado', () => {
  it('vale para su web hasta un día después de la cita', async () => {
    const c = cita();
    const t = await selloCita(c, SECRETO, AHORA);
    expect(await leerSelloCita(t, 'ana', SECRETO, AHORA)).toBe(c.id);
    expect(await leerSelloCita(t, 'otra', SECRETO, AHORA)).toBeNull();
    expect(await leerSelloCita(t, 'ana', 'otro-secreto', AHORA)).toBeNull();
    expect(await leerSelloCita(t, 'ana', SECRETO, c.fin + 2 * 86_400_000)).toBeNull();
    expect(await leerSelloCita('', 'ana', SECRETO, AHORA)).toBeNull();
  });
});

describe('calendario .ics', () => {
  it('líneas CRLF de 75 octetos como mucho, texto escapado y horas en UTC', () => {
    const texto = ics(
      { id: 'x1', inicio: instante('2026-11-27', 600), fin: instante('2026-11-27', 630), titulo: 'Cita en Peluquería Ana, Lugo; ñ', lugar: 'Calle Mayor 1, Lugo', descripcion: `Línea 1\nAnular: https://t.es/${'á'.repeat(80)}`, url: 'https://t.es/a' },
      AHORA,
    );
    expect(texto.startsWith('BEGIN:VCALENDAR\r\n')).toBe(true);
    expect(texto.endsWith('END:VCALENDAR\r\n')).toBe(true);
    expect(texto.replace(/\r\n/g, '')).not.toMatch(/\n/);
    for (const l of texto.split('\r\n')) expect(new TextEncoder().encode(l).length).toBeLessThanOrEqual(75);
    const desplegado = texto.replace(/\r\n /g, '');
    expect(desplegado).toContain('DTSTART:20261127T090000Z');
    expect(desplegado).toContain('SUMMARY:Cita en Peluquería Ana\\, Lugo\\; ñ');
    expect(desplegado).toContain('DESCRIPTION:Línea 1\\nAnular:');
    expect(ics({ id: 'x1', inicio: 0, fin: 1, titulo: 't', url: 'https://t.es', anulada: true }, AHORA)).toContain('METHOD:CANCEL');
  });

  it('si el proveedor rechaza el adjunto, el correo sale sin él', async () => {
    const send = vi.fn().mockRejectedValueOnce(new Error('attachment')).mockResolvedValueOnce(undefined);
    const msg = correoCitaCliente(cita(), N, 'https://t.es/anular', 'Automatiza sin humo');
    expect(msg.attachments?.[0]?.filename).toBe('cita.ics');
    await enviarConAdjunto({ send }, msg);
    expect(send).toHaveBeenCalledTimes(2);
    expect(send.mock.calls[1]![0].attachments).toBeUndefined();
  });
});

const CONFIG: ConfigData = {
  extends: ['html-validate:recommended', 'html-validate:a11y'],
  rules: {
    'attr-quotes': 'off',
    'no-trailing-whitespace': 'off',
    'void-style': 'off',
    'attribute-boolean-style': 'off',
    'attribute-empty-style': 'off',
    'no-inline-style': 'off',
    'long-title': 'off',
    'doctype-style': 'off',
  },
};
const validador = new HtmlValidate(CONFIG);
async function errores(html: string): Promise<string[]> {
  const r = await validador.validateString(html);
  return r.results.flatMap((x) => x.messages.map((m) => `${m.ruleId}: ${m.message} (${m.selector ?? `${m.line}:${m.column}`})`));
}

describe('páginas de citas', () => {
  const dias = diasVista(AHORA).map((fecha) => ({ fecha, libres: huecosDelDia(fecha, TRAMOS, 30, [], AHORA).length }));
  const vista = {
    negocio: N,
    dur: 30,
    dias,
    dia: '2026-11-27',
    huecos: huecosDelDia('2026-11-27', TRAMOS, 30, [], AHORA),
    vuelta: 'https://t.es/w/ana',
    accion: '/w/ana/reservas',
    sello: 'sello.de.prueba',
  };

  it('válidas y accesibles', async () => {
    expect(await errores(paginaReservas(vista)), 'reservas').toEqual([]);
    expect(await errores(paginaReservas({ ...vista, huecos: [], aviso: 'Esa hora se acaba de ocupar.' })), 'día sin horas').toEqual([]);
    expect(await errores(paginaReservas({ ...vista, dias: dias.map((d) => ({ ...d, libres: 0 })), huecos: [] })), 'sin horas').toEqual([]);
    expect(await errores(paginaCitaHecha(cita(), N, 'https://t.es/a', 'https://t.es/i.ics', vista.vuelta)), 'hecha').toEqual([]);
    expect(await errores(paginaAnular(cita(), N, '/w/ana/reservas/anular?t=x', vista.vuelta)), 'anular').toEqual([]);
    expect(await errores(paginaAnular(cita({ estado: 'anulada' }), N, '', vista.vuelta, true)), 'anulada').toEqual([]);
  });

  it('el formulario lleva la trampa, el sello y una hora por radio; los domingos no se ofrecen', () => {
    const h = paginaReservas(vista);
    expect(h).toContain(`name="${CAMPO_TRAMPA}"`);
    expect(h).toContain('value="sello.de.prueba"');
    expect(h).toContain('value="2026-11-27T09:30"');
    expect(h).toContain('aria-current="date"');
    expect(h).not.toContain('href="?dia=2026-11-29"');
    expect(h).not.toMatch(/<script/i);
  });

  it('la web con citas lleva el botón a reservas; sin citas, no', () => {
    const r = validarWeb({ ...EJEMPLO_WEB, citas: '30', reservas: '' });
    if (!r.ok) throw new Error(r.error);
    expect(documentoWeb(r.datos, 'https://t.es/w/ana', '', undefined, undefined, undefined, '/w/ana/reservas')).toContain('href="/w/ana/reservas"');
    expect(documentoWeb({ ...r.datos, citas: '' }, 'https://t.es/w/ana', '', undefined, undefined, undefined, '/w/ana/reservas')).not.toContain('/w/ana/reservas');
  });
});

describe('revisión de citas', () => {
  it('festivos nacionales sin huecos (8 de diciembre y Viernes Santo)', () => {
    expect(festivoNacional('2026-12-08')).toBe(true);
    expect(festivoNacional('2027-03-26')).toBe(true);
    expect(festivoNacional('2026-04-03')).toBe(true);
    expect(festivoNacional('2026-12-09')).toBe(false);
    expect(huecosDelDia('2026-12-08', TRAMOS, 30, [], AHORA)).toEqual([]);
    expect(huecosDelDia('2026-12-09', TRAMOS, 30, [], AHORA).length).toBeGreaterThan(0);
  });

  it('los comienzos caen en cubos: tras reservar 9:35 la siguiente cabe', async () => {
    const tramos = tramosHorario('Viernes: 9:32-12:00');
    const h = huecosDelDia('2026-12-04', tramos, 30, [], AHORA);
    expect(h.every((x) => x.min % 5 === 0)).toBe(true);
    const db = d1(MIGRACIONES, PEDIDOS);
    const datos = { nombre: 'A', email: 'a@b.es', telefono: '', nota: '' };
    expect('id' in (await guardarCita(db, 'ana', datos, h[0]!))).toBe(true);
    const libres = huecosDelDia('2026-12-04', tramos, 30, await ocupadas(db, 'ana', AHORA, AHORA + 30 * 86_400_000), AHORA);
    expect('id' in (await guardarCita(db, 'ana', datos, libres[0]!))).toBe(true);
  });

  it('«Domingos y festivos: cerrado» quita los domingos', () => {
    const t = tramosHorario('Lunes a domingo: 9-14\nDomingos y festivos: cerrado');
    expect(t.map((x) => x.dia)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('el texto sobre el color de acento contrasta (fondo claro → texto oscuro)', () => {
    const n = negocioDe('ana', { negocio: 'Ana', direccion: '', telefono: '', color: '#ffffff' });
    const html = paginaReservas({ negocio: n, dur: 30, dias: [{ fecha: '2026-12-04', libres: 0 }], dia: '2026-12-04', huecos: [], vuelta: '/w/ana', accion: '/w/ana/reservas', sello: 'x', aviso: '' });
    expect(html).toContain("--o:#000000;");
  });
});

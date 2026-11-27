/**
 * Citas en la propia web publicada (/w/<slug>/reservas), sin JavaScript en la página y sin
 * servicios de fuera (lo que cobran aparte Booksy, Calendly o SimplyBook).
 *
 * - Horas libres: salen del horario que el negocio ya escribe en su web (horarioSchema) y de la
 *   duración que elige en el estudio (DatosWeb.citas).
 * - Sin dobles reservas: cada cita ocupa sus tramos de 5 minutos en citas_huecos (clave primaria
 *   slug + cubo) y todo se inserta en un único batch de D1, que es una transacción: si otra
 *   persona se adelantó, choca la clave y no se guarda nada.
 * - Anulación con un enlace firmado (HMAC con AUTH_SECRET) que llega en los correos.
 * - Archivo .ics (RFC 5545) para añadirla al calendario.
 *
 * El diseño (cubos de reserva, enlace firmado, .ics en UTC) sigue la ronda 35 de GPT
 * (dapta-calendars-slate y cal.com como referencia); la zona horaria la resuelve @date-fns/tz.
 */
import type { D1Database } from '@cloudflare/workers-types';
import { TZDate } from '@date-fns/tz';
import { signToken, verifyToken } from '../auth/token';
import { emailShell, escapeHtml } from '../email/layout';
import type { EmailMessage, EmailProvider } from '../email';
import { horarioSchema } from './negocioSchema';
import { CAMPO_TRAMPA, type DatosWeb } from './webs';
export { DURACIONES_CITA, citasActivas, type IdCitasWeb } from './webs';

export const ZONA = 'Europe/Madrid';
/** Tamaño del cubo de bloqueo: las duraciones y los pasos son múltiplos. */
export const CUBO_MIN = 5;
/** No se puede pedir cita para dentro de menos de esto. */
export const ANTELACION_MIN = 60;
/** Días que se ofrecen, empezando por hoy. */
export const DIAS_VISTA = 21;
export const MAX = { nombre: 100, email: 254, telefono: 20, nota: 500 } as const;

const MIN = 60_000;
const DIA_ISO: Record<string, number> = { Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6, Sunday: 7 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TELEFONO = /^\+?[\d\s().-]{6,20}$/;
const FECHA = /^(\d{4})-(\d{2})-(\d{2})$/;
const dos = (n: number) => String(n).padStart(2, '0');

export interface Tramo {
  /** 1 = lunes … 7 = domingo. */
  dia: number;
  /** Minutos desde las 00:00. */
  abre: number;
  cierra: number;
}

const minutos = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h! * 60 + m!;
};

/** Tramos del horario escrito en la web; [] si no se entiende (entonces no hay citas). */
export function tramosHorario(horario: string): Tramo[] {
  const spec = (horarioSchema(horario) ?? []) as { dayOfWeek: string[]; opens: string; closes: string }[];
  return spec.flatMap((s) => {
    const abre = minutos(s.opens);
    const cierra = minutos(s.closes);
    if (cierra <= abre) return [];
    return s.dayOfWeek.flatMap((d) => (DIA_ISO[d] ? [{ dia: DIA_ISO[d]!, abre, cierra }] : []));
  });
}

/** Fecha local «AAAA-MM-DD» + minuto del día en Madrid → instante (ms UTC). */
export function instante(fecha: string, min: number): number {
  const [y, m, d] = fecha.split('-').map(Number);
  return new TZDate(y!, m! - 1, d!, Math.floor(min / 60), min % 60, ZONA).getTime();
}

/** Instante → fecha y minuto del día en Madrid. */
export function local(ms: number): { fecha: string; min: number } {
  const t = new TZDate(ms, ZONA);
  return { fecha: `${t.getFullYear()}-${dos(t.getMonth() + 1)}-${dos(t.getDate())}`, min: t.getHours() * 60 + t.getMinutes() };
}

export const horaTexto = (min: number) => `${Math.floor(min / 60)}:${dos(min % 60)}`;
const diaSemana = (fecha: string) => {
  const [y, m, d] = fecha.split('-').map(Number);
  return ((new Date(Date.UTC(y!, m! - 1, d!)).getUTCDay() + 6) % 7) + 1;
};
/** Fecha válida y real («2026-02-30» no lo es). */
export function fechaValida(fecha: string): boolean {
  const m = FECHA.exec(fecha);
  if (!m) return false;
  const t = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  return t.getUTCFullYear() === Number(m[1]) && t.getUTCMonth() === Number(m[2]) - 1 && t.getUTCDate() === Number(m[3]);
}

/** Cada cuánto empieza una cita: 15 → cada 15 min, 30 o 60 → cada 30, 45 → cada 15. */
export const paso = (dur: number) => (dur % 30 === 0 ? 30 : dur < 30 ? dur : 15);

/** Los `n` días que se ofrecen a partir de hoy (Madrid). */
export function diasVista(ahora: number, n = DIAS_VISTA): string[] {
  const hoy = local(ahora).fecha;
  const [y, m, d] = hoy.split('-').map(Number);
  return Array.from({ length: n }, (_, i) => new Date(Date.UTC(y!, m! - 1, d! + i)).toISOString().slice(0, 10));
}

export interface Intervalo {
  inicio: number;
  fin: number;
}
export interface Hueco extends Intervalo {
  /** Minuto del día (Madrid). */
  min: number;
}

/** Horas libres de `fecha`: dentro del horario, con antelación y sin pisar otra cita. */
export function huecosDelDia(fecha: string, tramos: Tramo[], dur: number, ocupadas: Intervalo[], ahora: number): Hueco[] {
  const dia = diaSemana(fecha);
  const p = paso(dur);
  const vistos = new Set<number>();
  const salida: Hueco[] = [];
  for (const t of tramos.filter((x) => x.dia === dia).sort((a, b) => a.abre - b.abre)) {
    for (let min = t.abre; min + dur <= t.cierra; min += p) {
      const inicio = instante(fecha, min);
      // Cambio de hora: la hora que no existe ese día (2:30 de marzo) no se ofrece.
      const l = local(inicio);
      if (l.fecha !== fecha || l.min !== min) continue;
      const fin = inicio + dur * MIN;
      if (inicio < ahora + ANTELACION_MIN * MIN || vistos.has(inicio)) continue;
      if (ocupadas.some((o) => inicio < o.fin && o.inicio < fin)) continue;
      vistos.add(inicio);
      salida.push({ inicio, fin, min });
    }
  }
  return salida.sort((a, b) => a.inicio - b.inicio);
}

/** Cubos de 5 minutos que ocupa una cita (los que bloquea en citas_huecos). */
export function cubos({ inicio, fin }: Intervalo): number[] {
  const paso = CUBO_MIN * MIN;
  const salida: number[] = [];
  for (let c = Math.floor(inicio / paso) * paso; c < fin; c += paso) salida.push(c);
  return salida;
}

/** Citas confirmadas de la web que se solapan con [desde, hasta). */
export async function ocupadas(db: D1Database, slug: string, desde: number, hasta: number): Promise<Intervalo[]> {
  const { results } = await db
    .prepare("SELECT inicio, fin FROM citas WHERE slug = ? AND estado = 'confirmada' AND fin > ? AND inicio < ?")
    .bind(slug, desde, hasta)
    .all<Intervalo>();
  return results ?? [];
}

export interface DatosCita {
  nombre: string;
  email: string;
  telefono: string;
  nota: string;
}

const limpio = (v: FormDataEntryValue | null, max: number, lineas = false) => {
  const t = typeof v === 'string' ? v : '';
  const n = lineas ? t.replace(/\r\n?/g, '\n').replace(/\n{3,}/g, '\n\n') : t.replace(/\s+/g, ' ');
  return n.trim().slice(0, max);
};

export type ErrorCita = 'trampa' | 'hora' | 'nombre' | 'email' | 'telefono';
export type CitaValidada = { ok: true; datos: DatosCita; fecha: string; min: number } | { ok: false; error: ErrorCita };

/** Datos del formulario de cita, o el motivo del rechazo. `hora` llega como «AAAA-MM-DDTHH:MM». */
export function validarCita(f: FormData): CitaValidada {
  if (limpio(f.get(CAMPO_TRAMPA), 200)) return { ok: false, error: 'trampa' };
  const h = /^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2})$/.exec(limpio(f.get('hora'), 16));
  const min = h ? Number(h[2]) * 60 + Number(h[3]) : -1;
  if (!h || !fechaValida(h[1]!) || min < 0 || min >= 1440) return { ok: false, error: 'hora' };
  const nombre = limpio(f.get('nombre'), MAX.nombre);
  if (nombre.length < 2) return { ok: false, error: 'nombre' };
  const email = limpio(f.get('email'), MAX.email);
  if (!EMAIL.test(email)) return { ok: false, error: 'email' };
  const telefono = limpio(f.get('telefono'), MAX.telefono);
  if (telefono && (!TELEFONO.test(telefono) || (telefono.match(/\d/g)?.length ?? 0) < 6)) return { ok: false, error: 'telefono' };
  return { ok: true, fecha: h[1]!, min, datos: { nombre, email, telefono, nota: limpio(f.get('nota'), MAX.nota, true) } };
}

/**
 * Guarda la cita y bloquea sus cubos en un único batch (transacción de D1). Si algún cubo ya
 * estaba cogido, la clave primaria rechaza el batch entero: `{ ocupada: true }`.
 */
export async function guardarCita(db: D1Database, slug: string, c: DatosCita, hueco: Intervalo): Promise<{ id: string } | { ocupada: true }> {
  const id = crypto.randomUUID();
  const sentencias = [
    db
      .prepare('INSERT INTO citas (id, slug, inicio, fin, nombre, email, telefono, nota) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
      .bind(id, slug, hueco.inicio, hueco.fin, c.nombre, c.email, c.telefono, c.nota),
    ...cubos(hueco).map((cubo) => db.prepare('INSERT INTO citas_huecos (slug, cubo, cita_id) VALUES (?, ?, ?)').bind(slug, cubo, id)),
  ];
  try {
    await db.batch(sentencias);
  } catch (e) {
    if (/UNIQUE|PRIMARY KEY|constraint/i.test(e instanceof Error ? e.message : String(e))) return { ocupada: true };
    throw e;
  }
  return { id };
}

export interface Cita extends DatosCita, Intervalo {
  id: string;
  slug: string;
  estado: 'confirmada' | 'anulada';
}

export async function leerCita(db: D1Database, id: string): Promise<Cita | null> {
  return db
    .prepare('SELECT id, slug, inicio, fin, nombre, email, telefono, nota, estado FROM citas WHERE id = ?')
    .bind(id)
    .first<Cita>();
}

/** Anula la cita y libera sus cubos (un batch). false si ya estaba anulada. */
export async function anularCita(db: D1Database, id: string): Promise<boolean> {
  const [upd] = await db.batch([
    db.prepare("UPDATE citas SET estado = 'anulada', anulada = datetime('now') WHERE id = ? AND estado = 'confirmada'").bind(id),
    db.prepare('DELETE FROM citas_huecos WHERE cita_id = ?').bind(id),
  ]);
  return (upd?.meta?.changes ?? 0) > 0;
}

const PREFIJO = 'cita:';
/** Enlace para anular (y descargar el .ics): vale hasta un día después de la cita. */
export function selloCita(c: Pick<Cita, 'id' | 'slug' | 'fin'>, secret: string, ahora = Date.now()): Promise<string> {
  const s = Math.floor(ahora / 1000);
  const vida = Math.max(3600, Math.floor(c.fin / 1000) + 86400 - s);
  return signToken(`${PREFIJO}${c.slug}:${c.id}`, secret, vida, s);
}

export async function leerSelloCita(token: string, slug: string, secret: string, ahora = Date.now()): Promise<string | null> {
  if (!token || token.length > 600) return null;
  const p = await verifyToken(token, secret, Math.floor(ahora / 1000));
  const m = p?.startsWith(PREFIJO) ? /^([^:]+):([0-9a-f-]{36})$/.exec(p.slice(PREFIJO.length)) : null;
  return m && m[1] === slug ? m[2]! : null;
}

// ——— Calendario (.ics, RFC 5545) ———

const utc = (ms: number) => new Date(ms).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const escIcs = (t: string) => t.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
/** Pliega a 75 octetos sin partir un carácter UTF-8 (RFC 5545 §3.1). */
function plegar(linea: string): string {
  const enc = new TextEncoder();
  const trozos: string[] = [];
  let actual = '';
  let octetos = 0;
  for (const ch of linea) {
    const n = enc.encode(ch).length;
    if (octetos + n > (trozos.length ? 74 : 75)) {
      trozos.push(actual);
      actual = '';
      octetos = 0;
    }
    actual += ch;
    octetos += n;
  }
  trozos.push(actual);
  return trozos.join('\r\n ');
}

export interface EventoIcs extends Intervalo {
  id: string;
  titulo: string;
  lugar?: string;
  descripcion?: string;
  url?: string;
  anulada?: boolean;
}

export function ics(e: EventoIcs, ahora = Date.now()): string {
  const lineas = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Automatiza sin humo//Citas//ES',
    'CALSCALE:GREGORIAN',
    `METHOD:${e.anulada ? 'CANCEL' : 'PUBLISH'}`,
    'BEGIN:VEVENT',
    `UID:${e.id}@automatizasinhumo`,
    `DTSTAMP:${utc(ahora)}`,
    `DTSTART:${utc(e.inicio)}`,
    `DTEND:${utc(e.fin)}`,
    `SUMMARY:${escIcs(e.titulo)}`,
    ...(e.lugar ? [`LOCATION:${escIcs(e.lugar)}`] : []),
    ...(e.descripcion ? [`DESCRIPTION:${escIcs(e.descripcion)}`] : []),
    ...(e.url ? [`URL:${e.url}`] : []),
    `STATUS:${e.anulada ? 'CANCELLED' : 'CONFIRMED'}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return `${lineas.map(plegar).join('\r\n')}\r\n`;
}

// ——— Textos y correos ———

const FMT_DIA = new Intl.DateTimeFormat('es-ES', { timeZone: ZONA, weekday: 'long', day: 'numeric', month: 'long' });
const FMT_CORTO = new Intl.DateTimeFormat('es-ES', { timeZone: ZONA, weekday: 'short', day: 'numeric', month: 'short' });
/** «martes, 2 de diciembre, a las 10:30». */
export const cuandoTexto = (ms: number) => `${FMT_DIA.format(ms)}, a las ${horaTexto(local(ms).min)}`;
const diaCorto = (fecha: string) => FMT_CORTO.format(instante(fecha, 720)).replace(/\./g, '');

export interface Negocio {
  slug: string;
  negocio: string;
  direccion: string;
  telefono: string;
  color: string;
}

/** Lo que las páginas y los correos de citas necesitan de la web. */
export const negocioDe = (slug: string, d: Pick<DatosWeb, 'negocio' | 'direccion' | 'telefono' | 'color'>): Negocio => ({
  slug,
  negocio: d.negocio,
  direccion: d.direccion,
  telefono: d.telefono,
  color: d.color,
});

/** Envía con el .ics; si el proveedor rechaza el adjunto, reintenta sin él para que el aviso llegue. */
export async function enviarConAdjunto(emailer: Pick<EmailProvider, 'send'>, msg: EmailMessage): Promise<void> {
  try {
    await emailer.send(msg);
  } catch (e) {
    if (!msg.attachments?.length) throw e;
    await emailer.send({ ...msg, attachments: undefined });
  }
}

export const icsCita = (c: Cita, n: Negocio, url: string, ahora = Date.now()) =>
  ics(
    {
      id: c.id,
      inicio: c.inicio,
      fin: c.fin,
      titulo: `Cita en ${n.negocio}`,
      lugar: n.direccion,
      descripcion: `Para anularla: ${url}`,
      url,
      anulada: c.estado === 'anulada',
    },
    ahora,
  );

const adjunto = (c: Cita, n: Negocio, url: string) => ({
  filename: 'cita.ics',
  content: icsCita(c, n, url),
  contentType: 'text/calendar; charset=utf-8; method=PUBLISH',
});

/** Confirmación para quien pide la cita, con el .ics y el enlace para anularla. */
export function correoCitaCliente(c: Cita, n: Negocio, anular: string, tienda: string): EmailMessage {
  const cuando = cuandoTexto(c.inicio);
  const donde = n.direccion ? `\nDónde: ${n.direccion}` : '';
  const text = `Tienes cita en ${n.negocio} el ${cuando}.${donde}\n\nSi no puedes ir, anúlala aquí: ${anular}`;
  const cuerpo = `<p style="margin:16px 0 12px">Tienes cita en <strong>${escapeHtml(n.negocio)}</strong> el <strong>${escapeHtml(cuando)}</strong>.</p>
${n.direccion ? `<p style="margin:0 0 12px"><strong>Dónde:</strong> ${escapeHtml(n.direccion)}</p>` : ''}
<p style="margin:0 0 12px">Va adjunta para que la añadas a tu calendario.</p>
<p style="margin:0"><a href="${escapeHtml(anular)}">Si no puedes ir, anula la cita</a></p>`;
  return {
    to: c.email,
    subject: `Cita confirmada en ${n.negocio}: ${cuando}`,
    html: emailShell({ storeName: tienda, heading: 'Cita confirmada', subheading: escapeHtml(n.negocio), body: cuerpo }),
    text,
    idempotencyKey: `cita-cliente/${c.id}`,
    attachments: [adjunto(c, n, anular)],
  };
}

/** Aviso al dueño de la web: quién, cuándo y cómo contactar. */
export function correoCitaDueno(para: string, c: Cita, n: Negocio, anular: string, panel: string, tienda: string): EmailMessage {
  const cuando = cuandoTexto(c.inicio);
  const contacto = [c.email, c.telefono].filter(Boolean).join(' · ');
  const text = `${c.nombre} ha pedido cita el ${cuando}.\n\nContacto: ${contacto}${c.nota ? `\n\n${c.nota}` : ''}\n\nTodas tus citas: ${panel}\nAnular esta cita: ${anular}`;
  const cuerpo = `<p style="margin:16px 0 12px"><strong>${escapeHtml(c.nombre)}</strong> ha pedido cita el <strong>${escapeHtml(cuando)}</strong>.</p>
<p style="margin:0 0 12px"><strong>Contacto:</strong> ${escapeHtml(contacto)}</p>
${c.nota ? `<blockquote style="margin:0 0 16px;padding:12px 16px;border-left:3px solid #ccc;white-space:pre-wrap">${escapeHtml(c.nota)}</blockquote>` : ''}
<p style="margin:0"><a href="${escapeHtml(panel)}">Ver todas tus citas</a> · <a href="${escapeHtml(anular)}">Anular esta</a></p>`;
  return {
    to: para,
    subject: `Nueva cita: ${c.nombre}, ${cuando}`,
    html: emailShell({ storeName: tienda, heading: 'Nueva cita desde tu web', subheading: escapeHtml(n.negocio), body: cuerpo }),
    text,
    idempotencyKey: `cita-dueno/${c.id}`,
    attachments: [adjunto(c, n, anular)],
  };
}

/** Aviso de anulación (a la otra parte). */
export function correoCitaAnulada(para: string, c: Cita, n: Negocio, tienda: string, paraDueno: boolean): EmailMessage {
  const cuando = cuandoTexto(c.inicio);
  const texto = paraDueno ? `${c.nombre} ha anulado su cita del ${cuando}. Esa hora vuelve a estar libre en tu web.` : `Tu cita en ${n.negocio} del ${cuando} queda anulada.`;
  return {
    to: para,
    subject: `Cita anulada: ${paraDueno ? c.nombre : n.negocio}, ${cuando}`,
    html: emailShell({ storeName: tienda, heading: 'Cita anulada', subheading: escapeHtml(n.negocio), body: `<p style="margin:16px 0 0">${escapeHtml(texto)}</p>` }),
    text: texto,
    idempotencyKey: `cita-anulada/${c.id}/${paraDueno ? 'dueno' : 'cliente'}`,
  };
}

// ——— Páginas (HTML propio, sin JavaScript) ———

const COLOR = /^#[0-9a-f]{6}$/i;
function pagina(n: Negocio, titulo: string, cuerpo: string): string {
  const color = COLOR.test(n.color) ? n.color : '#1b1b1b';
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>${escapeHtml(titulo)} · ${escapeHtml(n.negocio)}</title>
<style>
:root{--c:${color};--t:#1b1b1b;--s:#5c5c5c;--f:#f6f5f2;--l:#cfcac0}
*{box-sizing:border-box}body{margin:0;font:1rem/1.5 system-ui,sans-serif;background:var(--f);color:var(--t)}
main{max-width:44rem;margin:0 auto;padding:28px 18px 56px}
.vuelta{color:var(--s);font-size:.95rem}
h1{margin:10px 0 4px;font-size:clamp(1.6rem,5vw,2.3rem);line-height:1.1;letter-spacing:-.02em;text-wrap:balance}
.sub{margin:0 0 24px;color:var(--s)}
h2{margin:28px 0 10px;font-size:1.1rem}
.dias{display:flex;gap:8px;overflow-x:auto;padding:2px 2px 10px;margin:0;list-style:none;scroll-snap-type:x mandatory}
.dias a,.dias span{display:grid;min-width:4.6rem;padding:10px 8px;border:1px solid var(--l);border-radius:14px;background:#fff;text-align:center;text-decoration:none;color:var(--t);scroll-snap-align:start;font-size:.92rem;line-height:1.25}
.dias b{display:block;font-size:1.25rem}
.dias span{opacity:.45}
.dias a[aria-current]{background:var(--c);border-color:var(--c);color:#fff}
fieldset{border:0;margin:0;padding:0}
.horas{display:grid;grid-template-columns:repeat(auto-fill,minmax(5.2rem,1fr));gap:8px}
.horas label{position:relative}
.horas input{position:absolute;opacity:0;inset:0}
.horas span{display:block;padding:10px 0;border:1px solid var(--l);border-radius:999px;background:#fff;text-align:center;font-weight:600;cursor:pointer}
.horas input:checked+span{background:var(--c);border-color:var(--c);color:#fff}
.horas input:focus-visible+span{outline:3px solid var(--c);outline-offset:2px}
.campos{display:grid;gap:14px;margin-top:8px}
.campos label{display:grid;gap:4px;font-weight:600}
.campos input,.campos textarea{font:inherit;padding:11px 12px;border:1px solid #8a857c;border-radius:10px;background:#fff;font-weight:400}
.ayuda{font-weight:400;color:var(--s)}
.trampa{position:absolute;left:-9999px}
button,.boton{display:inline-block;margin-top:20px;padding:13px 24px;border:0;border-radius:999px;background:var(--c);color:#fff;font:inherit;font-weight:700;text-decoration:none;cursor:pointer}
.boton.sec{background:transparent;color:var(--t);border:1px solid var(--l)}
.aviso{padding:12px 14px;border-radius:12px;background:#fff3cd;color:#5a4300}
.vacio{padding:18px;border:1px dashed var(--l);border-radius:14px;color:var(--s);text-align:center}
</style>
</head><body><main>${cuerpo}</main></body></html>
`;
}

export interface VistaReservas {
  negocio: Negocio;
  dur: number;
  dias: { fecha: string; libres: number }[];
  dia: string;
  huecos: Hueco[];
  vuelta: string;
  accion: string;
  sello: string;
  aviso?: string;
}

/** Página para elegir día y hora y dejar los datos. Sin JavaScript: el día se elige con enlaces. */
export function paginaReservas(v: VistaReservas): string {
  const n = v.negocio;
  const dias = v.dias
    .map(({ fecha, libres }) => {
      const [sem, num, mes] = diaCorto(fecha).split(/[\s,]+/);
      const txt = `${escapeHtml(sem ?? '')}<b>${escapeHtml(num ?? '')}</b>${escapeHtml(mes ?? '')}`;
      return libres
        ? `<li><a href="?dia=${fecha}"${fecha === v.dia ? ' aria-current="date"' : ''}>${txt}</a></li>`
        : `<li><span title="Sin horas libres">${txt}</span></li>`;
    })
    .join('');
  const horas = v.huecos.length
    ? `<fieldset><legend><h2>Hora · ${escapeHtml(FMT_DIA.format(instante(v.dia, 720)))}</h2></legend><div class="horas">${v.huecos
        .map((h, i) => `<label><input type="radio" name="hora" value="${v.dia}T${dos(Math.floor(h.min / 60))}:${dos(h.min % 60)}"${i === 0 ? ' required' : ''}><span>${horaTexto(h.min)}</span></label>`)
        .join('')}</div></fieldset>
<h2>Tus datos</h2>
<div class="campos">
<label>Nombre<input type="text" name="nombre" required maxlength="${MAX.nombre}" autocomplete="name"></label>
<label>Email <span class="ayuda">(te llega la confirmación)</span><input type="email" name="email" required maxlength="${MAX.email}" autocomplete="email"></label>
<label>Teléfono <span class="ayuda">(opcional)</span><input type="tel" name="telefono" maxlength="${MAX.telefono}" autocomplete="tel"></label>
<label>Algo que debamos saber <span class="ayuda">(opcional)</span><textarea name="nota" rows="3" maxlength="${MAX.nota}"></textarea></label>
</div>
<div class="trampa" aria-hidden="true"><label>No rellenar <input type="text" name="${CAMPO_TRAMPA}" tabindex="-1" autocomplete="off"></label></div>
<input type="hidden" name="sello" value="${escapeHtml(v.sello)}">
<button type="submit">Reservar cita</button>`
    : `<p class="vacio">No quedan horas libres este día. Prueba con otro.</p>`;
  const cuerpo = `<a class="vuelta" href="${escapeHtml(v.vuelta)}">← ${escapeHtml(n.negocio)}</a>
<h1>Pide tu cita</h1>
<p class="sub">${v.dur} minutos${n.direccion ? ` · ${escapeHtml(n.direccion)}` : ''}</p>
${v.aviso ? `<p class="aviso" role="alert">${escapeHtml(v.aviso)}</p>` : ''}
${v.dias.some((d) => d.libres) ? `<h2>Día</h2><ul class="dias">${dias}</ul>
${v.huecos.length ? `<form method="post" action="${escapeHtml(v.accion)}">${horas}</form>` : horas}` : `<p class="vacio">Ahora mismo no quedan horas libres en las próximas semanas.${n.telefono ? ` Llama al ${escapeHtml(n.telefono)}.` : ''}</p>`}`;
  return pagina(n, 'Pide tu cita', cuerpo);
}

/** Tras reservar: confirmación con el calendario y la anulación a mano. */
export function paginaCitaHecha(c: Cita, n: Negocio, anular: string, icsUrl: string, vuelta: string): string {
  return pagina(
    n,
    'Cita reservada',
    `<a class="vuelta" href="${escapeHtml(vuelta)}">← ${escapeHtml(n.negocio)}</a>
<h1>Cita reservada</h1>
<p class="sub">${escapeHtml(cuandoTexto(c.inicio))}${n.direccion ? ` · ${escapeHtml(n.direccion)}` : ''}</p>
<p>Te hemos enviado la confirmación a <strong>${escapeHtml(c.email)}</strong>, con el enlace para anularla si no puedes venir.</p>
<a class="boton" href="${escapeHtml(icsUrl)}">Añadir a mi calendario</a>
<p><a href="${escapeHtml(anular)}">Anular la cita</a></p>`,
  );
}

/** Página del enlace de anulación: confirma con un botón (POST), nunca anula al abrir el enlace. */
export function paginaAnular(c: Cita, n: Negocio, accion: string, vuelta: string, hecho = false): string {
  const cuando = escapeHtml(cuandoTexto(c.inicio));
  const cuerpo =
    c.estado === 'anulada'
      ? `<h1>Cita anulada</h1><p class="sub">${cuando}</p><p>${hecho ? 'Listo: la hora vuelve a estar libre.' : 'Esta cita ya estaba anulada.'}</p><a class="boton sec" href="${escapeHtml(vuelta)}">Volver a la web</a>`
      : `<h1>¿Anular la cita?</h1><p class="sub">${escapeHtml(c.nombre)} · ${cuando}</p>
<form method="post" action="${escapeHtml(accion)}"><button type="submit">Sí, anular la cita</button></form>
<a class="boton sec" href="${escapeHtml(vuelta)}">No, mantenerla</a>`;
  return pagina(n, c.estado === 'anulada' ? 'Cita anulada' : 'Anular la cita', `<a class="vuelta" href="${escapeHtml(vuelta)}">← ${escapeHtml(n.negocio)}</a>\n${cuerpo}`);
}

export function paginaError(n: Negocio, aviso: string, vuelta: string, status = 400): Response {
  return new Response(pagina(n, 'No se ha podido', `<h1>No se ha podido</h1><p class="aviso" role="alert">${escapeHtml(aviso)}</p><a class="boton sec" href="${escapeHtml(vuelta)}">Volver</a>`), {
    status,
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' },
  });
}

/** Resumen de días con horas libres para la tira de días. */
export function resumenDias(tramos: Tramo[], dur: number, ocup: Intervalo[], ahora: number): { fecha: string; libres: number }[] {
  return diasVista(ahora).map((fecha) => ({ fecha, libres: huecosDelDia(fecha, tramos, dur, ocup, ahora).length }));
}

export interface CitaCliente extends Cita {
  negocio: string;
}

/** Próximas citas de las webs del cliente, para su área (/account). */
export async function citasDeCliente(db: D1Database, email: string, ahora = Date.now(), limite = 50): Promise<CitaCliente[]> {
  const { results } = await db
    .prepare(
      `SELECT c.id, c.slug, c.inicio, c.fin, c.nombre, c.email, c.telefono, c.nota, c.estado,
              COALESCE(json_extract(p.datos, '$.negocio'), '') AS negocio
         FROM citas c
         JOIN paginas_publicadas p ON p.tipo = 'web' AND p.slug = c.slug
         JOIN orders o ON o.public_id = p.pedido_public_id
        WHERE o.email = ? AND c.estado = 'confirmada' AND c.fin > ?
        ORDER BY c.inicio LIMIT ?`,
    )
    .bind(email, ahora, limite)
    .all<CitaCliente>();
  return results ?? [];
}

export const diaYHora = (ms: number) => `${FMT_CORTO.format(ms).replace(/\./g, '')}, ${horaTexto(local(ms).min)}`;

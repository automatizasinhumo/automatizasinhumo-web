/**
 * Recuperar a quien empieza su web en el estudio y se va sin pagar (ronda GPT 39).
 *
 * - «Guardar y seguir luego»: el borrador se guarda en webs_borradores (el mismo id sirve la
 *   vista con marca de agua) y el correo en webs_recuperacion. Se manda al momento el enlace
 *   para seguir (lo ha pedido: RGPD 6.1.b).
 * - Con la casilla de avisos (sin marcar por defecto: RGPD 6.1.a y LSSI 21) llegan hasta 3
 *   recordatorios a las 2 h, 24 h y 72 h, solo de 9 a 21 h en Madrid. Sin descuento.
 * - Para solo: al pagar (pedido pagado con ese correo después de guardar), al darse de baja
 *   (List-Unsubscribe One-Click) o al guardar otro borrador con el mismo correo.
 * - Idempotente con el cron de 5 min: el envío se reserva con un plazo (UPDATE condicional) y
 *   cada paso lleva su clave de idempotencia; un fallo deja la reserva caducar y se reintenta.
 *
 * Los enlaces van firmados con AUTH_SECRET (como el magic link): seguir caduca a los 30 días,
 * con el borrador; la baja dura un año. Nada de eso se guarda en D1.
 */
import { signToken, verifyToken } from '../auth/token';
import { emailButton, emailShell, escapeHtml } from '../email/layout';
import type { EmailMessage, EmailProvider } from '../email';
import { DIAS_VISTA, guardarVista, leerVista } from './vistaWeb';
import type { DatosWeb } from './webs';

const HORA = 3_600_000;
/** Momento de cada correo desde que se guardó: 0 = el enlace pedido; 1-3 = recordatorios. */
export const PLAZOS = [0, 2 * HORA, 24 * HORA, 72 * HORA] as const;
export const CONSENTIMIENTO = 'recuperacion-v1';
/** Borradores con el mismo correo en 24 h: corta a quien usa el formulario para molestar a otro. */
export const MAX_POR_DIA = 3;
const RESERVA = 10 * 60_000;
const TTL_SEGUIR = DIAS_VISTA * 86_400;
const TTL_BAJA = 365 * 86_400;
const EMAIL = /^[^\s@<>()",;:]{1,64}@[^\s@<>()",;:]+\.[a-z]{2,}$/i;

/** Quita las barras finales (sin regex: Sonar avisa de retroceso con /\/+$/). */
export function sinBarraFinal(s: string): string {
  let i = s.length;
  while (i > 0 && s[i - 1] === '/') i--;
  return s.slice(0, i);
}

const sqlFecha = (ms: number) => new Date(ms).toISOString().slice(0, 19).replace('T', ' ');
const deSql = (s: string) => Date.parse(`${s.replace(' ', 'T')}Z`);

export function correoValido(x: unknown): string | null {
  const e = typeof x === 'string' ? x.trim().toLowerCase() : '';
  return e.length <= 254 && EMAIL.test(e) ? e : null;
}

export const firmarSeguir = (id: string, secret: string, ahora = Date.now()) => signToken(`seguir:${id}`, secret, TTL_SEGUIR, Math.floor(ahora / 1000));
export const firmarBaja = (id: string, secret: string, ahora = Date.now()) => signToken(`baja:${id}`, secret, TTL_BAJA, Math.floor(ahora / 1000));

async function leerFirma(prefijo: string, t: string | null | undefined, secret: string | null | undefined, ahora: number): Promise<string | null> {
  if (!secret || !t || t.length > 300) return null;
  const p = await verifyToken(t, secret, Math.floor(ahora / 1000));
  return p?.startsWith(prefijo) && /^[a-z2-9]{12}$/.test(p.slice(prefijo.length)) ? p.slice(prefijo.length) : null;
}
export const leerSeguir = (t: string | null | undefined, secret: string | null | undefined, ahora = Date.now()) => leerFirma('seguir:', t, secret, ahora);
export const leerBaja = (t: string | null | undefined, secret: string | null | undefined, ahora = Date.now()) => leerFirma('baja:', t, secret, ahora);

export type Guardado = { ok: true; id: string; token: string } | { ok: false; error: 'grande' | 'limite' };

/**
 * Guarda el borrador y el correo. Los borradores anteriores de ese correo dejan de recibir
 * recordatorios (solo el último cuenta). Devuelve el token de «seguir», que el estudio usa
 * también para ir actualizando el borrador.
 */
export async function guardarRecuperacion(
  db: D1Database,
  secret: string,
  datos: DatosWeb,
  email: string,
  avisos: boolean,
  ahora = Date.now(),
): Promise<Guardado> {
  const n = await db
    .prepare('SELECT COUNT(*) AS n FROM webs_recuperacion WHERE email = ? AND creado >= ?')
    .bind(email, sqlFecha(ahora - 24 * HORA))
    .first<{ n: number }>();
  if ((n?.n ?? 0) >= MAX_POR_DIA) return { ok: false, error: 'limite' };
  const id = await guardarVista(db, datos, new Date(ahora));
  if (!id) return { ok: false, error: 'grande' };
  const cuando = sqlFecha(ahora);
  await db.batch([
    db.prepare("UPDATE webs_recuperacion SET fin = 'sustituido', fin_en = ?, paso_fin = paso WHERE email = ? AND fin IS NULL").bind(cuando, email),
    db.prepare('INSERT INTO webs_recuperacion (id, email, avisos, consentimiento, creado) VALUES (?, ?, ?, ?, ?)').bind(id, email, avisos ? 1 : 0, avisos ? CONSENTIMIENTO : null, cuando),
    db.prepare('DELETE FROM webs_recuperacion WHERE creado < ?').bind(sqlFecha(ahora - DIAS_VISTA * 86_400_000)),
  ]);
  return { ok: true, id, token: await firmarSeguir(id, secret, ahora) };
}

/** Sustituye los datos del borrador (el estudio lo va guardando mientras se edita). */
export async function actualizarBorrador(db: D1Database, id: string, datos: DatosWeb): Promise<boolean> {
  const r = await db.prepare('UPDATE webs_borradores SET datos = ? WHERE id = ?').bind(JSON.stringify(datos), id).run();
  return (r.meta.changes ?? 0) === 1;
}

/** Baja de los recordatorios (One-Click o el botón de la página). Idempotente. */
export async function darDeBaja(db: D1Database, id: string, ahora = Date.now()): Promise<boolean> {
  const r = await db
    .prepare("UPDATE webs_recuperacion SET fin = 'baja', fin_en = ?, paso_fin = paso WHERE id = ? AND (fin IS NULL OR fin = 'sustituido')")
    .bind(sqlFecha(ahora), id)
    .run();
  const sigue = await db.prepare('SELECT 1 FROM webs_recuperacion WHERE id = ?').bind(id).first();
  return (r.meta.changes ?? 0) === 1 || !!sigue;
}

const TEXTOS = [
  {
    asunto: 'Tu web está guardada: sigue cuando quieras',
    titulo: 'Tu web está guardada',
    cuerpo: 'Aquí tienes el enlace para seguir con tu web donde la dejaste, desde cualquier móvil u ordenador. No hace falta crear cuenta.',
  },
  {
    asunto: 'Tu web sigue guardada',
    titulo: 'Tu web sigue guardada',
    cuerpo: 'La dejaste a medias y la tenemos tal cual. Te faltan unos minutos para publicarla: revisa los textos, mira cómo queda en el móvil y publícala.',
  },
  {
    asunto: 'Tu web está a un paso de publicarse',
    titulo: 'Está a un paso de publicarse',
    cuerpo: 'Al publicarla tus clientes pueden llamarte, escribirte por WhatsApp o encontrarte desde el móvil. Se publica al momento, sin marca de agua, y la puedes cambiar cuando quieras.',
  },
  {
    asunto: '¿Te ayudamos a terminar tu web?',
    titulo: '¿Te ayudamos a terminarla?',
    cuerpo: 'Si algo te ha frenado (los textos, las fotos o el dominio), responde a este correo y te ayudamos. Es el último recordatorio: no te escribiremos más sobre este borrador.',
  },
] as const;

export interface Enlaces {
  seguir: string;
  vista: string;
  baja: string;
}

/** Correo del paso `paso` (0 = el enlace pedido). */
export function correoRecuperacion(para: string, paso: number, negocio: string, e: Enlaces, tienda: string, id: string): EmailMessage {
  const t = TEXTOS[Math.min(Math.max(0, paso), TEXTOS.length - 1)];
  const quien = negocio.trim() ? `«${negocio.trim()}»` : 'tu web';
  const baja = paso > 0 ? 'No quiero más recordatorios' : 'No quiero recordatorios';
  const text = [
    t.cuerpo,
    '',
    `Seguir con ${negocio.trim() || 'mi web'}: ${e.seguir}`,
    `Ver cómo va (con marca de agua): ${e.vista}`,
    '',
    `${baja}: ${e.baja}`,
  ].join('\n');
  const body = `<p>${escapeHtml(t.cuerpo)}</p>${emailButton(e.seguir, 'Seguir con mi web')}<p><a href="${escapeHtml(e.vista)}">Ver cómo va</a> (con marca de agua)</p>`;
  return {
    to: para,
    subject: t.asunto,
    html: emailShell({ storeName: tienda, heading: t.titulo, subheading: escapeHtml(quien), body, footer: `<a href="${escapeHtml(e.baja)}">${escapeHtml(baja)}</a>` }),
    text,
    idempotencyKey: `web-borrador/${id}/${paso}`,
    headers: { 'List-Unsubscribe': `<${e.baja}>`, 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' },
  };
}

/** Hora en Madrid (los recordatorios no salen de noche). */
export function horaMadrid(ms: number): number {
  return Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', hour: 'numeric', hourCycle: 'h23' }).format(ms));
}

interface Fila {
  id: string;
  email: string;
  avisos: number;
  paso: number;
  creado: string;
}

/** Marca como pagados los borradores cuyo correo ya tiene un pedido pagado posterior. */
export async function marcarPagados(db: D1Database, ahora = Date.now()): Promise<number> {
  const r = await db
    .prepare(
      `UPDATE webs_recuperacion SET fin = 'pagado', fin_en = ?, paso_fin = paso
        WHERE fin IS NULL AND EXISTS (
          SELECT 1 FROM orders o WHERE lower(o.email) = webs_recuperacion.email AND o.status = 'paid' AND o.created_at >= webs_recuperacion.creado)`,
    )
    .bind(sqlFecha(ahora))
    .run();
  return r.meta.changes ?? 0;
}

/**
 * Envía el paso que toca a cada borrador (como mucho `limite`). `origen` es la tienda en https.
 * Con `soloId`, solo ese borrador (el enlace recién pedido). Devuelve los correos enviados.
 */
export async function recordarBorradores(
  db: D1Database,
  email: EmailProvider,
  origen: string,
  secret: string,
  tienda: string,
  ahora = Date.now(),
  limite = 20,
  soloId: string | null = null,
): Promise<number> {
  await marcarPagados(db, ahora);
  const filas = await db
    .prepare(
      `SELECT id, email, avisos, paso, creado FROM webs_recuperacion
        WHERE fin IS NULL AND paso < CASE avisos WHEN 1 THEN ?1 ELSE 1 END
          AND (reservado IS NULL OR reservado < ?2) AND creado >= ?3 AND (?5 IS NULL OR id = ?5)
        ORDER BY creado LIMIT ?4`,
    )
    .bind(PLAZOS.length, sqlFecha(ahora), sqlFecha(ahora - DIAS_VISTA * 86_400_000), limite * 3, soloId)
    .all<Fila>();
  const inicio = Date.now();
  let enviados = 0;
  for (const f of filas.results ?? []) {
    if (enviados >= limite) break;
    if (deSql(f.creado) + PLAZOS[f.paso] > ahora) continue;
    // El enlace pedido sale a cualquier hora; los recordatorios, de 9 a 21 en Madrid.
    const h = horaMadrid(ahora + (Date.now() - inicio));
    if (f.paso > 0 && (h < 9 || h >= 21)) continue;
    const r = await db
      .prepare('UPDATE webs_recuperacion SET reservado = ? WHERE id = ? AND paso = ? AND fin IS NULL AND (reservado IS NULL OR reservado < ?)')
      .bind(sqlFecha(ahora + RESERVA), f.id, f.paso, sqlFecha(ahora))
      .run();
    if ((r.meta.changes ?? 0) !== 1) continue;
    // Justo antes de enviar: ¿ha pagado entre medias o ya no está el borrador?
    if (f.paso > 0 && (await marcarPagados(db, ahora)) > 0) {
      const sigue = await db.prepare('SELECT 1 FROM webs_recuperacion WHERE id = ? AND fin IS NULL').bind(f.id).first();
      if (!sigue) continue;
    }
    const datos = await leerVista(db, f.id, new Date(ahora));
    if (!datos) {
      await db.prepare("UPDATE webs_recuperacion SET fin = 'caducado', fin_en = ?, paso_fin = paso, reservado = NULL WHERE id = ?").bind(sqlFecha(ahora), f.id).run();
      continue;
    }
    try {
      await email.send(correoRecuperacion(f.email, f.paso, datos.negocio ?? '', await enlaces(origen, f.id, secret, deSql(f.creado)), tienda, f.id));
    } catch (err) {
      // La reserva caduca sola y otro barrido lo reintenta con la misma clave.
      console.error('Recordatorio de borrador fallido:', err instanceof Error ? err.message : 'error');
      continue;
    }
    await db.prepare('UPDATE webs_recuperacion SET paso = paso + 1, reservado = NULL WHERE id = ? AND paso = ?').bind(f.id, f.paso).run();
    enviados++;
  }
  return enviados;
}

/** Enlaces del correo. La firma se hace con la hora de guardado: el cuerpo es igual en cada reintento. */
export async function enlaces(origen: string, id: string, secret: string, creado: number): Promise<Enlaces> {
  const o = sinBarraFinal(origen);
  return {
    seguir: `${o}/servicios/web?seguir=${await firmarSeguir(id, secret, creado)}`,
    vista: `${o}/vista/${id}`,
    baja: `${o}/api/web/baja?t=${await firmarBaja(id, secret, creado)}`,
  };
}

export interface Metricas {
  guardados: number;
  pagados: number;
  /** Pedidos pagados según cuántos correos llevaba al pagar (1 = solo el enlace, 4 = los tres recordatorios). */
  porPaso: Record<number, number>;
  bajas: number;
}

/** Tasa de recuperación: borradores guardados que acaban en pedido pagado, y tras qué correo. */
export async function metricasRecuperacion(db: D1Database, desde: string): Promise<Metricas> {
  const r = await db
    .prepare(
      `SELECT COUNT(*) AS guardados,
              SUM(fin = 'pagado') AS pagados,
              SUM(fin = 'baja') AS bajas
         FROM webs_recuperacion WHERE creado >= ?`,
    )
    .bind(desde)
    .first<{ guardados: number; pagados: number | null; bajas: number | null }>();
  const pasos = await db
    .prepare(`SELECT paso_fin AS paso, COUNT(*) AS n FROM webs_recuperacion WHERE creado >= ? AND fin = 'pagado' GROUP BY paso_fin`)
    .bind(desde)
    .all<{ paso: number; n: number }>();
  const porPaso: Record<number, number> = {};
  for (const p of pasos.results ?? []) porPaso[p.paso] = p.n;
  return { guardados: r?.guardados ?? 0, pagados: r?.pagados ?? 0, porPaso, bajas: r?.bajas ?? 0 };
}

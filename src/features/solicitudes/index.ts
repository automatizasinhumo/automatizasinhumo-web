/**
 * Solicitudes «Empieza gratis»: el cliente deja sus datos SIN pagar, David
 * prepara una vista previa y solo si el cliente la aprueba se cobra. Así nunca
 * hay un pago por algo que todavía no funciona.
 *
 * Funciones puras (validación, campos) + acceso a D1 (tabla de 0040).
 */

export const ESTADOS = [
  'nueva',
  'en_preparacion',
  'vista_previa_enviada',
  'aprobada',
  'pagada',
  'entregada',
  'descartada',
] as const;
export type Estado = (typeof ESTADOS)[number];

export const ESTADO_LABEL: Record<Estado, string> = {
  nueva: 'Nueva',
  en_preparacion: 'Preparando vista previa',
  vista_previa_enviada: 'Vista previa enviada',
  aprobada: 'Aprobada (pendiente de pago)',
  pagada: 'Pagada',
  entregada: 'Entregada',
  descartada: 'Descartada',
};

export const LIMITES = { nombre: 120, email: 200, telefono: 40, campo: 1000, mensaje: 3000, campos: 20 };

/** Lista de campos sacada de la sección «### Campos que rellenas» de la descripción. */
export function camposDeDescripcion(md: string | null | undefined): string[] {
  if (!md) return [];
  const lineas = md.split(/\r?\n/);
  const i = lineas.findIndex((l) => /^###\s+Campos que rellenas/i.test(l.trim()));
  if (i < 0) return [];
  const out: string[] = [];
  for (const l of lineas.slice(i + 1)) {
    const t = l.trim();
    if (t.startsWith('#')) break;
    const m = /^[-*]\s+(.+)$/.exec(t);
    if (m) out.push(m[1]!.replace(/\*\*/g, '').trim());
  }
  return out.slice(0, LIMITES.campos);
}

/** Nombre de campo de formulario estable para una etiqueta. */
export function nombreCampo(i: number): string {
  return `campo_${i}`;
}

export interface SolicitudInput {
  slug: string;
  producto: string | null;
  modalidad: string | null;
  nombre: string;
  email: string;
  telefono: string | null;
  campos: Record<string, string>;
  mensaje: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer: string | null;
}

export type Validacion =
  | { ok: true; spam: false; data: SolicitudInput }
  | { ok: true; spam: true }
  | { ok: false; errores: Record<string, string> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SLUG_RE = /^[a-z0-9-]{1,80}$/;

function texto(form: FormData, k: string, max: number): string {
  return String(form.get(k) ?? '').replace(/\u0000/g, '').trim().slice(0, max);
}
function opcional(form: FormData, k: string, max: number): string | null {
  return texto(form, k, max) || null;
}

/**
 * Valida el POST del formulario. `etiquetas` son los campos esperados del
 * servicio (en el orden de `campo_0..n`). El honeypot `web` lleno = bot:
 * se responde como si todo fuera bien pero no se guarda nada.
 */
/** Campo con el número de pedido cuando la solicitud llega tras una compra directa. */
export const CAMPO_PEDIDO = 'Pedido pagado';

export function validarSolicitud(form: FormData, etiquetas: string[]): Validacion {
  if (texto(form, 'web', 200) !== '') return { ok: true, spam: true };

  const errores: Record<string, string> = {};
  const slug = texto(form, 'slug', 80);
  const nombre = texto(form, 'nombre', LIMITES.nombre);
  const email = texto(form, 'email', LIMITES.email).toLowerCase();
  const telefono = opcional(form, 'telefono', LIMITES.telefono);

  if (!SLUG_RE.test(slug)) errores.slug = 'Servicio no válido.';
  if (nombre.length < 2) errores.nombre = 'Escribe tu nombre.';
  if (!EMAIL_RE.test(email)) errores.email = 'Revisa el email: ahí te mandamos la vista previa.';
  if (telefono && !/^[+\d][\d\s().-]{5,}$/.test(telefono)) errores.telefono = 'Revisa el teléfono (o déjalo vacío).';
  if (form.get('consentimiento') !== 'si')
    errores.consentimiento = 'Necesitamos tu permiso para usar estos datos y preparar la vista previa.';

  const campos: Record<string, string> = {};
  // El pedido pagado (compra directa) NO sale del formulario: /api/solicitudes lo
  // comprueba en D1 y añade CAMPO_PEDIDO con el número real.
  etiquetas.forEach((etiqueta, i) => {
    const v = texto(form, nombreCampo(i), LIMITES.campo);
    if (v) campos[etiqueta] = v;
  });
  const mensaje = opcional(form, 'mensaje', LIMITES.mensaje);
  if (etiquetas.length === 0 && !mensaje) errores.mensaje = 'Cuéntanos en dos líneas qué necesitas.';

  if (Object.keys(errores).length > 0) return { ok: false, errores };
  return {
    ok: true,
    spam: false,
    data: {
      slug,
      producto: opcional(form, 'producto', 200),
      modalidad: opcional(form, 'modalidad', 80),
      nombre,
      email,
      telefono,
      campos,
      mensaje,
      utm_source: opcional(form, 'utm_source', 100),
      utm_medium: opcional(form, 'utm_medium', 100),
      utm_campaign: opcional(form, 'utm_campaign', 100),
      referrer: opcional(form, 'referrer', 300),
    },
  };
}

const ALPHA = '23456789abcdefghjkmnpqrstvwxyz';
/** Número de solicitud legible para el cliente (p. ej. «S-7K3M9Q»). */
export function nuevoPublicId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  return 'S-' + Array.from(bytes, (b) => ALPHA[b % ALPHA.length]).join('').toUpperCase();
}

export interface SolicitudRow extends Omit<SolicitudInput, 'campos'> {
  id: number;
  public_id: string;
  campos: string;
  estado: Estado;
  nota: string | null;
  created_at: string;
  updated_at: string;
}

export async function crearSolicitud(
  db: D1Database,
  s: SolicitudInput,
  /** ord_… del pedido pagado ya verificado en el servidor (compra directa). */
  pedidoPublicId: string | null = null,
): Promise<string> {
  const publicId = nuevoPublicId();
  await db
    .prepare(
      `INSERT INTO solicitudes (public_id, slug, producto, modalidad, nombre, email, telefono, campos, mensaje, utm_source, utm_medium, utm_campaign, referrer, pedido_public_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      publicId,
      s.slug,
      s.producto,
      s.modalidad,
      s.nombre,
      s.email,
      s.telefono,
      JSON.stringify(s.campos),
      s.mensaje,
      s.utm_source,
      s.utm_medium,
      s.utm_campaign,
      s.referrer,
      pedidoPublicId,
    )
    .run();
  return publicId;
}

export async function listarSolicitudes(db: D1Database, estado?: Estado): Promise<SolicitudRow[]> {
  const sql = estado
    ? 'SELECT * FROM solicitudes WHERE estado = ? ORDER BY created_at DESC, id DESC LIMIT 300'
    : 'SELECT * FROM solicitudes ORDER BY created_at DESC, id DESC LIMIT 300';
  const stmt = estado ? db.prepare(sql).bind(estado) : db.prepare(sql);
  const { results } = await stmt.all<SolicitudRow>();
  return results ?? [];
}

export async function contarPorEstado(db: D1Database): Promise<Record<string, number>> {
  const { results } = await db
    .prepare('SELECT estado, COUNT(*) AS n FROM solicitudes GROUP BY estado')
    .all<{ estado: string; n: number }>();
  return Object.fromEntries((results ?? []).map((r) => [r.estado, r.n]));
}

export async function cambiarEstado(
  db: D1Database,
  publicId: string,
  estado: Estado,
  nota: string | null,
): Promise<boolean> {
  const r = await db
    .prepare("UPDATE solicitudes SET estado = ?, nota = ?, updated_at = datetime('now') WHERE public_id = ?")
    .bind(estado, nota, publicId)
    .run();
  return (r.meta?.changes ?? 0) > 0;
}

/** Pasos que ve el cliente en /empezar/estado (sin datos internos). */
export const PASOS_CLIENTE = ['Recibida', 'Preparando tu vista previa', 'Vista previa enviada', 'Pago', 'Entregado'] as const;

/** Índice del paso del cliente para cada estado interno (-1 = cerrada sin seguir). */
export function pasoCliente(estado: Estado): number {
  switch (estado) {
    case 'nueva': return 0;
    case 'en_preparacion': return 1;
    case 'vista_previa_enviada': return 2;
    case 'aprobada': return 3;
    case 'pagada': return 3;
    case 'entregada': return 4;
    default: return -1;
  }
}

/** Formato del número que ve el cliente («S-» + 6-12 caracteres). */
export function normalizarPublicId(raw: string | null | undefined): string | null {
  const v = String(raw ?? '').trim().toUpperCase();
  return /^S-[A-Z0-9]{6,12}$/.test(v) ? v : null;
}

export interface EstadoPublico {
  publicId: string;
  producto: string | null;
  estado: Estado;
  creada: string;
  actualizada: string;
  /** Final que corresponde: datos de un pedido pagado, prueba gratis o consulta. */
  tipo: 'pedido' | 'prueba' | 'consulta';
}

/** Solo lo imprescindible para el seguimiento: nunca nombre, email ni campos. */
export async function estadoPublico(db: D1Database, publicId: string): Promise<EstadoPublico | null> {
  const r = await db
    .prepare('SELECT public_id, slug, producto, estado, created_at, updated_at, pedido_public_id FROM solicitudes WHERE public_id = ?')
    .bind(publicId)
    .first<{ public_id: string; slug: string; producto: string | null; estado: Estado; created_at: string; updated_at: string; pedido_public_id: string | null }>();
  if (!r) return null;
  const tipo = r.pedido_public_id ? 'pedido' : r.slug === 'consulta' ? 'consulta' : 'prueba';
  return { publicId: r.public_id, producto: r.producto, estado: r.estado, creada: r.created_at, actualizada: r.updated_at, tipo };
}

export function esEstado(v: unknown): v is Estado {
  return typeof v === 'string' && (ESTADOS as readonly string[]).includes(v);
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/** Resumen en texto plano y HTML para los emails (cliente y aviso interno). */
export function resumenSolicitud(s: SolicitudInput, publicId: string): { text: string; html: string } {
  const filas: [string, string][] = [
    ['Solicitud', publicId],
    ['Servicio', s.producto ?? s.slug],
    ...(s.modalidad ? [['Modalidad', s.modalidad] as [string, string]] : []),
    ['Nombre', s.nombre],
    ['Email', s.email],
    ...(s.telefono ? [['Teléfono', s.telefono] as [string, string]] : []),
    ...Object.entries(s.campos),
    ...(s.mensaje ? [['Mensaje', s.mensaje] as [string, string]] : []),
  ];
  return {
    text: filas.map(([k, v]) => `${k}: ${v}`).join('\n'),
    html:
      '<table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">' +
      filas
        .map(([k, v]) => `<tr><th align="left" style="border-bottom:1px solid #ddd">${esc(k)}</th><td style="border-bottom:1px solid #ddd">${esc(v).replace(/\n/g, '<br>')}</td></tr>`)
        .join('') +
      '</table>',
  };
}

/**
 * Compra directa: cinco estados que ve el cliente de un pedido ya pagado (sin paso
 * «Pago»). Mismo texto en /order/<token> y en /empezar/estado.
 */
export const PASOS_PEDIDO = [
  { titulo: 'Pendiente de datos', texto: 'Tu pedido está confirmado. Necesitamos tus datos para empezar.' },
  { titulo: 'En preparación', texto: 'Ya tenemos tus datos y estamos preparando tu encargo. Te avisaremos cuando puedas revisarlo.' },
  { titulo: 'Listo para revisar', texto: 'Tu primera versión está lista. Revísala y dinos si la apruebas o necesitas ajustes.' },
  { titulo: 'Ajustes finales', texto: 'Hemos recibido tus cambios y estamos aplicándolos. Te avisaremos cuando estén listos.' },
  { titulo: 'Entregado', texto: 'Tu trabajo está entregado. Tienes el acceso y las instrucciones en tu correo.' },
] as const;

/** Paso del pedido pagado según su solicitud (null = aún no ha mandado datos; -1 = cerrada). */
export function pasoPedido(estado: Estado | null | undefined): number {
  switch (estado) {
    case null:
    case undefined:
      return 0;
    case 'nueva':
    case 'en_preparacion':
      return 1;
    case 'vista_previa_enviada':
      return 2;
    case 'aprobada':
    case 'pagada':
      return 3;
    case 'entregada':
      return 4;
    default:
      return -1;
  }
}

export interface SolicitudDePedido {
  publicId: string;
  estado: Estado;
  actualizada: string;
}

/** Solicitudes unidas a un pedido, por servicio (la más reciente de cada uno). */
export async function solicitudesDePedido(db: D1Database, pedidoPublicId: string): Promise<Map<string, SolicitudDePedido>> {
  const { results } = await db
    .prepare('SELECT public_id, slug, estado, updated_at FROM solicitudes WHERE pedido_public_id = ? ORDER BY id DESC')
    .bind(pedidoPublicId)
    .all<{ public_id: string; slug: string; estado: Estado; updated_at: string }>();
  const out = new Map<string, SolicitudDePedido>();
  for (const r of results ?? []) {
    if (!out.has(r.slug)) out.set(r.slug, { publicId: r.public_id, estado: r.estado, actualizada: r.updated_at });
  }
  return out;
}

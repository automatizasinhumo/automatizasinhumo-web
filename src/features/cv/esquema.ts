/**
 * Constructor de CV: esquema del formulario (subconjunto de JSON Resume 1.x en
 * español) y limpieza de los datos antes de pintarlos con una plantilla.
 *
 * El formulario lo genera @json-editor/json-editor a partir de ESQUEMA_CV; el
 * resultado es un JSON Resume estándar, así que vale tal cual para las 160
 * plantillas de jsonresume.org y para exportarlo o importarlo en otras webs.
 */

type Esquema = Record<string, unknown>;

const texto = (title: string, extra: Esquema = {}): Esquema => ({ type: 'string', title, ...extra });
const fecha = (title: string): Esquema => texto(title, { format: 'month', options: { input_width: '12rem' } });
const lista = (title: string, item: string): Esquema => ({
  type: 'array',
  title,
  format: 'table',
  items: texto(item),
});
const bloque = (title: string, item: string, properties: Record<string, Esquema>): Esquema => ({
  type: 'array',
  title,
  items: { type: 'object', title: item, headerTemplate: `{{ i1 }}. {{ self.${Object.keys(properties)[0]} }}`, properties },
});

export const ESQUEMA_CV: Esquema = {
  type: 'object',
  title: 'Tu CV',
  properties: {
    basics: {
      type: 'object',
      title: 'Datos personales',
      properties: {
        name: texto('Nombre y apellidos'),
        label: texto('Puesto o titular', { description: 'Ej.: Técnica de administración y contabilidad' }),
        email: texto('Email', { format: 'email' }),
        phone: texto('Teléfono', { format: 'tel' }),
        url: texto('Web (opcional)', { format: 'url' }),
        summary: texto('Sobre mí', { format: 'textarea', description: 'Dos o tres frases: qué haces y qué aportas.' }),
        location: {
          type: 'object',
          title: 'Dónde vives',
          format: 'grid',
          properties: {
            city: texto('Ciudad', { options: { grid_columns: 6 } }),
            region: texto('Provincia', { options: { grid_columns: 6 } }),
          },
        },
        profiles: {
          type: 'array',
          title: 'Perfiles (LinkedIn, GitHub…)',
          format: 'table',
          items: {
            type: 'object',
            title: 'Perfil',
            properties: { network: texto('Red'), username: texto('Usuario'), url: texto('Enlace', { format: 'url' }) },
          },
        },
      },
    },
    work: bloque('Experiencia', 'Empleo', {
      name: texto('Empresa'),
      position: texto('Puesto'),
      startDate: fecha('Desde'),
      endDate: fecha('Hasta (vacío = actualidad)'),
      summary: texto('Qué hacías', { format: 'textarea' }),
      highlights: lista('Logros', 'Logro'),
    }),
    education: bloque('Formación', 'Estudio', {
      institution: texto('Centro'),
      studyType: texto('Titulación', { description: 'Ej.: Grado, Técnico Superior (FP), Máster' }),
      area: texto('Especialidad'),
      startDate: fecha('Desde'),
      endDate: fecha('Hasta'),
      score: texto('Nota (opcional)'),
    }),
    skills: bloque('Competencias', 'Competencia', {
      name: texto('Competencia'),
      level: texto('Nivel (opcional)'),
      keywords: lista('Detalle', 'Detalle'),
    }),
    languages: {
      type: 'array',
      title: 'Idiomas',
      format: 'table',
      items: {
        type: 'object',
        title: 'Idioma',
        properties: { language: texto('Idioma'), fluency: texto('Nivel', { description: 'Nativo, C1, B2…' }) },
      },
    },
    projects: bloque('Proyectos', 'Proyecto', {
      name: texto('Proyecto'),
      description: texto('Descripción', { format: 'textarea' }),
      url: texto('Enlace', { format: 'url' }),
      startDate: fecha('Desde'),
      endDate: fecha('Hasta'),
      highlights: lista('Logros', 'Logro'),
    }),
    volunteer: bloque('Voluntariado', 'Voluntariado', {
      organization: texto('Organización'),
      position: texto('Función'),
      startDate: fecha('Desde'),
      endDate: fecha('Hasta'),
      summary: texto('Qué hacías', { format: 'textarea' }),
    }),
    certificates: bloque('Certificaciones', 'Certificación', {
      name: texto('Certificación'),
      issuer: texto('Entidad'),
      date: fecha('Fecha'),
      url: texto('Enlace', { format: 'url' }),
    }),
    awards: bloque('Premios', 'Premio', {
      title: texto('Premio'),
      awarder: texto('Otorgado por'),
      date: fecha('Fecha'),
      summary: texto('Detalle', { format: 'textarea' }),
    }),
    interests: {
      type: 'array',
      title: 'Intereses',
      format: 'table',
      items: { type: 'object', title: 'Interés', properties: { name: texto('Interés') } },
    },
    references: bloque('Referencias', 'Referencia', {
      name: texto('Nombre'),
      reference: texto('Referencia', { format: 'textarea' }),
    }),
  },
};

/** Textos de json-editor en español (botones y avisos que ve el cliente). */
export const TEXTOS_EDITOR: Record<string, string> = {
  button_add: 'Añadir',
  button_add_row_title: 'Añadir {{0}}',
  button_delete_all: 'Todo',
  button_delete_all_title: 'Borrar todo',
  button_delete_last: 'Último',
  button_delete_last_title: 'Borrar el último',
  button_delete_row_title: 'Borrar {{0}}',
  button_delete_row_title_short: 'Borrar',
  button_copy_row_title: 'Duplicar {{0}}',
  button_copy_row_title_short: 'Duplicar',
  button_move_down_title: 'Bajar',
  button_move_up_title: 'Subir',
  button_collapse: 'Plegar',
  button_expand: 'Desplegar',
  button_delete_node_warning: '¿Seguro que quieres borrarlo?',
  button_save: 'Guardar',
  button_cancel: 'Cancelar',
  button_copy: 'Copiar',
};

type Valor = unknown;

/** Quita textos vacíos, listas vacías y objetos sin contenido (el formulario los crea al añadir filas). */
export function limpiar(v: Valor): Valor {
  if (typeof v === 'string') {
    const t = v.trim();
    return t === '' ? undefined : t;
  }
  if (Array.isArray(v)) {
    const out = v.map(limpiar).filter((x) => x !== undefined);
    return out.length ? out : undefined;
  }
  if (v && typeof v === 'object') {
    const out: Record<string, Valor> = {};
    for (const [k, x] of Object.entries(v)) {
      const l = limpiar(x);
      if (l !== undefined) out[k] = l;
    }
    return Object.keys(out).length ? out : undefined;
  }
  return v ?? undefined;
}

/** CV listo para la plantilla: limpio, siempre en español y con lo mínimo para que ninguna falle. */
export function prepararCv(datos: Valor): Record<string, unknown> {
  const cv = (limpiar(datos) as Record<string, unknown> | undefined) ?? {};
  const basics = (cv.basics as Record<string, unknown> | undefined) ?? {};
  return {
    ...cv,
    basics: { ...basics, name: basics.name ?? 'Tu nombre' },
    meta: { ...((cv.meta as Record<string, unknown>) ?? {}), language: 'es' },
  };
}

/** Acepta un JSON Resume pegado o subido (de jsonresume.org u otra web). Devuelve null si no lo es. */
export function leerJsonResume(texto: string): Record<string, unknown> | null {
  try {
    const v = JSON.parse(texto) as unknown;
    if (!v || typeof v !== 'object' || Array.isArray(v)) return null;
    const o = v as Record<string, unknown>;
    const claves = ['basics', 'work', 'education', 'skills', 'languages', 'projects'];
    return claves.some((k) => k in o) ? o : null;
  } catch {
    return null;
  }
}

/** Nombre de fichero seguro a partir del nombre de la persona. */
export function nombreFichero(nombre: unknown, extension: string): string {
  const base = String(nombre ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
  return `cv-${base || 'sin-nombre'}.${extension}`;
}

/** CV de ejemplo (ficticio) para que la vista previa no empiece vacía. */
export const CV_EJEMPLO = {
  basics: {
    name: 'Lucía Martín Ortega',
    label: 'Técnica de administración y contabilidad',
    email: 'lucia@ejemplo.es',
    phone: '+34 600 000 000',
    summary:
      'Diez años llevando facturación, nóminas y proveedores en pymes de logística. Acostumbrada a cierres trimestrales, conciliación bancaria y atención a clientes.',
    location: { city: 'Logroño', region: 'La Rioja' },
    profiles: [{ network: 'LinkedIn', username: 'luciamartin', url: 'https://www.linkedin.com/in/luciamartin' }],
  },
  work: [
    {
      name: 'Transportes del Ebro',
      position: 'Responsable de administración',
      startDate: '2019-03',
      summary: 'Coordino un equipo de tres personas.',
      highlights: ['Reduje un 30 % el plazo de cobro con un calendario de avisos.', 'Implanté la factura electrónica.'],
    },
    {
      name: 'Almacenes Rioja',
      position: 'Auxiliar administrativa',
      startDate: '2014-09',
      endDate: '2019-02',
      highlights: ['Contabilidad de proveedores y conciliación bancaria mensual.'],
    },
  ],
  education: [
    { institution: 'IES Comercio, Logroño', studyType: 'Técnico Superior (FP)', area: 'Administración y Finanzas', startDate: '2012-09', endDate: '2014-06' },
  ],
  skills: [
    { name: 'Ofimática', keywords: ['Excel avanzado', 'Word', 'Outlook'] },
    { name: 'Contabilidad', keywords: ['A3', 'ContaPlus', 'Facturae'] },
  ],
  languages: [
    { language: 'Español', fluency: 'Nativo' },
    { language: 'Inglés', fluency: 'B2' },
  ],
};

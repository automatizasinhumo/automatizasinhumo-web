// Extras «Tu CV en LinkedIn» y «Tu CV en InfoJobs»: los datos del CV en trozos listos para copiar
// campo a campo, con los nombres de casilla de cada portal, una guía paso a paso y un .txt descargable.
// Ni LinkedIn ni InfoJobs dejan importar un CV desde fuera con su API pública, así que lo más
// rápido es copiar y pegar cada casilla. Módulo puro: sin DOM, fácil de probar.

export type Portal = 'linkedin' | 'infojobs';
export const PORTALES: readonly Portal[] = ['linkedin', 'infojobs'];
export const NOMBRE_PORTAL: Record<Portal, string> = { linkedin: 'LinkedIn', infojobs: 'InfoJobs' };

type Fila = Record<string, unknown>;
export type DatosPortal = Record<string, unknown>;

/** Límites de caracteres de LinkedIn; en InfoJobs no se avisa de topes. */
export const LIMITES_PORTAL = { titular: 220, acerca: 2600, puesto: 100, descripcion: 2000 } as const;

export interface TrozoPortal {
  /** Casilla del portal donde se pega. */
  etiqueta: string;
  texto: string;
  /** Tope de esa casilla en el portal; si se pasa, se avisa (no se corta: lo decide la persona). */
  limite?: number;
}
export interface GrupoPortal {
  titulo: string;
  trozos: TrozoPortal[];
}

const txt = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
const filas = (v: unknown): Fila[] => (Array.isArray(v) ? v.filter((x): x is Fila => !!x && typeof x === 'object') : []);
const unir = (...partes: string[]) => partes.filter(Boolean).join(' · ');
const trozo = (etiqueta: string, texto: string, limite?: number): TrozoPortal[] => (texto ? [{ etiqueta, texto, ...(limite ? { limite } : {}) }] : []);

type Casilla =
  | 'perfil' | 'titular' | 'ubicacion' | 'acerca' | 'experiencia' | 'cargo' | 'empresa' | 'lugar' | 'fechas' | 'descripcion'
  | 'formacion' | 'centro' | 'titulo' | 'aptitudes' | 'aptitud' | 'idiomas' | 'idioma' | 'cursos' | 'curso' | 'contacto';
/** Nombre de cada casilla en el formulario de cada portal. */
const CASILLAS: Record<Portal, Record<Casilla, string>> = {
  linkedin: {
    perfil: 'Perfil', titular: 'Titular', ubicacion: 'Ubicación', acerca: 'Acerca de', experiencia: 'Experiencia', cargo: 'Cargo', empresa: 'Empresa',
    lugar: 'Ubicación', fechas: 'Fechas', descripcion: 'Descripción', formacion: 'Formación', centro: 'Centro educativo', titulo: 'Titulación',
    aptitudes: 'Aptitudes', aptitud: 'Una por una o todas juntas', idiomas: 'Idiomas', idioma: 'Idioma y nivel', cursos: 'Licencias y certificaciones',
    curso: 'Nombre · emisor · fecha', contacto: 'Contacto',
  },
  infojobs: {
    perfil: 'Datos personales y objetivo', titular: 'Puesto que buscas', ubicacion: 'Localidad', acerca: 'Carta de presentación o resumen',
    experiencia: 'Experiencia', cargo: 'Puesto', empresa: 'Empresa', lugar: 'Localidad', fechas: 'Fecha de inicio y fin', descripcion: 'Descripción del puesto',
    formacion: 'Estudios', centro: 'Centro', titulo: 'Estudio o titulación', aptitudes: 'Conocimientos', aptitud: 'Uno por uno',
    idiomas: 'Idiomas', idioma: 'Idioma y nivel', cursos: 'Cursos y certificaciones', curso: 'Curso · entidad · fecha', contacto: 'Datos de contacto',
  },
};

export function gruposPortales(f: DatosPortal, portal: Portal = 'linkedin'): GrupoPortal[] {
  const c = CASILLAS[portal];
  // Los topes de LinkedIn solo se avisan en LinkedIn.
  const tope = (n: number) => (portal === 'linkedin' ? n : undefined);
  const grupos: GrupoPortal[] = [];
  const meter = (titulo: string, trozos: TrozoPortal[]) => {
    if (trozos.length) grupos.push({ titulo, trozos });
  };
  meter(c.perfil, [...trozo(c.titular, txt(f.titular), tope(LIMITES_PORTAL.titular)), ...trozo(c.ubicacion, txt(f.ubicacion)), ...trozo(c.acerca, txt(f.resumen), tope(LIMITES_PORTAL.acerca))]);
  for (const e of filas(f.experiencia)) {
    const puesto = txt(e.puesto);
    const empresa = txt(e.empresa);
    if (!puesto && !empresa) continue;
    meter(`${c.experiencia}: ${unir(puesto, empresa)}`, [
      ...trozo(c.cargo, puesto, tope(LIMITES_PORTAL.puesto)),
      ...trozo(c.empresa, empresa),
      ...trozo(c.lugar, txt(e.lugar)),
      ...trozo(c.fechas, txt(e.periodo)),
      ...trozo(c.descripcion, txt(e.descripcion), tope(LIMITES_PORTAL.descripcion)),
    ]);
  }
  for (const e of filas(f.formacion)) {
    const titulo = txt(e.titulo);
    const centro = txt(e.centro);
    if (!titulo && !centro) continue;
    meter(`${c.formacion}: ${unir(titulo, centro)}`, [...trozo(c.centro, centro), ...trozo(c.titulo, titulo), ...trozo(c.fechas, txt(e.periodo))]);
  }
  const aptitudes = filas(f.habilidades).map((h) => txt(h.nombre)).filter(Boolean);
  meter(c.aptitudes, trozo(c.aptitud, aptitudes.join(', ')));
  const idiomas = filas(f.idiomas).map((i) => unir(txt(i.idioma), txt(i.nivel))).filter(Boolean);
  meter(c.idiomas, trozo(c.idioma, idiomas.join('\n')));
  const cursos = filas(f.cursos).map((x) => unir(txt(x.titulo), txt(x.entidad), txt(x.fecha))).filter(Boolean);
  meter(c.cursos, trozo(c.curso, cursos.join('\n')));
  meter(c.contacto, [...trozo('Email', txt(f.email)), ...trozo('Teléfono', txt(f.telefono)), ...trozo('Web', txt(f.web))]);
  return grupos;
}

/** Cuántos caracteres sobran en un trozo (0 si cabe). */
export const sobra = (t: TrozoPortal): number => (t.limite ? Math.max(0, [...t.texto].length - t.limite) : 0);

/** Guía paso a paso de cada portal: va en pantalla y en el .txt descargable. */
export const PASOS_PORTAL: Record<Portal, readonly string[]> = {
  linkedin: [
    'Entra en LinkedIn y abre tu perfil (tu foto, arriba).',
    'Pulsa el lápiz junto a tu nombre y pega el titular y la ubicación.',
    'Pulsa «Añadir sección del perfil» y pega «Acerca de».',
    'En Experiencia pulsa «+» y crea un puesto por cada bloque, casilla a casilla.',
    'Haz lo mismo con Formación, Aptitudes, Idiomas y Licencias y certificaciones.',
    'Guarda también tu CV en PDF en las preferencias de solicitud de Empleos: lo adjuntas al solicitar con un toque.',
  ],
  infojobs: [
    'Entra en InfoJobs y abre «Mi CV».',
    'En Datos personales, pega la localidad y el puesto que buscas.',
    'En Experiencia pulsa «Añadir experiencia» y crea una por cada bloque, casilla a casilla.',
    'Haz lo mismo con Estudios, Idiomas y Conocimientos.',
    'Pega el resumen como carta de presentación al inscribirte en una oferta.',
    'Adjunta tu CV en PDF en «CV adjunto»: es el que verán las empresas al abrirlo.',
  ],
};

/** Vista previa antes de pagar: se ve qué casillas salen, no su texto completo. */
export function muestraTrozo(t: string, n = 18): string {
  const letras = [...t.replace(/\s+/g, ' ')];
  return letras.length > n ? `${letras.slice(0, n).join('')}…` : letras.join('');
}

/** El paquete descargable: guía y todos los trozos, en texto plano para cualquier dispositivo. */
export function textoPortal(f: DatosPortal, portal: Portal): string {
  const nombre = NOMBRE_PORTAL[portal];
  const lineas = [`TU CV EN ${nombre.toUpperCase()}`, '', 'Cómo hacerlo:', ...PASOS_PORTAL[portal].map((p, i) => `${i + 1}. ${p}`), ''];
  for (const g of gruposPortales(f, portal)) {
    lineas.push(`== ${g.titulo} ==`);
    for (const t of g.trozos) {
      const n = sobra(t);
      lineas.push(`[${t.etiqueta}]${n ? ` (${nombre} admite ${t.limite} caracteres: sobran ${n})` : ''}`, t.texto, '');
    }
  }
  return lineas.join('\n');
}

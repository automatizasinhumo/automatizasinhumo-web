// «Pásalo a LinkedIn o InfoJobs»: los datos del CV en trozos listos para copiar campo a campo.
// Ni LinkedIn ni InfoJobs dejan importar un CV desde fuera con su API pública, así que lo más
// rápido es copiar y pegar cada casilla. Módulo puro: sin DOM, fácil de probar.

type Fila = Record<string, unknown>;
export type DatosPortal = Record<string, unknown>;

/** Límites de caracteres de LinkedIn (los más estrictos de los dos portales). */
export const LIMITES_PORTAL = { titular: 220, acerca: 2600, puesto: 100, descripcion: 2000 } as const;

export interface TrozoPortal {
  /** Casilla del portal donde se pega. */
  etiqueta: string;
  texto: string;
  /** Tope de esa casilla en LinkedIn; si se pasa, se avisa (no se corta: lo decide la persona). */
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

export function gruposPortales(f: DatosPortal): GrupoPortal[] {
  const grupos: GrupoPortal[] = [];
  const meter = (titulo: string, trozos: TrozoPortal[]) => {
    if (trozos.length) grupos.push({ titulo, trozos });
  };
  meter('Perfil', [...trozo('Titular', txt(f.titular), LIMITES_PORTAL.titular), ...trozo('Ubicación', txt(f.ubicacion)), ...trozo('Acerca de', txt(f.resumen), LIMITES_PORTAL.acerca)]);
  for (const e of filas(f.experiencia)) {
    const puesto = txt(e.puesto);
    const empresa = txt(e.empresa);
    if (!puesto && !empresa) continue;
    meter(`Experiencia: ${unir(puesto, empresa)}`, [
      ...trozo('Cargo', puesto, LIMITES_PORTAL.puesto),
      ...trozo('Empresa', empresa),
      ...trozo('Ubicación', txt(e.lugar)),
      ...trozo('Fechas', txt(e.periodo)),
      ...trozo('Descripción', txt(e.descripcion), LIMITES_PORTAL.descripcion),
    ]);
  }
  for (const e of filas(f.formacion)) {
    const titulo = txt(e.titulo);
    const centro = txt(e.centro);
    if (!titulo && !centro) continue;
    meter(`Formación: ${unir(titulo, centro)}`, [...trozo('Centro educativo', centro), ...trozo('Titulación', titulo), ...trozo('Fechas', txt(e.periodo))]);
  }
  const aptitudes = filas(f.habilidades).map((h) => txt(h.nombre)).filter(Boolean);
  meter('Aptitudes', trozo('Una por una o todas juntas', aptitudes.join(', ')));
  const idiomas = filas(f.idiomas).map((i) => unir(txt(i.idioma), txt(i.nivel))).filter(Boolean);
  meter('Idiomas', trozo('Idioma y nivel', idiomas.join('\n')));
  const cursos = filas(f.cursos).map((c) => unir(txt(c.titulo), txt(c.entidad), txt(c.fecha))).filter(Boolean);
  meter('Licencias y certificaciones', trozo('Nombre · emisor · fecha', cursos.join('\n')));
  meter('Contacto', [...trozo('Email', txt(f.email)), ...trozo('Teléfono', txt(f.telefono)), ...trozo('Web', txt(f.web))]);
  return grupos;
}

/** Cuántos caracteres sobran en un trozo (0 si cabe). */
export const sobra = (t: TrozoPortal): number => (t.limite ? Math.max(0, [...t.texto].length - t.limite) : 0);

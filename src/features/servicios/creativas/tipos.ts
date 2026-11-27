/**
 * Diseños de autor: cada uno tiene su propia gramática (portada, metáfora visual, tipografía y
 * paleta) en vez de ser una variación de color del esqueleto común. Reaprovechan las secciones
 * de `renderWeb` (servicios, fotos, opiniones…) y sustituyen la portada y las que quieran.
 * Sin DOM ni JavaScript en la página: solo HTML y CSS con ámbito en `.w-d-<id>`.
 */
import type { DatosWeb } from '../webs';
import type { CapaResuelta } from '../capaVisual';

export type IconoWeb = 'tel' | 'wa' | 'mail' | 'mapa' | 'cita' | 'zona' | 'reloj' | 'enlace';

/** Lo que `renderWeb` ya tiene preparado y escapado, para que cada diseño solo componga. */
export interface ContextoDiseno {
  d: DatosWeb;
  esc: (s: string) => string;
  icono: (k: IconoWeb) => string;
  /** Botones de contacto (el primero relleno) y su contenedor `.w-acciones`. */
  acciones: string;
  bloqueAcciones: string;
  /** Acción principal: [href, icono, texto] o undefined si no hay forma de contacto. */
  principal?: readonly [string, IconoWeb, string];
  /** Enlace `tel:` (vacío sin teléfono). */
  tel: string;
  /** Teléfono para mostrar, con espacios que no parten la línea. */
  telTexto: string;
  /** El dato de contacto más útil, ya como enlace. */
  grande: string;
  zonas: string[];
  horario: [string, string][];
  /** `<img>` de la foto principal, o '' si no hay. */
  foto: string;
  /** Título de una sección (el propio del diseño o el genérico). */
  titulo: (id: string) => string;
  /** El sector del cliente no es de los del diseño: títulos genéricos e ilustración del sector. */
  ajeno: boolean;
  /** La ilustración propia del diseño o, si el sector es ajeno, la del sector del cliente. */
  ilustracion: (propia: string) => string;
  /** Envoltorio estándar de sección (`.w-sec`, ancla `#id`). */
  seccion: (id: string, titulo: string, cuerpo: string) => string;
}

export interface Diseno {
  id: string;
  nombre: string;
  descripcion: string;
  /** Color de acento con el que nace (el cliente lo puede cambiar). */
  color: string;
  /** Fondos más desfavorables donde el acento va como texto (claro y oscuro). */
  fondoClaro: string;
  fondoOscuro: string;
  /** Familias (ver fuentes.ts) y su pila con respaldo del sistema. */
  fuentes: readonly string[];
  titulo: string;
  texto: string;
  /** Variantes de las secciones comunes que reaprovecha (mismas que las básicas). */
  servicios: 1 | 2 | 3 | 4 | 5;
  galeria: 1 | 2 | 3 | 4;
  opiniones: 1 | 2 | 3;
  contacto: 1 | 2 | 3 | 4;
  orden: readonly string[];
  /**
   * Sectores (ids de sectores-web.json) a los que corresponden su ilustración y sus títulos.
   * Con otro sector, la web usa títulos genéricos y el icono del sector del cliente.
   */
  sectores: readonly string[];
  /** Palabras del sector escrito que también le encajan («flor» en Herbario, «arquitect» en Lámina). */
  palabras?: readonly string[];
  /** Nombres de sección con el tono del diseño («La carta», «Tratamientos»…). */
  titulos?: Readonly<Record<string, string>>;
  /** Negocio de muestra para su miniatura en el selector. */
  muestra: Readonly<Partial<DatosWeb>>;
  /** Portada (header) completa. */
  cabecera: (c: ContextoDiseno) => string;
  /** Secciones que sustituye (por id); el resto, las comunes. */
  bloques?: (c: ContextoDiseno) => Readonly<Record<string, string>>;
  /** Algo entre la portada y la primera sección (cinta, franja de zonas…). */
  tras?: (c: ContextoDiseno) => string;
  /** Acabado, forma de foto y movimiento con los que nace (el cliente los puede cambiar). */
  capa?: Partial<CapaResuelta>;
  css: string;
}

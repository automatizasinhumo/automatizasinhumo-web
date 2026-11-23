// Textos de partida por sector para el estudio de webs (/servicios/web). El cliente escribe a qué
// se dedica y la web sale ya con frase de presentación, «Quiénes somos» y servicios, que luego puede
// cambiar. Sin servicios externos ni coste por uso: es una tabla. Añadir un sector es añadir una
// entrada en src/data/sectores-web.json; `claves` son raíces sin tildes que se buscan en lo que escribe el cliente.
import datos from '../../data/sectores-web.json';
import { ordenWeb, PLANTILLAS_WEB, type IdSeccionWeb, type PreguntaWeb, type ServicioWeb } from './webs';

export interface SectorWeb {
  id: string;
  nombre: string;
  claves: string[];
  /** Frase de presentación sin lugar; se añade «en <lugar>» si la dirección lo dice. */
  lema: string;
  sobre: string;
  servicios: [string, string][];
  /** Orden de secciones de partida: lo que el cliente de ese negocio busca primero (fotos, opiniones…). */
  orden: IdSeccionWeb[];
  /** Preguntas frecuentes típicas, sin respuesta: las responde el negocio y solo se publican respondidas. */
  preguntas: string[];
  /** Tres diseños de estilos distintos que le van a ese negocio: los que el estudio enseña primero. */
  disenos: string[];
}

// Los datos viven en src/data/sectores-web.json; aquí solo el tipo y la lógica.
export const SECTORES_WEB: SectorWeb[] = datos.sectores as unknown as SectorWeb[];

/** Para lo que no encaja en ningún sector: textos que valen para cualquier negocio. */
export const SECTOR_GENERICO: SectorWeb = datos.generico as unknown as SectorWeb;

const sinTildes = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

/** Sector que mejor encaja con lo que escribió el cliente (la clave más larga gana), o null. */
export function sectorDe(texto: string): SectorWeb | null {
  const t = ` ${sinTildes(texto).replace(/[^a-z0-9ñ]+/g, ' ').trim()} `;
  if (t.trim() === '') return null;
  let mejor: SectorWeb | null = null;
  let largo = 0;
  for (const s of SECTORES_WEB)
    for (const c of [sinTildes(s.nombre), ...s.claves.map(sinTildes)]) {
      // «bar» solo como palabra entera (no «barbería»); el resto, como comienzo de palabra.
      const corta = c.length <= 3;
      if ((corta ? t.includes(` ${c} `) : t.includes(` ${c}`)) && c.length > largo) {
        mejor = s;
        largo = c.length;
      }
    }
  return mejor;
}

/** Los tres diseños recomendados para lo que escribió el cliente (o los de cualquier negocio). */
export function disenosRecomendados(texto: string): { sector: SectorWeb | null; ids: string[] } {
  const sector = sectorDe(texto);
  const validos = new Set(PLANTILLAS_WEB.map((p) => p.id as string));
  return { sector, ids: (sector ?? SECTOR_GENERICO).disenos.filter((id) => validos.has(id)) };
}

/** Último trozo de la dirección que parece un lugar («Rúa da Raíña 1, Lugo» → «Lugo»). */
export function lugarDe(direccion: string): string {
  const trozos = direccion
    .split(',')
    .map((x) => x.replace(/\(.*?\)/g, '').replace(/\b\d{5}\b/g, '').trim())
    .filter(Boolean);
  const ultimo = trozos.length > 1 ? trozos[trozos.length - 1]! : '';
  return /\d/.test(ultimo) || ultimo.length > 40 ? '' : ultimo;
}

export interface TextosWeb {
  lema: string;
  sobre: string;
  servicios: ServicioWeb[];
  orden: IdSeccionWeb[];
  preguntas: PreguntaWeb[];
}

/** Textos de partida para un negocio: los del sector que encaje o los genéricos. */
export function textosDeSector(sector: string, negocio: string, direccion = ''): TextosWeb {
  const s = sectorDe(sector) ?? SECTOR_GENERICO;
  const lugar = lugarDe(direccion);
  return {
    lema: lugar ? `${s.lema} en ${lugar}.` : `${s.lema}.`,
    sobre: s.sobre.replaceAll('{negocio}', () => negocio.trim() || 'nuestro negocio'),
    servicios: s.servicios.map(([nombre, texto]) => ({ nombre, precio: '', texto })),
    orden: ordenWeb(s.orden),
    preguntas: s.preguntas.map((pregunta) => ({ pregunta, respuesta: '' })),
  };
}

const TODOS = [...SECTORES_WEB, SECTOR_GENERICO];
const PREGUNTAS_DE_SECTOR = new Set(TODOS.flatMap((s) => s.preguntas));
// También el de cada plantilla: al elegir una, el estudio coloca su orden, y eso no es «tocarlo».
const ORDENES_DE_SECTOR = new Set(
  [ordenWeb([]), ...TODOS.map((s) => ordenWeb(s.orden)), ...PLANTILLAS_WEB.map((p) => ordenWeb(p.orden as readonly IdSeccionWeb[]))].map((o) => o.join()),
);
/** Pregunta que pusimos nosotros (de algún sector): si sigue sin respuesta, se puede cambiar por la del sector nuevo. */
export const esPreguntaDeSector = (p: string) => PREGUNTAS_DE_SECTOR.has(p.trim());
/** Orden que no ha movido el cliente: el de partida, el de algún sector o el de alguna plantilla. */
export const esOrdenDeSector = (orden: readonly string[]) => ORDENES_DE_SECTOR.has(ordenWeb(orden as IdSeccionWeb[]).join());

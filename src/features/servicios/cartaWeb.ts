/**
 * Carta de un bar o restaurante dentro de la web del cliente (/w/<slug>/carta): platos por
 * sección, precio y los 14 alérgenos de declaración obligatoria en la UE. Solo el modelo y la
 * validación (sin DOM ni D1): lo importan el estudio, la API y la página pública.
 * Idea y lista tomadas de la ronda 37 de GPT (Menuly, qr-menu-guide; MIT).
 */
import { texto } from './paginas';

export const ALERGENOS = [
  { id: 'gluten', nombre: 'Gluten', descripcion: 'Trigo (espelta, khorasan), centeno, cebada, avena y derivados.' },
  { id: 'crustaceos', nombre: 'Crustáceos', descripcion: 'Gambas, langostinos, cangrejos y otros crustáceos.' },
  { id: 'huevos', nombre: 'Huevos', descripcion: 'Huevos y productos derivados.' },
  { id: 'pescado', nombre: 'Pescado', descripcion: 'Pescado y productos derivados.' },
  { id: 'cacahuetes', nombre: 'Cacahuetes', descripcion: 'Cacahuetes y productos derivados.' },
  { id: 'soja', nombre: 'Soja', descripcion: 'Soja y productos derivados.' },
  { id: 'leche', nombre: 'Leche', descripcion: 'Leche y derivados, incluida la lactosa.' },
  { id: 'frutos_cascara', nombre: 'Frutos de cáscara', descripcion: 'Almendras, avellanas, nueces, anacardos, pacanas, nueces de Brasil, pistachos y macadamias.' },
  { id: 'apio', nombre: 'Apio', descripcion: 'Apio y productos derivados.' },
  { id: 'mostaza', nombre: 'Mostaza', descripcion: 'Mostaza y productos derivados.' },
  { id: 'sesamo', nombre: 'Sésamo', descripcion: 'Granos de sésamo y productos derivados.' },
  { id: 'sulfitos', nombre: 'Sulfitos', descripcion: 'Dióxido de azufre y sulfitos de más de 10 mg/kg o 10 mg/l.' },
  { id: 'altramuces', nombre: 'Altramuces', descripcion: 'Altramuces y productos derivados.' },
  { id: 'moluscos', nombre: 'Moluscos', descripcion: 'Mejillones, almejas, ostras, calamares y otros moluscos.' },
] as const;
export type IdAlergeno = (typeof ALERGENOS)[number]['id'];

/** Lo que el plato es apto para (va aparte de los alérgenos: «sin gluten» no es «no lleva gluten» por omisión). */
export const DIETAS = [
  { id: 'vegetariano', nombre: 'Vegetariano', schema: 'VegetarianDiet' },
  { id: 'vegano', nombre: 'Vegano', schema: 'VeganDiet' },
  { id: 'sin_gluten', nombre: 'Sin gluten', schema: 'GlutenFreeDiet' },
] as const;
export type IdDieta = (typeof DIETAS)[number]['id'];

export interface PlatoCarta {
  seccion: string;
  nombre: string;
  precio: string;
  texto: string;
  alergenos: IdAlergeno[];
  dietas: IdDieta[];
}

/** Platos que caben: una carta grande de bar, lejos del máximo de la fila de D1 (~400 B cada uno). */
export const MAX_CARTA_WEB = 150;
export const SECCION_POR_DEFECTO = 'Carta';

const IDS_ALERGENOS = new Set<string>(ALERGENOS.map((a) => a.id));
const IDS_DIETAS = new Set<string>(DIETAS.map((a) => a.id));

/** Lista de ids: llega como array (guardado) o «gluten,leche» (casillas del estudio). Sin repetidos, en el orden oficial. */
function ids<T extends string>(v: unknown, validos: Set<string>, orden: readonly { id: T }[]): T[] {
  const dados = new Set((Array.isArray(v) ? v : typeof v === 'string' ? v.split(',') : []).map((x) => (typeof x === 'string' ? x.trim() : '')));
  return orden.map((x) => x.id).filter((id) => dados.has(id) && validos.has(id));
}

/** Comprueba y limpia la carta que manda el navegador o la guardada. La sección vacía hereda la anterior. */
export function validarCarta(v: unknown): PlatoCarta[] {
  let seccion = SECCION_POR_DEFECTO;
  return (Array.isArray(v) ? v : [])
    .map((x) => {
      const r = (x && typeof x === 'object' ? x : {}) as Record<string, unknown>;
      seccion = texto(r.seccion, 40) || seccion;
      return {
        seccion,
        nombre: texto(r.nombre, 80),
        precio: texto(r.precio, 20),
        texto: texto(r.texto, 240),
        alergenos: ids(r.alergenos, IDS_ALERGENOS, ALERGENOS),
        dietas: ids(r.dietas, IDS_DIETAS, DIETAS),
      };
    })
    .filter((p) => p.nombre)
    .slice(0, MAX_CARTA_WEB);
}

/** Secciones en el orden en que aparecen por primera vez, con un id de ancla único y legible. */
export function seccionesCarta(platos: PlatoCarta[]): { id: string; nombre: string; platos: PlatoCarta[] }[] {
  const mapa = new Map<string, PlatoCarta[]>();
  for (const p of platos) mapa.set(p.seccion, [...(mapa.get(p.seccion) ?? []), p]);
  const usados = new Set<string>();
  return [...mapa].map(([nombre, ps]) => {
    const base =
      'c-' +
      (nombre
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') || 'seccion');
    let id = base;
    for (let n = 2; usados.has(id); n++) id = `${base}-${n}`;
    usados.add(id);
    return { id, nombre, platos: ps };
  });
}

/** «9,50 €», «12 €», «1.200,00» → «9.50»; «desde 9 €», «S/M» o vacío → undefined (sin oferta en el JSON-LD). */
export function precioNumero(precio: string): string | undefined {
  const v = precio.replace(/\s+/g, '').replace(/€|eur(?:os?)?/gi, '');
  let n: string;
  if (/^\d{1,3}(?:\.\d{3})+(?:,\d{1,2})?$/.test(v)) n = v.replace(/\./g, '').replace(',', '.');
  else if (/^\d+(?:[,.]\d{1,2})?$/.test(v)) n = v.replace(',', '.');
  else return undefined;
  const x = Number(n);
  return Number.isFinite(x) ? x.toFixed(2) : undefined;
}

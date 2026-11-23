/**
 * Reconocer el sector a partir de lo que escribe el cliente. Sin más dependencias que los datos:
 * así lo puede importar el render de la web (webs.ts) sin ciclos con sectores.ts.
 */
import datos from '../../data/sectores-web.json';

export interface SectorBase {
  id: string;
  nombre: string;
  claves: string[];
  /** Texto del botón de reservas para ese negocio («Reservar mesa», «Pedir cita»…). */
  reserva?: string;
  /** Texto del botón principal cuando no hay reservas en línea («Pedir presupuesto»…). */
  contacto?: string;
}

const sinTildes = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

/** Sector que mejor encaja con lo que escribió el cliente (la clave más larga gana), o null. */
export function sectorEn<T extends SectorBase>(lista: readonly T[], texto: string): T | null {
  const t = ` ${sinTildes(texto).replace(/[^a-z0-9ñ]+/g, ' ').trim()} `;
  if (t.trim() === '') return null;
  let mejor: T | null = null;
  let largo = 0;
  for (const s of lista)
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

const BASE = datos.sectores as SectorBase[];
/** Textos de los botones de acción según el sector: lo que de verdad quiere hacer su cliente. */
export function accionesDeSector(texto: string): { reserva: string; contacto?: string } {
  const s = sectorEn(BASE, texto);
  return { reserva: s?.reserva ?? 'Reservar cita', contacto: s?.contacto };
}

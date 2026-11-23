/**
 * Datos estructurados de la web de negocio que se deducen de lo que el cliente ya escribe,
 * sin pedirle campos nuevos: el subtipo de LocalBusiness sale del sector y los horarios de
 * schema.org salen del texto del horario. Si algo no se entiende con seguridad, no se emite.
 */

const sinTildes = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/** Palabras del sector → subtipo de schema.org. El orden importa: gana la primera que aparezca. */
const TIPOS: readonly [RegExp, string][] = [
  [/peluquer|barber/, 'HairSalon'],
  [/\bunas\b|manicur/, 'NailSalon'],
  [/estetica|belleza|spa\b/, 'BeautySalon'],
  [/dentist|dental|odontolog/, 'Dentist'],
  [/fisioterap|fisio\b/, 'Physiotherapy'],
  [/veterinar/, 'VeterinaryCare'],
  [/optica|optico/, 'Optician'],
  [/farmacia/, 'Pharmacy'],
  [/gimnasio|gym|entrenador|crossfit|pilates|yoga/, 'ExerciseGym'],
  [/panader|pasteler|obrador/, 'Bakery'],
  [/cafeteria|\bcafe\b/, 'CafeOrCoffeeShop'],
  [/restaurante|pizzer|marisquer|asador|tapas|\bcomidas\b/, 'Restaurant'],
  [/\bbar\b|\bpub\b|cervecer/, 'BarOrPub'],
  [/hotel|hostal/, 'Hotel'],
  [/casa rural|apartamento|alojamiento/, 'LodgingBusiness'],
  [/taller|mecanic|chapa|neumatic/, 'AutoRepair'],
  [/fontaner/, 'Plumber'],
  [/electricist/, 'Electrician'],
  [/cerrajer/, 'Locksmith'],
  [/pintor|pintura/, 'HousePainter'],
  [/abogad|despacho legal|juridic/, 'LegalService'],
  [/gestoria|asesoria|contab|fiscal/, 'AccountingService'],
  [/inmobiliaria/, 'RealEstateAgent'],
  [/floristeria|flores/, 'Florist'],
  [/libreria/, 'BookStore'],
  [/tienda|boutique|comercio/, 'Store'],
];

export function tipoNegocio(sector: string): string {
  const s = sinTildes(sector);
  return TIPOS.find(([re]) => re.test(s))?.[1] ?? 'LocalBusiness';
}

const DIAS: readonly [RegExp, string][] = [
  [/^lun(?:es)?$/, 'Monday'],
  [/^mar(?:tes)?$/, 'Tuesday'],
  [/^mie(?:rcoles)?$/, 'Wednesday'],
  [/^jue(?:ves)?$/, 'Thursday'],
  [/^vie(?:rnes)?$/, 'Friday'],
  [/^sab(?:ados?)?$/, 'Saturday'],
  [/^dom(?:ingos?)?$/, 'Sunday'],
];
const ORDEN = DIAS.map(([, d]) => d);
const dia = (palabra: string) => DIAS.find(([re]) => re.test(palabra.replace(/\.$/, '')))?.[1];

/** «lunes a viernes», «lunes, martes y jueves», «sábados» → días en inglés de schema.org; null si sobra algo. */
function leerDias(txt: string): string[] | null {
  const palabras = txt.replace(/-/g, ' - ').split(/[\s,:/]+/).filter(Boolean);
  const dias: string[] = [];
  let rango = false;
  for (const p of palabras) {
    if (p === 'a' || p === 'al' || p === 'hasta' || p === '-') {
      if (!dias.length) return null;
      rango = true;
      continue;
    }
    if (p === 'y' || p === 'de') continue;
    const d = dia(p);
    if (!d) return null;
    if (rango) {
      const desde = ORDEN.indexOf(dias[dias.length - 1]!);
      const hasta = ORDEN.indexOf(d);
      if (hasta <= desde) return null;
      dias.push(...ORDEN.slice(desde + 1, hasta + 1));
      rango = false;
    } else dias.push(d);
  }
  return dias.length && !rango ? dias : null;
}

const hora = (h: string, m?: string) => {
  const n = Number(h);
  const mm = Number(m ?? 0);
  return (n < 24 || (n === 24 && mm === 0)) && mm < 60 ? `${String(n).padStart(2, '0')}:${String(mm).padStart(2, '0')}` : null;
};

/** «9:30 – 14:00 y 17:00 – 20:00» → tramos; null si sobra algo. */
function leerHoras(txt: string): [string, string][] | null {
  const re = /(\d{1,2})(?:[:.h](\d{2}))?\s*h?\s*(?:-|a|hasta)\s*(\d{1,2})(?:[:.h](\d{2}))?\s*h?/g;
  const tramos: [string, string][] = [];
  let resto = txt;
  for (const m of txt.matchAll(re)) {
    const abre = hora(m[1]!, m[2]);
    const cierra = hora(m[3]!, m[4]);
    if (!abre || !cierra) return null;
    tramos.push([abre, cierra]);
    resto = resto.replace(m[0], ' ');
  }
  return tramos.length && /^[\s,y.]*$/.test(resto) ? tramos : null;
}

/**
 * Horario escrito a mano → `openingHoursSpecification`. Una línea por grupo de días
 * («Lunes a viernes: 9:30 – 20:00»). Las líneas de cerrado quitan esos días de los tramos
 * («Lunes a viernes: 9-14» + «Miércoles: cerrado» → sin miércoles); las de festivos o cita previa
 * se ignoran. Si alguna otra línea no se entiende, no se emite nada (un horario a medias
 * confundiría a los buscadores).
 */
export function horarioSchema(horario: string): Record<string, unknown>[] | undefined {
  const lineas = sinTildes(horario).replace(/[–—]/g, '-').split('\n').map((l) => l.trim()).filter(Boolean);
  const tramos: { dias: string[]; opens: string; closes: string }[] = [];
  const cerrados = new Set<string>();
  for (const l of lineas) {
    if (/cerrado/.test(l)) {
      for (const d of leerDias(l.replace(/cerrados?.*$/, '')) ?? []) cerrados.add(d);
      continue;
    }
    if (/festivo|vacaciones|cita previa/.test(l)) continue;
    const corte = l.search(/\d/);
    if (corte <= 0) return undefined;
    const dias = leerDias(l.slice(0, corte));
    const horas = leerHoras(l.slice(corte));
    if (!dias || !horas) return undefined;
    for (const [opens, closes] of horas) tramos.push({ dias, opens, closes });
  }
  const salida = tramos
    .map(({ dias, opens, closes }) => ({ dias: dias.filter((d) => !cerrados.has(d)), opens, closes }))
    .filter((t) => t.dias.length)
    .map(({ dias, opens, closes }) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: dias, opens, closes }));
  return salida.length ? salida : undefined;
}

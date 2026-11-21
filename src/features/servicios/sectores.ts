// Textos de partida por sector para el estudio de webs (/servicios/web). El cliente escribe a qué
// se dedica y la web sale ya con frase de presentación, «Quiénes somos» y servicios, que luego puede
// cambiar. Sin servicios externos ni coste por uso: es una tabla. Añadir un sector es añadir una
// entrada en SECTORES_WEB; `claves` son raíces sin tildes que se buscan en lo que escribe el cliente.
import type { ServicioWeb } from './webs';

export interface SectorWeb {
  id: string;
  nombre: string;
  claves: string[];
  /** Frase de presentación sin lugar; se añade «en <lugar>» si la dirección lo dice. */
  lema: string;
  sobre: string;
  servicios: [string, string][];
}

export const SECTORES_WEB: SectorWeb[] = [
  {
    id: 'peluqueria',
    nombre: 'Peluquería',
    claves: ['pelu', 'barber', 'estilis', 'cabello'],
    lema: 'Cortes, color y peinados con cita',
    sobre:
      'En {negocio} cuidamos tu pelo con tiempo y sin prisas. Trabajamos con cita para que no tengas que esperar.\n\nCuéntanos qué buscas y te aconsejamos lo que mejor te va.',
    servicios: [
      ['Corte y peinado', 'Lavado, corte y secado a tu gusto.'],
      ['Color', 'Tinte, mechas o reflejos.'],
      ['Recogidos', 'Para bodas, comuniones y eventos.'],
      ['Tratamientos', 'Hidratación y reparación del cabello.'],
    ],
  },
  {
    id: 'estetica',
    nombre: 'Centro de estética',
    claves: ['estetic', 'belleza', 'unas', 'manicur', 'depila', 'masaj', 'spa'],
    lema: 'Tu momento de cuidado, con cita y sin esperas',
    sobre:
      'En {negocio} te dedicamos el tiempo que necesitas: tratamientos faciales y corporales, manos y depilación.\n\nPide tu cita y te atendemos en un espacio tranquilo.',
    servicios: [
      ['Tratamientos faciales', 'Limpieza e hidratación según tu piel.'],
      ['Manicura y pedicura', 'Esmaltado normal o semipermanente.'],
      ['Depilación', 'Cera o láser, por zonas.'],
      ['Masajes', 'Relajantes y descontracturantes.'],
    ],
  },
  {
    id: 'bar',
    nombre: 'Bar y restaurante',
    claves: ['bar', 'restaur', 'cafeter', 'tapas', 'mesón', 'meson', 'tasca', 'pizzer', 'comida', 'cocina', 'taberna', 'bistro'],
    lema: 'Cocina casera y buen ambiente',
    sobre:
      'En {negocio} cocinamos cada día con producto de temporada. Ven a comer, a tomar algo o llévatelo a casa.\n\nReserva tu mesa por teléfono o WhatsApp.',
    servicios: [
      ['Menú del día', 'De lunes a viernes, con postre o café.'],
      ['Carta', 'Platos para compartir y raciones.'],
      ['Para llevar', 'Haz tu pedido y pásate a recogerlo.'],
      ['Grupos y celebraciones', 'Menús cerrados para comidas y cenas.'],
    ],
  },
  {
    id: 'fontaneria',
    nombre: 'Fontanería',
    claves: ['fontan', 'calefac', 'caldera', 'gas'],
    lema: 'Fontanería y calefacción: averías y obras, con presupuesto sin compromiso',
    sobre:
      'En {negocio} arreglamos fugas, atascos y averías, y hacemos instalaciones nuevas de agua y calefacción.\n\nTe damos presupuesto antes de empezar y cumplimos el plazo.',
    servicios: [
      ['Averías y urgencias', 'Fugas, atascos y roturas.'],
      ['Calderas y calefacción', 'Instalación, revisión y mantenimiento.'],
      ['Reformas de baño', 'Cambio de bañera por plato de ducha y sanitarios.'],
      ['Instalaciones', 'Agua fría y caliente, desagües.'],
    ],
  },
  {
    id: 'electricidad',
    nombre: 'Electricidad',
    claves: ['electric', 'instalador', 'solar', 'fotovolt', 'domotic'],
    lema: 'Instalaciones eléctricas, averías y boletines',
    sobre:
      'En {negocio} hacemos instalaciones eléctricas para viviendas y locales, reparamos averías y tramitamos boletines.\n\nPresupuesto claro y trabajo garantizado.',
    servicios: [
      ['Averías', 'Diagnóstico y reparación.'],
      ['Instalaciones nuevas', 'Viviendas, locales y reformas.'],
      ['Boletines', 'Certificados para alta o aumento de potencia.'],
      ['Iluminación', 'Cambio a LED y puntos de luz.'],
    ],
  },
  {
    id: 'reformas',
    nombre: 'Reformas',
    claves: ['reform', 'obra', 'albañil', 'albanil', 'construc', 'pintor', 'pintura', 'carpint', 'cerrajer'],
    lema: 'Reformas de cocinas, baños y viviendas completas',
    sobre:
      'En {negocio} nos encargamos de tu reforma de principio a fin: medimos, presupuestamos y cumplimos los plazos.\n\nVisitamos la obra y te damos presupuesto sin compromiso.',
    servicios: [
      ['Cocinas', 'Diseño, muebles e instalación.'],
      ['Baños', 'Plato de ducha, alicatado y sanitarios.'],
      ['Reforma integral', 'Viviendas y locales completos.'],
      ['Pintura', 'Interiores y fachadas.'],
    ],
  },
  {
    id: 'taller',
    nombre: 'Taller mecánico',
    claves: ['taller', 'mecanic', 'automo', 'coche', 'neumat', 'chapa', 'moto'],
    lema: 'Mantenimiento y reparación de tu coche, con presupuesto previo',
    sobre:
      'En {negocio} revisamos y reparamos tu coche de cualquier marca. Te decimos qué necesita y cuánto cuesta antes de tocarlo.\n\nPide cita y te lo tenemos listo cuanto antes.',
    servicios: [
      ['Revisión y mantenimiento', 'Aceite, filtros y puesta a punto.'],
      ['Pre-ITV', 'Lo dejamos listo para pasar la inspección.'],
      ['Neumáticos', 'Cambio, equilibrado y alineación.'],
      ['Diagnosis', 'Lectura de averías electrónica.'],
    ],
  },
  {
    id: 'salud',
    nombre: 'Clínica y salud',
    claves: ['fisio', 'clinic', 'dent', 'medic', 'psicolog', 'podolog', 'nutric', 'optic', 'osteop', 'logoped', 'terapia', 'salud'],
    lema: 'Atención cercana y profesional, con cita previa',
    sobre:
      'En {negocio} te escuchamos y te explicamos cada paso del tratamiento. Cada caso es distinto y lo tratamos así.\n\nPide tu primera cita y resolvemos tus dudas.',
    servicios: [
      ['Primera consulta', 'Valoración y plan de tratamiento.'],
      ['Tratamientos', 'Sesiones adaptadas a cada persona.'],
      ['Seguimiento', 'Revisamos tu evolución.'],
      ['Consejos para casa', 'Pautas para continuar entre sesiones.'],
    ],
  },
  {
    id: 'deporte',
    nombre: 'Gimnasio y deporte',
    claves: ['gimnas', 'gym', 'entrenad', 'pilates', 'yoga', 'crossfit', 'deport', 'fitness', 'baile', 'danza', 'artes marciales'],
    lema: 'Entrena a tu ritmo, con quien sabe guiarte',
    sobre:
      'En {negocio} entrenamos en grupos reducidos y con seguimiento, para que avances sin lesiones.\n\nVen a probar una clase y te contamos cómo trabajamos.',
    servicios: [
      ['Clases en grupo', 'Horarios de mañana y tarde.'],
      ['Entrenamiento personal', 'Plan a tu medida.'],
      ['Clase de prueba', 'Para que nos conozcas.'],
      ['Bonos', 'Mensual o por sesiones.'],
    ],
  },
  {
    id: 'academia',
    nombre: 'Academia y clases',
    claves: ['academ', 'clases', 'profesor', 'idioma', 'ingles', 'refuerzo', 'autoescuela', 'musica', 'formacion', 'escuela'],
    lema: 'Clases en grupos reducidos, con seguimiento',
    sobre:
      'En {negocio} preparamos a cada alumno según su nivel y su objetivo, en grupos pequeños.\n\nInfórmate de horarios y plazas disponibles.',
    servicios: [
      ['Clases en grupo', 'Pocos alumnos por clase.'],
      ['Clases particulares', 'A tu ritmo y en tu horario.'],
      ['Preparación de exámenes', 'Repaso y simulacros.'],
      ['Prueba de nivel', 'Para empezar en el grupo adecuado.'],
    ],
  },
  {
    id: 'asesoria',
    nombre: 'Asesoría',
    claves: ['asesor', 'gestor', 'abogad', 'contab', 'fiscal', 'laboral', 'legal', 'seguros', 'inmobiliar', 'notar'],
    lema: 'Te lo explicamos claro y nos ocupamos del papeleo',
    sobre:
      'En {negocio} atendemos a particulares, autónomos y empresas. Te explicamos tus opciones sin tecnicismos y nos ocupamos de los trámites.\n\nPide una primera consulta.',
    servicios: [
      ['Autónomos', 'Altas, impuestos trimestrales y contabilidad.'],
      ['Empresas', 'Contabilidad, nóminas y cuentas anuales.'],
      ['Particulares', 'Declaración de la renta y herencias.'],
      ['Consultas', 'Resolvemos tus dudas concretas.'],
    ],
  },
  {
    id: 'tienda',
    nombre: 'Tienda',
    claves: ['tienda', 'comercio', 'boutique', 'moda', 'ropa', 'zapater', 'floris', 'ferreter', 'libreri', 'regalo', 'jugueter', 'papeler', 'joyer'],
    lema: 'Tu tienda de confianza, con atención de siempre',
    sobre:
      'En {negocio} elegimos cada producto pensando en nuestros clientes y te asesoramos sin prisas.\n\nPásate a vernos o escríbenos y te reservamos lo que necesites.',
    servicios: [
      ['Asesoramiento', 'Te ayudamos a elegir.'],
      ['Encargos', 'Pedimos lo que no tengamos.'],
      ['Reservas', 'Te lo guardamos para recoger.'],
      ['Envíos', 'Consulta si llegamos a tu zona.'],
    ],
  },
  {
    id: 'alimentacion',
    nombre: 'Alimentación',
    claves: ['panader', 'pasteler', 'carnicer', 'pescader', 'fruter', 'charcuter', 'obrador', 'ultramarinos', 'vinos', 'bodega'],
    lema: 'Producto fresco y de calidad, cada día',
    sobre:
      'En {negocio} trabajamos con producto fresco y te atendemos como en las tiendas de siempre.\n\nHaz tu encargo por teléfono o WhatsApp y lo tenemos listo.',
    servicios: [
      ['Producto del día', 'Fresco y de temporada.'],
      ['Encargos', 'Para comidas, fiestas y celebraciones.'],
      ['Para llevar', 'Listo para recoger.'],
      ['Reparto', 'Consulta si llegamos a tu zona.'],
    ],
  },
  {
    id: 'limpieza',
    nombre: 'Limpieza',
    claves: ['limpiez', 'lavander', 'tintorer', 'cuidado de mayores', 'cuidador', 'domestic'],
    lema: 'Limpieza de hogares, oficinas y comunidades',
    sobre:
      'En {negocio} limpiamos con personal de confianza y productos adecuados para cada superficie.\n\nTe damos presupuesto según lo que necesites, por horas o por servicio.',
    servicios: [
      ['Hogares', 'Limpieza periódica o puntual.'],
      ['Oficinas y locales', 'En el horario que te venga bien.'],
      ['Comunidades', 'Portales, escaleras y garajes.'],
      ['Fin de obra', 'Dejamos todo listo para entrar.'],
    ],
  },
  {
    id: 'mascotas',
    nombre: 'Mascotas',
    claves: ['veterin', 'mascota', 'canin', 'perro', 'gato', 'peluqueria canina', 'residencia canina'],
    lema: 'Cuidamos de tu mascota como si fuera nuestra',
    sobre:
      'En {negocio} tratamos a cada animal con paciencia y cariño, y te explicamos todo lo que necesitas saber.\n\nPide cita por teléfono o WhatsApp.',
    servicios: [
      ['Consulta', 'Revisión y diagnóstico.'],
      ['Vacunas', 'Calendario completo.'],
      ['Peluquería', 'Baño, corte y uñas.'],
      ['Alimentación', 'Te aconsejamos la dieta adecuada.'],
    ],
  },
  {
    id: 'alojamiento',
    nombre: 'Alojamiento',
    claves: ['hotel', 'hostal', 'casa rural', 'apartament', 'albergue', 'turismo', 'pension', 'camping'],
    lema: 'Descansa como en casa',
    sobre:
      'En {negocio} te recibimos con habitaciones cómodas y un trato cercano. Te recomendamos qué ver y dónde comer.\n\nEscríbenos para consultar disponibilidad.',
    servicios: [
      ['Habitaciones', 'Dobles, individuales y familiares.'],
      ['Desayuno', 'Casero, para empezar bien el día.'],
      ['Escapadas', 'Te ayudamos a planear tu visita.'],
      ['Estancias largas', 'Precio especial por semanas.'],
    ],
  },
  {
    id: 'fotografia',
    nombre: 'Fotografía y eventos',
    claves: ['fotograf', 'video', 'evento', 'boda', 'wedding', 'dj', 'animac', 'catering'],
    lema: 'Tus momentos importantes, bien contados',
    sobre:
      'En {negocio} preparamos cada encargo contigo para que el día salga como lo imaginas.\n\nCuéntanos la fecha y te enviamos propuesta y presupuesto.',
    servicios: [
      ['Bodas', 'Reportaje completo del día.'],
      ['Eventos', 'Comuniones, bautizos y celebraciones.'],
      ['Empresas', 'Fotos de producto y equipo.'],
      ['Sesiones', 'Retratos y familia.'],
    ],
  },
];

/** Para cualquier otro sector: textos neutros que sirven a casi todos. */
export const SECTOR_GENERICO: SectorWeb = {
  id: 'otro',
  nombre: '',
  claves: [],
  lema: 'Servicio cercano y profesional',
  sobre:
    'En {negocio} atendemos cada encargo con cuidado y te explicamos todo antes de empezar.\n\nEscríbenos o llámanos y te contestamos lo antes posible.',
  servicios: [
    ['Presupuesto sin compromiso', 'Cuéntanos qué necesitas.'],
    ['Atención personal', 'Te atiende siempre alguien del equipo.'],
    ['Trabajo garantizado', 'Si algo no está bien, lo arreglamos.'],
  ],
};

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
}

/** Textos de partida para un negocio: los del sector que encaje o los genéricos. */
export function textosDeSector(sector: string, negocio: string, direccion = ''): TextosWeb {
  const s = sectorDe(sector) ?? SECTOR_GENERICO;
  const lugar = lugarDe(direccion);
  return {
    lema: lugar ? `${s.lema} en ${lugar}.` : `${s.lema}.`,
    sobre: s.sobre.replaceAll('{negocio}', negocio.trim() || 'nuestro negocio'),
    servicios: s.servicios.map(([nombre, texto]) => ({ nombre, precio: '', texto })),
  };
}

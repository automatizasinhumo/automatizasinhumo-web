/**
 * Páginas «Currículum de <puesto>» (/curriculum/<slug>): una por búsqueda frecuente en España.
 * Cada una trae contenido propio (consejos, perfil de ejemplo, habilidades y preguntas) y tres
 * diseños que leen bien los ATS, enlazados al estudio con el diseño ya elegido.
 */
import { DISENOS_ATS, DISENOS_CV } from './cv';
import type { PreguntaSector } from './faqSector';

export interface PuestoCv {
  slug: string;
  /** Nombre corto para enlaces y migas: «Camarero». */
  nombre: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  consejos: readonly string[];
  /** Perfil profesional de ejemplo (3-4 líneas), listo para adaptar. */
  perfil: string;
  habilidades: readonly string[];
  /** Ids de DISENOS_CV, todos legibles por ATS. */
  disenos: readonly [string, string, string];
  preguntas: readonly PreguntaSector[];
}

export const PUESTOS_CV: readonly PuestoCv[] = [
  {
    slug: 'camarero',
    nombre: 'Camarero',
    title: 'Currículum de camarero: ejemplo y plantillas para rellenar',
    description: 'Ejemplo de currículum de camarero o camarera con perfil, habilidades y consejos. Elige un diseño, rellena tus datos y descárgalo en PDF.',
    h1: 'Currículum de camarero: ejemplo y plantillas',
    intro: 'En hostelería se contrata rápido y se lee aún más rápido: el encargado mira dónde has trabajado, qué turnos aceptas y si sabes llevar barra, sala o terraza. Un CV de una página, claro y con lo práctico arriba, gana a uno bonito pero largo.',
    consejos: [
      'Pon arriba tu disponibilidad: fines de semana, noches, temporada de verano o jornada partida.',
      'Detalla lo que sabes hacer: barra, sala, terraza, cafetería, coctelería, banquetes o comandas con TPV.',
      'Incluye el carné de manipulador de alimentos y los idiomas con su nivel real; en zonas turísticas pesan mucho.',
      'Cuantifica cuando puedas: mesas atendidas por turno, aforo del local o eventos de cuántas personas.',
      'Si no tienes experiencia en hostelería, destaca trato con el público, rapidez y trabajo en equipo de otros empleos.',
    ],
    perfil: 'Camarero con 4 años de experiencia en sala y barra en restaurantes de hasta 120 cubiertos. Rápido con comandas en TPV, cafetería y coctelería básica. Disponibilidad completa para fines de semana y temporada de verano. Inglés B2 para atender a clientes extranjeros.',
    habilidades: ['Servicio en sala y barra', 'TPV y comandas digitales', 'Cafetería y coctelería básica', 'Manipulador de alimentos', 'Atención al cliente en inglés', 'Trabajo bajo presión', 'Montaje de banquetes'],
    disenos: ['onyx', 'aurora', 'kakuna'],
    preguntas: [
      { pregunta: '¿Pongo foto en el currículum de camarero?', respuesta: 'En hostelería es habitual y suele ayudar, porque el puesto es de cara al público. Usa una foto reciente, de frente, con buena luz y fondo neutro.' },
      { pregunta: '¿Cuántas páginas debe tener?', respuesta: 'Una. Si tienes muchos trabajos, deja los últimos y los más parecidos al puesto, y agrupa el resto en una línea.' },
      { pregunta: '¿Qué pongo si solo he trabajado en verano?', respuesta: 'Pon cada temporada como un empleo, con el local, los meses y lo que hacías. Varias temporadas seguidas demuestran que te vuelven a llamar.' },
    ],
  },
  {
    slug: 'dependienta',
    nombre: 'Dependienta',
    title: 'Currículum de dependienta o dependiente: ejemplo y plantillas',
    description: 'Ejemplo de currículum de dependienta o dependiente de tienda con perfil, habilidades y consejos. Elige un diseño, rellénalo y descárgalo en PDF.',
    h1: 'Currículum de dependienta: ejemplo y plantillas',
    intro: 'Las tiendas buscan a alguien que venda, cuide el género y aguante los picos de trabajo de rebajas y Navidad. Tu CV tiene que demostrarlo en pocas líneas: qué tipo de tienda, qué tareas y qué resultados.',
    consejos: [
      'Di en qué tipo de comercio has trabajado: moda, alimentación, electrónica, perfumería, gran superficie o tienda de barrio.',
      'Nombra las tareas reales: caja y cierre, reposición, escaparatismo, inventario, probadores o pedidos online.',
      'Si tuviste objetivos de venta, pon cifras: ticket medio, ventas cruzadas o tarjetas de fidelización.',
      'Indica tu disponibilidad para campañas (rebajas, Navidad, Black Friday) y para trabajar en otros centros.',
      'Adapta el perfil a cada tienda: no es lo mismo una cadena de moda que una ferretería.',
    ],
    perfil: 'Dependienta con 3 años de experiencia en tiendas de moda de cadena. Manejo de caja y cierre, reposición, visual merchandising y atención en probadores. Superé el objetivo de ventas de tienda en las campañas de Navidad de 2024 y 2025. Disponible para campañas y para cambiar de centro.',
    habilidades: ['Atención al cliente', 'Caja y cuadre de cierre', 'Reposición e inventario', 'Visual merchandising', 'Venta cruzada', 'Gestión de devoluciones', 'Pedidos online y click & collect'],
    disenos: ['aurora', 'chikorita', 'lapras'],
    preguntas: [
      { pregunta: '¿Debo poner las tiendas aunque sean de la misma cadena?', respuesta: 'Sí, agrupadas: la cadena una vez y debajo los centros o los cambios de puesto. Así se ve tu progreso sin repetir.' },
      { pregunta: '¿Es mejor un diseño con color?', respuesta: 'En comercio y moda un toque de color ayuda a que se te recuerde. Todos los diseños de esta página leen bien en los filtros automáticos.' },
      { pregunta: '¿Qué hago si no tengo experiencia en tiendas?', respuesta: 'Cuenta cualquier trabajo de trato con el público (hostelería, voluntariado, eventos) y pon tu disponibilidad bien visible.' },
    ],
  },
  {
    slug: 'administrativo',
    nombre: 'Administrativo',
    title: 'Currículum de administrativo: ejemplo, habilidades y plantillas',
    description: 'Ejemplo de currículum de administrativo o auxiliar administrativo con perfil, programas y consejos. Elige un diseño y descárgalo en PDF.',
    h1: 'Currículum de administrativo: ejemplo y plantillas',
    intro: 'Para un puesto de oficina el CV es tu primera muestra de orden. Lo leen personas y también programas que filtran por palabras clave, así que conviene nombrar los programas y las tareas tal como aparecen en la oferta.',
    consejos: [
      'Lista los programas con nombre propio: Excel (tablas dinámicas, BUSCARV), A3, Sage, SAP, Holded o el ERP que uses.',
      'Separa tareas por área: facturación, contabilidad, nóminas, compras, atención telefónica o gestión documental.',
      'Si tienes el ciclo de Gestión Administrativa o Administración y Finanzas, ponlo arriba en formación.',
      'Repite en tu perfil dos o tres palabras de la oferta: los ATS las buscan literalmente.',
      'Usa un diseño sobrio y de lectura limpia; en oficina se valora más que la decoración.',
    ],
    perfil: 'Administrativa con 5 años de experiencia en facturación, conciliación bancaria y gestión de proveedores en una pyme de distribución. Excel avanzado (tablas dinámicas y BUSCARV), A3 y SAP Business One. Técnico Superior en Administración y Finanzas.',
    habilidades: ['Facturación y cobros', 'Conciliación bancaria', 'Excel avanzado', 'A3 / Sage / SAP', 'Gestión documental', 'Atención telefónica', 'Archivo y protección de datos'],
    disenos: ['rhyhorn', 'scizor', 'onyx'],
    preguntas: [
      { pregunta: '¿Cómo pongo el nivel de Excel?', respuesta: 'Mejor con ejemplos que con barras o estrellas: «tablas dinámicas, BUSCARV, macros sencillas». Es lo que entiende un ATS y lo que se puede comprobar.' },
      { pregunta: '¿Una columna o dos?', respuesta: 'Las dos funcionan si el diseño está medido para ATS, como los de esta página. Una columna es la opción más segura si envías a muchas empresas grandes.' },
      { pregunta: '¿Pongo las prácticas del ciclo?', respuesta: 'Sí, como experiencia, con la empresa, los meses y las tareas. Si es tu único empleo, son lo más importante del CV.' },
    ],
  },
  {
    slug: 'sin-experiencia',
    nombre: 'Sin experiencia',
    title: 'Currículum sin experiencia: ejemplo y plantillas para tu primer empleo',
    description: 'Cómo hacer un currículum sin experiencia laboral: qué poner, ejemplo de perfil y plantillas listas para rellenar y descargar en PDF.',
    h1: 'Currículum sin experiencia: cómo hacerlo y ejemplo',
    intro: 'Todo el mundo empezó sin experiencia. Un primer CV no se juzga por los empleos, sino por lo que demuestra: formación, prácticas, voluntariado, idiomas y ganas. La clave es ordenar eso para que se lea en diez segundos.',
    consejos: [
      'Empieza por un perfil de dos o tres líneas: qué estudias o has estudiado y qué tipo de trabajo buscas.',
      'Pon la formación arriba, con prácticas, proyectos de clase o trabajos de fin de ciclo o de grado.',
      'Cuenta el voluntariado, los trabajos de verano, las clases particulares o el cuidado de niños: todo eso es experiencia.',
      'Añade idiomas, carné de conducir, cursos y certificados (manipulador de alimentos, ofimática, PRL).',
      'Elige un diseño de una página con la formación destacada y no rellenes huecos con texto vacío.',
    ],
    perfil: 'Recién titulada en el ciclo de Comercio Internacional, con prácticas de tres meses en el departamento de exportación de una empresa agroalimentaria. Inglés C1 y francés B1. Busco mi primer empleo en logística o atención al cliente internacional.',
    habilidades: ['Ganas de aprender', 'Trabajo en equipo', 'Ofimática (Word, Excel)', 'Idiomas', 'Puntualidad y organización', 'Comunicación', 'Carné de conducir B'],
    disenos: ['leafish', 'brisa', 'rhyhorn'],
    preguntas: [
      { pregunta: '¿Qué pongo en experiencia si no tengo ninguna?', respuesta: 'Prácticas, voluntariado, trabajos de verano o proyectos de clase. Si de verdad no hay nada, quita el apartado y amplía formación, idiomas y cursos.' },
      { pregunta: '¿Pongo la nota media?', respuesta: 'Solo si es alta o te la piden. Es más útil contar un proyecto o unas prácticas con lo que aprendiste.' },
      { pregunta: '¿Hace falta carta de presentación?', respuesta: 'Si la oferta deja escribir un mensaje, úsalo: tres frases sobre por qué te interesa ese puesto valen más que una carta genérica.' },
    ],
  },
  {
    slug: 'ats',
    nombre: 'CV para ATS',
    title: 'Currículum ATS: plantillas que leen los filtros automáticos',
    description: 'Plantillas de currículum compatibles con ATS, medidas con extractores de PDF reales. Qué es un ATS, qué lo confunde y cómo preparar tu CV.',
    h1: 'Currículum ATS: plantillas que pasan los filtros',
    intro: 'Muchas empresas y portales de empleo pasan los CV por un ATS, un programa que extrae el texto y lo compara con la oferta. Si tu PDF se lee mal, nadie llega a verlo. Nuestros diseños ATS se han medido extrayendo el texto del PDF con dos lectores distintos.',
    consejos: [
      'Usa títulos de apartado normales: «Experiencia», «Formación», «Idiomas». Los nombres creativos confunden al programa.',
      'Copia de la oferta las palabras clave que cumplas (programas, titulaciones, tareas) y ponlas en tu perfil y en tus empleos.',
      'No metas texto importante dentro de imágenes ni en tablas; tus datos de contacto tienen que ser texto.',
      'Pon las fechas con un formato coherente (mes y año) y el puesto antes que la empresa.',
      'Envía el PDF que genera el estudio: el texto se puede seleccionar y copiar, que es lo que necesita un ATS.',
    ],
    perfil: 'Técnico de logística con 6 años de experiencia en gestión de almacén, control de inventario y planificación de rutas. SAP MM, Excel avanzado y carné de carretillero. Reduje un 15 % las roturas de stock con un nuevo sistema de reposición.',
    habilidades: ['Palabras clave de la oferta', 'Títulos de apartado estándar', 'Fechas coherentes', 'Texto seleccionable', 'Sin tablas ni imágenes con texto', 'Perfil con logros medibles'],
    disenos: ['rhyhorn', 'azurill', 'ditto'],
    preguntas: [
      { pregunta: '¿Qué es un ATS?', respuesta: 'Un sistema de seguimiento de candidatos: el programa con el que la empresa recibe los CV, extrae su texto y los ordena según la oferta.' },
      { pregunta: '¿Un diseño con color puede ser ATS?', respuesta: 'Sí. Lo que importa es que el texto se extraiga en orden, no el color. Por eso medimos cada diseño en lugar de suponerlo.' },
      { pregunta: '¿Cómo sé si mi CV se lee bien?', respuesta: 'Abre el PDF, selecciona todo el texto y pégalo en un bloc de notas. Si sale en orden y completo, un ATS lo leerá.' },
    ],
  },
  {
    slug: 'auxiliar-enfermeria',
    nombre: 'Auxiliar de enfermería',
    title: 'Currículum de auxiliar de enfermería (TCAE): ejemplo y plantillas',
    description: 'Ejemplo de currículum de auxiliar de enfermería o TCAE con perfil, competencias y consejos para hospitales, residencias y bolsas de empleo.',
    h1: 'Currículum de auxiliar de enfermería (TCAE)',
    intro: 'En sanidad y en residencias el CV se revisa con lupa: titulación, centros, unidades y disponibilidad. Las bolsas de empleo valoran además la formación complementaria, así que conviene tenerla ordenada y con horas.',
    consejos: [
      'Pon el título de Técnico en Cuidados Auxiliares de Enfermería arriba, con el centro y el año.',
      'Indica centros y unidades: planta, urgencias, quirófano, geriatría, salud mental o atención domiciliaria.',
      'Añade los cursos con sus horas (movilización de pacientes, primeros auxilios, demencias): suman en bolsas.',
      'Deja clara tu disponibilidad para turnos rotatorios, noches y sustituciones.',
      'Usa un diseño sobrio y legible; en sanidad se valora la claridad.',
    ],
    perfil: 'TCAE con 4 años de experiencia en residencias de mayores y planta de medicina interna. Higiene y movilización de pacientes, toma de constantes y apoyo en la administración de dietas. Disponibilidad para turnos rotatorios y noches.',
    habilidades: ['Higiene y confort del paciente', 'Movilización y transferencias', 'Toma de constantes', 'Atención geriátrica', 'Esterilización de material', 'Empatía y trato con familias', 'Turnos rotatorios'],
    disenos: ['kakuna', 'tinta', 'rhyhorn'],
    preguntas: [
      { pregunta: '¿Pongo las horas de cada curso?', respuesta: 'Sí. En muchas bolsas de empleo se puntúan por horas, y así quien lee el CV ve de un vistazo tu formación.' },
      { pregunta: '¿Incluyo las prácticas del ciclo?', respuesta: 'Sí, como experiencia, con el centro, la unidad y las semanas. Si son recientes, son de lo que más se mira.' },
      { pregunta: '¿Hace falta foto?', respuesta: 'No es obligatoria. Si la pones, que sea profesional; si no, el CV queda igual de completo.' },
    ],
  },
  {
    slug: 'repartidor',
    nombre: 'Repartidor',
    title: 'Currículum de repartidor o conductor: ejemplo y plantillas',
    description: 'Ejemplo de currículum de repartidor, mozo o conductor de reparto con carnés, perfil y consejos. Elige un diseño y descárgalo en PDF.',
    h1: 'Currículum de repartidor: ejemplo y plantillas',
    intro: 'En reparto y logística lo primero que se busca es el carné, la zona y la disponibilidad. Un CV corto, con esos datos a la vista y tus empleos anteriores, es lo que más rápido consigue una llamada.',
    consejos: [
      'Pon tus carnés arriba: B, C, C+E, CAP, ADR o carretillero, con la fecha si es reciente.',
      'Di si tienes vehículo propio y en qué zona conoces bien las calles o los polígonos.',
      'Cuenta cuántos repartos hacías al día y con qué aplicación o PDA trabajabas.',
      'Incluye la disponibilidad horaria: mañanas, tardes, fines de semana o campañas.',
      'Si cargas y descargas, menciona prevención de riesgos y manejo de transpaleta.',
    ],
    perfil: 'Repartidor con 3 años de experiencia en paquetería de última milla, con 120 entregas diarias de media en zona urbana. Carné B y furgoneta propia. Manejo de PDA y aplicaciones de ruta. Disponible para campañas y sábados.',
    habilidades: ['Carné B', 'Planificación de rutas', 'PDA y apps de reparto', 'Carga y descarga', 'Atención al cliente en la entrega', 'Puntualidad', 'Prevención de riesgos'],
    disenos: ['ditto', 'onyx', 'rhyhorn'],
    preguntas: [
      { pregunta: '¿Pongo los puntos del carné?', respuesta: 'No hace falta. Basta con el tipo de carné y, si tienes CAP o ADR, su vigencia.' },
      { pregunta: '¿Cuenta el reparto como autónomo para plataformas?', respuesta: 'Sí, como experiencia: pon la plataforma, el periodo, la zona y el volumen aproximado de pedidos.' },
      { pregunta: '¿Cuánto texto pongo?', respuesta: 'Poco. Una página con carnés, disponibilidad y empleos es lo ideal en este sector.' },
    ],
  },
  {
    slug: 'recepcionista',
    nombre: 'Recepcionista',
    title: 'Currículum de recepcionista: ejemplo para hotel, clínica u oficina',
    description: 'Ejemplo de currículum de recepcionista de hotel, clínica u oficina con perfil, idiomas y programas. Plantillas listas para rellenar en PDF.',
    h1: 'Currículum de recepcionista: ejemplo y plantillas',
    intro: 'La recepción es la cara de la empresa, y el CV se lee buscando tres cosas: idiomas, programas y trato. Da igual si es un hotel, una clínica o una oficina: ponlas arriba y con detalle.',
    consejos: [
      'Pon los idiomas con nivel (A2-C2) y, si los usas a diario, dilo: «atención diaria en inglés y alemán».',
      'Nombra los programas: Opera, Protel o el PMS del hotel, agendas de citas, centralita o CRM.',
      'Explica tareas concretas: check-in y check-out, reservas, cobros, gestión de quejas o agenda de varios profesionales.',
      'Si tienes formación en turismo, protocolo o atención al cliente, colócala junto al perfil.',
      'Elige un diseño cuidado pero sobrio; refleja la imagen que darás en el mostrador.',
    ],
    perfil: 'Recepcionista de hotel con 5 años de experiencia en establecimientos de 4 estrellas. Check-in y check-out, reservas y cobros en Opera PMS. Inglés C1 y alemán B2 con atención diaria a clientes internacionales. Técnico Superior en Gestión de Alojamientos Turísticos.',
    habilidades: ['Atención al cliente', 'Opera / Protel (PMS)', 'Reservas y cobros', 'Centralita y agenda', 'Gestión de quejas', 'Idiomas', 'Imagen y protocolo'],
    disenos: ['azurill', 'aurora', 'scizor'],
    preguntas: [
      { pregunta: '¿Es importante la foto?', respuesta: 'En recepción de hotel suele pedirse. Si la pones, que sea profesional y reciente; en oficina o clínica es opcional.' },
      { pregunta: '¿Cómo demuestro mis idiomas?', respuesta: 'Con el nivel del Marco Común (B2, C1) y, si lo tienes, el certificado. Añadir dónde los usas a diario les da peso.' },
      { pregunta: '¿Sirve el mismo CV para hotel y para clínica?', respuesta: 'La base sí, pero cambia el perfil y los programas: PMS para hotel, agenda de citas y protección de datos para clínica.' },
    ],
  },
];

const POR_SLUG = new Map(PUESTOS_CV.map((p) => [p.slug, p]));
export const puestoCv = (slug: string | undefined) => (slug ? POR_SLUG.get(slug) : undefined);

/** Enlace al estudio con el diseño ya elegido (el estudio lo lee de ?diseno= y lo limpia). */
export const enlaceEstudioCv = (diseno: string) => `/servicios/cv?diseno=${encodeURIComponent(diseno)}`;

/** Diseños de la página, con su nombre (los ids están comprobados en el test). */
export const disenosDePuesto = (p: PuestoCv) =>
  p.disenos.map((id) => DISENOS_CV.find((d) => d.id === id)).filter((d) => !!d && DISENOS_ATS.has(d.id));

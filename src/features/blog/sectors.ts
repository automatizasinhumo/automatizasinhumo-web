import demosPorProducto from '../../data/demos-producto.json';
import galeria from '../../data/galeria-demos.json';

type ServiceSlug = keyof typeof demosPorProducto;

export interface SectorPage {
  slug: string;
  title: string;
  description: string;
  heading: string;
  introduction: string;
  considerations: readonly string[];
  serviceSlugs: readonly ServiceSlug[];
}

export const SECTORS = [
  {
    slug: 'peluquerias',
    title: 'Web para peluquerías: servicios, horarios y reservas',
    description: 'Una web para peluquerías que explica servicios y horarios, muestra una demo real y facilita que cada cliente reserve o contacte.',
    heading: 'Una web clara para tu peluquería',
    introduction: 'Quien busca peluquería cerca quiere saber qué haces, dónde estás y cómo pedir cita. Una página sencilla puede reunir esa información sin obligar al cliente a buscarla entre publicaciones.',
    considerations: [
      'Separa los servicios y explica qué incluye cada uno; no publiques tarifas que no estén confirmadas.',
      'Muestra ubicación, horario y un botón directo para llamar o pedir cita.',
      'Si las reservas dependen de la duración o del profesional, enlaza un sistema que gestione esa disponibilidad.',
    ],
    serviceSlugs: ['web-una-pagina', 'reservas-salon'],
  },
  {
    slug: 'fontaneros',
    title: 'Web para fontaneros: servicios y avisos de urgencia',
    description: 'Una página para fontaneros con zona de servicio, trabajos habituales y contacto visible, apoyada en una demo real de fontanería.',
    heading: 'Una web práctica para un fontanero',
    introduction: 'En una avería, el cliente necesita saber si atiendes su zona y cómo llamarte. La web debe poner esa respuesta por delante de adornos y formularios largos.',
    considerations: [
      'Enumera trabajos que realizas y deja claro qué servicios no ofreces.',
      'Indica las localidades que cubres y el horario real de atención.',
      'Haz que llamar desde el móvil sea sencillo y explica si el desplazamiento o la urgencia se presupuestan aparte.',
    ],
    serviceSlugs: ['web-taller'],
  },
  {
    slug: 'restaurantes',
    title: 'Web para restaurantes: carta, ubicación y reservas',
    description: 'Una web para restaurantes con acceso a la carta, ubicación y reservas, enlazada con servicios y demos reales de hostelería.',
    heading: 'Una web útil para tu restaurante',
    introduction: 'Antes de desplazarse, los clientes quieren comprobar el menú, el horario y cómo llegar. Una web ordenada reduce dudas y permite actualizar la información cuando cambia.',
    considerations: [
      'Publica una carta legible en móvil y revisa precios y alérgenos cada vez que cambien.',
      'Aclara si se puede reservar mesa, pedir para recoger o solicitar entrega.',
      'Añade dirección, horario y una ruta para llegar; comprueba que coinciden con tu ficha de empresa.',
    ],
    serviceSlugs: ['carta-qr', 'reservas-restaurante'],
  },
  {
    slug: 'abogados',
    title: 'Web para abogados: especialidades y primera consulta',
    description: 'Una web para despachos de abogados que presenta especialidades, ámbito de actuación y vías de contacto con claridad y prudencia.',
    heading: 'Una web profesional para un despacho',
    introduction: 'Una persona que busca asesoramiento necesita entender si el despacho trata su asunto y cómo solicitar una primera conversación. La página debe informar sin prometer resultados legales.',
    considerations: [
      'Describe las áreas de práctica con lenguaje comprensible y evita asegurar resultados.',
      'Indica quién presta el servicio, dónde atiende y cómo se gestiona la primera consulta.',
      'No publiques información identificable de clientes ni detalles de casos sin autorización expresa.',
    ],
    serviceSlugs: ['web-corporativa-5-secciones'],
  },
  {
    slug: 'fisioterapeutas',
    title: 'Web para fisioterapeutas: tratamientos y citas',
    description: 'Una web para fisioterapeutas con tratamientos, ubicación y un camino claro para solicitar cita, apoyada en una demo real del sector.',
    heading: 'Una web cercana para tu consulta de fisioterapia',
    introduction: 'La web ayuda a explicar qué tratamientos ofrece la consulta, quién atiende y cómo pedir cita. La información debe ser precisa y no sustituir una valoración profesional.',
    considerations: [
      'Explica los tratamientos y a qué tipo de consulta corresponden, sin prometer curaciones.',
      'Incluye ubicación, accesibilidad, horarios y la forma de reservar.',
      'Evita recoger datos de salud en formularios generales; solicita solo lo imprescindible y con las garantías adecuadas.',
    ],
    serviceSlugs: ['pagina-citas'],
  },
] as const satisfies readonly SectorPage[];

export interface SectorDemo {
  url: string;
  titulo: string;
  tipo: string;
}

export interface SectorService {
  slug: ServiceSlug;
  name: string;
  price: number;
  deliveryTime: string;
  demos: SectorDemo[];
}

export function getSector(slug: string | undefined): SectorPage | undefined {
  return SECTORS.find((sector) => sector.slug === slug);
}

export function servicesForSector(sector: SectorPage): SectorService[] {
  return sector.serviceSlugs.map((slug) => {
    const catalogEntry = galeria.items.find((item) => item.producto === slug);
    const demos = demosPorProducto[slug];
    if (!catalogEntry || !demos || demos.length === 0) {
      throw new Error(`Missing published service or demo data for "${slug}".`);
    }

    return {
      slug,
      name: catalogEntry.nombre,
      price: catalogEntry.precio,
      deliveryTime: catalogEntry.plazo,
      demos: demos.slice(0, 3),
    };
  });
}

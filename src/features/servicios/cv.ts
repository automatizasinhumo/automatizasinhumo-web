/**
 * Estudio de CV (/servicios/cv): catálogo de diseños y precios en un solo sitio.
 * Precios en céntimos. Provisionales hasta que David los confirme.
 * Las miniaturas salen del propio motor (cv-estudio/miniaturas.mjs), así que lo que se ve
 * en la galería es exactamente lo que el cliente descarga.
 */

import { AUTOSERVICIO, SLUG_CV, SLUG_TARJETA } from './autoservicio';

export type ModalidadCv = 'disenada' | 'personalizable';

export interface PaqueteCv {
  id: ModalidadCv;
  nombre: string;
  precio: number;
  /** Ids públicos del producto y la variante en la tienda (para el carrito). */
  producto: string;
  variante: string;
  resumen: string;
  incluye: readonly string[];
}

const CV = AUTOSERVICIO[SLUG_CV]!;
const variante = (m: ModalidadCv) => {
  const v = CV.variantes?.[m];
  if (!v) throw new Error(`autoservicio.json: falta la variante ${m} del CV`);
  return { nombre: v.etiqueta, precio: v.precio, producto: CV.producto, variante: v.id };
};

export const PAQUETES_CV: Record<ModalidadCv, PaqueteCv> = {
  disenada: {
    id: 'disenada',
    ...variante('disenada'),
    resumen: 'Eliges uno de nuestros diseños y lo rellenas con tus datos.',
    incluye: ['PDF listo para enviar', 'Seis estilos de letra, tamaño y espaciado', 'Tus datos guardados en este navegador', 'Cambios de diseño sin volver a escribir'],
  },
  personalizable: {
    id: 'personalizable',
    ...variante('personalizable'),
    resumen: 'Partes de cualquier diseño y le cambias el color, las formas y el sombreado.',
    incluye: ['Todo lo del diseño listo', 'Color principal y de acento a tu elección', '16 formas, arriba, abajo o en ambos lados', 'Sombreado y fondo a tu gusto'],
  },
};

/** Extras que se compran junto al CV y se publican solos con los mismos datos. */
export interface ExtraCv {
  id: 'tarjeta';
  slug: string;
  nombre: string;
  precio: number;
  producto: string;
  resumen: string;
}
const TARJETA = AUTOSERVICIO[SLUG_TARJETA]!;
export const EXTRAS_CV: readonly ExtraCv[] = [
  {
    id: 'tarjeta',
    slug: SLUG_TARJETA,
    nombre: TARJETA.nombre,
    precio: TARJETA.precio ?? 0,
    producto: TARJETA.producto,
    resumen: 'Tu página de contacto con QR y botón «Guardar contacto», publicada al momento con los datos de tu CV.',
  },
];

export interface DisenoCv {
  /** Identificador de la plantilla en el motor. */
  id: string;
  nombre: string;
  estilo: string;
  /** Sobrio (blanco y negro con un toque) o con bloques de color: lo primero que decide el cliente. */
  tono: 'sobrio' | 'color';
  columnas: 1 | 2;
  /** Plantilla creativa propia del estudio, con dibujo de fondo. */
  creativo?: boolean;
}

/** Los 29 diseños del motor: primero las creativas propias, con nombre propio y una pista de estilo. */
export const DISENOS_CV: readonly DisenoCv[] = [
  { id: 'aurora', nombre: 'Aurora', estilo: 'Ola de color degradada', tono: 'color', columnas: 2, creativo: true },
  { id: 'coral', nombre: 'Coral', estilo: 'Columna con burbujas', tono: 'color', columnas: 2, creativo: true },
  { id: 'cometa', nombre: 'Cometa', estilo: 'Planeta tras tus iniciales', tono: 'color', columnas: 2, creativo: true },
  { id: 'tinta', nombre: 'Tinta', estilo: 'Pinceladas y rotulador', tono: 'color', columnas: 2, creativo: true },
  { id: 'nocturno', nombre: 'Nocturno', estilo: 'Panal degradado oscuro', tono: 'color', columnas: 2, creativo: true },
  { id: 'pixel', nombre: 'Píxel', estilo: 'Píxeles en cascada', tono: 'color', columnas: 2, creativo: true },
  { id: 'lienzo', nombre: 'Lienzo', estilo: 'Arcos sobre papel crema', tono: 'color', columnas: 1, creativo: true },
  { id: 'prisma', nombre: 'Prisma', estilo: 'Diagonales de color', tono: 'color', columnas: 2, creativo: true },
  { id: 'brisa', nombre: 'Brisa', estilo: 'Manchas orgánicas', tono: 'color', columnas: 2, creativo: true },
  { id: 'vertice', nombre: 'Vértice', estilo: 'Franja y nombre gigante', tono: 'color', columnas: 1, creativo: true },
  { id: 'oasis', nombre: 'Oasis', estilo: 'Arco con sol', tono: 'color', columnas: 2, creativo: true },
  { id: 'zafiro', nombre: 'Zafiro', estilo: 'Columna oscura a rayas', tono: 'color', columnas: 2, creativo: true },
  { id: 'mosaico', nombre: 'Mosaico', estilo: 'Mosaico y tarjetas', tono: 'color', columnas: 1, creativo: true },
  { id: 'trazo', nombre: 'Trazo', estilo: 'Trazos a mano alzada', tono: 'color', columnas: 1, creativo: true },
  { id: 'retrato', nombre: 'Retrato', estilo: 'Foto grande en columna oscura', tono: 'color', columnas: 2, creativo: true },
  { id: 'arcada', nombre: 'Arcada', estilo: 'Foto en arco y papel crema', tono: 'color', columnas: 2, creativo: true },
  { id: 'foco', nombre: 'Foco', estilo: 'Banda oscura con foto', tono: 'color', columnas: 2, creativo: true },
  { id: 'editorial', nombre: 'Editorial', estilo: 'Portada de revista con foto', tono: 'color', columnas: 1, creativo: true },
  { id: 'onyx', nombre: 'Ónix', estilo: 'Clásico con columna lateral', tono: 'sobrio', columnas: 2 },
  { id: 'azurill', nombre: 'Celeste', estilo: 'Cabecera centrada', tono: 'sobrio', columnas: 2 },
  { id: 'bronzor', nombre: 'Bronce', estilo: 'Apartados al margen', tono: 'sobrio', columnas: 1 },
  { id: 'chikorita', nombre: 'Hoja', estilo: 'Lateral de color a la derecha', tono: 'color', columnas: 2 },
  { id: 'ditgar', nombre: 'Lavanda', estilo: 'Columna de color con tu nombre', tono: 'color', columnas: 2 },
  { id: 'ditto', nombre: 'Grafito', estilo: 'Banda oscura arriba', tono: 'color', columnas: 2 },
  { id: 'gengar', nombre: 'Violeta', estilo: 'Lateral y cabecera de color', tono: 'color', columnas: 2 },
  { id: 'glalie', nombre: 'Glaciar', estilo: 'Lateral azul', tono: 'color', columnas: 2 },
  { id: 'kakuna', nombre: 'Esencial', estilo: 'Centrado y simétrico', tono: 'sobrio', columnas: 2 },
  { id: 'lapras', nombre: 'Marcos', estilo: 'Bloques enmarcados', tono: 'sobrio', columnas: 2 },
  { id: 'leafish', nombre: 'Brote', estilo: 'Cabecera suave', tono: 'color', columnas: 2 },
  { id: 'meowth', nombre: 'Elegante', estilo: 'Títulos en mayúsculas', tono: 'sobrio', columnas: 2 },
  { id: 'pikachu', nombre: 'Ámbar', estilo: 'Cabecera en bloque', tono: 'color', columnas: 2 },
  { id: 'rhyhorn', nombre: 'Lineal', estilo: 'Una columna, sin adornos', tono: 'sobrio', columnas: 1 },
  { id: 'scizor', nombre: 'Carmín', estilo: 'Filete de color, títulos marcados', tono: 'sobrio', columnas: 1 },
];

/**
 * Diseños que lee bien un ATS (los filtros automáticos de las empresas), medidos con `node cv-estudio/ats.mjs`:
 * el PDF se extrae con pdf.js y con pdftotext, el nombre sale arriba, los apartados no se mezclan y el
 * lector de CV recupera contacto, experiencia y formación. No depende de las columnas: se mide, no se supone.
 * Si cambia una plantilla, se vuelve a medir y se actualiza esta lista.
 */
export const DISENOS_ATS: ReadonlySet<string> = new Set([
  'onyx', 'azurill', 'bronzor', 'chikorita', 'ditto', 'kakuna', 'lapras', 'leafish', 'rhyhorn', 'scizor',
  'aurora', 'coral', 'lienzo', 'nocturno', 'mosaico', 'prisma', 'brisa', 'oasis', 'tinta', 'pixel',
  'cometa', 'trazo', 'arcada', 'foco', 'editorial',
]);
export const leeAts = (d: Pick<DisenoCv, 'id'>) => DISENOS_ATS.has(d.id);

export const DISENO_POR_DEFECTO = 'aurora';
/** «Desde cero» no es una página vacía: es el diseño más limpio (una columna, sin adornos) para vestirlo a tu gusto. */
export const DISENO_DESDE_CERO = 'rhyhorn';

/**
 * Los tres caminos del primer paso, de menos a más ayuda (y de menos a más precio): una plantilla tal
 * cual, un diseño propio (desde una plantilla o desde cero) o que lo prepare una persona.
 */
export type CaminoCv = 'plantilla' | 'personaliza' | 'asesoria';
export const CAMINOS_IDS: readonly CaminoCv[] = ['plantilla', 'personaliza', 'asesoria'];
export const esCamino = (v: unknown): v is CaminoCv => CAMINOS_IDS.includes(v as CaminoCv);
/** Asesoría: se pide por el formulario de consulta (respuesta por email) y se presupuesta según el caso. */
export const ASESORIA_CV = { desde: 6900, enlace: '/empezar/consulta?tema=cv' } as const;
export interface CaminoInfo {
  id: CaminoCv;
  etiqueta: string;
  titulo: string;
  precio: number;
  /** «Desde»: el precio final depende del caso. */
  desde: boolean;
  resumen: string;
}

export const CAMINOS_CV: readonly CaminoInfo[] = [
  { id: 'plantilla', etiqueta: 'Lo más rápido', titulo: 'Usa una plantilla', precio: PAQUETES_CV.disenada.precio, desde: false, resumen: 'Eliges un diseño, escribes tus datos y descargas el PDF.' },
  { id: 'personaliza', etiqueta: 'A tu gusto', titulo: 'Diseña tu CV', precio: PAQUETES_CV.personalizable.precio, desde: false, resumen: 'Tus colores, formas, sombreado y fondo, partiendo de una plantilla o desde cero.' },
  { id: 'asesoria', etiqueta: 'Con una persona', titulo: 'Te ayudamos', precio: ASESORIA_CV.desde, desde: true, resumen: 'Nos cuentas tu caso y te preparamos el CV. Te respondemos por email.' },
];

/** Filtros de la galería de diseños. `cumple` es la única fuente: la página y el script la usan tal cual. */
export const FILTROS_DISENO = [
  { id: 'todos', nombre: 'Todos', cumple: () => true },
  { id: 'creativo', nombre: 'Creativos', cumple: (d: DisenoCv) => d.creativo === true },
  { id: 'sobrio', nombre: 'Sobrios', cumple: (d: DisenoCv) => d.tono === 'sobrio' },
  { id: 'color', nombre: 'Con color', cumple: (d: DisenoCv) => d.tono === 'color' },
  { id: 'ats', nombre: 'Lee bien un ATS', cumple: (d: DisenoCv) => leeAts(d) },
] as const;
export const filtrosDe = (d: DisenoCv) => FILTROS_DISENO.filter((f) => f.cumple(d)).map((f) => f.id).join(' ');

/** Letra, tamaño y espaciado: el mismo catálogo que usa el motor, para que página y PDF no se desfasen. */
export { ESPACIADOS, ESTILOS_LETRA, FORMATO_INICIAL, TAMANOS } from '../../../cv-estudio/src/catalogo-formato';
export const MOTOR_CV = '/cv/estudio/motor/estudio.js';
export const miniaturaCv = (id: string) => `/cv/estudio/miniaturas/${id}.jpg`;

/** Formas, posición, sombreado y fondo de la personalizable: el mismo catálogo que dibuja el motor. */
export { DECORACION_VACIA, FONDOS, FORMAS, POSICIONES, SOMBREADOS } from '../../../cv-estudio/src/catalogo-decoracion';

/** Colores sugeridos para la personalizable (el selector admite cualquiera). */
export const COLORES_CV: readonly { valor: string; nombre: string }[] = [
  { valor: '#176b5a', nombre: 'Verde pino' },
  { valor: '#b34a28', nombre: 'Terracota' },
  { valor: '#1f4e8c', nombre: 'Azul tinta' },
  { valor: '#6b3fa0', nombre: 'Violeta' },
  { valor: '#a3123a', nombre: 'Granate' },
  { valor: '#2f3b45', nombre: 'Pizarra' },
];

/**
 * Límites del contenido: lo que cabe sin que el diseño se rompa (dos páginas como mucho) y lo que un
 * seleccionador lee de verdad. La página los pone en los campos y el estudio los aplica al pegar o importar.
 */
export const LIMITES_CV = {
  items: { experiencia: 6, formacion: 5, habilidades: 12, idiomas: 5, cursos: 6, proyectos: 4, voluntariado: 4, premios: 4, publicaciones: 4, referencias: 3, intereses: 6 },
  /** Caracteres. */
  resumen: 600,
  descripcion: 700,
  /** Líneas (logros) por experiencia. */
  lineasDescripcion: 6,
} as const;

/**
 * Guía con ventanitas (Driver.js, la misma del resto de la web): por paso, qué es cada zona y qué
 * hacer. `guia` es el atributo `data-guia` del bloque al que señala; si no se ve, se salta.
 */
export interface PasoGuiaCv {
  guia: string;
  titulo: string;
  texto: string;
}
export const GUIA_CV: Record<string, readonly PasoGuiaCv[]> = {
  diseno: [
    { guia: 'caminos', titulo: 'Primero, cómo lo quieres', texto: 'Una plantilla tal cual (lo más rápido), tu propio diseño con tus colores y formas, o que te lo preparemos nosotros. Puedes cambiar de idea cuando quieras.' },
    { guia: 'vista', titulo: 'Así queda tu CV', texto: 'Aquí ves el diseño con un ejemplo. Se actualiza solo cada vez que cambias algo. La marca de agua desaparece en el PDF que compras.' },
    { guia: 'filtros', titulo: 'Filtra los diseños', texto: 'Creativos, sobrios, con color o de una columna (la que mejor leen los filtros automáticos de las empresas).' },
    { guia: 'galeria', titulo: 'Elige uno', texto: `Toca el que te guste y míralo a la derecha. Desplázate: hay ${DISENOS_CV.length}. Puedes cambiarlo cuando quieras sin perder lo que escribas.` },
    { guia: 'letra', titulo: 'Letra, tamaño y espaciado', texto: 'Pruébalos: la vista previa cambia al momento. Con mucho texto, un tamaño menor y espaciado compacto te ahorran una página.' },
    { guia: 'inicio', titulo: '¿Desde dónde empiezas?', texto: 'Desde una plantilla que ya te guste o desde cero: un diseño limpio de una columna que vistes tú.' },
    { guia: 'personalizar', titulo: 'Ponle tu toque', texto: 'Tus colores, formas, sombreado y fondo. Lo ves a la derecha mientras lo cambias.' },
    { guia: 'siguiente', titulo: 'Y ahora, tus datos', texto: 'Cuando te guste, sigue: escribirás tus datos una sola vez y el diseño se queda como lo has dejado.' },
  ],
  datos: [
    { guia: 'importar', titulo: 'No empieces de cero', texto: 'Sube tu CV actual (PDF, Word o la exportación de LinkedIn) y rellenamos los campos por ti; o prueba con un ejemplo. Se lee en tu navegador, no se envía a ningún sitio.' },
    { guia: 'sobre-ti', titulo: 'Tus datos básicos', texto: 'Solo el nombre es obligatorio. Los contadores te avisan de lo que cabe sin que el diseño se estropee.' },
    { guia: 'listas', titulo: 'Experiencia, formación y más', texto: 'Añade cada puesto o estudio con su botón. Hay un máximo por apartado para que el CV se lea bien en dos páginas.' },
    { guia: 'vista', titulo: 'Lo ves mientras escribes', texto: 'La vista previa se actualiza con tus datos. Todo se guarda en este navegador.' },
  ],
  revisa: [
    { guia: 'repaso', titulo: 'Un repaso rápido', texto: 'Te decimos qué falta (contacto, resumen, experiencia…). No es obligatorio, pero ayuda mucho.' },
    { guia: 'vista', titulo: 'Revisa página a página', texto: 'Mira que todo está donde quieres. Si no, vuelve atrás desde la barra de pasos: no pierdes nada.' },
  ],
  anade: [
    { guia: 'portales', titulo: 'Pásalo a LinkedIn o InfoJobs', texto: 'Tus datos en trozos listos para copiar y pegar en cada casilla del portal. Gratis.' },
    { guia: 'extras', titulo: 'Tarjeta digital con QR', texto: 'Márcala y aparece su configurador: eliges modelo, color y datos, y la ves al momento. Se publica al pagar.' },
    { guia: 'tarjeta', titulo: 'Diseña tu tarjeta', texto: 'Prueba los seis modelos con tu color y tus datos. Con el QR, quien lo escanee guarda tu contacto en un toque.' },
  ],
  descarga: [
    { guia: 'comprar', titulo: 'Compra y descarga', texto: 'Pagas una vez y descargas el PDF sin marca de agua. Lo que añadiste en el paso anterior va en el mismo pedido.' },
  ],
};

export const PASOS_CV = [
  { id: 'diseno', titulo: 'Diseño y estilo' },
  { id: 'datos', titulo: 'Tus datos' },
  { id: 'revisa', titulo: 'Revisa' },
  { id: 'anade', titulo: 'Añade' },
  { id: 'descarga', titulo: 'Descarga' },
] as const;

/**
 * Formato de los datos de contacto: «Revisa» avisa si algo no parece válido (no bloquea: el PDF sale igual).
 * Vacío cuenta como válido; que falte el contacto lo avisa otra línea del repaso.
 */
export const correoValido = (v: string) => !v.trim() || /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[^\s@.]{2,}$/.test(v.trim());
export const telefonoValido = (v: string) => {
  const t = v.trim();
  if (!t) return true;
  const cifras = t.replace(/\D/g, '').length;
  return /^\(?\+?[\d\s().-]+$/.test(t) && cifras >= 9 && cifras <= 15;
};
/** Web o perfil: dirección http(s) o un dominio («anaperez.es»); nunca otros esquemas (javascript:, data:). */
export const webValida = (v: string) => {
  const t = v.trim();
  if (!t) return true;
  if (/^[a-z][a-z\d+.-]*:/i.test(t) && !/^https?:\/\//i.test(t)) return false;
  try {
    const u = new URL(/^https?:\/\//i.test(t) ? t : `https://${t}`);
    return /\.[a-z]{2,}$/i.test(u.hostname);
  } catch {
    return false;
  }
};

/** Lo mínimo que se mira tras importar un CV (la forma del formulario, sin depender de cv-estudio). */
interface CvImportado {
  nombre?: string;
  email?: string;
  telefono?: string;
  ubicacion?: string;
  resumen?: string;
  experiencia?: { puesto?: string; empresa?: string; periodo?: string }[];
  formacion?: { titulo?: string; centro?: string }[];
  habilidades?: { nombre?: string }[];
  idiomas?: { idioma?: string }[];
}

/**
 * Lo que un CV importado no trae y conviene pedir, en el orden del formulario. Un lector de CV nunca
 * acierta al 100 %: en vez de un «repásalo» genérico, se dice qué falta.
 */
export function faltanTrasImportar(f: CvImportado): string[] {
  const lleno = (v?: string) => !!v?.trim();
  const faltan: string[] = [];
  if (!lleno(f.nombre)) faltan.push('tu nombre');
  if (!lleno(f.email)) faltan.push('el correo');
  if (!lleno(f.telefono)) faltan.push('el teléfono');
  if (!lleno(f.ubicacion)) faltan.push('la ciudad');
  if (!lleno(f.resumen)) faltan.push('un resumen sobre ti');
  const puestos = (f.experiencia ?? []).filter((e) => lleno(e.puesto) || lleno(e.empresa));
  if (!puestos.length) faltan.push('la experiencia');
  else if (puestos.some((e) => !lleno(e.periodo))) faltan.push('las fechas de algún puesto');
  if (!(f.formacion ?? []).some((e) => lleno(e.titulo) || lleno(e.centro))) faltan.push('la formación');
  if (!(f.habilidades ?? []).some((h) => lleno(h.nombre))) faltan.push('las habilidades');
  if (!(f.idiomas ?? []).some((i) => lleno(i.idioma))) faltan.push('los idiomas');
  return faltan;
}

export const euros =(centimos: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: centimos % 100 ? 2 : 0 }).format(
    centimos / 100,
  );

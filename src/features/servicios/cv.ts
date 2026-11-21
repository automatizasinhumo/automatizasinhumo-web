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
    incluye: ['Todo lo del diseño listo', 'Color a tu elección', 'Círculos, rombos, ondas, puntos y más', 'Sombreado de fondo'],
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
  /** Una columna: la que mejor leen los filtros automáticos de las empresas. */
  columnas: 1 | 2;
}

/** Los 15 diseños del motor, con nombre propio y una pista de estilo. */
export const DISENOS_CV: readonly DisenoCv[] = [
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

export const DISENO_POR_DEFECTO = 'onyx';

/** Filtros de la galería de diseños. `cumple` es la única fuente: la página y el script la usan tal cual. */
export const FILTROS_DISENO = [
  { id: 'todos', nombre: 'Todos', cumple: () => true },
  { id: 'sobrio', nombre: 'Sobrios', cumple: (d: DisenoCv) => d.tono === 'sobrio' },
  { id: 'color', nombre: 'Con color', cumple: (d: DisenoCv) => d.tono === 'color' },
  { id: 'una-columna', nombre: 'Una columna', cumple: (d: DisenoCv) => d.columnas === 1 },
] as const;
export const filtrosDe = (d: DisenoCv) => FILTROS_DISENO.filter((f) => f.cumple(d)).map((f) => f.id).join(' ');

/** Letra, tamaño y espaciado: el mismo catálogo que usa el motor, para que página y PDF no se desfasen. */
export { ESPACIADOS, ESTILOS_LETRA, FORMATO_INICIAL, TAMANOS } from '../../../cv-estudio/src/catalogo-formato';
export const MOTOR_CV = '/cv/estudio/motor/estudio.js';
export const miniaturaCv = (id: string) => `/cv/estudio/miniaturas/${id}.jpg`;

/** Colores sugeridos para la personalizable (el selector admite cualquiera). */
export const COLORES_CV: readonly { valor: string; nombre: string }[] = [
  { valor: '#176b5a', nombre: 'Verde pino' },
  { valor: '#b34a28', nombre: 'Terracota' },
  { valor: '#1f4e8c', nombre: 'Azul tinta' },
  { valor: '#6b3fa0', nombre: 'Violeta' },
  { valor: '#a3123a', nombre: 'Granate' },
  { valor: '#2f3b45', nombre: 'Pizarra' },
];

export const PASOS_CV = [
  { id: 'plantilla', titulo: 'Diseño' },
  { id: 'datos', titulo: 'Tus datos' },
  { id: 'personaliza', titulo: 'Personaliza' },
  { id: 'revisa', titulo: 'Revisa' },
  { id: 'descarga', titulo: 'Descarga' },
] as const;

export const euros = (centimos: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: centimos % 100 ? 2 : 0 }).format(
    centimos / 100,
  );

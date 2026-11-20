/**
 * Estudio de CV (/servicios/cv): catálogo de diseños y precios en un solo sitio.
 * Precios en céntimos. Provisionales hasta que David los confirme.
 * Las miniaturas salen del propio motor (cv-estudio/miniaturas.mjs), así que lo que se ve
 * en la galería es exactamente lo que el cliente descarga.
 */

export type ModalidadCv = 'disenada' | 'personalizable';

export interface PaqueteCv {
  id: ModalidadCv;
  nombre: string;
  precio: number;
  resumen: string;
  incluye: readonly string[];
}

export const PAQUETES_CV: Record<ModalidadCv, PaqueteCv> = {
  disenada: {
    id: 'disenada',
    nombre: 'Diseño listo',
    precio: 900,
    resumen: 'Eliges uno de nuestros diseños y lo rellenas con tus datos.',
    incluye: ['PDF listo para enviar', 'Tus datos guardados en este navegador', 'Cambios de diseño sin volver a escribir'],
  },
  personalizable: {
    id: 'personalizable',
    nombre: 'Personalizable',
    precio: 1400,
    resumen: 'Partes de cualquier diseño y le cambias el color, las formas y el sombreado.',
    incluye: ['Todo lo del diseño listo', 'Color a tu elección', 'Círculos, rombos, ondas, puntos y más', 'Sombreado de fondo'],
  },
};

export interface DisenoCv {
  /** Identificador de la plantilla en el motor. */
  id: string;
  nombre: string;
  estilo: string;
}

/** Los 15 diseños del motor, con nombre propio y una pista de estilo. */
export const DISENOS_CV: readonly DisenoCv[] = [
  { id: 'onyx', nombre: 'Ónix', estilo: 'Clásico con columna lateral' },
  { id: 'azurill', nombre: 'Celeste', estilo: 'Cabecera centrada' },
  { id: 'bronzor', nombre: 'Bronce', estilo: 'Apartados al margen' },
  { id: 'chikorita', nombre: 'Hoja', estilo: 'Lateral de color a la derecha' },
  { id: 'ditgar', nombre: 'Lavanda', estilo: 'Columna de color con tu nombre' },
  { id: 'ditto', nombre: 'Grafito', estilo: 'Banda oscura arriba' },
  { id: 'gengar', nombre: 'Violeta', estilo: 'Lateral y cabecera de color' },
  { id: 'glalie', nombre: 'Glaciar', estilo: 'Lateral azul' },
  { id: 'kakuna', nombre: 'Esencial', estilo: 'Centrado y simétrico' },
  { id: 'lapras', nombre: 'Marcos', estilo: 'Bloques enmarcados' },
  { id: 'leafish', nombre: 'Brote', estilo: 'Cabecera suave' },
  { id: 'meowth', nombre: 'Elegante', estilo: 'Títulos en mayúsculas' },
  { id: 'pikachu', nombre: 'Ámbar', estilo: 'Cabecera en bloque' },
  { id: 'rhyhorn', nombre: 'Lineal', estilo: 'Una columna, sin adornos' },
  { id: 'scizor', nombre: 'Carmín', estilo: 'Filete de color, títulos marcados' },
];

export const DISENO_POR_DEFECTO = 'onyx';
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

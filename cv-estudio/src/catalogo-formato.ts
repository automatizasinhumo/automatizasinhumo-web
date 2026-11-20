// Catálogo de letra y formato del CV: datos puros, sin ficheros de fuente.
// Lo usan el motor (registro de fuentes y crearPdf) y la página /servicios/cv (selectores),
// así que añadir una opción aquí la deja disponible en los dos sitios a la vez.
// Las fuentes son OFL-1.1 de @fontsource (subconjunto latin: cubre á é í ó ú ü ñ ¿ ¡ €).

/** Familias que el motor registra. El resto se cambia por Lato al sanear. */
export const FAMILIAS_FUENTE = ["Lato", "Open Sans", "Roboto", "Montserrat", "Merriweather", "Lora"] as const;
export type FamiliaFuente = (typeof FAMILIAS_FUENTE)[number];

export type EstiloLetra = {
	id: string;
	nombre: string;
	descripcion: string;
	titulos: FamiliaFuente;
	texto: FamiliaFuente;
};

export const ESTILOS_LETRA: readonly EstiloLetra[] = [
	{ id: "moderna", nombre: "Moderna", descripcion: "Lato. Limpia y fácil de leer.", titulos: "Lato", texto: "Lato" },
	{ id: "clara", nombre: "Clara", descripcion: "Open Sans. Muy legible en pantalla.", titulos: "Open Sans", texto: "Open Sans" },
	{ id: "neutra", nombre: "Neutra", descripcion: "Roboto. Sobria, para cualquier sector.", titulos: "Roboto", texto: "Roboto" },
	{ id: "geometrica", nombre: "Con carácter", descripcion: "Montserrat en títulos, Open Sans en el texto.", titulos: "Montserrat", texto: "Open Sans" },
	{ id: "clasica", nombre: "Clásica", descripcion: "Merriweather en títulos, Lato en el texto.", titulos: "Merriweather", texto: "Lato" },
	{ id: "elegante", nombre: "Elegante", descripcion: "Lora con remates. Para perfiles creativos o docentes.", titulos: "Lora", texto: "Lora" },
];

export type Medida = { id: string; nombre: string; texto: number; titulos: number };
/** Tamaño de letra en puntos (texto y títulos). */
export const TAMANOS: readonly Medida[] = [
	{ id: "pequena", nombre: "Pequeña", texto: 9, titulos: 13 },
	{ id: "normal", nombre: "Normal", texto: 10, titulos: 14 },
	{ id: "grande", nombre: "Grande", texto: 11, titulos: 15.5 },
];

export type Espaciado = { id: string; nombre: string; interlineado: number; margenX: number; margenY: number };
/** Aire de la página: interlineado y márgenes (pt). «Compacto» ayuda a que quepa en una hoja. */
export const ESPACIADOS: readonly Espaciado[] = [
	{ id: "compacto", nombre: "Compacto", interlineado: 1.35, margenX: 24, margenY: 14 },
	{ id: "normal", nombre: "Normal", interlineado: 1.5, margenX: 32, margenY: 18 },
	{ id: "amplio", nombre: "Amplio", interlineado: 1.65, margenX: 40, margenY: 24 },
];

export const FORMATO_INICIAL = { letra: "moderna", tamano: "normal", espaciado: "normal" } as const;

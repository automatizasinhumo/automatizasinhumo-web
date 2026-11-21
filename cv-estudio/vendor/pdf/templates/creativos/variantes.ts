import type { Variante } from "./fabrica";

// Diez plantillas creativas del estudio. El id es el que ve el motor; nombre y descripción
// están en src/adoptado/templates.ts.
export const VARIANTES: Record<string, Variante> = {
	aurora: { cabecera: "banda", lateral: "derecha", fondoLateral: "tinte", titulos: "etiqueta", monograma: true },
	coral: { cabecera: "lateral", lateral: "izquierda", fondoLateral: "primario", titulos: "mayusculas", monograma: true },
	lienzo: { cabecera: "centrada", lateral: "ninguno", fondoLateral: "tinte", titulos: "doble", monograma: true, nombre: 1.7 },
	nocturno: { cabecera: "lateral", lateral: "izquierda", fondoLateral: "oscuro", titulos: "barra" },
	mosaico: { cabecera: "izquierda", lateral: "ninguno", fondoLateral: "tinte", titulos: "barra", tarjetas: true, monograma: true },
	prisma: { cabecera: "banda", lateral: "izquierda", fondoLateral: "primario", titulos: "subrayado", bandaOscura: true },
	brisa: { cabecera: "centrada", lateral: "izquierda", fondoLateral: "tinte", titulos: "subrayado" },
	vertice: { cabecera: "banda", lateral: "ninguno", fondoLateral: "tinte", titulos: "barra", nombre: 1.9 },
	oasis: { cabecera: "izquierda", lateral: "derecha", fondoLateral: "tinte", titulos: "punteado", monograma: true },
	zafiro: { cabecera: "lateral", lateral: "derecha", fondoLateral: "oscuro", titulos: "mayusculas" },
};
export const IDS_CREATIVOS = Object.keys(VARIANTES);

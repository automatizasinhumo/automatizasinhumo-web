import type { Variante } from "./fabrica";

// Dieciocho plantillas creativas del estudio, cada una con su dibujo SVG (arte.tsx), su forma
// de cabecera, títulos y niveles. El id es el que ve el motor; nombre y descripción están en
// src/adoptado/templates.ts.
export const VARIANTES: Record<string, Variante> = {
	aurora: { cabecera: "banda", bandaArte: "claro", arte: "ola", altoCabecera: 150, lateral: "derecha", fondoLateral: "tinte", titulos: "pastilla", monograma: true, nivel: "progress-bar", linea: true, iconos: true, foto: "circulo", tamFoto: 84 },
	coral: { cabecera: "lateral", columna: true, lateral: "izquierda", fondoLateral: "primario", arte: "burbujas", titulos: "marcador", nombrePartido: true, monograma: true, lateralArriba: 8, nivel: "rectangle-full", giro: 24, linea: true, iconos: true, foto: "arco", tamFoto: 112 },
	lienzo: { cabecera: "centrada", arte: "arcos", altoCabecera: 170, lateral: "ninguno", fondoLateral: "tinte", fondoPagina: "crema", titulos: "doble", monograma: true, nombre: 1.8, nivel: "circle", linea: true, foto: "arco", tamFoto: 78 },
	nocturno: { cabecera: "lateral", columna: true, lateral: "izquierda", fondoLateral: "oscuro", arte: "hexagonos", titulos: "barra", nombrePartido: true, lateralArriba: 8, nivel: "progress-bar", linea: true, iconos: true, foto: "redondeada", tamFoto: 120 },
	mosaico: { cabecera: "izquierda", arte: "mosaico", altoCabecera: 130, lateral: "ninguno", fondoLateral: "tinte", titulos: "etiqueta", tarjetas: true, monograma: true, fondoPagina: "tinte", nivel: "square", giro: 60, iconos: true, foto: "redondeada", tamFoto: 80 },
	prisma: { cabecera: "banda", bandaArte: "claro", arte: "diagonal", altoCabecera: 150, lateral: "izquierda", fondoLateral: "tinte", titulos: "subrayado", nombrePartido: true, nivel: "rectangle", linea: true, iconos: true, foto: "circulo", tamFoto: 88 },
	brisa: { cabecera: "centrada", arte: "manchas", altoCabecera: 165, lateral: "izquierda", fondoLateral: "tinte", titulos: "pastilla", monograma: true, nivel: "circle", giro: 70, linea: true, iconos: true, foto: "circulo", tamFoto: 80 },
	vertice: { cabecera: "izquierda", arte: "franja", altoCabecera: 150, lateral: "ninguno", fondoLateral: "tinte", titulos: "barra", nombre: 2.1, nombrePartido: true, nivel: "rectangle-full", linea: true, foto: "cuadrada", tamFoto: 92 },
	oasis: { cabecera: "izquierda", columna: true, lateral: "derecha", fondoLateral: "tinte", arte: "arco", titulos: "punteado", monograma: true, lateralArriba: 110, nivel: "progress-bar", giro: 90, linea: true, iconos: true, foto: "arco", fotoEnLateral: true },
	zafiro: { cabecera: "lateral", columna: true, lateral: "derecha", fondoLateral: "oscuro", arte: "rayas", titulos: "mayusculas", lateralArriba: 14, nivel: "rectangle-full", linea: true, iconos: true, foto: "circulo", tamFoto: 116 },
	tinta: { cabecera: "izquierda", arte: "pinceladas", altoCabecera: 140, lateral: "derecha", fondoLateral: "tinte", titulos: "marcador", marcador: true, nombre: 1.9, nivel: "square", giro: 150, iconos: true, foto: "redondeada", tamFoto: 84 },
	pixel: { cabecera: "lateral", columna: true, lateral: "izquierda", fondoLateral: "primario", arte: "pixeles", titulos: "etiqueta", monograma: true, lateralArriba: 8, nivel: "square", giro: 180, linea: true, iconos: true, foto: "cuadrada", tamFoto: 110 },
	cometa: { cabecera: "banda", bandaArte: "oscuro", arte: "orbita", altoCabecera: 140, sangriaCabecera: 20, lateral: "derecha", fondoLateral: "tinte", titulos: "subrayado", nombrePartido: true, nivel: "progress-bar", giro: 200, linea: true, iconos: true },
	trazo: { cabecera: "centrada", arte: "trazos", altoCabecera: 160, lateral: "ninguno", fondoLateral: "tinte", titulos: "pastilla", nombre: 1.8, marcador: true, nivel: "circle", giro: 120, linea: true, iconos: true, foto: "circulo", tamFoto: 82 },
	retrato: { cabecera: "izquierda", columna: true, lateral: "izquierda", fondoLateral: "oscuro", titulos: "barra", fotoEnLateral: true, foto: "redondeada", lateralArriba: 22, nombre: 2.2, nombrePartido: true, linea: true, iconos: true, nivel: "progress-bar", giro: 30 },
	arcada: { cabecera: "izquierda", columna: true, lateral: "derecha", fondoLateral: "tinte", fondoPagina: "crema", titulos: "mayusculas", fotoEnLateral: true, foto: "arco", lateralArriba: 26, nombre: 2.3, marcador: true, linea: true, iconos: true, nivel: "circle", giro: 40 },
	foco: { cabecera: "banda", bandaOscura: true, altoCabecera: 150, lateral: "derecha", fondoLateral: "tinte", titulos: "etiqueta", foto: "circulo", tamFoto: 104, nombre: 2, nombrePartido: true, linea: true, iconos: true, nivel: "rectangle-full", giro: 160 },
	editorial: { cabecera: "centrada", arte: "manchas", altoCabecera: 190, lateral: "ninguno", fondoLateral: "tinte", fondoPagina: "crema", titulos: "doble", foto: "redondeada", tamFoto: 92, nombre: 2.4, linea: true, iconos: true, nivel: "square", giro: 100 },
};
export const IDS_CREATIVOS = Object.keys(VARIANTES);

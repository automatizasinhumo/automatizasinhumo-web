// Decoración de la plantilla personalizable: formas geométricas y sombreado en SVG
// vectorial (react-pdf), fijas en cada página y siempre detrás del texto.
// El estado se fija antes de cada render; los renders van en cola, nunca a la vez.
import { createElement as h } from "react";
import { Circle, Defs, LinearGradient, Path, Polygon, Rect, Stop, Svg, Text, View } from "@react-pdf/renderer";

export const FORMAS = {
	ninguna: "Sin formas",
	circulos: "Círculos",
	rombos: "Rombos",
	ondas: "Ondas",
	esquinas: "Esquinas",
	puntos: "Puntos",
	franja: "Franja lateral",
} as const;
export type Forma = keyof typeof FORMAS;

export type Decoracion = {
	forma: Forma;
	/** Color de las formas, en #rrggbb. */
	color: string;
	/** Intensidad de 0 a 1. */
	intensidad: number;
	/** Sombreado: degradado suave de fondo en la cabecera. */
	sombreado: boolean;
};

export const DECORACION_VACIA: Decoracion = { forma: "ninguna", color: "#176b5a", intensidad: 0.5, sombreado: false };

let actual: Decoracion = DECORACION_VACIA;
export const MARCA_POR_DEFECTO = "VISTA PREVIA";
let marca: string = MARCA_POR_DEFECTO;

export function fijarCapas(decoracion: Decoracion | null | undefined, marcaAgua: string | null | undefined) {
	actual = { ...DECORACION_VACIA, ...(decoracion ?? {}) };
	if (!/^#[0-9a-f]{6}$/i.test(actual.color)) actual.color = DECORACION_VACIA.color;
	actual.intensidad = Math.min(1, Math.max(0, Number(actual.intensidad) || 0));
	// Nunca sin marca: el PDF limpio no sale del navegador.
	marca = String(marcaAgua ?? "").trim().slice(0, 60) || MARCA_POR_DEFECTO;
}

// Lienzo lógico A4 en puntos; el SVG se estira a la página real (A4 o carta).
const W = 595;
const H = 842;
const capa = { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 } as const;

function formas(d: Decoracion) {
	const c = d.color;
	const o = (x: number) => +(x * (0.25 + d.intensidad * 0.75)).toFixed(3);
	switch (d.forma) {
		case "circulos":
			return [
				h(Circle, { key: 1, cx: W - 30, cy: 40, r: 120, fill: c, fillOpacity: o(0.14) }),
				h(Circle, { key: 2, cx: W - 120, cy: -20, r: 70, fill: c, fillOpacity: o(0.1) }),
				h(Circle, { key: 3, cx: 20, cy: H - 30, r: 90, fill: c, fillOpacity: o(0.1) }),
				h(Circle, { key: 4, cx: 80, cy: H + 10, r: 50, fill: "none", stroke: c, strokeWidth: 2, strokeOpacity: o(0.3) }),
			];
		case "rombos": {
			const rombo = (x: number, y: number, r: number, k: number, a: number, relleno = true) =>
				h(Polygon, {
					key: k,
					points: `${x},${y - r} ${x + r},${y} ${x},${y + r} ${x - r},${y}`,
					...(relleno ? { fill: c, fillOpacity: o(a) } : { fill: "none", stroke: c, strokeWidth: 1.5, strokeOpacity: o(a * 2) }),
				});
			return [rombo(W - 40, 50, 70, 1, 0.13), rombo(W - 110, 20, 34, 2, 0.12, false), rombo(40, H - 40, 55, 3, 0.1), rombo(105, H - 18, 22, 4, 0.12, false)];
		}
		case "ondas":
			return [
				h(Path, { key: 1, d: `M0 ${H - 70} C ${W * 0.3} ${H - 120}, ${W * 0.6} ${H - 20}, ${W} ${H - 80} L ${W} ${H} L 0 ${H} Z`, fill: c, fillOpacity: o(0.12) }),
				h(Path, { key: 2, d: `M0 ${H - 40} C ${W * 0.35} ${H - 80}, ${W * 0.7} ${H}, ${W} ${H - 45} L ${W} ${H} L 0 ${H} Z`, fill: c, fillOpacity: o(0.12) }),
				h(Path, { key: 3, d: `M${W * 0.55} 0 C ${W * 0.7} 40, ${W * 0.85} 10, ${W} 50 L ${W} 0 Z`, fill: c, fillOpacity: o(0.14) }),
			];
		case "esquinas":
			return [
				h(Polygon, { key: 1, points: `${W - 150},0 ${W},0 ${W},150`, fill: c, fillOpacity: o(0.16) }),
				h(Polygon, { key: 2, points: `${W - 90},0 ${W},0 ${W},90`, fill: c, fillOpacity: o(0.16) }),
				h(Polygon, { key: 3, points: `0,${H - 120} 0,${H} 120,${H}`, fill: c, fillOpacity: o(0.12) }),
			];
		case "puntos": {
			const puntos = [];
			for (let i = 0; i < 6; i++)
				for (let j = 0; j < 6; j++) puntos.push(h(Circle, { key: `${i}-${j}`, cx: W - 24 - i * 12, cy: 24 + j * 12, r: 2, fill: c, fillOpacity: o(0.45) }));
			for (let i = 0; i < 5; i++)
				for (let j = 0; j < 4; j++) puntos.push(h(Circle, { key: `b${i}-${j}`, cx: 24 + i * 12, cy: H - 24 - j * 12, r: 2, fill: c, fillOpacity: o(0.35) }));
			return puntos;
		}
		case "franja":
			return [h(Rect, { key: 1, x: 0, y: 0, width: 10, height: H, fill: c, fillOpacity: o(0.8) })];
		default:
			return [];
	}
}

export function capaDecoracion() {
	const d = actual;
	if (d.forma === "ninguna" && !d.sombreado) return null;
	const hijos = [];
	if (d.sombreado) {
		hijos.push(
			h(Defs, { key: "defs" }, h(LinearGradient, { id: "sombreado", x1: 0, y1: 0, x2: 0, y2: 1 }, h(Stop, { offset: 0, stopColor: d.color, stopOpacity: 0.16 }), h(Stop, { offset: 1, stopColor: d.color, stopOpacity: 0 }))),
			h(Rect, { key: "sombra", x: 0, y: 0, width: W, height: 220, fill: "url(#sombreado)" }),
		);
	}
	hijos.push(...formas(d));
	return h(Svg, { fixed: true, style: capa, viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: "none" }, ...hijos);
}

export function capaMarcaAgua() {
	if (!marca) return null;
	const filas = [];
	// Mosaico mayor que la página (rotado) para que no quede ninguna esquina limpia.
	for (let i = 0; i < 14; i++)
		filas.push(
			h(Text, { key: i, style: { fontSize: 26, fontFamily: "Helvetica-Bold", color: "#000000", opacity: 0.13, marginBottom: 52, textAlign: "center" } }, `${marca}   ·   ${marca}   ·   ${marca}`),
		);
	return h(
		View,
		{ fixed: true, style: { ...capa, justifyContent: "center", alignItems: "center", overflow: "hidden" } },
		h(View, { style: { transform: "rotate(-32deg)", width: 1300, alignItems: "center" } }, ...filas),
	);
}

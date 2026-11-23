/** Contraste WCAG mínimo para texto normal (AA). */
export const CONTRASTE_TEXTO = 4.5;
/** Tinte más fuerte del color principal que ponen los diseños bajo su propio texto (barras laterales: getPrimaryTint(…, 0.2)). */
export const TINTE_DISENO = 0.2;

type Rgb = [number, number, number];
const BLANCO = "#ffffff";

const aRgb = (hex: string): Rgb => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as Rgb;
const aHex = (c: Rgb) => `#${c.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`;
const canal = (c: number) => {
	const v = c / 255;
	return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};
const luminancia = (hex: string) => {
	const [r, g, b] = aRgb(hex).map(canal);
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** Contraste WCAG entre dos colores `#rrggbb`. */
export function contraste(a: string, b: string): number {
	const [x, y] = [luminancia(a), luminancia(b)].sort((m, n) => n - m);
	return (x + 0.05) / (y + 0.05);
}

/** Contraste WCAG de un color `#rrggbb` contra el blanco. */
export const contrasteConBlanco = (hex: string) => contraste(hex, BLANCO);

/** `encima` con opacidad `alfa` pintado sobre `debajo` (los dos opacos). */
export function mezclar(debajo: string, encima: string, alfa: number): string {
	const [a, b] = [aRgb(debajo), aRgb(encima)];
	return aHex(a.map((v, i) => v + (b[i] - v) * alfa) as Rgb);
}

/**
 * El color principal de los diseños se usa para títulos, enlaces y datos de contacto. Si el cliente
 * elige uno claro (amarillo, dorado, celeste…) o lo pone sobre un fondo tintado, se oscurece manteniendo
 * el tono hasta que se lee. `fondoDe` da el fondo más oscuro sobre el que puede acabar ese texto (puede
 * depender del propio color, como las barras laterales tintadas). Los colores que ya se leen no cambian.
 */
export function colorLegible(hex: string, fondoDe: (color: string) => string = () => BLANCO): string {
	let c = aRgb(hex.toLowerCase());
	let actual = aHex(c);
	while (contraste(actual, fondoDe(actual)) < CONTRASTE_TEXTO && c.some((v) => v > 0)) {
		c = c.map((v) => Math.floor(v * 0.92)) as Rgb;
		actual = aHex(c);
	}
	return actual;
}

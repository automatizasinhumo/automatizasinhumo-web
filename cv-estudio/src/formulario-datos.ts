// Formulario del estudio de CV: tipos y valor vacío. Módulo puro, sin dependencias.

export type Experiencia = { puesto: string; empresa: string; lugar: string; periodo: string; descripcion: string };
export type Formacion = { titulo: string; centro: string; lugar: string; periodo: string };
export type Habilidad = { nombre: string; nivel: number; detalle: string };
export type Idioma = { idioma: string; nivel: string; puntos: number };

export type FormCv = {
	nombre: string;
	titular: string;
	email: string;
	telefono: string;
	ubicacion: string;
	resumen: string;
	/** Foto: data URL JPEG/PNG reducida en el navegador, o la de ejemplo (FOTO_EJEMPLO). Vacía = sin foto. */
	foto?: string;
	experiencia: Experiencia[];
	formacion: Formacion[];
	habilidades: Habilidad[];
	idiomas: Idioma[];
};

export const FORM_VACIO: FormCv = {
	nombre: "",
	titular: "",
	email: "",
	telefono: "",
	ubicacion: "",
	resumen: "",
	foto: "",
	experiencia: [],
	formacion: [],
	habilidades: [],
	idiomas: [],
};

/** Foto ilustrada del CV de ejemplo (public/cv/estudio/). */
export const FOTO_EJEMPLO = "/cv/estudio/ejemplo-foto.jpg";
/** Tope de la foto ya reducida (data URL): la página la deja en ~480 px JPEG, muy por debajo. */
export const MAX_FOTO_CV = 400_000;

/** Solo JPEG o PNG en data URL (lo que sabe pintar react-pdf) o la foto de ejemplo; si no, "". */
export function fotoValida(v: unknown): string {
	if (typeof v !== "string") return "";
	if (v === FOTO_EJEMPLO) return v;
	return v.length <= MAX_FOTO_CV && /^data:image\/(jpeg|png);base64,[A-Za-z0-9+/]+=*$/.test(v) ? v : "";
}

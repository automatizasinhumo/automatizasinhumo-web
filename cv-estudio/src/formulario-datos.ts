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
	experiencia: [],
	formacion: [],
	habilidades: [],
	idiomas: [],
};

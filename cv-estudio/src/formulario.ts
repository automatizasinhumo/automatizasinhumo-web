// Modelo sencillo del formulario del estudio y su traducción al esquema de Reactive Resume.
// La página solo conoce FormCv; el esquema (y sus cambios upstream) se queda en el motor.
import { parseResumeData, type ResumeData } from "../vendor/schema/resume/data";
import { newResume } from "./adoptado/resume-model";

// Tipos y formulario vacío viven en formulario-datos.ts (sin dependencias: los usan el
// importador y sus pruebas sin cargar el modelo ni DOMPurify).
import { FORM_VACIO, type Experiencia, type FormCv, type Formacion, type Habilidad, type Idioma } from "./formulario-datos";
export * from "./formulario-datos";

export const FORM_EJEMPLO: FormCv = {
	nombre: "Lucía Martín Ortega",
	titular: "Responsable de atención al cliente",
	email: "lucia.martin@correo.es",
	telefono: "+34 600 123 456",
	ubicacion: "Valencia",
	resumen:
		"Ocho años coordinando equipos de atención al cliente en comercio electrónico. He reducido los tiempos de respuesta a la mitad y mantengo una satisfacción superior al 95 %.",
	experiencia: [
		{
			puesto: "Responsable de atención al cliente",
			empresa: "Tienda Levante S. L.",
			lugar: "Valencia",
			periodo: "2021 – actualidad",
			descripcion: "Dirijo un equipo de 9 personas en chat, correo y teléfono.\nImplanté respuestas guiadas: tiempo medio de respuesta de 6 h a 2,5 h.",
		},
		{
			puesto: "Agente de atención al cliente",
			empresa: "Moda Norte",
			lugar: "Bilbao",
			periodo: "2017 – 2021",
			descripcion: "Gestión de devoluciones e incidencias de envío.\nFormación de nuevas incorporaciones.",
		},
	],
	formacion: [{ titulo: "Grado en Administración y Dirección de Empresas", centro: "Universitat de València", lugar: "Valencia", periodo: "2012 – 2016" }],
	habilidades: [
		{ nombre: "Atención multicanal", nivel: 5, detalle: "Zendesk, chat, teléfono" },
		{ nombre: "Gestión de equipos", nivel: 4, detalle: "Turnos, formación" },
		{ nombre: "Análisis de datos", nivel: 3, detalle: "Excel, Looker Studio" },
	],
	idiomas: [
		{ idioma: "Español", nivel: "Nativo", puntos: 5 },
		{ idioma: "Inglés", nivel: "C1", puntos: 4 },
		{ idioma: "Valenciano", nivel: "C1", puntos: 4 },
	],
};

const NIVELES = ["", "Básico", "Elemental", "Intermedio", "Avanzado", "Experto"];
const id = () => crypto.randomUUID();
const web = { url: "", label: "", inlineLink: false };
const txt = (v: unknown, max = 400) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const nivel = (v: unknown) => Math.min(5, Math.max(0, Math.round(Number(v) || 0)));
const lista = <T>(v: unknown, max: number): T[] => (Array.isArray(v) ? (v.slice(0, max) as T[]) : []);
const escapar = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const parrafo = (s: string) => (s ? `<p>${escapar(s)}</p>` : "");
/** Una línea por logro: se convierte en lista con viñetas. */
const vinetas = (s: string) => {
	const lineas = s.split(/\r?\n/).map((l) => l.replace(/^[-•·*]\s*/, "").trim()).filter(Boolean);
	return lineas.length ? `<ul>${lineas.map((l) => `<li><p>${escapar(l)}</p></li>`).join("")}</ul>` : "";
};

/** Convierte el formulario (datos del cliente, sin confiar en ellos) en un CV de Reactive Resume. */
export function crearDatos(entrada: Partial<FormCv> | null | undefined, plantilla = "onyx"): ResumeData {
	const f = { ...FORM_VACIO, ...(entrada ?? {}) };
	const d = newResume(plantilla);
	d.metadata.page.locale = "es-ES";
	d.basics = {
		...d.basics,
		name: txt(f.nombre, 120),
		headline: txt(f.titular, 160),
		email: txt(f.email, 160),
		phone: txt(f.telefono, 60),
		location: txt(f.ubicacion, 120),
	};
	d.summary.content = parrafo(txt(f.resumen, 1500));
	const s = d.sections;
	s.experience.items = lista<Experiencia>(f.experiencia, 12)
		.filter((e) => txt(e?.puesto) || txt(e?.empresa))
		.map((e) => ({
			id: id(),
			hidden: false,
			company: txt(e.empresa, 160),
			position: txt(e.puesto, 160),
			location: txt(e.lugar, 120),
			period: txt(e.periodo, 60),
			website: web,
			roles: [],
			description: vinetas(txt(e.descripcion, 2000)),
		})) as never[];
	s.education.items = lista<Formacion>(f.formacion, 8)
		.filter((e) => txt(e?.titulo) || txt(e?.centro))
		.map((e) => ({
			id: id(),
			hidden: false,
			school: txt(e.centro, 160),
			degree: "",
			area: txt(e.titulo, 200),
			grade: "",
			location: txt(e.lugar, 120),
			period: txt(e.periodo, 60),
			website: web,
			description: "",
		})) as never[];
	s.skills.items = lista<Habilidad>(f.habilidades, 15)
		.filter((h) => txt(h?.nombre))
		.map((h) => ({
			id: id(),
			hidden: false,
			icon: "",
			iconColor: "",
			name: txt(h.nombre, 80),
			proficiency: NIVELES[nivel(h.nivel)] ?? "",
			level: nivel(h.nivel),
			keywords: txt(h.detalle, 200).split(",").map((k) => k.trim()).filter(Boolean).slice(0, 8),
		})) as never[];
	s.languages.items = lista<Idioma>(f.idiomas, 8)
		.filter((l) => txt(l?.idioma))
		.map((l) => ({ id: id(), hidden: false, language: txt(l.idioma, 60), fluency: txt(l.nivel, 40), level: nivel(l.puntos) })) as never[];
	return parseResumeData(d);
}

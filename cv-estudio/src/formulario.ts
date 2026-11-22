// Modelo sencillo del formulario del estudio y su traducción al esquema de Reactive Resume.
// La página solo conoce FormCv; el esquema (y sus cambios upstream) se queda en el motor.
import { parseResumeData, type ResumeData } from "../vendor/schema/resume/data";
import { newResume } from "./adoptado/resume-model";

// Tipos y formulario vacío viven en formulario-datos.ts (sin dependencias: los usan el
// importador y sus pruebas sin cargar el modelo ni DOMPurify).
import { FORM_VACIO, FOTO_EJEMPLO, fotoValida, type Experiencia, type FormCv, type Formacion, type Habilidad, type Idioma, type Interes, type Mencion, type Proyecto, type Referencia, type Voluntariado } from "./formulario-datos";
export * from "./formulario-datos";

export const FORM_EJEMPLO: FormCv = {
	nombre: "Lucía Martín Ortega",
	titular: "Responsable de atención al cliente",
	email: "lucia.martin@correo.es",
	telefono: "+34 600 123 456",
	ubicacion: "Valencia",
	resumen:
		"Ocho años coordinando equipos de atención al cliente en comercio electrónico. He reducido los tiempos de respuesta a la mitad y mantengo una satisfacción superior al 95 %.",
	foto: FOTO_EJEMPLO,
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
	carnet: "B, vehículo propio",
	cursos: [{ titulo: "Customer Experience Professional", entidad: "CXPA", fecha: "2023" }],
	intereses: [{ nombre: "Fotografía" }, { nombre: "Senderismo" }, { nombre: "Voluntariado" }],
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

/**
 * Enlace seguro para el PDF: solo http(s). «www.x.es» o «x.es/algo» se completan con https://.
 * Cualquier otra cosa (javascript:, mailto:, texto suelto) se queda sin enlace.
 */
export function enlace(v: unknown): string {
	const t = txt(v, 300).replace(/\s+/g, "");
	if (!t) return "";
	const url = /^https?:\/\//i.test(t) ? t : /^[a-z0-9-]+(\.[a-z0-9-]+)+(\/.*)?$/i.test(t) ? `https://${t}` : "";
	try {
		const u = new URL(url);
		return u.protocol === "https:" || u.protocol === "http:" ? u.href : "";
	} catch {
		return "";
	}
}
const sitio = (url: string, label = "") => ({ url, label: label || url.replace(/^https?:\/\/(www\.)?/i, "").replace(/\/$/, ""), inlineLink: false });
/** LinkedIn: admite la dirección entera o solo el usuario; devuelve usuario y enlace. */
export function perfilLinkedin(v: unknown): { usuario: string; url: string } | null {
	const t = txt(v, 200).replace(/\s+/g, "");
	if (!t) return null;
	const m = /linkedin\.com\/in\/([^/?#]+)/i.exec(t);
	let usuario = "";
	if (m) {
		try {
			usuario = decodeURIComponent(m[1]);
		} catch {
			return null; // escape roto («%» suelto): se omite el perfil, no la vista previa
		}
	} else usuario = /^@?[\p{L}\p{N}_-]{3,100}$/u.test(t) ? t.replace(/^@/, "") : "";
	return usuario ? { usuario, url: `https://www.linkedin.com/in/${encodeURIComponent(usuario)}` } : null;
}

/** Foto del CV: el tamaño y la forma los decide cada plantilla; aquí solo la fuente. */
export function ponerFoto(d: ResumeData, url: string) {
	if (!url) return;
	d.picture = { ...d.picture, url, hidden: false, size: Math.max(d.picture.size, 88) };
}

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
	const webPropia = enlace(f.web);
	if (webPropia) d.basics.website = sitio(webPropia);
	const carnet = txt(f.carnet, 80);
	if (carnet) d.basics.customFields = [{ id: id(), icon: "car", text: /carn|permiso/i.test(carnet) ? carnet : `Carnet ${carnet}`, link: "" }];
	d.summary.content = parrafo(txt(f.resumen, 1500));
	ponerFoto(d, fotoValida(f.foto));
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
	const li = perfilLinkedin(f.linkedin);
	s.profiles.items = (li ? [{ id: id(), hidden: false, icon: "linkedin-logo", iconColor: "", network: "LinkedIn", username: li.usuario, website: sitio(li.url, `linkedin.com/in/${li.usuario}`) }] : []) as never[];
	const mencion = (v: unknown, max: number) =>
		lista<Mencion>(v, max)
			.filter((m) => txt(m?.titulo))
			.map((m) => ({ titulo: txt(m.titulo, 160), entidad: txt(m.entidad, 120), fecha: txt(m.fecha, 40) }));
	s.certifications.items = mencion(f.cursos, 8).map((m) => ({ id: id(), hidden: false, title: m.titulo, issuer: m.entidad, date: m.fecha, website: web, description: "" })) as never[];
	s.awards.items = mencion(f.premios, 6).map((m) => ({ id: id(), hidden: false, title: m.titulo, awarder: m.entidad, date: m.fecha, website: web, description: "" })) as never[];
	s.publications.items = mencion(f.publicaciones, 6).map((m) => ({ id: id(), hidden: false, title: m.titulo, publisher: m.entidad, date: m.fecha, website: web, description: "" })) as never[];
	s.projects.items = lista<Proyecto>(f.proyectos, 6)
		.filter((p) => txt(p?.nombre))
		.map((p) => {
			const url = enlace(p.enlace);
			return { id: id(), hidden: false, name: txt(p.nombre, 160), period: txt(p.periodo, 60), website: url ? sitio(url) : web, description: vinetas(txt(p.descripcion, 700)) };
		}) as never[];
	s.volunteer.items = lista<Voluntariado>(f.voluntariado, 6)
		.filter((v) => txt(v?.organizacion))
		.map((v) => ({ id: id(), hidden: false, organization: txt(v.organizacion, 160), location: txt(v.lugar, 120), period: txt(v.periodo, 60), website: web, description: vinetas(txt(v.descripcion, 700)) })) as never[];
	s.references.items = lista<Referencia>(f.referencias, 4)
		.filter((r) => txt(r?.nombre))
		.map((r) => ({ id: id(), hidden: false, name: txt(r.nombre, 120), position: txt(r.cargo, 160), website: web, phone: txt(r.contacto, 80), description: "" })) as never[];
	s.interests.items = lista<Interes>(f.intereses, 8)
		.filter((i) => txt(i?.nombre))
		.map((i) => ({ id: id(), hidden: false, icon: "", iconColor: "", name: txt(i.nombre, 60), keywords: [] })) as never[];
	return parseResumeData(d);
}

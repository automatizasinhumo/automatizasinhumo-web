// API del motor del estudio de CV para la página (/servicios/cv).
// window.CvEstudio = { plantillas, formas, datosEjemplo, crearDatos, formEjemplo, formVacio, crearPdf, pintarPdf }.
import { createResumePdfBlob } from "../vendor/pdf/browser";
import { parseResumeData, type ResumeData } from "../vendor/schema/resume/data";
import { newResume, sanitizeResume } from "./adoptado/resume-model";
import { reactiveTemplates } from "./adoptado/templates";
import { FORMAS, fijarCapas, type Decoracion } from "./decoracion";
import { crearDatos, FORM_EJEMPLO, FORM_VACIO } from "./formulario";

export const plantillas = reactiveTemplates.map((t) => ({ id: t.id, color: t.color }));
export const formas = FORMAS;

const id = () => crypto.randomUUID();
const web = { url: "", label: "", inlineLink: false };

/** CV de ejemplo en español: el mismo para todas las miniaturas y la vista previa inicial. */
export function datosEjemplo(plantilla = "onyx"): ResumeData {
	const d = newResume(plantilla);
	d.metadata.page.locale = "es-ES";
	d.basics = {
		...d.basics,
		name: "Lucía Martín Ortega",
		headline: "Responsable de atención al cliente",
		email: "lucia.martin@correo.es",
		phone: "+34 600 123 456",
		location: "Valencia",
	};
	d.summary.content =
		"<p>Ocho años coordinando equipos de atención al cliente en comercio electrónico. He reducido los tiempos de respuesta a la mitad y mantengo una satisfacción superior al 95 %.</p>";
	const s = d.sections;
	s.experience.items = [
		{ id: id(), hidden: false, company: "Tienda Levante S. L.", position: "Responsable de atención al cliente", location: "Valencia", period: "2021 – actualidad", website: web, roles: [], description: "<ul><li><p>Dirijo un equipo de 9 personas en chat, correo y teléfono.</p></li><li><p>Implanté respuestas guiadas: tiempo medio de respuesta de 6 h a 2,5 h.</p></li></ul>" },
		{ id: id(), hidden: false, company: "Moda Norte", position: "Agente de atención al cliente", location: "Bilbao", period: "2017 – 2021", website: web, roles: [], description: "<ul><li><p>Gestión de devoluciones e incidencias de envío.</p></li><li><p>Formación de nuevas incorporaciones.</p></li></ul>" },
	] as never[];
	s.education.items = [
		{ id: id(), hidden: false, school: "Universitat de València", degree: "Grado", area: "Administración y Dirección de Empresas", grade: "", location: "Valencia", period: "2012 – 2016", website: web, description: "" },
	] as never[];
	s.skills.items = [
		{ id: id(), hidden: false, icon: "", iconColor: "", name: "Atención multicanal", proficiency: "Avanzado", level: 5, keywords: ["Zendesk", "Chat", "Teléfono"] },
		{ id: id(), hidden: false, icon: "", iconColor: "", name: "Gestión de equipos", proficiency: "Avanzado", level: 4, keywords: ["Turnos", "Formación"] },
		{ id: id(), hidden: false, icon: "", iconColor: "", name: "Análisis de datos", proficiency: "Intermedio", level: 3, keywords: ["Excel", "Looker Studio"] },
	] as never[];
	s.languages.items = [
		{ id: id(), hidden: false, language: "Español", fluency: "Nativo", level: 5 },
		{ id: id(), hidden: false, language: "Inglés", fluency: "C1", level: 4 },
		{ id: id(), hidden: false, language: "Valenciano", fluency: "C1", level: 4 },
	] as never[];
	s.certifications.items = [
		{ id: id(), hidden: false, title: "Customer Experience Professional", issuer: "CXPA", date: "2023", website: web, description: "" },
	] as never[];
	return parseResumeData(d);
}

let cola: Promise<unknown> = Promise.resolve();

export type OpcionesPdf = {
	datos: unknown;
	plantilla?: string;
	/** Color principal de la plantilla (#rrggbb). */
	color?: string;
	decoracion?: Partial<Decoracion> | null;
	/** Texto de la marca de agua; null o vacío para el PDF final. */
	marcaAgua?: string | null;
};

/** Genera el PDF. Los renders van en cola porque la decoración es estado del módulo. */
export function crearPdf({ datos, plantilla, color, decoracion, marcaAgua }: OpcionesPdf): Promise<Blob> {
	const trabajo = cola
		.catch(() => {})
		.then(async () => {
			const d = sanitizeResume(datos);
			d.metadata.page.locale = "es-ES";
			if (plantilla && plantillas.some((p) => p.id === plantilla)) d.metadata.template = plantilla as ResumeData["metadata"]["template"];
			if (color && /^#[0-9a-f]{6}$/i.test(color)) d.metadata.design.colors.primary = color;
			fijarCapas(decoracion as Decoracion | undefined, marcaAgua);
			return createResumePdfBlob({ data: d });
		});
	cola = trabajo;
	return trabajo;
}

/** Pinta las páginas de un PDF en lienzos (sirve en móvil, donde no hay visor de PDF). */
export async function pintarPdf(blob: Blob, contenedor: HTMLElement, { ancho = 800, maxPaginas = 3 } = {}) {
	const pdfjs = await import("pdfjs-dist");
	pdfjs.GlobalWorkerOptions.workerSrc = new URL("./pdf.worker.min.mjs", import.meta.url).href;
	const tarea = pdfjs.getDocument({ data: await blob.arrayBuffer(), useSystemFonts: true });
	try {
		const pdf = await tarea.promise;
		const frag = document.createDocumentFragment();
		const n = Math.min(pdf.numPages, maxPaginas);
		for (let i = 1; i <= n; i++) {
			const pagina = await pdf.getPage(i);
			const base = pagina.getViewport({ scale: 1 });
			const vista = pagina.getViewport({ scale: ancho / base.width });
			const lienzo = document.createElement("canvas");
			lienzo.width = Math.round(vista.width);
			lienzo.height = Math.round(vista.height);
			lienzo.setAttribute("role", "img");
			lienzo.setAttribute("aria-label", `Vista previa del CV, página ${i} de ${pdf.numPages}`);
			await pagina.render({ canvas: lienzo, viewport: vista }).promise;
			frag.append(lienzo);
		}
		contenedor.replaceChildren(frag);
		return pdf.numPages;
	} finally {
		void tarea.destroy();
	}
}

declare global {
	interface Window {
		CvEstudio: typeof api;
	}
}
const api = { plantillas, formas, datosEjemplo, crearDatos, formEjemplo: FORM_EJEMPLO, formVacio: FORM_VACIO, crearPdf, pintarPdf };
window.CvEstudio = api;

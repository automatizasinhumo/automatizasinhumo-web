// Importar un CV que el cliente ya tiene (PDF, Word, exportación de LinkedIn o JSON Resume) al formulario.
// Lectores de Reactive Resume (MIT) en vendor-import/, sin servidor: el fichero no sale del navegador.
// Se carga aparte (import dinámico) para no pesar en la vista previa.
import type { ResumeData } from "../vendor-import/schema/src/resume/data";
import { type PeriodEndpoint, parsePeriod } from "../vendor-import/schema/src/resume/period";
import { FORM_VACIO, type FormCv } from "./formulario-datos";

export type TipoImportable = "pdf" | "docx" | "linkedin" | "json";

const empieza = (b: Uint8Array, ...firma: number[]) => firma.every((x, i) => b[i] === x);

/** Decide el lector por los bytes, no por la extensión (como read-file.ts de Reactive Resume). */
export function tipoDe(bytes: Uint8Array, nombre: string): TipoImportable | null {
	if (empieza(bytes, 0x25, 0x50, 0x44, 0x46)) return "pdf"; // %PDF
	if (empieza(bytes, 0x50, 0x4b)) return /\.zip$/i.test(nombre) ? "linkedin" : "docx"; // PK
	const inicio = new TextDecoder().decode(bytes.subarray(0, 64)).trimStart();
	if (inicio.startsWith("{")) return "json";
	return null;
}

export type CargarPdfjs = () => Promise<typeof import("pdfjs-dist")>;

async function leerPdf(bytes: Uint8Array, nombre: string, cargarPdfjs: CargarPdfjs): Promise<ResumeData | null> {
	const [pdfjs, { HARVEST_DEFAULTS, harvestPdfDocument, buildExtractedDocument }, { parsePdfResume }] = await Promise.all([
		cargarPdfjs(),
		import("../vendor-import/resume/src/ats-pdf/index"),
		import("../vendor-import/import/src/pdf-lines"),
	]);
	const tarea = pdfjs.getDocument({ data: bytes.slice(), fontExtraProperties: true, useSystemFonts: true });
	try {
		const documento = await tarea.promise;
		const crudo = await harvestPdfDocument(documento as never, {
			file: { name: nombre, sizeBytes: bytes.byteLength, magicBytesOk: true },
			maxPages: HARVEST_DEFAULTS.maxPages,
			operatorBudgetMs: 0,
		});
		const doc = buildExtractedDocument(crudo);
		// Sin líneas de texto es un escaneo (una imagen): no hay nada que leer.
		return doc.lines.length ? (parsePdfResume(doc) as ResumeData) : null;
	} finally {
		void tarea.destroy();
	}
}

async function leer(tipo: TipoImportable, bytes: Uint8Array, nombre: string, cargarPdfjs: CargarPdfjs): Promise<ResumeData | null> {
	if (tipo === "pdf") return leerPdf(bytes, nombre, cargarPdfjs);
	if (tipo === "docx") {
		const [{ extractDocxText }, { parseResumeText }] = await Promise.all([
			import("../vendor-import/import/src/docx-text"),
			import("../vendor-import/import/src/plain-text"),
		]);
		return parseResumeText(extractDocxText(bytes));
	}
	if (tipo === "linkedin") return (await import("../vendor-import/import/src/linkedin")).parseLinkedInExport(bytes);
	return (await import("../vendor-import/import/src/json-resume")).parseJSONResume(new TextDecoder().decode(bytes)) as ResumeData;
}

/** HTML de Reactive Resume a texto plano: una línea por párrafo o viñeta. */
function texto(html: string | undefined): string {
	if (!html) return "";
	const doc = new DOMParser().parseFromString(html, "text/html");
	const bloques = [...doc.body.querySelectorAll("li, p, h1, h2, h3, h4")].filter((n) => !n.querySelector("li, p"));
	const lineas = bloques.length ? bloques.map((n) => n.textContent ?? "") : [doc.body.textContent ?? ""];
	return lineas.map((l) => l.replace(/\s+/g, " ").trim()).filter(Boolean).join("\n");
}

const corto = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "");
const puntos = (v: unknown) => Math.min(5, Math.max(0, Math.round(Number(v) || 0)));
const visibles = <T extends { hidden?: boolean }>(xs: T[] | undefined, max: number) => (xs ?? []).filter((x) => !x.hidden).slice(0, max);

// ---------- Ajustes al castellano ----------
// Los lectores siguen la costumbre inglesa (empresa arriba, fechas «Mar 2021 – Present»). Aquí se deja como
// lo escribe un CV en España, con reglas generales (no por caso): el texto sigue siendo editable.

const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sept", "oct", "nov", "dic"];
const fecha = (e: PeriodEndpoint) => (e.month ? `${MESES[e.month - 1]} ${e.year}` : String(e.year));

/** «Mar 2021 – Present» → «mar 2021 – actualidad». Si no se entiende, se deja tal cual. */
export function periodoEs(texto: string): string {
	const p = texto ? parsePeriod(texto, "es-ES") : null;
	if (!p?.start) return texto;
	const fin = p.ongoing ? "actualidad" : p.end ? fecha(p.end) : "";
	return fin ? `${fecha(p.start)} – ${fin}` : fecha(p.start);
}

// Palabras completas con lookarounds Unicode (\b de JS no conoce las tildes).
const palabra = (alternativas: string, flags = "u") => new RegExp(String.raw`(?<!\p{L})(?:${alternativas})(?!\p{L})`, flags);
const PARECE_EMPRESA = new RegExp(
	`${palabra(String.raw`S\.?\s?L\.?U?|S\.?\s?A\.?U?|S\.?\s?Coop|Ltd|Inc|GmbH|LLC|Grupo|Agencia|Ayuntamiento|Hospital|Consultor[ií]a`).source}|${String.raw`,\s*\p{Lu}[\p{L} .'-]{1,30}$`}`,
	"u",
);
const PARECE_CENTRO = palabra(String.raw`Universi\p{L}*|Instituto|Escuela|Escola|Colegio|IES|Centro|Academia|Facultad|Conservatorio|School|College`, "iu");
const PARECE_TITULO = palabra(String.raw`Grado|M[áa]ster|Licenciatura|Diplomatura|Doctorado|Ciclo|Bachillerato|T[ée]cnico|Curso|Certificado|Ingenier[íi]a|Graduado|FP`, "iu");

/** «Tienda Verde S.L., Sevilla» → ["Tienda Verde S.L.", "Sevilla"] cuando el lugar viene pegado al nombre. */
function separarLugar(nombre: string, lugar: string): [string, string] {
	if (lugar) return [nombre, lugar];
	const m = /^(.+?),\s*(\p{Lu}[\p{L} .'-]{1,30})$/u.exec(nombre);
	return m ? [m[1].trim(), m[2].trim()] : [nombre, ""];
}

/** La línea de contacto entera acaba a veces en «ubicación»: se queda el trozo que no es email, teléfono ni web. */
function soloLugar(texto: string): string {
	if (!/@|\d{3}|https?:|www\./i.test(texto)) return texto;
	const trozos = texto
		.split(/[·•|]| {2}/)
		.map((t) => t.trim())
		.filter((t) => t && !/@|\d{3}|https?:|www\./i.test(t));
	return trozos.at(-1) ?? "";
}

/** Corta «Inglés: C1» / «Francés (B2)» sin regex con retroceso: busca el primer separador a mano. */
function partirIdioma(texto: string): [string, string] {
	const t = texto.trim();
	const abre = t.indexOf("(");
	if (abre > 0 && t.endsWith(")")) return [t.slice(0, abre), t.slice(abre + 1, -1)];
	const corte = t.search(/[:–—-]/);
	return corte > 0 ? [t.slice(0, corte), t.slice(corte + 1)] : [t, ""];
}

/** «Inglés: C1», «Francés (B2)», «Español – nativo» → idioma, nivel y puntos. */
function idioma(nombre: string, nivel: string, puntos: number) {
	const [i, n] = nivel ? [nombre, nivel] : partirIdioma(nombre);
	const k = n.toLowerCase();
	const deducido = /nativ|bilin|materna|c2/.test(k) ? 5 : /c1|avanzad|fluid/.test(k) ? 4 : /b2|b1|intermed/.test(k) ? 3 : /a2|a1|b[áa]sic/.test(k) ? 2 : 0;
	return { idioma: i.trim(), nivel: n.trim(), puntos: puntos || deducido || 3 };
}

/**
 * Un nivel suelto («Avanzado», «Nativo», «C1»): en los CV a dos columnas el nivel va en su propia línea y
 * el lector lo toma por otro elemento. Puntos de 1 a 5 como en el formulario.
 */
const NIVELES: [RegExp, number][] = [
	[/^(nativ[oa]|biling[üu]e|lengua materna|materna|c2|experto|experta)$/, 5],
	[/^(c1|avanzad[oa]|alto|alta|fluido|fluida|profesional)$/, 4],
	[/^(b1|b2|intermedi[oa]|medio|media)$/, 3],
	[/^(a1|a2|b[áa]sico|b[áa]sica|bajo|baja|elemental)$/, 2],
];
export function nivelSuelto(texto: string): number {
	const t = texto.trim().toLowerCase().replace(/[.:]$/, "");
	return NIVELES.find(([re]) => re.test(t))?.[1] ?? 0;
}

/** Junta cada nivel suelto con el elemento anterior (si aún no tenía nivel) y lo quita de la lista. */
function juntarNiveles<T>(items: T[], nombre: (x: T) => string, tieneNivel: (x: T) => boolean, ponerNivel: (x: T, texto: string, puntos: number) => T): T[] {
	const out: T[] = [];
	for (const x of items) {
		const p = nivelSuelto(nombre(x));
		const previo = out.at(-1);
		if (p && previo !== undefined && !tieneNivel(previo)) out[out.length - 1] = ponerNivel(previo, nombre(x).trim(), p);
		else out.push(x);
	}
	return out;
}

/** ResumeData (esquema upstream) → formulario sencillo del estudio. Mismos límites que crearDatos. */
export function aFormulario(d: ResumeData): FormCv {
	const b = d.basics ?? ({} as ResumeData["basics"]);
	const s = d.sections;
	return {
		...FORM_VACIO,
		nombre: corto(b.name, 120),
		titular: corto(b.headline, 160),
		email: corto(b.email, 160),
		telefono: corto(b.phone, 60),
		ubicacion: corto(soloLugar(corto(b.location, 300)), 120),
		resumen: texto(d.summary?.content).slice(0, 1500),
		experiencia: visibles(s?.experience?.items, 12).map((e) => {
			let [puesto, empresa] = [corto(e.position, 160), corto(e.company, 160)];
			if (PARECE_EMPRESA.test(puesto) && !PARECE_EMPRESA.test(empresa)) [puesto, empresa] = [empresa, puesto];
			const [nombre, lugar] = separarLugar(empresa, corto(e.location, 120));
			return { puesto, empresa: nombre, lugar, periodo: periodoEs(corto(e.period, 60)), descripcion: texto(e.description).slice(0, 2000) };
		}),
		formacion: visibles(s?.education?.items, 8).map((e) => {
			let [titulo, centro] = [corto([e.degree, e.area].filter(Boolean).join(" en "), 200), corto(e.school, 160)];
			const alReves = (PARECE_CENTRO.test(titulo) && !PARECE_CENTRO.test(centro)) || (PARECE_TITULO.test(centro) && !PARECE_TITULO.test(titulo));
			if (alReves) [titulo, centro] = [centro, titulo];
			const [nombre, lugar] = separarLugar(centro, corto(e.location, 120));
			return { titulo, centro: nombre, lugar, periodo: periodoEs(corto(e.period, 60)) };
		}),
		habilidades: juntarNiveles(
			visibles(s?.skills?.items, 30).map((h) => ({ nombre: corto(h.name, 80), nivel: puntos(h.level), detalle: corto((h.keywords ?? []).join(", "), 200) })),
			(h) => h.nombre,
			(h) => h.nivel > 0,
			(h, _t, p) => ({ ...h, nivel: p }),
		)
			.slice(0, 15)
			.map((h) => ({ ...h, nivel: h.nivel || 3 })),
		idiomas: juntarNiveles(
			visibles(s?.languages?.items, 16).map((l) => idioma(corto(l.language, 100), corto(l.fluency, 40), puntos(l.level))),
			(r) => r.idioma,
			(r) => r.nivel !== "",
			(r, t, p) => ({ ...r, nivel: t, puntos: p }),
		)
			.slice(0, 8)
			.map((r) => ({ idioma: r.idioma.slice(0, 60), nivel: r.nivel.slice(0, 40), puntos: r.puntos })),
		// El carnet viaja en un campo propio con icono de coche (crearDatos le antepone «Carnet» si no lo trae).
		carnet: corto(
			(b.customFields ?? []).find((c) => c.icon === "car" || /^(carn[eé]t?|permiso)\b/i.test(c.text ?? ""))?.text?.replace(/^carn[eé]t?\s+(?=\S)/i, ""),
			80,
		),
		web: corto(b.website?.url, 300),
		linkedin: (() => {
			const p = visibles(s?.profiles?.items, 20).find((p) => /linkedin/i.test(`${p.network} ${p.website?.url}`));
			return corto(p?.website?.url || p?.username, 200);
		})(),
		cursos: visibles(s?.certifications?.items, 8).map((c) => ({ titulo: corto(c.title, 160), entidad: corto(c.issuer, 120), fecha: corto(c.date, 40) })),
		premios: visibles(s?.awards?.items, 6).map((c) => ({ titulo: corto(c.title, 160), entidad: corto(c.awarder, 120), fecha: corto(c.date, 40) })),
		publicaciones: visibles(s?.publications?.items, 6).map((c) => ({ titulo: corto(c.title, 160), entidad: corto(c.publisher, 120), fecha: corto(c.date, 40) })),
		proyectos: visibles(s?.projects?.items, 6).map((p) => ({ nombre: corto(p.name, 160), periodo: periodoEs(corto(p.period, 60)), enlace: corto(p.website?.url, 300), descripcion: texto(p.description).slice(0, 700) })),
		voluntariado: visibles(s?.volunteer?.items, 6).map((v) => ({ organizacion: corto(v.organization, 160), lugar: corto(v.location, 120), periodo: periodoEs(corto(v.period, 60)), descripcion: texto(v.description).slice(0, 700) })),
		referencias: visibles(s?.references?.items, 4).map((r) => ({ nombre: corto(r.name, 120), cargo: corto(r.position, 160), contacto: corto(r.phone, 80) })),
		intereses: visibles(s?.interests?.items, 8).map((i) => ({ nombre: corto(i.name, 60) })),
	};
}

export type ResultadoImportar = { ok: true; tipo: TipoImportable; form: FormCv } | { ok: false; motivo: "tipo" | "grande" | "vacio" | "lectura" };

const MAX_BYTES = 10 * 1024 * 1024;

/** Lee el fichero y devuelve el formulario relleno. Nunca lanza: la página enseña el motivo. */
export async function importarCv(fichero: Blob & { name?: string }, cargarPdfjs: CargarPdfjs): Promise<ResultadoImportar> {
	if (fichero.size > MAX_BYTES) return { ok: false, motivo: "grande" };
	let bytes: Uint8Array;
	try {
		bytes = new Uint8Array(await fichero.arrayBuffer());
	} catch (e) {
		// El navegador puede negarse a leerlo (archivo movido o borrado tras elegirlo, permisos).
		console.warn("importarCv", e);
		return { ok: false, motivo: "lectura" };
	}
	const nombre = fichero.name ?? "cv";
	const tipo = tipoDe(bytes, nombre);
	if (!tipo) return { ok: false, motivo: "tipo" };
	try {
		const datos = await leer(tipo, bytes, nombre, cargarPdfjs);
		if (!datos) return { ok: false, motivo: "vacio" };
		const form = aFormulario(datos);
		const algo = form.nombre || form.experiencia.length || form.formacion.length || form.resumen;
		return algo ? { ok: true, tipo, form } : { ok: false, motivo: "vacio" };
	} catch (e) {
		console.warn("importarCv", e);
		return { ok: false, motivo: "lectura" };
	}
}

// Lógica pura de la tarjeta imprimible (85 × 55 mm): qué abre el QR y qué texto lleva cada cara.
// Sin react-pdf: se prueba en node (test/storefront/cvTarjeta.test.ts).

/** Formato de imprenta: 85 × 55 mm de corte, 3 mm de sangrado por lado y 3 mm de seguridad. */
export const MM = 72 / 25.4;
export const CORTE = { w: 85, h: 55 } as const;
export const SANGRADO = 3;
export const SEGURIDAD = 3;
/** QR de 24 mm con su zona blanca: se lee bien a 20-30 cm con cualquier móvil. */
export const LADO_QR = 24;

export type DestinoQr = "tarjeta" | "linkedin" | "web" | "contacto";

export const DESTINOS_QR: readonly { id: DestinoQr; nombre: string; ayuda: string }[] = [
	{ id: "contacto", nombre: "Guardar mi contacto", ayuda: "El móvil ofrece guardarte en la agenda con tu nombre, teléfono y email." },
	{ id: "linkedin", nombre: "Mi LinkedIn", ayuda: "Abre tu perfil de LinkedIn." },
	{ id: "web", nombre: "Mi web", ayuda: "Abre la web que pongas en tus datos." },
	{ id: "tarjeta", nombre: "Mi tarjeta online", ayuda: "Abre tu página pública /c/tu-nombre (hay que publicarla antes)." },
];

export type DatosTarjeta = {
	nombre: string;
	cargo?: string;
	email?: string;
	telefono?: string;
	web?: string;
	ubicacion?: string;
	linkedin?: string;
	/** Dirección pública de la tarjeta online, si está publicada. */
	enlaceTarjeta?: string;
};

const limpio = (s: string | undefined) => (s ?? "").replace(/\s+/g, " ").trim();

/** Una dirección escrita a mano («miweb.es», «linkedin.com/in/x») pasa a https://… */
export function aUrl(s: string | undefined): string {
	const t = limpio(s);
	if (!t) return "";
	if (/^https?:\/\//i.test(t)) return t;
	if (/^[\w-]+(\.[\w-]+)+(\/\S*)?$/.test(t)) return `https://${t}`;
	return "";
}

/** LinkedIn admite el perfil entero o solo el usuario («lucia-martin»). */
export function urlLinkedin(s: string | undefined): string {
	const t = limpio(s).replace(/^@/, "");
	if (!t) return "";
	if (/linkedin\.com/i.test(t)) return aUrl(t);
	return /^[\w-]{3,100}$/.test(t) ? `https://www.linkedin.com/in/${t}` : "";
}

/** vCard 3.0 mínima: cabe holgada en un QR de 24 mm y la entienden iPhone y Android sin app. */
export function vcard(d: DatosTarjeta): string {
	const e = (s: string) => s.replace(/([\\;,])/g, "\\$1");
	const nombre = limpio(d.nombre);
	const partes = nombre.split(" ");
	const lineas = ["BEGIN:VCARD", "VERSION:3.0", `N:${e(partes.slice(1).join(" "))};${e(partes[0] ?? "")};;;`, `FN:${e(nombre)}`];
	if (limpio(d.cargo)) lineas.push(`TITLE:${e(limpio(d.cargo))}`);
	if (limpio(d.telefono)) lineas.push(`TEL;TYPE=CELL:${limpio(d.telefono).replace(/[^\d+]/g, "")}`);
	if (limpio(d.email)) lineas.push(`EMAIL:${limpio(d.email)}`);
	const web = aUrl(d.web) || urlLinkedin(d.linkedin);
	if (web) lineas.push(`URL:${web}`);
	lineas.push("END:VCARD");
	return lineas.join("\r\n");
}

/** Lo que codifica el QR. Vacío = ese destino no tiene datos (el estudio avisa y no pinta QR). */
export function contenidoQr(destino: DestinoQr, d: DatosTarjeta): string {
	switch (destino) {
		case "linkedin":
			return urlLinkedin(d.linkedin);
		case "web":
			return aUrl(d.web);
		case "tarjeta":
			return aUrl(d.enlaceTarjeta);
		case "contacto":
			return limpio(d.nombre) && (limpio(d.telefono) || limpio(d.email)) ? vcard(d) : "";
	}
}

/** Texto bajo el QR: dice qué pasa al escanearlo. */
export const rotuloQr = (destino: DestinoQr) => ({ contacto: "Guárdame en tu agenda", linkedin: "Mi LinkedIn", web: "Mi web", tarjeta: "Mi tarjeta online" })[destino];

/** Líneas de contacto del reverso, en el orden en que se leen. Las direcciones, sin «https://». */
export function lineasContacto(d: DatosTarjeta): { tipo: "telefono" | "email" | "web" | "linkedin" | "ubicacion"; texto: string }[] {
	const corta = (u: string) => u.replace(/^https?:\/\/(www\.)?/i, "").replace(/\/$/, "");
	const out: ReturnType<typeof lineasContacto> = [];
	if (limpio(d.telefono)) out.push({ tipo: "telefono", texto: limpio(d.telefono) });
	if (limpio(d.email)) out.push({ tipo: "email", texto: limpio(d.email) });
	if (aUrl(d.web)) out.push({ tipo: "web", texto: corta(aUrl(d.web)) });
	if (urlLinkedin(d.linkedin)) out.push({ tipo: "linkedin", texto: corta(urlLinkedin(d.linkedin)) });
	if (limpio(d.ubicacion)) out.push({ tipo: "ubicacion", texto: limpio(d.ubicacion) });
	return out;
}

/** Iniciales para el monograma: «Lucía Martín Ortega» → «LM». */
export function iniciales(nombre: string): string {
	return limpio(nombre)
		.split(" ")
		.filter((p) => p.length > 2 || /^[A-ZÁÉÍÓÚÑ]/.test(p))
		.slice(0, 2)
		.map((p) => p[0]!.toLocaleUpperCase("es"))
		.join("");
}

/** Cuerpo del nombre en el anverso: baja con nombres largos para no salirse de la zona segura. */
export function tamanoNombre(nombre: string, anchoPt: number): number {
	const n = Math.max(limpio(nombre).length, 1);
	// Ancho medio de un carácter en negrita ≈ 0,56 em.
	return Math.max(9, Math.min(17, anchoPt / (n * 0.56)));
}

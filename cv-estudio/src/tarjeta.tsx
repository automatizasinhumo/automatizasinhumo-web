// Tarjeta profesional imprimible a juego con el CV: PDF de dos páginas (anverso y reverso) de
// 91 × 61 mm, que es el corte estándar de 85 × 55 mm más 3 mm de sangrado por lado, como lo piden
// las imprentas (Vistaprint, Canva Print…). El arte es el de la plantilla del CV (arte.tsx), con su
// paleta y su letra; el QR va en vectorial (uqr), nunca en imagen.
import type { ReactElement } from "react";
import { Document, Page, Path, Rect, Svg, Text, View, pdf } from "@react-pdf/renderer";
import { encode } from "uqr";
import { formasArte, paleta, type Lienzo, type Paleta } from "../vendor/pdf/templates/creativos/arte";
import { VARIANTES } from "../vendor/pdf/templates/creativos/variantes";
import { registerFonts } from "../vendor/pdf/hooks/use-register-fonts";
import { ESTILOS_LETRA } from "./catalogo-formato";
import { CORTE, LADO_QR, MM, SANGRADO, SEGURIDAD, contenidoQr, iniciales, lineasContacto, rotuloQr, tamanoNombre, type DatosTarjeta, type DestinoQr } from "./tarjeta-datos";

export type OpcionesTarjeta = {
	datos: DatosTarjeta;
	plantilla: string;
	/** Color principal del CV (#rrggbb). */
	color: string;
	/** Id de ESTILOS_LETRA; sin él, la letra de serie de las plantillas (Lato). */
	letra?: string;
	destino: DestinoQr;
	/** Sin pagar: rótulo «VISTA PREVIA» dentro de la zona de corte (el sangrado se corta). */
	vistaPrevia: boolean;
};

// Página con sangrado, en puntos.
const W = (CORTE.w + 2 * SANGRADO) * MM;
const H = (CORTE.h + 2 * SANGRADO) * MM;
/** Margen hasta la zona segura: sangrado + seguridad. */
const M = (SANGRADO + SEGURIDAD) * MM;
// El arte está pensado para el ancho de un A4 (595 pt): se dibuja en un lienzo de ese ancho con la
// proporción de la tarjeta y el SVG lo reduce. Así las formas guardan su tamaño relativo.
const VW = 595;
const VH = (VW * H) / W;
const ESCALA = W / VW;

type Cara = { c: Paleta; titulos: string; texto: string; tinta: string };

function capaSvg(hijos: ReactElement[]) {
	return (
		<View style={{ position: "absolute", top: 0, left: 0, width: W, height: H }}>
			<Svg width={W} height={H} viewBox={`0 0 ${VW} ${VH}`}>
				{hijos}
			</Svg>
		</View>
	);
}

function marcaVista() {
	const fila = (top: number) => (
		<Text style={{ position: "absolute", top, left: M, right: M, textAlign: "center", fontFamily: "Helvetica-Bold", fontSize: 6, letterSpacing: 2, color: "#000000", opacity: 0.35 }}>
			VISTA PREVIA · VISTA PREVIA · VISTA PREVIA
		</Text>
	);
	return (
		<>
			{fila(M - 7)}
			{fila(H - M + 1)}
		</>
	);
}

/** Anverso: arte de la plantilla, nombre y cargo. */
function anverso(o: OpcionesTarjeta, k: Cara) {
	const v = VARIANTES[o.plantilla];
	const { c } = k;
	const nombre = o.datos.nombre.trim() || "Tu nombre";
	const cargo = (o.datos.cargo ?? "").trim();
	const lateral = !!v?.columna && v.lateral !== "ninguno";
	// «bandaArte: oscuro» (fabrica.tsx) es banda transparente con texto oscuro: en la tarjeta se trata
	// como una cabecera normal, con el texto al pie.
	const banda = v?.cabecera === "banda" && v.bandaArte !== "oscuro";
	const hc = VH * 0.58;
	const formas: ReactElement[] = [];
	let caja = { left: M, top: M, width: W - 2 * M, height: H - 2 * M };
	let alinear: "left" | "center" = v?.cabecera === "centrada" ? "center" : "left";
	let enBlanco = false;
	let abajo = false;

	if (!v) {
		// Plantillas clásicas: franja del color principal y filete del segundo color.
		formas.push(<Rect key="f" x={0} y={0} width={VW * 0.06} height={VH} fill={c.p} />, <Rect key="g" x={VW * 0.06} y={0} width={VW * 0.012} height={VH} fill={c.a} />);
		caja = { ...caja, left: W * 0.072 + M * 0.8, width: W - W * 0.072 - M * 1.8 };
	} else if (lateral) {
		const w = VW * 0.34;
		const x = v.lateral === "derecha" ? VW - w : 0;
		const fondo = v.fondoLateral === "primario" ? c.p : v.fondoLateral === "oscuro" ? c.osc : c.tin;
		const L: Lienzo = { W: VW, H: VH, c, hc: 0, mx: 30, lat: { x, w, fondo }, fondo: null };
		formas.push(...formasArte(v.arte, L));
		const anchoLat = w * ESCALA;
		caja = v.lateral === "derecha" ? { left: M, top: M, width: W - anchoLat - M * 1.6, height: H - 2 * M } : { left: anchoLat + M * 0.6, top: M, width: W - anchoLat - M * 1.6, height: H - 2 * M };
		alinear = "left";
	} else {
		const L: Lienzo = { W: VW, H: VH, c, hc: banda ? hc : (v.altoCabecera ?? 140), mx: 30, fondo: v.fondoPagina === "crema" ? "#fbf8f1" : v.fondoPagina === "tinte" ? c.tin : null };
		if (banda && !v.arte) formas.push(<Rect key="b" x={0} y={0} width={VW} height={hc} fill={v.bandaOscura ? c.osc : c.p} />);
		// Texto al pie (cabecera a la izquierda, sin banda): la capa fija del arte vive en las esquinas de
		// abajo y lo pisaría; en una tarjeta basta con la capa de cabecera.
		abajo = !banda && alinear === "left";
		formas.push(...formasArte(v.arte, L, abajo));
		if (banda) {
			caja = { left: M + (v.sangriaCabecera ?? 0) * ESCALA, top: M, width: W - 2 * M - (v.sangriaCabecera ?? 0) * ESCALA, height: hc * ESCALA - M };
			enBlanco = true;
		}
	}

	const tam = tamanoNombre(nombre, caja.width);
	const colorNombre = enBlanco ? "#ffffff" : k.tinta;
	const colorCargo = enBlanco ? "#ffffff" : c.p;
	const anchoLat = VW * 0.34 * ESCALA;
	const monograma =
		lateral && v ? (
			<View style={{ position: "absolute", top: 0, bottom: 0, width: anchoLat, ...(v.lateral === "derecha" ? { right: 0 } : { left: 0 }), justifyContent: "center", alignItems: "center" }}>
				<Text style={{ fontFamily: k.titulos, fontWeight: 700, fontSize: 30, letterSpacing: 1, color: v.fondoLateral === "tinte" ? c.p : "#ffffff" }}>{iniciales(nombre)}</Text>
			</View>
		) : null;

	return (
		<Page size={[W, H]} style={{ backgroundColor: "#ffffff" }}>
			{capaSvg(formas)}
			{monograma}
			<View style={{ position: "absolute", ...caja, justifyContent: abajo ? "flex-end" : "center", alignItems: alinear === "center" ? "center" : "flex-start" }}>
				<Text style={{ fontFamily: k.titulos, fontWeight: 700, fontSize: tam, lineHeight: 1.15, color: colorNombre, textAlign: alinear }}>{nombre}</Text>
				{cargo ? (
					<Text style={{ fontFamily: k.texto, fontSize: Math.max(7, Math.min(9.5, tam * 0.58)), marginTop: 4, color: colorCargo, opacity: enBlanco ? 0.92 : 1, textAlign: alinear, letterSpacing: 0.3 }}>{cargo}</Text>
				) : null}
				{!enBlanco ? <View style={{ width: 22, height: 1.6, backgroundColor: c.a, marginTop: 7 }} /> : null}
			</View>
			{o.vistaPrevia ? marcaVista() : null}
		</Page>
	);
}

/** QR como un único trazado vectorial: un cuadrado por módulo oscuro, con 4 módulos de zona blanca. */
export function trazadoQr(texto: string): { lado: number; d: string } {
	const qr = encode(texto, { ecc: "M", border: 4 });
	let d = "";
	qr.data.forEach((fila, y) =>
		fila.forEach((oscuro, x) => {
			if (oscuro) d += `M${x} ${y}h1v1h-1z`;
		}),
	);
	return { lado: qr.size, d };
}

/** Reverso: contactos a la izquierda y QR a la derecha, con una franja fina del color del CV. */
function reverso(o: OpcionesTarjeta, k: Cara) {
	const { c } = k;
	const lineas = lineasContacto(o.datos);
	const texto = contenidoQr(o.destino, o.datos);
	const ladoQr = LADO_QR * MM;
	const qr = texto ? trazadoQr(texto) : null;
	const nombre = o.datos.nombre.trim() || "Tu nombre";
	return (
		<Page size={[W, H]} style={{ backgroundColor: "#ffffff" }}>
			{capaSvg([<Rect key="f" x={0} y={VH - VH * 0.09} width={VW} height={VH * 0.09} fill={c.p} />, <Rect key="g" x={0} y={VH - VH * 0.09} width={VW * 0.3} height={VH * 0.09} fill={c.a} />])}
			<View style={{ position: "absolute", left: M, top: M, width: W - 2 * M - (qr ? ladoQr + 8 : 0), bottom: H * 0.09 + 4, justifyContent: "center" }}>
				<Text style={{ fontFamily: k.titulos, fontWeight: 700, fontSize: Math.min(10.5, tamanoNombre(nombre, W - 2 * M - ladoQr - 8)), color: k.tinta, marginBottom: 6 }}>{nombre}</Text>
				{lineas.map((l) => (
					<Text key={l.tipo} style={{ fontFamily: k.texto, fontSize: 7, lineHeight: 1.45, color: k.tinta }}>
						<Text style={{ color: c.p, fontWeight: 700 }}>{{ telefono: "Tel. ", email: "", web: "", linkedin: "in/ ", ubicacion: "" }[l.tipo]}</Text>
						{l.tipo === "linkedin" ? l.texto.replace(/^linkedin\.com\/in\//i, "") : l.texto}
					</Text>
				))}
			</View>
			{qr ? (
				<View style={{ position: "absolute", right: M, top: M - 2, width: ladoQr, alignItems: "center" }}>
					<Svg width={ladoQr} height={ladoQr} viewBox={`0 0 ${qr.lado} ${qr.lado}`}>
						<Rect x={0} y={0} width={qr.lado} height={qr.lado} fill="#ffffff" />
						<Path d={qr.d} fill="#111827" />
					</Svg>
					<Text style={{ fontFamily: k.texto, fontSize: 5.5, color: k.tinta, marginTop: 1 }}>{rotuloQr(o.destino)}</Text>
				</View>
			) : null}
			{o.vistaPrevia ? marcaVista() : null}
		</Page>
	);
}

/** Genera el PDF de la tarjeta (dos páginas con sangrado). */
export function crearTarjeta(o: OpcionesTarjeta): Promise<Blob> {
	const estilo = ESTILOS_LETRA.find((e) => e.id === o.letra);
	const t = registerFonts({ heading: { fontFamily: estilo?.titulos ?? "Lato" }, body: { fontFamily: estilo?.texto ?? "Lato" } } as never) as unknown as { heading: { fontFamily: string }; body: { fontFamily: string } };
	const v = VARIANTES[o.plantilla];
	const color = /^#[0-9a-f]{6}$/i.test(o.color) ? o.color : "#1f4e79";
	const k: Cara = { c: paleta(color, v?.giro), titulos: t.heading.fontFamily, texto: t.body.fontFamily, tinta: "#1f2937" };
	const doc = (
		<Document title={`Tarjeta ${o.datos.nombre}`.trim()} creator="automatizasinhumo">
			{anverso(o, k)}
			{reverso(o, k)}
		</Document>
	);
	return pdf(doc).toBlob();
}

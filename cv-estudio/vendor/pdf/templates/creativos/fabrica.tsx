// Plantillas creativas del estudio: una fábrica con las mismas piezas que el resto de
// plantillas (useTemplateBase, Section, TemplateProvider) y una descripción por variante:
// cabecera (banda de color, centrada con monograma, a la izquierda o dentro de la columna
// lateral), lateral (izquierda, derecha o ninguno) con su fondo, y estilo de los títulos
// (etiqueta, barra, subrayado, mayúsculas, doble filete, tarjetas).
// Propias del estudio (no vienen de Reactive Resume), bajo la misma licencia del proyecto.
import type { Style } from "@react-pdf/types";
import type { TemplatePageProps } from "../../document";
import type { TemplateColorRoles, TemplateStyleContext, TemplateStyleSlots } from "../shared/types";
import { Fragment, useMemo } from "react";
import { Page, StyleSheet, View } from "#react-pdf-renderer";
import { useRender } from "../../context";
import { useRenderedSectionIds, useResolvedNode } from "../../semantic/context";
import { semanticNodeKeys } from "../../semantic/node-keys";
import {
	CustomFieldContactItem,
	EmailContactItem,
	LocationContactItem,
	PhoneContactItem,
	WebsiteContactItem,
} from "../shared/contact-item";
import { TemplatePlacementProvider, TemplateProvider } from "../shared/context";
import { filterSections } from "../shared/filtering";
import { getTemplateMetrics } from "../shared/metrics";
import { PageMarginBackground } from "../shared/page-margin-background";
import { hasTemplatePicture } from "../shared/picture";
import {
	Heading,
	SemanticContactListView,
	SemanticHeaderPicture,
	SemanticHeaderView,
	SemanticRegionView,
	Text,
} from "../shared/primitives";
import { Section } from "../shared/sections";
import { composeStyles, headerNameLineHeight, resolvePlacementColor } from "../shared/styles";
import { createIconSlot, useTemplateBase } from "../shared/template-base";

export type Variante = {
	/** banda: bloque de color a todo el ancho · centrada · izquierda · lateral: dentro de la columna lateral. */
	cabecera: "banda" | "centrada" | "izquierda" | "lateral";
	lateral: "izquierda" | "derecha" | "ninguno";
	/** Fondo de la columna lateral. */
	fondoLateral: "tinte" | "primario" | "oscuro";
	titulos: "etiqueta" | "barra" | "subrayado" | "mayusculas" | "doble" | "punteado";
	/** Círculo con las iniciales junto al nombre. */
	monograma?: boolean;
	/** Secciones del cuerpo en tarjetas con borde redondeado. */
	tarjetas?: boolean;
	/** Multiplica el tamaño del nombre (1,5 × el de los títulos por defecto). */
	nombre?: number;
	/** Banda con el color oscuro en vez del principal. */
	bandaOscura?: boolean;
};

const mezclar = (hex: string, con: string, t: number) => {
	const n = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
	const a = n(hex);
	const b = n(con);
	return `#${a.map((x, i) => Math.round(x + (b[i]! - x) * t).toString(16).padStart(2, "0")).join("")}`;
};
const claro = (hex: string) => mezclar(hex, "#ffffff", 0.9);
const oscuro = (hex: string) => mezclar(hex, "#000000", 0.62);
const iniciales = (nombre: string) =>
	nombre
		.split(/\s+/)
		.filter((p) => /^\p{L}/u.test(p))
		.slice(0, 2)
		.map((p) => p[0]!.toUpperCase())
		.join("");

type Estilos = Omit<TemplateStyleSlots, "page"> & Record<string, Style | TemplateStyleSlots[keyof TemplateStyleSlots]> & { page: Style };

function usarVariante(v: Variante) {
	const { metadata, r, foreground, background, primary, metrics, base } = useTemplateBase();

	return useMemo(() => {
		const lateralFondo = v.fondoLateral === "primario" ? primary : v.fondoLateral === "oscuro" ? oscuro(primary) : claro(primary);
		const lateralTexto = v.fondoLateral === "tinte" ? foreground : "#ffffff";
		const colors: TemplateColorRoles = { foreground, background, primary, sidebarForeground: lateralTexto, sidebarBackground: lateralFondo };
		const bandaFondo = v.bandaOscura ? oscuro(primary) : primary;
		const fh = metadata.typography.heading.fontSize;
		const H = metrics.page.paddingHorizontal;
		const V = metrics.page.paddingVertical;
		const enLateral = v.cabecera === "lateral";

		const titulo: Style = (() => {
			const t = { fontSize: fh * 0.82, color: primary } as Style;
			switch (v.titulos) {
				case "etiqueta":
					return { ...t, color: "#ffffff", backgroundColor: primary, paddingHorizontal: 7, paddingVertical: 2, borderRadius: 3, alignSelf: "flex-start", textTransform: "uppercase", letterSpacing: 0.8 };
				case "barra":
					return { ...t, borderLeftWidth: 4, borderLeftColor: primary, paddingLeft: 7 };
				case "subrayado":
					return { ...t, borderBottomWidth: 1.5, borderBottomColor: primary, paddingBottom: metrics.gapY(0.125) };
				case "mayusculas":
					return { ...t, textTransform: "uppercase", letterSpacing: 2.2, fontSize: fh * 0.74 };
				case "doble":
					return { ...t, textTransform: "uppercase", letterSpacing: 1.4, textAlign: "center", borderTopWidth: 1, borderBottomWidth: 1, borderColor: primary, paddingVertical: 3 };
				case "punteado":
					return { ...t, borderBottomWidth: 1.2, borderBottomColor: primary, borderBottomStyle: "dotted", paddingBottom: metrics.gapY(0.125) };
			}
		})();

		const hoja = StyleSheet.create({
			...base,
			inline: { ...base.inline, columnGap: metrics.gapX(0.25) },
			page: { ...base.page, ...(enLateral ? { flexDirection: r.row } : { paddingHorizontal: H, paddingVertical: V, rowGap: metrics.sectionGap }) },
			section: { flexDirection: "column", rowGap: metrics.gapY(0.25) },
			sectionHeading: titulo,
			sectionItems: { paddingTop: metrics.gapY(0.25) },
			item: { rowGap: metrics.gapY(0.125) },
			levelContainer: { width: "70%" },
			columna: { flex: 1, minWidth: 0 },
			lateralCaja: { backgroundColor: lateralFondo },
			lateralTarjeta: { backgroundColor: lateralFondo, borderRadius: 8, paddingHorizontal: metrics.gapX(0.75), paddingVertical: metrics.gapY(0.75) },
			banda: {
				flexDirection: r.row,
				alignItems: "center",
				columnGap: metrics.gapX(1),
				backgroundColor: bandaFondo,
				marginHorizontal: -H,
				marginTop: -V,
				paddingHorizontal: H,
				paddingVertical: V * 1.1,
			},
			centrada: { alignItems: "center", rowGap: metrics.gapY(0.5), borderBottomWidth: 2, borderBottomColor: primary, paddingBottom: V * 0.8 },
			izquierda: { flexDirection: r.row, alignItems: "center", columnGap: metrics.gapX(1), borderLeftWidth: 5, borderLeftColor: primary, paddingLeft: metrics.gapX(1) },
			enLateral: { rowGap: metrics.gapY(0.6), paddingBottom: metrics.gapY(0.5) },
			titular: { flex: 1, rowGap: metrics.gapY(0.5) },
			identidad: { ...r.headerIdentity, rowGap: metrics.gapY(0.3) },
			nombre: { fontSize: fh * (v.nombre ?? 1.5), lineHeight: headerNameLineHeight },
			contactos: { flexDirection: r.row, flexWrap: "wrap", rowGap: metrics.gapY(0.125), columnGap: metrics.gapX(0.75) },
			contactosCentro: { flexDirection: r.row, flexWrap: "wrap", justifyContent: "center", rowGap: metrics.gapY(0.125), columnGap: metrics.gapX(0.75) },
			contactosColumna: { flexDirection: "column", rowGap: metrics.gapY(0.2) },
			contacto: { flexDirection: r.row, alignItems: "center", columnGap: metrics.gapX(1 / 6) },
			monograma: { width: 46, height: 46, borderRadius: 23, alignItems: "center", justifyContent: "center" },
			tarjeta: { borderWidth: 1, borderColor: mezclar(primary, "#ffffff", 0.72), borderRadius: 8, padding: metrics.gapY(0.7) },
		}) as unknown as Record<string, Style>;

		const textoEn = ({ placement, colors: c }: TemplateStyleContext) => resolvePlacementColor({ placement, defaultForeground: c.foreground, sidebarForeground: c.sidebarForeground });
		const acentoEn = ({ placement, colors: c }: TemplateStyleContext) => resolvePlacementColor({ placement, defaultForeground: c.primary, sidebarForeground: c.sidebarForeground });

		const styles = {
			...hoja,
			text: (c: TemplateStyleContext) => ({ ...hoja.text, color: textoEn(c) }),
			heading: (c: TemplateStyleContext) => ({ ...hoja.heading, color: textoEn(c) }),
			link: (c: TemplateStyleContext) => ({ ...hoja.link, color: textoEn(c) }),
			richParagraph: (c: TemplateStyleContext) => ({ ...hoja.richParagraph, color: textoEn(c) }),
			richListItemMarker: (c: TemplateStyleContext) => ({ ...hoja.richListItemMarker, color: textoEn(c) }),
			richListItemContent: (c: TemplateStyleContext) => ({ ...hoja.richListItemContent, color: textoEn(c) }),
			section: (c: TemplateStyleContext) => ({ ...hoja.section, ...(v.tarjetas && c.placement === "main" ? hoja.tarjeta : {}) }),
			splitRow: (c: TemplateStyleContext) => ({ ...hoja.splitRow, ...(c.placement === "sidebar" ? { flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start" } : {}) }),
			alignEnd: (c: TemplateStyleContext) => ({ ...hoja.alignEnd, ...(c.placement === "sidebar" ? { textAlign: "left" } : {}) }),
			sectionHeading: (c: TemplateStyleContext) => {
				const lateral = c.placement === "sidebar" && v.fondoLateral !== "tinte";
				if (!lateral) return { ...hoja.sectionHeading, color: v.titulos === "etiqueta" ? "#ffffff" : acentoEn(c) };
				// Sobre fondo de color: el acento pasa a ser el color del texto del lateral.
				const t = textoEn(c);
				return { ...hoja.sectionHeading, color: t, ...(v.titulos === "etiqueta" ? { backgroundColor: "rgba(255,255,255,0.22)" } : {}), borderBottomColor: t, borderLeftColor: t, borderTopColor: t, borderColor: t };
			},
			levelItem: (c: TemplateStyleContext) => ({ borderColor: acentoEn(c) }),
			levelItemActive: (c: TemplateStyleContext) => ({ backgroundColor: acentoEn(c) }),
			icon: createIconSlot({ metadata, accentFor: acentoEn }),
		} as unknown as Estilos;

		return { colors, styles, primary, background, lateralTexto, bandaFondo };
	}, [metadata, r.row, r.headerIdentity, primary, foreground, background, base, metrics, v]);
}

function Contactos({ estilo, item }: { estilo: Style; item: Style }) {
	const { basics } = useRender();
	return (
		<SemanticContactListView style={estilo}>
			<EmailContactItem email={basics.email} style={item} />
			<PhoneContactItem phone={basics.phone} style={item} />
			<LocationContactItem location={basics.location} style={item} />
			<WebsiteContactItem website={basics.website} style={item} />
			{basics.customFields.map((f) => (
				<CustomFieldContactItem key={f.id} field={f} style={item} />
			))}
		</SemanticContactListView>
	);
}

function Cabecera({ v, e }: { v: Variante; e: ReturnType<typeof usarVariante> }) {
	const { basics, picture } = useRender();
	const s = e.styles as unknown as Record<string, Style>;
	const foto = hasTemplatePicture(picture) ? <SemanticHeaderPicture src={picture.url} style={{ width: picture.size, height: picture.size, borderRadius: 999, objectFit: "cover" }} /> : null;
	const sobreColor = v.cabecera === "banda" || v.cabecera === "lateral";
	const mono = v.monograma && !foto && iniciales(basics.name) ? (
		<View style={{ ...s.monograma, backgroundColor: sobreColor ? (v.cabecera === "banda" ? "#ffffff" : "rgba(255,255,255,0.2)") : e.primary }}>
			<Heading style={{ fontSize: 17, color: sobreColor && v.cabecera === "banda" ? e.primary : "#ffffff", letterSpacing: 1 }}>{iniciales(basics.name)}</Heading>
		</View>
	) : null;
	const identidad = (
		<View style={s.identidad}>
			<Heading style={s.nombre}>{basics.name}</Heading>
			<Text>{basics.headline}</Text>
		</View>
	);
	const envoltorio = (hijos: React.ReactNode, estilo: Style, colocar: "sidebar" | "main") => (
		<SemanticHeaderView style={estilo}>
			<TemplatePlacementProvider placement={colocar}>{hijos}</TemplatePlacementProvider>
		</SemanticHeaderView>
	);

	if (v.cabecera === "banda")
		return envoltorio(
			<>
				{foto ?? mono}
				<View style={s.titular}>
					{identidad}
					<Contactos estilo={s.contactos!} item={s.contacto!} />
				</View>
			</>,
			s.banda!,
			"sidebar",
		);
	if (v.cabecera === "centrada")
		return envoltorio(
			<>
				{foto ?? mono}
				{identidad}
				<Contactos estilo={s.contactosCentro!} item={s.contacto!} />
			</>,
			s.centrada!,
			"main",
		);
	if (v.cabecera === "izquierda")
		return envoltorio(
			<>
				{foto ?? mono}
				<View style={s.titular}>
					{identidad}
					<Contactos estilo={s.contactos!} item={s.contacto!} />
				</View>
			</>,
			s.izquierda!,
			"main",
		);
	return envoltorio(
		<>
			{foto ?? mono}
			{identidad}
			<Contactos estilo={s.contactosColumna!} item={s.contacto!} />
		</>,
		s.enLateral!,
		"sidebar",
	);
}

export function crearPagina(v: Variante) {
	return function PaginaCreativa({ page, pageSize, pageMinHeightStyle, showHeader, pageNumber }: TemplatePageProps) {
		const data = useRender();
		const pageNodeKey = semanticNodeKeys.page(pageNumber);
		const { style: semanticPageStyle, size: semanticPageSize, ...semanticPageProps } = useResolvedNode(pageNodeKey);
		const { metadata } = data;
		const e = usarVariante(v);
		const s = e.styles as unknown as Record<string, Style>;
		const metrics = getTemplateMetrics(metadata.page);
		const principales = useRenderedSectionIds(pageNodeKey, filterSections(page.main, data));
		const laterales = useRenderedSectionIds(pageNodeKey, filterSections(page.sidebar, data));
		const sidebarStyle = useResolvedNode(semanticNodeKeys.region(pageNodeKey, "sidebar")).style;
		const sinLateral = v.lateral === "ninguno" || page.fullWidth;
		const izquierda = v.lateral === "izquierda";
		const cuerpo = sinLateral ? [...principales, ...laterales] : principales;

		const columnaPrincipal = (extra: Style, cabecera: boolean) => (
			<SemanticRegionView region="main" style={composeStyles(s.columna, extra)}>
				{cabecera && showHeader && <Cabecera v={v} e={e} />}
				{cuerpo.map((sec) => (
					<Section key={sec} section={sec} placement="main" />
				))}
			</SemanticRegionView>
		);

		let contenido: React.ReactNode;
		if (v.cabecera === "lateral") {
			// Columna lateral a toda la altura con la cabecera dentro; el cuerpo, al otro lado.
			const alto = metrics.page.paddingVertical;
			const lateral = (
				<SemanticRegionView
					region="sidebar"
					style={composeStyles(s.lateralCaja, {
						flexBasis: `${metadata.layout.sidebarWidth}%`,
						marginTop: -alto,
						paddingTop: alto,
						paddingHorizontal: metrics.gapX(1),
						rowGap: metrics.sectionGap,
					})}
				>
					<PageMarginBackground color={(sidebarStyle?.backgroundColor as string | undefined) ?? e.colors.sidebarBackground ?? e.primary} margin={alto} />
					{showHeader && <Cabecera v={v} e={e} />}
					{laterales.map((sec) => (
						<Fragment key={sec}>
							<Section section={sec} placement="sidebar" />
						</Fragment>
					))}
				</SemanticRegionView>
			);
			const principal = columnaPrincipal({ marginTop: -alto, paddingTop: alto, paddingHorizontal: metrics.page.paddingHorizontal * 0.8, rowGap: metrics.sectionGap }, false);
			contenido = izquierda ? (
				<>
					{lateral}
					{principal}
				</>
			) : (
				<>
					{principal}
					{lateral}
				</>
			);
		} else {
			const principal = columnaPrincipal({ rowGap: metrics.sectionGap }, false);
			const lateral = sinLateral ? null : (
				<SemanticRegionView region="sidebar" style={composeStyles(s.lateralTarjeta, { width: `${metadata.layout.sidebarWidth}%`, rowGap: metrics.sectionGap })}>
					{laterales.map((sec) => (
						<Section key={sec} section={sec} placement="sidebar" />
					))}
				</SemanticRegionView>
			);
			contenido = (
				<>
					{showHeader && <Cabecera v={v} e={e} />}
					<View style={{ flexDirection: "row", columnGap: metrics.columnGap, alignItems: "flex-start" }}>
						{izquierda && lateral}
						{principal}
						{!izquierda && lateral}
					</View>
				</>
			);
		}

		return (
			<Page {...semanticPageProps} size={semanticPageSize ?? pageSize} style={composeStyles(e.styles.page, pageMinHeightStyle, semanticPageStyle)}>
				<TemplateProvider pageNodeKey={pageNodeKey} styles={e.styles} colors={e.colors}>
					{contenido}
				</TemplateProvider>
			</Page>
		);
	};
}

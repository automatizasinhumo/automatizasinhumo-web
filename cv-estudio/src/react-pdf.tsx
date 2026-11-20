// Sustituye a "#react-pdf-renderer" para las plantillas de Reactive Resume.
// Reexporta @react-pdf/renderer tal cual y solo cambia <Page>: dibuja la decoración
// elegida (formas, sombreado) detrás del contenido y, en las vistas previas, la marca
// de agua delante. Las plantillas no se tocan: así se pueden actualizar desde upstream.
import { createElement, type ReactNode } from "react";
import * as R from "@react-pdf/renderer";
import { capaDecoracion, capaMarcaAgua } from "./decoracion";

export * from "@react-pdf/renderer";

type PropsPagina = R.PageProps & { children?: ReactNode };

export function Page({ children, ...props }: PropsPagina) {
	return createElement(R.Page, props, capaDecoracion(), children, capaMarcaAgua());
}

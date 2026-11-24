// El motor del estudio (cv-estudio/src) se empaqueta con esbuild, que no comprueba tipos: una
// llamada con argumentos de menos (p. ej. `regular(x, y, r)` sin `lados`) llega al PDF como un
// polígono vacío sin que nada falle. Aquí se comprueban, sin resolver dependencias, los errores
// que no dependen de ellas: número de argumentos y nombres sin declarar.
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';

const dir = fileURLToPath(new URL('../../cv-estudio/src/', import.meta.url));
const ficheros = readdirSync(dir)
	.filter((f) => /\.tsx?$/.test(f) && !f.endsWith('.d.ts'))
	.map((f) => dir + f);

// 2554/2555: número de argumentos; 2304/2552: nombre sin declarar (2552 cuando hay uno parecido).
const VIGILADOS = new Set([2554, 2555, 2304, 2552]);

describe('motor del estudio de CV', () => {
	it('ninguna llamada tiene argumentos de menos o de más ni usa nombres sin declarar', () => {
		const programa = ts.createProgram(ficheros, {
			noEmit: true,
			jsx: ts.JsxEmit.ReactJSX,
			target: ts.ScriptTarget.ES2022,
			module: ts.ModuleKind.ESNext,
			moduleResolution: ts.ModuleResolutionKind.Bundler,
			allowImportingTsExtensions: true,
			skipLibCheck: true,
			types: [],
		});
		const fallos = programa
			.getSourceFiles()
			.filter((s) => s.fileName.startsWith(dir.replace(/\\/g, '/')) || s.fileName.startsWith(dir))
			.flatMap((s) => programa.getSemanticDiagnostics(s))
			.filter((d) => VIGILADOS.has(d.code))
			.map((d) => {
				const pos = d.file ? d.file.getLineAndCharacterOfPosition(d.start ?? 0) : null;
				return `${d.file?.fileName.split('/').pop()}:${pos ? pos.line + 1 : '?'} TS${d.code} ${ts.flattenDiagnosticMessageText(d.messageText, ' ')}`;
			});
		expect(fallos).toEqual([]);
	}, 120_000);
});

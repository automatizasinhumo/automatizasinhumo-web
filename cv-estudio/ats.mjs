// Mide qué diseños lee bien un ATS (los filtros automáticos de las empresas): cada diseño genera el PDF
// limpio (sin marca de agua) con el CV de ejemplo y se comprueba como lo haría un ATS:
//  1. el texto se extrae con dos lectores distintos (pdf.js y, si está, pdftotext de Poppler),
//  2. el nombre está arriba (los ATS lo toman de las primeras líneas),
//  3. cada encabezado de sección va en su propia línea completa (si se junta con otro o con texto, el ATS
//     mezcla apartados),
//  4. nuestro importador (lector de CV de Reactive Resume) recupera contacto y cada experiencia y formación
//     (por puesto/empresa y título/centro: un registro repetido no tapa otro perdido).
// Sin pdftotext la medida queda incompleta: los diseños que pasan con pdf.js salen como «incompleto» y el
// proceso termina con código 2 (no se certifica un lector que no se ha probado).
// El resultado es la lista de `ats: true` de DISENOS_CV (src/features/servicios/cv.ts).
// Uso: con el sitio arrancado (npx astro dev), `node cv-estudio/ats.mjs [http://localhost:4321]`.
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { chromium } from 'playwright-core';

const BASE = process.argv[2] ?? 'http://localhost:4321';
const norm = (t) => String(t ?? '').toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/[:·]/g, ' ').replace(/\s+/g, ' ').trim();
/** Apartados del CV de ejemplo que deben aparecer, cada uno como línea completa (admite «laboral», «académica»…). */
const REQUERIDOS = ['experiencia', 'formacion|educacion', 'habilidades|aptitudes', 'idiomas'].map(
  (t) => new RegExp(`^(${t})( (laboral|profesional|academica))?$`),
);

const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');

/** Líneas de texto en el orden en que las entrega el PDF. */
async function lineas(bytes) {
  const tarea = pdfjs.getDocument({ data: bytes, useSystemFonts: true });
  const doc = await tarea.promise;
  const out = [];
  let actual = '';
  for (let n = 1; n <= doc.numPages; n++) {
    const { items } = await (await doc.getPage(n)).getTextContent();
    for (const it of items) {
      actual += it.str;
      if (it.hasEOL) {
        if (actual.trim()) out.push(actual.replace(/\s+/g, ' ').trim());
        actual = '';
      } else if (it.str && !it.str.endsWith(' ')) actual += ' ';
    }
  }
  if (actual.trim()) out.push(actual.trim());
  await tarea.destroy();
  return out;
}

// Mismo navegador que miniaturas.mjs: CHROMIUM=ruta, si no el de Playwright y, si falta, Edge.
const navegador = process.env.CHROMIUM ? await chromium.launch({ executablePath: process.env.CHROMIUM }) : await chromium.launch().catch(() => chromium.launch({ channel: 'msedge' }));
const pagina = await navegador.newPage();
await pagina.goto(`${BASE}/servicios/cv/`, { waitUntil: 'networkidle' });
await pagina.waitForFunction(() => !!window.CvEstudio, null, { timeout: 120000 });

const crudos = await pagina.evaluate(async () => {
  const m = window.CvEstudio;
  const norm = (s) => String(s ?? '').toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/\s+/g, ' ').trim();
  const ej = m.datosEjemplo();
  const exp = ej.sections.experience.items.map((e) => [e.position, e.company]);
  // La formación se identifica por titulación y centro (algún diseño parte «Grado» y el área en dos líneas).
  const form = ej.sections.education.items.map((e) => [e.degree, e.school]);
  // Cada registro esperado consume uno recuperado distinto (multiplicidad): un duplicado no cuenta por otro.
  const casan = (esperados, recuperados) => {
    const libres = recuperados.map((r) => r.map(norm));
    return esperados.every((e) => {
      const [a, b] = e.map(norm);
      const i = libres.findIndex((r) => r && r[0].startsWith(a) && r[1].startsWith(b));
      if (i < 0) return false;
      libres[i] = null;
      return true;
    });
  };
  const out = [];
  for (const { id } of m.plantillas) {
    const blob = await m.crearPdf({ datos: null, plantilla: id, muestra: true });
    const r = await m.importar(new File([blob], 'cv.pdf', { type: 'application/pdf' }));
    const g = r.ok ? r.form : null;
    const buf = new Uint8Array(await blob.arrayBuffer());
    out.push({
      id,
      bytes: Array.from(buf),
      nombre: ej.basics.name,
      recuperado: g && { exp: g.experiencia.map((e) => [e.puesto, e.empresa]), form: g.formacion.map((e) => [e.titulo, e.centro]) },
      importa:
        !!g &&
        norm(g.nombre) === norm(ej.basics.name) &&
        norm(g.email) === norm(ej.basics.email) &&
        g.experiencia.length === exp.length &&
        g.formacion.length === form.length &&
        casan(exp, g.experiencia.map((e) => [e.puesto, e.empresa])) &&
        casan(form, g.formacion.map((e) => [e.titulo, e.centro])),
    });
  }
  return out;
});
await navegador.close();

/** Segundo lector, si está instalado: pdftotext (Poppler), el que usan muchos ATS. Cada lector ordena distinto. */
const tmp = mkdtempSync(path.join(tmpdir(), 'ats-'));
// Ruta absoluta fija (o PDFTOTEXT con ruta absoluta): no se busca en el PATH.
const PDFTOTEXT = [process.env.PDFTOTEXT, '/usr/bin/pdftotext', '/usr/local/bin/pdftotext', '/opt/homebrew/bin/pdftotext'].find(
  (p) => p && path.isAbsolute(p) && existsSync(p),
);
const conPoppler = !!PDFTOTEXT && spawnSync(PDFTOTEXT, ['-v']).status === 0;
function lineasPoppler(bytes) {
  const f = path.join(tmp, 'cv.pdf');
  writeFileSync(f, bytes);
  const r = spawnSync(PDFTOTEXT, ['-enc', 'UTF-8', f, '-'], { encoding: 'utf8' });
  return r.stdout.split(/\r?\n/).map((l) => l.replace(/\s+/g, ' ').trim()).filter(Boolean);
}

const lee = (ls, nombre) => {
  const posNombre = ls.findIndex((l) => l.includes(nombre));
  const lineas = ls.map(norm);
  return {
    nombreArriba: posNombre >= 0 && posNombre < 3,
    encabezadosSueltos: REQUERIDOS.every((re) => lineas.some((l) => re.test(l))),
    faltan: REQUERIDOS.filter((re) => !lineas.some((l) => re.test(l))).map((re) => re.source.slice(2, re.source.indexOf(')'))),
  };
};

const filas = [];
for (const c of crudos) {
  const bytes = new Uint8Array(c.bytes);
  const a = lee(await lineas(bytes.slice()), c.nombre);
  const b = conPoppler ? lee(lineasPoppler(bytes), c.nombre) : a;
  const fila = { id: c.id, nombreArriba: a.nombreArriba && b.nombreArriba, encabezadosSueltos: a.encabezadosSueltos && b.encabezadosSueltos, importa: c.importa };
  const pasa = fila.nombreArriba && fila.encabezadosSueltos && fila.importa;
  fila.ats = pasa && !conPoppler ? 'incompleto' : pasa;
  filas.push(fila);
  // ATS_DETALLE=1: por qué no pasa cada diseño (encabezados que no salen en línea propia y registros leídos).
  if (process.env.ATS_DETALLE && !pasa) console.log(c.id, JSON.stringify({ pdfjs: a.faltan, poppler: b.faltan, recuperado: c.importa ? undefined : c.recuperado }));
}
rmSync(tmp, { recursive: true, force: true });
console.table(filas);
console.log(`ats: true → ${filas.filter((f) => f.ats === true).map((f) => f.id).join(', ')}`);
console.log(`ats: false → ${filas.filter((f) => !f.ats).map((f) => f.id).join(', ')}`);
if (!conPoppler) {
  console.error(`Sin pdftotext (PDFTOTEXT=ruta absoluta): medida incompleta, solo pdf.js → ${filas.filter((f) => f.ats === 'incompleto').map((f) => f.id).join(', ')}`);
  process.exitCode = 2;
}

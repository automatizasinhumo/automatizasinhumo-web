// Mide qué diseños lee bien un ATS (los filtros automáticos de las empresas): cada diseño genera el PDF
// limpio (sin marca de agua) con el CV de ejemplo y se comprueba como lo haría un ATS:
//  1. el texto se extrae con dos lectores distintos (pdf.js y, si está, pdftotext de Poppler),
//  2. el nombre está arriba (los ATS lo toman de las primeras líneas),
//  3. cada encabezado de sección va en su propia línea (si se juntan, el ATS mezcla apartados),
//  4. nuestro importador (lector de CV de Reactive Resume) recupera contacto, experiencia y formación.
// El resultado es la lista de `ats: true` de DISENOS_CV (src/features/servicios/cv.ts).
// Uso: con el sitio arrancado (npx astro dev), `node cv-estudio/ats.mjs [http://localhost:4321]`.
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { chromium } from 'playwright-core';

const BASE = process.argv[2] ?? 'http://localhost:4321';
const ENCABEZADOS = /^(resumen|perfil|experiencia|formaci[oó]n|educaci[oó]n|habilidades|aptitudes|idiomas|certificaciones|intereses|voluntariado|proyectos|premios|publicaciones|referencias)\b/i;

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
  const esperado = { nombre: ej.basics.name, email: ej.basics.email, exp: ej.sections.experience.items.length, form: ej.sections.education.items.length };
  const out = [];
  for (const { id } of m.plantillas) {
    const blob = await m.crearPdf({ datos: null, plantilla: id, muestra: true });
    const r = await m.importar(new File([blob], 'cv.pdf', { type: 'application/pdf' }));
    const g = r.ok ? r.form : null;
    const buf = new Uint8Array(await blob.arrayBuffer());
    out.push({
      id,
      bytes: Array.from(buf),
      nombre: esperado.nombre,
      importa: !!g && norm(g.nombre) === norm(esperado.nombre) && norm(g.email) === norm(esperado.email) && g.experiencia.filter((e) => e.puesto && e.empresa).length === esperado.exp && g.formacion.filter((e) => e.titulo && e.centro).length === esperado.form,
    });
  }
  return out;
});
await navegador.close();

/** Segundo lector, si está instalado: pdftotext (Poppler), el que usan muchos ATS. Cada lector ordena distinto. */
const tmp = mkdtempSync(path.join(tmpdir(), 'ats-'));
const conPoppler = spawnSync('pdftotext', ['-v']).status === 0;
function lineasPoppler(bytes) {
  const f = path.join(tmp, 'cv.pdf');
  writeFileSync(f, bytes);
  const r = spawnSync('pdftotext', ['-enc', 'UTF-8', f, '-'], { encoding: 'utf8' });
  return r.stdout.split(/\r?\n/).map((l) => l.replace(/\s+/g, ' ').trim()).filter(Boolean);
}

const lee = (ls, nombre) => {
  const posNombre = ls.findIndex((l) => l.includes(nombre));
  const juntos = ls.filter((l) => l.split(' ').filter((p) => ENCABEZADOS.test(p)).length >= 2 && l.split(' ').length <= 6);
  return { nombreArriba: posNombre >= 0 && posNombre < 3, encabezadosSueltos: juntos.length === 0 };
};

const filas = [];
for (const c of crudos) {
  const bytes = new Uint8Array(c.bytes);
  const a = lee(await lineas(bytes), c.nombre);
  const b = conPoppler ? lee(lineasPoppler(bytes), c.nombre) : a;
  const fila = { id: c.id, nombreArriba: a.nombreArriba && b.nombreArriba, encabezadosSueltos: a.encabezadosSueltos && b.encabezadosSueltos, importa: c.importa };
  fila.ats = fila.nombreArriba && fila.encabezadosSueltos && fila.importa;
  filas.push(fila);
}
rmSync(tmp, { recursive: true, force: true });
if (!conPoppler) console.warn('Sin pdftotext: solo se ha medido con pdf.js.');
console.table(filas);
console.log(`ats: true → ${filas.filter((f) => f.ats).map((f) => f.id).join(', ')}`);
console.log(`ats: false → ${filas.filter((f) => !f.ats).map((f) => f.id).join(', ')}`);

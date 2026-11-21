# Reactive Resume import readers — source attribution

Upstream: https://github.com/reactive-resume/reactive-resume
License: MIT, Copyright (c) 2026 Amruth Pillai. Full license in LICENSE (also listed in public/cv/estudio/motor/LICENCIAS.txt).
Pinned upstream revision: see UPSTREAM_COMMIT.

What is here: the closure of files that the browser import readers need, copied unchanged from `packages/*` at the pinned revision, keeping upstream paths (`<package>/src/<path>`). `cv-estudio/construir.mjs` resolves `@reactive-resume/<package>/<path>` imports made from inside this folder to `vendor-import/<package>/src/<path>`.

- `import/src`: PDF (`pdf-lines`, `pdf-geometry`), Word (`docx-text`), plain text, LinkedIn export (`linkedin`, `zip`) and JSON Resume readers.
- `resume/src/ats-pdf`: PDF text harvesting on top of pdf.js.
- `schema/src`, `utils/src`: the data model and helpers the readers return and use.

No upstream server, API, database or AI service is included: files are read in the visitor's browser.

Local modifications (Spanish CVs):
- `import/src/plain-text.ts`: Spanish section headings added to `SECTION_ALIASES` (perfil, experiencia laboral, formación, habilidades, idiomas, …); the period candidate also accepts «a» and «hasta» as range separators.
- `schema/src/resume/period.ts`: «a» and «hasta» accepted as spaced separators; Spanish month names (es-ES) are always recognised besides English and the resume's locale.

Spanish presentation (role before company, Spanish dates, «Inglés: C1») is done outside this folder, in `cv-estudio/src/importar.ts`, so the upstream copy stays easy to refresh.

To refresh: re-run the copy at a new upstream commit, update UPSTREAM_COMMIT, re-apply the modifications above and check `test/storefront/cvImportar.test.ts`.

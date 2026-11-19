-- 0046: embudo comercial y Core Web Vitals sin cookies (R15-13, R15-14).
-- Solo recuentos por día. Ni IP, ni identificador de visitante, ni URL completa:
-- no hay nada que relacione dos filas con la misma persona.
-- `origen` solo se rellena en las entradas (primera página de la visita); el resto
-- de pasos van con origen '' porque sin guardar nada en el navegador no se sabe.
CREATE TABLE IF NOT EXISTS embudo (
  dia TEXT NOT NULL,
  paso TEXT NOT NULL,
  origen TEXT NOT NULL DEFAULT '',
  ficha TEXT NOT NULL DEFAULT '',
  n INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (dia, paso, origen, ficha)
);

-- Una fila por día, métrica (LCP, INP, CLS) y tipo de página, con la nota que da
-- la propia librería web-vitals (buena / mejorable / mala).
CREATE TABLE IF NOT EXISTS vitales (
  dia TEXT NOT NULL,
  metrica TEXT NOT NULL,
  ruta TEXT NOT NULL,
  bueno INTEGER NOT NULL DEFAULT 0,
  mejorable INTEGER NOT NULL DEFAULT 0,
  malo INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (dia, metrica, ruta)
);

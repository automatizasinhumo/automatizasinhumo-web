-- 0052: visitas por día de cada página publicada (/w/<slug>, /c/<slug>). Solo un contador por
-- página y día: sin cookies, sin IP ni datos de quien visita. Lo enseña el panel del cliente.
CREATE TABLE IF NOT EXISTS paginas_visitas (
  tipo TEXT NOT NULL,
  slug TEXT NOT NULL,
  dia TEXT NOT NULL,
  n INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (tipo, slug, dia)
);

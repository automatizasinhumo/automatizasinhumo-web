-- 0055: citas pedidas desde la propia web publicada (/w/<slug>/reservas).
-- Instantes en milisegundos UTC. Cada cita confirmada ocupa sus tramos de 5 minutos en
-- citas_huecos: la clave primaria (slug, cubo) impide dos citas a la vez aunque lleguen
-- en el mismo instante (se insertan en un batch, que D1 ejecuta como transacción).
CREATE TABLE IF NOT EXISTS citas (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL,
  inicio INTEGER NOT NULL,
  fin INTEGER NOT NULL,
  estado TEXT NOT NULL DEFAULT 'confirmada' CHECK (estado IN ('confirmada', 'anulada')),
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL DEFAULT '',
  nota TEXT NOT NULL DEFAULT '',
  creado TEXT NOT NULL DEFAULT (datetime('now')),
  anulada TEXT
);
CREATE INDEX IF NOT EXISTS citas_slug_inicio ON citas (slug, inicio);
CREATE TABLE IF NOT EXISTS citas_huecos (
  slug TEXT NOT NULL,
  cubo INTEGER NOT NULL,
  cita_id TEXT NOT NULL,
  PRIMARY KEY (slug, cubo)
);
CREATE INDEX IF NOT EXISTS citas_huecos_cita ON citas_huecos (cita_id);

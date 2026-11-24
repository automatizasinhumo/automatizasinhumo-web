-- Vistas compartibles del estudio web: el cliente enseña su borrador (con marca de agua) antes de pagar.
-- Caducan a los 30 días; se purgan al guardar otra.
CREATE TABLE IF NOT EXISTS webs_borradores (
  id TEXT PRIMARY KEY,
  datos TEXT NOT NULL,
  creado TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS webs_borradores_creado ON webs_borradores (creado);

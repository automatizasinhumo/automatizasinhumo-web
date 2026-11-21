-- 0048: páginas publicadas por el cliente desde un estudio de autoservicio
-- (tarjeta digital en /c/<slug>, webs en /w/<slug>…). Un modelo para todas: ver
-- src/features/servicios/paginas.ts. Una página por pedido y tipo: el cliente la puede
-- volver a publicar con datos nuevos (misma dirección), nunca crear otra con el mismo pedido.
-- `datos` es JSON ya validado por el validador de su tipo.
CREATE TABLE IF NOT EXISTS paginas_publicadas (
  tipo TEXT NOT NULL,
  slug TEXT NOT NULL,
  pedido_public_id TEXT NOT NULL,
  datos TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (tipo, slug),
  UNIQUE (tipo, pedido_public_id)
);

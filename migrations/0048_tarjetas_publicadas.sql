-- 0048: tarjetas digitales publicadas desde el estudio del CV (autoservicio).
-- Una tarjeta por pedido pagado: el cliente la puede volver a publicar con datos nuevos
-- (misma dirección /c/<slug>), nunca crear otra con el mismo pedido.
-- `datos` es JSON ya validado por src/features/servicios/publicados.ts.
CREATE TABLE IF NOT EXISTS tarjetas_publicadas (
  slug TEXT PRIMARY KEY,
  pedido_public_id TEXT NOT NULL UNIQUE,
  datos TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

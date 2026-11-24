-- 0051: versiones anteriores de las páginas publicadas. Cada vez que el cliente vuelve a publicar
-- con datos distintos se guarda aquí lo que había; desde su panel puede verlas y restaurar una.
-- Se conservan las últimas 20 por página (ver publicarPagina en src/features/servicios/paginas.ts).
CREATE TABLE IF NOT EXISTS paginas_versiones (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tipo TEXT NOT NULL,
  pedido_public_id TEXT NOT NULL,
  datos TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_paginas_versiones_pedido ON paginas_versiones (tipo, pedido_public_id, id);

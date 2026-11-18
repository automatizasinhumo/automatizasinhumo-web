-- 0045: incidencias de la conciliación de pagos (C39). Una fila por incidencia
-- (tipo + referencia): repetir la pasada o recibir el mismo evento dos veces no
-- crea otra, y `avisada_at` garantiza un solo aviso. `vence_at` es el momento a
-- partir del cual, si sigue abierta, se avisa (margen para el webhook, 3 días para
-- un pago pendiente). Solo añade una tabla.
CREATE TABLE IF NOT EXISTS incidencias (
  clave TEXT PRIMARY KEY,
  tipo TEXT NOT NULL,
  ref TEXT NOT NULL,
  detalle TEXT NOT NULL DEFAULT '',
  vence_at TEXT NOT NULL,
  avisada_at TEXT,
  resuelta_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_incidencias_abiertas ON incidencias (vence_at) WHERE avisada_at IS NULL AND resuelta_at IS NULL;

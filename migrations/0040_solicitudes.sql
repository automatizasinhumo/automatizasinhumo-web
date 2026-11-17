-- 0040: solicitudes «Empieza gratis» (pruébalo antes de pagar).
-- El cliente rellena sus datos sin pagar; David prepara una vista previa y solo
-- cuando el cliente la aprueba se le manda el enlace de pago. Solo añade tablas.

CREATE TABLE IF NOT EXISTS solicitudes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL,
  producto TEXT,
  modalidad TEXT,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT,
  campos TEXT NOT NULL DEFAULT '{}',
  mensaje TEXT,
  estado TEXT NOT NULL DEFAULT 'nueva',
  nota TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  referrer TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_solicitudes_estado ON solicitudes(estado, created_at);
CREATE INDEX IF NOT EXISTS idx_solicitudes_email ON solicitudes(email);

-- Correos al cliente enviados desde Admin → Solicitudes. Una fila por
-- (solicitud, tipo, versión): un doble clic o un cambio de estado repetido no
-- duplica el envío. Un fallo deja la fila en 'error' para reintentar el mismo
-- evento; «Reenviar» reutiliza la fila y suma un intento.
CREATE TABLE IF NOT EXISTS notificaciones (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  solicitud_public_id TEXT NOT NULL,
  tipo TEXT NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  asunto TEXT NOT NULL,
  cuerpo TEXT NOT NULL,
  estado_envio TEXT NOT NULL DEFAULT 'pendiente',
  intentos INTEGER NOT NULL DEFAULT 0,
  error TEXT,
  enviado_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (solicitud_public_id, tipo, version)
);

CREATE INDEX IF NOT EXISTS idx_notificaciones_solicitud ON notificaciones (solicitud_public_id);

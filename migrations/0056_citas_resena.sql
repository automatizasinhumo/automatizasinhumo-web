-- 0056: una petición de reseña por cita, 72 h después de terminar (resenasCitas.ts).
-- pendiente -> reclamada (UPDATE condicional del cron) -> enviada | fallida; omitida si la web
-- no tiene un enlace de opiniones válido. Nunca se reintenta: como mucho un correo por cita.
ALTER TABLE citas ADD COLUMN resena_estado TEXT NOT NULL DEFAULT 'pendiente'
  CHECK (resena_estado IN ('pendiente', 'reclamada', 'enviada', 'fallida', 'omitida'));
ALTER TABLE citas ADD COLUMN resena_procesada TEXT;
CREATE INDEX IF NOT EXISTS citas_resena_pendientes ON citas (estado, resena_estado, fin);

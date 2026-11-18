-- 0044: el mismo envío del formulario (doble clic, reintento del navegador) no crea otra solicitud.
-- El formulario lleva un token por página mostrada; /api/solicitudes devuelve la solicitud que ya
-- tiene ese token. Aditiva: las solicitudes antiguas quedan con NULL y el índice no las incluye.
ALTER TABLE solicitudes ADD COLUMN envio TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS idx_solicitudes_envio ON solicitudes(envio) WHERE envio IS NOT NULL;
-- Reserva de los correos de confirmación y aviso: un reenvío con el mismo token no los repite
-- (el proveedor de Cloudflare ignora la clave de idempotencia). correos_at es la reserva; caduca
-- a los 10 minutos si nadie confirmó el envío (Worker cortado), y correos_enviados_at la cierra.
ALTER TABLE solicitudes ADD COLUMN correos_at TEXT;
ALTER TABLE solicitudes ADD COLUMN correos_enviados_at TEXT;

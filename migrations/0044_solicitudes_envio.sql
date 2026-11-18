-- 0044: el mismo envío del formulario (doble clic, reintento del navegador) no crea otra solicitud.
-- El formulario lleva un token por página mostrada; /api/solicitudes devuelve la solicitud que ya
-- tiene ese token. Aditiva: las solicitudes antiguas quedan con NULL y el índice no las incluye.
ALTER TABLE solicitudes ADD COLUMN envio TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS idx_solicitudes_envio ON solicitudes(envio) WHERE envio IS NOT NULL;
-- Reclamo de los correos de confirmación y aviso: un reenvío con el mismo token no los repite
-- (el proveedor de Cloudflare ignora la clave de idempotencia). Si el envío falla se libera y
-- el siguiente reintento del formulario los manda.
ALTER TABLE solicitudes ADD COLUMN correos_at TEXT;

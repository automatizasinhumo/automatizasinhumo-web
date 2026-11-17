-- Compra directa: la solicitud con los datos del cliente queda unida a su pedido
-- pagado, para que /order/<token> y /empezar/estado muestren el mismo progreso.
-- Aditiva: las solicitudes antiguas quedan con NULL (= prueba gratis o consulta).
ALTER TABLE solicitudes ADD COLUMN pedido_public_id TEXT;
CREATE INDEX IF NOT EXISTS idx_solicitudes_pedido ON solicitudes(pedido_public_id, slug);

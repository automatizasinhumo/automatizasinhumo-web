-- Hora de la reserva de un envío ('enviando'). Si el Worker muere entre el envío y
-- el UPDATE final, la fila quedaría en 'enviando' para siempre; con esta hora, una
-- reserva de más de 15 minutos se puede reclamar otra vez con el mismo intento (misma
-- clave de idempotencia, así el proveedor no duplica un correo que ya aceptó).
ALTER TABLE notificaciones ADD COLUMN reservado_at TEXT;
-- Identidad de cada reserva: el UPDATE final solo escribe si la reserva sigue siendo
-- suya, así un envío lento reclamado por otro no sobrescribe el resultado del nuevo.
ALTER TABLE notificaciones ADD COLUMN reserva TEXT;

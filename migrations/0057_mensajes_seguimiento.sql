-- Seguimiento de los mensajes del formulario de las webs (seguimientoMensajes.ts).
-- estado: nuevo | contestado | ganado | perdido. contestado: primera vez que el dueño respondió
-- desde el panel. recordado: cuándo se le recordó al dueño que seguía sin contestar (una vez).
ALTER TABLE webs_mensajes ADD COLUMN estado TEXT NOT NULL DEFAULT 'nuevo';
ALTER TABLE webs_mensajes ADD COLUMN contestado TEXT;
ALTER TABLE webs_mensajes ADD COLUMN recordado TEXT;
CREATE INDEX IF NOT EXISTS webs_mensajes_por_recordar ON webs_mensajes (creado) WHERE recordado IS NULL AND estado = 'nuevo';

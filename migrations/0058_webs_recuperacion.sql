-- Recuperar a quien empieza su web y no paga (ronda GPT 39): el borrador se guarda en
-- webs_borradores (mismo id que la vista con marca de agua) y aquí, el correo al que se manda
-- el enlace para seguir. Con «avisos» (casilla sin marcar por defecto) llegan además hasta 3
-- recordatorios (2 h, 24 h, 72 h). «paso» = correos ya enviados; «reservado» = plazo del cron
-- que lo está enviando (si falla, otro barrido lo retoma con la misma clave de idempotencia).
-- «fin»: baja | pagado | sustituido. Se borra a los 30 días, como el borrador.
CREATE TABLE IF NOT EXISTS webs_recuperacion (
  id              TEXT    PRIMARY KEY,
  email           TEXT    NOT NULL,
  avisos          INTEGER NOT NULL DEFAULT 0,
  consentimiento  TEXT,
  creado          TEXT    NOT NULL DEFAULT (datetime('now')),
  paso            INTEGER NOT NULL DEFAULT 0,
  reservado       TEXT,
  fin             TEXT,
  fin_en          TEXT,
  paso_fin        INTEGER
);

CREATE INDEX IF NOT EXISTS idx_webs_recuperacion_pendientes ON webs_recuperacion (creado) WHERE fin IS NULL;
CREATE INDEX IF NOT EXISTS idx_webs_recuperacion_email ON webs_recuperacion (email, creado);

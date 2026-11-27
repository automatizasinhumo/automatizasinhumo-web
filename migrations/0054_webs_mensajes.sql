-- Mensajes del formulario de contacto de las webs publicadas (/w/<slug>/mensaje).
-- El dueño los ve en su área de cliente; también se le avisan por correo.
CREATE TABLE IF NOT EXISTS webs_mensajes (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL,
  nombre TEXT NOT NULL DEFAULT '',
  contacto TEXT NOT NULL,
  texto TEXT NOT NULL,
  creado TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS webs_mensajes_slug_creado ON webs_mensajes (slug, creado);

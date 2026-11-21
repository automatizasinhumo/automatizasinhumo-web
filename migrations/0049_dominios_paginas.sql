-- 0049: dominio propio de una página publicada (de momento, las webs de /servicios/web).
-- Ver src/features/servicios/dominios.ts. El cliente escribe su dominio y el Worker lo añade como
-- zona a la cuenta de Cloudflare. El cliente cambia los servidores DNS en su registrador y el cron
-- conecta el dominio y su www al Worker cuando la zona está activa. Un dominio por pedido.
-- estado: esperando_dns -> conectando -> activo; error si Cloudflare lo rechaza (detalle).
CREATE TABLE IF NOT EXISTS dominios_paginas (
  dominio TEXT PRIMARY KEY,
  tipo TEXT NOT NULL,
  pedido_public_id TEXT NOT NULL,
  estado TEXT NOT NULL DEFAULT 'esperando_dns',
  zona_id TEXT,
  servidores TEXT,
  detalle TEXT,
  avisado INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (tipo, pedido_public_id)
);
CREATE INDEX IF NOT EXISTS dominios_paginas_estado ON dominios_paginas (estado, updated_at);

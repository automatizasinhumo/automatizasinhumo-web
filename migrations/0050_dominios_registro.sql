-- 0050: dominios que compramos nosotros para el cliente (Cloudflare Registrar), no solo los que conecta.
-- Ver src/features/servicios/registrador.ts. registrador = 'cloudflare' si lo registramos; NULL si el
-- dominio era del cliente. Nuevo estado previo: registrando -> esperando_dns -> conectando -> activo.
ALTER TABLE dominios_paginas ADD COLUMN registrador TEXT;

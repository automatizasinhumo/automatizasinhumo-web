#!/usr/bin/env bash
# Schemathesis (MIT) contra la API pública de solo lectura del staging (qa/api/openapi.yaml).
# Uso: BASE_URL=https://… bash qa/api/schemathesis.sh   (necesita `st` en el PATH)
#
# Comprobaciones excluidas, a propósito:
#   - negative_data_rejection: la API recorta `limit`/`offset` y acepta cualquier `q`/`slug`
#     (catálogo público y tolerante), así que no responde 4xx a valores fuera de rango.
#   - unsupported_method: TRACE y otros métodos raros los contesta el borde de Cloudflare
#     con un 405 sin cabecera Allow antes de llegar al Worker.
# Unas 60 peticiones de lectura por pasada: coste despreciable para el cupo de D1.
set -euo pipefail
: "${BASE_URL:?Falta BASE_URL}"
cd "$(dirname "$0")"
st run openapi.yaml \
  --url "$BASE_URL" \
  --checks all \
  --exclude-checks negative_data_rejection,unsupported_method \
  --phases examples,coverage,fuzzing \
  --max-examples "${MAX_EXAMPLES:-25}" \
  --header 'User-Agent: automatizasinhumo-qa-schemathesis' \
  --report junit --report-dir "${REPORT_DIR:-reports}"

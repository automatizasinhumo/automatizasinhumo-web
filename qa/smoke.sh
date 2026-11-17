#!/usr/bin/env bash
# Smoke de staging: rutas clave responden 200 y con el contenido esperado.
# Uso: BASE=https://automatizasinhumo-staging.davidpd89.workers.dev bash qa/smoke.sh
set -u
BASE="${BASE:-https://automatizasinhumo-staging.davidpd89.workers.dev}"
fail=0
check() { # ruta  texto-esperado
  local body code
  code="$(curl -sS -o /tmp/smoke.html -w '%{http_code}' --max-time 30 "$BASE$1")" || code=000
  if [[ "$code" != "200" ]]; then echo "FALLO $1 -> HTTP $code"; fail=1; return; fi
  if [[ -n "${2:-}" ]] && ! grep -qi -- "$2" /tmp/smoke.html; then echo "FALLO $1 -> falta '$2'"; fail=1; return; fi
  echo "ok   $1"
}
check / "Automatiza sin humo"
check /products "€"
check /pages/como-funciona "funciona"
check /pages/aviso-legal "David Porto"
check /pages/privacidad ""
check /cart ""
check /search?q=web ""
check /sitemap.xml "<urlset"
check /robots.txt "User-agent"
check /llms.txt ""
check /og-default.png ""
exit $fail

"""Cadena de proveedores de IA para la fábrica: si uno agota su cupo, contesta el siguiente.

Todos hablan la API de chat compatible con OpenAI (`/chat/completions`), así que un solo cliente
sirve para Workers AI, Groq y Mistral. El orden y los modelos salen de aquí; cada proveedor solo
entra si tiene su clave en el entorno.

- Workers AI (principal, sin tarjeta, no entrena con los datos): 10.000 neuronas/día, se reponen
  a las 00:00 UTC. Gemma 4 26B cuesta ~82 neuronas por llamada de 3.000+2.000 tokens (~120/día);
  Llama 3.3 70B costaba ~490 (~20/día). Precios: GET /ai/models/search (vigilancia.py lo vigila).
- Groq (GROQ_API_KEY, plan gratuito sin tarjeta, no entrena): 200.000 tokens/día, ~40 llamadas.
- Mistral (MISTRAL_API_KEY): el plan gratuito entrena con los datos salvo que se desactive
  «Anonymous improvement data» en Admin → Privacy. Poner la clave solo después de desactivarlo.

Gemini gratuito queda fuera: Google usa los datos del plan gratuito. GitHub Models se retiró el
30/07/2026. Consulta (GPT, 20/11/2026): .ci/continuidad-2026-11-20-ia-cadena.md.
"""

import json
import os
import time
import urllib.error
import urllib.request

# Fijados por ID (nunca «latest»): un cambio de modelo se prueba antes de entrar.
MODELO_CLOUDFLARE = os.environ.get('IA_MODELO') or '@cf/google/gemma-4-26b-a4b-it'
MODELO_GROQ = os.environ.get('GROQ_MODELO') or 'openai/gpt-oss-20b'
MODELO_MISTRAL = os.environ.get('MISTRAL_MODELO') or 'mistral-small-2506'

# Workers AI: 3036 (documentado) y 4006 (visto el 20/11) = neuronas del día agotadas; 5028 = modelo retirado.
CUPO_CLOUDFLARE = {3036, 4006}
RETIRADO_CLOUDFLARE = {5028}
# Frases con que Groq/Mistral/Cloudflare dicen que el límite es del día o del mes, no del minuto.
CUPO_TEXTO = ('per day', 'tokens per day', 'requests per day', '(tpd)', '(rpd)', 'daily', 'per month', 'monthly')
ESPERA_MAXIMA = 30  # segundos: un límite por minuto se espera; uno mayor salta al siguiente proveedor


class CupoIAAgotado(RuntimeError):
    """Todos los proveedores han agotado su cupo (Workers AI se repone a las 00:00 UTC)."""


# Proveedores fuera de juego durante esta ejecución: {nombre: motivo}. El motivo se escribe sin datos
# del cliente. ALERTAS recoge lo que necesita a una persona (modelo retirado, clave rechazada).
FUERA = {}
ALERTAS = []


def cadena(tok, acc):
    """Proveedores en orden de uso: (nombre, url, clave, modelo)."""
    salida = [('workers-ai', f'https://api.cloudflare.com/client/v4/accounts/{acc}/ai/v1/chat/completions',
               tok, MODELO_CLOUDFLARE)]
    if os.environ.get('GROQ_API_KEY'):
        salida.append(('groq', 'https://api.groq.com/openai/v1/chat/completions',
                       os.environ['GROQ_API_KEY'], MODELO_GROQ))
    if os.environ.get('MISTRAL_API_KEY'):
        salida.append(('mistral', 'https://api.mistral.ai/v1/chat/completions',
                       os.environ['MISTRAL_API_KEY'], MODELO_MISTRAL))
    return salida


def leer_error(cuerpo):
    """(códigos, texto en minúsculas) del cuerpo de un error, en el formato de Cloudflare o de OpenAI."""
    try:
        doc = json.loads(cuerpo or b'{}')
    except ValueError:
        return set(), ''
    if not isinstance(doc, dict):
        return set(), ''
    errores = doc.get('errors') if isinstance(doc.get('errors'), list) else []
    if isinstance(doc.get('error'), dict):
        errores = errores + [doc['error']]
    codigos = {e.get('code') for e in errores if isinstance(e, dict)}
    texto = ' '.join(str(e.get('message', '')) for e in errores if isinstance(e, dict)).lower()
    return codigos, texto


def clasificar(estado, cuerpo, cabeceras=None):
    """'cupo' | 'espera:<s>' | 'retirado' | 'credenciales' | 'pasajero' | 'peticion'."""
    codigos, texto = leer_error(cuerpo)
    if estado == 410 or codigos & RETIRADO_CLOUDFLARE:
        return 'retirado'
    if estado == 429:
        if codigos & CUPO_CLOUDFLARE or any(f in texto for f in CUPO_TEXTO):
            return 'cupo'
        try:
            espera = float((cabeceras or {}).get('retry-after') or 5)
        except ValueError:
            espera = 5
        return f'espera:{espera:g}' if espera <= ESPERA_MAXIMA else 'cupo'
    if estado in (401, 403):
        return 'credenciales'
    if estado == 402:
        return 'cupo'  # saldo agotado
    if estado >= 500 or estado == 408:
        return 'pasajero'
    return 'peticion'


def contenido(doc):
    """Texto de la respuesta: formato OpenAI (`choices`) o el antiguo de Workers AI (`result.response`)."""
    if isinstance(doc.get('choices'), list) and doc['choices']:
        texto = (doc['choices'][0].get('message') or {}).get('content')
    else:
        texto = (doc.get('result') or {}).get('response')
    if texto is None:
        raise ValueError('respuesta sin texto')
    return texto if isinstance(texto, str) else json.dumps(texto, ensure_ascii=False)


def llamar(url, clave, modelo, sistema, usuario):
    body = {'model': modelo, 'max_tokens': 4096,
            'messages': [{'role': 'system', 'content': sistema}, {'role': 'user', 'content': usuario}]}
    req = urllib.request.Request(url, data=json.dumps(body).encode(), headers={
        'Authorization': 'Bearer ' + clave, 'Content-Type': 'application/json'})
    with urllib.request.urlopen(req, timeout=180) as r:
        return contenido(json.load(r))


def completar(proveedores, sistema, usuario):
    """Primera respuesta de la cadena. Sin respuesta: CupoIAAgotado si todos agotaron el cupo; si no,
    el último error (la fábrica lo cuenta como intento fallido y reintenta en la siguiente ejecución)."""
    ultimo = None
    for nombre, url, clave, modelo in proveedores:
        if nombre in FUERA:
            continue
        for intento in range(3):
            try:
                return llamar(url, clave, modelo, sistema, usuario)
            except urllib.error.HTTPError as e:
                tipo = clasificar(e.code, e.read(), {k.lower(): v for k, v in (e.headers or {}).items()})
                ultimo = e
            except (urllib.error.URLError, TimeoutError, ValueError, KeyError) as e:
                tipo, ultimo = 'pasajero', e
            if tipo.startswith('espera:') and intento < 2:
                time.sleep(float(tipo.split(':')[1]))
                continue
            if tipo == 'pasajero' and intento < 2:
                time.sleep(5 * (intento + 1))
                continue
            if tipo in ('cupo', 'retirado', 'credenciales'):
                FUERA[nombre] = tipo
                print(f'  IA: {nombre} fuera ({tipo}); sigue el siguiente proveedor')
                if tipo != 'cupo':
                    ALERTAS.append(f'{nombre}: {tipo} ({modelo})')
            break  # siguiente proveedor
    if ultimo is None or all(FUERA.get(n) == 'cupo' for n, *_ in proveedores):
        raise CupoIAAgotado('ningún proveedor de IA con cupo: ' + ', '.join(f'{n} ({FUERA.get(n, "?")})' for n, *_ in proveedores))
    raise ultimo

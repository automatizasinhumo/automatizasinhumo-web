"""Fábrica nivel A: plantilla de demo (ya en español) + pedido del cliente -> web publicada.

Uso:
  C:/GIT/automatizasinhumo-demos/.venv/Scripts/python.exe -X utf8 manual/fabrica/fabricar.py RUTA/pedido.json [--no-deploy]

pedido.json (lo rellena el formulario/checkout; ver ejemplo-pedido.json):
  id, plantilla (ruta dentro del worker de demos), negocio, actividad, ciudad, telefono,
  email, whatsapp (opcional), descripcion (texto libre del cliente), servicios (lista).

Pasos: copia la plantilla de C:/GIT/automatizasinhumo-demos/site/<plantilla> a
clientes/<id>/site, quita la barra de la plantilla y el aviso de demo, reescribe los textos con
Workers AI (capa gratuita de la cuenta Cloudflare) usando los datos del cliente, cambia nombre,
correo y teléfono, y la publica en el Worker único «vistas» (Workers KV, /<id>/); si falla, Worker «web-<id>».
Credencial: la sesión local de wrangler (wrangler login). En Actions: CLOUDFLARE_API_TOKEN y
CLOUDFLARE_ACCOUNT_ID.
"""
import base64, html as H, json, os, re, shutil, subprocess, sys, tempfile, urllib.error, urllib.parse, urllib.request
from pathlib import Path
from bs4 import BeautifulSoup, NavigableString, Comment
import fastjsonschema  # BSD-3-Clause, https://github.com/horejsek/python-fastjsonschema
import phonenumbers  # Apache-2.0, https://github.com/daviddrysdale/python-phonenumbers (libphonenumber de Google)

DEMOS = Path(os.environ.get('DEMOS_DIR', 'C:/GIT/automatizasinhumo-demos'))
DEMOS_URL = 'https://automatizasinhumo-demos.davidpd89.workers.dev'
# En GitHub Actions los registros son públicos: no se escriben datos ni URLs de clientes.
PUBLICO = bool(os.environ.get('GITHUB_ACTIONS'))
MODELO = '@cf/meta/llama-3.3-70b-instruct-fp8-fast'
# Vistas previas en un único Worker («vistas/») que sirve /<id>/ruta desde Workers KV: sin un Worker por
# cliente (tope de 100 por cuenta) ni R2. Cada clave caduca sola a los VISTAS_TTL segundos.
# FABRICA_DESTINO=worker vuelve al Worker estático «web-<id>» de antes.
VISTAS_KV = os.environ.get('VISTAS_KV_ID', '1aaaeec9eb4749349137728fee3c6881')
VISTAS_URL = os.environ.get('VISTAS_URL', 'https://vistas.davidpd89.workers.dev')
VISTAS_TTL = 60 * 60 * 24 * 60
OMITIR_TAGS = {'script', 'style', 'code', 'pre', 'svg', 'template', 'textarea'}
LOTE = 25

# Respuesta de la IA por lote: claves numéricas y textos no vacíos. Lo que no cumpla cuenta como intento fallido.
validar_respuesta = fastjsonschema.compile({
    'type': 'object',
    'propertyNames': {'pattern': '^[0-9]+$'},
    'additionalProperties': {'type': 'string', 'minLength': 1, 'maxLength': 2000, 'pattern': '\\S'},
})
# Un texto de la plantilla de esta longitud que la IA no adapta bloquea la publicación;
# los cortos (un botón, un «OK») se toleran hasta TOLERANCIA_SIN_ADAPTAR del total.
LARGO_OBLIGATORIO = 15
TOLERANCIA_SIN_ADAPTAR = 0.2
RESTOS = re.compile(r'lorem ipsum|dolor sit amet', re.I)


def aplanar_respuesta(respuesta):
    """Textos válidos de la respuesta de la IA, por clave.

    El modelo a veces devuelve el nodo entero que recibió ({"ruta": …, "texto": …}), o ese objeto
    escrito como cadena, en vez del texto: entonces vale su «texto». Cada clave se valida por separado
    para que un valor malo no tire el lote entero; lo que no valga sigue pendiente para otro intento.
    """
    if not isinstance(respuesta, dict):
        raise ValueError('la respuesta no es un objeto JSON')
    salida = {}
    for clave, valor in respuesta.items():
        if isinstance(valor, str) and valor.lstrip().startswith('{'):
            try:
                valor = json.loads(valor)
            except ValueError:
                pass
        if isinstance(valor, dict):
            valor = valor.get('texto')
        try:
            salida.update(validar_respuesta({clave: valor}))
        except fastjsonschema.JsonSchemaException:
            continue
    return salida


class CupoIAAgotado(RuntimeError):
    """Workers AI agotó el cupo gratuito del día (se repone a las 00:00 UTC): reintentar antes no sirve."""


class FabricaBloqueada(RuntimeError):
    """La vista previa saldría con textos de la plantilla o datos de otro negocio: no se publica."""


def credenciales():
    tok, acc = os.environ.get('CLOUDFLARE_API_TOKEN'), os.environ.get('CLOUDFLARE_ACCOUNT_ID')
    if not tok:
        cfg = Path(os.environ.get('APPDATA', ''), 'xdg.config/.wrangler/config/default.toml')
        tok = re.search(r'oauth_token\s*=\s*"([^"]+)"', cfg.read_text()).group(1)
    if not acc:
        out = subprocess.run('npx wrangler whoami', shell=True, capture_output=True, text=True, encoding='utf-8').stdout
        acc = re.search(r'[0-9a-f]{32}', out).group(0)
    return tok, acc


def codigos_error(cuerpo):
    """Códigos de errors[].code de una respuesta de la API de Cloudflare; vacío si no se entiende."""
    try:
        errores = json.loads(cuerpo or b'{}').get('errors') or []
        return {e.get('code') for e in errores if isinstance(e, dict)}
    except (ValueError, AttributeError):
        return set()


def ia(tok, acc, sistema, usuario):
    body = {'messages': [{'role': 'system', 'content': sistema}, {'role': 'user', 'content': usuario}], 'max_tokens': 4096}
    req = urllib.request.Request(f'https://api.cloudflare.com/client/v4/accounts/{acc}/ai/run/{MODELO}',
                                 data=json.dumps(body).encode(), headers={'Authorization': 'Bearer ' + tok, 'Content-Type': 'application/json'})
    try:
        r = json.load(urllib.request.urlopen(req, timeout=180))['result']['response']
    except urllib.error.HTTPError as e:
        # 4006: «you have used up your daily free allocation of 10,000 neurons».
        if e.code == 429 and 4006 in codigos_error(e.read()):
            raise CupoIAAgotado('cupo diario de Workers AI agotado') from None
        raise
    return r if isinstance(r, str) else json.dumps(r, ensure_ascii=False)


def nombre_publico(p):
    for clave in ('negocio', 'evento', 'contacto'):
        nombre = p.get(clave)
        if isinstance(nombre, str) and nombre.strip():
            return nombre.strip()
    return ''


def ruta_nodo(nodo):
    partes = []
    actual = nodo.parent
    while getattr(actual, 'name', None) and actual.name != '[document]':
        indice = len(actual.find_previous_siblings(actual.name)) + 1
        partes.append(f'{actual.name}:nth-of-type({indice})')
        actual = actual.parent
    textos = [hijo for hijo in nodo.parent.contents if isinstance(hijo, NavigableString) and not isinstance(hijo, Comment)]
    indice_texto = next(i + 1 for i, hijo in enumerate(textos) if hijo is nodo)
    partes.reverse()
    partes.append(f'#text[{indice_texto}]')
    return ' > '.join(partes)


def contexto_nodos(nodos):
    textos = [nodo.strip() for nodo in nodos]
    return [
        {
            'ruta': ruta_nodo(nodo),
            'anterior': textos[i - 1] if i else '',
            'texto': texto,
            'siguiente': textos[i + 1] if i + 1 < len(textos) else '',
        }
        for i, (nodo, texto) in enumerate(zip(nodos, textos))
    ]


def reescribir(textos, p, cred):
    sistema = ('Eres redactor web para pequeños negocios de España. Adaptas los textos de una plantilla al negocio '
               'o evento del cliente. Mantén el contexto de la página y el orden de lectura; no adaptes frases aisladas. '
               'un dato del pedido aparece una sola vez por bloque. Español de España, tono cercano y concreto, '
               'sin inventar premios, cifras ni años. '
               'Los textos cortos (menú, botones, etiquetas, nombres de personas, clientes o proyectos) también se adaptan: '
               'nombres inventados de la plantilla pasan a ser genéricos del negocio o evento. Recibes un objeto JSON '
               'con nodos numerados; cada nodo contiene su ruta y las frases vecinas en orden. Responde SOLO con un '
               'objeto JSON con las mismas claves y, como valor, solo la cadena del texto adaptado (no el objeto del nodo).')
    nombre = nombre_publico(p)
    datos = (f"Negocio o evento: {nombre}. Actividad: {p['actividad']}. Ciudad: {p['ciudad']}. "
             f"Servicios: {', '.join(p.get('servicios', []))}. Lo que cuenta el cliente: {p.get('descripcion', '')}")
    salida = {}
    for i in range(0, len(textos), LOTE):
        pend = {str(k): textos[k] for k in range(i, min(i + LOTE, len(textos)))}
        for intento in range(3):
            if not pend:
                break
            try:
                r = ia(*cred, sistema, f'{datos}\n\nNodos de la página (orden de lectura):\n'
                       f'{json.dumps(pend, ensure_ascii=False)}')
                nuevo = aplanar_respuesta(json.loads(r[r.index('{'): r.rindex('}') + 1]))
                for k in [k for k in pend if k in nuevo]:
                    salida[k] = nuevo[k]
                    # Devuelto tal cual: se guarda, pero sigue pendiente para otro intento.
                    if ' '.join(nuevo[k].split()) != ' '.join(pend[k]['texto'].split()):
                        del pend[k]
            except CupoIAAgotado:
                raise  # sin cupo, los demás lotes también fallarían: la solicitud espera entera
            except Exception as e:  # noqa: BLE001 — lo que no se adapte conserva el texto de la plantilla
                print('  lote', i // LOTE, 'intento', intento + 1, type(e).__name__)
        print(f'  textos {min(i + LOTE, len(textos))}/{len(textos)} (sin adaptar: {len(pend)})', flush=True)
    return salida


def bajar_plantilla(plantilla):
    """Sin la carpeta local de demos (p. ej. en Actions), baja la plantilla del Worker de demos.

    Se baja a una carpeta temporal y solo se copia si trae su index.html; si no, error sin datos del cliente.
    """
    url = f"{DEMOS_URL}/{urllib.parse.quote(plantilla)}/"
    with tempfile.TemporaryDirectory() as tmp:
        try:
            r = subprocess.run(['wget', '-q', '-r', '-np', '-nH', '-p', '-e', 'robots=off', '-P', tmp, '--', url],
                               timeout=600, check=False)
        except (OSError, subprocess.TimeoutExpired) as e:
            raise RuntimeError(f'no se pudo bajar la plantilla ({type(e).__name__})') from None
        if r.returncode != 0:  # algún recurso (CSS, imagen) falló: no se guarda una plantilla a medias
            raise RuntimeError(f'descarga incompleta de la plantilla (wget {r.returncode})')
        bajada = Path(tmp, plantilla)
        if not (bajada / 'index.html').is_file():
            raise RuntimeError('la plantilla bajada no trae index.html')
        destino = DEMOS / 'site' / plantilla
        if destino.exists():
            shutil.rmtree(destino)
        shutil.copytree(bajada, destino)


def fabricar(ruta_pedido, desplegar=True):
    p = json.loads(Path(ruta_pedido).read_text(encoding='utf-8'))
    base = DEMOS / 'clientes' / p['id']
    site = base / 'site'
    if site.exists():
        shutil.rmtree(site)
    plantilla = p['plantilla']
    if not re.fullmatch(r'[a-z0-9-]+(/[a-z0-9-]+)*', plantilla):
        raise ValueError('ruta de plantilla no válida')
    if not (DEMOS / 'site' / plantilla / 'index.html').exists():
        bajar_plantilla(plantilla)
    shutil.copytree(DEMOS / 'site' / plantilla, site)
    idx = site / 'index.html'
    sopa = BeautifulSoup(idx.read_text(encoding='utf-8'), 'html.parser')

    for sel in ('#template-bar', '#ash-aviso'):
        for el in sopa.select(sel):
            el.decompose()
    for c in sopa.find_all(string=lambda s: isinstance(s, Comment)):
        c.extract()
    titulo = sopa.title.string if sopa.title and sopa.title.string else ''
    marca = H.unescape(titulo.split('|')[-1]).strip() if '|' in titulo else ''
    logo = sopa.select_one('[class*="brand"], [class*="logo"]')
    if not marca and logo is not None:
        texto_logo = logo.get_text(' ', strip=True)
        if 0 < len(texto_logo) < 40:
            marca = texto_logo

    nodos = [n for n in sopa.body.find_all(string=True) if isinstance(n, NavigableString)
             and not any(x.name in OMITIR_TAGS for x in n.parents if x.name) and re.search(r'[A-Za-zÁÉÍÓÚáéíóúñÑ]{2,}', n)]
    textos = contexto_nodos(nodos)
    print(f"  {len(textos)} textos a adaptar" if PUBLICO else
          f"{p['id']}: {len(textos)} textos a adaptar (marca de la plantilla: {marca or '?'})")
    nuevos = reescribir(textos, p, credenciales())
    comprobar_adaptacion(textos, nuevos, marca)
    for i, n in enumerate(nodos):
        t = nuevos.get(str(i))
        if t:
            n.replace_with(n[: len(n) - len(n.lstrip())] + t + n[len(n.rstrip()):])

    final = barra_contacto(poner_datos(str(sopa), p, marca), p)
    restos = restos_de_plantilla(final, marca, nombre_publico(p))
    if restos:
        raise FabricaBloqueada('restos de la plantilla: ' + ', '.join(restos))
    idx.write_text(final, encoding='utf-8')
    # Una vista previa no es la web del cliente: que ningún buscador la indexe.
    (site / '_headers').write_text('/*\n  X-Robots-Tag: noindex\n', encoding='utf-8')

    # Configuración para publicarla como Worker propio: la usa el respaldo y va en el ZIP de entrega.
    nombre = 'web-' + re.sub(r'[^a-z0-9-]', '-', p['id'].lower())[:50]
    (base / 'wrangler.jsonc').write_text(json.dumps(
        {'name': nombre, 'compatibility_date': '2026-11-01', 'assets': {'directory': './site'}}, indent=2), encoding='utf-8')
    if not desplegar:
        print('generada sin publicar en', site)
        return None
    if os.environ.get('FABRICA_DESTINO') == 'worker':
        return desplegar_worker(base, p)
    # Si KV falla (permiso del token, cupo de escrituras), no se pierde la vista previa: Worker propio.
    return publicar_kv(site, p) or desplegar_worker(base, p)


def pares_kv(site, ident):
    """Una clave «sites/<id>/<ruta>» por fichero, en base64 y con caducidad (formato de `wrangler kv bulk put`)."""
    pares = []
    for f in sorted(site.rglob('*')):
        if f.is_file() and f.name != '_headers':
            pares.append({'key': f'sites/{ident}/{f.relative_to(site).as_posix()}', 'base64': True,
                          'value': base64.b64encode(f.read_bytes()).decode('ascii'), 'expiration_ttl': VISTAS_TTL})
    return pares


def publicar_kv(site, p):
    ident = re.sub(r'[^a-z0-9-]', '-', p['id'].lower())[:50]
    with tempfile.TemporaryDirectory() as tmp:
        lote = Path(tmp, 'kv.json')
        lote.write_text(json.dumps(pares_kv(site, ident)), encoding='utf-8')
        try:
            r = subprocess.run(['npx', 'wrangler', 'kv', 'bulk', 'put', str(lote), '--namespace-id', VISTAS_KV, '--remote'],
                               shell=os.name == 'nt', capture_output=True, text=True, encoding='utf-8', timeout=900,
                               stdin=subprocess.DEVNULL)
        except (OSError, subprocess.TimeoutExpired) as e:
            print('publicación en KV fallida', type(e).__name__)
            return None
    if r.returncode != 0:
        print(f'publicación fallida (código {r.returncode})' if PUBLICO else 'publicación fallida: ' + (r.stdout + r.stderr)[-800:])
        return None
    url = f'{VISTAS_URL}/{ident}/'
    print('publicada' if PUBLICO else f'publicada: {url}')
    return url


def desplegar_worker(base, p):
    r = subprocess.run('npx wrangler deploy', shell=True, cwd=base, capture_output=True, text=True, encoding='utf-8',
                       timeout=600, stdin=subprocess.DEVNULL)
    url = re.search(r'https://\S+\.workers\.dev', r.stdout + r.stderr)
    if PUBLICO:
        print('publicada' if url else f'despliegue fallido (código {r.returncode})')
    else:
        print('publicada:', url.group(0) if url else (r.stdout + r.stderr)[-800:])
    return url.group(0) if url else None


def comprobar_adaptacion(textos, nuevos, marca=''):
    """Un fallo de la IA no publica la plantilla a medias: bloquea la vista previa."""
    # Sin respuesta o devuelto tal cual: los dos casos son la plantilla sin adaptar.
    # Un texto con la marca devuelto igual sí vale: poner_datos() pone ahí el nombre del cliente.
    sin = [t['texto'] for i, t in enumerate(textos)
           if ' '.join(nuevos.get(str(i), '').split()) in ('', ' '.join(t['texto'].split()))
           and not (str(i) in nuevos and marca and marca in t['texto'])]
    largos = [t for t in sin if len(t) >= LARGO_OBLIGATORIO]
    if largos or (textos and len(sin) > TOLERANCIA_SIN_ADAPTAR * len(textos)):
        raise FabricaBloqueada(f'la IA dejó {len(sin)} de {len(textos)} textos sin adaptar')


def restos_de_plantilla(html, marca, nombre):
    """Lo que el cliente vería de la plantilla original: su marca (en cualquier mayúscula) o texto de relleno."""
    sopa = BeautifulSoup(html, 'html.parser')
    for el in sopa(['script', 'style', 'template']):
        el.decompose()
    visible = ' '.join([sopa.get_text(' ')] + [
        el.get(a, '') for el in sopa.find_all(True) for a in ('alt', 'title', 'aria-label', 'placeholder', 'content')
        if el.get(a)])
    restos = []
    # El nombre del cliente puede contener la marca («Lumen Ana»): se quitan sus apariciones
    # y se busca la marca en lo que queda.
    resto = re.sub(re.escape(nombre), ' ', visible, flags=re.I) if nombre else visible
    # Palabra entera: con la marca «Lumen», «volumen» no es un resto; «ESTUDIO_LUMEN» sí (el _ separa).
    if marca and len(marca) >= 3 and re.search(rf'(?<![^\W_]){re.escape(marca)}(?![^\W_])', resto, re.I):
        restos.append('marca de la plantilla')
    if RESTOS.search(visible):
        restos.append('texto de relleno')
    return restos


# Correo admitido en el HTML: sin comillas, espacios ni signos que cierren un atributo o una etiqueta.
CORREO_VALIDO = re.compile(r'[\w.+-]+@[\w-]+(?:\.[\w-]+)+')


def poner_datos(out, p, marca):
    """Pone nombre, correo, teléfono y título del cliente en el HTML serializado de la plantilla.

    Todo dato del pedido entra escapado: el formulario es público y un nombre con «<script>»
    o un correo con comillas no deben convertirse en HTML de la vista previa.
    """
    negocio = H.escape(nombre_publico(p))
    correo = p['email'].strip()
    if not CORREO_VALIDO.fullmatch(correo):
        raise ValueError('correo del pedido no válido')
    correo = H.escape(correo)
    if marca:
        # Una sola pasada: un nombre que contenga la marca («Lumen Ana») no se vuelve a sustituir.
        formas = sorted({H.escape(marca), marca}, key=len, reverse=True)
        out = re.sub('|'.join(map(re.escape, formas)), lambda _: negocio, out)
    out = re.sub(r'href="mailto:[^"]*"', lambda _: f'href="mailto:{correo}"', out)
    tel = re.sub(r'[^0-9+]', '', p['telefono'])
    out = re.sub(r'href="tel:[^"]*"', lambda _: f'href="tel:{tel}"', out)
    wa = numero_internacional(p.get('whatsapp') or '')
    href_wa = r'''href=["']https?://(?:www\.)?(?:wa\.me|api\.whatsapp\.com|whatsapp\.com)/[^"']*["']'''
    if wa:
        # Cualquier forma de enlace de WhatsApp de la plantilla (wa.me o api.whatsapp.com) pasa al número del cliente.
        out = re.sub(href_wa, lambda _: f'href="https://wa.me/{wa}"', out, flags=re.I)
    else:
        # Sin WhatsApp válido, el botón de la plantilla llamaría al número de otro negocio: pasa a llamar
        # al cliente, y su texto/etiqueta dice «Llamar» en vez de «WhatsApp».
        def a_llamada(m):
            a = re.sub(href_wa, f'href="tel:{tel}"', m.group(0), flags=re.I)
            # Solo el texto visible y las etiquetas accesibles: clases, ids y <use href="#whatsapp"> se quedan.
            cambia = lambda t: re.sub(r'whats\s*app', 'Llamar', t, flags=re.I)
            a = re.sub(r'>([^<]*)<', lambda t: '>' + cambia(t.group(1)) + '<', a)
            return re.sub(r'''(\b(?:aria-label|title)=)(["'])(.*?)\2''',
                          lambda t: t.group(1) + t.group(2) + ('Llamar' if cambia(t.group(3)) != t.group(3) else t.group(3)) + t.group(2), a, flags=re.I | re.S)
        out = re.sub(r'<a\s[^>]*' + href_wa + r'[^>]*>.*?</a>', a_llamada, out, flags=re.I | re.S)
        out = re.sub(href_wa, lambda _: f'href="tel:{tel}"', out, flags=re.I)
    # Igual con los correos sueltos de la plantilla: una pasada, sin tocar el ya puesto.
    out = CORREO_VALIDO.sub(lambda _: correo, out)
    titulo = f"<title>{negocio} · {H.escape(p['actividad'])} en {H.escape(p['ciudad'])}</title>"
    out = re.sub(r'<title>[^<]*</title>', lambda _: titulo, out, count=1)
    # Los atributos pueden venir en cualquier orden y con cualquier comilla.
    out = re.sub(r'''<link\b[^>]*\brel=["']?canonical\b[^>]*>'''
                 r'''|<meta\b[^>]*\bproperty=["']?og:(?:url|image)\b[^>]*>'''
                 r'''|<meta\b[^>]*\bname=["']?robots\b[^>]*>''', '', out, flags=re.I)
    return re.sub(r'<head[^>]*>', lambda m: m.group(0) + '<meta name="robots" content="noindex">', out, count=1)


def numero_internacional(numero, region='ES'):
    """Número en formato internacional sin «+» (lo que piden wa.me y tel:), o '' si no es válido.

    libphonenumber decide: «600111222» -> «34600111222»; un número corto o inventado, ''.
    """
    try:
        n = phonenumbers.parse(numero or '', region)
    except phonenumbers.NumberParseException:
        return ''
    return phonenumbers.format_number(n, phonenumbers.PhoneNumberFormat.E164)[1:] if phonenumbers.is_valid_number(n) else ''


# Barra fija de contacto solo en móvil: el primer clic (llamar o escribir) siempre a la vista.
BARRA_CSS = (
    '<style id="ash-contacto-css">#ash-contacto{display:none}'
    '@media (max-width:768px){#ash-contacto{display:flex;position:fixed;left:0;right:0;bottom:0;z-index:2147483000;'
    'gap:8px;padding:8px 8px calc(8px + env(safe-area-inset-bottom));background:#fff;box-shadow:0 -2px 8px rgba(0,0,0,.15)}'
    '#ash-contacto a{flex:1;display:flex;align-items:center;justify-content:center;min-height:48px;border-radius:8px;'
    'font:600 16px/1.2 system-ui,sans-serif;text-decoration:none;color:#fff;background:#1f2937}'
    '#ash-contacto a.ash-wa{background:#128c4b}body{padding-bottom:calc(72px + env(safe-area-inset-bottom))}}</style>'
)


def barra_contacto(html, p):
    """Añade antes de </body> la barra móvil «Llamar» + «WhatsApp» (o «Escribir» por correo)."""
    botones = []
    tel = numero_internacional(p.get('telefono'))
    if tel:
        botones.append(f'<a href="tel:+{tel}">Llamar</a>')
    wa = numero_internacional(p.get('whatsapp'))
    if wa:
        botones.append(f'<a class="ash-wa" href="https://wa.me/{wa}" rel="noopener">WhatsApp</a>')
    elif CORREO_VALIDO.fullmatch((p.get('email') or '').strip()):
        botones.append(f'<a href="mailto:{H.escape(p["email"].strip())}">Escribir</a>')
    if not botones:
        return html
    barra = BARRA_CSS + '<nav id="ash-contacto" aria-label="Contacto">' + ''.join(botones) + '</nav>'
    if re.search(r'</body>', html, re.I):
        return re.sub(r'</body>', lambda m: barra + m.group(0), html, count=1, flags=re.I)
    return html + barra


if __name__ == '__main__':
    fabricar(sys.argv[1], '--no-deploy' not in sys.argv)
    from empaquetar import empaquetar  # escalón 1: el ZIP «Toma tu web» de cada pedido
    destino = empaquetar(sys.argv[1])
    print('paquete de entrega generado' if PUBLICO else f'paquete: {destino}')

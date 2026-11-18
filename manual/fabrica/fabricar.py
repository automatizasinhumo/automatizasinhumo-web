"""Fábrica nivel A: plantilla de demo (ya en español) + pedido del cliente -> web publicada.

Uso:
  C:/GIT/automatizasinhumo-demos/.venv/Scripts/python.exe -X utf8 manual/fabrica/fabricar.py RUTA/pedido.json [--no-deploy]

pedido.json (lo rellena el formulario/checkout; ver ejemplo-pedido.json):
  id, plantilla (ruta dentro del worker de demos), negocio, actividad, ciudad, telefono,
  email, whatsapp (opcional), descripcion (texto libre del cliente), servicios (lista).

Pasos: copia la plantilla de C:/GIT/automatizasinhumo-demos/site/<plantilla> a
clientes/<id>/site, quita la barra de la plantilla y el aviso de demo, reescribe los textos con
Workers AI (capa gratuita de la cuenta Cloudflare) usando los datos del cliente, cambia nombre,
correo y teléfono, y despliega un Worker estático «web-<id>» con wrangler.
Credencial: la sesión local de wrangler (wrangler login). En Actions: CLOUDFLARE_API_TOKEN y
CLOUDFLARE_ACCOUNT_ID.
"""
import html as H, json, os, re, shutil, subprocess, sys, urllib.request
from pathlib import Path
from bs4 import BeautifulSoup, NavigableString, Comment

DEMOS = Path(os.environ.get('DEMOS_DIR', 'C:/GIT/automatizasinhumo-demos'))
DEMOS_URL = 'https://automatizasinhumo-demos.davidpd89.workers.dev'
# En GitHub Actions los registros son públicos: no se escriben datos ni URLs de clientes.
PUBLICO = bool(os.environ.get('GITHUB_ACTIONS'))
MODELO = '@cf/meta/llama-3.3-70b-instruct-fp8-fast'
OMITIR_TAGS = {'script', 'style', 'code', 'pre', 'svg', 'template', 'textarea'}
LOTE = 25


def credenciales():
    tok, acc = os.environ.get('CLOUDFLARE_API_TOKEN'), os.environ.get('CLOUDFLARE_ACCOUNT_ID')
    if not tok:
        cfg = Path(os.environ.get('APPDATA', ''), 'xdg.config/.wrangler/config/default.toml')
        tok = re.search(r'oauth_token\s*=\s*"([^"]+)"', cfg.read_text()).group(1)
    if not acc:
        out = subprocess.run('npx wrangler whoami', shell=True, capture_output=True, text=True, encoding='utf-8').stdout
        acc = re.search(r'[0-9a-f]{32}', out).group(0)
    return tok, acc


def ia(tok, acc, sistema, usuario):
    body = {'messages': [{'role': 'system', 'content': sistema}, {'role': 'user', 'content': usuario}], 'max_tokens': 4096}
    req = urllib.request.Request(f'https://api.cloudflare.com/client/v4/accounts/{acc}/ai/run/{MODELO}',
                                 data=json.dumps(body).encode(), headers={'Authorization': 'Bearer ' + tok, 'Content-Type': 'application/json'})
    r = json.load(urllib.request.urlopen(req, timeout=180))['result']['response']
    return r if isinstance(r, str) else json.dumps(r, ensure_ascii=False)


def reescribir(textos, p, cred):
    sistema = ('Eres redactor web para pequeños negocios de España. Adaptas los textos de una plantilla al negocio '
               'del cliente. Español de España, tono cercano y concreto, sin inventar premios, cifras ni años. '
               'Los textos cortos (menú, botones, etiquetas, nombres de personas, clientes o proyectos) también se adaptan: '
               'nombres inventados de la plantilla pasan a ser genéricos del negocio. Recibes un objeto JSON {"número": "texto"}; responde SOLO con un objeto JSON con las mismas claves '
               'y el texto adaptado como valor.')
    datos = (f"Negocio: {p['negocio']}. Actividad: {p['actividad']}. Ciudad: {p['ciudad']}. "
             f"Servicios: {', '.join(p.get('servicios', []))}. Lo que cuenta el cliente: {p.get('descripcion', '')}")
    salida = {}
    for i in range(0, len(textos), LOTE):
        pend = {str(k): t for k, t in enumerate(textos[i:i + LOTE])}
        for intento in range(3):
            if not pend:
                break
            try:
                r = ia(*cred, sistema, f'{datos}\n\nTextos de la plantilla:\n{json.dumps(pend, ensure_ascii=False)}')
                nuevo = json.loads(r[r.index('{'): r.rindex('}') + 1])
                for k in [k for k in pend if isinstance(nuevo.get(k), str) and nuevo[k].strip()]:
                    salida[pend.pop(k)] = nuevo[k]
            except Exception as e:  # noqa: BLE001 — lo que no se adapte conserva el texto de la plantilla
                print('  lote', i // LOTE, 'intento', intento + 1, type(e).__name__)
        print(f'  textos {min(i + LOTE, len(textos))}/{len(textos)} (sin adaptar: {len(pend)})', flush=True)
    return salida


def fabricar(ruta_pedido, desplegar=True):
    p = json.loads(Path(ruta_pedido).read_text(encoding='utf-8'))
    base = DEMOS / 'clientes' / p['id']
    site = base / 'site'
    if site.exists():
        shutil.rmtree(site)
    if not (DEMOS / 'site' / p['plantilla'] / 'index.html').exists():
        # Sin la carpeta local de demos (p. ej. en Actions), la plantilla se baja del Worker de demos.
        subprocess.run(['wget', '-q', '-r', '-np', '-nH', '-p', '-e', 'robots=off', '-P', str(DEMOS / 'site'),
                        f"{DEMOS_URL}/{p['plantilla']}/"], timeout=600, check=False)
    shutil.copytree(DEMOS / 'site' / p['plantilla'], site)
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
    if not marca and logo and 0 < len(logo.get_text(' ', strip=True)) < 40:
        marca = logo.get_text(' ', strip=True)

    nodos = [n for n in sopa.body.find_all(string=True) if isinstance(n, NavigableString)
             and not any(x.name in OMITIR_TAGS for x in n.parents if x.name) and re.search(r'[A-Za-zÁÉÍÓÚáéíóúñÑ]{2,}', n)]
    textos = list(dict.fromkeys(n.strip() for n in nodos))
    print(f"{p['id']}: {len(textos)} textos a adaptar" + ('' if PUBLICO else f" (marca de la plantilla: {marca or '?'})"))
    nuevos = reescribir(textos, p, credenciales())
    for n in nodos:
        t = nuevos.get(n.strip())
        if t:
            n.replace_with(n[: len(n) - len(n.lstrip())] + t + n[len(n.rstrip()):])

    out = str(sopa)
    if marca:
        out = out.replace(H.escape(marca), H.escape(p['negocio'])).replace(marca, p['negocio'])
    out = re.sub(r'href="mailto:[^"]*"', f'href="mailto:{p["email"]}"', out)
    out = re.sub(r'href="tel:[^"]*"', f'href="tel:{re.sub(r"[^0-9+]", "", p["telefono"])}"', out)
    if p.get('whatsapp'):
        out = re.sub(r'wa\.me/\d+', 'wa.me/' + re.sub(r'\D', '', p['whatsapp']), out)
    for viejo in set(re.findall(r'[\w.+-]+@[\w-]+\.[\w.]+', out)) - {p['email']}:
        out = out.replace(viejo, p['email'])
    out = re.sub(r'<title>[^<]*</title>', f"<title>{H.escape(p['negocio'])} · {H.escape(p['actividad'])} en {H.escape(p['ciudad'])}</title>", out, 1)
    out = re.sub(r'<link rel="canonical"[^>]*>|<meta property="og:(url|image)[^>]*>', '', out)
    idx.write_text(out, encoding='utf-8')

    nombre = 'web-' + re.sub(r'[^a-z0-9-]', '-', p['id'].lower())[:50]
    (base / 'wrangler.jsonc').write_text(json.dumps(
        {'name': nombre, 'compatibility_date': '2026-11-01', 'assets': {'directory': './site'}}, indent=2), encoding='utf-8')
    if desplegar:
        r = subprocess.run('npx wrangler deploy', shell=True, cwd=base, capture_output=True, text=True, encoding='utf-8',
                           timeout=600, stdin=subprocess.DEVNULL)
        url = re.search(r'https://\S+\.workers\.dev', r.stdout + r.stderr)
        if PUBLICO:
            print('publicada' if url else f'despliegue fallido (código {r.returncode})')
        else:
            print('publicada:', url.group(0) if url else (r.stdout + r.stderr)[-800:])
        return url.group(0) if url else None
    print('generada sin publicar en', site)


if __name__ == '__main__':
    fabricar(sys.argv[1], '--no-deploy' not in sys.argv)

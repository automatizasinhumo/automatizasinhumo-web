"""Solicitudes nuevas («Empieza gratis» o compra directa) -> vista previa publicada automáticamente.

Uso:
  C:/GIT/automatizasinhumo-demos/.venv/Scripts/python.exe -X utf8 manual/fabrica/vistas-previas.py [--config .instances/X.wrangler.jsonc] [--max N] [--dry]

Por cada solicitud en estado «nueva» cuyo servicio tiene un diseño de ejemplo (EXTRA de
manual/demos/demos.mjs), monta el pedido con sus campos, llama a fabricar.py y deja la solicitud
en «en_preparacion» con la URL de la vista previa en la nota. La web pasa una puerta de QA (responde,
nombre del negocio, sin correos/teléfonos de la plantilla, sin imágenes rotas); si la pasa, la nota
lleva «QA ok» y el cron del Worker manda el correo de revisión. Si no, queda para revisar a mano.
"""
import html as H, json, re, subprocess, sys, tempfile, time, urllib.parse, urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from fabricar import fabricar  # noqa: E402

RAIZ = Path(__file__).resolve().parents[2]
args = sys.argv[1:]
CONFIG = args[args.index('--config') + 1] if '--config' in args else '.instances/automatizasinhumo-staging.wrangler.jsonc'
MAXIMO = int(args[args.index('--max') + 1]) if '--max' in args else 5
SECO = '--dry' in args


def d1(sql):
    r = subprocess.run(['npx', 'wrangler', 'd1', 'execute', 'DB', '--remote', '--json', '--config', CONFIG, '--command', sql],
                       cwd=RAIZ, capture_output=True, text=True, encoding='utf-8', shell=sys.platform == 'win32',
                       timeout=300, stdin=subprocess.DEVNULL)  # nunca esperar respuesta por consola
    salida = r.stdout[r.stdout.find('['):]
    return json.loads(salida)[0]['results']


def sql_txt(s):
    return "'" + str(s).replace("'", "''") + "'"


def disenos():
    js = "import('./manual/demos/demos.mjs').then(m=>console.log(JSON.stringify(m.EXTRA)))"
    extra = json.loads(subprocess.run(['node', '-e', js], cwd=RAIZ, capture_output=True, text=True, encoding='utf-8').stdout)
    # Solo plantillas de diseño (las interactivas no se rellenan con datos).
    return {slug: [p for p, _ in demos if p.startswith('plantillas-')] for slug, demos in extra.items()}


def primero(campos, *claves):
    for k, v in campos.items():
        if v and any(c in k.lower() for c in claves):
            return str(v).strip()
    return ''


def ciudad_de(campos):
    # Primero ciudad/zona; de una dirección completa solo el último tramo ("C/ Mayor 3, 36201 Vigo" -> "Vigo").
    ciudad = primero(campos, 'ciudad', 'zona')
    if ciudad:  # «Vigo, Pontevedra» -> «Vigo»
        return re.split(r'[,\n]', ciudad)[0].strip(' .()')[:40] or 'España'
    tramos = [t.strip(' .()') for t in re.split(r'[,\n]', primero(campos, 'dirección', 'ubicación')) if t.strip(' .()')]
    if not tramos:
        return 'España'
    # En una dirección la ciudad va tras el código postal («36201 Vigo»); si no lo hay, el último tramo.
    con_cp = next((t for t in tramos if re.search(r'\b\d{5}\b', t)), tramos[-1])
    return re.sub(r'\b\d{5}\b', '', con_cp).strip(' .()')[:40] or 'España'


def bajar(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'automatizasinhumo-qa'})
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.status, r.read().decode('utf-8', 'replace')


def qa(url, p):
    """Puerta de calidad de la web publicada: lista de problemas (vacía = QA ok)."""
    html = ''
    for _ in range(6):  # el Worker recién desplegado tarda unos segundos en responder
        try:
            estado, html = bajar(url)
            if estado == 200:
                break
        except Exception:
            pass
        time.sleep(5)
    if not html:
        return ['la web no responde con 200']
    problemas = []
    texto = re.sub(r'<script.*?</script>|<style.*?</style>|<[^>]+>', ' ', html, flags=re.S)
    if p['negocio'].lower() not in H.unescape(texto).lower():
        problemas.append('no aparece el nombre del negocio')
    # Correos por tokens (sin regex con retroceso): «usuario@dominio.tld» que no sea el del cliente.
    tokens = (x.strip('.,;:!?') for x in re.split(r"[\s\"'<>()=]", html))
    ajenos = {x.removeprefix('mailto:') for x in tokens if x.count('@') == 1 and '.' in x.split('@')[1]} - {p['email']}
    if ajenos:
        problemas.append('correos de la plantilla: ' + ', '.join(sorted(ajenos)[:3]))
    propio = re.sub(r'\D', '', p['telefono'])[-9:]
    for tel in re.findall(r'[\d\s().+-]{9,}', texto):  # una sola clase: lineal
        digitos = re.sub(r'\D', '', tel)
        if len(digitos) >= 9 and (not propio or propio not in digitos):
            problemas.append('teléfono de la plantilla: ' + tel.strip())
            break
    rotas = []
    for src in list(dict.fromkeys(re.findall(r'<img[^>]+src="([^"]+)"', html)))[:12]:
        if src.startswith('data:'):
            continue
        try:
            if bajar(urllib.parse.urljoin(url + '/', src))[0] != 200:
                rotas.append(src)
        except Exception:
            rotas.append(src)
    if rotas:
        problemas.append(f'{len(rotas)} imágenes rotas: ' + ', '.join(rotas[:3]))
    return problemas


def pedido_de(fila, plantilla):
    campos = json.loads(fila.get('campos') or '{}')
    negocio = primero(campos, 'nombre del', 'nombre de la', 'nombre y', 'datos de la empresa') or fila['nombre']
    texto = '. '.join(f'{k}: {v}' for k, v in campos.items() if v) + ('. ' + fila['mensaje'] if fila.get('mensaje') else '')
    return {
        'id': fila['public_id'].lower(),
        'plantilla': plantilla,
        'negocio': negocio.split('\n')[0][:60],
        'actividad': primero(campos, 'sector', 'profesión', 'temática') or fila.get('producto') or 'Negocio local',
        'ciudad': ciudad_de(campos),
        'telefono': primero(campos, 'teléfono') or fila.get('telefono') or '',
        'email': primero(campos, 'correo') if '@' in primero(campos, 'correo') else fila['email'],
        'whatsapp': re.sub(r'[^\d+]', '', primero(campos, 'whatsapp') or fila.get('telefono') or ''),
        'descripcion': texto[:1500],
        'servicios': [],
    }


def main():
    mapa = disenos()
    filas = d1("SELECT public_id, slug, producto, nombre, email, telefono, campos, mensaje FROM solicitudes "
               "WHERE estado = 'nueva' ORDER BY created_at LIMIT 50")
    hechas = 0
    for f in filas:
        plantillas = mapa.get(f['slug'])
        if not plantillas:
            continue
        p = pedido_de(f, plantillas[0])
        print(f"{f['public_id']} ({f['slug']}) -> {p['plantilla']} · {p['negocio']}")
        if SECO:
            print(json.dumps(p, ensure_ascii=False, indent=1))
        else:
            with tempfile.NamedTemporaryFile('w', suffix='.json', delete=False, encoding='utf-8') as t:
                json.dump(p, t, ensure_ascii=False)
            url = fabricar(t.name)
            if url:
                problemas = qa(url, p)
                print('  QA:', '; '.join(problemas) or 'ok')
                # «QA ok» es la marca que usa el cron del Worker para mandar el correo de revisión.
                nota = (f'Vista previa automática: {url} · QA ok' if not problemas else
                        f'Vista previa automática: {url} · QA con problemas: {"; ".join(problemas)[:300]} (revisar a mano)')
                d1(f"UPDATE solicitudes SET estado = 'en_preparacion', nota = {sql_txt(nota)}, updated_at = datetime('now') "
                   f"WHERE public_id = {sql_txt(f['public_id'])} AND estado = 'nueva'")
        hechas += 1
        if hechas >= MAXIMO:
            break
    print('vistas previas:', hechas)


if __name__ == '__main__':
    main()

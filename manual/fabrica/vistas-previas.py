"""Solicitudes nuevas («Empieza gratis» o compra directa) -> vista previa publicada automáticamente.

Uso:
  C:/GIT/automatizasinhumo-demos/.venv/Scripts/python.exe -X utf8 manual/fabrica/vistas-previas.py [--config .instances/X.wrangler.jsonc] [--max N] [--dry]

Por cada solicitud en estado «nueva» cuyo servicio tiene un diseño de ejemplo (EXTRA de
manual/demos/demos.mjs), monta el pedido con sus campos, llama a fabricar.py y deja la solicitud
en «en_preparacion» con la URL de la vista previa en la nota. La web pasa una puerta de QA (responde,
nombre del negocio, sin correos/teléfonos de la plantilla, sin imágenes rotas, y la prueba funcional en
navegador de qa/demo-funcional.mjs a 360/390/1280 px, que falla cerrado); si la pasa, la nota
lleva «QA ok» y el cron del Worker manda el correo de revisión. Si no, queda para revisar a mano.
"""
import html as H, json, os, re, subprocess, sys, tempfile, time, urllib.parse, urllib.request, uuid
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from fabricar import CupoIAAgotado, fabricar, nombre_publico  # noqa: E402
from navegador import qa_navegador  # noqa: E402
import proveedores_ia  # noqa: E402

RAIZ = Path(__file__).resolve().parents[2]
args = sys.argv[1:]
PUBLICO = bool(os.environ.get('GITHUB_ACTIONS'))  # registros públicos: sin datos de clientes
CONFIG = args[args.index('--config') + 1] if '--config' in args else '.instances/automatizasinhumo-staging.wrangler.jsonc'
MAXIMO = int(args[args.index('--max') + 1]) if '--max' in args else 5
if MAXIMO < 1:
    sys.exit('--max tiene que ser 1 o más')
SECO = '--dry' in args
EN_CURSO = 'Vista previa automática: fabricando'
# Reserva con caducidad: una reclamación sin terminar (proceso cancelado) se puede volver a reclamar
# pasado este plazo. Fabricar dos veces la misma solicitud solo vuelve a desplegar el mismo Worker.
CADUCA = "datetime('now', '-60 minutes')"
# Cada reserva lleva su propio identificador en la nota («... fabricando #<uuid>»): solo quien la tiene
# puede cerrarla, así un proceso cuya reserva ya caducó y otro reclamó no pisa el resultado nuevo.
# Un fallo antes de tener la web (descarga de la plantilla, wrangler) se reintenta tras CADUCA, hasta
# REINTENTOS veces; volver a fabricar solo redespliega el mismo Worker. Fallos de QA: revisión a mano.
REINTENTOS = 3
# «cambios_pedidos» con la nota que deja el enlace del correo (src/features/solicitudes/decision.ts):
# se vuelve a fabricar con los cambios añadidos al mensaje y el cron manda la revisión siguiente.
CAMBIOS_RE = re.compile(r'^Cambios pedidos por el cliente \(sobre la versión (\d+)\):\n(.*?)(?:\n\n|\Z)', re.S)
DISPONIBLE = (f"(estado = 'nueva' OR (estado = 'en_preparacion' AND nota LIKE {{en_curso}} "
              f"AND updated_at < {CADUCA}) OR (estado = 'cambios_pedidos' AND nota LIKE 'Cambios pedidos por el cliente (%'))")


def con_cambios(fila):
    """Si la solicitud vuelve con cambios, el mensaje lleva su texto (lo lee la IA al reescribir)."""
    m = CAMBIOS_RE.match(fila.get('nota') or '') if fila.get('estado') == 'cambios_pedidos' else None
    if not m or not m[2].strip():
        return None
    # El número de versión lo lee el cron del Worker para mandar la revisión siguiente (envio.ts).
    return f"{fila.get('mensaje') or ''}\n\nCambios pedidos sobre la versión {m[1]}: {m[2].strip()}".strip()


def d1(sql):
    """Consulta a D1. Un fallo se convierte en RuntimeError sin el comando (lleva datos y URL del cliente)."""
    try:
        r = subprocess.run(['npx', 'wrangler', 'd1', 'execute', 'DB', '--remote', '--json', '--config', CONFIG, '--command', sql],
                           cwd=RAIZ, capture_output=True, text=True, encoding='utf-8', shell=sys.platform == 'win32',
                           timeout=300, stdin=subprocess.DEVNULL)  # nunca esperar respuesta por consola
        salida = r.stdout[r.stdout.find('['):]
        return json.loads(salida)[0]['results']
    except Exception as e:  # noqa: BLE001
        raise RuntimeError(f'D1 no respondió ({type(e).__name__})') from None


def sql_txt(s):
    return "'" + str(s).replace("'", "''") + "'"


def disenos():
    js = "import('./manual/demos/demos.mjs').then(m=>console.log(JSON.stringify(m.EXTRA)))"
    extra = json.loads(subprocess.run(['node', '-e', js], cwd=RAIZ, capture_output=True, text=True, encoding='utf-8').stdout)
    # Solo plantillas de diseño (las interactivas no se rellenan con datos).
    return {slug: [p for p, _ in demos if p.startswith('plantillas-')] for slug, demos in extra.items()}


def primero(campos, *claves):
    for k, v in campos.items():
        v = str(v or '').strip()
        if v and any(c in k.lower() for c in claves):
            return v
    return ''


def nombre_negocio_evento(campos):
    excluidos = ('contacto', 'persona', 'cliente', 'responsable', 'apellidos')
    for clave, valor in campos.items():
        etiqueta = clave.lower()
        valor = str(valor or '').strip()  # un valor de solo espacios no tapa el siguiente campo
        if not valor or any(palabra in etiqueta for palabra in excluidos):
            continue
        if etiqueta.strip() in ('evento', 'boda'):
            return valor
        if 'nombre' in etiqueta and any(palabra in etiqueta for palabra in (
                'negocio', 'empresa', 'comercial', 'local', 'marca', 'evento', 'boda', 'pareja', 'novio',
                'celebración', 'celebracion', 'salón', 'salon')):
            return valor
        if 'datos de la empresa' in etiqueta or 'nombre del' in etiqueta or 'nombre de la' in etiqueta:
            return valor
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
    if nombre_publico(p).lower() not in H.unescape(texto).lower():
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
    # Formularios, enlaces, recursos, errores JS y anchos móviles en un navegador real.
    return problemas + qa_navegador(url)


# Clave que guarda /api/solicitudes con «Quiero este diseño» (src/features/solicitudes/diseno.ts).
CAMPO_DISENO = 'Diseño elegido'


def plantilla_de(fila, plantillas):
    """La plantilla que eligió el cliente si el servicio la tiene; si no, la primera."""
    try:
        elegida = json.loads(fila.get('campos') or '{}').get(CAMPO_DISENO)
    except (ValueError, AttributeError):
        elegida = None
    return elegida if elegida in plantillas else plantillas[0]


def pedido_de(fila, plantilla):
    campos = json.loads(fila.get('campos') or '{}')
    campos.pop(CAMPO_DISENO, None)  # es una ruta interna, no un texto del negocio
    negocio = nombre_negocio_evento(campos)
    texto = '. '.join(f'{k}: {v}' for k, v in campos.items() if v) + ('. ' + fila['mensaje'] if fila.get('mensaje') else '')
    # Los cambios pedidos van delante (la última ronda primero): el recorte a 1500 caracteres no debe dejarlos fuera.
    rondas = ' '.join(reversed(re.findall(r'Cambios pedidos sobre la versión \d+: .*?(?=\n\nCambios pedidos sobre la versión|\Z)',
                                          fila.get('mensaje') or '', re.S)))  # la más reciente primero
    if rondas:
        texto = f'{rondas}. {texto}'
    return {
        'id': fila['public_id'].lower(),
        'plantilla': plantilla,
        'negocio': negocio.split('\n')[0][:60],
        'contacto': fila.get('nombre', ''),
        'actividad': primero(campos, 'sector', 'profesión', 'temática') or fila.get('producto') or 'Negocio local',
        'ciudad': ciudad_de(campos),
        'telefono': primero(campos, 'teléfono') or fila.get('telefono') or '',
        'email': primero(campos, 'correo') if '@' in primero(campos, 'correo') else fila['email'],
        'whatsapp': re.sub(r'[^\d+]', '', primero(campos, 'whatsapp') or fila.get('telefono') or ''),
        'descripcion': texto[:1500],
        'servicios': [],
    }


def procesar(public_id, p, intentos=0, mensaje=None):
    """Reclama la solicitud y solo entonces la fabrica: dos procesos a la vez (la tarea del PC y Actions)
    no fabrican la misma. Devuelve True si la ha intentado. Ningún fallo (D1 incluido) tumba el lote:
    si no se puede guardar la nota, la reserva caduca y otra pasada la recupera."""
    donde = f"public_id = {sql_txt(public_id)}"
    reserva = f'{EN_CURSO} #{uuid.uuid4().hex}'
    try:
        extra = f"mensaje = {sql_txt(mensaje)}, " if mensaje is not None else ''
        reclamada = d1(f"UPDATE solicitudes SET estado = 'en_preparacion', {extra}nota = {sql_txt(reserva)}, "
                       f"updated_at = datetime('now') WHERE {donde} AND "
                       f"{DISPONIBLE.format(en_curso=sql_txt(EN_CURSO + '%'))} RETURNING public_id")
    except RuntimeError as e:
        print('  sin reclamar:', e)
        FALLOS_D1.append(1)
        return False
    if not reclamada:
        print('  ya la ha reclamado otro proceso')
        return False
    url = None
    try:
        with tempfile.TemporaryDirectory() as tmp:  # el pedido lleva datos de contacto: se borra al salir
            ruta = Path(tmp, 'pedido.json')
            ruta.write_text(json.dumps(p, ensure_ascii=False), encoding='utf-8')
            url = fabricar(str(ruta))
        if not url:
            raise RuntimeError('despliegue sin URL')
        problemas = qa(url, p)
        if problemas:
            A_MANO.append(1)  # vista previa hecha pero sin correo: alguien tiene que mirarla
        print('  QA:', 'ok' if not problemas else (f'{len(problemas)} problemas' if PUBLICO else '; '.join(problemas)))
        # «QA ok» es la marca que usa el cron del Worker para mandar el correo de revisión.
        nota = (f'Vista previa automática: {url} · QA ok' if not problemas else
                f'Vista previa automática: {url} · QA con problemas: {"; ".join(problemas)[:300]} (revisar a mano)')
    except CupoIAAgotado:
        # No es fallo de la solicitud: no gasta reintento. La reserva caduca y otra pasada la recoge.
        print('  cupo diario de Workers AI agotado: la solicitud espera sin gastar reintento')
        nota = f'{EN_CURSO} · reintento {intentos} #{uuid.uuid4().hex}'
        SIN_CUPO.append(1)
    except Exception as e:  # noqa: BLE001 — una solicitud fallida no para las demás
        print('  fallo:', type(e).__name__ if PUBLICO else f'{type(e).__name__}: {e}')
        FALLOS_FABRICA.append(type(e).__name__)
        if url is None and intentos < REINTENTOS:
            nota = f'{EN_CURSO} · reintento {intentos + 1} #{uuid.uuid4().hex}'
            print(f'  se reintentará (intento {intentos + 1} de {REINTENTOS})')
        else:
            nota = f'Vista previa automática: falló ({type(e).__name__}, revisar a mano)'
            A_MANO.append(1)
    try:
        if not d1(f"UPDATE solicitudes SET nota = {sql_txt(nota)}, updated_at = datetime('now') "
                  f"WHERE {donde} AND estado = 'en_preparacion' AND nota = {sql_txt(reserva)} RETURNING public_id"):
            print('  reserva sustituida por otro proceso: este resultado no se guarda')
    except RuntimeError as e:
        print('  nota sin guardar (la reserva caduca y se reintenta):', e)
        FALLOS_D1.append(1)
    return True


FALLOS_D1 = []  # el lote sigue, pero la ejecución termina en rojo para que se vea
# Igual con la fábrica: un fallo sistemático (p. ej. la IA cambia el formato de su respuesta) no puede
# pasar por una ejecución en verde. Rojo si alguna queda para revisar a mano o fallan todas las intentadas.
FALLOS_FABRICA = []
A_MANO = []
# Cupo de Workers AI agotado: el lote para (las demás también fallarían) y la pasada queda en verde con
# aviso; si dura, la vigilancia abre «Fábrica: N solicitudes sin vista previa».
SIN_CUPO = []


def main():
    mapa = {slug: ps for slug, ps in disenos().items() if ps}
    if not mapa:
        print('vistas previas intentadas: 0 (ningún servicio con plantilla)')
        return
    # Solo servicios con plantilla: las solicitudes sin plantilla no ocupan el LIMIT.
    slugs = ', '.join(sql_txt(s) for s in sorted(mapa))
    filas = d1("SELECT public_id, slug, producto, nombre, email, telefono, campos, mensaje, nota, estado FROM solicitudes "
               f"WHERE {DISPONIBLE.format(en_curso=sql_txt(EN_CURSO + '%'))} AND slug IN ({slugs}) "
               "ORDER BY created_at LIMIT 50")
    hechas = 0
    for n, f in enumerate(filas, 1):
        plantillas = mapa.get(f['slug'])
        if not plantillas:
            continue
        mensaje = con_cambios(f)
        if f.get('estado') == 'cambios_pedidos' and mensaje is None:
            continue  # nota sin texto de cambios: la revisa David
        p = pedido_de({**f, 'mensaje': mensaje} if mensaje else f, plantilla_de(f, plantillas))
        # En Actions el registro es público: ni el id (da la URL web-<id>) ni el negocio.
        print(f"solicitud {n} ({f['slug']}) -> {p['plantilla']}" if PUBLICO else
              f"{f['public_id']} ({f['slug']}) -> {p['plantilla']} · {p['negocio']}")
        if SECO:
            print('  simulación: no se fabrica' if PUBLICO else json.dumps(p, ensure_ascii=False, indent=1))
        elif not procesar(f['public_id'], p, int((re.search(r'reintento (\d+)', f.get('nota') or '') or [0, 0])[1]), mensaje):
            continue  # reclamación perdida: no consume el límite
        hechas += 1
        if SIN_CUPO:
            print('::warning::ningún proveedor de IA con cupo: el lote para hasta que se reponga (Workers AI, 00:00 UTC)')
            break
        if hechas >= MAXIMO:
            break
    print('vistas previas intentadas:', hechas)
    if proveedores_ia.ALERTAS:  # modelo retirado o clave rechazada: la cadena sigue, pero alguien tiene que cambiarlo
        sys.exit('IA: ' + '; '.join(sorted(set(proveedores_ia.ALERTAS))) + ' (cambiar modelo o clave en proveedores_ia.py)')
    if FALLOS_D1:
        sys.exit(f'D1 falló {len(FALLOS_D1)} veces: revisar la ejecución')
    if A_MANO or (hechas and len(FALLOS_FABRICA) >= hechas):
        sys.exit(f'la fábrica falló en {len(FALLOS_FABRICA)} de {hechas} '
                 f'({", ".join(sorted(set(FALLOS_FABRICA)))}); {len(A_MANO)} quedan para revisar a mano')


if __name__ == '__main__':
    main()

"""Solicitudes pagadas -> ZIP de su web entregado por enlace, sin pasos a mano.

Uso: python -X utf8 manual/fabrica/entregar.py [--config X.wrangler.jsonc] [--max N]

Por cada solicitud `pagada` sin entrega: baja de Workers KV la vista previa que aprobó el cliente
(claves «sites/<id>/...» que sube fabricar.py), la empaqueta con empaquetar.py (sin noindex ni
_headers) y sube el ZIP a KV como «entregas/<token>.zip», que sirve el Worker `vistas` en
/entrega/<token>.zip y caduca a los ENTREGA_TTL. Deja la nota «Entrega automática: <url> · lista»;
el cron del Worker manda entonces el correo «entregado» y pasa la solicitud a «entregada».

No se vuelve a fabricar: la web entregada es byte a byte la que aprobó el cliente. Si la vista
previa no está en KV (caducada o publicada como Worker propio), la nota pide revisarla a mano.
Necesita CLOUDFLARE_API_TOKEN con «Workers KV Storage: Edit» y CLOUDFLARE_ACCOUNT_ID.
"""
import importlib.util, json, os, re, secrets, sys, tempfile, urllib.parse, urllib.request, uuid
from pathlib import Path

AQUI = Path(__file__).parent
sys.path.insert(0, str(AQUI))
import empaquetar as emp  # noqa: E402
from fabricar import VISTAS_KV, VISTAS_URL  # noqa: E402

# Reutiliza D1 y el pedido de vistas-previas.py (mismos --config y --max).
_spec = importlib.util.spec_from_file_location('vistas_previas', AQUI / 'vistas-previas.py')
vp = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(vp)

API = 'https://api.cloudflare.com/client/v4/accounts/{acc}/storage/kv/namespaces/{ns}'
ENTREGA_TTL = 60 * 60 * 24 * 30  # 30 días para descargarla; luego se pide otra
LIMITE_KV = 25 * 1024 * 1024  # máximo de un valor de Workers KV
EN_CURSO = 'Entrega automática: preparando'
LISTA = 'Entrega automática: {url} · lista'  # la lee enviarEntregasListas (src/features/solicitudes/envio.ts)
DISPONIBLE = ("estado = 'pagada' AND (nota IS NULL OR nota NOT LIKE 'Entrega automática:%' "
              f"OR (nota LIKE {vp.sql_txt(EN_CURSO + '%')} AND updated_at < {vp.CADUCA}))")


def kv(ruta, metodo='GET', datos=None):
    acc, tok = os.environ.get('CLOUDFLARE_ACCOUNT_ID'), os.environ.get('CLOUDFLARE_API_TOKEN')
    if not acc or not tok:
        raise RuntimeError('faltan CLOUDFLARE_ACCOUNT_ID o CLOUDFLARE_API_TOKEN')
    req = urllib.request.Request(API.format(acc=acc, ns=VISTAS_KV) + ruta, data=datos, method=metodo,
                                 headers={'Authorization': f'Bearer {tok}', 'Content-Type': 'application/octet-stream'})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def ident_de(public_id):
    """El mismo id que usa fabricar.publicar_kv para las claves de la vista previa."""
    return re.sub(r'[^a-z0-9-]', '-', public_id.lower())[:50]


def bajar_vista(ident, destino):
    """Copia «sites/<ident>/...» de KV a destino. Devuelve cuántos ficheros bajó."""
    prefijo, cursor, n = f'sites/{ident}/', '', 0
    while True:
        q = urllib.parse.urlencode({'prefix': prefijo, 'limit': 1000, **({'cursor': cursor} if cursor else {})})
        r = json.loads(kv(f'/keys?{q}'))
        for k in r.get('result', []):
            rel = k['name'][len(prefijo):]
            f = (destino / rel).resolve()
            if not rel or destino.resolve() not in f.parents:
                continue  # clave rara: nunca fuera del directorio
            f.parent.mkdir(parents=True, exist_ok=True)
            f.write_bytes(kv('/values/' + urllib.parse.quote(k['name'], safe='')))
            n += 1
        cursor = (r.get('result_info') or {}).get('cursor')
        if not cursor:
            return n


def entregar(fila):
    """ZIP de la vista previa subido a KV. Devuelve la nota final de la solicitud."""
    ident = ident_de(fila['public_id'])
    p = vp.pedido_de(fila, None)
    p['id'] = ident
    with tempfile.TemporaryDirectory() as tmp:  # datos del cliente: se borran al salir
        base = Path(tmp, 'clientes', ident)
        if not bajar_vista(ident, base / 'site') or not (base / 'site' / 'index.html').is_file():
            return 'Entrega automática: falló (sin vista previa en KV, revisar a mano)'
        # El mismo wrangler.jsonc que fabricar.py: el cliente la publica en su Cloudflare con «wrangler deploy».
        (base / 'wrangler.jsonc').write_text(json.dumps({'name': f'web-{ident}', 'compatibility_date': '2026-11-01',
                                                        'assets': {'directory': './site'}}, indent=2), encoding='utf-8')
        ruta = Path(tmp, 'pedido.json')
        ruta.write_text(json.dumps(p, ensure_ascii=False), encoding='utf-8')
        emp.DEMOS = Path(tmp)
        zipf = emp.empaquetar(ruta)
        datos = zipf.read_bytes()
    if len(datos) > LIMITE_KV:
        return f'Entrega automática: falló (ZIP de {len(datos) // 1048576} MiB, más que el límite de KV; revisar a mano)'
    token = secrets.token_urlsafe(24)  # 32 caracteres: el enlace es la única llave
    kv(f'/values/entregas%2F{token}.zip?expiration_ttl={ENTREGA_TTL}', 'PUT', datos)
    return LISTA.format(url=f'{VISTAS_URL}/entrega/{token}.zip')


def procesar(fila):
    donde = f"public_id = {vp.sql_txt(fila['public_id'])}"
    reserva = f'{EN_CURSO} #{uuid.uuid4().hex}'
    if not vp.d1(f"UPDATE solicitudes SET nota = {vp.sql_txt(reserva)}, updated_at = datetime('now') "
                 f"WHERE {donde} AND {DISPONIBLE} RETURNING public_id"):
        print('  ya la ha reclamado otro proceso')
        return False
    try:
        nota = entregar(fila)
    except Exception as e:  # noqa: BLE001 — una entrega fallida no para las demás
        print('  fallo:', type(e).__name__ if vp.PUBLICO else f'{type(e).__name__}: {e}')
        nota = f'Entrega automática: falló ({type(e).__name__}, revisar a mano)'
    print('  ' + ('lista' if nota.endswith('· lista') else 'fallida'))
    vp.d1(f"UPDATE solicitudes SET nota = {vp.sql_txt(nota)}, updated_at = datetime('now') "
          f"WHERE {donde} AND estado = 'pagada' AND nota = {vp.sql_txt(reserva)}")
    return True


def main():
    filas = vp.d1("SELECT public_id, slug, producto, nombre, email, telefono, campos, mensaje FROM solicitudes "
                  f"WHERE {DISPONIBLE} ORDER BY updated_at LIMIT {int(vp.MAXIMO)}")
    hechas = 0
    for n, f in enumerate(filas, 1):
        print(f'entrega {n}' if vp.PUBLICO else f"entrega {f['public_id']}")
        hechas += procesar(f)
    print('entregas intentadas:', hechas)


if __name__ == '__main__':
    main()

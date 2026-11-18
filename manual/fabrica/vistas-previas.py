"""Solicitudes nuevas («Empieza gratis» o compra directa) -> vista previa publicada automáticamente.

Uso:
  C:/GIT/automatizasinhumo-demos/.venv/Scripts/python.exe -X utf8 manual/fabrica/vistas-previas.py [--config .instances/X.wrangler.jsonc] [--max N] [--dry]

Por cada solicitud en estado «nueva» cuyo servicio tiene un diseño de ejemplo (EXTRA de
manual/demos/demos.mjs), monta el pedido con sus campos, llama a fabricar.py y deja la solicitud
en «en_preparacion» con la URL de la vista previa en la nota. Desde Admin -> Solicitudes se marca
«vista previa enviada», que manda el correo al cliente.
"""
import json, re, subprocess, sys, tempfile
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
                       cwd=RAIZ, capture_output=True, text=True, encoding='utf-8', shell=sys.platform == 'win32')
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


def pedido_de(fila, plantilla):
    campos = json.loads(fila.get('campos') or '{}')
    negocio = primero(campos, 'nombre del', 'nombre de la', 'nombre y', 'datos de la empresa') or fila['nombre']
    texto = '. '.join(f'{k}: {v}' for k, v in campos.items() if v) + ('. ' + fila['mensaje'] if fila.get('mensaje') else '')
    return {
        'id': fila['public_id'].lower(),
        'plantilla': plantilla,
        'negocio': negocio.split('\n')[0][:60],
        'actividad': primero(campos, 'sector', 'profesión', 'temática') or fila.get('producto') or 'Negocio local',
        'ciudad': primero(campos, 'zona', 'dirección', 'ciudad') or 'España',
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
                nota = f'Vista previa automática: {url} (revisar y marcar «vista previa enviada»)'
                d1(f"UPDATE solicitudes SET estado = 'en_preparacion', nota = {sql_txt(nota)}, updated_at = datetime('now') "
                   f"WHERE public_id = {sql_txt(f['public_id'])} AND estado = 'nueva'")
        hechas += 1
        if hechas >= MAXIMO:
            break
    print('vistas previas:', hechas)


if __name__ == '__main__':
    main()

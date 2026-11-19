"""Paquete de entrega «Toma tu web» (escalón 1, ronda 23): un ZIP por pedido.

Uso: python manual/fabrica/empaquetar.py RUTA/pedido.json   (tras fabricar.py)

Estructura: LEEME.md, web-publicable/, codigo-fuente/, datos-negocio/business-manifest.json, guias/.
Solo biblioteca estándar. El ZIP nunca lleva claves: la vista previa no las usa.
"""
import json, os, re, sys, zipfile
from datetime import date
from pathlib import Path

DEMOS = Path(os.environ.get('DEMOS_DIR', 'C:/GIT/automatizasinhumo-demos'))
CAMPOS_NEGOCIO = ('negocio', 'actividad', 'ciudad', 'telefono', 'email', 'whatsapp', 'descripcion', 'servicios')
# Solo vale para la vista previa: la web del cliente sí debe indexarse.
SOLO_VISTA_PREVIA = {'_headers'}
# fabricar.py mete este meta en cada HTML de la vista previa; la copia publicable no lo lleva.
META_NOINDEX = re.compile(r'<meta name="robots" content="noindex">')

LEEME = """# {negocio}: tu web

Fecha de entrega: {fecha}. Pedido: {id}.

- `web-publicable/`: la web lista para subir a cualquier alojamiento de ficheros estáticos.
- `codigo-fuente/`: los mismos ficheros más la configuración de Cloudflare (`wrangler.jsonc`).
- `datos-negocio/business-manifest.json`: los datos que nos diste.
- `guias/`: cómo publicarla y cómo poner tu dominio.

La web es tuya: puedes alojarla donde quieras sin depender de nosotros.
"""

GUIA_PUBLICAR = """# Publicar tu web

## Cloudflare (gratis, recomendado)
1. Crea una cuenta en https://dash.cloudflare.com/sign-up.
2. Workers & Pages → Create → Pages → Upload assets.
3. Arrastra la carpeta `web-publicable/` y pulsa Deploy.

## Netlify o GitHub Pages
Sube el contenido de `web-publicable/` tal cual. Los formularios necesitan el servicio
de formularios del alojamiento (por ejemplo, Netlify Forms).
"""

GUIA_DOMINIO = """# Poner tu dominio

En Cloudflare: añade tu dominio como sitio (Add a domain) y cambia los DNS en tu registrador
a los que te indique Cloudflare. Después, en tu proyecto: Custom domains → Set up a domain.
"""


def manifiesto(p):
    datos = {k: p[k] for k in CAMPOS_NEGOCIO if p.get(k)}
    return {'version': 1, 'pedido': p['id'], 'plantilla': p.get('plantilla'), 'negocio': datos}


def empaquetar(ruta_pedido, destino=None):
    p = json.loads(Path(ruta_pedido).read_text(encoding='utf-8'))
    base = DEMOS / 'clientes' / p['id']
    site = base / 'site'
    if not (site / 'index.html').is_file():
        raise FileNotFoundError('falta la web fabricada: ejecuta antes fabricar.py')
    destino = Path(destino or base / f"entrega-{p['id']}.zip")
    ficheros = sorted(f for f in site.rglob('*') if f.is_file())
    with zipfile.ZipFile(destino, 'w', zipfile.ZIP_DEFLATED) as z:
        z.writestr('LEEME.md', LEEME.format(negocio=p.get('negocio', 'Tu negocio'), id=p['id'],
                                            fecha=date.today().isoformat()))
        for f in ficheros:
            rel = f.relative_to(site).as_posix()
            if rel in SOLO_VISTA_PREVIA:
                continue
            datos = f.read_bytes()
            if rel.endswith('.html'):
                datos = META_NOINDEX.sub('', datos.decode('utf-8')).encode('utf-8')
            for carpeta in ('web-publicable/', 'codigo-fuente/site/'):
                z.writestr(carpeta + rel, datos)
        if (base / 'wrangler.jsonc').is_file():
            z.write(base / 'wrangler.jsonc', 'codigo-fuente/wrangler.jsonc')
        z.writestr('datos-negocio/business-manifest.json',
                   json.dumps(manifiesto(p), ensure_ascii=False, indent=2))
        z.writestr('guias/publicar.md', GUIA_PUBLICAR)
        z.writestr('guias/dominio.md', GUIA_DOMINIO)
    return destino


if __name__ == '__main__':
    print('paquete:', empaquetar(sys.argv[1]))

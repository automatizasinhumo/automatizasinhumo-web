"""Cambios visuales pedidos por el cliente -> CSS acotado sobre la plantilla.

La IA solo reescribe textos: «el logo más grande» o «otro color» no llegaban a la web.
Aquí la IA clasifica lo pedido en un conjunto cerrado de ajustes validados (nunca CSS libre)
y lo que no encaja se devuelve en «sin_aplicar» para que la vista previa vaya a revisión a mano
en vez de mandar al cliente una versión que ignora su petición.
"""

import json
import re
from pathlib import Path

import fastjsonschema  # BSD-3-Clause, https://github.com/horejsek/python-fastjsonschema

TAMANOS = ['mas_grande', 'mas_pequeno']
_VALIDADORES = {
    'logo': fastjsonschema.compile({'enum': [None, *TAMANOS]}),
    'texto': fastjsonschema.compile({'enum': [None, *TAMANOS]}),
    'color': fastjsonschema.compile({'type': ['string', 'null'], 'pattern': '^#[0-9a-fA-F]{6}$'}),
    'sin_aplicar': fastjsonschema.compile({'type': 'array', 'maxItems': 10,
                                           'items': {'type': 'string', 'minLength': 1, 'maxLength': 200}}),
}

SISTEMA = (
    'Clasificas los cambios que un cliente pide sobre la vista previa de su web. Solo cuentan los cambios de '
    'aspecto: los de texto o contenido escrito ya se aplican aparte y NO se mencionan. Responde SOLO con un objeto '
    'JSON con estas claves: "logo": "mas_grande", "mas_pequeno" o null; "texto": "mas_grande", "mas_pequeno" o '
    'null (tamaño de la letra de la página); "color": color principal pedido en hexadecimal #rrggbb o null; '
    '"sin_aplicar": lista de frases cortas con los cambios de aspecto que no encajan en las claves anteriores '
    '(fotos, secciones nuevas, cambiar el diseño, mover bloques...), lista vacía si no hay. Las rondas vienen de '
    'la más reciente a la más antigua: si se contradicen, manda la más reciente.'
)


def validar(respuesta):
    """Se queda con cada clave válida por separado: una mal formada no anula las demás."""
    if not isinstance(respuesta, dict):
        raise ValueError('la respuesta no es un objeto JSON')
    salida = {}
    for clave, validador in _VALIDADORES.items():
        if clave not in respuesta:
            continue
        try:
            salida[clave] = validador(respuesta[clave])
        except fastjsonschema.JsonSchemaException:
            continue
    salida.setdefault('sin_aplicar', [])
    return salida


def pedir_ajustes(cambios, ia):
    """`ia(sistema, usuario) -> str`. Sin cambios pedidos no se llama a la IA."""
    if not (cambios or '').strip():
        return {'sin_aplicar': []}
    r = ia(SISTEMA, f'Cambios pedidos por el cliente:\n{cambios.strip()[:3000]}')
    return validar(json.loads(r[r.index('{'): r.rindex('}') + 1]))


# Solo el logo de cabecera (no los logos de clientes de más abajo) y solo el elemento exterior:
# .navbar-brand > .logo no se agranda dos veces.
LOGO = ':is(header, nav) :is([class*="logo"], [class*="brand"]):not(:is([class*="logo"], [class*="brand"]) *)'
VARIABLE_COLOR = re.compile(r'(--[\w-]*(?:primary|accent|brand|main|theme)[\w-]*)\s*:', re.I)


def variables_de_color(site):
    """Variables CSS de la plantilla con pinta de color principal (las de cada plantilla cambian de nombre)."""
    textos = [f.read_text(encoding='utf-8', errors='ignore') for f in Path(site).rglob('*') if f.suffix in ('.css', '.html')]
    return sorted({m.group(1) for t in textos for m in VARIABLE_COLOR.finditer(t)})


def contraste(color):
    r, g, b = (int(color[i:i + 2], 16) for i in (1, 3, 5))
    return '#111111' if 0.299 * r + 0.587 * g + 0.114 * b > 150 else '#ffffff'


def css_de(ajustes, variables=()):
    reglas = []
    if ajustes.get('logo'):
        reglas.append(f'{LOGO}{{zoom:{1.4 if ajustes["logo"] == "mas_grande" else 0.75}}}')
    if ajustes.get('texto') == 'mas_grande':
        reglas.append('html{font-size:112.5%}p,li,dd,blockquote{font-size:max(1em,18px)}')
    elif ajustes.get('texto') == 'mas_pequeno':
        reglas.append('html{font-size:93.75%}')
    color = ajustes.get('color')
    if color:
        if variables:
            reglas.append(':root,body{' + ''.join(f'{v}:{color}!important;' for v in variables) + '}')
        reglas.append(f':is(.btn-primary, [class*="btn-primary"], button[type="submit"], a.btn, .button)'
                      f'{{background-color:{color}!important;border-color:{color}!important;'
                      f'color:{contraste(color)}!important}}')
    return '<style id="ash-ajustes">' + ''.join(reglas) + '</style>' if reglas else ''


def aplicar(html, css):
    """El CSS va al final del <head> (gana a las hojas de la plantilla) o, sin <head>, delante del HTML."""
    if not css:
        return html
    if re.search(r'</head>', html, re.I):
        return re.sub(r'</head>', lambda m: css + m.group(0), html, count=1, flags=re.I)
    return css + html

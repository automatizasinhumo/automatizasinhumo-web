"""Prueba funcional de una vista previa en un navegador real (qa/demo-funcional.mjs, Playwright).

Chromium a 360, 390 y 1280 px: errores de JavaScript, recursos y enlaces rotos, formularios,
anclas y desbordamiento en móvil. Falla cerrado: si el navegador no se puede ejecutar o su salida
no se entiende, devuelve un problema y la vista previa no queda «QA ok».
"""
import json
import subprocess
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
SCRIPT = RAIZ / 'qa' / 'demo-funcional.mjs'
NO_DISPONIBLE = 'QA de navegador no disponible'


def qa_navegador(url, ejecutar=subprocess.run, limite=600):
    """Lista de problemas que ve el navegador en `url` (vacía = bien)."""
    try:
        r = ejecutar(['node', str(SCRIPT), url], cwd=RAIZ, capture_output=True, text=True,
                     encoding='utf-8', errors='replace', timeout=limite)
    except (OSError, subprocess.SubprocessError) as e:
        return [f'{NO_DISPONIBLE} ({type(e).__name__})']
    lineas = [x for x in (r.stdout or '').splitlines() if x.strip()]
    try:
        problemas = json.loads(lineas[-1])['problemas']
        if not isinstance(problemas, list) or not all(isinstance(p, str) for p in problemas):
            raise ValueError('formato')
    except (IndexError, KeyError, TypeError, ValueError):
        return [f'{NO_DISPONIBLE} (salida {r.returncode})']
    if r.returncode != 0 and not problemas:
        return [f'{NO_DISPONIBLE} (salida {r.returncode})']
    if r.returncode == 0 and problemas:
        return problemas + ['QA de navegador incoherente (salida 0 con problemas)']
    return ['navegador ' + p for p in problemas]

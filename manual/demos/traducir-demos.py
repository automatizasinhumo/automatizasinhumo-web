"""Traduce al español, en el mismo sitio, el texto visible de las demos ya construidas.

Uso (tras build-demos.mjs):
  C:/GIT/automatizasinhumo-demos/.venv/Scripts/python.exe -X utf8 manual/demos/traducir-demos.py

Motor: Argos Translate (en->es, offline y gratuito). Instalar una vez en el venv de demos:
  pip install argostranslate beautifulsoup4  +  modelo en->es (ver ESTADO.md).
Caché: manual/demos/traducciones-cache.json (texto inglés -> español). Las reconstrucciones
solo traducen frases nuevas; se puede corregir a mano una traducción editando la caché.
"""
import json, re, sys, time
from pathlib import Path
from bs4 import BeautifulSoup, NavigableString, Comment, Doctype, Declaration, CData, ProcessingInstruction

SITE = Path(sys.argv[1] if len(sys.argv) > 1 else 'C:/GIT/automatizasinhumo-demos/site')
CACHE = Path(__file__).with_name('traducciones-cache.json')
OMITIR_RUTAS = ('editor-bloques/resources/', 'editor-bloques/libs/', 'node_modules/')
OMITIR_TAGS = {'script', 'style', 'code', 'pre', 'svg', 'math', 'template', 'textarea'}
ATRIBUTOS = ('alt', 'title', 'placeholder', 'aria-label')
LETRAS = re.compile(r'[A-Za-z]{2,}')
YA_ES = re.compile(r'[áéíóúñ¿¡ÁÉÍÓÚÑ]|Automatiza sin humo')  # traducido a mano, propio o con la marca (Argos la vuelve «humor»)

cache = json.loads(CACHE.read_text(encoding='utf-8')) if CACHE.exists() else {}
_motor = None


def motor():
    global _motor
    if _motor is None:
        import argostranslate.translate as T
        langs = {l.code: l for l in T.get_installed_languages()}
        _motor = langs['en'].get_translation(langs['es'])
    return _motor


def traducir(texto):
    nucleo = texto.strip()
    if not LETRAS.search(nucleo) or YA_ES.search(nucleo) or nucleo.startswith(('http', '{', '<')):
        return texto
    if nucleo not in cache:
        cache[nucleo] = motor().translate(nucleo)
    ini = texto[: len(texto) - len(texto.lstrip())]
    fin = texto[len(texto.rstrip()):]
    return ini + cache[nucleo] + fin


def pagina(ruta):
    html = ruta.read_text(encoding='utf-8', errors='replace')
    sopa = BeautifulSoup(html, 'html.parser')
    for barra in sopa.select('#template-bar'):  # barra promocional de la plantilla original
        barra.decompose()
    for nodo in list(sopa.find_all(string=True)):
        if isinstance(nodo, (Comment, Doctype, Declaration, CData, ProcessingInstruction)) or not isinstance(nodo, NavigableString):
            continue
        if any(p.name in OMITIR_TAGS or p.get('id') == 'ash-aviso' for p in nodo.parents if p.name):
            continue
        nuevo = traducir(str(nodo))
        if nuevo != str(nodo):
            nodo.replace_with(nuevo)
    for el in sopa.find_all(True):
        for a in ATRIBUTOS:
            if isinstance(el.get(a), str):
                el[a] = traducir(el[a])
        if el.name == 'input' and el.get('type') in ('submit', 'button') and el.get('value'):
            el['value'] = traducir(el['value'])
        if el.name == 'meta' and el.get('name') in ('description', 'og:description') and el.get('content'):
            el['content'] = traducir(el['content'])
    if sopa.html is not None:
        sopa.html['lang'] = 'es'
    ruta.write_text(str(sopa), encoding='utf-8')


def main():
    paginas = [p for p in sorted(SITE.rglob('*.html'))
               if not any(o in p.relative_to(SITE).as_posix() for o in OMITIR_RUTAS)]
    t = time.time()
    for i, p in enumerate(paginas, 1):
        antes = len(cache)
        pagina(p)
        if len(cache) != antes:
            CACHE.write_text(json.dumps(cache, ensure_ascii=False, indent=0, sort_keys=True), encoding='utf-8')
        print(f'{i}/{len(paginas)} {p.relative_to(SITE).as_posix()} (+{len(cache) - antes}) {int(time.time() - t)}s', flush=True)
    print('frases en caché:', len(cache))


if __name__ == '__main__':
    main()

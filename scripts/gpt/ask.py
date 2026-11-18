"""Pregunta a ChatGPT en el proyecto «Creación Webs» por el Edge CDP 9241.
uso: python ask.py <prompt.txt> <salida.md> [--new | --chat URL] [--wait MIN] [--leer] [--no-cerrar]
Por defecto sigue en el último chat (last_chat.txt); --new abre uno nuevo en el proyecto.
Edge 9241 se abre solo si está cerrado y se cierra al terminar (ChatGPT consume mucha RAM);
--no-cerrar lo deja abierto. Perfil con la sesión: C:\Temp\automatizasinhumo-edge-9241."""
import os, re, subprocess, sys, time, urllib.request
from playwright.sync_api import sync_playwright

PROJECT = "https://chatgpt.com/g/g-p-6afb191fd7e08191a093ea57adc7d51d/project"
HERE = os.path.dirname(os.path.abspath(__file__))
LAST = os.path.join(HERE, "last_chat.txt")
# 11/2026: ChatGPT quitó data-message-author-role; cada turno lleva data-content-search-unit-key="…:assistant".
ASSISTANT = '[data-content-search-unit-key$=":assistant"], [data-message-author-role="assistant"]'
STOP = 'button[data-testid="stop-button"], button[aria-label*="Detener"], button[aria-label*="Stop"]'
SEND = 'button[data-testid="send-button"], button[type="submit"][aria-label="Enviar"], button[type="submit"][aria-label*="Send"]'


PUERTO = 9241
EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
PERFIL = r"C:\Temp\automatizasinhumo-edge-9241"


def edge_vivo():
    try:
        urllib.request.urlopen(f"http://127.0.0.1:{PUERTO}/json/version", timeout=2)
        return True
    except Exception:
        return False


def abrir_edge():
    if edge_vivo():
        return
    subprocess.Popen([EDGE, f"--remote-debugging-port={PUERTO}", f"--user-data-dir={PERFIL}", "--no-first-run",
                      "--edge-skip-compat-layer-relaunch", "--start-minimized", "about:blank"])
    for _ in range(60):
        if edge_vivo():
            return
        time.sleep(0.5)
    sys.exit("Edge 9241 no arranca")


def cerrar_edge(br):
    try:
        br.new_browser_cdp_session().send("Browser.close")
    except Exception:
        pass


def send(pg):
    for _ in range(20):
        b = pg.locator(SEND)
        for i in range(b.count()):
            x = b.nth(i)
            try:
                if x.is_visible() and x.is_enabled():
                    x.click(timeout=5000)
                    return
            except Exception:
                pass
        pg.wait_for_timeout(500)
    pg.keyboard.press("Enter")  # el cuadro ya tiene el foco; press() sobre el locator caducaba (11/2026)


def main():
    a = sys.argv[1:]
    src, out = a[0], a[1]
    new = "--new" in a
    chat = a[a.index("--chat") + 1] if "--chat" in a else None
    wait = float(a[a.index("--wait") + 1]) if "--wait" in a else 30
    if not new and not chat and os.path.exists(LAST):
        chat = open(LAST, encoding="utf-8").read().strip() or None
    leer = "--leer" in a  # solo recoger la última respuesta del chat, sin enviar nada
    q = open(src, encoding="utf-8").read()
    cerrar = "--no-cerrar" not in a
    abrir_edge()
    with sync_playwright() as p:
        br = p.chromium.connect_over_cdp(f"http://127.0.0.1:{PUERTO}")
        pg = br.contexts[0].new_page()
        try:
            pg.goto(chat or PROJECT, wait_until="domcontentloaded", timeout=60000)
            try:  # un chat largo tarda en pintarse: esperar al cuadro de texto, no un tiempo fijo
                pg.locator('[contenteditable="true"]').first.wait_for(timeout=45000)
            except Exception:
                pass
            if "auth" in pg.url or pg.locator('[contenteditable="true"]').count() == 0:
                print("LOGIN_REQUERIDO", pg.url)
                sys.exit(3)
            before = pg.locator(ASSISTANT).count()
            # 11/2026: hay un contenteditable oculto; fill() esperaba a que fuera visible y caducaba.
            if not leer:
                box = pg.locator('[contenteditable="true"]:visible').first
                box.click(timeout=60000)
                pg.keyboard.insert_text(q)
                pg.wait_for_timeout(2000)
                send(pg)
            pg.wait_for_timeout(8000)
            for _ in range(20):
                if "/c/" in pg.url:
                    break
                pg.wait_for_timeout(1000)
            if "/c/" in pg.url:
                open(LAST, "w", encoding="utf-8").write(pg.url)
            deadline = time.monotonic() + wait * 60
            last, stable, text = -1, 0, ""
            while time.monotonic() < deadline:
                pg.wait_for_timeout(5000)
                gen = pg.locator(STOP).count() > 0
                n = pg.locator(ASSISTANT).count()
                try:  # 11/2026: el último bloque a veces no es legible aún; no tumbar la espera
                    text = pg.locator(ASSISTANT).last.inner_text(timeout=5000) if n > before or (n and chat is None) or leer else ""
                except Exception:
                    text = ""
                stable = stable + 1 if (len(text) == last and not gen and len(text) > 20) else 0
                last = len(text)
                if stable >= 12:  # 60 s sin cambios: GPT hace pausas largas al buscar en internet
                    break
            open(out, "w", encoding="utf-8").write(text)
            print("OK", len(text), "chars", pg.url)
        finally:
            pg.close()
            if cerrar:
                cerrar_edge(br)


if __name__ == "__main__":
    main()

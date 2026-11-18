"""Pregunta a ChatGPT en el proyecto «Creación Webs» por el Edge CDP 9241.
uso: python ask.py <prompt.txt> <salida.md> [--new | --chat URL] [--wait MIN]
Por defecto sigue en el último chat (last_chat.txt); --new abre uno nuevo en el proyecto."""
import os, re, sys, time
from playwright.sync_api import sync_playwright

PROJECT = "https://chatgpt.com/g/g-p-6afb191fd7e08191a093ea57adc7d51d/project"
HERE = os.path.dirname(os.path.abspath(__file__))
LAST = os.path.join(HERE, "last_chat.txt")
# 11/2026: ChatGPT quitó data-message-author-role; cada turno lleva data-content-search-unit-key="…:assistant".
ASSISTANT = '[data-content-search-unit-key$=":assistant"], [data-message-author-role="assistant"]'
STOP = 'button[data-testid="stop-button"], button[aria-label*="Detener"], button[aria-label*="Stop"]'
SEND = 'button[data-testid="send-button"], button[type="submit"][aria-label="Enviar"], button[type="submit"][aria-label*="Send"]'


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
    q = open(src, encoding="utf-8").read()
    with sync_playwright() as p:
        br = p.chromium.connect_over_cdp("http://127.0.0.1:9241")
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
                text = pg.locator(ASSISTANT).last.inner_text() if n > before or (n and chat is None) else ""
                stable = stable + 1 if (len(text) == last and not gen and len(text) > 20) else 0
                last = len(text)
                if stable >= 3:
                    break
            open(out, "w", encoding="utf-8").write(text)
            print("OK", len(text), "chars", pg.url)
        finally:
            pg.close()


if __name__ == "__main__":
    main()

# python manual/demos/og.py  → public/og-default.png (1200x630)
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
img = Image.new('RGB', (W, H), '#0f172a')
d = ImageDraw.Draw(img)
for y in range(H):  # degradado suave
    t = y / H
    d.line([(0, y), (W, y)], fill=(int(15 + 22 * t), int(23 + 40 * t), int(42 + 60 * t)))

def font(size, bold=False):
    for name in (['segoeuib.ttf', 'arialbd.ttf'] if bold else ['segoeui.ttf', 'arial.ttf']):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            pass
    return ImageFont.load_default()

d.rounded_rectangle([80, 80, 152, 152], 16, fill='#22c55e')
d.text((116, 116), 'A', font=font(48, True), fill='#0f172a', anchor='mm')
d.text((176, 116), 'Automatiza sin humo', font=font(40, True), fill='#f8fafc', anchor='lm')
d.text((80, 260), 'Webs y automatizaciones', font=font(72, True), fill='#f8fafc')
d.text((80, 350), 'a precio cerrado', font=font(72, True), fill='#22c55e')
d.text((80, 480), 'Eliges · Rellenas campos · Lo recibes funcionando', font=font(34), fill='#cbd5e1')
img.save('public/og-default.png', optimize=True)
print('ok')

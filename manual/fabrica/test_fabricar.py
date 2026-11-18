"""Pruebas de la fábrica sin red ni IA: python -m unittest discover -s manual/fabrica"""
import unittest

from fabricar import poner_datos

PLANTILLA = (
    '<html><head><title>Inicio | Lumen</title></head><body>'
    '<a class="logo">Lumen</a><a href="mailto:hola@lumen.test">hola@lumen.test</a>'
    '<a href="tel:+1 555">Llamar</a><a href="https://wa.me/15550000">WhatsApp</a>'
    '</body></html>'
)


def pedido(**cambios):
    p = {'negocio': 'Peluquería Ana', 'actividad': 'peluquería', 'ciudad': 'Vigo',
         'email': 'ana@example.es', 'telefono': '986 00 00 00', 'whatsapp': '+34 600 00 00 00'}
    p.update(cambios)
    return p


class PonerDatos(unittest.TestCase):
    def test_datos_normales(self):
        out = poner_datos(PLANTILLA, pedido(), 'Lumen')
        self.assertIn('>Peluquería Ana<', out)
        self.assertIn('href="mailto:ana@example.es"', out)
        self.assertIn('href="tel:986000000"', out)
        self.assertIn('wa.me/34600000000', out)
        self.assertIn('<title>Peluquería Ana · peluquería en Vigo</title>', out)
        self.assertNotIn('lumen.test', out)

    def test_nombre_con_html_se_escapa(self):
        out = poner_datos(PLANTILLA, pedido(negocio='<script>alert(1)</script> & "Co"'), 'Lumen')
        self.assertNotIn('<script>', out)
        self.assertIn('&lt;script&gt;alert(1)&lt;/script&gt; &amp; &quot;Co&quot;', out)

    def test_ciudad_y_actividad_se_escapan(self):
        out = poner_datos(PLANTILLA, pedido(ciudad='<b>Vigo</b>', actividad='a\\1'), 'Lumen')
        self.assertNotIn('<b>', out)
        self.assertIn('a\\1 en &lt;b&gt;Vigo&lt;/b&gt;', out)

    def test_correo_que_rompe_el_atributo_se_rechaza(self):
        for malo in ('x"onmouseover="alert(1)@a.es', 'a@b.es"><script>', 'sin-arroba', ''):
            with self.subTest(correo=malo), self.assertRaises(ValueError):
                poner_datos(PLANTILLA, pedido(email=malo), 'Lumen')

    def test_noindex_una_sola_vez(self):
        con_robots = PLANTILLA.replace('<head>', '<head><meta name="robots" content="index,follow">')
        out = poner_datos(con_robots, pedido(), 'Lumen')
        self.assertEqual(out.count('name="robots"'), 1)
        self.assertIn('<head><meta name="robots" content="noindex">', out)

    def test_telefono_solo_digitos(self):
        out = poner_datos(PLANTILLA, pedido(telefono='600"><img src=x>'), 'Lumen')
        self.assertIn('href="tel:600"', out)
        self.assertNotIn('<img', out)


if __name__ == '__main__':
    unittest.main()

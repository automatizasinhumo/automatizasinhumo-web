import json
import tempfile
import unittest
from pathlib import Path

import ajustes


class ValidarTests(unittest.TestCase):
    def test_se_queda_con_lo_valido_y_lo_no_valido_queda_sin_aplicar(self):
        # Lo que no se entiende se pidió igual: no puede salir como «QA ok» sin aplicarse.
        r = ajustes.validar({'logo': 'mas_grande', 'texto': 'enorme', 'color': 'azul', 'sin_aplicar': ['otra foto']})
        self.assertEqual(r, {'logo': 'mas_grande', 'sin_aplicar': [
            'otra foto', 'texto (no se entendió el cambio)', 'color (no se entendió el cambio)']})

    def test_sin_aplicar_mal_formado_no_tira_lo_demas(self):
        self.assertEqual(ajustes.validar({'color': '#0a3d62', 'sin_aplicar': 'foto'}),
                         {'color': '#0a3d62', 'sin_aplicar': ['sin_aplicar (no se entendió el cambio)']})

    def test_no_es_objeto(self):
        with self.assertRaises(ValueError):
            ajustes.validar(['logo'])


class PedirAjustesTests(unittest.TestCase):
    def test_sin_cambios_no_llama_a_la_ia(self):
        def ia(*_):
            raise AssertionError('no debía llamarse')
        self.assertEqual(ajustes.pedir_ajustes('  ', ia), {'sin_aplicar': []})

    def test_lee_el_json_aunque_venga_con_texto_alrededor(self):
        vistos = []

        def ia(sistema, usuario):
            vistos.append(usuario)
            return 'Claro: {"logo": "mas_grande", "texto": null, "color": null, "sin_aplicar": []} ¡listo!'
        self.assertEqual(ajustes.pedir_ajustes('Cambios pedidos sobre la versión 1: logo más grande', ia),
                         {'logo': 'mas_grande', 'texto': None, 'color': None, 'sin_aplicar': []})
        self.assertIn('logo más grande', vistos[0])


class RondasPorBloques(unittest.TestCase):
    """Ninguna ronda se queda fuera por longitud; en lo que se contradice, manda la más reciente."""

    def test_rondas_largas_van_en_varios_bloques_sin_perder_ninguna(self):
        rondas = ['nueva ' + 'n' * 2000, 'media ' + 'm' * 2000, 'vieja: color #123456 ' + 'v' * 2000]
        b = ajustes.bloques(rondas)
        self.assertEqual(len(b), 3)
        self.assertTrue(b[0].startswith('vieja'))
        self.assertTrue(all(len(x) <= ajustes.BLOQUE for x in b))

    def test_ronda_mayor_que_un_bloque_se_parte(self):
        b = ajustes.bloques(['x' * (ajustes.BLOQUE * 2 + 5)])
        self.assertEqual([len(x) for x in b], [ajustes.BLOQUE, ajustes.BLOQUE, 5])

    def test_la_mas_reciente_manda_y_lo_antiguo_no_se_pierde(self):
        respuestas = iter([
            '{"logo": null, "texto": null, "color": "#123456", "sin_aplicar": ["otra foto"]}',  # ronda vieja
            '{"logo": "mas_grande", "texto": null, "color": null, "sin_aplicar": []}',
            '{"logo": "mas_pequeno", "texto": null, "color": null, "sin_aplicar": ["vídeo"]}',  # la más reciente
        ])
        r = ajustes.pedir_ajustes(['n' * 2900, 'm' * 2900, 'v' * 2900], lambda s, u: next(respuestas))
        self.assertEqual(r['color'], '#123456')
        self.assertEqual(r['logo'], 'mas_pequeno')
        self.assertEqual(r['sin_aplicar'], ['otra foto', 'vídeo'])

    def test_rondas_cortas_en_una_sola_llamada(self):
        llamadas = []
        ajustes.pedir_ajustes(['logo más grande', 'color azul'], lambda s, u: llamadas.append(u) or '{"sin_aplicar": []}')
        self.assertEqual(len(llamadas), 1)
        self.assertLess(llamadas[0].index('color azul'), llamadas[0].index('logo más grande'))


class CssTests(unittest.TestCase):
    def test_logo_mas_grande_solo_en_la_cabecera(self):
        css = ajustes.css_de({'logo': 'mas_grande'})
        self.assertIn(':is(header, nav)', css)
        self.assertIn('zoom:1.4', css)

    def test_nada_que_ajustar_no_mete_estilo(self):
        self.assertEqual(ajustes.css_de({'logo': None, 'sin_aplicar': ['foto']}), '')
        self.assertEqual(ajustes.aplicar('<html><head></head></html>', ''), '<html><head></head></html>')

    def test_color_usa_las_variables_de_la_plantilla_y_texto_legible(self):
        with tempfile.TemporaryDirectory() as tmp:
            Path(tmp, 'estilo.css').write_text(':root{--color-primary:#f00;--bs-body-bg:#fff;--accent:#0f0}',
                                               encoding='utf-8')
            variables = ajustes.variables_de_color(tmp)
        self.assertEqual(variables, ['--accent', '--color-primary'])
        css = ajustes.css_de({'color': '#ffe066'}, variables)
        self.assertIn('--accent:#ffe066!important;--color-primary:#ffe066!important;', css)
        self.assertIn('color:#111111', css)  # fondo claro -> letra oscura
        self.assertIn('color:#ffffff', ajustes.css_de({'color': '#0a3d62'}))

    def test_el_estilo_va_al_final_del_head(self):
        html = ajustes.aplicar('<html><head><link rel="stylesheet" href="a.css"></HEAD><body></body></html>',
                               '<style id="ash-ajustes">x</style>')
        self.assertLess(html.index('a.css'), html.index('ash-ajustes'))
        self.assertLess(html.index('ash-ajustes'), html.index('</HEAD>'))


class Contraste(unittest.TestCase):
    def test_por_razon_wcag(self):
        # Con la fórmula de brillo, #00bb00 daba blanco (2,6:1); el texto oscuro pasa de 4,5:1.
        self.assertEqual(ajustes.contraste('#00bb00'), '#111111')
        self.assertEqual(ajustes.contraste('#1a237e'), '#ffffff')
        self.assertEqual(ajustes.contraste('#ffffff'), '#111111')
        self.assertEqual(ajustes.contraste('#000000'), '#ffffff')


if __name__ == '__main__':
    unittest.main()

import json
import subprocess
import unittest

from navegador import NO_DISPONIBLE, qa_navegador


def salida(codigo, stdout):
    return lambda *a, **k: subprocess.CompletedProcess(a, codigo, stdout=stdout, stderr='')


class QaNavegador(unittest.TestCase):
    def test_sin_problemas(self):
        self.assertEqual(qa_navegador('https://x', salida(0, json.dumps({'problemas': []}))), [])

    def test_problemas_del_navegador(self):
        r = qa_navegador('https://x', salida(1, 'ruido\n' + json.dumps({'problemas': ['360px: JS: boom']})))
        self.assertEqual(r, ['navegador 360px: JS: boom'])

    def test_sin_node_falla_cerrado(self):
        def no_hay(*a, **k):
            raise FileNotFoundError('node')
        self.assertTrue(qa_navegador('https://x', no_hay)[0].startswith(NO_DISPONIBLE))

    def test_tiempo_agotado_falla_cerrado(self):
        def lento(*a, **k):
            raise subprocess.TimeoutExpired('node', 1)
        self.assertTrue(qa_navegador('https://x', lento)[0].startswith(NO_DISPONIBLE))

    def test_playwright_ausente_falla_cerrado(self):
        # Error de importación: sin JSON en la salida.
        self.assertTrue(qa_navegador('https://x', salida(1, ''))[0].startswith(NO_DISPONIBLE))

    def test_salida_rara_falla_cerrado(self):
        for texto in ('{"problemas": "x"}', '[1]', '{"otra": []}', '{"problemas": [3]}'):
            self.assertTrue(qa_navegador('https://x', salida(1, texto))[0].startswith(NO_DISPONIBLE), texto)

    def test_fallo_sin_problemas_falla_cerrado(self):
        self.assertTrue(qa_navegador('https://x', salida(1, '{"problemas": []}'))[0].startswith(NO_DISPONIBLE))

    def test_exito_con_problemas_no_pasa(self):
        self.assertNotEqual(qa_navegador('https://x', salida(0, '{"problemas": ["a"]}')), [])


if __name__ == '__main__':
    unittest.main()

import io
import json
import os
import unittest
import urllib.error
from unittest.mock import patch

import proveedores_ia as pia

CF = ('workers-ai', 'https://cf', 't', 'gemma')
GROQ = ('groq', 'https://groq', 'g', 'gpt-oss')


def error(codigo, cuerpo, cabeceras=None):
    return urllib.error.HTTPError('https://api', codigo, 'x', cabeceras or {}, io.BytesIO(cuerpo))


class Respuesta(io.BytesIO):
    def __enter__(self):
        return self

    def __exit__(self, *_):
        return False


def ok(texto):
    return Respuesta(json.dumps({'choices': [{'message': {'content': texto}}]}).encode())


def CUPO_CF(): return error(429, b'{"errors":[{"message":"daily free allocation of 10,000 neurons","code":4006}]}')
def CUPO_GROQ(): return error(429, b'{"error":{"message":"Rate limit reached on tokens per day (TPD): Limit 200000","code":"rate_limit_exceeded"}}')


class Base(unittest.TestCase):
    def setUp(self):
        pia.FUERA.clear()
        pia.ALERTAS.clear()
        self.espera = patch.object(pia.time, 'sleep').start()
        self.addCleanup(patch.stopall)
        self.addCleanup(pia.FUERA.clear)
        self.addCleanup(pia.ALERTAS.clear)

    def urlopen(self, *efectos):
        return patch.object(pia.urllib.request, 'urlopen', side_effect=list(efectos))


class Clasificar(Base):
    def test_cupo_diario_de_cada_proveedor(self):
        self.assertEqual(pia.clasificar(429, CUPO_CF().read()), 'cupo')
        self.assertEqual(pia.clasificar(429, b'{"errors":[{"code":3036}]}'), 'cupo')
        self.assertEqual(pia.clasificar(429, CUPO_GROQ().read()), 'cupo')

    def test_limite_por_minuto_espera_si_es_corto(self):
        self.assertEqual(pia.clasificar(429, b'{"errors":[{"code":3040}]}', {'retry-after': '7'}), 'espera:7')
        self.assertEqual(pia.clasificar(429, b'{}', {'retry-after': '3600'}), 'cupo')
        self.assertEqual(pia.clasificar(429, b'<html>4006</html>'), 'espera:5')

    def test_mensaje_de_nivel_superior_cuenta(self):
        self.assertEqual(pia.clasificar(429, b'{"message":"Too many requests per day"}'), 'cupo')

    def test_codigo_dentro_de_otro_campo_no_cuenta(self):
        self.assertEqual(pia.clasificar(429, b'{"errors":[{"code":3040}],"request_id":"ab4006cd"}'), 'espera:5')

    def test_retirado_credenciales_y_pasajero(self):
        self.assertEqual(pia.clasificar(410, b''), 'retirado')
        self.assertEqual(pia.clasificar(400, b'{"errors":[{"code":5028}]}'), 'retirado')
        self.assertEqual(pia.clasificar(401, b''), 'credenciales')
        self.assertEqual(pia.clasificar(503, b''), 'pasajero')
        self.assertEqual(pia.clasificar(400, b'{}'), 'peticion')


class Contenido(unittest.TestCase):
    def test_formatos_openai_y_workers_ai(self):
        self.assertEqual(pia.contenido({'choices': [{'message': {'content': 'hola'}}]}), 'hola')
        self.assertEqual(pia.contenido({'result': {'response': {'1': 'a'}}}), '{"1": "a"}')
        with self.assertRaises(ValueError):
            pia.contenido({'choices': [{'message': {'content': None}}]})


class Cadena(Base):
    def test_sin_cupo_en_workers_ai_contesta_groq_y_no_se_vuelve_a_probar(self):
        with self.urlopen(CUPO_CF(), ok('uno'), ok('dos')) as abrir:
            self.assertEqual(pia.completar([CF, GROQ], 's', 'u'), 'uno')
            self.assertEqual(pia.completar([CF, GROQ], 's', 'u'), 'dos')
        self.assertEqual([c.args[0].full_url for c in abrir.call_args_list], ['https://cf', 'https://groq', 'https://groq'])
        self.assertEqual(pia.ALERTAS, [])

    def test_todos_sin_cupo_es_cupo_agotado(self):
        with self.urlopen(CUPO_CF(), CUPO_GROQ()):
            with self.assertRaises(pia.CupoIAAgotado):
                pia.completar([CF, GROQ], 's', 'u')
        with self.urlopen() as abrir, self.assertRaises(pia.CupoIAAgotado):
            pia.completar([CF, GROQ], 's', 'u')  # ya sin llamar a nadie
        abrir.assert_not_called()

    def test_limite_por_minuto_espera_y_reintenta_el_mismo(self):
        with self.urlopen(error(429, b'{}', {'Retry-After': '2'}), ok('hola')):
            self.assertEqual(pia.completar([CF], 's', 'u'), 'hola')
        self.espera.assert_called_once_with(2.0)

    def test_modelo_retirado_alerta_y_pasa_al_siguiente(self):
        with self.urlopen(error(410, b'{"errors":[{"code":5028}]}'), ok('hola')):
            self.assertEqual(pia.completar([CF, GROQ], 's', 'u'), 'hola')
        self.assertEqual(pia.ALERTAS, ['workers-ai: retirado (gemma)'])

    def test_error_que_no_es_cupo_se_relanza(self):
        with self.urlopen(*[error(503, b'') for _ in range(3)]):
            with self.assertRaises(urllib.error.HTTPError):
                pia.completar([CF], 's', 'u')
        self.assertNotIn('workers-ai', pia.FUERA)  # la próxima llamada lo vuelve a probar

    def test_clave_rechazada_no_se_confunde_con_cupo_en_la_siguiente_llamada(self):
        with self.urlopen(error(401, b'')):
            with self.assertRaises(urllib.error.HTTPError):
                pia.completar([CF], 's', 'u')
        with self.urlopen() as abrir, self.assertRaises(RuntimeError) as fin:
            pia.completar([CF], 's', 'u')
        abrir.assert_not_called()
        self.assertNotIsInstance(fin.exception, pia.CupoIAAgotado)

    def test_un_proveedor_con_cupo_y_otro_caido_no_es_cupo(self):
        with self.urlopen(CUPO_CF(), *[urllib.error.URLError('dns')] * 3):
            with self.assertRaises(urllib.error.URLError):
                pia.completar([CF, GROQ], 's', 'u')


class CadenaDesdeEntorno(unittest.TestCase):
    def test_groq_y_mistral_solo_con_clave(self):
        with patch.dict(os.environ, {}, clear=True):
            self.assertEqual([n for n, *_ in pia.cadena('t', 'acc')], ['workers-ai'])
        with patch.dict(os.environ, {'GROQ_API_KEY': 'g', 'MISTRAL_API_KEY': 'm'}, clear=True):
            nombres = [n for n, *_ in pia.cadena('t', 'acc')]
        self.assertEqual(nombres, ['workers-ai', 'groq', 'mistral'])
        self.assertIn('/accounts/acc/ai/v1/chat/completions', pia.cadena('t', 'acc')[0][1])


if __name__ == '__main__':
    unittest.main()

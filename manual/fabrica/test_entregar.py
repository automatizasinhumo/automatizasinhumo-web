import io
import json
import sys
import unittest
import urllib.parse
import zipfile
from unittest.mock import patch

sys.argv = sys.argv[:1]  # vistas-previas.py lee --config/--max de la línea de órdenes al importarse
import entregar  # noqa: E402

FILA = {'public_id': 'S-ABC123', 'slug': 'web-peluqueria', 'producto': 'Web para peluquería', 'nombre': 'Ana',
        'email': 'ana@example.es', 'telefono': '600111222',
        'campos': json.dumps({'Nombre del negocio': 'Peluquería Ana'}), 'mensaje': ''}


class KVFalso:
    """Workers KV en memoria con la forma de la API REST de Cloudflare."""

    def __init__(self, claves):
        self.claves, self.subidas = dict(claves), {}

    def __call__(self, ruta, metodo='GET', datos=None):
        if ruta.startswith('/keys?'):
            q = urllib.parse.parse_qs(ruta[6:])
            nombres = [k for k in self.claves if k.startswith(q['prefix'][0])]
            return json.dumps({'result': [{'name': k} for k in nombres], 'result_info': {}}).encode()
        clave = urllib.parse.unquote(ruta[len('/values/'):].split('?')[0])
        if metodo == 'PUT':
            self.subidas[clave] = (datos, ruta)
            return b'{}'
        return self.claves[clave]


class Entregar(unittest.TestCase):
    def test_zip_de_la_vista_previa_sin_noindex(self):
        kv = KVFalso({'sites/s-abc123/index.html': b'<html><meta name="robots" content="noindex"><h1>Ana</h1></html>',
                      'sites/s-abc123/img/a.png': b'\x89PNG', 'sites/s-abc123/_headers': b'X-Robots-Tag: noindex',
                      'sites/otra/index.html': b'no'})
        with patch.object(entregar, 'kv', kv):
            nota = entregar.entregar(FILA)
        self.assertRegex(nota, r'^Entrega automática: https://\S+/entrega/[A-Za-z0-9_-]{32}\.zip · lista$')
        (clave, (datos, ruta)), = kv.subidas.items()
        self.assertRegex(clave, r'^entregas/[A-Za-z0-9_-]{32}\.zip$')
        self.assertIn(f'expiration_ttl={entregar.ENTREGA_TTL}', ruta)
        z = zipfile.ZipFile(io.BytesIO(datos))
        nombres = set(z.namelist())
        self.assertIn('web-publicable/img/a.png', nombres)
        self.assertIn('codigo-fuente/wrangler.jsonc', nombres)
        self.assertNotIn('web-publicable/_headers', nombres)
        self.assertNotIn(b'noindex', z.read('web-publicable/index.html'))
        self.assertIn('Peluquería Ana', z.read('LEEME.md').decode('utf-8'))

    def test_sin_vista_previa_en_kv_pide_revisar(self):
        kv = KVFalso({})
        with patch.object(entregar, 'kv', kv):
            self.assertIn('revisar a mano', entregar.entregar(FILA))
        self.assertEqual(kv.subidas, {})

    def test_clave_que_sale_del_directorio_se_ignora(self):
        kv = KVFalso({'sites/s-abc123/index.html': b'<h1>Ana</h1>', 'sites/s-abc123/../../fuera.txt': b'x'})
        with patch.object(entregar, 'kv', kv):
            self.assertTrue(entregar.entregar(FILA).endswith('· lista'))

    def test_un_fallo_deja_nota_para_revisar(self):
        notas = []

        def d1(sql):
            notas.append(sql)
            return [{'public_id': 'S-ABC123'}]

        with patch.object(entregar.vp, 'd1', d1), patch.object(entregar, 'entregar', side_effect=OSError('red')):
            self.assertTrue(entregar.procesar(FILA))
        self.assertIn("falló (OSError, revisar a mano)", notas[-1])
        self.assertIn("estado = 'pagada'", notas[-1])


if __name__ == '__main__':
    unittest.main()

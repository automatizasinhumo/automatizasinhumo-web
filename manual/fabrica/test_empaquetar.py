"""Pruebas del paquete de entrega «Toma tu web»."""
import importlib.util, json, tempfile, unittest, zipfile
from pathlib import Path
from unittest import mock

spec = importlib.util.spec_from_file_location('empaquetar', Path(__file__).with_name('empaquetar.py'))
emp = importlib.util.module_from_spec(spec)
spec.loader.exec_module(emp)


class Empaquetar(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.dir = Path(self.tmp.name)
        self.addCleanup(self.tmp.cleanup)
        parche = mock.patch.object(emp, 'DEMOS', self.dir)
        parche.start()
        self.addCleanup(parche.stop)

    def pedido(self, datos):
        ruta = self.dir / 'pedido.json'
        ruta.write_text(json.dumps(datos), encoding='utf-8')
        return ruta

    def test_paquete_con_estructura_de_entrega(self):
        site = self.dir / 'clientes' / 'p1' / 'site'
        (site / 'css').mkdir(parents=True)
        (site / 'index.html').write_text('<h1>Hola</h1>', encoding='utf-8')
        (site / 'css' / 'a.css').write_text('h1{}', encoding='utf-8')
        (site / '_headers').write_text('/*\n  X-Robots-Tag: noindex\n', encoding='utf-8')
        ruta = self.pedido({'id': 'p1', 'negocio': 'Bar Pepe', 'email': 'a@b.es', 'clave': 'x'})

        with zipfile.ZipFile(emp.empaquetar(ruta)) as z:
            nombres = set(z.namelist())
            datos = json.loads(z.read('datos-negocio/business-manifest.json'))
        self.assertLessEqual({'LEEME.md', 'web-publicable/index.html', 'web-publicable/css/a.css',
                              'codigo-fuente/site/index.html', 'datos-negocio/business-manifest.json',
                              'guias/publicar.md', 'guias/dominio.md'}, nombres)
        self.assertNotIn('web-publicable/_headers', nombres)  # el noindex es solo de la vista previa
        self.assertEqual(datos['negocio'], {'negocio': 'Bar Pepe', 'email': 'a@b.es'})  # sin campos ajenos

    def test_sin_web_fabricada_falla(self):
        with self.assertRaises(FileNotFoundError):
            emp.empaquetar(self.pedido({'id': 'nada'}))


if __name__ == '__main__':
    unittest.main()

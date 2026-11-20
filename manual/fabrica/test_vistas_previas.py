import importlib.util
import sys
import unittest
from pathlib import Path
from unittest.mock import patch

sys.argv = sys.argv[:1]  # vistas-previas.py lee --config/--max de la línea de órdenes al importarse
_spec = importlib.util.spec_from_file_location('vistas_previas', Path(__file__).parent / 'vistas-previas.py')
vp = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(vp)

NOTA = 'Cambios pedidos por el cliente (sobre la versión 1):\nTeléfono 600 000 000\n\nVista previa automática: https://x · QA ok'


class RondaDeCambios(unittest.TestCase):
    def test_los_cambios_van_al_mensaje_con_su_version(self):
        m = vp.con_cambios({'estado': 'cambios_pedidos', 'nota': NOTA, 'mensaje': 'Abrimos sábados'})
        self.assertEqual(m, 'Abrimos sábados\n\nCambios pedidos sobre la versión 1: Teléfono 600 000 000')

    def test_solo_en_cambios_pedidos_y_con_texto(self):
        self.assertIsNone(vp.con_cambios({'estado': 'nueva', 'nota': NOTA, 'mensaje': ''}))
        self.assertIsNone(vp.con_cambios({'estado': 'cambios_pedidos', 'nota': 'Otra nota de David', 'mensaje': ''}))

    def test_la_ia_recibe_los_cambios(self):
        fila = {'public_id': 'S-ABC123', 'slug': 's', 'producto': 'Web', 'nombre': 'Ana', 'email': 'a@b.es',
                'telefono': '', 'campos': '{}', 'mensaje': vp.con_cambios({'estado': 'cambios_pedidos', 'nota': NOTA})}
        self.assertIn('Teléfono 600 000 000', vp.pedido_de(fila, 'plantillas-negocio/x')['descripcion'])
        largo = {**fila, 'campos': '{"Historia": "%s"}' % ('x' * 2000)}
        self.assertIn('Teléfono 600 000 000', vp.pedido_de(largo, 'plantillas-negocio/x')['descripcion'])


class FabricaEnRojo(unittest.TestCase):
    """Un fallo de la fábrica no puede quedar en una ejecución verde (20/11: 3 de 3 bloqueadas en verde)."""

    def lote(self, intentos_previos):
        fila = {'public_id': 'S-ABC123', 'slug': 'web', 'producto': 'Web', 'nombre': 'Ana', 'email': 'a@b.es',
                'telefono': '', 'campos': '{}', 'mensaje': '', 'nota': f'reintento {intentos_previos}' if intentos_previos else '',
                'estado': 'nueva'}

        def d1(sql):
            return [fila] if sql.startswith('SELECT') else [{'public_id': 'S-ABC123'}]

        def bloqueada(_ruta):
            raise RuntimeError('FabricaBloqueada')

        with patch.object(vp, 'disenos', return_value={'web': ['plantillas-negocio/x']}),                 patch.object(vp, 'd1', side_effect=d1), patch.object(vp, 'fabricar', side_effect=bloqueada),                 patch.object(vp, 'FALLOS_FABRICA', []), patch.object(vp, 'A_MANO', []), patch.object(vp, 'FALLOS_D1', []):
            vp.main()

    def test_todas_fallidas_termina_en_rojo(self):
        with self.assertRaises(SystemExit):
            self.lote(0)

    def test_agotados_los_reintentos_termina_en_rojo(self):
        with self.assertRaises(SystemExit):
            self.lote(vp.REINTENTOS)


if __name__ == '__main__':
    unittest.main()

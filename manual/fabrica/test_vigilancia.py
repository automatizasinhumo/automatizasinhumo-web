import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import json

from vigilancia import configuracion_d1, decidir_accion


class DecidirAccionTests(unittest.TestCase):
    def test_cierra_si_no_quedan_solicitudes_y_hay_issue_abierta(self):
        self.assertEqual(decidir_accion(0, True), "cerrar")

    def test_abre_si_hay_solicitudes_y_no_hay_issue(self):
        self.assertEqual(decidir_accion(2, False), "abrir")

    def test_comenta_si_hay_solicitudes_y_issue_abierta(self):
        self.assertEqual(decidir_accion(2, True), "comentar")

    def test_no_hace_nada_si_no_hay_solicitudes_ni_issue(self):
        self.assertEqual(decidir_accion(0, False), "ninguna")


class ConfiguracionD1Tests(unittest.TestCase):
    def test_escribe_el_id_valido_en_un_fichero_propio(self):
        ruta = Path(configuracion_d1("0123abcd-0000-4000-8000-0123456789ab"))
        try:
            datos = json.loads(ruta.read_text(encoding="utf-8"))
            self.assertEqual(datos["d1_databases"][0]["database_id"], "0123abcd-0000-4000-8000-0123456789ab")
        finally:
            ruta.unlink()

    def test_rechaza_lo_que_no_es_uuid(self):
        for malo in ("", "--help", "x\"}, {\"y", "0123abcd-0000-4000-8000-0123456789ab --remote"):
            with self.subTest(malo=malo), self.assertRaises(RuntimeError):
                configuracion_d1(malo)


if __name__ == "__main__":
    unittest.main()

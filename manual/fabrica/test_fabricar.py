import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from vigilancia import decidir_accion


class DecidirAccionTests(unittest.TestCase):
    def test_cierra_si_no_quedan_solicitudes_y_hay_issue_abierta(self):
        self.assertEqual(decidir_accion(0, True), "cerrar")

    def test_abre_si_hay_solicitudes_y_no_hay_issue(self):
        self.assertEqual(decidir_accion(2, False), "abrir")

    def test_comenta_si_hay_solicitudes_y_issue_abierta(self):
        self.assertEqual(decidir_accion(2, True), "comentar")

    def test_no_hace_nada_si_no_hay_solicitudes_ni_issue(self):
        self.assertEqual(decidir_accion(0, False), "ninguna")


if __name__ == "__main__":
    unittest.main()

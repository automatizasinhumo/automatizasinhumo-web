import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import json
from datetime import datetime, timezone
from unittest.mock import patch

import vigilancia
from vigilancia import AVISO_HORA, configuracion_d1, decidir_accion, estado_cupo_d1


def A_LAS(hora):
    return datetime(2026, 11, 20, hora, 30, tzinfo=timezone.utc)


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


class CupoD1Tests(unittest.TestCase):
    def test_dia_normal_sin_aviso(self):
        activo, _, _ = estado_cupo_d1({"2026-11-20T00:00:00Z": 26834, "2026-11-20T01:00:00Z": 640}, A_LAS(1))
        self.assertFalse(activo)

    def test_el_19_11_avisa_antes_de_agotarse(self):
        # 19/11: unas 1,2 M filas por hora desde las 10:00 UTC; con la primera de esas horas ya avisa.
        activo, titulo, cuerpo = estado_cupo_d1({"2026-11-19T09:00:00Z": 50000, "2026-11-19T10:00:00Z": 1181212},
                                                 datetime(2026, 11, 19, 10, 40, tzinfo=timezone.utc))
        self.assertTrue(activo)
        self.assertTrue(titulo.startswith("D1: "))
        self.assertIn("1,181,212", cuerpo)

    def test_avisa_por_total_del_dia_aunque_el_ritmo_baje(self):
        horas = {f"2026-11-20T{h:02d}:00:00Z": 200000 for h in range(11)}
        activo, titulo, _ = estado_cupo_d1(horas, A_LAS(10))
        self.assertTrue(activo)
        self.assertEqual(titulo, "D1: lecturas al 40 % del cupo diario")

    def test_solo_cuentan_las_dos_ultimas_horas_para_el_ritmo(self):
        horas = {"2026-11-20T01:00:00Z": AVISO_HORA, "2026-11-20T02:00:00Z": 10, "2026-11-20T03:00:00Z": 10}
        self.assertFalse(estado_cupo_d1(horas, A_LAS(3))[0])

    def test_un_pico_viejo_sin_horas_nuevas_ya_no_avisa(self):
        # Las últimas horas CON datos son las del pico; la hora de reloj ya es otra.
        horas = {"2026-11-20T01:00:00Z": AVISO_HORA, "2026-11-20T02:00:00Z": AVISO_HORA}
        self.assertTrue(estado_cupo_d1(horas, A_LAS(2))[0])
        self.assertFalse(estado_cupo_d1(horas, A_LAS(6))[0])


class ReconciliarIssueTests(unittest.TestCase):
    def test_comenta_antes_de_cambiar_el_titulo(self):
        llamadas = []

        def gh(*args):
            llamadas.append(args[1])
            if args[1] == "comment":
                raise RuntimeError("Falló GitHub CLI")
            return ""

        abierta = {"number": 7, "title": "D1: lecturas al 50 % del cupo diario"}
        with patch.object(vigilancia, "issue_abierta", return_value=abierta),                 patch.object(vigilancia, "ejecutar_gh", side_effect=gh):
            with self.assertRaises(RuntimeError):
                vigilancia.reconciliar_issue("a/b", "d1", True, "D1: lecturas al 60 % del cupo diario", "c", "r",
                                             comentar_siempre=False)
        self.assertEqual(llamadas, ["comment"])  # el título sigue viejo: la próxima pasada reintenta


if __name__ == "__main__":
    unittest.main()

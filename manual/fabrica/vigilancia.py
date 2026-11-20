"""Vigila las solicitudes sin vista previa y la disponibilidad de staging."""

import argparse
import json
import os
import re
import subprocess
import sys
import tempfile
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
ETIQUETA = "vigilancia"
SQL_PENDIENTES = """
SELECT id FROM solicitudes
WHERE created_at < datetime('now', '-30 minutes')
  AND estado IN ('nueva', 'en_preparacion')
  AND COALESCE(nota, '') NOT LIKE 'Vista previa automática: https://%'
ORDER BY id
"""


def decidir_accion(cantidad: int, issue_abierta: bool) -> str:
    """Decide si una alerta debe abrirse, comentarse o cerrarse."""
    if cantidad < 0:
        raise ValueError("La cantidad no puede ser negativa")
    if cantidad:
        return "comentar" if issue_abierta else "abrir"
    return "cerrar" if issue_abierta else "ninguna"


def ejecutar_comando(comando: list[str], etiqueta: str) -> str:
    try:
        resultado = subprocess.run(
            comando,
            cwd=RAIZ,
            capture_output=True,
            text=True,
            encoding="utf-8",
            timeout=300,
            stdin=subprocess.DEVNULL,
            check=False,
        )
    except (OSError, subprocess.TimeoutExpired) as error:
        raise RuntimeError(f"No se pudo ejecutar {etiqueta} ({type(error).__name__})") from None
    if resultado.returncode:
        raise RuntimeError(f"Falló {etiqueta} (código {resultado.returncode})")
    return resultado.stdout


def ejecutar_gh(*argumentos: str) -> str:
    return ejecutar_comando(["gh", *argumentos], "GitHub CLI")


def json_gh(*argumentos: str):
    try:
        return json.loads(ejecutar_gh(*argumentos))
    except json.JSONDecodeError:
        raise RuntimeError("GitHub CLI devolvió una respuesta no válida") from None


def asegurar_etiqueta(repositorio: str) -> None:
    etiquetas = json_gh("label", "list", "--repo", repositorio, "--limit", "1000", "--json", "name")
    if not any(etiqueta.get("name") == ETIQUETA for etiqueta in etiquetas):
        ejecutar_gh(
            "label",
            "create",
            ETIQUETA,
            "--repo",
            repositorio,
            "--color",
            "FBCA04",
            "--description",
            "Avisos automáticos de la fábrica y staging",
        )


def issue_abierta(repositorio: str, tipo: str):
    asegurar_etiqueta(repositorio)
    issues = json_gh(
        "issue",
        "list",
        "--repo",
        repositorio,
        "--state",
        "open",
        "--label",
        ETIQUETA,
        "--limit",
        "100",
        "--json",
        "number,title",
    )
    for issue in issues:
        titulo = issue.get("title", "")
        if tipo == "fabrica" and re.fullmatch(r"Fábrica: \d+ solicitudes sin vista previa", titulo):
            return issue
        if tipo == "staging" and titulo == "Staging caído":
            return issue
        if tipo == "d1" and titulo.startswith("D1: "):
            return issue
    return None


def reconciliar_issue(repositorio: str, tipo: str, activo: bool, titulo: str, cuerpo: str, recuperado: str,
                      comentar_siempre: bool = True) -> None:
    issue = issue_abierta(repositorio, tipo)
    accion = decidir_accion(int(activo), issue is not None)
    if accion == "abrir":
        ejecutar_gh(
            "issue",
            "create",
            "--repo",
            repositorio,
            "--title",
            titulo,
            "--body",
            cuerpo,
            "--label",
            ETIQUETA,
        )
    elif accion == "comentar":
        numero = str(issue["number"])
        cambia = issue["title"] != titulo
        # Primero el comentario: si falla, el título no cambia y la próxima pasada lo reintenta.
        if cambia or comentar_siempre:
            ejecutar_gh("issue", "comment", numero, "--repo", repositorio, "--body", cuerpo)
        if cambia:
            ejecutar_gh("issue", "edit", numero, "--repo", repositorio, "--title", titulo)
    elif accion == "cerrar":
        ejecutar_gh("issue", "close", str(issue["number"]), "--repo", repositorio, "--comment", recuperado)


UUID = re.compile(r"[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}")


def configuracion_d1(database_id: str) -> str:
    """Escribe una configuración de Wrangler mínima y devuelve su ruta.

    La ruta la crea el propio script: ningún dato de fuera llega como argumento
    de un comando, solo el id de la base (validado) dentro del fichero.
    """
    if not UUID.fullmatch(database_id):
        raise RuntimeError("D1_DATABASE_ID no es un UUID")
    contenido = {
        "name": "automatizasinhumo-staging",
        "compatibility_date": "2026-11-01",
        "d1_databases": [{"binding": "DB", "database_name": "automatizasinhumo-staging-db", "database_id": database_id}],
    }
    with tempfile.NamedTemporaryFile("w", suffix=".wrangler.json", delete=False, encoding="utf-8") as fichero:
        json.dump(contenido, fichero)
    return fichero.name


def consultar_ids(configuracion: str) -> list[int]:
    salida = ejecutar_comando(
        [
            "npx",
            "wrangler",
            "d1",
            "execute",
            "DB",
            "--remote",
            "--json",
            "--config",
            configuracion,
            "--command",
            SQL_PENDIENTES,
        ],
        "consulta de D1",
    )
    try:
        documento = json.loads(salida[salida.index("["):])
        resultados = documento[0]["results"]
        return [int(fila["id"]) for fila in resultados]
    except (ValueError, KeyError, IndexError, TypeError):
        raise RuntimeError("D1 devolvió una respuesta no válida") from None


def vigilar_fabrica(repositorio: str, ids: list[int]) -> None:
    cantidad = len(ids)
    titulo = f"Fábrica: {cantidad} solicitudes sin vista previa"
    cuerpo = f"Solicitudes: {cantidad}\nIDs internos: {', '.join(map(str, ids))}"
    reconciliar_issue(
        repositorio,
        "fabrica",
        cantidad > 0,
        titulo,
        cuerpo,
        "Solicitudes sin vista previa: 0.",
    )


def vigilar_staging(repositorio: str, estado: str) -> None:
    caido = estado == "caido"
    cuerpo = "Falló la comprobación HTTP de staging en `/` o `/robots.txt`."
    reconciliar_issue(
        repositorio,
        "staging",
        caido,
        "Staging caído",
        cuerpo,
        "Staging operativo: `/` y `/robots.txt` responden.",
    )


# Cupo gratuito de D1: 5 M de filas leídas al día por cuenta, se renueva a las 00:00 UTC.
# El 19/11 una consulta sin caché lo agotó (5,19 M) y staging dio 500 hasta medianoche:
# se avisa antes, con margen para reaccionar.
CUPO_D1 = 5_000_000
AVISO_DIA = 0.4  # 2 M leídas en el día
AVISO_HORA = 300_000  # a este ritmo el cupo se acaba en menos de 17 h
GRAPHQL = "https://api.cloudflare.com/client/v4/graphql"
CONSULTA_D1 = """query($cuenta: String!, $desde: Time!, $hasta: Time!) { viewer { accounts(filter: {accountTag: $cuenta}) {
  d1AnalyticsAdaptiveGroups(limit: 1000, filter: {datetimeHour_geq: $desde, datetimeHour_leq: $hasta}) {
    sum { rowsRead } dimensions { datetimeHour } } } } }"""


def lecturas_d1(token: str, cuenta: str, ahora: datetime) -> dict[str, int]:
    """Filas leídas por hora (todas las bases de la cuenta) desde las 23:00 UTC de ayer.

    La hora anterior a medianoche entra para medir el ritmo a las 00:xx; no cuenta en el total del día."""
    if not re.fullmatch(r"[0-9a-f]{32}", cuenta):
        raise RuntimeError("CLOUDFLARE_ACCOUNT_ID no tiene la forma esperada")
    hoy = ahora.astimezone(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0)
    cuerpo = json.dumps({"query": CONSULTA_D1, "variables": {
        "cuenta": cuenta, "desde": (hoy - timedelta(hours=1)).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "hasta": (hoy + timedelta(days=1)).strftime("%Y-%m-%dT%H:%M:%SZ")}}).encode()
    peticion = urllib.request.Request(GRAPHQL, data=cuerpo, method="POST", headers={
        "Authorization": "Bearer " + token, "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(peticion, timeout=60) as respuesta:
            documento = json.load(respuesta)
        if documento.get("errors"):
            raise ValueError
        grupos = documento["data"]["viewer"]["accounts"][0]["d1AnalyticsAdaptiveGroups"]
    except (OSError, ValueError, KeyError, IndexError, TypeError):
        raise RuntimeError("No se pudo leer el uso de D1 (¿falta «Account Analytics: Read» en el token?)") from None
    horas: dict[str, int] = {}
    for grupo in grupos:
        hora = grupo["dimensions"]["datetimeHour"]
        horas[hora] = horas.get(hora, 0) + int(grupo["sum"]["rowsRead"])
    return horas


def estado_cupo_d1(horas: dict[str, int], ahora: datetime) -> tuple[bool, str, str]:
    """(activo, título, cuerpo) del aviso de cupo a partir de las lecturas por hora de hoy.

    El ritmo se mide en la hora de reloj actual y la anterior (UTC), no en las últimas
    horas con datos: un pico de hace horas no debe seguir avisando."""
    hora = ahora.astimezone(timezone.utc).replace(minute=0, second=0, microsecond=0)
    total = sum(v for h, v in horas.items() if h.startswith(hora.strftime("%Y-%m-%dT")))
    claves = [(hora - timedelta(hours=n)).strftime("%Y-%m-%dT%H:%M:%SZ") for n in (0, 1)]
    recientes = [horas.get(c, 0) for c in claves]
    pico = max(recientes, default=0)
    porcentaje = round(100 * total / CUPO_D1)
    activo = total >= AVISO_DIA * CUPO_D1 or pico >= AVISO_HORA
    titulo = f"D1: lecturas al {porcentaje // 10 * 10} % del cupo diario" if activo else ""
    cuerpo = (f"Filas leídas hoy (UTC): {total:,} de {CUPO_D1:,} ({porcentaje} %).\n"
              f"Máximo de las dos últimas horas: {pico:,} filas/h (aviso desde {AVISO_HORA:,}).\n\n"
              "Si se agota, staging da 500 hasta las 00:00 UTC. Buscar la consulta sin caché o el "
              "proceso (carga, explorador, QA) que la dispara.")
    return activo, titulo, cuerpo


def vigilar_cupo_d1(repositorio: str, horas: dict[str, int], ahora: datetime) -> None:
    activo, titulo, cuerpo = estado_cupo_d1(horas, ahora)
    print(f"D1: {cuerpo.splitlines()[0]}")
    reconciliar_issue(repositorio, "d1", activo, titulo, cuerpo,
                      "Lecturas de D1 por debajo del umbral de aviso.", comentar_siempre=False)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--d1", action="store_true", help="consultar D1 (usa D1_DATABASE_ID)")
    parser.add_argument("--staging", choices=("arriba", "caido"), required=True)
    args = parser.parse_args(argv)
    repositorio = os.environ.get("GITHUB_REPOSITORY", "")
    # Solo «dueño/repo»: nada que gh pueda leer como opción.
    if not re.fullmatch(r"[A-Za-z0-9][A-Za-z0-9-]*/[A-Za-z0-9._-]+", repositorio):
        print("::error::GITHUB_REPOSITORY falta o no tiene la forma dueño/repo.")
        return 1

    errores = []
    try:
        vigilar_staging(repositorio, args.staging)
    except RuntimeError as error:
        errores.append(str(error))

    if args.d1:
        try:
            configuracion = configuracion_d1(os.environ.get("D1_DATABASE_ID", "").strip().lower())
            try:
                vigilar_fabrica(repositorio, consultar_ids(configuracion))
            finally:
                Path(configuracion).unlink(missing_ok=True)
        except RuntimeError as error:
            errores.append(str(error))
        try:
            ahora = datetime.now(timezone.utc)
            horas = lecturas_d1(os.environ.get("CLOUDFLARE_API_TOKEN", ""),
                                os.environ.get("CLOUDFLARE_ACCOUNT_ID", "").strip(), ahora)
            vigilar_cupo_d1(repositorio, horas, ahora)
        except RuntimeError as error:
            errores.append(str(error))

    for error in errores:
        print(f"::error::{error}")
    return 1 if errores else 0


if __name__ == "__main__":
    sys.exit(main())

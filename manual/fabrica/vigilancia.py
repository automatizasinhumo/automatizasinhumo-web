"""Vigila las solicitudes sin vista previa y la disponibilidad de staging."""

import argparse
import json
import os
import re
import subprocess
import sys
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
    return None


def reconciliar_issue(repositorio: str, tipo: str, activo: bool, titulo: str, cuerpo: str, recuperado: str) -> None:
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
        if issue["title"] != titulo:
            ejecutar_gh("issue", "edit", numero, "--repo", repositorio, "--title", titulo)
        ejecutar_gh("issue", "comment", numero, "--repo", repositorio, "--body", cuerpo)
    elif accion == "cerrar":
        ejecutar_gh("issue", "close", str(issue["number"]), "--repo", repositorio, "--comment", recuperado)


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


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--config")
    parser.add_argument("--staging", choices=("arriba", "caido"), required=True)
    args = parser.parse_args(argv)
    repositorio = os.environ.get("GITHUB_REPOSITORY")
    if not repositorio:
        print("::error::Falta GITHUB_REPOSITORY para gestionar los avisos.")
        return 1

    errores = []
    try:
        vigilar_staging(repositorio, args.staging)
    except RuntimeError as error:
        errores.append(str(error))

    if args.config:
        try:
            vigilar_fabrica(repositorio, consultar_ids(args.config))
        except RuntimeError as error:
            errores.append(str(error))

    for error in errores:
        print(f"::error::{error}")
    return 1 if errores else 0


if __name__ == "__main__":
    sys.exit(main())

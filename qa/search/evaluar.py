"""Mide la relevancia del buscador con ir_measures (terrierteam, Apache-2.0).

Uso: python qa/search/evaluar.py busqueda.run
Juicios en qrels.txt: 2 = debe salir entre los 5 primeros, 1 = también vale.
Umbrales: nDCG@5 >= 0.85 y Recall@5 (solo relevancia 2) >= 0.90. Por debajo, sale con 1.
"""
import sys
from pathlib import Path

import ir_measures
from ir_measures import nDCG, R

DIR = Path(__file__).resolve().parent
UMBRALES = {nDCG @ 5: 0.85, R(rel=2) @ 5: 0.90}

run_path = Path(sys.argv[1] if len(sys.argv) > 1 else 'busqueda.run')
qrels = list(ir_measures.read_trec_qrels(str(DIR / 'qrels.txt')))
run = list(ir_measures.read_trec_run(str(run_path)))
consultas = dict(
    linea.split('\t', 1)
    for linea in (DIR / 'consultas.tsv').read_text(encoding='utf-8').splitlines()[1:]
    if linea
)

# Las consultas sin ningún resultado no aparecen en el run: cuentan como 0, no se ignoran.
medidas = list(UMBRALES)
por_consulta = {}
for m in ir_measures.iter_calc(medidas, qrels, run):
    por_consulta.setdefault(m.query_id, {})[m.measure] = m.value
totales = {m: sum(por_consulta.get(q, {}).get(m, 0.0) for q in consultas) / len(consultas) for m in medidas}

peores = sorted(consultas, key=lambda q: por_consulta.get(q, {}).get(nDCG @ 5, 0.0))
print('Consultas peor resueltas (nDCG@5, Recall@5):')
for q in peores[:15]:
    v = por_consulta.get(q, {})
    print(f'  {v.get(nDCG @ 5, 0.0):.2f} {v.get(R(rel=2) @ 5, 0.0):.2f}  {consultas[q]}')

fallo = False
for m, umbral in UMBRALES.items():
    ok = totales[m] >= umbral
    fallo |= not ok
    print(f'{"OK " if ok else "MAL"} {m}: {totales[m]:.3f} (mínimo {umbral})')
sys.exit(1 if fallo else 0)

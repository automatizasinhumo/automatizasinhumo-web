@echo off
rem Tarea programada "automatizasinhumo-vistas-previas" (cada 15 min): solicitudes nuevas -> vista previa publicada.
rem CI=1 y sin metricas: wrangler no debe preguntar nada (en la tarea programada nadie responde y se quedaba colgado).
set CI=1
set WRANGLER_SEND_METRICS=false
cd /d C:\GIT\automatizasinhumo
C:\GIT\automatizasinhumo-demos\.venv\Scripts\python.exe -X utf8 -u manual\fabrica\vistas-previas.py --max 3 >> "%TEMP%\vistas-previas.log" 2>&1

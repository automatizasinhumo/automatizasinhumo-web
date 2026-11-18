@echo off
rem Tarea programada "automatizasinhumo-vistas-previas" (cada 15 min): solicitudes nuevas -> vista previa publicada.
cd /d C:\GIT\automatizasinhumo
C:\GIT\automatizasinhumo-demos\.venv\Scripts\python.exe -X utf8 manual\fabrica\vistas-previas.py --max 3 >> "%TEMP%\vistas-previas.log" 2>&1

# Continuidad 18-11-2026 — organización y cierre

- **Cambios**: repo trasladado a `automatizasinhumo/automatizasinhumo-web`; CodeQL y secret scanning reactivados; Apps (CodeRabbit, SonarQube Cloud, Codex) en la organización; SonarCloud con organización propia.
- **Fusionadas**: #9, #11, #12, #13, #14, #16, #18.
- **Verificado**: fábrica en Actions (ejecución manual en verde, tarea local desactivada); soupsieve 4.0 instalado con `--require-hashes` y selectores de la fábrica probados; Verify de main en verde.
- **Fallos y decisiones**: CodeRabbit señaló en #17 que el informe de red de Harden-Runner es público y mostraría el host de cada vista previa; Harden-Runner retirado de ese workflow.
- **Pendiente**: #15 (C4, hilos de CodeRabbit para Copilot), #17, #19 (C2), proyecto viejo de SonarCloud.
- **Enlaces**: https://github.com/automatizasinhumo/automatizasinhumo-web/pulls · https://github.com/automatizasinhumo/automatizasinhumo-web/actions

# Issue #15 — Gate para beta con datos personales reales
Versión: borrador independiente v0.1 · 23 octubre 2026
Proyecto: Atlas Personal — Aplicación (separado de Atlas autobiográfico privado).
Propietario del alcance y aceptación: titular del producto. Autoría documental: ChatGPT.
ESTADO: requisitos por evaluar; NO AUTORIZA recopilar testimonios personales, lanzar beta ni efectuar tratamiento de datos sensibles.

## Objetivo
Definir los controles exigibles ANTES de almacenar o procesar historias reales, incorporar modelos generativos, dictado remoto o compartir información con profesionales. Que exista un prototipo de UX no demuestra que exista un sistema seguro.

## Gate SEC — arquitectura y ciberseguridad
- SEC-01: Decidir local-first, nube o híbrido con diagrama de flujo de datos y responsables por tratamiento.
- SEC-02: Modelo de amenazas: dispositivo compartido, robo, XSS, enlaces, respaldo, exportaciones, proveedores, acceso administrativo e incidentes.
- SEC-03: Autenticación y autorización por recurso con pruebas de separación de usuarios y principio de mínimo privilegio.
- SEC-04: Cifrado en tránsito y en reposo, gestión de claves, recuperación, revocación, rotación y borrado verificable.
- SEC-05: Minimización, retención, eliminación, exportación portable y respaldo, incluyendo subprocesadores.
- SEC-06: Pruebas de seguridad (dependencias, vulnerabilidades web, registro de acceso, secretos, controles antiabuso); revisión independiente según riesgo.
- SEC-07: Procedimiento de reporte, respuesta a incidentes, responsables y comunicación de brechas.

## Gate PRIV — cumplimiento en México
- PRIV-01: Revisión jurídica conforme a LFPDPPP vigente, responsable/encargados, finalidades, transferencias, derechos ARCO y mecanismos de consentimiento aplicables a datos sensibles.
- PRIV-02: Avisos comprensibles en interfaz, consentimiento específico para voz, IA, nube, compartir y almacenamiento. Evitar consentimiento único ambiguo.
- PRIV-03: Contratos y revisión de retención/entrenamiento en proveedores de IA o transcripción; no prometer «sin entrenamiento» sin respaldo contractual.
- PRIV-04: Analizar cuándo NOM-004-SSA3-2012 sería aplicable según prestación efectiva de servicios médicos; no extrapolarla al diario personal automáticamente.
- PRIV-05: Evaluar afirmaciones publicitarias y clasificación regulatoria pertinente según funcionalidades implementadas y posicionamiento real; no asumir por diseño que COFEPRIS deja de ser relevante.
- PRIV-06: Definir atención de solicitudes de titulares, bitácora de cambios y mecanismo verificable de supresión.

## Gate PSY — seguridad psicológica y ética
- PSY-01: Mantener producto como diario no clínico sin diagnósticos, terapia automatizada ni evaluación de crisis como triaje.
- PSY-02: Conservación de relatos originales [T] y procedencia [D]; [H]/[I]/[P] optativos, con atribución y revisión; no inventar memorias, terceros ni causalidad.
- PSY-03: Control para pausar, omitir, ocultar recuerdos, elegir profundidad y terminar sin coerción.
- PSY-04: Guía humana apropiada en emergencias sin promesa de vigilancia; validación profesional de microcopy y rutas de apoyo.
- PSY-05: Pruebas ante respuestas sugestivas, sobrevalidación, dependencia, falsa certeza y lenguaje cultural mexicano.
- PSY-06: Si hay pruebas con personas: consentimiento informado, selección y uso justificados, medidas de eventos adversos, proceso de escalamiento y revisión ética si corresponde.

## Gate IA/VOZ — funciones optativas futuras
- IA-01: Recuperación basada en fuentes con evaluación de citas y respuestas «no hay evidencia».
- IA-02: Separación estricta entre consulta factual, preguntas reflexivas y análisis; controles on/off granulares.
- IA-03: Evaluaciones reproducibles antes de habilitar proveedor: fugas, inyección de instrucciones, confabulaciones, alucinaciones y español mexicano.
- VOZ-01: Documentar si captura/transcripción se ejecuta local o remotamente y qué ocurre con audios, temporales y logs.
- VOZ-02: No activar micrófono sin permiso explícito; revisión humana de transcripción antes de guardar.
- SHARE-01: Vista previa exacta y selección vacía por defecto, autenticación, autorización, caducidad, revocación de acceso futuro y constancia de que copias ya exportadas no pueden recuperarse.

## Evidencia verificable para aprobar el gate
Se exige: (1) arquitectura, diagrama de datos y modelado de amenazas; (2) políticas y contratos revisados; (3) reportes de QA y pruebas técnicas; (4) evaluación de riesgo psicológico y protocolo de incidentes; (5) aprobación expresa del titular y revisores pertinentes. Cada aprobación debe vincular fecha, evidencia y responsable.

## No implementar todavía
No instalar bases de datos con historias reales, no integrar modelos que vean testimonios auténticos, no activar reconocimiento de voz externo, no generar accesos a terapeutas, no probar con pacientes ni anunciar eficacia terapéutica como resultado del prototipo.

## Dependencias y alcance
Bloqueado hasta concluir QA de #13 y #14 y una revisión interdisciplinaria independiente. El issue #15 es DOCUMENTAL y constituye gate hacia un producto futuro, no una tarea para completar Sprint C mediante código.
Fuentes: Especificación UX y Seguridad v0.6 https://docs.google.com/document/d/1iESOxJfURC7XbgsPboNBhnn0Wn4Z6lbA2aCA_GgS8ik/edit ; Marco de auditoría y seguridad v0.2 https://docs.google.com/document/d/1xjOkM50OO_lf6DysamNyYM2e6gFlj5qYpA5t_UY9nwY/edit .

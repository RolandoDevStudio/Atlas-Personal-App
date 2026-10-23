# Sprint C v0.6 — Checklist QA (issues #13 y #14)

Fecha: 2026-10-23. Estado: pendiente de pruebas funcionales y visuales. Prototipo solo con datos ficticios.

## #13 — Dictado ilustrativo
- [ ] En «Solo registrar» el botón «Insertar transcripción ficticia» muestra un ejemplo inventado, sin pedir permisos de micrófono.
- [ ] El texto se puede revisar y editar antes de confirmar [T].
- [ ] «Limpiar ejemplo» vacía el texto; cancelar no lo guarda.
- [ ] Si ya existe texto y se intenta sustituir, pide confirmación.
- [ ] Todos los avisos indican que no hay grabación ni transcripción real.
- [ ] No se ejecutan APIs SpeechRecognition/mediaDevices ni llamadas de red por esta función.
- [ ] Sin soporte de micrófono el modo escrito funciona igual.

## #14 — PWA, planes, accesibilidad
- [ ] En navegador sin evento beforeinstallprompt no aparece un botón «Instalar» inerte.
- [ ] Con evento real de instalación disponible se muestra el CTA, «Ahora no» lo oculta en la sesión.
- [ ] PWA instalada no muestra sugerencia de instalación.
- [ ] El service worker guarda solo recursos de la interfaz, no datos personales o requests externos.
- [ ] Probar actualización de caché desde versiones previas; `sprint-b.js/css` y `sprint-c.js/css` funcionan sin conexión tras carga correcta.
- [ ] La sección Planes indica claramente que no procesa pagos ni activa características clínicas.
- [ ] Dispositivos de 320/375/768 px sin superposición; toda navegación funciona con teclado, lector de pantalla y zoom.
- [ ] Preferencia reduced-motion no provoca animaciones llamativas ni saltos innecesarios.
- [ ] Probar regresiones de Sprints A y B: bienvenida, pausa, diario, línea de vida, fuentes, mapa y búsqueda.
- [ ] Comprobar accesibilidad: foco, asociación label/campo, Escape, anuncios de estado y contraste.

## Nota metodológica
El parseo de JavaScript o estado success de Vercel confirma, como máximo, condiciones técnicas limitadas, no validación E2E ni evaluación de seguridad. No marcar issues como completados hasta QA manual.

## Exclusiones
Sin transcripción real, IA generativa, backend, sesiones de usuario, datos sensibles, pagos, acceso real de terapeutas o despliegue de producción. El issue #15 sigue como documento separado: `docs/issue-15-gate-beta-real-data.md`.

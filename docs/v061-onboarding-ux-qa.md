# Atlas Personal v0.6.1 — Claridad de introducción y onboarding

Fecha: 23 de octubre de 2026. Autoría: ChatGPT, propuesta de UX de producto. Alcance: demostración ficticia, sin datos personales reales.

## Problema observado
Un visitante nuevo no comprende de inmediato qué es la aplicación, qué puede hacer y cómo empezar. El prototipo anterior mostraba contenidos avanzados, métricas y varios módulos antes de explicar la propuesta de valor.

## Hipótesis UX
Priorizar claridad sobre completitud en el primer contacto: hero «qué es», cuatro acciones simples, CTA primario único para recorrido, caminos alternativos y acceso al panel avanzado sin perder funciones.

## Implementación
1. Home predeterminada con propuesta de valor descriptiva: registrar experiencias, organizar recuerdos y recuperar las fuentes originales.
2. Cuatro tarjetas de capacidades (escribir, cronología, conexiones, buscar) con acciones hacia módulos reales.
3. Guía de cuatro pasos con progreso, anterior/siguiente, saltar y retorno a sección de ejemplo.
4. El aviso de seguridad de Sprint A se conserva: la guía aparece después, nunca lo sustituye. La guía solo se muestra automáticamente una vez por sesión; se puede volver a abrir desde Inicio.
5. Ruta directa a historia ficticia, registro de ejemplo y panel avanzado previo; este último no se elimina.
6. Estado e interacción de la guía gestionados en el navegador; no se envía información ni se solicita una cuenta.
7. Mejoras responsive, foco del wizard y reducción de animaciones.
8. Actualización del service worker para incluir los archivos de v0.6.1.

## Validación técnica ya realizada
- [x] Parseo sintáctico de los nuevos scripts.
- [x] Archivos JS/CSS enlazados desde index.html.
- [x] Caché versionada actualizada para los nuevos recursos.
- [ ] Pruebas reales en navegador, incluyendo primera visita y reentrada.
- [ ] Validación de comprensión con personas ajenas al proyecto.

## Checklist QA
- [ ] Primera visita: aparece primero el aviso original de demo y seguridad; al cerrarlo aparece la guía.
- [ ] Avanzar/retroceder cuatro pasos y verificar progreso.
- [ ] Saltar guía y acceder a la home, sin bloquear navegación.
- [ ] Terminar la guía y llegar a la línea de vida de ejemplo.
- [ ] Volver a abrir guía desde Inicio después de saltarla.
- [ ] Confirmar que no se repite automáticamente en la misma sesión.
- [ ] «Explorar historia», «Probar registro» y las cuatro tarjetas llevan a pantallas existentes.
- [ ] «Panel avanzado» recupera las gráficas y controles previos; «Volver» muestra intro.
- [ ] Confirmar que la guía no oculta permanentemente Diario, Mapa, Ayuda, Planes, Privacidad o funciones del Sprint B/C.
- [ ] Teclado: foco dentro del diálogo, Shift+Tab/Tab, Escape, foco restaurado; lector de pantalla reconoce título y contenido.
- [ ] Prueba responsive 320px/375px/768px/escritorio con zoom 200%, contraste y reduced-motion.
- [ ] Prueba actualización offline y caché con versión anterior instalada.
- [ ] Prueba con 3–5 visitantes: «¿Qué es Atlas? ¿Qué puedes hacer? ¿Cuál es el primer paso?» sin explicarles nada. Objetivo orientativo, no validación científica: responder correctamente en menos de 30 segundos sin ayuda.

## Fuera de alcance
Sin cuentas, datos biográficos reales, almacenamiento seguro, análisis clínico, IA real, modificaciones al Atlas privado, suscripciones efectivas ni despliegue a producción.

## Fuente
Especificación v0.6: https://docs.google.com/document/d/1iESOxJfURC7XbgsPboNBhnn0Wn4Z6lbA2aCA_GgS8ik/edit
Issues del sprint A–C previos: https://github.com/RolandoDevStudio/Atlas-Personal-App/issues

# Atlas Personal v0.6 — Sprint A (P0)

## Objetivo
Conservar exclusivamente la demostración ficticia y explicar con precisión lo que el prototipo puede o no puede hacer. Este sprint no implementa sistemas clínicos, IA generativa, cuentas, cifrado ni accesos profesionales.

## Alcance implementado
- Issues #1, #2: bienvenida de demo, aviso constante, límites y estado real de las funcionalidades.
- Issue #3: modo de captura escrito «Solo registrar», consentimiento contextual de no ingresar datos privados, revisión editable sin generación de hipótesis ni dictado automático.
- Issue #4: pausa, reanudación voluntaria y opción terminar por hoy dentro de la búsqueda simulada.
- Issue #5: selección granular ficticia y vista previa sin emisión de código, token o enlace de acceso.
- Issue #6: ajustes de avisos, rótulos v0.6 y supresión de CTA de instalación inerte en navegadores que no soporten el evento.

## Verificaciones automatizadas efectuadas durante el cambio
- Verificada la estructura HTML como un único bloque script y cierre equilibrado.
- Parseo JavaScript con V8: satisfactorio.
- Verificadas por inspección las secciones nuevas y el control de que los datos de la sesión no se exportan a servicios externos desde la vista previa.

## Pruebas manuales aún requeridas antes de aprobar el PR
- [ ] Primera visita (pestaña nueva): aparece bienvenida, permite conocer límites y salir a demo.
- [ ] Segunda entrada en la misma sesión: bienvenida no aparece repetidamente; enlace «Cómo funciona» sigue disponible.
- [ ] Inicio + Privacidad: avisos de datos ficticios y almacenamiento no persistente visibles.
- [ ] Diario: entrada ficticia de más de 12 caracteres, editar antes de confirmar, registrar [T] sin generación de análisis y comprobar temporalidad al recargar.
- [ ] Diario: dejar vacío, cancelar, navegar de regreso sin guardar ni sugerir causas psicológicas.
- [ ] Explorar: botón de pausa detiene sugerencias; reanudar y terminar por hoy funcionan.
- [ ] Apoyo profesional: ningún registro preseleccionado; elegir dos y ver exactamente esos dos; salir sin «compartir».
- [ ] Apoyo profesional: no existe un código, token o vínculo operativo ni promesa de revocación.
- [ ] Navegación: revisar Inicio, Diario, Mi vida, Mapa, Explorar, Apoyo profesional, Integraciones, Planes y Privacidad.
- [ ] Responsive 320px, 375px, 768px y escritorio: sin superposiciones de modal, footer o navegación.
- [ ] Keyboard: tabulación, foco visible, cierre de modales con Escape, lectura de las advertencias.
- [ ] Accesibilidad: lector de pantalla, roles y títulos, contraste y reduced-motion.
- [ ] Sin conexión y al recargar: no se deben prometer respaldos ni guardado permanente.

## Limitaciones conocidas
1. No se ha ejecutado suite de pruebas E2E real en navegador desde el conector. El parseo del JS no certifica la experiencia visual ni la ausencia de fallos de interacción.
2. El proyecto conserva funciones de ejemplo previas a este sprint que deben revisarse en QA; el Sprint A no es garantía de privacidad ni de seguridad clínica.
3. Si el sitio se sirve desde un origen que carga contenido de otros proveedores (como analítica o service workers), hace falta una revisión específica de la red antes de probar con datos reales.
4. Continúan pendientes la auditoría legal mexicana, controles de acceso, autenticación, cifrado y protocolos de incidentes antes de cualquier beta con historias reales.

## Fuentes y control
Especificación UX y Seguridad v0.6: https://docs.google.com/document/d/1iESOxJfURC7XbgsPboNBhnn0Wn4Z6lbA2aCA_GgS8ik/edit
Issues #1 a #6: https://github.com/RolandoDevStudio/Atlas-Personal-App/issues
Rama: feat/atlas-v06-sprint-a. No fusionar automáticamente a main ni desplegar producción.

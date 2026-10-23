# Atlas Personal — Sprint B v0.6: evidencia y exploración ficticia

**Alcance:** issues #7–#12 · rama `feat/atlas-v06-sprint-b` · Sin datos reales ni IA conectada.

## Componentes incluidos
- **#7** Registro original [T] con fuente, metadatos [D] y nuevas perspectivas [I] que se guardan aparte, con fecha/autoria de demo, sin reescribir [T]. Nota: fuentes históricas preexistentes pueden carecer de fecha de captura; se muestra «No documentada».
- **#8** Línea de vida filtrable por año, categoría y texto. Ocultación por registro reversible, con botón para mostrar ocultos, manteniendo testimonio y procedencia.
- **#9** Mapa de temas con lista textual alternativa y enlaces a registros de sustento. Ocultar/restaurar conexiones sugeridas sin borrar los registros originales.
- **#10** Consultas simuladas con coincidencias textuales locales y referencias [T]. Cuando no hay coincidencias, declara la insuficiencia; no inventa recuerdos, patrones ni causas.
- **#11** Gráficas optativas, apagadas de inicio, y tabla con conteos descriptivos por áreas. El diario y los CTA permanecen funcionales con las gráficas ocultas.
- **#12** Mejoras de accesibilidad incremental: botones con semántica, roles y etiquetas, vista de lista del mapa, tabla textual, foco al abrir registro como pendiente de validación manual.

## Validación realizada
- [x] Código JavaScript nuevo validado sintácticamente mediante motor JavaScript.
- [x] Archivo HTML incorpora referencias a `sprint-b.js` y `sprint-b.css`.
- [x] Cambios aislados en archivos separados y sin modificaciones a datos reales.
- [ ] Navegación visual en navegadores Android, iOS y escritorio.
- [ ] Pruebas E2E con fixtures ficticios; revisión de regresiones Sprint A.
- [ ] Lectores de pantalla y navegación de teclado completa.
- [ ] Probar relectura, filtros, ocultación/reaparición, cancelación y reanudación de pausa.
- [ ] Comprobar resultados del buscador frente a términos con y sin acentos y sin coincidencias.
- [ ] Contraste/responsive a 320, 375, 768px y escritorio.
- [ ] Revisar service worker de demo: puede requerirse invalidación de caché para versiones nuevas.

## Guion de pruebas
1. Abrir pantalla de ejemplo; confirmar bienvenida y veracidad de privacidad Sprint A.
2. Crear relato ficticio [T] y abrirlo en Mi vida; añadir nota posterior [I]. Verificar que [T] conserva texto exacto.
3. Ocultar un relato de la línea de vida, mostrar ocultos y revertir ocultación.
4. Buscar término con resultados y sin resultados; abrir cada cita [T].
5. Abrir mapa, alternar a lista, abrir fuente de nodo, ocultar y restaurar conexión.
6. Mostrar/ocultar gráficas: ninguna acción de diario o navegación debe desaparecer.
7. Ejecutar experiencia con teclado, Escape, lector de pantalla, zoom y reduced-motion.
8. Recargar página: estado temporal se pierde, sin prometer persistencia.

## Limitaciones y decisiones pendientes
- La anotación posterior es temporal y solo opera con datos ficticios de la página actual.
- El mapa sigue usando un conjunto ilustrativo de nodos predefinidos; la lista muestra la evidencia asociada a esa demostración, no un motor automático de relaciones.
- La búsqueda es por coincidencia literal de palabras, no extracción semántica ni IA generativa. Algunas consultas conceptuales pueden no localizar testimonios válidos.
- Los conteos descriptivos se basan en datos demo. No representan una medición de bienestar o eficacia.
- Seguridad clínica, cifrado, autenticación, almacenamiento, compartir real e integración con profesionales quedan fuera del Sprint B.
- Un parseo sintáctico y un check de Vercel no sustituyen pruebas funcionales de navegador.

## Control
Fuente: [Especificación UX y Seguridad v0.6](https://docs.google.com/document/d/1iESOxJfURC7XbgsPboNBhnn0Wn4Z6lbA2aCA_GgS8ik/edit).
Autoría: ChatGPT, 23 de octubre de 2026. Pull Request previsto en borrador, sin merge ni despliegue de producción autorizados.

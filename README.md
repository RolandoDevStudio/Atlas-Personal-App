# Proyecto Atlas Personal — Aplicación

**Estado:** Prototipo interactivo de concepto, versión 0.1  
**Fecha:** 22 de octubre de 2026  
**Proyecto:** Comercial / investigación de producto, separado del Atlas Personal de Autoconocimiento privado.

## Propósito

Crear una plataforma visual e interactiva de memoria autobiográfica y autoconocimiento. Su objetivo es conservar registros, ordenar una línea de vida, visualizar relaciones temáticas respaldadas en entradas originales y permitir preguntas en lenguaje natural sobre información propia. No debe reemplazar psicoterapia ni emitir diagnósticos.

## Prototipo

Archivo `index.html`. Abrirlo en un navegador moderno sin instalación ni conexión a Internet. Funciona en ordenador y móvil. La interfaz incluye:

- Inicio con resumen de la historia, registros recientes y una coincidencia temática.
- Línea de vida filtrable por áreas, con acceso a testimonios completos y fuentes.
- Mapa visual de temas conectados que muestra evidencia asociada al seleccionar nodos.
- Conversación de ejemplo («Pregúntale a tu Atlas») con respuestas predefinidas y referencias clicables a registros.
- Áreas de vida y pantalla demostrativa sobre privacidad.
- Adición temporal de entradas ficticias durante la sesión y exportación a JSON de demostración.

## Límites deliberados

- Los datos precargados son **completamente ficticios**; no se usa el Atlas autobiográfico del titular ni información de terceros reales.
- No existe IA real ni búsqueda semántica; los resultados conversacionales proceden de reglas locales limitadas.
- No existe base de datos, servidor, registro de usuarios, permisos reales, cifrado especializado, control de acceso ni soporte clínico.
- Los registros creados desde la interfaz permanecen solo en memoria y desaparecen al recargar la página.
- No se deben introducir datos reales, personales o sensibles en este prototipo.
- Las relaciones mostradas son coincidencias y asociaciones descriptivas, no inferencias causales.

## Reglas de producto a preservar

1. Separar testimonio [T], documento [D], hipótesis [H], interpretación [I] y pregunta abierta [P].
2. Conservar texto original, fecha, procedencia, historial de rectificaciones y grado de certeza temporal.
3. Mostrar evidencia y explicaciones alternativas; ninguna IA fija la historia definitiva del usuario.
4. Análisis/hipótesis solo a petición expresa, con revisión humana y sin diagnóstico.
5. La persona controla qué material se comparte. Vista privada distinta de vista para profesional.
6. Diseñar privacidad y minimización de datos antes de permitir almacenar experiencias reales.
7. Evitar preguntas sugestivas, reconstrucción de «recuerdos reprimidos» y exploración que intensifique rumiación.

## Siguiente fase sugerida

Validación con pruebas de usabilidad sobre datos de prueba. Después, propuesta de arquitectura de seguridad, modelo de datos con procedencia de registros, evaluación de riesgos, revisión legal mexicana y desarrollo de MVP bajo infraestructura controlada. Separar este trabajo del proyecto de autoconocimiento privado.
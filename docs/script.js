// Version Data
const versions = [
    {
        version: "1.0",
        series: 1,
        type: "major",
        description: "Refactorización Final para GitHub y Deploy - Versión Inicial",
        features: [
            "Unificación de componentes",
            "Corrección de sintaxis JSX (class → className)",
            "Configuración Vite para producción",
            "Preparación para GitHub Pages"
        ]
    },
    {
        version: "2.0",
        series: 2,
        type: "major",
        description: "Interactividad y Persistencia - Estructura mejorada",
        features: [
            "Introducción de LocalStorage para guardar datos",
            "Modales de edición implementados",
            "Lógica CRUD básica para tareas",
            "Base para funcionalidad avanzada"
        ]
    },
    {
        version: "2.1",
        series: 2,
        type: "minor",
        description: "Iconografía Profesional - UI moderna",
        features: [
            "Migración a librería Lucide React",
            "Iconos modernos y consistentes",
            "Interfaz visual mejorada",
            "Sistema de iconos escalable"
        ]
    },
    {
        version: "2.2",
        series: 2,
        type: "minor",
        description: "Profundidad de Tareas - Funcionalidades expandidas",
        features: [
            "Sistema de subtareas (checklists)",
            "Comentarios simulados en tarjetas",
            "Barra de filtrado implementada",
            "Mayor profundidad en gestión de tareas"
        ]
    },
    {
        version: "2.3",
        series: 2,
        type: "minor",
        description: "UX y Modo Oscuro - Experiencia mejorada",
        features: [
            "Soporte completo para Dark Mode",
            "Panel lateral de historial de actividad",
            "Feedback visual mejorado",
            "Mejor experiencia de usuario general"
        ]
    },
    {
        version: "2.4",
        series: 2,
        type: "minor",
        description: "Transformación a Trello UI - Diseño profesional",
        features: [
            "Rediseño total de interfaz estilo Trello",
            "Fondos de imagen completa",
            "Listas con diseño Trello auténtico",
            "Header transparente y moderno"
        ]
    },
    {
        version: "2.5",
        series: 2,
        type: "minor",
        description: "Funcionalidades 'Real Feel' - Interacción natural",
        features: [
            "Creación rápida de tareas en línea",
            "Menús de gestión de columnas funcionales",
            "Corrección de bugs de iconos",
            "Experiencia más fluida y natural"
        ]
    },
    {
        version: "2.6",
        series: 2,
        type: "minor",
        description: "Header y Navegación - Barra funcional",
        features: [
            "Menús desplegables funcionales en header",
            "Búsqueda global conectada al tablero",
            "Selector de fondos implementado",
            "Navegación completa y funcional"
        ]
    },
    {
        version: "2.7",
        series: 2,
        type: "minor",
        description: "Drag & Drop Avanzado - Reordenamiento completo",
        features: [
            "Reordenamiento de columnas horizontal",
            "Edición inline de títulos de listas",
            "Drag & Drop mejorado y fluido",
            "Interacción avanzada con elementos"
        ]
    },
    {
        version: "2.8",
        series: 2,
        type: "minor",
        description: "Mejoras continuas en la base de código",
        features: [
            "Refactorización parcial",
            "Mejoras de rendimiento",
            "Correcciones de bugs"
        ]
    },
    {
        version: "2.9",
        series: 2,
        type: "minor",
        description: "Diseño Responsivo - Multiplataforma adaptativo",
        features: [
            "Adaptación Mobile-First completa",
            "Menú hamburguesa para dispositivos móviles",
            "Modales full-screen en pantallas pequeñas",
            "Soporte para todo tipo de resoluciones"
        ]
    },
    {
        version: "3.0",
        series: 3,
        type: "major",
        description: "Lógica de Creación - Botón crear funcional",
        features: [
            "Funcionalidad real para botón 'Crear'",
            "Popover para nuevos tableros",
            "Acceso directo a nueva tarea",
            "Sistema de creación implementado"
        ]
    },
    {
        version: "3.1",
        series: 3,
        type: "minor",
        description: "Arquitectura Multi-Tablero - Navegación entre tableros",
        features: [
            "Estructura de datos para múltiples tableros",
            "Navegación entre tableros desde menú 'Reciente'",
            "Sistema de gestión de tableros",
            "Acceso y creación de tableros completo"
        ]
    },
    {
        version: "3.2",
        series: 3,
        type: "minor",
        description: "Vista de Calendario - Visualización por fechas",
        features: [
            "Nueva vista de calendario implementada",
            "Visualización de tareas por fecha de vencimiento",
            "Navegación temporal de tareas",
            "Vista alternativa de organización"
        ]
    },
    {
        version: "3.3",
        series: 3,
        type: "minor",
        description: "Estabilización Final - Correcciones antes de v4.0",
        features: [
            "Corrección de errores de referencia (INITIAL_COLUMNS)",
            "Estabilización de lógica de creación de fondos",
            "Modal de edición mejorado",
            "DnD con @dnd-kit completamente estable"
        ]
    },
    {
        version: "4.0",
        series: 4,
        type: "major",
        description: "Inicio del Full Trello Clone - Arquitectura modular profesional",
        features: [
            "Estructura de carpetas profesional",
            "Separación en componentes modulares",
            "Implementación de React Router (HashRouter)",
            "Sistema de contexto mejorado (BoardContext)",
            "Configuración para GitHub Pages"
        ]
    },
    {
        version: "4.1",
        series: 4,
        type: "minor",
        description: "Implementación de sidebar navegable",
        features: [
            "Sidebar colapsable estilo Trello",
            "Navegación entre tableros",
            "Lista de tableros favoritos/recientes",
            "Mejoras en la navegación"
        ]
    },
    {
        version: "4.2",
        series: 4,
        type: "minor",
        description: "Gestión avanzada de listas",
        features: [
            "Menú contextual en listas",
            "Opciones: Copiar, mover, archivar lista",
            "Mejor UX en la gestión de columnas"
        ]
    },
    {
        version: "4.3",
        series: 4,
        type: "minor",
        description: "Modal de tarjeta enriquecido",
        features: [
            "Sistema de adjuntos simulado",
            "Drag & drop de archivos",
            "Vista previa de adjuntos"
        ]
    },
    {
        version: "4.4",
        series: 4,
        type: "minor",
        description: "Sistema de fechas completo",
        features: [
            "Selector de fechas (Start/Due Date)",
            "Indicadores visuales de estado",
            "Alertas de vencimiento",
            "Checkbox de completado"
        ]
    },
    {
        version: "4.5",
        series: 4,
        type: "minor",
        description: "Log de actividad implementado",
        features: [
            "Registro de actividades en tarjetas",
            "Historial de movimientos",
            "Registro de cambios",
            "Vista temporal de acciones"
        ]
    },
    {
        version: "4.6",
        series: 4,
        type: "minor",
        description: "Sistema de etiquetas mejorado",
        features: [
            "Editor de etiquetas colorido",
            "Nombres editables por etiqueta",
            "Paleta de colores clásica de Trello",
            "Gestión completa de labels"
        ]
    },
    {
        version: "4.7",
        series: 4,
        type: "minor",
        description: "Mejoras estéticas adicionales",
        features: [
            "Input semitransparente para listas",
            "Cover images optimizadas",
            "Mejoras en la visualización",
            "Refinamientos de diseño"
        ]
    },
    {
        version: "4.8",
        series: 4,
        type: "minor",
        description: "Optimizaciones de configuración",
        features: [
            "Vite config optimizado",
            "Corrección de rutas relativas",
            "Preparación para deploy",
            "Mejoras en build process"
        ]
    },
    {
        version: "4.9",
        series: 4,
        type: "minor",
        description: "Refinamiento de características Pro",
        features: [
            "Consolidación de features avanzadas",
            "Mejoras en rendimiento",
            "Correcciones de bugs",
            "Optimización general"
        ]
    },
    {
        version: "4.10",
        series: 4,
        type: "minor",
        description: "Versión final de la serie 4.x con todas las features Pro",
        features: [
            "Funcionalidades completas de Trello",
            "Código estable y optimizado",
            "Preparación para v5.0",
            "Testing y correcciones finales"
        ]
    },
    {
        version: "5.0",
        series: 5,
        type: "major",
        description: "Revisión completa de UX y nuevas características",
        features: [
            "Nueva arquitectura de componentes",
            "Mejoras significativas en UX",
            "Animaciones refinadas",
            "Performance optimizations"
        ]
    },
    {
        version: "5.1",
        series: 5,
        type: "minor",
        description: "Implementación de características adicionales",
        features: [
            "Nuevas funcionalidades de usuario",
            "Mejoras en la personalización",
            "Correcciones y optimizaciones"
        ]
    },
    {
        version: "5.2",
        series: 5,
        type: "minor",
        description: "Mejoras en la arquitectura existente",
        features: [
            "Refactorización de componentes",
            "Mejor gestión de estado",
            "Optimizaciones de rendimiento"
        ]
    },
    {
        version: "5.3",
        series: 5,
        type: "minor",
        description: "Consolidación y estabilización",
        features: [
            "Corrección de bugs críticos",
            "Mejoras en la estabilidad",
            "Optimización del código base"
        ]
    },
    {
        version: "5.3.1",
        series: 5,
        type: "patch",
        description: "Correcciones menores",
        features: [
            "Hotfixes aplicados",
            "Correcciones de UI",
            "Pequeñas optimizaciones"
        ]
    },
    {
        version: "5.3.3",
        series: 5,
        type: "patch",
        description: "Última versión antes de la refactorización final",
        features: [
            "Código estable y funcional",
            "Todas las características implementadas",
            "Preparación para v6.0",
            "Listo para refactorización de producción"
        ]
    },
    {
        version: "6.0",
        series: 6,
        type: "major",
        description: "The Production Refactor - Arquitectura modular lista para producción",
        features: [
            "Refactorización completa del monolito",
            "Separación de tipos (types/index.ts)",
            "Context Store modular (StoreContext.tsx)",
            "React Router con rutas reales",
            "Scrollbars personalizadas estilo Trello",
            "Tipografía optimizada del sistema",
            "Micro-interacciones en tarjetas",
            "Edición in-place de títulos",
            "Textareas con autosize"
        ]
    },
    {
        version: "6.1",
        series: 6,
        type: "minor",
        description: "Versión final pulida antes de migrar a Antigravity",
        features: [
            "Refinamiento del Trello Polish",
            "Rotación de tarjetas al arrastrar",
            "Hover effects mejorados",
            "Optimización final de componentes",
            "Código production-ready",
            "Preparación para siguiente fase de desarrollo"
        ]
    },
    {
        version: "7.0",
        series: 7,
        type: "major",
        description: "Migración a Zustand con Antigravity - Arquitectura moderna de estado",
        features: [
            "Refactorización de Context API a Zustand",
            "Separación modular: types.ts, store.ts, App.tsx",
            "Persistencia mejorada con Zustand",
            "Mejor rendimiento y  gestión de estado",
            "Desarrollo asistido por Antigravity",
            "Arquitectura escalable y mantenible"
        ]
    },
    {
        version: "7.1",
        series: 7,
        type: "minor",
        description: "Implementación de Calendar View - Vista de calendario completa",
        features: [
            "Componente CalendarView funcional",
            "Visualización de tareas por fecha de vencimiento",
            "Navegación entre meses (anterior, siguiente, hoy)",
            "Click en tareas para abrir modal de detalles",
            "Integración en UI principal",
            "Desarrollo colaborativo con Antigravity"
        ]
    },
    {
        version: "7.2",
        series: 7,
        type: "minor",
        description: "Debugging y personalización de tarjetas - Funcionalidades avanzadas",
        features: [
            "Corrección de botones del Task Modal",
            "Integración del CustomLabelEditor",
            "Botón de Etiquetas completamente funcional",
            "Sistema de etiquetas personalizables",
            "Mejoras en la gestión de portadas",
            "Depuración asistida por Antigravity"
        ]
    },
    {
        version: "7.3",
        series: 7,
        type: "minor",
        description: "Versión actual en producción - Estado estable y pulido",
        features: [
            "Todas las características verificadas y funcionales",
            "Sistema de login completamente operativo",
            "Interfaz pulida y sin errores",
            "Rendimiento optimizado",
            "Código listo para producción",
            "Documentación completa creada"
        ]
    },
    {
        version: "7.4",
        series: 7,
        type: "patch",
        description: "Corrección: Funcionalidad de Añadir Lista - Restauración de la función para crear nuevas listas en el tablero",
        features: [
            "Implementación completa de 'Añadir otra lista'",
            "Estado local para controlar UI de creación (isAddingList, newListTitle)",
            "Handler handleAddList() que crea columnas con ID único",
            "Input controlado con validación de contenido",
            "Soporte para teclas Enter (crear) y Escape (cancelar)",
            "Botones de confirmación y cancelación",
            "Toast de confirmación al crear nueva lista",
            "UI interactiva que alterna entre botón y formulario"
        ]
    }
];

// Prompts Data
const prompts = [
    {
        id: 1,
        title: "v1.0 - Prompt Inicial: Refactorización para GitHub",
        badge: "Gemini",
        subtitle: "Preparación para deployment y correcciones sintácticas",
        description: "Primer prompt estructurado para optimizar la aplicación para GitHub Pages, corrigiendo sintaxis React y configurando Vite.",
        content: `Refactorización Final para GitHub y Deploy

"Corregir vite.config.ts... Refactorizar ProjectBoard.tsx (Drag & Drop)... Revisión Global de Sintaxis React (className)..."

Resultado: Se unificaron los componentes, se corrigió la sintaxis JSX y se configuró Vite para despliegue en producción.`
    },
    {
        id: 2,
        title: "v2.0 - Interactividad y Persistencia",
        badge: "Gemini",
        subtitle: "Estructura mejorada con almacenamiento local",
        description: "Introducción de funcionalidades básicas de persistencia y edición.",
        content: `"ahora que tenemos la estructura, vamos a mejorar la aplicacion porque es muy basica de momento, por cada version se generara un archivo nuevo para no sobrecargar el contexto"

Implementación: Se introdujo LocalStorage para guardar datos, se añadieron modales de edición y lógica CRUD básica para tareas.`
    },
    {
        id: 3,
        title: "v2.1 - Iconografía Profesional",
        badge: "Gemini",
        subtitle: "Migración a Lucide React",
        description: "Actualización del sistema de iconos para una interfaz más moderna.",
        content: `"añade iconos acorde a la aplicacion, y avanza de version a la 2.1"

Implementación: Migración a la librería Lucide React para una interfaz visual más moderna y consistente.`
    },
    {
        id: 4,
        title: "v2.2 - Profundidad de Tareas",
        badge: "Gemini",
        subtitle: "Subtareas y comentarios",
        description: "Añadiendo características avanzadas de gestión de tareas.",
        content: `"vamos a avanzar a la siguiente version y añadir mas mejoras y funcionalidades"

Implementación: Se añadieron subtareas (checklists), sistema de comentarios simulado y barra de filtrado.`
    },
    {
        id: 5,
        title: "v2.3 - UX y Modo Oscuro",
        badge: "Gemini",
        subtitle: "Dark mode y mejoras de experiencia",
        description: "Soporte para tema oscuro y panel de actividad.",
        content: `"vale, muestrame ahora la siguiente version"

Implementación: Soporte para Dark Mode, panel lateral de historial de actividad y feedback visual.`
    },
    {
        id: 6,
        title: "v2.4 - Transformación a Trello UI",
        badge: "Gemini",
        subtitle: "Rediseño completo de interfaz",
        description: "Adaptación estética completa al diseño original de Trello.",
        content: `"perfecto, ahora desde la version 2.3 vamos a avanzar a la siguiente version, 2.4 que será adaptar mas el ui y ux a la aplicacion real de trello en vez de que se llame projectflow"

Implementación: Rediseño total de la interfaz: fondos de imagen completa, listas con estilo Trello y header transparente.`
    },
    {
        id: 7,
        title: "v2.5 - Funcionalidades 'Real Feel'",
        badge: "Gemini",
        subtitle: "Interacciones naturales",
        description: "Añadiendo funcionalidades para una experiencia más auténtica.",
        content: `"ahora añade las funcionalidades de la aplicacion por favor"

Implementación: Creación rápida de tareas en línea, menús de gestión de columnas y corrección de bugs de iconos.`
    },
    {
        id: 8,
        title: "v2.6 - Header y Navegación",
        badge: "Gemini",
        subtitle: "Barra de navegación funcional",
        description: "Implementación completa de la navegación superior.",
        content: `"vale, ahora haz que funcione la barra de navegación en la parte de arriba"

Implementación: Menús desplegables funcionales en el header, búsqueda global conectada al tablero y selector de fondos.`
    },
    {
        id: 9,
        title: "v2.7 - Drag & Drop Avanzado",
        badge: "Gemini",
        subtitle: "Reordenamiento de columnas",
        description: "Capacidades avanzadas de arrastre y edición.",
        content: `"sigue implementando más funcionalidades en la siguiente version"

Implementación: Capacidad de reordenar columnas horizontalmente y editar títulos de listas en el sitio (inline).`
    },
    {
        id: 10,
        title: "v2.9 - Diseño Responsivo",
        badge: "Gemini",
        subtitle: "Adaptación multiplataforma",
        description: "Diseño responsive completo para todos los dispositivos.",
        content: `"hazla multiplataforma y que se adapte a todo tipo de resoluciones"

Implementación: Adaptación Mobile-First, menú hamburguesa para móviles y modales full-screen en pantallas pequeñas.`
    },
    {
        id: 11,
        title: "v3.0 - Lógica de Creación",
        badge: "Gemini",
        subtitle: "Botón crear funcional",
        description: "Implementación del sistema de creación de tableros y tarjetas.",
        content: `"ahora implementa que el boton crear haga su funcion por favor, vamos a ir poco a poco cada boton que vaya teniendo su funcion para asi ir completando la aplicacion y añadiendo todas sus funcionalidades"

Implementación: Funcionalidad real para el botón "Crear": popover para nuevos tableros y acceso directo a nueva tarea.`
    },
    {
        id: 12,
        title: "v3.1 - Arquitectura Multi-Tablero",
        badge: "Gemini",
        subtitle: "Sistema de múltiples tableros",
        description: "Soporte completo para gestionar varios tableros.",
        content: `"ahora como puedo acceder a ese tablero o tarjeta, por que lo puedo crear pero no acceder, despues de esto ve proponiendo mejoras para la aplicacion y cada version"

Implementación: Estructura de datos para múltiples tableros y navegación entre ellos desde el menú "Reciente".`
    },
    {
        id: 13,
        title: "v3.2 - Vista de Calendario",
        badge: "Gemini",
        subtitle: "Visualización temporal",
        description: "Nueva vista de calendario para organización por fechas.",
        content: `"avanza de version a la 3.2"

Implementación: Nueva vista de calendario para visualizar tareas por fecha de vencimiento.`
    },
    {
        id: 14,
        title: "v4.0 - Arquitectura 'Full Trello Clone'",
        badge: "Gemini",
        subtitle: "Refactorización arquitectónica completa",
        description: "Transformación del prototipo en arquitectura modular profesional.",
        content: `Prompt Maestro: ProjectFlow v4.0 - Arquitectura 'Full Trello Clone'

Rol: Eres un Arquitecto de Software Frontend y Especialista en UX...

Objetivo Principal: Transformar este prototipo en un clon indistinguible de Trello listo para producción en GitHub Pages. Debes refactorizar el código monolítico en una estructura de carpetas profesional...

Implementación Esperada: Re-arquitectura total: Separación en módulos (Context, Pages, Components), HashRouter para GitHub Pages, Sidebar colapsable y funcionalidades avanzadas (Adjuntos, Fechas, Actividad).`
    },
    {
        id: 15,
        title: "v6.0 - The Production Refactor & Polish",
        badge: "Gemini",
        subtitle: "Refinamiento final de producción",
        description: "Refactorización definitiva con pulido visual pixel-perfect.",
        content: `Prompt Maestro: ProjectFlow v6.0 - "The Production Refactor & Polish"

Rol: Eres un Senior Frontend Architect y Especialista en UI/UX (Pixel-Perfect), experto en React, Tailwind CSS y Framer Motion.

Contexto Actual: Tengo un archivo monolítico funcional (version 5_3_3.tsx) que contiene toda la lógica: Autenticación, Drag & Drop (@dnd-kit), Modales, Contexto y Persistencia. Funciona, pero es inmantenible y la UX es un 80% Trello, no un 100%.

Objetivo Final: Refactorizar el monolito en una Arquitectura de Producción Modular y aplicar el "Trello Polish" (detalles visuales finos) para que la aplicación sea indistinguible del original.

Implementación: Refactorización definitiva del código monolítico a una estructura modular profesional. Implementación de "Polish" visual: Scrollbars personalizadas, rotación de tarjetas al arrastrar, rutas anidadas reales y separación limpia de componentes.`
    },
    {
        id: 16,
        title: "v7.0 - GitHub & Producción",
        badge: "Gemini",
        subtitle: "Preparación para deploy",
        description: "Adaptación final para despliegue en GitHub Pages.",
        content: `"esta aplicacion se va a replicar en gemini y luego posteriormente lo subire a github asi que adaptalo para que cuando se suba a github pueda funcionar bien"

Implementación Final:
- Configuración de rutas relativas en vite.config.ts (base: './')
- Limpieza estricta de sintaxis React (class a className)
- Refactorización del Drag & Drop usando @dnd-kit para máxima compatibilidad`
    }
];

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = htmlElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
});

// Render Versions
function renderVersions(filteredVersions = versions) {
    const container = document.getElementById('versionsContainer');
    container.innerHTML = '';

    filteredVersions.forEach((version, index) => {
        const card = document.createElement('div');
        card.className = 'version-card';
        card.style.animationDelay = `${index * 0.05}s`;

        const featuresHTML = version.features.map(feature =>
            `<li>${feature}</li>`
        ).join('');

        card.innerHTML = `
            <div class="version-header">
                <h3 class="version-number">v${version.version}</h3>
                <span class="version-badge ${version.type}">${version.type}</span>
            </div>
            <p class="version-description">${version.description}</p>
            <ul class="version-features">
                ${featuresHTML}
            </ul>
        `;

        container.appendChild(card);
    });
}

// Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter versions
        const filter = button.getAttribute('data-filter');

        if (filter === 'all') {
            renderVersions(versions);
        } else {
            const filtered = versions.filter(v => v.series === parseInt(filter));
            renderVersions(filtered);
        }
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Simple Chart for Stats
function createVersionsChart() {
    const canvas = document.getElementById('versionsChart');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = 400;
    canvas.height = 300;

    // Count versions by series
    const seriesCount = versions.reduce((acc, version) => {
        acc[version.series] = (acc[version.series] || 0) + 1;
        return acc;
    }, {});

    const series = Object.keys(seriesCount).map(Number);
    const counts = Object.values(seriesCount);
    const maxCount = Math.max(...counts);

    // Colors
    const colors = [
        'hsl(220, 88%, 58%)',
        'hsl(240, 85%, 65%)',
        'hsl(260, 85%, 65%)',
        'hsl(280, 85%, 65%)',
        'hsl(300, 85%, 65%)',
        'hsl(320, 85%, 65%)'
    ];

    // Draw bars
    const barWidth = 50;
    const barSpacing = 15;
    const chartHeight = 200;
    const chartTop = 50;
    const chartLeft = 50;

    ctx.font = '14px Inter, sans-serif';
    ctx.textAlign = 'center';

    series.forEach((s, index) => {
        const count = counts[index];
        const barHeight = (count / maxCount) * chartHeight;
        const x = chartLeft + index * (barWidth + barSpacing);
        const y = chartTop + chartHeight - barHeight;

        // Draw bar with gradient
        const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
        gradient.addColorStop(0, colors[index]);
        gradient.addColorStop(1, colors[index] + '80');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);

        // Draw count
        ctx.fillStyle = getComputedStyle(document.documentElement)
            .getPropertyValue('--text-primary');
        ctx.fillText(count, x + barWidth / 2, y - 10);

        // Draw label
        ctx.fillText(`v${s}.x`, x + barWidth / 2, chartTop + chartHeight + 20);
    });

    // Draw title
    ctx.font = 'bold 16px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Versiones por Serie', canvas.width / 2, 25);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Render Prompts
function renderPrompts() {
    const container = document.getElementById('promptsContainer');
    if (!container) return;

    container.innerHTML = '';

    prompts.forEach((prompt, index) => {
        const card = document.createElement('div');
        card.className = 'prompt-card';
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <div class="prompt-header" data-prompt-id="${prompt.id}">
                <div class="prompt-title-wrapper">
                    <span class="prompt-badge">${prompt.badge}</span>
                    <h3 class="prompt-title">${prompt.title}</h3>
                    <p class="prompt-subtitle">${prompt.subtitle}</p>
                </div>
                <button class="prompt-toggle" aria-label="Expandir prompt">
                    ▼
                </button>
            </div>
            <div class="prompt-content">
                <div class="prompt-content-inner">
                    <p class="prompt-description">${prompt.description}</p>
                    <pre class="prompt-code">${prompt.content}</pre>
                </div>
            </div>
        `;

        container.appendChild(card);

        // Add click handler for expand/collapse
        const header = card.querySelector('.prompt-header');
        const content = card.querySelector('.prompt-content');
        const toggle = card.querySelector('.prompt-toggle');

        header.addEventListener('click', () => {
            const isExpanded = content.classList.contains('expanded');

            if (isExpanded) {
                content.classList.remove('expanded');
                toggle.classList.remove('active');
            } else {
                content.classList.add('expanded');
                toggle.classList.add('active');
            }
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderVersions();
    renderPrompts();

    // Create chart after a short delay to ensure proper rendering
    setTimeout(() => {
        createVersionsChart();
    }, 100);

    // Observe elements for scroll animations
    document.querySelectorAll('.overview-card, .version-card, .stats-card, .prompt-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Update chart on theme change
themeToggle.addEventListener('click', () => {
    setTimeout(() => {
        createVersionsChart();
    }, 100);
});

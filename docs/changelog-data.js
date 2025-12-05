
// Changelog Data (Detailed v4.x and v5.x)
const changelogData = [
    {
        version: "v4.0",
        title: "Arquitectura 'Full Clone'",
        prompt: "basado en este prompt y a partir de esta version de la aplicacion, copia la aplicacion de Trello como un clon de la aplicacion, ve poco a poco...",
        features: [
            {
                tag: "arch",
                title: "Refactorización Masiva",
                description: "Se migró de un estado local simple a un AppContext global complejo. Se implementó un enrutamiento simulado para manejar vistas sin recargas y se diseñó el Sidebar colapsable al estilo Trello."
            }
        ]
    },
    {
        version: "v4.2",
        title: "Layout y Funcionalidad Core",
        prompt: "vale, esta sera la version 4.2, elimina el scroll horizontal y vamos implementando funcionalidad a todo, ya que ahora mismo es hay muchos botones sin funcionalidad",
        features: [
            {
                tag: "feat",
                title: "Funcionalidad de Botones",
                description: "Conexión de la lógica para los botones \"Mover\", \"Copiar\" y \"Archivar\" en el modal de tareas. Implementación real del menú de acciones de lista (Ordenar, Eliminar)."
            },
            {
                tag: "fix",
                title: "Layout Robusto",
                description: "Corrección del desbordamiento horizontal (scroll) y ajuste del layout 100dvh para móviles."
            }
        ]
    },
    {
        version: "v4.4",
        title: "Detalles de Interacción",
        prompt: "implementa otra funcionalidad (Enfoque en edición y etiquetas)",
        features: [
            {
                tag: "feat",
                title: "Edición en Línea",
                description: "Capacidad para renombrar listas haciendo clic directamente en el título."
            },
            {
                tag: "feat",
                title: "Selector de Etiquetas",
                description: "Implementación de un Popover real para añadir/quitar etiquetas de colores a las tareas."
            }
        ]
    },
    {
        version: "v4.5",
        title: "Modal Rico",
        prompt: "implementa otra funcionalidad (Enfoque en adjuntos y fechas)",
        features: [
            {
                tag: "feat",
                title: "Sistema de Adjuntos",
                description: "Capacidad para subir archivos reales (simulado en memoria), visualizarlos en lista y usar imágenes como Portada (Cover) de la tarjeta."
            },
            {
                tag: "feat",
                title: "Fechas de Vencimiento",
                description: "Integración de selector de fecha nativo y lógica visual para fechas cumplidas (verde) o pendientes."
            }
        ]
    },
    {
        version: "v4.6 / v4.7",
        title: "Sistema de Plantillas",
        prompt: "implementa ahora las plantillas por favor y posteriormente ahora que pueda acceder mediante su boton...",
        features: [
            {
                tag: "feat",
                title: "Galería de Plantillas",
                description: "Nueva vista dedicada con tableros pre-configurados (Gestión de Proyectos, Kanban Simple, etc.)."
            },
            {
                tag: "logic",
                title: "Instanciación",
                description: "Lógica para clonar una plantilla completa (columnas, tareas, etiquetas) en un nuevo tablero funcional."
            }
        ]
    },
    {
        version: "v4.8 / v4.9",
        title: "Espacios de Trabajo",
        prompt: "implementa los espacios de trabajo y ahora como puedo acceder a ese espacio de trabajo?",
        features: [
            {
                tag: "arch",
                title: "Jerarquía de Datos",
                description: "Introducción de la entidad Workspace. Los tableros ahora pertenecen a un espacio, no flotan libremente."
            },
            {
                tag: "feat",
                title: "Vista de Espacio",
                description: "Nueva página dashboard que muestra los tableros agrupados en cuadrícula, miembros del espacio y configuración."
            }
        ]
    },
    {
        version: "v4.10",
        title: "Buscador Contextual",
        prompt: "para que se usa el buscador?, por que quiero buscar algo y no funciona",
        features: [
            {
                tag: "fix",
                title: "Lógica de Búsqueda",
                description: "Se arregló el buscador para que sea sensible al contexto: filtra tableros si estás en el Espacio de Trabajo, y filtra tareas si estás dentro de un Tablero."
            }
        ]
    },
    {
        version: "v5.0 / v5.2",
        title: "Usuarios y Aislamiento",
        prompt: "añade el sistema de perfiles y usuarios y haz que con cada perfil, sea diferente para cada usuario",
        features: [
            {
                tag: "feat",
                title: "Cambio de Usuario",
                description: "Capacidad para cambiar entre usuarios predefinidos (Admin, Ana, Carlos, Luisa) instantáneamente."
            },
            {
                tag: "security",
                title: "Segregación de Datos",
                description: "Implementación de filtros estrictos. Los usuarios ahora solo ven los espacios y tableros a los que han sido invitados."
            }
        ]
    },
    {
        version: "v5.3",
        title: "Roles y Permisos",
        prompt: "haz que el admin pueda ver todo de todos y luego cada usuario propio solo pueda ver sus tableros...",
        features: [
            {
                tag: "feat",
                title: "Superadmin",
                description: "Creación del rol isAdmin. El usuario Admin tiene acceso de lectura/escritura global a todos los espacios, ignorando las restricciones de membresía."
            }
        ]
    },
    {
        version: "v5.3.2 / v5.3.3",
        title: "Autenticación Real",
        prompt: "añade una ventana de inicio de sesion... y luego para registrar un nuevo usuario...",
        features: [
            {
                tag: "feat",
                title: "Flujo Auth",
                description: "Pantalla de Login y Registro funcional. Validación de credenciales y creación de nuevos usuarios en tiempo real."
            },
            {
                tag: "fix",
                title: "Estabilidad",
                description: "Corrección de errores críticos en la inicialización del estado (useAppWrapper error) y lógica de creación automática de espacios personales al registrarse."
            }
        ]
    },
    {
        version: "v5.5",
        title: "App Switcher",
        prompt: "...solo implementa lo del menu de los 9 puntos...",
        features: [
            {
                tag: "feat",
                title: "Menú Atlassian",
                description: "Implementación del menú desplegable de 9 puntos en el header, simulando la navegación entre productos de Atlassian (Jira, Confluence, Bitbucket)."
            }
        ]
    },
    {
        version: "v5.5.1",
        title: "Hotfix",
        prompt: "arregla este error: The symbol 'AppSwitcher' has already been declared",
        features: [
            {
                tag: "fix",
                title: "Compilación",
                description: "Eliminación de código duplicado generado accidentalmente en la versión anterior para restaurar la estabilidad de la aplicación."
            }
        ]
    }
];

// Render Changelog
function renderChangelog() {
    const container = document.getElementById('changelogContainer');
    if (!container) return;

    container.innerHTML = '';

    changelogData.forEach((entry, index) => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'changelog-entry';
        entryDiv.style.animationDelay = `${index * 0.1}s`;

        const featuresHTML = entry.features.map(feature => `
            <div class="changelog-feature">
                <div class="changelog-feature-title">
                    <span class="changelog-tag ${feature.tag}">${feature.tag.toUpperCase()}</span>
                    ${feature.title}
                </div>
                <p>${feature.description}</p>
            </div>
        `).join('');

        entryDiv.innerHTML = `
            <h3 class="changelog-version">${entry.version}: ${entry.title}</h3>
            <div class="changelog-prompt">
                <strong>Prompt:</strong> "${entry.prompt}"
            </div>
            <div class="changelog-features">
                ${featuresHTML}
            </div>
        `;

        container.appendChild(entryDiv);
    });
}

// Update initialize function to include changelog rendering
const originalDOMContentLoaded = document.addEventListener;
document.addEventListener('DOMContentLoaded', () => {
    renderChangelog();
});

// Archivo proyectos.js
const proyectosJSON = [
    {
        id: 1,
        nombre: "Desarrollo de Aplicación Web",
        descripcion: "Desarrollar una aplicación web para gestión de proyectos.",
        tareas: [
            {
                id: 1,
                nombre: "Diseñar interfaz de usuario",
                descripcion: "Crear el diseño inicial de la UI.",
                miembro: "Carlos Pérez",
                fechaVencimiento: "2025-03-10",
                prioridad: "alta",
                estado: "pendiente"
            },
            {
                id: 2,
                nombre: "Desarrollar backend",
                descripcion: "Desarrollar la lógica de backend usando Node.js.",
                miembro: "Ana Gómez",
                fechaVencimiento: "2025-04-05",
                prioridad: "media",
                estado: "en progreso"
            }
        ]
    }
];

// Miembros del equipo
const miembrosEquipo = ["Carlos Pérez", "Ana Gómez", "Luis Díaz", "Sara Martínez"];

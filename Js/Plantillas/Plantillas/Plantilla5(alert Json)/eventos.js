// Archivo eventos.js
const eventosJSON = [
    {
        id: 1,
        nombre: "Congreso de Tecnología",
        descripcion: "Evento anual sobre nuevas tecnologías.",
        fecha: "2025-03-15T10:00",
        lugar: "Auditorio Principal",
        estado: "pendiente",
        asistentes: [
            {
                nombre: "Juan Pérez",
                rol: "organizador",
                historialRoles: [
                    { rol: "organizador", fecha: "2025-03-01" }
                ]
            },
            {
                nombre: "Ana Gómez",
                rol: "ponente",
                historialRoles: [
                    { rol: "ponente", fecha: "2025-03-01" }
                ]
            }
        ]
    }
];

// Archivo index.js

let eventosArray = [...eventosJSON];
let currentEventoIndex = null;
let currentAsistenteIndex = null;

const eventoForm = document.getElementById("eventoForm");
const asistenteForm = document.getElementById("asistenteForm");

const nombreEvento = document.getElementById("nombreEvento");
const descripcionEvento = document.getElementById("descripcionEvento");
const fechaEvento = document.getElementById("fechaEvento");
const lugarEvento = document.getElementById("lugarEvento");
const estadoEvento = document.getElementById("estadoEvento");

const nombreAsistente = document.getElementById("nombreAsistente");
const rolAsistente = document.getElementById("rolAsistente");

const guardarEvento = document.getElementById("guardarEvento");
const resetearEvento = document.getElementById("resetearEvento");
const guardarAsistente = document.getElementById("guardarAsistente");
const resetearAsistente = document.getElementById("resetearAsistente");

const eventosTable = document.getElementById("eventosTable");
const asistentesTable = document.getElementById("asistentesTable");

function mostrarEventos() {
    let eventosLista = `<tr><th>Nombre</th><th>Fecha</th><th>Estado</th><th>Acciones</th></tr>`;
    eventosArray.forEach((evento, index) => {
        eventosLista += `<tr>
            <td>${evento.nombre}</td>
            <td>${new Date(evento.fecha).toLocaleString()}</td>
            <td>${evento.estado}</td>
            <td><button class="btn btn-sm btn-info" onclick="editarEvento(${index})">Editar</button></td>
        </tr>`;
    });
    eventosTable.innerHTML = eventosLista;
}

function mostrarAsistentes() {
    if (currentEventoIndex === null) return;
    let evento = eventosArray[currentEventoIndex];
    let asistentesLista = `<tr><th>Nombre</th><th>Rol</th><th>Historial de Roles</th><th>Acciones</th></tr>`;
    evento.asistentes.forEach((asistente, index) => {
        asistentesLista += `<tr>
            <td>${asistente.nombre}</td>
            <td>${asistente.rol}</td>
            <td><button class="btn btn-sm btn-secondary" onclick="verHistorialRoles(${index})">Ver Historial</button></td>
            <td><button class="btn btn-sm btn-warning" onclick="editarRolAsistente(${index})">Cambiar Rol</button></td>
        </tr>`;
    });
    asistentesTable.innerHTML = asistentesLista;
}

guardarEvento.addEventListener("click", () => {
    if (!validarEvento()) return;

    const evento = {
        id: eventosArray.length + 1,
        nombre: nombreEvento.value,
        descripcion: descripcionEvento.value,
        fecha: fechaEvento.value,
        lugar: lugarEvento.value,
        estado: estadoEvento.value,
        asistentes: []
    };
    eventosArray.push(evento);
    mostrarEventos();
    resetearFormularioEvento();
});

guardarAsistente.addEventListener("click", () => {
    if (!validarAsistente()) return;

    const asistente = {
        nombre: nombreAsistente.value,
        rol: rolAsistente.value,
        historialRoles: [{ rol: rolAsistente.value, fecha: new Date().toLocaleDateString() }]
    };

    eventosArray[currentEventoIndex].asistentes.push(asistente);
    mostrarAsistentes();
    resetearFormularioAsistente();
});

function editarEvento(index) {
    currentEventoIndex = index;
    const evento = eventosArray[index];
    nombreEvento.value = evento.nombre;
    descripcionEvento.value = evento.descripcion;
    fechaEvento.value = evento.fecha;
    lugarEvento.value = evento.lugar;
    estadoEvento.value = evento.estado;
    mostrarAsistentes();
}

function editarRolAsistente(index) {
    currentAsistenteIndex = index;
    const asistente = eventosArray[currentEventoIndex].asistentes[index];
    rolAsistente.value = asistente.rol;
}

function verHistorialRoles(index) {
    const asistente = eventosArray[currentEventoIndex].asistentes[index];
    alert(`Historial de Roles para ${asistente.nombre}: ${JSON.stringify(asistente.historialRoles, null, 2)}`);
}

function validarEvento() {
    if (!nombreEvento.value || !fechaEvento.value || !lugarEvento.value) {
        alert("Todos los campos del evento son obligatorios.");
        return false;
    }
    if (new Date(fechaEvento.value) < new Date()) {
        alert("La fecha del evento no puede ser en el pasado.");
        return false;
    }
    return true;
}

function validarAsistente() {
    if (!nombreAsistente.value || !rolAsistente.value) {
        alert("Todos los campos del asistente son obligatorios.");
        return false;
    }
    return true;
}

function resetearFormularioEvento() {
    eventoForm.reset();
}

function resetearFormularioAsistente() {
    asistenteForm.reset();
}

mostrarEventos();  // Mostrar eventos al cargar

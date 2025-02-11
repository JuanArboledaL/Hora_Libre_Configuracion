// Archivo index.js

let proyectosArray = [...proyectosJSON];
let currentProyectoIndex = null;
let currentTareaIndex = null;

const proyectoForm = document.getElementById("proyectoForm");
const tareaForm = document.getElementById("tareaForm");

const nombreProyecto = document.getElementById("nombreProyecto");
const descripcionProyecto = document.getElementById("descripcionProyecto");
const fechaInicioProyecto = document.getElementById("fechaInicioProyecto");
const fechaFinProyecto = document.getElementById("fechaFinProyecto");
const estadoProyecto = document.getElementById("estadoProyecto");

const nombreTarea = document.getElementById("nombreTarea");
const fechaVencimientoTarea = document.getElementById("fechaVencimientoTarea");
const prioridadTarea = document.getElementById("prioridadTarea");
const estadoTarea = document.getElementById("estadoTarea");

const guardarProyecto = document.getElementById("guardarProyecto");
const resetearProyecto = document.getElementById("resetearProyecto");
const guardarTarea = document.getElementById("guardarTarea");
const resetearTarea = document.getElementById("resetearTarea");

const proyectosTable = document.getElementById("proyectosTable");
const tareasTable = document.getElementById("tareasTable");

function mostrarProyectos() {
    let proyectosLista = `<tr><th>Nombre</th><th>Estado</th><th>Acciones</th></tr>`;
    proyectosArray.forEach((proyecto, index) => {
        proyectosLista += `<tr>
            <td>${proyecto.nombre}</td>
            <td>${proyecto.estado}</td>
            <td><button class="btn btn-sm btn-info" onclick="editarProyecto(${index})">Editar</button></td>
        </tr>`;
    });
    proyectosTable.innerHTML = proyectosLista;
}

function mostrarTareas() {
    if (currentProyectoIndex === null) return;
    let proyecto = proyectosArray[currentProyectoIndex];
    let tareasLista = `<tr><th>Nombre</th><th>Fecha Vencimiento</th><th>Prioridad</th><th>Estado</th><th>Acciones</th></tr>`;
    proyecto.tareas.forEach((tarea, index) => {
        tareasLista += `<tr>
            <td>${tarea.nombre}</td>
            <td>${tarea.fechaVencimiento}</td>
            <td>${tarea.prioridad}</td>
            <td>${tarea.estado}</td>
            <td><button class="btn btn-sm btn-warning" onclick="editarTarea(${index})">Editar</button></td>
        </tr>`;
    });
    tareasTable.innerHTML = tareasLista;
}

// Guardar nuevo proyecto
guardarProyecto.addEventListener("click", () => {
    if (!validarProyecto()) return;

    const proyecto = {
        id: proyectosArray.length + 1,
        nombre: nombreProyecto.value,
        descripcion: descripcionProyecto.value,
        fechaInicio: fechaInicioProyecto.value,
        fechaFin: fechaFinProyecto.value,
        estado: estadoProyecto.value,
        tareas: []
    };
    proyectosArray.push(proyecto);
    mostrarProyectos();
    resetearProyectoForm();
});

// Guardar tarea
guardarTarea.addEventListener("click", () => {
    if (!validarTarea()) return;

    const tarea = {
        nombre: nombreTarea.value,
        fechaVencimiento: fechaVencimientoTarea.value,
        prioridad: prioridadTarea.value,
        estado: estadoTarea.value
    };

    proyectosArray[currentProyectoIndex].tareas.push(tarea);
    mostrarTareas();
    resetearTareaForm();
});

// Validar formulario de proyecto
function validarProyecto() {
    if (!nombreProyecto.value || !fechaInicioProyecto.value || !fechaFinProyecto.value) {
        alert("Todos los campos del proyecto son obligatorios.");
        return false;
    }
    if (new Date(fechaInicioProyecto.value) > new Date(fechaFinProyecto.value)) {
        alert("La fecha de inicio no puede ser posterior a la fecha de finalización.");
        return false;
    }
    return true;
}

// Validar formulario de tarea
function validarTarea() {
    if (!nombreTarea.value || !fechaVencimientoTarea.value || !estadoTarea.value) {
        alert("Todos los campos de la tarea son obligatorios.");
        return false;
    }
    return true;
}

// Resetear formulario de proyecto
function resetearProyectoForm() {
    proyectoForm.reset();
}

// Resetear formulario de tarea
function resetearTareaForm() {
    tareaForm.reset();
}

// Editar proyecto
function editarProyecto(index) {
    currentProyectoIndex = index;
    const proyecto = proyectosArray[index];
    nombreProyecto.value = proyecto.nombre;
    descripcionProyecto.value = proyecto.descripcion;
    fechaInicioProyecto.value = proyecto.fechaInicio;
    fechaFinProyecto.value = proyecto.fechaFin;
    estadoProyecto.value = proyecto.estado;
    mostrarTareas();
}

mostrarProyectos();  // Mostrar proyectos al cargar

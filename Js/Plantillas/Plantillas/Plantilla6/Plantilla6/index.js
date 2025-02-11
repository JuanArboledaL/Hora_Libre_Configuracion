// ✅ Esperar a que cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
    inicializarProyectos();
    mostrarProyectos();
    cargarMiembros();
});

// 🔄 Variables globales
let proyectosArray = [];
let currentProyectoIndex = null;
let currentTareaIndex = null;

// 🔗 Elementos del DOM
const proyectoForm = document.getElementById("proyectoForm");
const tareaForm = document.getElementById("tareaForm");

const nombreProyecto = document.getElementById("nombreProyecto");
const descripcionProyecto = document.getElementById("descripcionProyecto");

const nombreTarea = document.getElementById("nombreTarea");
const descripcionTarea = document.getElementById("descripcionTarea");
const responsableTarea = document.getElementById("responsableTarea");
const fechaVencimientoTarea = document.getElementById("fechaVencimientoTarea");
const prioridadTarea = document.getElementById("prioridadTarea");
const estadoTarea = document.getElementById("estadoTarea");

const guardarProyecto = document.getElementById("guardarProyecto");
const resetearProyecto = document.getElementById("resetearProyecto");
const guardarTarea = document.getElementById("guardarTarea");
const resetearTarea = document.getElementById("resetearTarea");

const proyectosTable = document.getElementById("proyectosTable");
const tareasTable = document.getElementById("tareasTable");

const nuevoProyectoBtn = document.getElementById("nuevoProyecto");
const nuevaTareaBtn = document.getElementById("nuevaTarea");

// ✅ Cargar proyectos desde `proyectosJSON`
function inicializarProyectos() {
    if (typeof proyectosJSON !== "undefined" && Array.isArray(proyectosJSON)) {
        proyectosArray = [...proyectosJSON];
    } else {
        console.warn("⚠️ No se encontraron datos de proyectos. Inicializando vacío.");
        proyectosArray = [];
    }
}

// ✅ Mostrar proyectos en la tabla
function mostrarProyectos() {
    proyectosTable.innerHTML = proyectosArray.length === 0
        ? "<tr><td colspan='3' class='text-center'>No hay proyectos</td></tr>"
        : `<tr><th>Nombre</th><th>Descripción</th><th>Acciones</th></tr>` +
          proyectosArray.map((proyecto, index) => `
            <tr>
                <td>${proyecto.nombre}</td>
                <td>${proyecto.descripcion}</td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="editarProyecto(${index})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="eliminarProyecto(${index})">Eliminar</button>
                </td>
            </tr>
          `).join("");
}

// ✅ Mostrar tareas del proyecto seleccionado
function mostrarTareas() {
    if (currentProyectoIndex === null) {
        tareasTable.innerHTML = "<tr><td colspan='5' class='text-center'>Seleccione un proyecto</td></tr>";
        return;
    }

    let proyecto = proyectosArray[currentProyectoIndex];

    tareasTable.innerHTML = (!proyecto.tareas || proyecto.tareas.length === 0)
        ? "<tr><td colspan='5' class='text-center'>No hay tareas</td></tr>"
        : `<tr><th>Nombre</th><th>Miembro</th><th>Prioridad</th><th>Estado</th><th>Acciones</th></tr>` +
          proyecto.tareas.map((tarea, index) => `
            <tr>
                <td>${tarea.nombre}</td>
                <td>${tarea.miembro}</td>
                <td>${tarea.prioridad}</td>
                <td>${tarea.estado}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editarTarea(${index})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="eliminarTarea(${index})">Eliminar</button>
                </td>
            </tr>
          `).join("");
}

// ✅ Guardar o actualizar un proyecto
guardarProyecto.addEventListener("click", () => {
    if (!nombreProyecto.value.trim() || !descripcionProyecto.value.trim()) {
        alert("Por favor, complete todos los campos del proyecto.");
        return;
    }

    const proyecto = {
        nombre: nombreProyecto.value.trim(),
        descripcion: descripcionProyecto.value.trim(),
        tareas: currentProyectoIndex !== null ? proyectosArray[currentProyectoIndex].tareas : []
    };

    if (currentProyectoIndex !== null) {
        proyectosArray[currentProyectoIndex] = proyecto;
    } else {
        proyectosArray.push(proyecto);
    }

    mostrarProyectos();
    resetearFormularioProyecto();
});

// ✅ Guardar o actualizar una tarea
guardarTarea.addEventListener("click", () => {
    if (currentProyectoIndex === null) {
        alert("Seleccione un proyecto primero.");
        return;
    }

    if (!nombreTarea.value.trim() || !descripcionTarea.value.trim() || !responsableTarea.value || !fechaVencimientoTarea.value || !prioridadTarea.value || !estadoTarea.value) {
        alert("Por favor, complete todos los campos de la tarea.");
        return;
    }

    const tarea = {
        nombre: nombreTarea.value.trim(),
        descripcion: descripcionTarea.value.trim(),
        miembro: responsableTarea.value,
        fechaVencimiento: fechaVencimientoTarea.value,
        prioridad: prioridadTarea.value,
        estado: estadoTarea.value
    };

    let proyecto = proyectosArray[currentProyectoIndex];

    if (currentTareaIndex !== null) {
        proyecto.tareas[currentTareaIndex] = tarea;
    } else {
        proyecto.tareas.push(tarea);
    }

    mostrarTareas();
    resetearFormularioTarea();
});

// ✅ Editar un proyecto
function editarProyecto(index) {
    currentProyectoIndex = index;
    let proyecto = proyectosArray[index];

    nombreProyecto.value = proyecto.nombre;
    descripcionProyecto.value = proyecto.descripcion;

    mostrarTareas();
}

// ✅ Eliminar un proyecto
function eliminarProyecto(index) {
    proyectosArray.splice(index, 1);
    currentProyectoIndex = null;
    mostrarProyectos();
    resetearFormularioProyecto();
}

// ✅ Editar una tarea
function editarTarea(index) {
    currentTareaIndex = index;
    let tarea = proyectosArray[currentProyectoIndex].tareas[index];

    nombreTarea.value = tarea.nombre;
    descripcionTarea.value = tarea.descripcion;
    responsableTarea.value = tarea.miembro;
    fechaVencimientoTarea.value = tarea.fechaVencimiento;
    prioridadTarea.value = tarea.prioridad;
    estadoTarea.value = tarea.estado;
}

// ✅ Eliminar una tarea
function eliminarTarea(index) {
    proyectosArray[currentProyectoIndex].tareas.splice(index, 1);
    mostrarTareas();
}

// ✅ Resetear formularios
function resetearFormularioProyecto() {
    proyectoForm.reset();
    currentProyectoIndex = null;
}

function resetearFormularioTarea() {
    tareaForm.reset();
    currentTareaIndex = null;
}

// ✅ Cargar opciones de miembros en el formulario de tareas
function cargarMiembros() {
    if (typeof miembrosEquipo !== "undefined" && Array.isArray(miembrosEquipo)) {
        responsableTarea.innerHTML = `<option value="">Selecciona un responsable</option>` +
            miembrosEquipo.map(miembro => `<option value="${miembro}">${miembro}</option>`).join("");
    }
}

// ✅ Botones para iniciar nuevos formularios
nuevoProyectoBtn.addEventListener("click", () => {
    resetearFormularioProyecto();
    mostrarTareas();
});

nuevaTareaBtn.addEventListener("click", () => {
    if (currentProyectoIndex !== null) {
        resetearFormularioTarea();
    } else {
        alert("Seleccione un proyecto primero.");
    }
});

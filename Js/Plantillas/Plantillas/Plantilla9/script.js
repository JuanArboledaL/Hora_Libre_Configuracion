// Elementos del DOM
const descripcionTarea = document.getElementById("descripcionTarea");
const prioridadTarea = document.getElementById("prioridadTarea");
const usuarioTarea = document.getElementById("usuarioTarea");
const agregarTareaBtn = document.getElementById("agregarTarea");
const tablaTareas = document.getElementById("tablaTareas");

const tareaComentario = document.getElementById("tareaComentario");
const comentarioTexto = document.getElementById("comentarioTexto");
const agregarComentarioBtn = document.getElementById("agregarComentario");
const listaComentarios = document.getElementById("listaComentarios");

// Arrays de almacenamiento
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
let usuarios = [];

// Mostrar tareas en la tabla y en la lista de selección para comentarios
function mostrarTareas() {
    tablaTareas.innerHTML = "";
    tareaComentario.innerHTML = '<option value="">Selecciona una tarea</option>';

    tareas.forEach((tarea, index) => {
        tablaTareas.innerHTML += `
            <tr>
                <td>${tarea.descripcion}</td>
                <td>${tarea.prioridad}</td>
                <td>${tarea.usuario}</td>
                <td>${tarea.estado}</td>
                <td>
                    <button class="btn btn-success btn-sm" onclick="cambiarEstado(${index})">✔</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarTarea(${index})">❌</button>
                </td>
            </tr>
        `;

        // Agregar opción en el select de comentarios
        const option = document.createElement("option");
        option.value = index;
        option.textContent = tarea.descripcion;
        tareaComentario.appendChild(option);
    });

    localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Agregar tarea
agregarTareaBtn.addEventListener("click", () => {
    if (descripcionTarea.value.trim() === "" || usuarioTarea.value === "") 
        return alert("Complete todos los campos");

    tareas.push({
        descripcion: descripcionTarea.value,
        prioridad: prioridadTarea.value,
        usuario: usuarioTarea.value,
        estado: "Pendiente"
    });

    mostrarTareas();
    descripcionTarea.value = "";
});

// Cambiar estado de tarea
function cambiarEstado(index) {
    const estados = ["Pendiente", "En progreso", "Completado"];
    let estadoActual = tareas[index].estado;
    let nuevoEstado = estados[(estados.indexOf(estadoActual) + 1) % estados.length];
    tareas[index].estado = nuevoEstado;
    mostrarTareas();
}

// Eliminar tarea
function eliminarTarea(index) {
    tareas.splice(index, 1);
    mostrarTareas();
}

// Mostrar comentarios
function mostrarComentarios() {
    listaComentarios.innerHTML = "";
    comentarios.forEach(comentario => {
        listaComentarios.innerHTML += `<li class="list-group-item"><strong>${comentario.tarea}:</strong> ${comentario.texto}</li>`;
    });

    localStorage.setItem("comentarios", JSON.stringify(comentarios));
}

// Agregar comentario
agregarComentarioBtn.addEventListener("click", () => {
    if (tareaComentario.value === "" || comentarioTexto.value.trim() === "") 
        return alert("Seleccione una tarea y escriba un comentario");

    comentarios.push({
        tarea: tareas[tareaComentario.value].descripcion,
        texto: comentarioTexto.value
    });

    mostrarComentarios();
    comentarioTexto.value = "";
});

// Cargar usuarios desde API externa
fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => {
        usuarios = data.map(user => user.name);
        usuarioTarea.innerHTML = usuarios.map(user => `<option value="${user}">${user}</option>`).join("");
    });

// Cargar datos almacenados al iniciar
document.addEventListener("DOMContentLoaded", () => {
    mostrarTareas();
    mostrarComentarios();
});

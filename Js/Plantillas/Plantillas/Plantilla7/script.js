// Selección de elementos del DOM
const nombreUsuario = document.getElementById("nombreUsuario");
const rolUsuario = document.getElementById("rolUsuario");
const agregarUsuarioBtn = document.getElementById("agregarUsuario");
const tablaUsuarios = document.getElementById("tablaUsuarios");

const nombreTarea = document.getElementById("nombreTarea");
const descripcionTarea = document.getElementById("descripcionTarea");
const usuarioTarea = document.getElementById("usuarioTarea");
const estadoTarea = document.getElementById("estadoTarea");
const agregarTareaBtn = document.getElementById("agregarTarea");
const tablaTareas = document.getElementById("tablaTareas");

// Arrays de usuarios y tareas
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

// Función para mostrar usuarios
function mostrarUsuarios() {
    tablaUsuarios.innerHTML = "";
    usuarioTarea.innerHTML = '<option value="">Seleccionar Usuario</option>'; // Resetear select
    usuarios.forEach((usuario, index) => {
        tablaUsuarios.innerHTML += `
            <tr>
                <td>${usuario.nombre}</td>
                <td>${usuario.rol}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${index})">Eliminar</button>
                </td>
            </tr>
        `;
        // Agregar usuario al selector de tareas
        const option = document.createElement("option");
        option.value = usuario.nombre;
        option.textContent = usuario.nombre;
        usuarioTarea.appendChild(option);
    });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Función para agregar usuario
agregarUsuarioBtn.addEventListener("click", () => {
    if (nombreUsuario.value.trim() === "") return alert("Ingrese un nombre");

    usuarios.push({ nombre: nombreUsuario.value, rol: rolUsuario.value });
    mostrarUsuarios();
    nombreUsuario.value = "";
});

// Función para eliminar usuario
function eliminarUsuario(index) {
    usuarios.splice(index, 1);
    mostrarUsuarios();
}

// Función para mostrar tareas
function mostrarTareas() {
    tablaTareas.innerHTML = "";
    tareas.forEach((tarea, index) => {
        tablaTareas.innerHTML += `
            <tr>
                <td>${tarea.nombre}</td>
                <td>${tarea.usuario}</td>
                <td>${tarea.estado}</td>
                <td>
                    <button class="btn btn-success btn-sm" onclick="cambiarEstado(${index})">✔</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarTarea(${index})">❌</button>
                </td>
            </tr>
        `;
    });
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Función para agregar tarea
agregarTareaBtn.addEventListener("click", () => {
    if (nombreTarea.value.trim() === "" || usuarioTarea.value === "") return alert("Complete los campos");

    tareas.push({
        nombre: nombreTarea.value,
        descripcion: descripcionTarea.value,
        usuario: usuarioTarea.value,
        estado: estadoTarea.value
    });
    mostrarTareas();
    nombreTarea.value = "";
    descripcionTarea.value = "";
});

// Función para cambiar estado de la tarea
function cambiarEstado(index) {
    tareas[index].estado = "Completada";
    mostrarTareas();
}

// Función para eliminar tarea
function eliminarTarea(index) {
    tareas.splice(index, 1);
    mostrarTareas();
}

// Cargar usuarios de un API falso al inicio
fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => {
        usuarios = data.map(u => ({ nombre: u.name, rol: "Usuario" }));
        mostrarUsuarios();
    });

// Mostrar tareas y usuarios al cargar
document.addEventListener("DOMContentLoaded", () => {
    mostrarUsuarios();
    mostrarTareas();
});

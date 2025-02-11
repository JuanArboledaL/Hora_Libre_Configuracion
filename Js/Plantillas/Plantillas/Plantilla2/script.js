const reservaForm = document.getElementById("reservaForm");
const nombreInput = document.getElementById("nombreInput");
const personasInput = document.getElementById("personasInput");
const fechaInput = document.getElementById("fechaInput");
const mesaSelect = document.getElementById("mesaSelect");
const comentariosInput = document.getElementById("comentariosInput");
const guardarReserva = document.getElementById("guardarReserva");
const resetearReserva = document.getElementById("resetearReserva");
const nuevaReserva = document.getElementById("nuevaReserva"); // 🔹 Botón agregado
const infoReserva = document.getElementById("infoReserva");

let reservasArray = [
    { nombre: "Juan Pérez", personas: 2, fecha: "2025-02-15T19:30", mesa: "3", comentarios: "Prefiere cerca de la ventana." },
    { nombre: "Ana López", personas: 4, fecha: "2025-02-16T20:00", mesa: "1", comentarios: "Celebración de cumpleaños." }
];

let currentReservaIndex = null;

window.onload = function () {
    mostrarReservas();
};

function mostrarReservas() {
    let reservasLista = `<tr><th>Cliente</th><th>Personas</th><th>Fecha</th><th>Mesa</th><th>Acción</th></tr>`;
    reservasArray.forEach((reserva, index) => {
        reservasLista += `<tr>
            <td>${reserva.nombre}</td>
            <td>${reserva.personas}</td>
            <td>${reserva.fecha.replace("T", " ")}</td>
            <td>${reserva.mesa}</td>
            <td><button class="btn btn-sm btn-info" onclick="editarReserva(${index})">Editar</button></td>
        </tr>`;
    });
    document.getElementById("reservasTable").innerHTML = reservasLista;
}

// ✅ Crear una nueva reserva desde cero
nuevaReserva.addEventListener("click", () => {
    resetForm();
    currentReservaIndex = null;
});

// ✅ Editar reserva existente
function editarReserva(index) {
    resetForm(); // 🔄 Reseteamos antes de cargar nuevos datos

    currentReservaIndex = index;
    let reserva = reservasArray[index];

    nombreInput.value = reserva.nombre;
    personasInput.value = reserva.personas;
    fechaInput.value = reserva.fecha;
    mesaSelect.value = reserva.mesa;
    comentariosInput.value = reserva.comentarios;
}

// ✅ Guardar reserva nueva o editada
guardarReserva.addEventListener("click", () => {
    if (!validarFormulario()) return;

    let reserva = {
        nombre: nombreInput.value,
        personas: personasInput.value,
        fecha: fechaInput.value,
        mesa: mesaSelect.value,
        comentarios: comentariosInput.value
    };

    if (currentReservaIndex !== null) {
        reservasArray[currentReservaIndex] = reserva;
    } else {
        reservasArray.push(reserva);
    }

    infoReserva.innerHTML = `<pre>${JSON.stringify(reserva, null, 2)}</pre>`;
    mostrarReservas();
    resetForm();
});

// 🔄 Resetear formulario
resetearReserva.addEventListener("click", resetForm);

function resetForm() {
    reservaForm.reset();
    currentReservaIndex = null;
    infoReserva.innerHTML = "";
}

function validarFormulario() {
    if (!nombreInput.value || !personasInput.value || !fechaInput.value || !mesaSelect.value) {
        alert("Por favor, complete todos los campos obligatorios.");
        return false;
    }
    return true;
}

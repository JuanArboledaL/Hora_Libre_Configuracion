// Archivo index.js
const vehiculoForm = document.getElementById("vehiculoForm");
const propietarioInput = document.getElementById("propietarioInput");
const marcaInput = document.getElementById("marcaInput");
const modeloInput = document.getElementById("modeloInput");
const placaInput = document.getElementById("placaInput");
const anioInput = document.getElementById("anioInput");
const observacionesInput = document.getElementById("observacionesInput");
const guardarVehiculo = document.getElementById("guardarVehiculo");
const resetearVehiculo = document.getElementById("resetearVehiculo");
const nuevoVehiculo = document.getElementById("nuevoVehiculo");
const infoVehiculo = document.getElementById("infoVehiculo");

let vehiculosArray = [...vehiculosJSON];  // Inicializamos vehiculosArray con los datos del JSON
let currentVehiculoIndex = null;

// ✅ Mostrar la lista de vehículos en la tabla
function mostrarVehiculos() {
    let vehiculosLista = `<tr><th>Propietario</th><th>Marca</th><th>Modelo</th><th>Placa</th><th>Año</th><th>Acción</th></tr>`;
    vehiculosArray.forEach((vehiculo, index) => {
        vehiculosLista += `<tr>
            <td>${vehiculo.propietario}</td>
            <td>${vehiculo.marca}</td>
            <td>${vehiculo.modelo}</td>
            <td>${vehiculo.placa}</td>
            <td>${vehiculo.anio}</td>
            <td><button class="btn btn-sm btn-info" onclick="editarVehiculo(${index})">Editar</button></td>
        </tr>`;
    });
    document.getElementById("vehiculosTable").innerHTML = vehiculosLista;
}

// ✅ Botón para registrar un nuevo vehículo
nuevoVehiculo.addEventListener("click", () => {
    resetForm();
    currentVehiculoIndex = null;
});

// ✅ Editar vehículo existente
function editarVehiculo(index) {
    resetForm();
    currentVehiculoIndex = index;
    let vehiculo = vehiculosArray[index];

    propietarioInput.value = vehiculo.propietario;
    marcaInput.value = vehiculo.marca;
    modeloInput.value = vehiculo.modelo;
    placaInput.value = vehiculo.placa;
    anioInput.value = vehiculo.anio;
    observacionesInput.value = vehiculo.observaciones;
}

// ✅ Guardar nuevo vehículo o edición de uno existente
guardarVehiculo.addEventListener("click", () => {
    if (!validarFormulario()) return;

    let vehiculo = {
        propietario: propietarioInput.value,
        marca: marcaInput.value,
        modelo: modeloInput.value,
        placa: placaInput.value,
        anio: parseInt(anioInput.value),
        observaciones: observacionesInput.value
    };

    if (currentVehiculoIndex !== null) {
        vehiculosArray[currentVehiculoIndex] = vehiculo;
    } else {
        vehiculosArray.push(vehiculo);
    }

    infoVehiculo.innerHTML = `<pre>${JSON.stringify(vehiculo, null, 2)}</pre>`;
    mostrarVehiculos();
    resetForm();
});

// 🔄 Resetear formulario
resetearVehiculo.addEventListener("click", resetForm);

function resetForm() {
    vehiculoForm.reset();
    currentVehiculoIndex = null;
    infoVehiculo.innerHTML = "";
}

function validarFormulario() {
    if (!propietarioInput.value || !marcaInput.value || !modeloInput.value || !placaInput.value || !anioInput.value) {
        alert("Por favor, complete todos los campos obligatorios.");
        return false;
    }
    return true;
}

// Cargar la tabla de vehículos al iniciar la página
window.onload = mostrarVehiculos;

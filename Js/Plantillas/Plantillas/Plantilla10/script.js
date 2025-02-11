// Elementos del DOM
const nombreProducto = document.getElementById("nombreProducto");
const categoriaProducto = document.getElementById("categoriaProducto");
const cantidadProducto = document.getElementById("cantidadProducto");
const precioProducto = document.getElementById("precioProducto");
const agregarProductoBtn = document.getElementById("agregarProducto");
const tablaProductos = document.getElementById("tablaProductos");
const buscarProducto = document.getElementById("buscarProducto");

// Array de productos almacenados
let productos = JSON.parse(localStorage.getItem("productos")) || [];

// Mostrar productos en la tabla
function mostrarProductos(filtro = "") {
    tablaProductos.innerHTML = "";

    // Aseguramos que filtro sea una cadena
    filtro = String(filtro).toLowerCase();

    productos
        .filter(producto => producto.nombre.toLowerCase().includes(filtro))
        .forEach((producto, index) => {
            const row = document.createElement("tr");

            // Convertimos el precio a número y validamos
            let precio = Number(producto.precio);
            precio = !isNaN(precio) ? precio.toFixed(2) : "N/A";

            row.innerHTML = `
                <td>${producto.nombre}</td>
                <td>${producto.categoria}</td>
                <td>${producto.cantidad}</td>
                <td>$${precio}</td>
                <td><canvas id="codigo-${index}"></canvas></td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editarProducto(${index})">✏ Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">❌ Eliminar</button>
                </td>
            `;

            tablaProductos.appendChild(row);

            // Generar código de barras visual
            generarCodigoBarras(`codigo-${index}`, producto.codigo);
        });

    localStorage.setItem("productos", JSON.stringify(productos));
}

// Generar código de barras visual en un <canvas>
function generarCodigoBarras(canvasId, codigo) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return; // Evita errores si el canvas no se encuentra
    const ctx = canvas.getContext("2d");

    canvas.width = 150;
    canvas.height = 50;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = "16px Arial";
    ctx.fillText(codigo, 10, 20);

    for (let i = 0; i < codigo.length; i++) {
        let value = parseInt(codigo[i]);
        if (!isNaN(value)) {
            ctx.fillRect(i * 12, 30, 5, value * 2);
        }
    }
}

// Agregar producto
agregarProductoBtn.addEventListener("click", () => {
    if (!nombreProducto.value || !categoriaProducto.value || !cantidadProducto.value || !precioProducto.value) {
        return alert("Por favor, complete todos los campos.");
    }

    productos.push({
        nombre: nombreProducto.value,
        categoria: categoriaProducto.value,
        cantidad: Number(cantidadProducto.value),
        precio: Number(precioProducto.value),
        codigo: generarCodigoUnico()
    });

    mostrarProductos();
    limpiarCampos();
});

// Generar un código de barras único de 8 dígitos
function generarCodigoUnico() {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
}

// Editar producto
function editarProducto(index) {
    let nuevoNombre = prompt("Nuevo nombre:", productos[index].nombre);
    let nuevaCategoria = prompt("Nueva categoría:", productos[index].categoria);
    let nuevaCantidad = prompt("Nueva cantidad:", productos[index].cantidad);
    let nuevoPrecio = prompt("Nuevo precio:", productos[index].precio);

    if (nuevoNombre && nuevaCategoria && nuevaCantidad && nuevoPrecio) {
        productos[index] = {
            ...productos[index],
            nombre: nuevoNombre,
            categoria: nuevaCategoria,
            cantidad: Number(nuevaCantidad),
            precio: Number(nuevoPrecio)
        };
        mostrarProductos();
    }
}

// Eliminar producto
function eliminarProducto(index) {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
        productos.splice(index, 1);
        mostrarProductos();
    }
}

// Buscar productos en tiempo real
buscarProducto.addEventListener("input", () => {
    mostrarProductos(buscarProducto.value);
});

// Limpiar campos después de agregar
function limpiarCampos() {
    nombreProducto.value = "";
    categoriaProducto.value = "";
    cantidadProducto.value = "";
    precioProducto.value = "";
}

// Cargar productos guardados al iniciar
document.addEventListener("DOMContentLoaded", mostrarProductos);

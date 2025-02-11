// Elementos del DOM
const nombreProducto = document.getElementById("nombreProducto");
const precioProducto = document.getElementById("precioProducto");
const categoriaProducto = document.getElementById("categoriaProducto");
const agregarProductoBtn = document.getElementById("agregarProducto");
const tablaProductos = document.getElementById("tablaProductos");

const productoPedido = document.getElementById("productoPedido");
const cantidadPedido = document.getElementById("cantidadPedido");
const clientePedido = document.getElementById("clientePedido");
const agregarPedidoBtn = document.getElementById("agregarPedido");
const tablaPedidos = document.getElementById("tablaPedidos");

// Arrays
let productos = JSON.parse(localStorage.getItem("productos")) || [];
let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

// Mostrar productos en tabla y select de pedidos
function mostrarProductos() {
    tablaProductos.innerHTML = "";
    productoPedido.innerHTML = '<option value="">Seleccionar Producto</option>';
    
    productos.forEach((producto, index) => {
        tablaProductos.innerHTML += `
            <tr>
                <td>${producto.nombre}</td>
                <td>$${producto.precio}</td>
                <td>${producto.categoria}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button>
                </td>
            </tr>
        `;

        // Agregar al select de pedidos
        const option = document.createElement("option");
        option.value = producto.nombre;
        option.textContent = producto.nombre;
        productoPedido.appendChild(option);
    });

    localStorage.setItem("productos", JSON.stringify(productos));
}

// Agregar producto
agregarProductoBtn.addEventListener("click", () => {
    if (nombreProducto.value.trim() === "" || precioProducto.value.trim() === "") return alert("Complete los campos");

    productos.push({
        nombre: nombreProducto.value,
        precio: parseFloat(precioProducto.value),
        categoria: categoriaProducto.value
    });

    mostrarProductos();
    nombreProducto.value = "";
    precioProducto.value = "";
});

// Eliminar producto
function eliminarProducto(index) {
    productos.splice(index, 1);
    mostrarProductos();
}

// Mostrar pedidos
function mostrarPedidos() {
    tablaPedidos.innerHTML = "";
    pedidos.forEach((pedido, index) => {
        tablaPedidos.innerHTML += `
            <tr>
                <td>${pedido.producto}</td>
                <td>${pedido.cantidad}</td>
                <td>${pedido.cliente}</td>
                <td>${pedido.estado}</td>
                <td>
                    <button class="btn btn-success btn-sm" onclick="cambiarEstado(${index})">✔</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarPedido(${index})">❌</button>
                </td>
            </tr>
        `;
    });
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
}

// Agregar pedido
agregarPedidoBtn.addEventListener("click", () => {
    if (productoPedido.value === "" || cantidadPedido.value.trim() === "" || clientePedido.value.trim() === "")
        return alert("Complete los campos");

    pedidos.push({
        producto: productoPedido.value,
        cantidad: parseInt(cantidadPedido.value),
        cliente: clientePedido.value,
        estado: "Pendiente"
    });

    mostrarPedidos();
    cantidadPedido.value = "";
    clientePedido.value = "";
});

// Cambiar estado de pedido
function cambiarEstado(index) {
    pedidos[index].estado = "Enviado";
    mostrarPedidos();
}

// Eliminar pedido
function eliminarPedido(index) {
    pedidos.splice(index, 1);
    mostrarPedidos();
}

// Cargar productos desde una API falsa
fetch("https://fakestoreapi.com/products?limit=5")
    .then(res => res.json())
    .then(data => {
        productos = data.map(p => ({
            nombre: p.title,
            precio: p.price.toFixed(2),
            categoria: "Desconocida"
        }));
        mostrarProductos();
    });

// Cargar datos almacenados al iniciar
document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos();
    mostrarPedidos();
});

// Creacion de datos
const estudiantes = [
    {
        nombre: "Abel",
        edad: 23,
        curso: "RTD",
        contacto: {
            email: "ana.martinez@example.com",
            telefono: "456-789-013"
        },
        fechaMatriculacion: new Date("2023-09-04")
    },
    {
        nombre: "Fernando",
        edad: 20,
        curso: "DAM",
        contacto: {
            email: "juan.perez@example.com",
            telefono: "123-456-789"
        },
        fechaMatriculacion: new Date("2023-09-01")
    },
    {
        nombre: "Alberto",
        edad: 21,
        curso: "SMR",
        contacto: {
            email: "carlos.garcia@example.com",
            telefono: "345-678-902"
        },
        fechaMatriculacion: new Date("2023-09-03")
    },
    {
        nombre: "Juan",
        edad: 22,
        curso: "DAW",
        contacto: {
            email: "maria.lopez@example.com",
            telefono: "234-567-801"
        },
        fechaMatriculacion: new Date("2023-09-02")
    }
];

// Evento para mostrar todos los estudiantes con sus propiedades
document.getElementById('mostrarTodos').addEventListener('click', function() {
    const listaEstudiantes = document.getElementById('listaEstudiantes');
    listaEstudiantes.innerHTML = '';

    // Lo llevamos al html
    estudiantes.forEach(estudiante => {
        const li = document.createElement('li');
        li.textContent = `${estudiante.nombre}, Edad: ${estudiante.edad}, Curso: ${estudiante.curso}, Email: ${estudiante.contacto.email}, Teléfono: ${estudiante.contacto.telefono}, Fecha de Matriculación: ${estudiante.fechaMatriculacion.toLocaleDateString()}`;
        listaEstudiantes.appendChild(li);
    });
});

// Evento para mostrar los estudiantes ordenados por fecha de matriculación
document.getElementById('mostrarOrdenados').addEventListener('click', function() {
    const listaEstudiantes = document.getElementById('listaEstudiantes');
    listaEstudiantes.innerHTML = '';

    // Ordenamos
    const estudiantesOrdenados = estudiantes.slice().sort((a, b) => a.fechaMatriculacion - b.fechaMatriculacion);

    // Llevamos solo al html los nombre
    estudiantesOrdenados.forEach(estudiante => {
        const li = document.createElement('li');
        li.textContent = estudiante.nombre;
        listaEstudiantes.appendChild(li);
    });
});

// Evento para cambiar el filtro de búsqueda y mostrar el campo de entrada correspondiente
document.getElementById('filtro').addEventListener('change', function() {
    const filtro = this.value;
    document.querySelectorAll('.busqueda').forEach(div => div.style.display = 'none');
    document.getElementById(`busqueda${filtro.charAt(0).toUpperCase() + filtro.slice(1)}`).style.display = 'block';
});

// Evento para buscar estudiantes según el filtro seleccionado
document.getElementById('buscarEstudiantes').addEventListener('click', function() {
    const filtro = document.getElementById('filtro').value;
    const valor = document.getElementById(filtro).value.toLowerCase();
    const listaEstudiantes = document.getElementById('listaEstudiantes');
    listaEstudiantes.innerHTML = '';

    // Filtrar estudiantes según el filtro y valor de búsqueda
    const estudiantesFiltrados = estudiantes.filter(estudiante => {
        if (filtro === 'nombre') {
            return estudiante.nombre.toLowerCase().includes(valor);
        } else if (filtro === 'edad') {
            return estudiante.edad == valor;
        } else if (filtro === 'curso') {
            return estudiante.curso.toLowerCase().includes(valor);
        }
    });

    // Mostrar los estudiantes filtrados en la lista
    estudiantesFiltrados.forEach(estudiante => {
        const li = document.createElement('li');
        li.textContent = `${estudiante.nombre}, Edad: ${estudiante.edad}, Curso: ${estudiante.curso}, Email: ${estudiante.contacto.email}, Teléfono: ${estudiante.contacto.telefono}, Fecha de Matriculación: ${estudiante.fechaMatriculacion.toLocaleDateString()}`;
        listaEstudiantes.appendChild(li);
    });
});

// Evento para registrar un nuevo estudiante
document.getElementById('registrarEstudiante').addEventListener('click', function() {
    const nombre = document.getElementById('nombreInput').value;
    const edad = document.getElementById('edadInput').value;
    const curso = document.getElementById('cursoRegistro').value;
    const email = document.getElementById('emailInput').value;
    const telefono = document.getElementById('telefonoInput').value;
    const fechaMatriculacion = new Date(document.getElementById('fechaMatriculacionInput').value);

    const fechaActual = new Date();
    const fechaMinima = new Date("2024-07-01");

    // Validar que todos los campos estén llenos
    if (!nombre || !edad || !curso || !email || !telefono || !fechaMatriculacion) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    // Validar que la fecha de matriculación esté en el rango permitido
    if (fechaMatriculacion < fechaMinima || fechaMatriculacion > fechaActual) {
        alert('La fecha de matriculación debe ser posterior al 01/07/2024 y anterior al día actual.');
        return;
    }

    // Validar que el teléfono tenga exactamente 9 dígitos y solo contenga números
    if (!/^\d{9}$/.test(telefono)) {
        alert('El teléfono debe tener exactamente 9 dígitos y solo contener números.');
        return;
    }

    // Formatear el teléfono con guiones
    const telefonoFormateado = telefono.replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3');

    // Crear un nuevo objeto de estudiante
    const nuevoEstudiante = {
        nombre: nombre,
        edad: parseInt(edad),
        curso: curso,
        contacto: {
            email: email,
            telefono: telefonoFormateado
        },
        fechaMatriculacion: fechaMatriculacion
    };

    // Añadir el nuevo estudiante al array de estudiantes
    estudiantes.push(nuevoEstudiante);

    alert('Estudiante registrado exitosamente');
});

// Evento para permitir solo números en el campo de teléfono
document.getElementById('telefonoInput').addEventListener('input', function(e) {
    this.value = this.value.replace(/\D/g, '');
});
window.onload = () => {
    document.querySelector("#btn1").addEventListener("click", mostrarEstudiantes);
    document.querySelector("#filterBtn").addEventListener("click", filtrosEstudiantes);
    document.querySelector("#registerBtn").addEventListener("click", resgistroEstudiantes);
}

const mostrarEstudiantes = () => {
    let ordenados = estudiantes.sort((a, b) => a.fechaRegistro - b.fechaRegistro);
    let estu = "";

    ordenados.forEach(estudiante => {
        estu += `Nombre: ${estudiante.nombre}, Edad: ${estudiante.edad}, Cursos: ${estudiante.curso.join(", ")}, Contacto: ${estudiante.contacto.join(", ")}, Fecha de Registro: ${estudiante.fechaRegistro.toDateString()}<br>`;
    });

    document.querySelector("#mostrar").innerHTML = estu;
}

const filtrosEstudiantes = () => {
    const tipo = document.querySelector("#tipo").value;
    const fil = document.querySelector("#fil").value.toLowerCase();
    let filteredEstudiantes = estudiantes.filter(estudiante => {
        if (tipo === "nombre") {
            return estudiante.nombre.toLowerCase().includes(fil);
        } else if (tipo === "edad") {
            return estudiante.edad == fil;
        } else if (tipo === "curso") {
            return estudiante.curso.some(curso => curso.toLowerCase().includes(fil));
        }
    });

    let estu = "";
    filteredEstudiantes.forEach(estudiante => {
        estu += `Nombre: ${estudiante.nombre}, Edad: ${estudiante.edad}, Cursos: ${estudiante.curso.join(", ")}, Contacto: ${estudiante.contacto.join(", ")}, Fecha de Registro: ${estudiante.fechaRegistro.toDateString()}<br>`;
    });

    document.querySelector("#mostrar").innerHTML = estu;
}

const resgistroEstudiantes = () => {
    const nombre = document.querySelector("#nombre").value;
    const edad = document.querySelector("#edad").value;
    const curso = document.querySelector("#curso").value;
    const email = document.querySelector("#email").value;
    const numero = document.querySelector("#numero").value;

    if (nombre && edad && curso && email && numero) {
        estudiantes.push({
            nombre: nombre,
            edad: parseInt(edad),
            curso: [curso],
            contacto: [email, numero],
            fechaRegistro: new Date()
        });
        alert("Estudiante registrado exitosamente");
        document.querySelector("#registerForm").reset();
    } else {
        alert("Por favor, complete todos los campos");
    }
}
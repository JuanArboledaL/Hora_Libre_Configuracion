window.onload = () => {
    poblateTable();
}

const poblateTable = () => {
    let table = document.querySelector("#table");
    let nuevo = "";

    animals.forEach((animal, index) => {
        nuevo += `<tr id="row${index}">
        <td>${animal.name}</td>
        <td>${animal.species}</td>
        <td>${animal.foods.likes}</td>
        <td>${animal.foods.dislikes}</td>
        <td><button type="button" class="btn-outline-secondary" onClick="editarBtn(${index})">Editar</button></td>
        </tr>`
    });

    table.innerHTML += nuevo;
}

function editarBtn(index){
    // Resetear el formulario
    const form = document.querySelector("#form");
    form.reset();

    // Deseleccionar la fila anterior
    const previousRow = document.getElementsByClassName("table-success");
    if(previousRow.length != 0) {
        previousRow[0].classList.remove("table-success");
    }
    
    // Seleccionar la nueva fila
    const row = document.querySelector(`#row${index}`);
    row.classList.add("table-success");

    // Añadir nombre del animal al form
    const nameField = document.querySelector("#txtName");
    nameField.value = animals[index].name;

    // Poblar select
    const optField = document.querySelector("#selectRaza select");
    if (animals[index].species == "cat") {
        optField.innerHTML =
        `<option value="" disabled selected>-- Raza --</option>
        <option value="burnes" id="catBurnes">Burnés</option>
        <option value="siames" id="catSiames">Siamés</option>
        <option value="esfinge" id="catEsfinge">Esfinge</option>`

    } else {
        optField.innerHTML =
        `<option value="" disabled selected>-- Raza --</option>
        <option value="labrador" id="dogLabrador">Labrador</option>
        <option value="samoyedo" id="dogSamoyedo">Samoyedo</option>
        <option value="pug" id="dogBulldog">Pug</option>`

    }

    const requiredFields = ['raza', 'sexo', 'peso', 'diagnostico', 'revision'];
    const haveAllFields = requiredFields.every(field => field in animals[index]);

    // Trasladar raza y sexo del animal al formulario
    if (haveAllFields) {
        optField.value = animals[index].raza;

        if (animals[index].sexo == "hembra") {
            document.getElementById('hembra').checked = true;

        } else {
            document.getElementById('macho').checked = true;
        }
    }

    // Poblar JSON
    actualizarJson(index);
}

function actualizarJson(index) {
    const jsonData = document.querySelector("#insJson");
    jsonData.innerHTML = `<pre>${JSON.stringify(animals[index], null, 2)}</pre>`;
}

function guardarDatos() {
    let breed;
    let sex;
    let weight;
    let revision = [];
    let diagnostic;

    // Comprobar si se ha seleccionado alguna mascota
    const mascotName = document.querySelector("#txtName");
    if (mascotName.value != "") {
        // Comprobar si se ha seleccionado una raza y guardarla
        const optField = document.querySelector("#selectRaza select");
        if (optField.value.length != 0) {
            breed = optField.value;
            
        } else {
            alert("Seleccione una raza.");
            
        }

        // Comprobar si se ha seleccionado el género y guardarlo
        const sexField = document.querySelector('input[name="sexo"]:checked');
        if (sexField) {
            sex = sexField.value;
        
        } else {
            alert("Seleccione el sexo");

        }

        // Peso
        const weightField = document.querySelector("#txtPeso");
        if (weightField.value != "") {
            weight = weightField.value;

        } else {
            alert("Introduzca el peso");

        }
        
        // Guardamos diagnostico
        const diagnosticField = document.querySelector("#diagnostico");
        if (diagnosticField.value != "") {
            diagnostic = diagnosticField.value;

        } else {
            alert("Introduzca el diagnóstico");
        }

        // Guardamos las partes a revisar
        const chBxRev = document.querySelectorAll('input[name="revision"]:checked');
        if (chBxRev.length != 0) {
            chBxRev.forEach(chBox => {
                revision.push(chBox.value);
            });

        } else {
            alert("Introduzca al menos una parte a revisar");

        }

        // Guardamos los datos y poblamos el JSON
        let index = animals.findIndex(animal => animal.name === mascotName.value);

        if (breed.length != 0 && sex != "" && weight != "" && diagnostic.length != 0 && revision.length != 0) {
            animals[index].raza = breed;
            animals[index].sexo = sex;
            animals[index].peso = weight;
            animals[index].diagnostico = diagnostic;
            animals[index].revision = revision;
        }
        
        actualizarJson(index);

    } else {
        alert("Seleccione a un animal, por favor.");
    }
}

// Sustituir caracteres no deseados en el input de peso
const weightField = document.querySelector("#txtPeso");

weightField.addEventListener('input', function() {
    let value = weightField.value.replace(/[^\d]/g, ''); // Elimina caracteres no numéricos

    if (value.length > 2) {
        value = value.slice(0, 2) + '.' + value.slice(2, 4); // Inserta el punto decimal después de dos dígitos
    }

    weightField.value = value;
});
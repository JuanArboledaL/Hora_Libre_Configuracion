const form = document.getElementById("form");
const weightInput = document.getElementById("weightInput");
const nameInput = document.getElementById("nameInput");
const speciesMenu = document.getElementById("speciesMenu");
const breedMenu = document.getElementById("breedMenu");
const diseasesTextarea = document.getElementById("diseasesTextarea");
const vaccinesSelect = document.getElementById("vaccinesSelect");
const sexRadios = document.getElementsByName("sexRadio");
const saveButton = document.getElementById("saveButton");
const objectInfo = document.getElementById("objectInfo");

let animalsArray = [
    { name: "Lola", species: "vaca", breeds: ["Holstein", "Jersey", "Hereford"], breed: "", sex: "", weight: "", diseases: "", vaccines: [] },
    { name: "Relámpago", species: "caballo", breeds: ["Árabe", "Pura Sangre", "Percherón"], breed: "", sex: "", weight: "", diseases: "", vaccines: [] },
    { name: "Dolly", species: "oveja", breeds: ["Merina", "Suffolk", "Dorper"], breed: "", sex: "", weight: "", diseases: "", vaccines: [] },
    { name: "Pipoca", species: "gallina", breeds: ["Rhode Island", "Leghorn", "Brahma"], breed: "", sex: "", weight: "", diseases: "", vaccines: [] }
];

let currentAnimalIndex = null;

window.onload = function () {
    loadAnimals();
};

function loadAnimals() {
    let animalsList = `<tr><th>Nombre</th><th>Especie</th><th>Raza</th><th>Peso</th><th>Sexo</th><th>Acción</th></tr>`;
    animalsArray.forEach((animal, index) => {
        animalsList += `<tr>
            <td>${animal.name}</td>
            <td>${animal.species}</td>
            <td>${animal.breed || "-"}</td>
            <td>${animal.weight || "-"}</td>
            <td>${animal.sex || "-"}</td>
            <td><button class="btn btn-sm btn-info" onclick="editAnimal(${index})">Editar</button></td>
        </tr>`;
    });
    document.getElementById("animalsTable").innerHTML = animalsList;
}

function editAnimal(index) {
    resetForm(); // 🔄 Reseteamos el formulario antes de cargar nuevos datos

    currentAnimalIndex = index;
    let animal = animalsArray[index];

    nameInput.value = animal.name;
    speciesMenu.value = animal.species;
    updateBreedMenu(animal.species, animal.breeds);

    if (animal.breed) breedMenu.value = animal.breed;
    if (animal.weight) weightInput.value = animal.weight;
    if (animal.diseases) diseasesTextarea.value = animal.diseases;

    if (animal.sex) {
        Array.from(sexRadios).forEach(radio => {
            if (radio.value === animal.sex) radio.checked = true;
        });
    }

    if (animal.vaccines.length) {
        Array.from(vaccinesSelect.options).forEach(option => {
            option.selected = animal.vaccines.includes(option.value);
        });
    }
}

speciesMenu.addEventListener("change", function () {
    let selectedSpecies = speciesMenu.value;
    let selectedAnimal = animalsArray.find(animal => animal.species === selectedSpecies);
    if (selectedAnimal) {
        updateBreedMenu(selectedSpecies, selectedAnimal.breeds);
    }
});

function updateBreedMenu(species, breeds) {
    breedMenu.innerHTML = `<option value="">- Seleccionar raza -</option>`;
    breeds.forEach(breed => {
        breedMenu.innerHTML += `<option value="${breed}">${breed}</option>`;
    });
}

// 🔄 Función para resetear el formulario antes de editar un nuevo animal
function resetForm() {
    form.reset();
    speciesMenu.value = "";
    breedMenu.innerHTML = `<option value="">- Seleccionar raza -</option>`;
    Array.from(sexRadios).forEach(radio => radio.checked = false);
    objectInfo.innerHTML = "";
}

// ✅ Guardar los cambios en el array y actualizar la tabla
saveButton.addEventListener("click", () => {
    if (currentAnimalIndex === null) return;

    if (!speciesMenu.value || !breedMenu.value || !weightInput.value) {
        alert("Por favor, complete todos los campos obligatorios.");
        return;
    }

    let selectedSex = Array.from(sexRadios).find(radio => radio.checked)?.value;
    let selectedVaccines = Array.from(vaccinesSelect.selectedOptions).map(option => option.value);

    // 🔄 Guardamos los cambios en el array de animales
    animalsArray[currentAnimalIndex] = {
        ...animalsArray[currentAnimalIndex],
        breed: breedMenu.value,
        sex: selectedSex,
        weight: weightInput.value,
        diseases: diseasesTextarea.value,
        vaccines: selectedVaccines
    };

    objectInfo.innerHTML = `<pre>${JSON.stringify(animalsArray[currentAnimalIndex], null, 2)}</pre>`;

    // 🔄 Actualizamos la tabla de animales en la interfaz
    loadAnimals();

    // 🔄 Reseteamos el formulario después de guardar
    resetForm();
});

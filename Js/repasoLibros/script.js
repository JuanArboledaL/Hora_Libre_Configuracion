let table="";

for(let index = 0; index < libros.length; index++){

    table += "<tr>";
    table += "<td>" + libros[index].title + "</td>";
    table += "<td>" + libros[index].genre + "</td>";
    table += "<td>" + libros[index].author + "</td>";
    table += "<td>" + libros[index].pages + "</td>";
    table += "<td>" + libros[index].datePublished + "</td>";
    table += "<td>" + libros[index].read + "</td>";
    table += "<td><a href\"" + libros[index].webSite + "\">" + libros[index].title +"</td>";
    table += "</tr>";
}

const list = document.querySelector(".body");
list.innerHTML = table;

window.onload=()=>{

    document.querySelector("#generos").addEventListener("click",getGeneros);
    document.querySelector("#leidos").addEventListener("click",getLeidos);
    
}

const getGeneros = ()=> {
    let conjuntoGeneros = new Set();
    let generos = "";

    libros.forEach(b=> conjuntoGeneros.add(b.genre));

    conjuntoGeneros.forEach(g=> generos += `${g}<br>`);
    
    document.querySelector(".resultados").innerHTML = generos;
}

const getLeidos = () => {
    let leidos = "";

    libros.filter(b => b.read).sort((a, b) => 
    a.pages > b.pages ? 1 : -1).forEach(b => leidos += `${b.title} ${b.pages}<br>`)

    document.querySelector(".resultados").innerHTML = leidos;
}

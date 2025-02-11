const libros = 
[
    {
      title: "Cien años de soledad",
      genre: "Realismo",
      authors: ["Gabriel García Márquez"],
      pages: 471,
      published: "1967-06-05",
      read: true,
      website: "https://www.cienanosdesoledad.com"
    },
    {
      title: "Don Quijote de la Mancha",
      genre: "Aventuras",
      authors: ["Miguel de Cervantes"],
      pages: 1262,
      published: "1605-01-16",
      read: true,
      website: "https://cervantesvirtual.com/portales/don_quijote/"
    },
    {
      title: "La sombra del viento",
      genre: "Misterio",
      authors: ["Carlos Ruiz Zafón"],
      pages: 576,
      published: "2001-04-12",
      read: true,
      website: "https://www.carlosruizzafon.com"
    },
    {
      title: "Crónica de una muerte anunciada",
      genre: "Misterio",
      authors: ["Gabriel García Márquez"],
      pages: 122,
      published: "1981-03-15",
      read: true,
      website: ""
    },
    {
      title: "Rayuela",
      genre: "Surrealismo",
      authors: ["Julio Cortázar"],
      pages: 736,
      published: "1963-06-28",
      read: true,
      website: "https://www.juliocortazar.com"
    },
    {
      title: "La casa de los espíritus",
      genre: "Realismo",
      authors: ["Isabel Allende"],
      pages: 496,
      published: "1982-10-15",
      read: false,
      website: "https://www.isabelallende.com/es/book/la-casa-de-los-espiritus"
    },
    {
      title: "El amor en los tiempos del cólera",
      genre: "Romance",
      authors: ["Gabriel García Márquez"],
      pages: 348,
      published: "1985-09-05",
      read: true,
      website: ""
    },
    {
      title: "Pedro Páramo",
      genre: "Realismo",
      authors: ["Juan Rulfo"],
      pages: 124,
      published: "1955-03-19",
      read: false,
      website: "https://www.fundacionjuanrulfo.org"
    },
    {
      title: "Los detectives salvajes",
      genre: "Contemporánea",
      authors: ["Roberto Bolaño"],
      pages: 609,
      published: "1998-11-22",
      read: false,
      website: "https://www.robertobolano.com"
    },
    {
      title: "Ficciones",
      genre: "Fantasía",
      authors: ["Jorge Luis Borges"],
      pages: 174,
      published: "1944-05-14",
      read: true,
      website: ""
    },
    {
      title: "Sapiens: De animales a dioses",
      genre: "Historia",
      authors: ["Yuval Noah Harari", "Ricardo Artola", "Joan Llinares"],
      pages: 496,
      published: "2011-09-04",
      read: false,
      website: ""
    },
    {
      title: "LibroActual",
      genre: "Actualidad",
      authors: ["Jorge Peñalver"],
      pages: 1,
      published: "2024-10-10",
      read: true,
      website: ""
    }
];

window.onload = () => {


  let cuerpo = document.querySelector(".tableL");
  let tabla = "";
  libros.forEach(element => {

    tabla += "<tr><td class=\"titulo\">" + element.title + "</td><td>" + element.genre + "</td><td>" + element.authors + "</td><td>" + element.pages + "</td><td>" + element.published + "</td><td>" + element.read + "</td><td><a href=\"" + element.website + "\">" + element.website + "<a></td></tr>";

  })
  cuerpo.innerHTML = tabla;

  const resetearColor = () => {
    const titulo = cuerpo.querySelectorAll('.titulo');
    titulo.forEach(titulo => titulo.style.backgroundColor = '');
  };
  
  const listaGeneros = () => {

    resetearColor();

    let cadena = "<table class=\"table table-bordered\"><thead class=\"table-dark\"><tr><th>Lista de generos:</th></tr></thead>";
    let generos = [];
    generos = libros.forEach(element => {
      if(!generos.includes(element.genre)) {
        generos.push(element.genre);
        cadena += "<tr><td>" + element.genre + "</td></tr>";
    
      }
    })
    cadena += "</table>";
    
    divResultado.innerHTML = cadena;
  };

  const librosPorAutor = () => {

    resetearColor();

    let autoresSinRepetir = [];
    libros.forEach(element => {
      element.authors.forEach(element2 => {
        if(!autoresSinRepetir.includes(element2)) {
          autoresSinRepetir.push(element2);
        }
      })
    })

    let cadena = "<table class=\"table table-bordered\"><thead class=\"table-dark\"><tr><th>Autor</th><th>Nº Libros</th></tr></thead>";
    let numlibros = 0;

    autoresSinRepetir.forEach(element => {
      numlibros = 0;
      cadena += "<tr><td>" + element + "</td>";
      libros.forEach(element2 =>  {
        element2.authors.forEach(element3 => {

          if (element == element3) {
            numlibros++;
          }

        })
      })
      cadena += "<td>"+ numlibros + "</td></tr>";        
    })
    cadena += "</table>";
    divResultado.innerHTML = cadena;
  };

  const librosLeidosPorFecha = () => {

    resetearColor();

    let librosOrdenados = [...libros];
    librosOrdenados = librosOrdenados.filter(element => element.read).sort((element1, element2) => {

      if (element1.published == element2.published) {
        return 0;
      }
      else if(element1.published > element2.published) {
        return 1;
      } else {
        return -1;
      }

    })

    let cadena = "<table class=\"table table-bordered\"><thead class=\"table-dark\"><tr><th>Libros leidos</th></tr></thead>";
    
    librosOrdenados.forEach(element => {
      cadena += "<tr><td>" + element.title + "</td></tr>";
    })
    cadena += "</table>";
    divResultado.innerHTML = cadena;
  };

  const librosMas300Pag = () => {

    resetearColor();

    let librosOrdenados = [...libros];
    librosOrdenados = librosOrdenados.filter(element => element.pages > 300)

    const titles = cuerpo.querySelectorAll('.titulo');
    titles.forEach(title => {
        librosOrdenados.forEach(libro => {
          if(title.textContent === libro.title) {
            title.style.backgroundColor = 'lightblue'
          } 
        })    
    });

    let cadena = "<table class=\"table table-bordered\"><thead class=\"table-dark\"><tr><th>Libros más 300 páginas</th></tr></thead>";
    
    librosOrdenados.forEach(element => {
      cadena += "<tr><td>" + element.title + "</td></tr>";
    })
    cadena += "</table>";
    divResultado.innerHTML = cadena;
  };

  const librosMas2Anyos = () => {
    
    resetearColor();

    const librosAntiguos = libros.filter(element => {

      return new Date(element.published).getFullYear().valueOf() < (new Date(Date.now()).getFullYear().valueOf() - 2);
    });

    const titles = cuerpo.querySelectorAll('.titulo');
    titles.forEach(title => {
        librosAntiguos.forEach(libro => {
          if(title.textContent === libro.title) {
            title.style.backgroundColor = 'lightblue'
          } 
        })    
    });

    let cadena = "<table class=\"table table-bordered\"><thead class=\"table-dark\"><tr><th>Libros de hace más de 2 años</th></tr></thead>";
    
    librosAntiguos.forEach(element => {
      cadena += "<tr><td>" + element.title + "</td></tr>";
    })
    cadena += "</table>";
    divResultado.innerHTML = cadena;
  };


  document.querySelector(".uno").addEventListener("click", listaGeneros);
  document.querySelector(".dos").addEventListener("click", librosPorAutor);
  document.querySelector(".tres").addEventListener("click", librosLeidosPorFecha);
  document.querySelector(".cuatro").addEventListener("click", librosMas300Pag);
  document.querySelector(".cinco").addEventListener("click", librosMas2Anyos);

  divResultado = document.querySelector(".resultado");
  
  

}


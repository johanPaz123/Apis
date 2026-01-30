const btnGenerar = document.getElementById("btnGenerar");
const filtroGenero = document.getElementById("filtroGenero");
const galeria = document.getElementById("galeria");

let listaUsuarios = [];

async function cargarUsuarios() {
  try {
    galeria.innerHTML = "<p>Cargando usuarios...</p>";
    const respuesta = await fetch("https://randomuser.me/api/?results=10");
    const datos = await respuesta.json();

    listaUsuarios = datos.results;
    mostrarUsuarios(listaUsuarios);
  } catch (error) {
    galeria.innerHTML = "<p>Error al conectar con la API</p>";
  }
}

function mostrarUsuarios(usuarios) {
  galeria.innerHTML = "";

  if (usuarios.length === 0) {
    galeria.innerHTML = "<p>No hay usuarios que coincidan con el filtro.</p>";
    return;
  }

  usuarios.forEach((user) => {
    const card = document.createElement("div");
    card.className = "user-card";

    card.innerHTML = `
            <img src="${user.picture.large}" alt="${user.name.first}">
            <h3>${user.name.first} ${user.name.last}</h3>
            <p>${user.email}</p>
            <span class="gender-tag ${user.gender}">
                ${user.gender === "male" ? "Hombre" : "Mujer"}
            </span>
        `;
    galeria.appendChild(card);
  });
}

btnGenerar.addEventListener("click", cargarUsuarios);

filtroGenero.addEventListener("change", () => {
  const valor = filtroGenero.value;

  if (valor === "all") {
    mostrarUsuarios(listaUsuarios);
  } else {
    const filtrados = listaUsuarios.filter((u) => u.gender === valor);
    mostrarUsuarios(filtrados);
  }
});

const btnGenerar = document.getElementById("generar");
const divUsuarios = document.getElementById("usuarios");
const selectUsuarios = document.getElementById("cantidadUsuarios");

selectUsuarios.addEventListener("change", function () {
  const cantidad = selectUsuarios.value.trim();
  btnGenerar.addEventListener("click", function (e) {
    e.stopPropagation()
    generarUsuarios(cantidad);
  });
});

async function generarUsuarios(cantidad) {
  divUsuarios.innerHTML = "<p>Cargando...</p>";

  const url = `https://randomuser.me/api/?results=${cantidad}`;

  try {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(
        `Error al obtener los datos  (Error: ${response.status})`
      );
    const data = await response.json();

    mostrarUsuarios(data.results);
  } catch (err) {
    divUsuarios.innerHTML = `<p class="error">${err.message}</p>`;
  }
}

function mostrarUsuarios(usuarios) {
  divUsuarios.innerHTML = "";

  usuarios.forEach((user) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
            <img src="${user.picture.large}" alt="${user.name.first}">
            <h3>${user.name.first} ${user.name.last}</h3>
            <p>${user.email}</p>
            <p>${user.location.city}, ${user.location.country}</p>
            <p><strong>${user.phone}</strong></p>
        `;
    divUsuarios.appendChild(card);
  });
}

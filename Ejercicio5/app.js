async function obtenerUsuarios(num = 5) {
  const url = `https://randomuser.me/api/?results=${num}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error al obtener los usuarios");
    }
    const data = await response.json();

    return data.results;
  } catch (err) {
    console.error("Error: " + err.message);
    return [];
  }
}

async function filtrarUsuariosGenero(gender = "male"){
    const usuarios  = await obtenerUsuarios(10);
    const usuariosFiltrados = usuarios.filter(u => u.gender === gender);

    return usuariosFiltrados;
}

obtenerUsuarios(5).then((usuarios) => {
    usuarios.forEach((user) => {
        console.log(`${user.name.first} ${user.name.last} - ${user.email} - Ciudad: ${user.location.city}`);
    });
})


filtrarUsuariosGenero("male").then(hombres => {
    console.log("")
    hombres.forEach(h=>{
        console.log(`Nombre: ${h.name.first} ${h.name.last} Ciudad: ${h.location.city} Genero: ${h.gender}`);
    })
})
import {ACCESS_KEY} from "../config.js"
const inputUsuario = document.getElementById("query");
const btnBuscar = document.getElementById("btnBuscar");
const galeria = document.getElementById("galeria");

btnBuscar.addEventListener('click', function(){
    const termino = inputUsuario.value.trim();

    if(!termino){
        alert("Debes ingreara un termino antes de buscar");
        return;
    }

    buscarImagenes(termino);
})


async function buscarImagenes(termino) {
  const url = `https://api.unsplash.com/search/photos?query=${termino}&client_id=${ACCESS_KEY}&per_page=10`;

  try {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(
        `Error al buscar las imagenes (Err0r: ${response.status})`
      );
    const data = await response.json();
    mostrarImagenes(data.results);
  } catch (err) {
    console.error("Error: ", err.message);
    return [];
  }
}

function mostrarImagenes(imagenes) {
  galeria.innerHTML = "";
  imagenes.forEach((img) => {
    const itemImagen = document.createElement("div");
    itemImagen.className = "item-imagen";
    itemImagen.innerHTML = `
        <img src="${img.urls.small}" alt="${img.alt_description}">
    `
    galeria.appendChild(itemImagen);
  });
}

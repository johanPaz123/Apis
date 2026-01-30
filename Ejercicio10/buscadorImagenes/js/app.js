import { API_KEY_UNSPLASH } from "../../../config.js";

const inputBusqueda = document.getElementById("inputBusqueda");
const btnBuscar = document.getElementById("btnBuscar");
const galeria = document.getElementById("galeria");

async function buscarFotos() {
  const query = inputBusqueda.value.trim();
  if (query === "") return;

  galeria.innerHTML = "<p class='msg'>Buscando inspiración...</p>";

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=12&client_id=${API_KEY_UNSPLASH}`
    );
    const data = await response.json();

    pintarGaleria(data.results);
  } catch (error) {
    galeria.innerHTML =
      "<p class='msg'>Error al cargar las imágenes. Verifica tu API Key.</p>";
  }
}

function pintarGaleria(fotos) {
  galeria.innerHTML = ""; // Limpiar

  if (fotos.length === 0) {
    galeria.innerHTML =
      "<p class='msg'>No encontramos nada para esa búsqueda.</p>";
    return;
  }

  fotos.forEach((foto) => {
    const imgElement = document.createElement("img");
    imgElement.src = foto.urls.small;
    imgElement.alt = foto.alt_description;
    imgElement.className = "img-item";

    // Requerimiento: Abrir links.html en nueva pestaña al hacer clic
    imgElement.addEventListener("click", () => {
      window.open(foto.links.html, "_blank");
    });

    galeria.appendChild(imgElement);
  });
}

// Eventos
btnBuscar.addEventListener("click", buscarFotos);
inputBusqueda.addEventListener("keypress", (e) => {
  if (e.key === "Enter") buscarFotos();
});

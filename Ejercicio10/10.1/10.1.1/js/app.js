import {API_KEY_OPEN_WEATHER} from "../../../../config.js"

const inputUsuario = document.getElementById("ciudad");
const btnBuscar = document.getElementById("btnBuscar");
const contenedorInformacion = document.getElementById("informacion");


btnBuscar.addEventListener('click', function() {
    const ciudad = inputUsuario.value.trim();

    if(ciudad === ""){
        alert("El campo ciudad es obligatorio");
        return;
    }

    buscarClima(ciudad);
})


async function buscarClima(ciudad) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY_OPEN_WEATHER}`;

  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error("Hubo un error al recuperar los datos");

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

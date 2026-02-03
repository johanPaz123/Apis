import { API_KEY_OPEN_WEATHER } from "../../../config.js";
import { guardarCiudadesArray } from "./guardarCiudades.js";
import { mensajesError } from "./mensajesError.js";

const inputUsuario = document.getElementById("ciudad");
const btnBuscar = document.getElementById("btnBuscar");
const contenedorInformacion = document.getElementById("informacion");
const contenedorHistorial = document.getElementById("historialCiudades");

let ciudadesArray = JSON.parse(localStorage.getItem("ciudades")) || [];
crearBotonesHistorial();
contenedorInformacion.innerHTML = `<h2>Sin Datos</h2>`;

btnBuscar.addEventListener("click", function () {
  const ciudad = inputUsuario.value.trim();

  if (ciudad === "") {
    contenedorInformacion.innerHTML = `<h2>Sin Datos</h2>`;
    alert("El campo ciudad es obligatorio");
    return;
  }
  buscarClima(ciudad);
});

function pintarInformacion(clima) {
  const nombreCiudad = clima.name;
  const temp = Math.round(clima.main.temp);
  const descripcion = clima.weather[0].description;
  const icono = clima.weather[0].icon;
  const iconoUrl = `https://openweathermap.org/img/wn/${icono}@2x.png`;

  contenedorInformacion.innerHTML = `
    <h2>${nombreCiudad}</h2>
    <img src="${iconoUrl}" alt="${descripcion}">
    <p class="temp">${temp}</p>
    <p class="desc">${descripcion}</p>
  `;
}

function crearBotonesHistorial() {
  contenedorHistorial.innerHTML = "";
  ciudadesArray.forEach((ciudad) => {
    const boton = document.createElement("button");
    boton.textContent = ciudad;
    boton.classList.add("btn-historial");

    boton.addEventListener("click", function () {
      buscarClima(ciudad);
    });
    contenedorHistorial.appendChild(boton);
  });
}

function guardarLocalStorage() {
  localStorage.setItem("ciudades", JSON.stringify(ciudadesArray));
}

async function buscarClima(ciudad) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY_OPEN_WEATHER}&units=metric&lang=es`;

  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(response.status);

    const data = await response.json();

    pintarInformacion(data);
    guardarCiudadesArray(ciudadesArray, data.name);
    guardarLocalStorage();
    crearBotonesHistorial();
  } catch (error) {
    mensajesError(error.message, contenedorInformacion)
  }
}

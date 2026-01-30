/*
 ********************************
 *         COMPARADOR
 ********************************
 */

import { API_KEY_OPEN_WEATHER } from "../../../config.js";

const inputBuscarCiudad1 = document.getElementById("ciudad1");
const inputBuscarCiudad2 = document.getElementById("ciudad2");
const btnComparar = document.getElementById("btnComparar");

const info1 = document.getElementById("info1");
const info2 = document.getElementById("info2");
const resultadoTexto = document.getElementById("resultado-comparacion");

btnComparar.addEventListener("click", async function () {
  const ciudades = validarDatos();

  if (ciudades) {
    const clima1 = await buscarClima(ciudades.ciudad1);
    const clima2 = await buscarClima(ciudades.ciudad2);

    if (clima1 && clima2) {
      pintarInformacion(clima1, info1);
      pintarInformacion(clima2, info2);

      compararTemperaturas(clima1, clima2);
    }
  }
});

function validarDatos() {
  let ciudad1 = inputBuscarCiudad1.value.trim();
  let ciudad2 = inputBuscarCiudad2.value.trim();

  if (ciudad1 === "" || ciudad2 === "") {
    alert("Debes introducir AMBAS ciudades para poder comparar");
    return null;
  }
  return {
    ciudad1,
    ciudad2,
  };
}

function pintarInformacion(clima, contenedor) {
  const nombreCiudad = clima.name;
  const temp = Math.round(clima.main.temp);
  const descripcion = clima.weather[0].description;
  const icono = clima.weather[0].icon;
  const iconoUrl = `https://openweathermap.org/img/wn/${icono}@2x.png`;

  contenedor.className = "card";

  contenedor.innerHTML = `
    <h2>${nombreCiudad}</h2>
    <img src="${iconoUrl}" alt="${descripcion}">
    <p class="temp">${temp}</p>
    <p class="desc">${descripcion}</p>
  `;
}

function compararTemperaturas(ciudad1, ciudad2) {
  const temp1 = ciudad1.main.temp;
  const temp2 = ciudad2.main.temp;

  info1.classList.remove("ganador");
  info2.classList.remove("ganador");

  if (temp1 > temp2) {
    info1.classList.add("ganador");
    resultadoTexto.innerText = `${ciudad1.name} es mas calurosa que ${ciudad2.name}`;
  } else if (temp2 > temp1) {
    info2.classList.add("ganador");
    resultadoTexto.innerText = `${ciudad2.name} es mas calurosa que ${ciudad1.name}`;
  } else
    resultadoTexto.innerText = "¡Amas ciudades tienen la misma temperatura!";
}

async function buscarClima(ciudad) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY_OPEN_WEATHER}&units=metric&lang=es`;

  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error("Hubo un error al recolectar los datos");

    return await response.json();
  } catch (error) {
    alert(error.message);
    return null;
  }
}

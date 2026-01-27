const API_KEY = "1ff11a55bf2c1927c1dcb0d0146266da";

const inputCiudad = document.getElementById("ciudad");
const btnBuscar = document.getElementById("buscar");
const btnActualizar = document.getElementById("actualizar");
const btnLimpiar = document.getElementById("limpiar");
const btnDetener = document.getElementById("detener");
const divResultado = document.getElementById("resultado");
const divMensaje = document.getElementById("mensaje");
const spanSegundos = document.getElementById("segundos");
const contContainer = document.getElementById("contador-container");

let intervaloBusqueda;
let intervaloVisual;
let tiempoRestante = 10;

async function obtenerClima(ciudad) {
  divMensaje.textContent = "Actualizando...";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Ciudad no encontrada");
    const data = await response.json();
    divMensaje.textContent = "";
    mostrarClima(data);
    resetearContadorVisual(); 
  } catch (err) {
    divMensaje.textContent = "Error: " + err.message;
    detenerTodo();
  }
}

function mostrarClima(datos) {
  const { name, main: { temp, humidity }, weather, wind } = datos;
  const iconoUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  divResultado.innerHTML = `
    <div class="card">
      <h2>${name}</h2>
      <img src="${iconoUrl}" alt="${weather[0].description}">
      <div class="temp">${Math.round(temp)}</div>
      <div>Humedad: ${humidity}%</div>
      <div>Viento: ${wind.speed} m/s</div>
      <div class="desc">${weather[0].description}</div>
    </div>`;
}

function iniciarFlujoActualizacion(ciudad) {
  detenerTodo();
  obtenerClima(ciudad);
  contContainer.style.display = "inline-block";
  intervaloBusqueda = setInterval(() => {
    obtenerClima(ciudad);
  }, 10000);

  intervaloVisual = setInterval(() => {
    tiempoRestante--;
    spanSegundos.textContent = tiempoRestante;
    if (tiempoRestante <= 0) tiempoRestante = 10;
  }, 1000);
}

function resetearContadorVisual() {
  tiempoRestante = 10;
  spanSegundos.textContent = tiempoRestante;
}

function detenerTodo() {
  clearInterval(intervaloBusqueda);
  clearInterval(intervaloVisual);
  contContainer.style.display = "none";
  resetearContadorVisual();
}


btnBuscar.addEventListener("click", () => {
  detenerTodo();
  const ciudad = inputCiudad.value.trim();
  if (ciudad) obtenerClima(ciudad);
  else divMensaje.textContent = "Introduce una ciudad";
});

btnActualizar.addEventListener("click", () => {
  const ciudad = inputCiudad.value.trim();
  if (ciudad) iniciarFlujoActualizacion(ciudad);
  else divMensaje.textContent = "Introduce una ciudad para auto-actualizar";
});

btnDetener.addEventListener("click", detenerTodo);

btnLimpiar.addEventListener("click", () => {
  detenerTodo();
  divResultado.innerHTML = "";
  inputCiudad.value = "";
  divMensaje.textContent = "";
});
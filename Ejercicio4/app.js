const API_KEY = "1ff11a55bf2c1927c1dcb0d0146266da";

const inputCiudad = document.getElementById("ciudad");
const btnBuscar = document.getElementById("buscar");
const divResultado = document.getElementById("resultado");
const divMensaje = document.getElementById("mensaje");
const btnLimpiar = document.getElementById("limpiar");

async function obtenerClima(ciudad) {
  divMensaje.textContent = "Cargando...";
  divResultado.innerHTML = "";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`;

  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error("Ciudad no encontrado");

    const data = await response.json();

    divMensaje.textContent = "";
    mostrarClima(data);
  } catch (err) {
    divMensaje.textContent = "Error al mostrar los datos";
    console.error(err);
  }
}

function mostrarClima(datos) {
  try {
    const nombre = datos.name;
    const temp = Math.round(datos.main.temp);
    const description = datos.weather[0].description;
    const humedad = datos.main.humidity;
    const velocidad = datos.wind.speed;
    const icono = datos.weather[0].icon;
    const iconoUrl = `https://openweathermap.org/img/wn/${icono}@2x.png`;

    divResultado.innerHTML = `
        <div class="card">
        <h2>${nombre}</h2>
        <img src="${iconoUrl}" alt="${description}">
                <div class="temp">${temp}</div>
                <div>Humedad: ${humedad}%</div>
                <div>Velocidad Viento: ${velocidad}m/s</div>
                <div class="desc">${description}</div>
                </div>
                `;
  } catch (err) {
    divMensaje.textContent = "Error al mostrar los datos";
    console.error(err);
  }
}

function limpiarRegistros() {
  if (!(inputCiudad && inputCiudad.value.trim() !== "")) {
    alert("Antes de limpiar debes ingresar una ciudad");
    return;
  }
  if (!(divResultado && divResultado.innerHTML.trim() !== "")) {
    alert("Debes haber hecho la busqueda antes de limpiar la pagina");
    return;
  }

  divResultado.innerHTML = "";
  inputCiudad.value = "";
}

btnBuscar.addEventListener("click", function () {
  const ciudad = inputCiudad.value.trim();
  if (!ciudad) {
    divMensaje.textContent = "Por favor, introduce una ciudad";
    divResultado.textContent = "";
    return;
  }
  obtenerClima(ciudad);
});

btnLimpiar.addEventListener("click", function () {
  limpiarRegistros();
});

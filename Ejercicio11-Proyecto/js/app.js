// ===== CONFIGURACIÓN =====
import { API_KEY_OPEN_WEATHER } from "../../config.js";

// ===== REFERENCIAS DOM - CLIMA =====
const inputCiudad = document.getElementById("ciudad");
const btnClima = document.getElementById("btn-clima");
const divResultadoClima = document.getElementById("resultado-clima");
const divErrorClima = document.getElementById("error-clima");

// ===== REFERENCIAS DOM - USUARIOS =====
const btnUsuarios = document.getElementById("btn-usuarios");
const divResultadoUsuarios = document.getElementById("resultado-usuarios");
const divErrorUsuarios = document.getElementById("error-usuarios");

// ===== EVENTOS =====
btnClima.addEventListener("click", consultarClima);
btnUsuarios.addEventListener("click", generarUsuarios);

// ===== FUNCIONES CLIMA =====
async function consultarClima() {
  const ciudad = inputCiudad.value.trim();

  if (!ciudad) {
    divErrorClima.textContent = "Por favor, introduce una ciudad";
    divResultadoClima.innerHTML = "";
    return;
  }

  divErrorClima.textContent = "";
  divResultadoClima.innerHTML = '<p class="cargando">Cargando clima...</p>';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY_OPEN_WEATHER}&units=metric&lang=es`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      switch (response.status) {
        case 404: {
          throw new Error("Ciudad no encontrada. Verifica el nombre");
        }
        case 401: {
          throw new Error("API key invalida. contacta al administrador");
        }
        default: {
          throw new Error(
            `Error ${response.status}: no se pudo obtener el climan`
          );
        }
      }
    }

    const data = await response.json();
    mostrarClima(data);
  } catch (error) {
    divResultadoClima.innerHTML = "";
    divErrorClima.textContent = error.message;
    console.error("Error al consultar el clima: ", error);
  }
}

function mostrarClima(data) {
  try {
    const nombre = data.name || "Desconocida";
    const pais = data.sys?.country || "";
    const temp = Math.round(data.main.temp);
    const descripcion = data.weather[0].description;
    const icono = data.weather[0].icon;
    const iconoUrl = `https://openweathermap.org/img/wn/${icono}@2x.png`;
    const humedad = data.main.humidity;
    const viento = data.wind.speed;

    divResultadoClima.innerHTML = `
      <div class="clima-card card">
        <h3>${nombre}, ${pais}</h3>
        <img src="${iconoUrl}" alt="${descripcion}" />
        <div class="temp">${temp}°C</div>
        <p style="text-transform:capitalize;">${descripcion}</p>
        <p>💧 Humedad: ${humedad}%</p>
        <p>💨 Viento: ${viento} m/s</p>
      </div>
    `;
  } catch (error) {
    divErrorClima.textContent = "Error al mostrar los datos del clima.";
    console.error("Error en mostrarClima:", error);
  }
}
// ======= FUNCIONES USUARIOS =======
async function generarUsuarios() {
  divErrorUsuarios.textContent = "";
  divResultadoUsuarios.innerHTML =
    '<p class="cargando">Generando usuarios...</p>';

  const url = "https://randomuser.me/api/?results=6";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error al obtener usuarios de la API.");
    }

    const data = await response.json();
    mostrarUsuarios(data.results);
  } catch (error) {
    divResultadoUsuarios.innerHTML = "";
    divErrorUsuarios.textContent = error.message;
    console.error("Error al generar usuarios:", error);
  }
}

function mostrarUsuarios(usuarios) {
  try {
    divResultadoUsuarios.innerHTML = "";

    usuarios.forEach((user) => {
      const card = document.createElement("div");
      card.className = "card";

      const nombre = `${user.name.first} ${user.name.last}`;
      const foto = user.picture.large;
      const email = user.email;
      const ciudad = user.location.city;
      const pais = user.location.country;

      card.innerHTML = `
        <img src="${foto}" alt="${nombre}" />
        <h3>${nombre}</h3>
        <p>📧 ${email}</p>
        <p>📍 ${ciudad}, ${pais}</p>
      `;

      divResultadoUsuarios.appendChild(card);
    });
  } catch (error) {
    divErrorUsuarios.textContent = "Error al mostrar usuarios.";
    console.error("Error en mostrarUsuarios:", error);
  }
}

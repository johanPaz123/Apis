const API_KEY = "1ff11a55bf2c1927c1dcb0d0146266da";

async function mostrarClima(ciudad) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("No se pudo obtener el clima");
    const data = await response.json();
    console.log("Temperatura: ", data.main.temp, "ºC");
    console.log("Descripcion: ", data.weather[0].description);
    console.log("Velocidad del Viento", data.wind.speed);
  } catch (err) {
    console.error("Error: ", err.message);
  }
}

mostrarClima('Barcelona')
import {API_KEY_OPEN_WEATHER} from "../config.js";

const ciudad = "Madrid";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY_OPEN_WEATHER}&units=metric&lang=es`;

fetch(url)
.then((response) => {
    if(!response.ok) throw new Error(`Error ${response.status}: Ciudad no encontrada`);
    return response.json();
})
.then((data) => {
    console.log('Temperatura: ',data.main.temp, 'ºC');
    console.log('Descripcion: ',data.weather[0].description);
    console.log('Velocidad del Viento', data.wind.speed);
})
.catch((error) => {
    console.error('Error al obtener el clima: ',error.message);
})
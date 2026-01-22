const API_KEY = "1ff11a55bf2c1927c1dcb0d0146266da";
const ciudad = "Madrid";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`;

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
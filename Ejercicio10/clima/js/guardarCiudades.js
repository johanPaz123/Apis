export function guardarCiudadesArray(array, ciudad) {
  if (ciudad === "") {
    alert("No se puede guardar una ciudad vacia");
    return;
  }

  const existeCiudad = array.some((c) => c.toLowerCase() === ciudad.toLowerCase());

  if (!existeCiudad) {
    if(array.length >= 5){
        array.shift();
    }
    array.push(ciudad);
  }
}

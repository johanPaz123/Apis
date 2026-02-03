export function mensajesError(tipoError,contenedorInformacion) {
  let mensaje;
  let submensaje = "Por favor, inténtalo de nuevo.";

  switch (tipoError) {
    case "404":
      mensaje = "📍 Ciudad no encontrada";
      submensaje = "Asegúrate de que el nombre esté bien escrito.";
      break;
    case "401":
      mensaje = "🔑 Error de autenticación";
      submensaje = "La API Key no es válida o ha expirado.";
      break;
    case "NETWORK_ERROR":
      mensaje = "🌐 Sin conexión a Internet";
      submensaje = "Revisa tu red e intenta cargar de nuevo.";
      break;
    default:
      mensaje = "⚠️ Error inesperado";
      submensaje = "Hubo un problema al recuperar los datos.";
  }

  contenedorInformacion.innerHTML = `
    <div class="error-container">
      <h2>${mensaje}</h2>
      <p>${submensaje}</p>
    </div>
  `;
}

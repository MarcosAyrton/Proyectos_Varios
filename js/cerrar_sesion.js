// Funcion para cerrar sesion
function cerrarSesion() {
    // Eliminar informacion de sesion
    sessionStorage.removeItem("usuarioActual");
    localStorage.removeItem("usuarioActual");
    
    // Redirigir al usuario a la pagina de inicio de sesión
    window.location.href = "inicio_sesion.html";
}

// Evento de cierre de sesion
document.getElementById("cerrar-sesion").addEventListener("click", cerrarSesion);
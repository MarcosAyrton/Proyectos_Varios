// elementos del DOM
const formInicio = document.getElementById("form-inicio");
const nombreInput = document.getElementById("nombre");
const passwordInput = document.getElementById("password");
const alertaLogin = document.getElementById("alerta");
const connectedCheckbox = document.getElementById("connected");

// Funcion para mostrar alertas
function mostrarAlerta(mensaje, tipo) {
    alertaLogin.innerHTML = mensaje;
    alertaLogin.classList.remove("text-danger");
    alertaLogin.classList.add(`text-${tipo}`);
}

// Funcion para iniciar sesion
function iniciarSesion(event) {
    event.preventDefault(); // Evitar el envío del formulario

    // Obtener datos almacenados de los usuarios
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    console.log("Usuarios registrados:", usuarios); // Depuración

    // Buscar usuario que coincida con el nombre de usuario y contraseña ingresados
    const usuarioEncontrado = usuarios.find(user => 
        user.nombre === nombreInput.value && user.password === passwordInput.value
    );
    console.log("Usuario encontrado:", usuarioEncontrado); // Depuracion

    if (usuarioEncontrado) {
        // Guardar informacion de sesion
        const usuarioActual = {
            nombre: usuarioEncontrado.nombre,
            email: usuarioEncontrado.email,
        };

        // Verificar si el checkbox existe antes de acceder a el
        if (connectedCheckbox && connectedCheckbox.checked) {
            // Guardar en localStorage si el usuario quiere permanecer conectado
            localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
        } else {
            // Guardar en sessionStorage para la sesión actual
            sessionStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
        }

        // Mostrar mensaje de exito y redirigir
        mostrarAlerta("Inicio de sesión exitoso", "success");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000); // Redirigir despues de 1 segundo
    } else {
        // Mostrar mensaje de error
        mostrarAlerta("Nombre de usuario o contraseña incorrectos", "danger");
    }
}

//event listener para el formulario de inicio de sesión
formInicio.addEventListener("submit", iniciarSesion);

// Funcion para verificar si el usuario ya esta logueado
function verificarSesion() {
    // Verificar si hay un usuario actual en sessionStorage o localStorage
    const usuarioActual = JSON.parse(sessionStorage.getItem("usuarioActual")) || JSON.parse(localStorage.getItem("usuarioActual"));
    console.log("Usuario actual en sesión:", usuarioActual); // Depuración

    if (usuarioActual) {
        // Redirigir al usuario a la pagina de inicio si ya esta logueado
        window.location.href = "index.html";
    }
}

// Ejecutar la verificacion de sesión al cargar la página
document.addEventListener("DOMContentLoaded", verificarSesion);
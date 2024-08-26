// Obtener los elementos del DOM
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const dni = document.getElementById("dni");
const contrasena = document.getElementById("password");
const confirmContrasena = document.getElementById("confirm-password");
const form = document.getElementById("form-registro");
const parrafo = document.getElementById("alerta");

// Expresiones regulares para validaciones
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regexContrasena = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,}$/;

// Función para validar el formulario
function validarFormulario() {
    let alertas = "";
    alertas += validarNombre();
    alertas += validarDni();
    alertas += validarEmail();
    alertas += validarContrasena();
    alertas += validarConfirmContrasena();
    alertas += validarUsuarioYContrasenaExistentes();

    return alertas;
}

// Función para validar el nombre
function validarNombre() {
    if (nombre.value.length < 5) {
        return "El nombre debe tener al menos 5 caracteres <br>";
    }
    return "";
}

// Función para validar el DNI
function validarDni() {
    if (dni.value.length < 8) { // Suponiendo que el DNI debe tener al menos 8 dígitos
        return "El DNI debe tener 8 dígitos <br>";
    }
    return "";
}

// Función para validar el email
function validarEmail() {
    if (!regexEmail.test(email.value)) {
        return "El email no es válido <br>";
    }
    return "";
}

// Función para validar la contraseña
function validarContrasena() {
    if (!regexContrasena.test(contrasena.value)) {
        return "La contraseña debe tener al menos 9 caracteres, incluyendo letras y números <br>";
    }
    return "";
}

// Función para validar la confirmación de la contraseña
function validarConfirmContrasena() {
    if (contrasena.value !== confirmContrasena.value) {
        return "Las contraseñas no coinciden <br>";
    }
    return "";
}

// Función para verificar si el usuario o la contraseña ya están en uso
function validarUsuarioYContrasenaExistentes() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let mensajeError = "";

    // Verificar si el nombre de usuario ya está registrado
    const usuarioExistente = usuarios.find(user => user.nombre === nombre.value);
    if (usuarioExistente) {
        mensajeError += "El nombre de usuario ya está en uso. <br>";
    }

    // Verificar si la contraseña ya está en uso
    const contrasenaExistente = usuarios.find(user => user.password === contrasena.value);
    if (contrasenaExistente) {
        mensajeError += "La contraseña ya está en uso. <br>";
    }

    return mensajeError;
}

// Función para registrar un nuevo usuario
function registrarUsuario() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Agregar el nuevo usuario al almacenamiento
    usuarios.push({
        nombre: nombre.value,
        dni: dni.value,
        email: email.value,
        password: contrasena.value
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    return "";
}

// Manejar el evento de envío del formulario
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el envío del formulario

    // Validar el formulario
    const alertas = validarFormulario();

    if (alertas) {
        parrafo.innerHTML = alertas;
    } else {
        // Intentar registrar al usuario
        const mensajeRegistro = registrarUsuario();
        if (mensajeRegistro) {
            parrafo.innerHTML = mensajeRegistro;
        } else {
            parrafo.innerHTML = "Registro exitoso <br>";
            // Opcional: Redirigir al usuario a la página de inicio de sesión
            window.location.href = "inicio_sesion.html";
        }
    }
});

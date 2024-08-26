document.getElementById('joinForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Validar nombre y apellido
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const nombre = nombreInput.value;
    const apellido = apellidoInput.value;
    const nombreRegex = /^[a-zA-Z]+$/;

    if (!nombreRegex.test(nombre) || !nombreRegex.test(apellido)) {
        alert('Por favor, ingresa un nombre y apellido válidos (sin números ni caracteres especiales).');
        return;
    }

    // Validar email
    const emailInput = document.getElementById('inputEmail');
    const email = emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert('Por favor, ingresa un email válido.');
        return;
    }

    // Validar archivo
    const fileInput = document.getElementById('customFileLang');
    const file = fileInput.files[0];
    const fileError = document.getElementById('fileError');

    if (!file || file.type !== 'application/pdf') {
        fileError.textContent = 'Por favor, selecciona un archivo PDF.';
        return;
    } else {
        fileError.textContent = '';
    }

    // Enviar alerta de éxito
    alert('Formulario enviado correctamente');
});

// Actualizar el nombre del archivo en el label
document.getElementById('customFileLang').addEventListener('change', function() {
    const fileName = this.files[0].name;
    const nextSibling = this.nextElementSibling;
    nextSibling.innerText = fileName;
});

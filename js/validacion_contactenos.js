document.getElementById('opinionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Validar nombre y apellido
    const nombreInput = document.getElementById('inputFirstName');
    const apellidoInput = document.getElementById('inputLastName');
    const nombre = nombreInput.value.trim();
    const apellido = apellidoInput.value.trim();
    const nombreRegex = /^[a-zA-Z]+$/;

    if (!nombreRegex.test(nombre) || !nombreRegex.test(apellido)) {
        alert('Por favor, ingresa un nombre y apellido válidos (sin números ni caracteres especiales).');
        return;
    }

    // Validar opinión
    const opinionInput = document.getElementById('inputOpinion');
    const opinion = opinionInput.value.trim();

    if (opinion === "") {
        alert('Por favor, ingresa tu opinión.');
        return;
    }

    // Validar calificación
    const estrellas = document.querySelectorAll('input[name="inlineRadioOptions"]:checked').length;

    if (estrellas === 0) {
        alert('Por favor, selecciona una calificación.');
        return;
    }

    // Enviar alerta de éxito
    alert('Formulario enviado correctamente');
});


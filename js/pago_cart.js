document.addEventListener('DOMContentLoaded', () => {
    const payButton = document.getElementById('payButton');
    const submitPaymentButton = document.getElementById('submitPaymentButton');
    const offcanvasPayment = new bootstrap.Offcanvas(document.getElementById('offcanvasPayment'));

    payButton.addEventListener('click', () => {
        displayCartSummary();
        offcanvasPayment.show();
    });

    submitPaymentButton.addEventListener('click', validateForm);

    function displayCartSummary() {
        const cartSummaryItems = document.getElementById('cartSummaryItems');
        const cartTotal = document.getElementById('cartTotal');
        const cart = JSON.parse(localStorage.getItem('cart')) || []; // Obtener el carrito desde localStorage

        cartSummaryItems.innerHTML = '';
        let total = 0;

        const productCounts = {};

        cart.forEach(product => {
            total += parseFloat(product.price);
            productCounts[product.name] = (productCounts[product.name] || 0) + 1;
        });

        Object.entries(productCounts).forEach(([productName, count]) => {
            const li = document.createElement('li');
            li.textContent = `${productName} x ${count}`;
            cartSummaryItems.appendChild(li);
        });

        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    }

    function validateForm() {
        let isValid = true;
    
        document.querySelectorAll('.error-message').forEach(el => el.innerText = '');
    
        const name = document.getElementById('name').value;
        if (!name) {
            isValid = false;
            document.getElementById('nameError').innerText = 'El nombre es obligatorio.';
        }else{
            isValid = true;
        }
    
        const address = document.getElementById('address').value;
        if (!address) {
            isValid = false;
            document.getElementById('addressError').innerText = 'La dirección es obligatoria.';
        }else{
            isValid = true;
        }
    
        const cardNumber = document.getElementById('cardNumber').value;
        if (!isValidCardNumber(cardNumber)) {
            isValid = false;
            document.getElementById('cardNumberError').innerText = 'Número de tarjeta no válido.';
        }else{
            isValid = true;
        }
    
        const expiryDate = document.getElementById('expiryDate').value;
        if (!isValidExpiryDate(expiryDate)) {
            isValid = false;
            document.getElementById('expiryDateError').innerText = 'Fecha de expiración no válida.';
        }else{
            isValid = true;
        }
    
        const cvv = document.getElementById('cvv').value;
        if (!/^\d{3,4}$/.test(cvv)) {
            isValid = false;
            document.getElementById('cvvError').innerText = 'CVV no válido.';
        }else{
            isValid = true;
        }
    
        if (isValid) {
            alert('Compra realizada con éxito');
            // Opcionalmente, puedes limpiar el formulario y el carrito aquí
            document.getElementById('checkoutForm').reset();
            localStorage.removeItem('cart');
            updateCart();
            offcanvasPayment.hide();
            
        }
        
        
    }

    function isValidCardNumber(number) {
        const regex = new RegExp("^[0-9]{16}$");
        if (!regex.test(number)) return false;
        return true;
    }
    

    function isValidExpiryDate(date) {
        if (!/^\d{2}\/\d{2}$/.test(date)) return false;

        const [month, year] = date.split('/').map(Number);
        if (month < 1 || month > 12) return false;

        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;

        if (year < currentYear || (year === currentYear && month < currentMonth)) return false;

        return true;
        
    }

    
});


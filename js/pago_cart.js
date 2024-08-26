document.addEventListener('DOMContentLoaded', () => {
    const payButton = document.getElementById('payButton');
    const closeButton = document.getElementById('closeButton');
    const submitPaymentButton = document.getElementById('submitPaymentButton');
    const offcanvasPayment = document.getElementById('offcanvasPayment');

    payButton.addEventListener('click', () => {
        displayCartSummary();
        offcanvasPayment.classList.remove('translate-x-full');
        offcanvasPayment.classList.add('translate-x-0');
    });

    closeButton.addEventListener('click', () => {
        offcanvasPayment.classList.remove('translate-x-0');
        offcanvasPayment.classList.add('translate-x-full');
    });

    submitPaymentButton.addEventListener('click', validateForm);
// git graphs
    function displayCartSummary() {
        const cartSummaryItems = document.getElementById('cartSummaryItems');
        const cartTotal = document.getElementById('cartTotal');
        const cart = JSON.parse(localStorage.getItem('cart')) || []; 

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
        }
    
        const address = document.getElementById('address').value;
        if (!address) {
            isValid = false;
            document.getElementById('addressError').innerText = 'La dirección es obligatoria.';
        }
    
        const cardNumber = document.getElementById('cardNumber').value;
        if (!isValidCardNumber(cardNumber)) {
            isValid = false;
            document.getElementById('cardNumberError').innerText = 'Número de tarjeta no válido.';
        }
    
        const expiryMonth = document.getElementById('expiryMonth').value;
        const expiryYear = document.getElementById('expiryYear').value;
        const expiryDate = expiryMonth + '/' + expiryYear;
        if (!isValidExpiryDate(expiryDate)) {
            isValid = false;
            document.getElementById('expiryDateError').innerText = 'Fecha de expiración no válida.';
        }
    
        const cvv = document.getElementById('cvv').value;
        if (!/^\d{3,4}$/.test(cvv)) {
            isValid = false;
            document.getElementById('cvvError').innerText = 'CVV no válido.';
        }
    
        if (isValid) {
            alert('Compra realizada con éxito');
            document.getElementById('checkoutForm').reset();
            localStorage.removeItem('cart');
            offcanvasPayment.classList.remove('translate-x-0');
            offcanvasPayment.classList.add('translate-x-full');
        }
    }

    function isValidCardNumber(number) {
        const regex = new RegExp("^[0-9]{16}$");
        return regex.test(number);
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

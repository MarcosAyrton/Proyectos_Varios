document.addEventListener('DOMContentLoaded', () => {
    // Obtener elementos del DOM
    const cartButton = document.getElementById('cartButton');
    const cartCard = document.getElementById('cartCard');
    const closeCartButton = document.getElementById('closeCartButton');
    const cartBody = cartCard.querySelector('.card-body');
    const totalPriceElement = document.createElement('p');
    totalPriceElement.classList.add('total-price');
    cartBody.appendChild(totalPriceElement);

    const cartCount = document.getElementById('cartCount');

    // Inicializar el carrito desde el almacenamiento local o crear uno vacío
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Mostrar el carrito al hacer clic en el botón de carrito
    cartButton.addEventListener('click', () => {
        cartCard.style.display = 'block';
    });

    // Ocultar el carrito al hacer clic en el botón de cerrar
    closeCartButton.addEventListener('click', () => {
        cartCard.style.display = 'none';
    });

    // Función para agregar un producto al carrito
    function addToCart(product) {
        cart.push(product);
        saveCart();
        updateCart();
        updateCartCount();
    }

    // Función para eliminar un producto del carrito por su índice
    function removeFromCart(index) {
        cart.splice(index, 1);
        saveCart();
        updateCart();
        updateCartCount();
    }

    // Función para guardar el carrito en el almacenamiento local
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Función para actualizar la visualización del carrito en la interfaz
    function updateCart() {
        cartBody.innerHTML = '';
        let totalPrice = 0;
        const productCounts = {};

        // Calcular el total y contar la cantidad de cada producto en el carrito
        cart.forEach(product => {
            totalPrice += parseFloat(product.price);
            productCounts[product.name] = (productCounts[product.name] || 0) + 1;
        });

        // Mostrar cada producto en el carrito con un botón para eliminarlo
        Object.entries(productCounts).forEach(([productName, count]) => {
            const productElement = document.createElement('div');
            productElement.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-2');

            const productInfo = document.createElement('p');
            productInfo.classList.add('mb-0');
            productInfo.textContent = `${productName} x ${count}`;

            const removeButton = document.createElement('button');
            removeButton.classList.add('btn', 'btn-danger', 'btn-sm');
            removeButton.textContent = 'Eliminar';
            removeButton.addEventListener('click', () => {
                removeFromCart(cart.findIndex(product => product.name === productName));
            });

            productElement.appendChild(productInfo);
            productElement.appendChild(removeButton);
            cartBody.appendChild(productElement);
        });

        // Mostrar el total del carrito
        totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
        cartBody.appendChild(totalPriceElement);
    }

    // Función para actualizar el contador de elementos en el carrito
    function updateCartCount() {
        const itemCount = cart.length;
        if (itemCount > 0) {
            cartCount.style.display = 'inline';
            cartCount.textContent = itemCount;
        } else {
            cartCount.style.display = 'none';
        }
    }

    // Actualizar la visualización del carrito al cargar la página
    updateCart();

    // Agregar listeners a los botones "Agregar al carrito"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            let productName, productPrice;
            const selectElement = button.parentElement.previousElementSibling.querySelector('select');
            const selectedIndex = selectElement.selectedIndex;
            const selectedOption = selectElement.options[selectedIndex];
            const productId = parseFloat(selectedOption.getAttribute('data-id'));
            if (selectElement.id.includes('productSelect')) {
                productName = selectedOption.textContent.split(' - ')[0];
                productPrice = productId;
            } else {
                productName = selectedOption.textContent;
                productPrice = parseFloat(selectedOption.textContent.split('$')[1]);
            }
            const product = { name: productName, price: productPrice };
            addToCart(product);
        });
    });
});


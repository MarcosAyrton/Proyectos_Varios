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
            const productPrice = parseFloat(cart.find(product => product.name === productName).price);
            if (!isNaN(productPrice)) {
                productInfo.textContent = `${productName} x ${count} - $${(productPrice * count).toFixed(2)}`;
            } else {
                productInfo.textContent = `${productName} x ${count} - Precio no disponible`;
            }

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

    // Agregar listeners a los botones "Agregar al carrito" de tipo 'sandwich'
    document.querySelectorAll('.add-to-cart-sandwich').forEach(button => {
        button.addEventListener('click', () => {
            let productName, productPrice;
            // Obtener información del producto desde el DOM
            const productCard = button.closest('.card');
            productName = productCard.querySelector('.card-title').textContent.trim();
            // Extraer el precio del producto y convertirlo a un número
            const priceText = productCard.querySelector('.product-price').textContent.trim();
            productPrice = parseFloat(priceText.replace(/[^\d.]/g, '')); // Extraemos solo los números y el punto
            // Crear objeto de producto y añadirlo al carrito
            const product = { name: productName, price: productPrice };
            addToCart(product);
        });
    });

    // Función para mostrar el modal de edición
    function showEditModal(productCard) {
        const editModal = new bootstrap.Modal(document.getElementById('editModal'));
        const saveChangesButton = document.getElementById('saveChangesButton');
        let productName = productCard.querySelector('.card-title').textContent.trim();
        let productPrice = parseFloat(productCard.querySelector('.product-price').textContent.trim().replace(/[^\d.]/g, ''));

        saveChangesButton.onclick = () => {
            const form = document.getElementById('editForm');
            let options = [];
            form.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
                options.push(checkbox.value);
            });
            const editedProductName = `${productName}`;
            const editedProduct = { name: editedProductName, price: productPrice, options: options };
            addToCart(editedProduct);
            editModal.hide();
        };

        editModal.show();
    }

});

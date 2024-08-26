document.addEventListener('DOMContentLoaded', () => {
    // Array de promociones
    const promociones = [
        {
            imagen: 'img/costeleta.jpg',
            titulo: 'Costeleta 2x1',
            descripcion: 'Promocion de Costeleta con fritas para dos personas, ideal para comer acompañado ahorrando dinero.',
            precio: 3999.99
        },
        {
            imagen: 'img/cuadril.jpeg',
            titulo: 'Sandwich de Colita de Cuadril + Cocacola 1lt.',
            descripcion: 'Exquisito sandwich de colita de cuadril con verduras salteadas mas papas noisette acompañado de una Coca Cola de 1lt.',
            precio: 3499.99
        },
        {
            imagen: 'img/cuatro-quesos.jpg',
            titulo: 'Pizza Mediana Cuatro Quesos + Media Docena de Empanadas Dulces',
            descripcion: 'Una pizza mediana de cuatro quesos con media docena de empanadas dulces para disfrutar con amigos.',
            precio: 8499.99
        }
    ];

    const promoContainer = document.getElementById('promo-container');

    // Función para crear las tarjetas de promociones
    function crearTarjetas() {
        promociones.forEach(promo => {
            const colDiv = document.createElement('div');
            colDiv.className = 'col-12 col-md-6 col-lg-4';

            const cardDiv = document.createElement('div');
            cardDiv.className = 'card h-100';

            const img = document.createElement('img');
            img.src = promo.imagen;
            img.className = 'card-img-top product-img';
            img.alt = promo.titulo;

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            const title = document.createElement('h5');
            title.className = 'card-title';
            title.innerText = promo.titulo;

            const description = document.createElement('p');
            description.className = 'card-text';
            description.innerText = promo.descripcion;

            const cardFooter = document.createElement('div');
            cardFooter.className = 'card-footer bg-light';

            const price = document.createElement('p');
            price.className = 'text-dark fw-bold fs-5 product-price';
            price.innerText = `$${promo.precio.toFixed(2)}`;

            const button = document.createElement('button');
            button.className = 'btn btn-success w-100 mt-2 add-to-cart';
            button.type = 'button';
            button.innerText = 'Añadir al Carrito';
            button.addEventListener('click', () => {
                agregarAlCarrito(promo);
            });

            cardBody.appendChild(title);
            cardBody.appendChild(description);
            cardFooter.appendChild(price);
            cardFooter.appendChild(button);

            cardDiv.appendChild(img);
            cardDiv.appendChild(cardBody);
            cardDiv.appendChild(cardFooter);

            colDiv.appendChild(cardDiv);
            promoContainer.appendChild(colDiv);
        });
    }

    // Función para agregar un producto al carrito
    function agregarAlCarrito(promo) {
        const product = {
            name: promo.titulo,
            price: promo.precio
        };
        addToCart(product);
    }

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

    // Llama a la función para crear las tarjetas
    crearTarjetas();
});



document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.getElementById('cartButton');
    const cartCard = document.getElementById('cartCard');
    const closeCartButton = document.getElementById('closeCartButton');
    const cartBody = cartCard.querySelector('.card-body');
    const totalPriceElement = document.createElement('p');
    totalPriceElement.classList.add('total-price');
    cartBody.appendChild(totalPriceElement);

    const cartCount = document.getElementById('cartCount');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cartButton.addEventListener('click', () => {
        cartCard.style.display = 'block';
    });

    closeCartButton.addEventListener('click', () => {
        cartCard.style.display = 'none';
    });

    function addToCart(product) {
        cart.push(product);
        saveCart();
        updateCart();
        updateCartCount();
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        saveCart();
        updateCart();
        updateCartCount();
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCart() {
        cartBody.innerHTML = '';
        let totalPrice = 0;
        const productCounts = {};

        cart.forEach(product => {
            totalPrice += parseFloat(product.price);
            if (productCounts[product.name]) {
                productCounts[product.name].count += 1;
                productCounts[product.name].totalPrice += parseFloat(product.price);
            } else {
                productCounts[product.name] = {
                    count: 1,
                    price: parseFloat(product.price),
                    totalPrice: parseFloat(product.price)
                };
            }
        });

        Object.entries(productCounts).forEach(([productName, details]) => {
            const productElement = document.createElement('div');
            productElement.classList.add('flex', 'justify-between', 'items-center', 'mb-2');

            const productInfo = document.createElement('p');
            productInfo.classList.add('mb-0', 'text-gray-900');
            productInfo.textContent = `${productName} x ${details.count} - $${details.totalPrice.toFixed(2)}`;

            const removeButton = document.createElement('button');
            removeButton.classList.add('bg-red-500', 'text-white', 'py-1', 'px-3', 'rounded', 'hover:bg-red-600', 'text-sm');
            removeButton.textContent = 'Eliminar';
            removeButton.addEventListener('click', () => {
                removeFromCart(cart.findIndex(product => product.name === productName));
            });

            productElement.appendChild(productInfo);
            productElement.appendChild(removeButton);
            cartBody.appendChild(productElement);
        });

        totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
        cartBody.appendChild(totalPriceElement);
    }

    function updateCartCount() {
        const itemCount = cart.length;
        if (itemCount > 0) {
            cartCount.style.display = 'inline';
            cartCount.textContent = itemCount;
        } else {
            cartCount.style.display = 'none';
        }
    }

    updateCart();

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productElement = button.closest('.bg-white');
            const productName = productElement.querySelector('h3').textContent;
            const productPrice = parseFloat(productElement.querySelector('span').textContent.replace('$', ''));
            const product = { name: productName, price: productPrice };
            addToCart(product);
        });
    });
});

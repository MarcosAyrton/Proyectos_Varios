document.addEventListener('DOMContentLoaded', () => {
    // Array de promociones
    const promociones = [
        {
            imagen: 'img/costeleta.jpg',
            titulo: 'Costeleta 2x1',
            descripcion: 'Promocion de Costeleta con fritas para dos personas, ideal para comer acompañado ahorrando dinero, no te pierdas esta incrible promocion.',
            precio: 3999.99
        },
        {
            imagen: 'img/cuadril.jpeg',
            titulo: 'Sandwich de Colita de Cuadril + Cocacola 1lt.',
            descripcion: 'Sandwich de colita de cuadril con verduras salteadas mas papas noisette acompañado de una Coca Cola de 1lt.',
            precio: 3499.99
        },
        {
            imagen: 'img/cuatro-quesos.jpg',
            titulo: 'Pizza Mediana Cuatro Quesos + Media Docena de Empanadas Dulces',
            descripcion: 'Una pizza mediana de cuatro quesos con media docena de empanadas dulces.',
            precio: 8499.99
        }
    ];

    const promoContainer = document.getElementById('promo-container');

    // Función para crear las tarjetas de promociones
    function crearTarjetas() {
        promociones.forEach(promo => {
            const colDiv = document.createElement('div');
            colDiv.className = 'bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden';

            const img = document.createElement('img');
            img.src = promo.imagen;
            img.className = 'w-full h-56 object-cover';
            img.alt = promo.titulo;

            const cardBody = document.createElement('div');
            cardBody.className = 'p-4';

            const title = document.createElement('h3');
            title.className = 'text-lg font-semibold text-gray-900 mb-2';
            title.innerText = promo.titulo;

            const description = document.createElement('p');
            description.className = 'text-gray-700';
            description.innerText = promo.descripcion;

            const cardFooter = document.createElement('div');
            cardFooter.className = 'p-4 bg-gray-50';

            const price = document.createElement('span');
            price.className = 'text-gray-900 font-semibold text-lg';
            price.innerText = `$${promo.precio.toFixed(2)}`;

            const button = document.createElement('button');
            button.className = 'w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 mt-2 add-to-cart';
            button.type = 'button';
            button.innerText = 'Añadir al Carrito';
            button.addEventListener('click', () => {
                alert(`Añadido al carrito: ${promo.titulo}`);
            });

            cardBody.appendChild(title);
            cardBody.appendChild(description);
            cardFooter.appendChild(price);
            cardFooter.appendChild(button);

            colDiv.appendChild(img);
            colDiv.appendChild(cardBody);
            colDiv.appendChild(cardFooter);

            promoContainer.appendChild(colDiv);
        });
    }

    // Llama a la función para crear las tarjetas
    crearTarjetas();
});

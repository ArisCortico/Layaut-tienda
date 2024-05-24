document.addEventListener('DOMContentLoaded', function() {
	let allProducts = []; // Definir allProducts como una variable global
   
    // Función para manejar el carrito
    function manejarCarrito() {
        const btnCart = document.querySelector('.container-cart-icon');
        const containerCartProducts = document.querySelector('.container-cart-products');
        const rowProduct = document.querySelector('.row-product');
        const valorTotal = document.querySelector('.total-pagar');
        const countProducts = document.querySelector('#contador-productos');
        const cartEmpty = document.querySelector('.cart-empty');
        const cartTotal = document.querySelector('.cart-total');
   
        let allProducts = [];
   
        // Cargar productos del carrito desde el almacenamiento local
        function cargarProductosDesdeLocalStorage() {
            const storedCart = localStorage.getItem('carrito');
            if (storedCart) {
                allProducts = JSON.parse(storedCart);
                showHTML();
            }
        }
   
        // Cargar productos desde el almacenamiento local al cargar la página
        window.addEventListener('load', cargarProductosDesdeLocalStorage);
   
        btnCart.addEventListener('click', () => {
            containerCartProducts.classList.toggle('hidden-cart');
        });
   
        document.querySelectorAll('.btn-add-cart').forEach(button => {
            button.addEventListener('click', () => {
                const product = button.closest('.item');
   
                const infoProduct = {
                    quantity: 1,
                    title: product.querySelector('h2').textContent,
                    price: product.querySelector('.price').textContent,
                };
   
                const exits = allProducts.some(
                    product => product.title === infoProduct.title
                );
   
                if (exits) {
                    const products = allProducts.map(product => {
                        if (product.title === infoProduct.title) {
                            product.quantity++;
                        }
                        return product;
                    });
                    allProducts = [...products];
                } else {
                    allProducts = [...allProducts, infoProduct];
                }
   
                // Guardar productos en el almacenamiento local
                localStorage.setItem('carrito', JSON.stringify(allProducts));
   
                showHTML();
            });
        });
   
        rowProduct.addEventListener('click', e => {
            if (e.target.classList.contains('icon-close')) {
                const product = e.target.parentElement;
                const title = product.querySelector('.titulo-producto-carrito').textContent;
   
                const itemIndex = allProducts.findIndex(item => item.title === title);

                if (itemIndex !== -1) {
                    if (allProducts[itemIndex].quantity > 1) {
                        allProducts[itemIndex].quantity--;
                    } else {
                        allProducts.splice(itemIndex, 1);
                    }
                    showHTML();
                }
   
                // Guardar productos en el almacenamiento local
                localStorage.setItem('carrito', JSON.stringify(allProducts));
   
                showHTML();
            }
        });
   
        // Funcion para mostrar HTML
        function showHTML() {
            if (!allProducts.length) {
                cartEmpty.classList.remove('hidden');
                rowProduct.classList.add('hidden');
                cartTotal.classList.add('hidden');
            } else {
                cartEmpty.classList.add('hidden');
                rowProduct.classList.remove('hidden');
                cartTotal.classList.remove('hidden');
            }
   
            // Limpiar HTML
            rowProduct.innerHTML = '';
   
            let total = 0;
            let totalOfProducts = 0;
   
            allProducts.forEach(product => {
                const containerProduct = document.createElement('div');
                containerProduct.classList.add('cart-product');
   
                containerProduct.innerHTML = `
                    <div class="info-cart-product">
                        <span class="cantidad-producto-carrito">${product.quantity}</span>
                        <p class="titulo-producto-carrito">${product.title}</p>
                        <span class="precio-producto-carrito">${product.price}</span>
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="icon-close"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                `;
   
                rowProduct.append(containerProduct);
   
                total += parseInt(product.quantity * product.price.slice(1));
                totalOfProducts += product.quantity;
            });
   
            valorTotal.innerText = `$${total}`;
            countProducts.innerText = totalOfProducts;
        }
    }
   
    // Llama a la función para cargar el carrito al cargar la página
  
   
    // Llama a la función para manejar el carrito al cargar el catálogo
    manejarCarrito();

    // Evento para eliminar productos del carrito
    document.querySelector('.container-cart-products').addEventListener('click', function (e) {
        if (e.target && e.target.classList.contains('icon-close')) {
            const title = e.target.parentElement.querySelector('.titulo-producto-carrito').textContent;
            removeFromCart(title);
        }
    });

    // Función para eliminar productos del carrito
    function removeFromCart(title) {
        const itemIndex = allProducts.findIndex(item => item.title === title);

        if (itemIndex !== -1) {
            if (allProducts[itemIndex].quantity > 1) {
                allProducts[itemIndex].quantity--;
            } else {
                allProducts.splice(itemIndex, 1);
            }
            showHTML();
        }

        if (allProducts.length === 0) {
            cartEmpty.classList.remove('hidden');
            cartTotal.classList.add('hidden');
        }
    }
});


function mostrar() {
    const formulario = document.querySelector(".catalogo_menu");
    formulario.style.opacity = "1";
    formulario.style.visibility = "visible";
  }
  
  function ocultar() {
    const formulario = document.querySelector(".catalogo_menu");
    formulario.style.opacity = "0";
    formulario.style.visibility = "hidden";
  }

  
  document.addEventListener('DOMContentLoaded', function() {
    // Función para manejar el catálogo
    function manejarCatalogo(categoria = '') {
        const items = document.querySelectorAll('.item');

        items.forEach(item => {
            if (!categoria || item.classList.contains(categoria)) {
                item.style.display = 'block'; // Mostrar el producto
            } else {
                item.style.display = 'none'; // Ocultar el producto
            }
        });
    }

    // Obtener todos los enlaces del menú
    const linksMenu = document.querySelectorAll('.btn_menu');

    // Asignar evento de clic a cada enlace del menú
    linksMenu.forEach(link => {
        link.addEventListener('click', function() {
            const categoria = this.getAttribute('data-categoria'); // Obtener la categoría del enlace

            manejarCatalogo(categoria); // Mostrar productos según la categoría seleccionada
        });
    });

    // Llamar a la función para mostrar todos los productos al cargar la página
    manejarCatalogo(); 
});


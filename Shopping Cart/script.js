document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Product 1', price: 100 },
        { id: 2, name: 'Product 2', price: 200 },
        { id: 3, name: 'Product 3', price: 300 }
    ];

    const cart = [];

    const productsContainer = document.getElementById('products');
    const cartContainer = document.getElementById('cart');

    function displayProducts() {
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <span>${product.name}</span>
                <span>$${product.price}</span>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productsContainer.appendChild(productDiv);
        });
    }

    function displayCart() {
        cartContainer.innerHTML = '';
        cart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price}</span>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartContainer.appendChild(cartItemDiv);
        });
    }

    window.addToCart = function(productId) {
        const product = products.find(p => p.id === productId);
        cart.push(product);
        displayCart();
    };

    window.removeFromCart = function(productId) {
        const index = cart.findIndex(item => item.id === productId);
        if (index !== -1) {
            cart.splice(index, 1);
        }
        displayCart();
    };

    document.getElementById('checkout').addEventListener('click', () => {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        alert('Total: $' + total);
    });

    displayProducts();
});

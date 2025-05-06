document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products');
    const cartContainer = document.getElementById('cart');
    let cart = [];

    function fetchProducts() {
        fetch('./products.json') 
            .then(response => response.json())
            .then(products => displayProducts(products))
            .catch(error => console.error('Error fetching products:', error));
    }

    function displayProducts(products) {
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <span>${product.name}</span>
                <span>$${product.price}</span>
                <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
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
                <span>${item.name} (x${item.quantity})</span>
                <span>$${item.price * item.quantity}</span>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartContainer.appendChild(cartItemDiv);
        });
    }

    window.addToCart = function(id, name, price) {
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity++; // Increase quantity if item is already in the cart
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        updateServerCart(); 
        displayCart();
    };

    window.removeFromCart = function(productId) {
        const index = cart.findIndex(item => item.id === productId);
        if (index !== -1) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--; // Decrease quantity instead of removing completely
            } else {
                cart.splice(index, 1);
            }
        }
        updateServerCart();
        displayCart();
    };

    function updateServerCart() {
        fetch('server/updateCart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cart)
        })
        .then(response => response.json())
        .then(data => console.log('Server cart updated:', data))
        .catch(error => console.error('Error updating cart:', error));
    }

    document.getElementById('checkout').addEventListener('click', () => {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        alert('Total: $' + total);
    });

    fetchProducts();
});

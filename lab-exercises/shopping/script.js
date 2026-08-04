document.addEventListener('DOMContentLoaded', () => {
    // State
    let cart = [];

    // DOM Elements
    const cartIcon = document.getElementById('cart-icon');
    const cartBadge = document.getElementById('cart-badge');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartBtn = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const emptyCartMsg = document.querySelector('.empty-cart-msg');

    // Toggle Cart
    function toggleCart(e) {
        if(e) e.preventDefault();
        cartSidebar.classList.toggle('active');
        cartOverlay.classList.toggle('active');
    }

    cartIcon.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);

    // Add to Cart Logic
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = {
                id: this.dataset.id,
                name: this.dataset.name,
                price: parseFloat(this.dataset.price),
                image: this.dataset.image,
                quantity: 1
            };

            addToCart(product);
            
            // Add a little visual feedback
            this.innerHTML = '<i class="fas fa-check"></i>';
            this.style.background = '#10b981';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-shopping-cart"></i>';
                this.style.background = '';
            }, 1000);
            
            // Optional: open cart when item is added
            // toggleCart();
        });
    });

    function addToCart(product) {
        // Check if item already exists
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(product);
        }
        
        updateCart();
    }

    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        updateCart();
    }
    
    function changeQuantity(id, change) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                removeFromCart(id);
            } else {
                updateCart();
            }
        }
    }

    function updateCart() {
        // Update badge
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.innerText = totalItems;
        
        // Show/hide empty message
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
        } else {
            cartItemsContainer.innerHTML = '';
            
            cart.forEach(item => {
                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                itemEl.innerHTML = `
                    <div class="cart-item-img">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p class="cart-item-price">₹ ${item.price}</p>
                        <div class="cart-item-quantity">
                            <button class="qty-btn minus" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="qty-btn plus" data-id="${item.id}">+</button>
                        </div>
                    </div>
                    <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                `;
                cartItemsContainer.appendChild(itemEl);
            });
            
            // Add event listeners to new buttons
            document.querySelectorAll('.qty-btn.minus').forEach(btn => {
                btn.addEventListener('click', function() { changeQuantity(this.dataset.id, -1); });
            });
            document.querySelectorAll('.qty-btn.plus').forEach(btn => {
                btn.addEventListener('click', function() { changeQuantity(this.dataset.id, 1); });
            });
            document.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', function() { removeFromCart(this.dataset.id); });
            });
        }
        
        // Update total price
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalPrice.innerText = `₹ ${totalPrice}`;
    }
});

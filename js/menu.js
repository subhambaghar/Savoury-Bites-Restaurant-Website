document.addEventListener('DOMContentLoaded', function() {
    // Menu Filter Functionality
    const filterButtons = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-category');
            
            menuItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show sections that have visible items
            document.querySelectorAll('.menu-section').forEach(section => {
                const hasVisibleItems = Array.from(section.querySelectorAll('.menu-item'))
                    .some(item => item.style.display !== 'none');
                
                section.style.display = hasVisibleItems ? 'block' : 'none';
            });
        });
    });
    
    // Menu Search Functionality
    const searchInput = document.getElementById('menu-search');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        menuItems.forEach(item => {
            const itemName = item.querySelector('h4').textContent.toLowerCase();
            const itemDescription = item.querySelector('.item-description').textContent.toLowerCase();
            
            if (itemName.includes(searchTerm) || itemDescription.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show sections that have visible items
        document.querySelectorAll('.menu-section').forEach(section => {
            const hasVisibleItems = Array.from(section.querySelectorAll('.menu-item'))
                .some(item => item.style.display !== 'none');
            
            section.style.display = hasVisibleItems ? 'block' : 'none';
        });
    });
    
    // Quantity Selector Functionality
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function() {
            const quantityElement = this.parentElement.querySelector('.quantity');
            let quantity = parseInt(quantityElement.textContent);
            
            if (this.classList.contains('plus')) {
                quantity++;
            } else if (this.classList.contains('minus') && quantity > 1) {
                quantity--;
            }
            
            quantityElement.textContent = quantity;
        });
    });
    
    // Add to Cart Functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = this.closest('.menu-item');
            const itemName = menuItem.querySelector('h4').textContent;
            const itemPrice = parseFloat(menuItem.querySelector('.price').textContent.replace('$', ''));
            const itemImage = menuItem.querySelector('img').src;
            const quantity = parseInt(menuItem.querySelector('.quantity').textContent);
            
            addToCart(itemName, itemPrice, itemImage, quantity);
            
            // Show notification
            showNotification(`${itemName} added to cart!`);
        });
    });
    
    function addToCart(name, price, image, quantity = 1) {
        const cartItems = document.querySelector('.cart-items');
        let itemExists = false;
        
        // Check if item already exists in cart
        document.querySelectorAll('.cart-item').forEach(item => {
            if (item.querySelector('h4').textContent === name) {
                itemExists = true;
                const quantityElement = item.querySelector('.cart-item-quantity span');
                const newQuantity = parseInt(quantityElement.textContent) + quantity;
                quantityElement.textContent = newQuantity;
                
                // Update price display if needed
                const priceElement = item.querySelector('.cart-item-price');
                priceElement.textContent = `$${(price * newQuantity).toFixed(2)}`;
            }
        });
        
        if (!itemExists) {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${image}" alt="${name}">
                <div class="cart-item-details">
                    <h4>${name}</h4>
                    <span class="cart-item-price">$${(price * quantity).toFixed(2)}</span>
                </div>
                <div class="cart-item-quantity">
                    <button class="minus">-</button>
                    <span>${quantity}</span>
                    <button class="plus">+</button>
                </div>
                <i class="fas fa-times cart-item-remove"></i>
            `;
            cartItems.appendChild(cartItem);
            
            // Add event listeners to new cart item
            cartItem.querySelector('.minus').addEventListener('click', function() {
                updateCartItemQuantity(this, -1, price);
            });
            
            cartItem.querySelector('.plus').addEventListener('click', function() {
                updateCartItemQuantity(this, 1, price);
            });
            
            cartItem.querySelector('.cart-item-remove').addEventListener('click', function() {
                cartItem.remove();
                updateCartTotal();
            });
        }
        
        updateCartTotal();
    }
    
    function updateCartItemQuantity(button, change, unitPrice) {
        const quantityElement = button.parentElement.querySelector('span');
        let quantity = parseInt(quantityElement.textContent) + change;
        
        if (quantity < 1) quantity = 1;
        
        quantityElement.textContent = quantity;
        const priceElement = button.closest('.cart-item').querySelector('.cart-item-price');
        priceElement.textContent = `$${(unitPrice * quantity).toFixed(2)}`;
        
        updateCartTotal();
    }
    
    function updateCartTotal() {
        let total = 0;
        
        document.querySelectorAll('.cart-item').forEach(item => {
            const priceText = item.querySelector('.cart-item-price').textContent.replace('$', '');
            total += parseFloat(priceText);
        });
        
        document.querySelector('.total').textContent = `Total: $${total.toFixed(2)}`;
    }
    
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
});
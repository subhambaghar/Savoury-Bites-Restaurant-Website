document.addEventListener('DOMContentLoaded', function() {
    // Load cart items from localStorage or session
    function loadCartItems() {
        // In a real application, you would load from your cart system
        // This is a placeholder implementation
        const cartItems = [
            {
                id: 1,
                name: 'Margherita Pizza',
                image: 'images/menu/pizza.jpg',
                price: 12.99,
                quantity: 1,
                options: 'Size: Medium'
            }
        ];

        const cartTable = document.getElementById('cart-table');
        const emptyCart = document.getElementById('empty-cart');
        const tbody = cartTable.querySelector('tbody');
        
        // Clear existing items
        tbody.innerHTML = '';
        
        if (cartItems.length === 0) {
            cartTable.style.display = 'none';
            emptyCart.style.display = 'block';
            return;
        }
        
        cartTable.style.display = 'table';
        emptyCart.style.display = 'none';
        
        // Add items to the cart table
        cartItems.forEach(item => {
            const row = document.createElement('tr');
            row.className = 'cart-item';
            row.dataset.id = item.id;
            row.innerHTML = `
                <td class="item-details">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <h4>${item.name}</h4>
                        ${item.options ? `<p class="item-options">${item.options}</p>` : ''}
                    </div>
                </td>
                <td class="item-price">$${item.price.toFixed(2)}</td>
                <td class="item-quantity">
                    <button class="quantity-btn minus">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus">+</button>
                </td>
                <td class="item-total">$${(item.price * item.quantity).toFixed(2)}</td>
                <td class="item-remove">
                    <button class="remove-btn"><i class="fas fa-times"></i></button>
                </td>
            `;
            tbody.appendChild(row);
        });
        
        // Update cart totals
        updateCartTotals();
    }

    // Update cart totals
    function updateCartTotals() {
        const items = document.querySelectorAll('.cart-item');
        let subtotal = 0;
        
        items.forEach(item => {
            const price = parseFloat(item.querySelector('.item-price').textContent.replace('$', ''));
            const quantity = parseInt(item.querySelector('.quantity').textContent);
            const total = price * quantity;
            
            item.querySelector('.item-total').textContent = `$${total.toFixed(2)}`;
            subtotal += total;
        });
        
        const deliveryFee = 3.99;
        const taxRate = 0.09;
        const tax = subtotal * taxRate;
        const total = subtotal + deliveryFee + tax;
        
        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
        
        // Update checkout button state
        const checkoutBtn = document.querySelector('.btn-checkout');
        checkoutBtn.style.opacity = items.length > 0 ? '1' : '0.5';
        checkoutBtn.style.pointerEvents = items.length > 0 ? 'auto' : 'none';
    }

    // Load cart items when page loads
    loadCartItems();

    // Quantity button handlers
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('quantity-btn')) {
            const btn = e.target;
            const quantityElement = btn.parentElement.querySelector('.quantity');
            let quantity = parseInt(quantityElement.textContent);
            
            if (btn.classList.contains('minus')) {
                if (quantity > 1) {
                    quantity--;
                    quantityElement.textContent = quantity;
                }
            } else if (btn.classList.contains('plus')) {
                quantity++;
                quantityElement.textContent = quantity;
            }
            
            updateCartTotals();
            
            // In a real app, you would update the cart in your backend here
        }
        
        // Remove item handler
        if (e.target.closest('.remove-btn')) {
            const row = e.target.closest('.cart-item');
            row.remove();
            
            // Check if cart is empty
            if (document.querySelectorAll('.cart-item').length === 0) {
                document.getElementById('cart-table').style.display = 'none';
                document.getElementById('empty-cart').style.display = 'block';
            }
            
            updateCartTotals();
            
            // In a real app, you would update the cart in your backend here
        }
    });

    // Apply promo code
    document.querySelector('.btn-apply').addEventListener('click', function() {
        const promoCode = document.getElementById('promo-code').value.trim();
        const promoMessage = document.getElementById('promo-message');
        
        if (promoCode === '') {
            promoMessage.textContent = 'Please enter a promo code';
            promoMessage.className = 'promo-message error';
            return;
        }
        
        // In a real application, you would validate the promo code with your backend
        // This is just a demo
        if (promoCode.toUpperCase() === 'SAVORY10') {
            const totalElement = document.getElementById('total');
            const total = parseFloat(totalElement.textContent.replace('$', ''));
            const discountedTotal = total * 0.9;
            
            // Add discount row if not already present
            if (!document.querySelector('.discount-row')) {
                const subtotal = parseFloat(document.getElementById('subtotal').textContent.replace('$', ''));
                const discountRow = document.createElement('div');
                discountRow.className = 'summary-row discount-row';
                discountRow.innerHTML = `
                    <span>Discount (10%)</span>
                    <span>-$${(subtotal * 0.1).toFixed(2)}</span>
                `;
                
                const summaryDetails = document.querySelector('.summary-details');
                summaryDetails.insertBefore(discountRow, document.querySelector('.summary-row.total'));
            }
            
            totalElement.textContent = `$${discountedTotal.toFixed(2)}`;
            promoMessage.textContent = 'Promo code applied successfully!';
            promoMessage.className = 'promo-message success';
        } else {
            promoMessage.textContent = 'Invalid promo code';
            promoMessage.className = 'promo-message error';
        }
    });

    // Add recommended items to cart
    document.querySelectorAll('.btn-add').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemCard = this.closest('.recommendation-item');
            const itemName = itemCard.querySelector('h4').textContent;
            const itemPrice = parseFloat(itemCard.querySelector('.price').textContent.replace('$', ''));
            
            // In a real app, you would add this to your cart system
            alert(`${itemName} added to cart!`);
            
            // For demo purposes, we'll just reload the cart
            loadCartItems();
        });
    });
});
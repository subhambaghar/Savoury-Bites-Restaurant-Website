document.addEventListener('DOMContentLoaded', function() {
    const now = new Date();
    const minDatetime = new Date(now.getTime() + 30 * 60000); // 30 minutes from now
    const datetimeInput = document.getElementById('delivery-datetime');
    
    const minDatetimeString = minDatetime.toISOString().slice(0, 16);
    datetimeInput.min = minDatetimeString;
    
    datetimeInput.value = minDatetimeString;
    
    function loadCartItems() {
        const cartItems = [
            { name: 'Margherita Pizza', price: 12.99, quantity: 1 },
            { name: 'Garlic Bread', price: 4.99, quantity: 2 }
        ];
        
        const orderItemsContainer = document.querySelector('.order-items');
        let subtotal = 0;
        
        orderItemsContainer.innerHTML = '';
        
        // Add items to the order summary
        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'order-item';
            itemElement.innerHTML = `
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <span class="item-price">$${item.price.toFixed(2)}</span>
                </div>
                <div class="item-quantity">Qty: ${item.quantity}</div>
            `;
            orderItemsContainer.appendChild(itemElement);
            
            subtotal += item.price * item.quantity;
        });
        
        // Calculate totals
        const deliveryFee = 3.99;
        const taxRate = 0.09;
        const tax = subtotal * taxRate;
        const total = subtotal + deliveryFee + tax;
        
        // Update totals in the UI
        document.querySelector('.total-row:nth-child(1) span:last-child').textContent = `$${subtotal.toFixed(2)}`;
        document.querySelector('.total-row:nth-child(2) span:last-child').textContent = `$${deliveryFee.toFixed(2)}`;
        document.querySelector('.total-row:nth-child(3) span:last-child').textContent = `$${tax.toFixed(2)}`;
        document.querySelector('.grand-total span:last-child').textContent = `$${total.toFixed(2)}`;
    }
    loadCartItems();
    
    // Apply promo code
    document.querySelector('.btn-apply').addEventListener('click', function(e) {
        e.preventDefault();
        const promoCode = document.getElementById('promo-code').value.trim();
        
        if (promoCode === '') {
            alert('Please enter a promo code');
            return;
        }
        // This is just a demo
        if (promoCode.toUpperCase() === 'SAVORY10') {
            // Apply 10% discount
            const grandTotalElement = document.querySelector('.grand-total span:last-child');
            const total = parseFloat(grandTotalElement.textContent.replace('$', ''));
            const discountedTotal = total * 0.9;
            
            // Add discount row
            const orderTotals = document.querySelector('.order-totals');
            const existingDiscount = document.querySelector('.discount-row');
            
            if (!existingDiscount) {
                const discountRow = document.createElement('div');
                discountRow.className = 'total-row discount-row';
                discountRow.innerHTML = `
                    <span>Discount (10%)</span>
                    <span>-$${(total * 0.1).toFixed(2)}</span>
                `;
                orderTotals.insertBefore(discountRow, orderTotals.querySelector('.grand-total'));
            }
            
            grandTotalElement.textContent = `$${discountedTotal.toFixed(2)}`;
            alert('Promo code applied successfully!');
        } else {
            alert('Invalid promo code');
        }
    });
    
    // Form submission
    document.getElementById('checkoutForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        const email = document.getElementById('email').value;
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const postalCode = document.getElementById('postal-code').value;
        const phone = document.getElementById('phone').value;
        
        if (!email || !firstName || !lastName || !address || !city || !postalCode || !phone) {
            alert('Please fill in all required fields');
            return;
        }
        window.location.href = 'payment.html';
    });
    
    // Toggle delivery time options
    document.getElementById('schedule').addEventListener('change', function() {
        if (this.checked) {
            document.getElementById('schedule-time').style.display = 'block';
        }
    });
    
    document.getElementById('asap').addEventListener('change', function() {
        if (this.checked) {
            document.getElementById('schedule-time').style.display = 'none';
        }
    });
});
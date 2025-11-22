// Mobile Menu Toggle
const menuBtn = document.querySelector('#menu-btn');
const navbar = document.querySelector('.navbar');

menuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuBtn.classList.toggle('fa-times');
});

// Shopping Cart Toggle
const cartBtn = document.querySelector('#cart-btn');
const cart = document.querySelector('.shopping-cart');

cartBtn.addEventListener('click', () => {
    cart.classList.toggle('active');
});

// Close Cart When Click Outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.shopping-cart') && !e.target.closest('#cart-btn')) {
        cart.classList.remove('active');
    }
});

// Remove Item From Cart
document.querySelectorAll('.shopping-cart .fa-times').forEach(btn => {
    btn.addEventListener('click', function() {
        this.parentElement.remove();
        updateTotal();
    });
});

// Update Cart Total
function updateTotal() {
    let total = 0;
    document.querySelectorAll('.shopping-cart .box').forEach(box => {
        const price = parseFloat(box.querySelector('.price').textContent.replace('$', ''));
        const quantity = parseInt(box.querySelector('.quantity').textContent.replace('qty: ', ''));
        total += price * quantity;
    });
    document.querySelector('.shopping-cart .total').textContent = `Total: $${total.toFixed(2)}`;
}

// Add to Cart Functionality
document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function() {
        const item = this.closest('.menu-item');
        const itemName = item.querySelector('h3').textContent;
        const itemPrice = item.querySelector('.price').textContent;
        const itemImg = item.querySelector('img').src;

        // Check if item already exists in cart
        let exists = false;
        document.querySelectorAll('.shopping-cart .box').forEach(box => {
            if (box.querySelector('h3').textContent === itemName) {
                const quantityEl = box.querySelector('.quantity');
                const quantity = parseInt(quantityEl.textContent.replace('qty: ', '')) + 1;
                quantityEl.textContent = `qty: ${quantity}`;
                exists = true;
            }
        });

        if (!exists) {
            const cartItem = document.createElement('div');
            cartItem.className = 'box';
            cartItem.innerHTML = `
                <i class="fas fa-times"></i>
                <img src="${itemImg}" alt="${itemName}">
                <div class="content">
                    <h3>${itemName}</h3>
                    <span class="price">${itemPrice}</span>
                    <span class="quantity">qty: 1</span>
                </div>
            `;
            document.querySelector('.shopping-cart').insertBefore(cartItem, document.querySelector('.total'));
            
            // Add event listener to new remove button
            cartItem.querySelector('.fa-times').addEventListener('click', function() {
                this.parentElement.remove();
                updateTotal();
            });
        }

        updateTotal();
        cart.classList.add('active');
        
        // Show added notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = `${itemName} added to cart!`;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 2000);
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navbar.classList.remove('active');
            menuBtn.classList.remove('fa-times');
        }
    });
});

// Newsletter Form Submission
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input').value;
    
    // In a real app, you would send this to your server
    console.log('Subscribed email:', email);
    
    // Show success message
    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.textContent = 'Thanks for subscribing!';
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
    
    // Reset form
    this.reset();
});

// Sticky Header on Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        document.querySelector('.header').classList.add('sticky');
    } else {
        document.querySelector('.header').classList.remove('sticky');
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Any initialization code
});
/* ---------- CART ---------- */

var cart = [];   // each item: { name, price, qty }

/* Open / close the cart sidebar */
function toggleCart() {
    var sidebar = document.getElementById('cartSidebar');
    var overlay = document.getElementById('cartOverlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
}

/* Add an item to the cart */
function addToCart(name, price) {
    var existing = cart.find(function(item) {
        return item.name === name;
    });

    if (existing) {
        existing.qty = existing.qty + 1;
    } else {
        cart.push({ name: name, price: price, qty: 1 });
    }

    updateCartDisplay();
    showToast(name + ' added to cart!');
}

/* Remove an item from the cart */
function removeFromCart(name) {
    cart = cart.filter(function(item) {
        return item.name !== name;
    });
    updateCartDisplay();
}

/* Update the cart sidebar and badge */
function updateCartDisplay() {
    var cartItemsDiv = document.getElementById('cartItems');
    var cartCountEl  = document.getElementById('cartCount');
    var cartTotalEl  = document.getElementById('cartTotal');

    /* Total count for badge */
    var totalQty = cart.reduce(function(sum, item) {
        return sum + item.qty;
    }, 0);
    cartCountEl.textContent = totalQty;

    /* Total price */
    var totalPrice = cart.reduce(function(sum, item) {
        return sum + item.price * item.qty;
    }, 0);
    cartTotalEl.textContent = '₹' + totalPrice;

    /* Render items list */
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="cart-empty">🛒 Your cart is empty. Start adding delicious food!</p>';
        return;
    }

    var html = '';
    cart.forEach(function(item) {
        html += '<div class="cart-item">';
        html += '  <span class="cart-item-name">' + item.name + ' x' + item.qty + '</span>';
        html += '  <span class="cart-item-price">₹' + (item.price * item.qty) + '</span>';
        html += '  <button class="cart-item-remove" onclick="removeFromCart(\'' + item.name + '\')">✕</button>';
        html += '</div>';
    });
    cartItemsDiv.innerHTML = html;
}

/* Checkout button */
function checkout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }
    cart = [];
    updateCartDisplay();
    toggleCart();
    showToast('Order placed successfully! 🎉');
}


/* ---------- SEARCH ---------- */

function searchItems() {
    var query = document.getElementById('searchInput').value.trim().toLowerCase();
    var boxes  = document.querySelectorAll('.box');

    boxes.forEach(function(box) {
        var title = box.querySelector('h2').textContent.toLowerCase();
        if (query === '' || title.includes(query)) {
            box.style.display = 'block';
        } else {
            box.style.display = 'none';
        }
    });
}

/* Also trigger search when user presses Enter */
document.getElementById('searchInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        searchItems();
    }
});


/* ---------- MOBILE MENU ---------- */

function toggleMobileMenu() {
    var menu = document.getElementById('mobileMenu');
    menu.classList.toggle('open');
}


/* ---------- TOAST NOTIFICATION ---------- */

var toastTimer;

function showToast(message) {
    var toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(function() {
        toast.classList.remove('show');
    }, 2500);
}

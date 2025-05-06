// Läs in varukorg från localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Visa varukorgens innehåll
window.addEventListener('DOMContentLoaded', () => {
    uppdateraRaknare();

    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';

    if (cart.length === 0) {
        cartList.innerHTML = '<li>Varukorgen är tom.</li>';
    } else {
        cart.forEach(item => {
            const li = document.createElement('li');

            const img = document.createElement('img');
            img.src = item.bild;
            img.alt = item.namn;

            const span = document.createElement('span');
            span.textContent = item.namn;

            li.appendChild(img);
            li.appendChild(span);

            cartList.appendChild(li);
        });
    }
});

// Uppdatera räknaren
function uppdateraRaknare() {
    const counter = document.getElementById('cart-count');
    if (counter) counter.textContent = cart.length;
}

// Fortsätt till kassan
function fortsattTillKassa() {
    const användare = localStorage.getItem('loggedInUser');
    if (!användare) {
        alert("Du måste logga in innan du går till kassan.");
        window.location.href = 'login.html';
    } else {
        alert("Du är inloggad! Går till kassan...");
    }
}

// Töm varukorgen
function tomVarukorg() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById('cart-count').textContent = cart.length;
    document.getElementById('cart-items').innerHTML = '';
}

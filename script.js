// Skapa en global array för varukorgen (läs från localStorage om det finns tidigare sparad varukorg)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Funktion för att lägga till produkt i varukorgen
function kopProdukt(namn, bildUrl) {
    const produkt = {
        namn: namn,
        bild: bildUrl
    };
    cart.push(produkt);
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById('cart-count').textContent = cart.length;
}

// Funktion för att visa varukorgen
function visaVarukorg() {
    let cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';  // Töm varukorgslistan varje gång den öppnas

    // Lägg till alla produkter i varukorgen i listan
    cart.forEach((produkt) => {
        let li = document.createElement('li');
        li.textContent = produkt;
        cartItems.appendChild(li);
    });

    // Visa varukorgen
    document.getElementById('cart-popup').style.display = 'block';
}

// Funktion för att stänga varukorgen
function stangVarukorg() {
    document.getElementById('cart-popup').style.display = 'none';
}

// Funktion för att gå tillbaka till produktsidan
function goBack() {
    window.location.href = 'index.html';  // Återgå till produktsidan (index.html)
}

// Funktion för att kontrollera om användaren är inloggad innan kassa
function kontrolleraInloggning() {
    const användare = localStorage.getItem('loggedInUser');  // Hämta användare från localStorage
    if (!användare) {
        alert("Du måste logga in innan du går till kassan.");
        window.location.href = 'login.html';  // Om inte inloggad, omdirigera till login
    } else {
        alert("Du är inloggad! Går till kassan...");
        // Här kan du länka till en kassasida senare, t.ex. window.location.href = 'kassa.html';
    }
}

// Filtrera produkter baserat på sökning
document.getElementById('search-input').addEventListener('input', filterProdukter);

// Sortera produkter baserat på pris
document.getElementById('sort-select').addEventListener('change', sorteraProdukter);

function filterProdukter() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const produkter = document.querySelectorAll('.product');

    produkter.forEach(product => {
        const namn = product.querySelector('h2').textContent.toLowerCase();
        product.style.display = namn.includes(input) ? 'block' : 'none';
    });
}

function sorteraProdukter() {
    const sortVal = document.getElementById('sort-select').value;
    const container = document.querySelector('.products');
    const produkter = Array.from(container.children);

    produkter.sort((a, b) => {
        const prisA = parseInt(a.querySelector('p').textContent.replace(/\D/g, ''));
        const prisB = parseInt(b.querySelector('p').textContent.replace(/\D/g, ''));
        return sortVal === 'asc' ? prisA - prisB : sortVal === 'desc' ? prisB - prisA : 0;
    });

    produkter.forEach(prod => container.appendChild(prod));
}

function filtreraProdukter(kategori) {
    const produkter = document.querySelectorAll('.product');
    produkter.forEach(produkt => {
        const produktKategori = produkt.dataset.kategori;
        if (kategori === 'alla' || produktKategori === kategori) {
            produkt.style.display = 'block';
        } else {
            produkt.style.display = 'none';
        }
    });
}

// Uppdatera räknaren för varukorgen på varje sida
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('cart-count').textContent = cart.length;
});

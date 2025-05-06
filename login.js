function loggaIn() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const savedUsers = JSON.parse(localStorage.getItem('users')) || {};

    if (savedUsers[username] && savedUsers[username] === password) {
        localStorage.setItem('loggedInUser', username);
        document.getElementById('login-message').textContent = "Inloggning lyckades!";
        setTimeout(() => window.location.href = 'index.html', 1000);
    } else {
        document.getElementById('login-message').textContent = "Fel användarnamn eller lösenord!";
    }
}

function skapaKonto() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (username === '' || password === '') {
        document.getElementById('login-message').textContent = "Fyll i alla fält!";
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username]) {
        document.getElementById('login-message').textContent = "Användarnamnet är redan taget!";
    } else {
        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        document.getElementById('login-message').textContent = "Konto skapat! Du kan nu logga in.";
    }
}

function tillbakaTillStart() {
    window.location.href = 'index.html';
}

// Vérifie si l'admin est déjà connecté
if (localStorage.getItem("adminConnecte") === "oui") {
    window.location.href = "admin.html";
}

// Gestion du formulaire de connexion
document.getElementById("loginForm").addEventListener("submit", function(e) {

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");

    // Identifiants de connexion
    const ADMIN_USERNAME = "@franck@14138197";
    const ADMIN_PASSWORD = "14138197";

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {

        // Sauvegarde de la connexion
        localStorage.setItem("adminConnecte", "oui");

        // Redirection vers la page d'administration
        window.location.href = "admin.html";

    } else {

        message.style.color = "red";
        message.textContent = "Nom d'utilisateur ou code incorrect.";

    }

});

// Afficher / Masquer le mot de passe
const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", function () {

    if (password.type === "password") {
        password.type = "text";
        togglePassword.textContent = "🙈";
    } else {
        password.type = "password";
        togglePassword.textContent = "👁️";
    }

});


const loginForm = document.getElementById("login-form");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const successMessage = document.getElementById("success-message");

loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

   
    emailError.style.display = "none";
    passwordError.style.display = "none";
    successMessage.style.display = "none";

    const email = loginEmail.value.trim();
    const password = loginPassword.value;

    
    const users = JSON.parse(localStorage.getItem("users")) || [];

    
    const user = users.find(u => u.email === email);

    if(!user) {
        emailError.textContent = "Email not found. Please register first.";
        emailError.style.display = "block";
        return;
    }

    if(user.password !== password) {
        passwordError.textContent = "Incorrect password. Try again.";
        passwordError.style.display = "block";
        return;
    }

   
    successMessage.style.display = "block";

   
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1500);
});
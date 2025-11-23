
  const loginLink = document.getElementById("login-link");
  const registerLink = document.getElementById("register-link");
  const logoutLink = document.getElementById("logout-link");

  
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedInUser) {
    
    loginLink.style.display = "none";
    registerLink.style.display = "none";
    logoutLink.style.display = "inline-block";
  } else {
    logoutLink.style.display = "none";
  }

  
  logoutLink.addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.removeItem("loggedInUser"); 
    loginLink.style.display = "inline-block";
    registerLink.style.display = "inline-block";
    logoutLink.style.display = "none";
    alert("You have logged out successfully!");
    window.location.href = "login.html"; 
  });
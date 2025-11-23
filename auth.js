document.addEventListener('DOMContentLoaded', function(){

  // ===== Navbar Login/Logout =====
  function updateNavbar(){
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const loginLink = document.getElementById("login-link");
    const registerLink = document.getElementById("register-link");
    const logoutLink = document.getElementById("logout-link");

    if(loggedInUser){
      if(loginLink) loginLink.style.display="none";
      if(registerLink) registerLink.style.display="none";
      if(logoutLink) logoutLink.style.display="inline-block";
    } else {
      if(loginLink) loginLink.style.display="inline-block";
      if(registerLink) registerLink.style.display="inline-block";
      if(logoutLink) logoutLink.style.display="none";
    }

    if(logoutLink){
      logoutLink.addEventListener("click", function(e){
        e.preventDefault();
        localStorage.removeItem("loggedInUser");
        alert("You have logged out successfully!");
        updateNavbar();
        window.location.href="login.html";
      });
    }
  }
  updateNavbar();

  // ===== Password Toggle =====
  ['password','confirmPassword'].forEach(id=>{
    const toggleBtn = document.getElementById('toggle'+id.charAt(0).toUpperCase()+id.slice(1));
    const input = document.getElementById(id);
    if(toggleBtn){
      toggleBtn.addEventListener('click', function(){
        const type = input.type==='password' ? 'text' : 'password';
        input.type = type;
        this.innerHTML = type==='password'? '<i class="fa fa-eye"></i>' : '<i class="fa fa-eye-slash"></i>';
      });
    }
  });

  // ===== Registration Logic =====
  const registerForm = document.getElementById('register-form');
  if(registerForm){
    const submitBtn = document.getElementById('submit-btn');
    const successMessage = document.getElementById('success-message');

    // Validation functions
    const validations = {
      fullName: v=>v.length>=2,
      email: v=> /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      phone: v=> v==='' || /^[\d\s\-\(\)]+$/.test(v),
      address: v=>v.length>=5,
      parish: v=>v!=='',
      accountType: v=>v!=='',
      securityQuestion: v=>v!=='',
      securityAnswer: v=>v.length>=2,
      password: v=>v.length>=8,
      confirmPassword: v=>v===document.getElementById('password').value
    };

    function validateField(field,errorEl,fn){
      const value = field.value.trim();
      const valid = fn(value);
      if(!valid){
        field.parentElement.classList.add('error');
        field.parentElement.classList.remove('success');
        if(errorEl) errorEl.style.display='block';
      } else {
        field.parentElement.classList.remove('error');
        field.parentElement.classList.add('success');
        if(errorEl) errorEl.style.display='none';
      }
      return valid;
    }

    // Password Strength
    const pwdInput = document.getElementById('password');
    const strengthBar = document.getElementById('password-strength-bar');
    const strengthText = document.getElementById('password-strength-text');
    if(pwdInput){
      pwdInput.addEventListener('input', function(){
        let val = this.value, strength=0, color='#e74c3c', text='Weak';
        if(val.length>=8) strength+=25;
        if(/[a-z]/.test(val)) strength+=25;
        if(/[A-Z]/.test(val)) strength+=25;
        if(/[0-9]/.test(val)||/[^a-zA-Z0-9]/.test(val)) strength+=25;
        if(strength<=25){ text='Weak'; color='#e74c3c'; }
        else if(strength<=50){ text='Fair'; color='#f39c12'; }
        else if(strength<=75){ text='Good'; color='#3498db'; }
        else{ text='Strong'; color='#2ecc71'; }
        if(strengthBar) strengthBar.style.width=strength+'%';
        if(strengthBar) strengthBar.style.backgroundColor=color;
        if(strengthText){ strengthText.textContent=text; strengthText.style.color=color; }
      });
    }

    // Submit Registration
    registerForm.addEventListener('submit', function(e){
      e.preventDefault();
      let isValid=true;
      Object.keys(validations).forEach(id=>{
        const field = document.getElementById(id);
        const error = document.getElementById(id+'-error');
        if(field) isValid = validateField(field,error,validations[id]) && isValid;
      });
      if(!isValid) return;

      submitBtn.disabled=true;
      submitBtn.innerHTML='<i class="fa fa-spinner fa-spin"></i> Creating Account...';

      setTimeout(()=>{
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const email = document.getElementById('email').value.trim();
        if(users.some(u=>u.email===email)){
          const err = document.getElementById('email-error');
          if(err){ err.textContent='Email already registered'; err.style.display='block'; }
          submitBtn.disabled=false;
          submitBtn.innerHTML='<i class="fa fa-user-plus"></i> Create Account';
          return;
        }

        const formData = {};
        Object.keys(validations).forEach(id=>{
          const field = document.getElementById(id);
          if(field) formData[id]=field.value.trim();
        });

        users.push(formData);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUser', JSON.stringify(formData)); // auto-login

        if(successMessage) successMessage.style.display='block';
        registerForm.reset();
        submitBtn.disabled=false;
        submitBtn.innerHTML='<i class="fa fa-user-plus"></i> Create Account';

        if(strengthBar) strengthBar.style.width='0';
        if(strengthText){ strengthText.textContent='Password strength'; strengthText.style.color='#666'; }

        setTimeout(()=>{ window.location.href='index.html'; },1500);
      },1000);
    });
  }

});
// Navbar logout functionality
  const logoutLink = document.getElementById('logout-link');
  const loginLink = document.getElementById('login-link');
  const registerLink = document.getElementById('register-link');

  function updateNavbar() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if(loggedInUser) {
      loginLink.style.display = 'none';
      registerLink.style.display = 'none';
      logoutLink.style.display = 'inline-block';
    } else {
      loginLink.style.display = 'inline-block';
      registerLink.style.display = 'inline-block';
      logoutLink.style.display = 'none';
    }
  }

  logoutLink.addEventListener('click', function(e){
    e.preventDefault();
    localStorage.removeItem("loggedInUser");
    updateNavbar();
    window.location.href = 'login.html';
  });

  updateNavbar();

  // CART functionality
  const cartItemsContainer = document.getElementById('cart-items');
  const cartEmptyMessage = document.getElementById('cart-empty');
  const clearCartBtn = document.getElementById('clear-cart-btn');

  function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cartItemsContainer.innerHTML = '';

    if(cart.length === 0) {
      cartEmptyMessage.style.display = 'block';
      clearCartBtn.style.display = 'none';
      return;
    }

    cartEmptyMessage.style.display = 'none';
    clearCartBtn.style.display = 'inline-block';

    cart.forEach((item, index) => {
      const div = document.createElement('div');
      div.classList.add('cart-item', 'card');
      div.innerHTML = `
        <h3>${item.service}</h3>
        <p><strong>Name:</strong> ${item.name}</p>
        <p><strong>Email:</strong> ${item.email}</p>
        <p><strong>Phone:</strong> ${item.phone}</p>
        <p><strong>Address:</strong> ${item.address}</p>
        <p><strong>Frequency:</strong> ${item.frequency}</p>
        <p><strong>Date:</strong> ${item.date}</p>
        <p><strong>Notes:</strong> ${item.notes}</p>
        <button class="remove-btn" data-index="${index}"><i class="fa fa-trash"></i> Remove</button>
      `;
      cartItemsContainer.appendChild(div);
    });

    // Add remove functionality
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const index = this.getAttribute('data-index');
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });
    });
  }

  // Clear entire cart
  clearCartBtn.addEventListener('click', function() {
    localStorage.removeItem('cart');
    renderCart();
  });

  renderCart();


  const checkoutBtn = document.getElementById('checkout-btn');

checkoutBtn.addEventListener('click', function() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Optional: Show confirmation message with number of services
  alert(You have ${cart.length} service(s) in your cart. Proceeding to checkout...);

  // Optional: Clear the cart after checkout
  // localStorage.removeItem('cart');
  // renderCart();

  // Redirect to a confirmation page or home page
  window.location.href = 'checkout.html'; // change this if you have a checkout page
});
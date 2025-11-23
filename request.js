
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('request-form');

  const inputs = form.querySelectorAll('input, select, textarea');

  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });
    input.addEventListener('input', function() {
      clearError(this);
    });
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    inputs.forEach(input => {
      if (input.hasAttribute('required') && !validateField(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      // Collect form data
      const cartItem = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        address: document.getElementById('address').value.trim(),
        service: document.getElementById('service').value,
        frequency: document.getElementById('frequency').value,
        date: document.getElementById('date').value,
        notes: document.getElementById('notes').value.trim(),
        addedAt: new Date().toISOString()
      };

      // Save to cart in localStorage
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(cartItem);
      localStorage.setItem('cart', JSON.stringify(cart));

      // Redirect to cart page
      window.location.href = 'cart.html';
    }
  });

  function validateField(field) {
    const value = field.value.trim();
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');

    formGroup.classList.remove('error', 'success');

    if (field.hasAttribute('required') && value === '') {
      formGroup.classList.add('error');
      if (errorElement) errorElement.style.display = 'block';
      return false;
    }

    if (field.type === 'email' && value !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        formGroup.classList.add('error');
        if (errorElement) {
          errorElement.textContent = 'Please enter a valid email address';
          errorElement.style.display = 'block';
        }
        return false;
      }
    }

    if (field.type === 'date' && value !== '') {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        formGroup.classList.add('error');
        if (errorElement) {
          errorElement.textContent = 'Please select a future date';
          errorElement.style.display = 'block';
        }
        return false;
      }
    }

    formGroup.classList.add('success');
    return true;
  }

  function clearError(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');

    formGroup.classList.remove('error');
    if (errorElement) errorElement.style.display = 'none';
  }

  // Minimum date today
  const dateInput = document.getElementById('date');
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
});

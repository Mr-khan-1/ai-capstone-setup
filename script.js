const form = document.getElementById('settings-form');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const timezone = document.getElementById('timezone');
const successMessage = document.getElementById('form-success');

const validators = {
  fullName: (value) => {
    if (!value.trim()) return 'Full name is required.';
    if (value.trim().length < 2) return 'Full name must be at least 2 characters.';
    return '';
  },
  email: (value) => {
    if (!value.trim()) return 'Email address is required.';
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) return 'Please enter a valid email address.';
    return '';
  },
  password: (value) => {
    if (!value) return 'Password is required.';
    if (value.length < 8) return 'Password must be at least 8 characters.';
    if (!/[A-Z]/.test(value)) return 'Password must include an uppercase letter.';
    if (!/[0-9]/.test(value)) return 'Password must include a number.';
    if (!/[^A-Za-z0-9]/.test(value)) return 'Password must include a symbol.';
    return '';
  },
  confirmPassword: (value) => {
    if (!value) return 'Please confirm your password.';
    if (value !== password.value) return 'Passwords do not match.';
    return '';
  },
  timezone: (value) => {
    if (!value) return 'Please choose a timezone.';
    return '';
  }
};

function setError(field, message) {
  const errorElement = document.getElementById(`${field.id}-error`);
  if (message) {
    field.classList.add('invalid');
    errorElement.textContent = message;
  } else {
    field.classList.remove('invalid');
    errorElement.textContent = '';
  }
}

function validateField(field) {
  const message = validators[field.name](field.value);
  setError(field, message);
  return !message;
}

[fullName, email, password, confirmPassword, timezone].forEach((field) => {
  field.addEventListener('input', () => {
    validateField(field);
    if (field === password || field === confirmPassword) {
      validateField(confirmPassword);
    }
  });

  field.addEventListener('change', () => {
    validateField(field);
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  successMessage.textContent = '';

  const fields = [fullName, email, password, confirmPassword, timezone];
  const isValid = fields.every((field) => validateField(field));

  if (isValid) {
    successMessage.textContent = 'Settings saved successfully.';
    form.reset();
  }
});

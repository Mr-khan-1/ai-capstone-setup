const form = document.getElementById('settings-form');
const submitButton = document.getElementById('submit-button');
const statusMessage = document.getElementById('form-status');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const notificationsInput = document.getElementById('notifications');

const touchedFields = new Set();
const fields = [nameInput, emailInput, passwordInput];

function validateName(value) {
  if (!value.trim()) return 'Name is required.';
  return '';
}

function validateEmail(value) {
  const trimmed = value.trim();
  if (!trimmed) return 'Email is required.';

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(trimmed)) return 'Please enter a valid email address.';

  return '';
}

function validatePassword(value) {
  if (!value) return 'Password is required.';
  if (value.length < 8) return 'Password must be at least 8 characters.';
  if (!/\d/.test(value)) return 'Password must include at least one number.';
  return '';
}

function validateField(name, value) {
  switch (name) {
    case 'name':
      return validateName(value);
    case 'email':
      return validateEmail(value);
    case 'password':
      return validatePassword(value);
    default:
      return '';
  }
}

function updateFieldState(fieldName) {
  const input = document.getElementById(fieldName);
  const errorElement = document.getElementById(`${fieldName}-error`);
  const message = touchedFields.has(fieldName) ? validateField(fieldName, input.value) : '';

  input.setAttribute('aria-describedby', `${fieldName}-error`);
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
  errorElement.textContent = message;
}

function isFormValid() {
  return fields.every((input) => !validateField(input.name, input.value));
}

function updateSubmitState() {
  submitButton.disabled = !isFormValid();
}

function markTouched(fieldName) {
  touchedFields.add(fieldName);
  updateFieldState(fieldName);
  updateSubmitState();
}

fields.forEach((input) => {
  input.addEventListener('blur', () => {
    markTouched(input.name);
  });

  input.addEventListener('input', () => {
    updateSubmitState();
  });
});

notificationsInput.addEventListener('change', () => {
  updateSubmitState();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  statusMessage.textContent = '';

  fields.forEach((input) => {
    touchedFields.add(input.name);
    updateFieldState(input.name);
  });

  if (!isFormValid()) {
    updateSubmitState();
    statusMessage.textContent = 'Please fix the highlighted fields.';
    return;
  }

  const nameValue = nameInput.value.trim();
  const notificationsEnabled = notificationsInput.checked;
  statusMessage.textContent = `Settings saved for ${nameValue}${notificationsEnabled ? ' with notifications enabled.' : '.'}`;
  form.reset();
  touchedFields.clear();
  updateSubmitState();
});

updateSubmitState();
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

function updateFieldState(fieldName) {
  const input = document.getElementById(fieldName);
  const errorElement = document.getElementById(`${fieldName}-error`);
  const message = touchedFields.has(fieldName) ? validateField(fieldName, input.value) : '';

  input.setAttribute('aria-describedby', `${fieldName}-error`);
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
  errorElement.textContent = message;
}

function isFormValid() {
  return fields.every((input) => !validateField(input.name, input.value));
}

function updateSubmitState() {
  submitButton.disabled = !isFormValid();
}

function markTouched(fieldName) {
  touchedFields.add(fieldName);
  updateFieldState(fieldName);
  updateSubmitState();
}

fields.forEach((input) => {
  input.addEventListener('blur', () => {
    markTouched(input.name);
  });

  input.addEventListener('input', () => {
    updateSubmitState();
  });
});

notificationsInput.addEventListener('change', () => {
  updateSubmitState();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  statusMessage.textContent = '';

  fields.forEach((input) => {
    touchedFields.add(input.name);
    updateFieldState(input.name);
  });

  if (!isFormValid()) {
    updateSubmitState();
    statusMessage.textContent = 'Please fix the highlighted fields.';
    return;
  }

  const nameValue = nameInput.value.trim();
  const notificationsEnabled = notificationsInput.checked;
  statusMessage.textContent = `Settings saved for ${nameValue}${notificationsEnabled ? ' with notifications enabled.' : '.'}`;
  form.reset();
  touchedFields.clear();
  updateSubmitState();
});

updateSubmitState();

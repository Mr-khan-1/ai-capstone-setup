const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

class FakeClassList {
  constructor() {
    this.values = new Set();
  }

  add(...tokens) {
    tokens.forEach((token) => this.values.add(token));
  }

  remove(...tokens) {
    tokens.forEach((token) => this.values.delete(token));
  }

  contains(token) {
    return this.values.has(token);
  }
}

class FakeElement {
  constructor(id, name = '', type = 'text') {
    this.id = id;
    this.name = name;
    this.type = type;
    this.value = '';
    this.checked = false;
    this.classList = new FakeClassList();
    this.listeners = {};
    this.attributes = {};
    this.textContent = '';
  }

  addEventListener(type, handler) {
    if (!this.listeners[type]) this.listeners[type] = [];
    this.listeners[type].push(handler);
  }

  dispatchEvent(event) {
    const handlers = this.listeners[event.type] || [];
    handlers.forEach((handler) => handler.call(this, event));
    return true;
  }

  setAttribute(name, value) {
    this.attributes[name] = String(value);
  }

  getAttribute(name) {
    return this.attributes[name];
  }

  reset() {
    this.value = '';
    this.checked = false;
  }
}

function loadFormWithScript() {
  const elements = {};
  const createElement = (id, name = '', type = 'text') => {
    const element = new FakeElement(id, name, type);
    elements[id] = element;
    return element;
  };

  const form = createElement('settings-form');
  const fullName = createElement('fullName', 'fullName');
  const email = createElement('email', 'email', 'email');
  const password = createElement('password', 'password', 'password');
  const confirmPassword = createElement('confirmPassword', 'confirmPassword', 'password');
  const timezone = createElement('timezone', 'timezone');
  const successMessage = createElement('form-success');
  const marketing = createElement('marketing', 'marketing', 'checkbox');

  const fullNameError = createElement('fullName-error');
  const emailError = createElement('email-error');
  const passwordError = createElement('password-error');
  const confirmPasswordError = createElement('confirmPassword-error');
  const timezoneError = createElement('timezone-error');

  form.reset = () => {
    [fullName, email, password, confirmPassword, timezone, marketing].forEach((field) => {
      field.value = '';
      field.checked = false;
    });
  };

  const document = {
    getElementById(id) {
      return elements[id];
    }
  };

  const window = {
    document,
    Event: class Event {
      constructor(type) {
        this.type = type;
        this.defaultPrevented = false;
      }

      preventDefault() {
        this.defaultPrevented = true;
      }
    }
  };

  const script = fs.readFileSync(path.join(__dirname, '..', 'script.js'), 'utf8');
  vm.runInNewContext(script, { document, window, console, Event: window.Event });

  return { window, form, fullName, email, password, confirmPassword, timezone, successMessage, fullNameError, emailError, passwordError, confirmPasswordError, timezoneError };
}

function getField(context, id) {
  return context.window.document.getElementById(id);
}

test('empty submission shows validation errors for all required fields', () => {
  const context = loadFormWithScript();
  context.form.dispatchEvent(new context.window.Event('submit'));

  assert.match(context.fullNameError.textContent, /required/i);
  assert.match(context.emailError.textContent, /required/i);
  assert.match(context.passwordError.textContent, /required/i);
  assert.match(context.confirmPasswordError.textContent, /confirm/i);
  assert.match(context.timezoneError.textContent, /timezone/i);
});

test('whitespace-only name is invalid', () => {
  const context = loadFormWithScript();
  context.fullName.value = '   ';
  context.fullName.dispatchEvent(new context.window.Event('input'));

  assert.match(context.fullNameError.textContent, /required|at least 2/i);
});

test('invalid email format without @ symbol is rejected', () => {
  const context = loadFormWithScript();
  context.email.value = 'invalid-email';
  context.email.dispatchEvent(new context.window.Event('input'));

  assert.match(context.emailError.textContent, /valid email/i);
});

test('valid email with plus addressing is accepted', () => {
  const context = loadFormWithScript();
  context.email.value = 'test+tag@gmail.com';
  context.email.dispatchEvent(new context.window.Event('input'));

  assert.equal(context.emailError.textContent, '');
});

test('short password is rejected', () => {
  const context = loadFormWithScript();
  context.password.value = 'Abc123';
  context.password.dispatchEvent(new context.window.Event('input'));

  assert.match(context.passwordError.textContent, /at least 8|number|uppercase|symbol/i);
});

test('valid full submission succeeds', () => {
  const context = loadFormWithScript();

  context.fullName.value = 'Jordan Lee';
  context.email.value = 'jordan@example.com';
  context.password.value = 'StrongPass1!';
  context.confirmPassword.value = 'StrongPass1!';
  context.timezone.value = 'UTC';

  [context.fullName, context.email, context.password, context.confirmPassword, context.timezone].forEach((field) => {
    field.dispatchEvent(new context.window.Event('input'));
  });

  context.form.dispatchEvent(new context.window.Event('submit'));

  assert.match(context.successMessage.textContent, /saved successfully/i);
});

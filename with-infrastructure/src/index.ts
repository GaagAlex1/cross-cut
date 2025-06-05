import {
    Credentials,
    InputElement,
    ShowMessageFn,
    ValidateEmailFn,
    CheckCredentialsFn
} from './types';

const CORRECT_CREDENTIALS: Credentials = {
    email: 'user@example.com',
    password: 'password123'
};

const showMessage: ShowMessageFn = (msg, type) => {
    const messageEl = document.getElementById('message') as HTMLParagraphElement;
    messageEl.textContent = msg;
    messageEl.style.color = type === 'error' ? '#dc2626' : '#16a34a';
};

function shakeElement(el: HTMLElement): void {
    el.classList.add('shake');
    setTimeout(() => {
        el.classList.remove('shake');
    }, 500);
}

export const validateEmailFormat: ValidateEmailFn = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const checkCredentials: CheckCredentialsFn = (email, password) => {
    return (
        email === CORRECT_CREDENTIALS.email &&
        password === CORRECT_CREDENTIALS.password
    );
};

function storeCredentials(email: string, password: string, rememberMe: boolean): void {
    if (rememberMe) {
        localStorage.setItem('savedEmail', email);
        localStorage.setItem('savedPassword', password);
    } else {
        sessionStorage.setItem('savedEmail', email);
        sessionStorage.setItem('savedPassword', password);
    }
}

function togglePasswordVisibility(btn: HTMLButtonElement): void {
    const pwInput = document.getElementById('password') as HTMLInputElement;
    const isHidden = btn.getAttribute('aria-pressed') === 'false';

    if (isHidden) {
        pwInput.type = 'text';
        btn.textContent = 'Hide';
        btn.setAttribute('aria-pressed', 'true');
        btn.setAttribute('aria-label', 'Hide password');
    } else {
        pwInput.type = 'password';
        btn.textContent = 'Show';
        btn.setAttribute('aria-pressed', 'false');
        btn.setAttribute('aria-label', 'Show password');
    }
}

function handleFormSubmit(e: Event): void {
    e.preventDefault();

    const emailInput = document.getElementById('email') as InputElement;
    const passwordInput = document.getElementById('password') as InputElement;
    const rememberCheckbox = document.getElementById('keepLogged') as HTMLInputElement;

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const rememberMe = rememberCheckbox.checked;

    if (!email || !password) {
        showMessage('Please fill in all fields.', 'error');
        if (!email) shakeElement(emailInput);
        if (!password) shakeElement(passwordInput);
        return;
    }

    if (!validateEmailFormat(email)) {
        showMessage('Invalid email format.', 'error');
        shakeElement(emailInput);
        return;
    }

    if (password.length < 6) {
        showMessage('Password must be at least 6 characters.', 'error');
        shakeElement(passwordInput);
        return;
    }

    if (!checkCredentials(email, password)) {
        showMessage('Incorrect email or password.', 'error');
        shakeElement(emailInput);
        shakeElement(passwordInput);
        return;
    }

    storeCredentials(email, password, rememberMe);
    showMessage('Success! You are logged in.', 'success');
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm') as HTMLFormElement;
    const togglePasswordBtn = document.getElementById('togglePassword') as HTMLButtonElement;
    const keepLoggedCheckbox = document.getElementById('keepLogged') as HTMLInputElement;

    loginForm.addEventListener('submit', handleFormSubmit);
    togglePasswordBtn.addEventListener('click', () =>
        togglePasswordVisibility(togglePasswordBtn)
    );
    keepLoggedCheckbox.addEventListener('change', (e) => {
        const cb = e.target as HTMLInputElement;
        cb.setAttribute('aria-checked', cb.checked.toString());
    });

    const savedEmail =
        localStorage.getItem('savedEmail') || sessionStorage.getItem('savedEmail');
    const savedPassword =
        localStorage.getItem('savedPassword') ||
        sessionStorage.getItem('savedPassword');

    if (savedEmail && savedPassword) {
        (document.getElementById('email') as HTMLInputElement).value = savedEmail;
        (document.getElementById('password') as HTMLInputElement).value = savedPassword;
        keepLoggedCheckbox.checked = Boolean(localStorage.getItem('savedEmail'));
        keepLoggedCheckbox.setAttribute(
            'aria-checked',
            keepLoggedCheckbox.checked.toString()
        );
    }
});

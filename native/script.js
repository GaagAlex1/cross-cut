// Hard-coded "correct" credentials
const CORRECT_EMAIL = "user@example.com";
const CORRECT_PASSWORD = "password123";

function togglePasswordVisibility(btn) {
    const passwordInput = document.getElementById("password");
    const isHidden = btn.getAttribute("aria-pressed") === "false";

    if (isHidden) {
        passwordInput.type = "text";
        btn.textContent = "Hide";
        btn.setAttribute("aria-pressed", "true");
        btn.setAttribute("aria-label", "Hide password");
    } else {
        passwordInput.type = "password";
        btn.textContent = "Show";
        btn.setAttribute("aria-pressed", "false");
        btn.setAttribute("aria-label", "Show password");
    }
}

const showMessage = (msg, type) => {
    const messageEl = document.getElementById("message");
    messageEl.textContent = msg;
    if (type === "error") {
        messageEl.style.color = "#dc2626"; // red
    } else {
        messageEl.style.color = "#16a34a"; // green
    }
};

function shakeElement(element) {
    element.classList.add("shake");
    setTimeout(() => {
        element.classList.remove("shake");
    }, 500);
}

const checkCredentials = (email, password) => {
    return email === CORRECT_EMAIL && password === CORRECT_PASSWORD;
};

function storeCredentials(email, password, rememberMe) {
    if (rememberMe) {
        localStorage.setItem("savedEmail", email);
        localStorage.setItem("savedPassword", password);
    } else {
        sessionStorage.setItem("savedEmail", email);
        sessionStorage.setItem("savedPassword", password);
    }
}

const validateEmailFormat = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

function handleFormSubmit(e) {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const rememberCheckbox = document.getElementById("keepLogged");

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const rememberMe = rememberCheckbox.checked;

    if (!email || !password) {
        showMessage("Please fill in all fields.", "error");
        if (!email) shakeElement(emailInput);
        if (!password) shakeElement(passwordInput);
        return;
    }

    if (!validateEmailFormat(email)) {
        showMessage("Invalid email format.", "error");
        shakeElement(emailInput);
        return;
    }

    if (password.length < 6) {
        showMessage("Password must be at least 6 characters.", "error");
        shakeElement(passwordInput);
        return;
    }

    if (!checkCredentials(email, password)) {
        showMessage("Incorrect email or password.", "error");
        shakeElement(emailInput);
        shakeElement(passwordInput);
        return;
    }

    storeCredentials(email, password, rememberMe);
    showMessage("Success! You are logged in.", "success");
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const togglePasswordBtn = document.getElementById("togglePassword");
    const keepLoggedCheckbox = document.getElementById("keepLogged");

    loginForm.addEventListener("submit", handleFormSubmit);

    togglePasswordBtn.addEventListener("click", () =>
        togglePasswordVisibility(togglePasswordBtn)
    );

    keepLoggedCheckbox.addEventListener("change", (e) => {
        e.target.setAttribute("aria-checked", e.target.checked.toString());
    });

    const savedEmail =
        localStorage.getItem("savedEmail") || sessionStorage.getItem("savedEmail");
    const savedPassword =
        localStorage.getItem("savedPassword") ||
        sessionStorage.getItem("savedPassword");

    if (savedEmail && savedPassword) {
        document.getElementById("email").value = savedEmail;
        document.getElementById("password").value = savedPassword;
        keepLoggedCheckbox.checked = Boolean(localStorage.getItem("savedEmail"));
        keepLoggedCheckbox.setAttribute(
            "aria-checked",
            keepLoggedCheckbox.checked.toString()
        );
    }
});

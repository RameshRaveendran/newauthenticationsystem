const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});


console.log('login js loaded');

// js validation

// SIGN IN — select elements
const loginForm = document.querySelector("#loginForm");
const loginUsername = document.querySelector("#loginUsername");
const loginPassword = document.querySelector("#loginPassword");
const loginError = document.querySelector("#loginError");

// SIGN IN LOGIC
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = loginUsername.value.trim();
    const password = loginPassword.value.trim();

    if (username.length === 0) {
        loginError.innerText = "❌ Username is required";
        return;
    }

    if (password.length < 6) {
        loginError.innerText = "❌ Password must be at least 6 characters";
        return;
    }

    loginError.innerText = "";

    console.log("Sending login data:", { username, password });
});

// SIGN UP — select elements
const signupForm = document.querySelector("#signupForm");
const signupUsername = document.querySelector("#signupUsername");
const signupEmail = document.querySelector("#signupEmail");
const signupPassword = document.querySelector("#signupPassword");
const signupError = document.querySelector("#signupError");

// SIGN UP LOGIC
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = signupUsername.value.trim();
    const email = signupEmail.value.trim();
    const password = signupPassword.value.trim();

    if (username.length === 0) {
        signupError.innerText = "❌ Username is required";
        return;
    }

    // Email pattern check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        signupError.innerText = "❌ Invalid email format";
        return;
    }

    if (password.length < 6) {
        signupError.innerText = "❌ Password must be at least 6 characters";
        return;
    }

    signupError.innerText = "";

    console.log("Sending signup data:", { username, email, password });
});

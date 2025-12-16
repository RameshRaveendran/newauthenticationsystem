const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");



sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");

  // redirect after animation time (600ms or based on your CSS)
  setTimeout(() => {
    window.location.href = "/register";
  }, 2000);  // adjust based on your CSS transition time
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");

  setTimeout(() => {
    window.location.href = "/login";
  }, 2000);
});





console.log('login js loaded');

// js validation

// SIGN IN / LOGIN — select elements //////////////////////////////////////////////////////
const loginForm = document.querySelector("#loginForm");
const loginUsername = document.querySelector("#loginUsername");
const loginPassword = document.querySelector("#loginPassword");
const loginError = document.querySelector("#loginError");

// SIGN IN LOGIC
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // ❌ stop normal submit

  const username = loginUsername.value.trim();
  const password = loginPassword.value.trim();

  // 1️⃣ Both missing
  if (!username && !password) {
    return Swal.fire("Error", "Username and Password are required", "error");
  }

  // 2️⃣ Username missing
  if (!username) {
    return Swal.fire("Error", "Username is required", "error");
  }

  // 3️⃣ Password missing
  if (!password) {
    return Swal.fire("Error", "Password is required", "error");
  }

  // 4️⃣ Send to backend
  try {
    const res = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        loginUsername: username,
        loginPassword: password
      })
    });

    const data = await res.json();

    if (!data.success) {
      return Swal.fire("Login Failed", data.message, "error");
    }

    // ✅ success
    Swal.fire({
      title: "Success",
      text: "Login successful",
      icon: "success",
      timer: 1500,
      showConfirmButton: false
    }).then(() => {
      window.location.href = "/user/dashboard";
    });

  } catch (err) {
    Swal.fire("Error", "Server error. Try again.", "error");
  }
});





// SIGN UP — select elements
const signupForm = document.querySelector("#signupForm");
const signupUsername = document.querySelector("#signupUsername");
const signupEmail = document.querySelector("#signupEmail");
const signupPassword = document.querySelector("#signupPassword");
const signupError = document.querySelector("#signupError");

// SIGN UP LOGIC / REGISTER ////////////////////////////////////////////////////////////

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = signupUsername.value.trim();
  const email = signupEmail.value.trim();
  const password = signupPassword.value.trim();

  if (!username) {
    return Swal.fire("Error", "Username required", "error");
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return Swal.fire("Error", "Invalid email format", "error");
  }

  if (password.length < 6) {
    return Swal.fire("Error", "Password must be at least 6 characters", "error");
  }

  try {
    const res = await fetch("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        signupUsername: username,
        signupEmail: email,
        signupPassword: password
      })
    });

    const data = await res.json();

    if (!data.success) {
      return Swal.fire("Register Failed", data.message, "error");
    }

    Swal.fire({
      title: "Success",
      text: "Registration successful",
      icon: "success",
      timer: 1500,
      showConfirmButton: false
    }).then(() => {
      window.location.href = "/login";
    });

  } catch (err) {
    Swal.fire("Error", "Server error", "error");
  }
});



// signupForm.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const username = signupUsername.value.trim();
//     const email = signupEmail.value.trim();
//     const password = signupPassword.value.trim();

//     if (username.length === 0) {
//         // signupError.innerText = "❌ Username is required";
//         return Swal.fire("Error", "Username required !", "error");
//         // return;
//     }

//     // Email pattern check
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailPattern.test(email)) {
//         // signupError.innerText = "❌ Invalid email format";
//         return Swal.fire("Error", "❌ Invalid email format", "error");
//         // return;
//     }

//     if (password.length < 6) {
//         // signupError.innerText = "❌ Password must be at least 6 characters";
//         return Swal.fire("Error", "❌ Password must be at least 6 characters", "error");
//         // return;
//     }

//     try {
//     const res = await fetch("/auth/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         loginUsername: username,
//         loginPassword: password
//       })
//     });

//     const data = await res.json();

//     if (!data.success) {
//       return Swal.fire("Login Failed", data.message, "error");
//     }

//     // ✅ success
//     Swal.fire({
//       title: "Success",
//       text: "Login successful",
//       icon: "success",
//       timer: 1500,
//       showConfirmButton: false
//     }).then(() => {
//       window.location.href = "/user/dashboard";
//     });

//   } catch (err) {
//     Swal.fire("Error", "Server error. Try again.", "error");
//   }

    

//     signupError.innerText = "";

//     console.log("Sending signup data:", { username, email, password });
// });

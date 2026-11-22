
function showMessage(element, text, isSuccess) {
  element.textContent = text;
  element.style.display = "block";

  if (isSuccess) {
    // Green styling for success message
    element.style.color = "#155724";
    element.style.backgroundColor = "#d4edda";
    element.style.border = "1px solid #c3e6cb";
  } else {
    // Red styling for error message
    element.style.color = "#721c24";
    element.style.backgroundColor = "#f8d7da";
    element.style.border = "1px solid #f5c6cb";
  }
}


// 1. LOGIN FORM VALIDATION

const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const messageBox = document.getElementById("login-message");
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    if (email === "") {
      showMessage(messageBox, "Please enter your email address.", false);
    } else if (password === "") {
      showMessage(messageBox, "Please enter your password.", false);
    } else if (password.length < 6) {
      showMessage(messageBox, "Password must be at least 6 characters long.", false);
    } else {
      showMessage(
        messageBox,
        "Form passed frontend validation! (Demo only - user is not authenticated)",
        true
      );
    }
  });
}
// 2. REGISTRATION FORM VALIDATION
const registerForm = document.getElementById("register-form");

if (registerForm) {
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const nameInput = document.getElementById("fullname");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const messageBox = document.getElementById("register-message");
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (name === "") {
      showMessage(messageBox, "Please enter your full name.", false);
    } else if (email === "") {
      showMessage(messageBox, "Please enter your email address.", false);
    } else if (password === "") {
      showMessage(messageBox, "Please enter your password.", false);
    } else if (password.length < 6) {
      showMessage(messageBox, "Password must be at least 6 characters long.", false);
    } else {
      showMessage(
        messageBox,
        "Registration demo successful! (Demo only - no account was created or saved)",
        true
      );
    }
  });
}

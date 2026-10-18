
const form = document.getElementById("loginForm");
const error = document.getElementById("errorMessage");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nim = document.getElementById("nim").value.trim();
  const password = document.getElementById("password").value;

  if (!nim || !password) {
    error.textContent = "NIM dan password wajib diisi.";
    return;
  }

  // Simulasi login untuk prototype UI/UX
  window.location.href = "pages/dashboard.html";
});

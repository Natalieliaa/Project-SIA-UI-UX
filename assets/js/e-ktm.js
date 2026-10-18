
document.addEventListener("DOMContentLoaded", () => {

  // ===========================
  // SIDEBAR MOBILE
  // ===========================

  const sidebar = document.getElementById("sidebar");
  const menuButton = document.getElementById("menuButton");

  if (sidebar && menuButton) {
    menuButton.addEventListener("click", () => {
      const isOpen = sidebar.classList.toggle("open");

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );
    });
  }

  // ===========================
  // LOGO FALLBACK
  // ===========================

  const campusLogo = document.getElementById("campusLogo");
  const logoFallback = document.getElementById("logoFallback");

  function showLogoFallback() {
    campusLogo.hidden = true;
    logoFallback.hidden = false;
  }

  campusLogo.addEventListener("error", showLogoFallback);

  if (campusLogo.complete && campusLogo.naturalWidth === 0) {
    showLogoFallback();
  }

  // ===========================
  // PHOTO FALLBACK
  // ===========================

  const studentPhoto = document.getElementById("studentPhoto");
  const photoFallback = document.getElementById("photoFallback");

  function showPhotoFallback() {
    studentPhoto.hidden = true;
    photoFallback.hidden = false;
  }

  studentPhoto.addEventListener("error", showPhotoFallback);

  if (studentPhoto.complete && studentPhoto.naturalWidth === 0) {
    showPhotoFallback();
  }

  // ===========================
  // PRINT / SAVE PDF
  // ===========================

  const printButton = document.getElementById("printCard");

  printButton.addEventListener("click", () => {
    window.print();
  });

});

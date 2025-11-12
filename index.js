const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const closeBtn = document.querySelector(".close-btn");
const overlay = document.querySelector(".overlay");

function openMenu() {
  mobileNav.style.transform = "translateX(0)";
  overlay.style.display = "block";
}

function closeMenu() {
  mobileNav.style.transform = "translateX(-100%)";
  overlay.style.display = "none";
}

menuToggle.addEventListener("click", openMenu);

closeBtn.addEventListener("click", closeMenu);

overlay.addEventListener("click", closeMenu);

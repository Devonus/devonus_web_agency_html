const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navClose = document.getElementById("nav-close");

// Open menu
navToggle.addEventListener("click", () => {
  navMenu.classList.remove("hidden");
});

// Close menu via close button
navClose.addEventListener("click", () => {
  navMenu.classList.add("hidden");
});

// Close menu when any link inside it is clicked
const navLinks = navMenu.querySelectorAll("a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.add("hidden");
  });
});

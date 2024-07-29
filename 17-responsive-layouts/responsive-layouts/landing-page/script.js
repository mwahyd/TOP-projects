const nav = document.querySelector(".nav");
const navToggle = document.querySelector(".nav-toggle");

navToggle.addEventListener("click", (ev) => {
  nav.classList.toggle("nav--visible");
});

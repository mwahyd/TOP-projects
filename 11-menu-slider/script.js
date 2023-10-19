document.addEventListener("click", (e) => {
  const el = e.target;
  if (
    !el.classList.contains("link") &&
    !el.classList.contains("drop-down-menu")
  ) {
    removeActive();
    return;
  }
  removeActive();
  if (el.nodeName === "BUTTON") {
    const ddMenu = el.nextElementSibling;
    ddMenu.classList.toggle("active");
  }
});

function removeActive() {
  document.querySelectorAll(".drop-down-menu").forEach((ddMenu) => {
    if (ddMenu.classList.contains("active")) {
      ddMenu.classList.remove("active");
    }
  });
}

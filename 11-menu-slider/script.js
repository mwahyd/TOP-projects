document.addEventListener("click", (e) => {
  const isDropDownBtn = e.target.matches("[data-dropdown-btn]");

  // if click not on the dropdown button or dropdown ignore
  if (!isDropDownBtn && e.target.closest("[data-dropdown]") !== null) return;

  let currentDropdown;
  if (isDropDownBtn) {
    currentDropdown = e.target.closest("[data-dropdown]");
    currentDropdown.classList.toggle("active");
  }

  document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
    if (dropdown === currentDropdown) return;
    dropdown.classList.remove("active");
  });
});

// rudder nav functionality
document.addEventListener("click", (e) => {
  const isDrawerBtn = e.target.matches("[data-drawer-btn]");
  const drawer = e.target.closest("[data-drawer]");

  if (!isDrawerBtn && drawer === null) {
    const activeEl = document.querySelector("[data-drawer].active");
    if (activeEl === null) return;
    activeEl.classList.remove("active");
    return;
  }

  // toggle active class if X icon clicked
  if (isDrawerBtn) {
    drawer.classList.toggle("active");
  }
});

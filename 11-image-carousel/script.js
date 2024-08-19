// * SECTION ONE - CODE

window.addEventListener("click", reset);

function reset(ev) {
  if (ev.target.nodeName === "HTML" || ev.target.classList.contains("container")) {
    document.querySelectorAll(".active").forEach((item) => {
      item.classList.remove("active");
    });
  }
}

const infoDropdown = document.querySelector("[info-dropdown]");
const loginDropdown = document.querySelector("[login-dropdown]");

const listItems = document.querySelectorAll("li");
listItems.forEach((item) => item.addEventListener("click", handleListClick));

function handleListClick(event) {
  const isDropDownBtn = event.target.matches("[data-dropdown-btn]");
  if (isDropDownBtn) {
    const id = event.target.id;
    const dropdown = document.querySelector(`[data-${id}-dropdown]`);
    toggleDropdown(event, dropdown);
  }
}

function toggleDropdown(event, currentDropdown) {
  //   select all the other active hidden and deactivate.
  document.querySelectorAll(".dropdown").forEach((dropdown) => {
    if (dropdown === currentDropdown) return;
    dropdown.classList.remove("active");
  });
  currentDropdown.classList.toggle("active");
}

// * SECTION TWO RUDDER - CODE

const drawerBtn = document.querySelector("[data-drawer-btn]");
drawerBtn.addEventListener("click", openDrawer);

function openDrawer(ev) {
  drawerBtn.classList.toggle("active");
}

// * SECTION THREE FLOAT - CODE

const floatBtn = document.querySelector("[data-float-btn]");
const floatMenu = document.querySelector("[data-float-menu]");
floatBtn.addEventListener("click", openFloat);

function openFloat(ev) {
  floatBtn.classList.toggle("active");
  floatMenu.classList.toggle("active");
}

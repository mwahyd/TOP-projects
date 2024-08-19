// * SECTION ONE - CODE

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

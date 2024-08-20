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

// * SECTION THREE Carasoul - CODE

const navLinks = document.querySelectorAll("[data-img-links] > a");

// preload images on page load

window.addEventListener("load", preloadImages);
navLinks.forEach((link) => link.addEventListener("click", displayImg));

function preloadImages() {
  const imgs = document.querySelectorAll("img");
  imgs.forEach((img) => {
    const preloadImg = new Image();
    preloadImg.src = img.src;
  });
}

function displayImg(ev) {
  ev.preventDefault();
  const href = ev.target.getAttribute("href").slice(1);
  const visibleImg = document.querySelector("img:not(.invisible)");
  const highlightedHref = document.querySelector("a.highlight");
  // If the clicked link corresponds to the currently visible image, do nothing
  if (visibleImg && href === visibleImg.id) return;

  // toggle visibily
  toggleVisibilityHighlight(visibleImg, highlightedHref, true);
  toggleVisibilityHighlight(document.querySelector(`img#${href}`), ev.target, false);
}

function toggleVisibilityHighlight(img, link, hide) {
  // if force === true toggle adds class else false toggle removes class
  img.classList.toggle("invisible", hide);
  link.classList.toggle("highlight", !hide);
}

// display images in a loop
function getImagesAndLinks() {
  const images = document.querySelectorAll("img");
  const navLinks = document.querySelectorAll("[data-img-links] > a");

  const visibleImg = document.querySelector("img:not(.invisible)");
  const highlightedHref = document.querySelector("a.highlight");

  const nextIndex = (currentIndex + 1) % images.length;

  const nextImg = images[nextIndex];
  const nextlink = navLinks[nextIndex];

  toggleVisibilityHighlight(visibleImg, highlightedHref, true);
  toggleVisibilityHighlight(nextImg, nextlink, false);

  currentIndex = nextImg;
}

function slideShow() {
  const images = Array.from(document.querySelectorAll("img"));
  const navLinks = Array.from(document.querySelectorAll("[data-img-links] > a"));

  const visibleImg = document.querySelector("img:not(.invisible)");
  const highlightedHref = document.querySelector("a.highlight");

  const currentIndex = images.indexOf(visibleImg);
  currentIndex === images.length - 1
    ? toggleVisibilityHighlight(images[0], navLinks[0], false)
    : toggleVisibilityHighlight(
        images[currentIndex + 1],
        navLinks[currentIndex + 1],
        false
      );

  toggleVisibilityHighlight(visibleImg, highlightedHref, true);
}

setInterval(() => slideShow(), 5000);

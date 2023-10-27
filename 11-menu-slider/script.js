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

// image carousel

const carousel = {
  init: function () {
    this.cacheDOM();
    this.bindEvents();
  },

  cacheDOM: function () {
    this.frame = document.querySelector("[data-frame]");
    this.imgNav = this.frame.querySelector("[data-nav");
    this.btns = this.frame.querySelectorAll("[data-btn]");
  },

  bindEvents: function () {
    this.imgNav.addEventListener("click", this.navClicked.bind(this));
    this.btns.forEach((btn) => {
      btn.addEventListener("click", this.changeImage.bind(this));
    });
  },

  navClicked: function (e) {
    e.preventDefault();
    const isNavBtn = e.target.matches("[data-nav] a");
    if (!isNavBtn) return;

    this.frame.querySelectorAll("img").forEach((img) => {
      img.classList.remove("active");
      const link = e.target.getAttribute("href");
      if (img.id === link.slice(1)) {
        img.classList.add("active");
      }
    });
  },

  changeImage: function (e) {
    const isNextBtn = e.target.matches("[data-next]");
    const isPrevBtn = e.target.matches("[data-prev]");
    const activeImage = this.frame.querySelector(".active");
    const images = Array.from(this.frame.querySelectorAll("img"));
    const index = images.indexOf(activeImage);

    if (isNextBtn) {
      index === images.length - 1
        ? images[0].classList.add("active")
        : images[index + 1].classList.add("active");
    } else if (isPrevBtn) {
      index === 0
        ? images[images.length - 1].classList.add("active")
        : images[index - 1].classList.add("active");
    }
    activeImage.classList.remove("active");
  },
};

carousel.init();

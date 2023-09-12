// to get the css file to the dist folder, import it to the JS file
import style from "./style.css";

const restaurantPage = (function () {
  // cache DOM
  const doc = document.querySelector("body");

  // create default elements
  const header = document.createElement("header");
  const main = document.createElement("main");
  const footer = document.createElement("footer");
  const container = document.createElement("div");

  _render();

  // root functions
  function _render() {
    // container
    container.id = "container";
    container.appendChild(header);
    container.appendChild(main);
    container.appendChild(footer);

    doc.appendChild(container);

    // header
    // title
    const h1 = _createElement("h1");
    h1.id = "title";
    h1.textContent = "Bakers!";
    header.appendChild(h1);

    // nav
    const nav = _createElement("nav");
    const home = _createElement("li");
    const menu = _createElement("li");
    const contact = _createElement("li");

    nav.id = "nav";
    home.id = "home";
    menu.id = "menu";
    contact.id = "contact";
    home.textContent = "home";
    menu.textContent = "menu";
    contact.textContent = "contact";
    nav.appendChild(home);
    nav.appendChild(menu);
    nav.appendChild(contact);

    header.appendChild(nav);

    // main
    const p = _createElement("p");
    p.id = "quote";
    p.textContent = "always save room for dessert!";
    p.classList.add("flex-centre");
    main.appendChild(p);
    // - if page === home
    main.classList.add("flex-centre");

    // footer
    footer.textContent = "maishanwahyd 2023";
    footer.classList.add("flex-centre");
  }

  // handler functions

  // support functions
  function _createElement(name) {
    return document.createElement(name);
  }
})();

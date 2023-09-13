// to get the css file to the dist folder, import it to the JS file
import style from "./style.css";
import menu from "./menu.js";

const restaurantPage = (function () {
  // cache DOM
  const doc = document.querySelector("body");

  // create default elements
  const header = document.createElement("header");
  const main = document.createElement("main");
  const footer = document.createElement("footer");
  const container = document.createElement("div");

  // bind events
  header.addEventListener("click", _headerHandler);

  _render(_createHome);

  // root functions
  function _render(loadPage) {
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
    h1.textContent = "dessert Land";
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
    loadPage();

    // footer
    const details = _createElement("p");
    const credits = _createElement("p");
    details.textContent = "maishanwahyd 2023";
    credits.textContent = "background - Ulysse Pointcheval - Unsplash";
    credits.classList.add("credits");

    footer.appendChild(details);
    footer.appendChild(credits);
    footer.classList.add("flex-centre");
  }

  // handler functions
  function _headerHandler(event) {
    if (event.target.nodeName !== "LI") {
      return;
    }
    console.log(event.target);

    switch (event.target.id) {
      case "home":
        _eraseContent();
        _render(_createHome);
        console.log("from click");
        break;
      case "menu":
        _createMenu(event);
        break;
      case "contact":
        _createContact(event);
        break;
    }
  }

  // support functions
  function _createElement(name) {
    return document.createElement(name);
  }

  function _createHome() {
    main.classList = "";
    const p = _createElement("p");
    p.id = "quote";
    p.textContent = "always save room for dessert!";
    p.classList.add("flex-centre");
    main.appendChild(p);
    // - if page === home
    main.classList.add("flex-centre");
  }

  function _createMenu() {
    main.innerHTML = "";
    main.classList = "";
    const menuItems = menu.displayMenu();
    console.log(menuItems);
    console.log(main);
    menuItems.forEach((item) => {
      main.appendChild(item);
    });
    main.classList.add("grid-layout");
  }

  function _createContact() {}

  function _eraseContent() {
    header.innerHTML = "";
    main.innerHTML = "";
    footer.innerHTML = "";
  }
})();

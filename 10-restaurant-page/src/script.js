// to get the css file to the dist folder, import it to the JS file
import style from "./style.css";

const restaurantPage = (function () {
  // cache DOM
  const doc = document.querySelector("body");
  _render();

  // root functions
  function _render() {
    doc.appendChild(_createContent());
  }

  // handler functions

  // support functions
  function _createContent() {
    const content = document.createElement("div");
    content.id = "content";
    content.innerHTML = "HELLLOOOOO";
    return content;
  }
})();

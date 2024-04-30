const DOM = (function () {
  // initialise
  // cache DOM
  const container = document.querySelector("#container");
  const playersContainer = container.querySelector(".players");
  const playerBtns = playersContainer.querySelectorAll("button");
  // bind events
  playerBtns.forEach((btn) => btn.addEventListener("click", _selectPlayer));
  // render
  // handler functions
  function _selectPlayer(event) {
    switch (event.target.id) {
      case "p1-btn":
        _selectPlayer1(event.target);
        break;
      case "p2-btn":
        _selectPlayer2(event.target);
        break;
      case "comp-btn":
        // _selectComputer(event.target);
        _addClassList(event.target, "selected");
        _removeClassList(event.target, "hover");
        break;
    }
  }
  function _closeForm(event) {
    event.preventDefault();
    const form = playersContainer.querySelector("#p2 .form");
    const p2Btn = playersContainer.querySelector("#p2-btn");
    const compBtn = playersContainer.querySelector("#comp-btn");
    _addClassList(form, "hidden");
    _removeClassList(p2Btn, "hidden");
    _removeClassList(compBtn, "hidden");
  }
  // support functions
  function _selectPlayer1(button) {
    _displayForm(button, "p1");
  }
  function _selectPlayer2(button) {
    const computer = playersContainer.querySelector(".selected");
    if (computer) {
      _addClassList(computer, "hover");
      _removeClassList(computer, "selected");
    }
    _displayForm(button, "p2");
    const formClose = playersContainer.querySelector("#p2 .form .close");
    formClose.addEventListener("click", _closeForm);
  }
  function _displayForm(button, playerID) {
    const form = playersContainer.querySelector(`#${playerID} form`);
    form.classList.toggle("hidden");
    button.classList.toggle("hidden");
    if (playerID === "p2") {
      // button.nextElementSibling.classList.add("hidden");
      _addClassList(button.nextElementSibling, "hidden");
    }
  }
  function _addClassList(element, ...args) {
    for (const arg of args) {
      element.classList.add(arg);
    }
  }
  function _removeClassList(element, ...args) {
    for (const arg of args) {
      element.classList.remove(arg);
    }
  }
  function _removeListener(element, event) {}
})();

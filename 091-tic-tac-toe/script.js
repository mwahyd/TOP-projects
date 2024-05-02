const menu = (function () {
  // initialise
  const playerInfo = {};
  // cache DOM
  const container = document.querySelector("#container");
  const players = container.querySelector(".players");
  const playerBtns = players.querySelectorAll("button");
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
    const form = players.querySelector("#p2 .form");
    const p2Btn = players.querySelector("#p2-btn");
    const compBtn = players.querySelector("#comp-btn");
    _addClassList(form, "hidden");
    _removeClassList(p2Btn, "hidden");
    _removeClassList(compBtn, "hidden");
  }
  function _getData(event) {
    event.preventDefault();
    const id = event.target.classList[1];
    let marker;
    switch (event.target.classList[0]) {
      case "marker":
        marker = _selectGetMarker(event.target, id);
        break;
      case "save-btn":
        console.log(event.target, id);
        break;
    }
    console.log(marker);
  }
  // support functions
  function _selectPlayer1(button) {
    const form = players.querySelector(`#p1 form`);
    _displayForm(button, form, "p1");
    form.addEventListener("click", _getData);
  }
  function _selectPlayer2(button) {
    const form = players.querySelector(`#p2 form`);
    const computer = players.querySelector("#comp-btn");
    if (computer) {
      _addClassList(computer, "hover");
      _removeClassList(computer, "selected");
    }
    _displayForm(button, form, "p2");
    const formClose = players.querySelector("#p2 .form .close");
    formClose.addEventListener("click", _closeForm);
    form.addEventListener("click", _getData);
  }
  function _displayForm(button, form, playerID) {
    _removeClassList(form, "hidden");
    _addClassList(button, "hidden");
    if (playerID === "p2") {
      _addClassList(button.nextElementSibling, "hidden");
    }
  }
  function _selectGetMarker(button, id) {
    const selectedMarker = players.querySelector(`.marker.${id}.selected`);
    selectedMarker && _removeClassList(selectedMarker, "selected");
    button.classList[1] === id && _addClassList(button, "selected");
    return button.textContent.trim();
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
  //? when game starts, remove event listeners from menu page
  function _removeListener(element, event) {}
})();

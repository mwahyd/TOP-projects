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
        _selectComputer(event.target);
        break;
    }
    // if computer select computer.
    // if player 2 deselect computer

    // support functions
    function _selectPlayer1(button) {
      _displayForm(button, "p1");
    }
    function _selectPlayer2(button) {
      const computer = playersContainer.querySelector(".selected");
      if (computer) {
        _resetComputer(computer);
      }
      _displayForm(button, "p2");
      // ? player 2 display form
    }
    function _selectComputer(button) {
      button.classList.add("selected");
      button.classList.remove("hover");
    }
    function _resetComputer(computerBtn) {
      computerBtn.classList.remove("selected");
      computerBtn.classList.add("hover");
    }
    function _displayForm(button, playerID) {
      const form = playersContainer.querySelector(`#${playerID} form`);
      form.classList.toggle("hidden");
      button.classList.toggle("hidden");
      if (playerID === "p2") {
        button.nextElementSibling.classList.add("hidden");
      }
    }
  }
})();

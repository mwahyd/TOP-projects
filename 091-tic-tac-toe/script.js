const menu = (function () {
  // initialise
  const playerInfo = {};
  // cache DOM
  const container = document.querySelector("#container");
  const players = container.querySelector(".players");
  const playerBtns = players.querySelectorAll("button");
  const startBtn = container.querySelector("#start");
  // bind events
  playerBtns.forEach((btn) => btn.addEventListener("click", selectPlayer));
  startBtn.addEventListener("click", checkGameParameters);
  // render
  // handler functions
  function selectPlayer(event) {
    switch (event.target.id) {
      case "p1-btn":
        selectPlayer1(event.target);
        break;
      case "p2-btn":
        disableStartButton();
        selectPlayer2(event.target);
        break;
      case "comp-btn":
        // selectComputer(event.target);
        addClassList(event.target, "selected");
        removeClassList(event.target, "hover");
        isReady();
        break;
    }
  }
  function closeForm(event) {
    event.preventDefault();
    const form = players.querySelector("#p2 .form");
    const p2Btn = players.querySelector("#p2-btn");
    const compBtn = players.querySelector("#comp-btn");
    const selectedMarker = players.querySelector(`.marker.p2.selected`);
    const p2Save = players.querySelector("#p2 .saved");
    players.querySelector("#p2 input").value = "";
    addClassList(form, "hidden");
    removeClassList(p2Btn, "hidden");
    removeClassList(compBtn, "hidden");
    p2Save && removeClassList(p2Save, "saved");
    selectedMarker && removeClassList(selectedMarker, "selected");
    playerInfo["p2"] = undefined;
    playerInfo["p2M"] = undefined;
    disableStartButton();
  }
  function getData(event) {
    event.preventDefault();
    const id = event.target.classList[1];
    // let marker;
    switch (event.target.classList[0]) {
      case "marker":
        selectMarker(event.target, id);
        break;
      case "save-btn":
        addClassList(event.target, "saved");
        saveInfo(id);
        break;
    }
    // console.log(marker);
  }
  function checkGameParameters(event) {
    console.log(event.target);
  }
  //  support functions
  function selectPlayer1(button) {
    const form = players.querySelector(`#p1 form`);
    displayForm(button, form, "p1");
    form.addEventListener("click", getData);
  }
  function selectPlayer2(button) {
    const form = players.querySelector(`#p2 form`);
    const computer = players.querySelector("#comp-btn");
    if (computer) {
      addClassList(computer, "hover");
      removeClassList(computer, "selected");
    }
    displayForm(button, form, "p2");
    const formClose = players.querySelector("#p2 .form .close");
    formClose.addEventListener("click", closeForm);
    form.addEventListener("click", getData);
  }
  function displayForm(button, form, playerID) {
    removeClassList(form, "hidden");
    addClassList(button, "hidden");
    if (playerID === "p2") {
      addClassList(button.nextElementSibling, "hidden");
    }
  }
  function selectMarker(button, id) {
    const selectedMarker = players.querySelector(`.marker.${id}.selected`);
    selectedMarker && removeClassList(selectedMarker, "selected");
    button.classList[1] === id && addClassList(button, "selected");
  }
  function getName(id) {
    const input = players.querySelector(`#${id} input`);
    if (input.value.trim() !== "") return input.value.trim().toLowerCase();
  }
  function getMarker(id) {
    if (players.querySelector(`.marker.${id}.selected`)) {
      return players.querySelector(`.marker.${id}.selected`).textContent.trim();
    }
  }
  function saveInfo(id) {
    if (id === "p1") {
      playerInfo["p1"] = getName(id) || id;
      playerInfo["p1M"] = getMarker(id) || "x";
    } else {
      playerInfo["p2"] = getName(id) || id;
      playerInfo["p2M"] = getMarker(id) || "o";
    }
    console.log(playerInfo);
    isReady();
  }
  function isReady() {
    // check if p1 save clicked
    // check if p2 save clicked OR computer selected
    const p1Saved = players.querySelector("#p1 .saved");
    const p2Saved = players.querySelector("#p2 .saved");
    const compSelected = players.querySelector("#comp-btn.selected");
    // console.log(p1Saved, p2Saved, compSelected);
    if (p1Saved && (p2Saved || compSelected)) {
      enableStartButton();
    }
  }
  function enableStartButton() {
    // console.log(startBtn);
    startBtn.removeAttribute("disabled");
  }
  function disableStartButton() {
    startBtn.disabled = true;
  }
  function addClassList(element, ...args) {
    for (const arg of args) {
      element.classList.add(arg);
    }
  }
  function removeClassList(element, ...args) {
    for (const arg of args) {
      element.classList.remove(arg);
    }
  }
  //? when game starts, remove event listeners from menu page
  function removeListener(element, event) {}
})();

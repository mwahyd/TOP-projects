import Tools from "./tools.js";
const menu = (function () {
  // initialise
  const playerInfo = {};
  let difficulties = [];
  // cache DOM
  const container = document.querySelector("#app-container");
  const players = container.querySelector(".players");
  const playerBtns = players.querySelectorAll("button");
  const difficulty = players.querySelector("#set-difficulty");
  const startBtn = container.querySelector("#start");
  // bind events
  playerBtns.forEach((btn) => btn.addEventListener("click", selectPlayer));
  difficulty.addEventListener("click", setGameDifficulty);
  startBtn.addEventListener("click", saveParaStartGame);
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
        Tools.addClassList(event.target, "selected");
        Tools.removeClassList(event.target, "hover");
        setP2Computer();
        isReady();
        break;
    }
  }
  function setGameDifficulty(event) {
    if (event.target.nodeName !== "BUTTON") return;
    const prevSelectedBtn = difficulty.querySelector("button.select");
    prevSelectedBtn && Tools.removeClassList(prevSelectedBtn, "select");
    const button = event.target;
    difficulties = [];
    Tools.addClassList(button, "select");
    difficulties.push(event.target.id);
    Object.assign(playerInfo, { difficulty: difficulties[0] });
    isReady();
  }
  function closeForm(event) {
    event.preventDefault();
    const form = players.querySelector("#p2 .form");
    const p2Btn = players.querySelector("#p2-btn");
    const compBtn = players.querySelector("#comp-btn");
    const selectedMarker = players.querySelector(`.marker.p2.selected`);
    const p2Save = players.querySelector("#p2 .saved");
    players.querySelector("#p2 input").value = "";
    Tools.addClassList(form, "hidden");
    Tools.removeClassList(form, "reveal");
    Tools.addClassList(p2Btn, "reveal");
    Tools.addClassList(compBtn, "reveal");
    Tools.addClassList(difficulty, "reveal");
    Tools.removeClassList(p2Btn, "hidden");
    Tools.removeClassList(compBtn, "hidden");
    Tools.removeClassList(difficulty, "hidden");
    p2Save && Tools.removeClassList(p2Save, "saved");
    selectedMarker && Tools.removeClassList(selectedMarker, "selected");
    playerInfo["p2"] = undefined;
    playerInfo["p2M"] = undefined;
    disableStartButton();
  }
  function getData(event) {
    event.preventDefault();
    const id = event.target.classList[1];
    switch (event.target.classList[0]) {
      case "marker":
        selectMarker(event.target, id);
        break;
      case "save-btn":
        Tools.addClassList(event.target, "saved");
        saveInfo(id);
        break;
    }
  }
  function saveParaStartGame(event) {
    event.preventDefault();
    Tools.saveToLocalStorage(playerInfo);
    // animate the container down the screen
    const content = container.querySelector("#app-content");
    content.removeAttribute("open");
    content.setAttribute("closing", "");
    content.addEventListener(
      "animationend",
      () => {
        content.removeAttribute("closing");
        Tools.addClassList(content, "hidden");
      },
      { once: true }
    );
    Tools.redirect("./game.html", 500); // load game page
  }
  //  support functions
  function selectPlayer1(button) {
    const form = players.querySelector(`#p1 form`);
    displayFormResetCPU(button, form, "p1");
    form.addEventListener("click", getData);
  }
  function selectPlayer2(button) {
    const form = players.querySelector(`#p2 form`);
    const computer = players.querySelector("#comp-btn");
    const difficulty = players.querySelector("#set-difficulty > button.select");
    if (computer) {
      Tools.addClassList(computer, "hover");
      Tools.removeClassList(computer, "selected");
    }
    if (difficulty) {
      Tools.removeClassList(difficulty, "select");
    }
    displayFormResetCPU(button, form, "p2");
    const formClose = players.querySelector("#p2 .form .close");
    formClose.addEventListener("click", closeForm);
    form.addEventListener("click", getData);
  }
  function setP2Computer() {
    !playerInfo["p2"] && Object.assign(playerInfo, { p2: "CPU", p2M: "o" });
  }
  function displayFormResetCPU(button, form, playerID) {
    Tools.removeClassList(form, "hidden");
    Tools.removeClassList(button, "reveal");
    Tools.addClassList(form, "reveal");
    Tools.addClassList(button, "hidden");
    if (playerID === "p2") {
      // hide Computer and Difficulty buttons
      Tools.addClassList(difficulty, "hidden");
      Tools.addClassList(button.nextElementSibling, "hidden");
      Tools.removeClassList(button.nextElementSibling, "reveal");
      difficulties = [];
      delete playerInfo["difficulty"];
    }
  }
  function selectMarker(button, id) {
    const selectedMarker = players.querySelector(`.marker.${id}.selected`);
    selectedMarker && Tools.removeClassList(selectedMarker, "selected");
    button.classList[1] === id && Tools.addClassList(button, "selected");
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
    isReady();
  }
  function isReady() {
    const p1Saved = players.querySelector("#p1 .saved");
    const p2Saved = players.querySelector("#p2 .saved");
    const compSelected = players.querySelector("#comp-btn.selected");
    const difficulty = players.querySelector("#set-difficulty > button.select");
    if (p1Saved && (p2Saved || (compSelected && difficulty))) {
      enableStartButton();
    }
  }
  function enableStartButton() {
    startBtn.removeAttribute("disabled");
  }
  function disableStartButton() {
    startBtn.disabled = true;
  }
})();

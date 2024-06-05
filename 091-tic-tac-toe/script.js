import Tools from "./tools.js";
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
  startBtn.addEventListener("click", saveParaStartGame);
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
        Tools.addClassList(event.target, "selected");
        Tools.removeClassList(event.target, "hover");
        setP2Computer();
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
    Tools.addClassList(form, "hidden");
    Tools.removeClassList(form, "reveal");
    Tools.addClassList(p2Btn, "reveal");
    Tools.addClassList(compBtn, "reveal");
    Tools.removeClassList(p2Btn, "hidden");
    Tools.removeClassList(compBtn, "hidden");
    p2Save && Tools.removeClassList(p2Save, "saved");
    selectedMarker && Tools.removeClassList(selectedMarker, "selected");
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
        Tools.addClassList(event.target, "saved");
        saveInfo(id);
        break;
    }
    // console.log(marker);
  }
  function saveParaStartGame(event) {
    event.preventDefault();
    // save game info to local storage
    Tools.saveToLocalStorage(playerInfo);
    // remove event listeners
    // animate the container down the screen
    const content = container.querySelector("#content");
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
    // load game page
    Tools.redirect("./game.html", 500);
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
      Tools.addClassList(computer, "hover");
      Tools.removeClassList(computer, "selected");
    }
    displayForm(button, form, "p2");
    const formClose = players.querySelector("#p2 .form .close");
    formClose.addEventListener("click", closeForm);
    form.addEventListener("click", getData);
  }
  function setP2Computer() {
    !playerInfo["p2"] && Object.assign(playerInfo, { p2: "COMP", p2M: "o" });
    console.log(playerInfo);
  }
  function displayForm(button, form, playerID) {
    Tools.removeClassList(form, "hidden");
    Tools.removeClassList(button, "reveal");
    Tools.addClassList(form, "reveal");
    Tools.addClassList(button, "hidden");
    if (playerID === "p2") {
      Tools.addClassList(button.nextElementSibling, "hidden");
      Tools.removeClassList(button.nextElementSibling, "reveal");
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
  // function Tools.addClassList(element, ...args) {
  //   for (const arg of args) {
  //     element.classList.add(arg);
  //   }
  // }
  // function Tools.removeClassList(element, ...args) {
  //   for (const arg of args) {
  //     element.classList.remove(arg);
  //   }
  // }
  // function Tools.saveToLocalStorage() {
  //   localStorage.setItem("playersInfo", JSON.stringify(playerInfo));
  // }
  // function removeListeners() {}
  // function Tools.redirect(URL, timer) {
  //   timer <= 0
  //     ? (window.location.href = URL)
  //     : setTimeout(() => {
  //         window.location.href = URL;
  //       }, timer);
  // }
})();

import Tools from "./tools.js";
import { pubsub } from "./pubsub.js";

const gameboard = (function () {
  // initialise
  const board = ["", "", "", "", "", "", "", "", ""];
  // APIs
  function getboard() {
    return board;
  }
  function updateBoard(index, marker) {
    board[index] = marker;
  }
  function renderBoard() {}
  function resetBoard() {}
  return { getboard, updateBoard, renderBoard, resetBoard };
})();

const game = (function () {
  // initialise
  if (document.body.id !== "game-page") return;
  let playersInfo = {};
  let p1Turn = false;
  let p1MarkerPlaced = false;
  let p2Turn = false;
  let p2MarkerPlaced = false;
  // cache DOM
  const container = document.querySelector("#app-container");
  const content = container.querySelector("#app-content");

  // bind events
  content.addEventListener("animationend", render, { once: true });
  pubsub.subscribe("renderComplete", gameController);

  // display the screen
  const displayScreen = (function () {
    // display the screen
    // animate it to appear from top to bottom
    Tools.removeClassList(content, "hidden");
    Tools.addClassList(content, "slide-down");
  })();

  // render
  function render() {
    console.log("animation ended");
    // display the game header
    drawHeader();
    // display the gameboard
    drawBoard();
    // populate header
    populateHeader();
    // announce completion
    setTimeout(() => pubsub.publish("renderComplete", null), 500);
  }
  function drawBoard() {
    const gameboardDiv = container.querySelector("#app-gameboard");
    const boardArray = gameboard.getboard();
    for (let i = 0; i < boardArray.length; i++) {
      const div = document.createElement("div");
      div.setAttribute("data-index", i);
      Tools.addClassList(div, "square", "highlight");
      gameboardDiv.append(div);
    }
    Tools.addClassList(gameboardDiv, "reveal");
  }
  function drawHeader() {
    const header = container.querySelector("#game-header");
    Tools.removeClassList(header, "hidden");
    Tools.addClassList(header, "reveal");
  }
  function populateHeader() {
    getStoredData();
    const headerElements = getHeaderElements();
    headerElements.round.textContent = 1;
    headerElements.p1Name.textContent = `${playersInfo["p1"]}:`;
    headerElements.p1Marker.textContent = `${playersInfo["p1M"]}`;
    headerElements.p2Name.textContent = `${playersInfo["p2"]}:`;
    headerElements.p2Marker.textContent = `${playersInfo["p2M"]}`;
  }
  function getStoredData() {
    // get info from local storage
    playersInfo = Tools.getFromLocalStorage("playersInfo");
    console.log(playersInfo);
  }
  function getHeaderElements() {
    const round = container.querySelector("#app-round");
    const p1Name = container.querySelector("#p1-name");
    const p1Marker = container.querySelector("#p1-marker");
    const p2Name = container.querySelector("#p2-name");
    const p2Marker = container.querySelector("#p2-marker");
    return { round, p1Name, p1Marker, p2Name, p2Marker };
  }
  function gameController() {
    console.log("game controller running");
    // identify p2 [comp | player2]
    const p2 = playersInfo["p2"];
    console.log(p2);
    // enable buttons
    enableSquares();
    // set turn to p1
    const turn = setTurn();
    // update turn icon to indicate player
    displayTurnIcon(turn);
    // allow player to set marker
    clickSquare(turn);
    // determine if square is empty
    // LISTEN to broadcast regarding empty square!!!!!

    // handover turn to p2
    // update turn icon to p2
    // if COMP run compplaceMarker function
  }
  function setTurn() {
    if (!p1Turn && !p2Turn) {
      p1Turn = true;
      return "p1";
    }
  }
  function enableSquares() {
    const gameboard = container.querySelector("#app-gameboard");
    Tools.removeClassList(gameboard, "disable-squares");
  }
  function disableSquares() {
    const gameboard = container.querySelector("#app-gameboard");
    Tools.addClassList(gameboard, "disable-squares");
  }
  function displayTurnIcon(turn) {
    const [p1TurnIcon, p2TurnIcon] = container.querySelectorAll(".turn-icon");
    if (turn === "p1") {
      Tools.removeClassList(p1TurnIcon, "hidden");
      Tools.addClassList(p2TurnIcon, "hidden");
      Tools.addClassList(p1TurnIcon, "reveal");
    } else if (turn === "p2") {
      Tools.removeClassList(p2TurnIcon, "hidden");
      Tools.addClassList(p1TurnIcon, "hidden");
      Tools.addClassList(p2TurnIcon, "reveal");
    }
  }
})();

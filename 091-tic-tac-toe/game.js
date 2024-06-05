import Tools from "./tools.js";

const gameboard = (function () {
  // initialise
  const board = ["", "", "", "", "", "", "", "", ""];
  // cache DOM
  const container = document.querySelector("#container");
  // bind events
  // render
  render();
  function render() {
    const gameboardDiv = container.querySelector("#gameboard");
    // draw the board on the screen
    for (let i = 0; i < board.length; i++) {
      const div = document.createElement("div");
      div.setAttribute("data-index", i);
      gameboardDiv.append(div);
    }
  }

  console.log(board);
  // APIs
  // get board function
  // update board function
})();

const game = (function () {
  // initialise
  console.log(document.body.id);
  if (document.body.id !== "game-page") return;
  let playersInfo = {};
  // cache DOM
  const container = document.querySelector("#container");
  // bind events
  // render
  render();
  function render() {
    const content = container.querySelector("#content");
    displayBoard(content);
    getStoredData();
    displayGameHeader();
  }
  function displayBoard(div) {
    // display the screen
    // animate it to appear from top to bottom
    Tools.removeClassList(div, "hidden");
    Tools.addClassList(div, "slide-down");
  }
  function getStoredData() {
    // get info from local storage
    playersInfo = Tools.getFromLocalStorage("playersInfo");
    console.log(playersInfo);
  }
  function displayGameHeader() {
    const round = container.querySelector("#round");
    const p1Name = container.querySelector("#p1-name");
    const p1Marker = container.querySelector("#p1-marker");
    const p2Name = container.querySelector("#p2-name");
    const p2Marker = container.querySelector("#p2-marker");
    round.textContent = 1;
    p1Name.textContent = `${playersInfo["p1"]}:`;
    p1Marker.textContent = `${playersInfo["p1M"]}`;
    p2Name.textContent = `${playersInfo["p2"]}:`;
    p2Marker.textContent = `${playersInfo["p2M"]}`;
  }
})();

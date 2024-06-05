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
  // cache DOM
  const container = document.querySelector("#container");
  // bind events
  // render
  render();
  function render() {
    // display the screen
    // animate it to appear from top to bottom
    const content = container.querySelector("#content");
    Tools.removeClassList(content, "hidden");
    Tools.addClassList(content, "slide-down");
  }

  console.log(content);

  // get info from local storage
})();

import Tools from "./tools.js";
import { pubsub } from "./pubsub.js";

const gameboard = (function () {
  // initialise
  let board = ["", "", "", "", "", "", "", "", ""];
  // APIs
  function getboard() {
    return board;
  }
  function updateBoard(index, marker) {
    board[index] = marker;
  }
  function undoMove(index) {
    board[index] = "";
  }
  function renderBoard() {
    const gameboardDiv = document.querySelector("#app-gameboard");
    gameboardDiv.innerHTML = "";
    board.forEach((marker, index) => {
      const div = document.createElement("div");
      div.setAttribute("data-index", index);
      marker !== ""
        ? Tools.addClassList(div, "square", "marker")
        : Tools.addClassList(div, "square", "highlight");
      div.textContent = marker;
      gameboardDiv.append(div);
    });
  }
  function resetBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
  }
  return { getboard, updateBoard, undoMove, renderBoard, resetBoard };
})();

const game = (function () {
  // initialise
  if (document.body.id !== "game-page") return;
  let playersInfo = {};
  let p1Turn = false;
  let p1MarkerPlaced = false;
  let p2Turn = false;
  let p2MarkerPlaced = false;
  const squaresClicked = { p1: [], p2: [] };
  const scores = { p1: 0, p2: 0, tie: 0, winner: "" };
  // cache DOM
  const container = document.querySelector("#app-container");
  const content = container.querySelector("#app-content");

  // bind events
  content.addEventListener("animationend", render, { once: true });
  pubsub.subscribe("renderComplete", gameController);

  const displayScreen = (function () {
    // animate it to appear from top to bottom
    Tools.removeClassList(content, "hidden");
    Tools.addClassList(content, "slide-down");
  })();

  function render() {
    drawHeader();
    drawBoard();
    populateHeader();
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
    if (playersInfo["p2"] === "CPU") {
      // show difficulty in game header
      Tools.removeClassList(headerElements.level.parentElement, "hidden");
      headerElements.level.textContent = playersInfo["difficulty"];
    }
  }
  function getStoredData() {
    playersInfo = Tools.getFromLocalStorage("playersInfo");
  }
  function getHeaderElements() {
    const round = container.querySelector("#app-round");
    const level = container.querySelector("#app-level");
    const p1Name = container.querySelector("#p1-name");
    const p1Marker = container.querySelector("#p1-marker");
    const p2Name = container.querySelector("#p2-name");
    const p2Marker = container.querySelector("#p2-marker");
    return { round, p1Name, p1Marker, p2Name, p2Marker, level };
  }
  function gameController() {
    // enable buttons
    enableSquares();
    // set turn to p1
    const turn = setTurn();
    // display p1 turn
    displayTurnIcon(turn);
    // allow player to set marker
    setTimeout(() => clickSquare(turn), 600);
    // LISTEN to broadcast regarding empty square!!!!!
    pubsub.subscribe("validMove", handleValidMove);
    // listen to marker placed
    pubsub.subscribe("markerPlaced", declareRoundWinner);
  }
  function handleValidMove([turn, index]) {
    placeMarker(turn, index);
    gameboard.renderBoard();
    pubsub.publish("markerPlaced", turn);

    if (playersInfo["p2"] === "CPU") disableSquares();

    const newTurn = setTurn();
    displayTurnIcon(newTurn);
    clickSquare(newTurn);
  }
  function setTurn() {
    if (!p1Turn && !p2Turn) {
      p1Turn = true;
      return "p1";
    } else if (p1MarkerPlaced) {
      p1Turn = false;
      p2Turn = true;
      p1MarkerPlaced = false;
      return "p2";
    } else if (p2MarkerPlaced) {
      p2Turn = false;
      p1Turn = true;
      p2MarkerPlaced = false;
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
  function clickSquare(turn) {
    const gameboard = container.querySelector("#app-gameboard");
    gameboard.removeEventListener("click", handleSquareClick);
    if (turn === "p2" && playersInfo["p2"] === "CPU") {
      computerPlaceMarker();
    } else {
      gameboard.addEventListener("click", handleSquareClick);
    }
  }
  function handleSquareClick(event) {
    const squareIndex = event.target.getAttribute("data-index");
    const boardArray = gameboard.getboard();
    const isValid = boardArray[squareIndex] === "" ? true : false;
    if (isValid) {
      const turn = p1Turn ? "p1" : "p2";
      pubsub.publish("validMove", [turn, squareIndex]);
    }
  }
  // function updateSquaresClicked(turn, index) {
  //   squaresClicked[turn].push(Number(index));
  // squaresClicked[turn] = [...new Set(squaresClicked[turn])];
  // }
  function placeMarker(turn, index) {
    const playerMarker = playersInfo[`${turn}M`];
    gameboard.updateBoard(index, playerMarker);
    // updateSquaresClicked(turn, index);

    if (turn === "p1") {
      p1MarkerPlaced = true;
    } else if (turn === "p2") {
      p2MarkerPlaced = true;
    }
  }
  function computerPlaceMarker() {
    const boardArray = gameboard.getboard();
    const freeSpaceIndices = boardArray
      .map((square, index) => (square === "" ? index : -1))
      .filter((index) => index !== -1);
    const randomIndex = generateRandomIndex(freeSpaceIndices);

    setTimeout(() => {
      placeMarker("p2", randomIndex);
      gameboard.renderBoard();
      pubsub.publish("markerPlaced", "p2");
      enableSquares();
      const newTurn = setTurn();
      displayTurnIcon(newTurn);
      clickSquare(newTurn);
    }, 500);
  }
  function generateRandomIndex(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  function isThreeInARow(turn) {
    const combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Horizontal
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Vertical
      [0, 4, 8],
      [2, 4, 6], // Diagonal
    ];
    const board = gameboard.getboard();
    for (const combination of combinations) {
      const [a, b, c] = combination;
      // if (
      //   squaresClicked[turn].includes(a) &&
      //   squaresClicked[turn].includes(b) &&
      //   squaresClicked[turn].includes(c)
      // ) {
      //   return turn;
      // }
      if (
        board[a] === playersInfo[`${turn}M`] &&
        board[b] === playersInfo[`${turn}M`] &&
        board[c] === playersInfo[`${turn}M`]
      ) {
        return true;
      }
    }
  }
  function declareRoundWinner(turn) {
    if (isThreeInARow(turn)) {
      updateScore(turn);
      endRound();
      setTimeout(() => {
        alert(`${playersInfo[turn].toUpperCase()} wins the round!`);
        restartGame();
      }, 300);
    } else if (isBoardFull()) {
      updateScore("tie");
      endRound();
      setTimeout(() => {
        alert("It's a TIE!");
        restartGame();
      }, 300);
    }
  }
  function updateScore(turn) {
    scores[turn]++;
    if (turn !== "tie") {
      const span = container.querySelector(`#${turn}-score`);
      span.textContent += "|";
    }
  }
  function endRound() {
    p1Turn = p2Turn = p1MarkerPlaced = p2MarkerPlaced = false;
    pubsub.unsubscribe("validMove", handleValidMove);
    pubsub.unsubscribe("markerPlaced", declareRoundWinner);
  }
  function restartGame() {
    if (container.querySelector("#app-round").textContent === "3") {
      declareGameWinner();
      createModal();
      return;
    }
    squaresClicked.p1 = [];
    squaresClicked.p2 = [];
    gameboard.resetBoard();
    gameboard.renderBoard();

    updateRoundCounter();
    gameController();
  }
  function updateRoundCounter() {
    const round = container.querySelector("#app-round");
    round.textContent++;
  }
  function isBoardFull() {
    return gameboard.getboard().every((square) => square !== "");
  }
  function declareGameWinner() {
    const { p1: p1Score, p2: p2Score } = scores;
    if (p1Score > p2Score) scores.winner = "p1";
    else if (p2Score > p1Score) scores.winner = "p2";
    else scores.winner = "tie";
  }
  function createModal() {
    const modal = container.querySelector(".modal");
    const blur = container.querySelector(".blur");
    Tools.removeClassList(modal, "hidden");
    Tools.removeClassList(blur, "hidden");
    const winner = scores.winner;

    const winnerDiv = document.createElement("p");
    const score = document.createElement("div");
    const replay = document.createElement("button");

    winner === "tie"
      ? (winnerDiv.textContent = "Game Tied!")
      : (winnerDiv.textContent = `${playersInfo[winner]} wins!`);
    score.textContent = `${playersInfo["p1"]}: ${scores["p1"]} - ${playersInfo["p2"]}: ${scores["p2"]} - Ties: ${scores.tie}`;
    replay.textContent = "replay";
    Tools.addClassList(replay, "start");
    replay.addEventListener("click", () => {
      Tools.redirect("./index.html", 500);
    });
    modal.append(winnerDiv, score, replay);
    Tools.addClassList(modal, "reveal");
  }
})();

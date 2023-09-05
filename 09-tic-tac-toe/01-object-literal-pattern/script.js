// create the game using the object literal pattern

const game = {
  init: function () {
    // root data structures
    this.playersInfo = {};
    this.gameboard = ["", "", "", "", "", "", "", "", ""];
    // vars
    this.p1Score = 0;
    this.p2Score = 0;
    this.tie = 0;
    // flags
    this.winner;
    this.p1Turn = false;
    this.p1MarkerPlaced = false;
    this.p2Turn = false;
    this.p2MarkerPlaced = false;

    this.cacheDOM();
    this.bindEvents();
    this.setDefault();

    if (document.body.id === "game-page") {
      this.render();
    }
  },

  cacheDOM: function () {
    this.container = document.querySelector(".container");
    this.players = this.container.querySelectorAll(".players");
    this.forms = this.container.querySelectorAll(".fields");
    this.p1Input = this.container.querySelector("#first-player");
    this.p2Input = this.container.querySelector("#second-player");

    // game DOM
    if (document.body.id === "game-page") {
      this.gameContent = this.container.querySelector(".game-content");
      this.gameboardContainer = this.container.querySelector(".game-board");
      // game header
      this.spans = this.gameContent.querySelectorAll("span");
    }
  },

  bindEvents: function () {
    // event when player1 or player2 button clicked
    this.players.forEach((player) => {
      player.addEventListener("click", this.showPlayerCard.bind(this));
    });
    // event for the marker and input
    this.forms.forEach((form) => {
      form.addEventListener("click", this.getInputs.bind(this));
    });

    // game html events
    if (document.body.id === "game-page") {
      this.gameboardContainer.addEventListener(
        "click",
        this.gameController.bind(this)
      );
    }
  },

  render: function () {
    // load the game board
    this.gameBoard();
    this.playersInfo = JSON.parse(localStorage.getItem("playersInfo"))[0];
    this.displayGameHeader();
  },

  setTurn: function () {
    if (!this.p1Turn && !this.p2Turn) {
      this.p1Turn = true;
      return "p1";
    } else if (this.p1Turn && this.p1MarkerPlaced) {
      this.p1Turn = false;
      this.p1MarkerPlaced = false;
      this.p2Turn = true;
      return "p2";
    } else if (this.p2Turn && this.p2MarkerPlaced) {
      this.p2Turn = false;
      this.p2MarkerPlaced = false;
      this.p1Turn = true;
      return "p1";
    }
  },

  placeMarker: function (event, marker) {
    if (this.checkEmptySquare(event.target)) {
      this.gameboard[this.squareIndex] = marker;
      this.gameboardContainer.innerHTML = "";
      this.gameBoard();
    }
  },

  // handler functions
  showPlayerCard: function (event) {
    switch (event.target.classList[0]) {
      case "player1-btn":
        this.addRemoveHidden(event);
        break;
      case "player2-btn":
        event.target.nextElementSibling.classList.add("hidden");
        this.addRemoveHidden(event);
        this.playersInfo["p2"] = "player 2";
        break;
      case "computer-btn":
        event.target.classList.add("selected");
        event.target.classList.remove("hover");
        this.playersInfo["p2"] = "computer";
        break;
    }
  },

  getInputs: function (event) {
    event.preventDefault();
    if (event.target.nodeName !== "BUTTON") {
      return;
    }
    switch (event.target.classList[0]) {
      case "p1-markers":
        this.p1M = this.selectMarker(event, "p1-marker1");
        break;
      case "p2-markers":
        this.p2M = this.selectMarker(event, "p2-marker1");
        break;
      case "save-btn":
        if (event.target.id === "save1") {
          this.saveInfo(event, this.p1Input, "p1", "p1M", this.p1M, "p1", "x");
        } else if (event.target.id === "save2") {
          this.saveInfo(event, this.p2Input, "p2", "p2M", this.p2M, "p2", "o");
        }
        break;
    }
    this.storePlayerInfo([this.playersInfo]);
  },

  gameBoard: function () {
    this.gameboard.forEach((marker, index) => {
      const div = document.createElement("div");
      div.setAttribute("data-index", index);
      div.classList.add("square", "highlight");
      div.textContent = marker;
      this.gameboardContainer.appendChild(div);
    });
  },

  gameController: function (event) {
    if (!this.checkEmptySquare(event.target)) {
      alert("square not empty");
      return;
    }
    this.isTurn = this.setTurn();
    this.displayTurnIcon(this.isTurn);

    switch (this.isTurn) {
      case "p1":
        this.markerP1 = this.playersInfo[`${this.isTurn}M`];
        this.placeMarker(event, this.markerP1);
        this.p1MarkerPlaced = true;
        break;

      case "p2":
        this.markerP2 = this.playersInfo[`${this.isTurn}M`];
        this.placeMarker(event, this.markerP2);
        this.p2MarkerPlaced = true;
        break;
    }
    this.declareRoundWinner();
  },

  // support functions
  addRemoveHidden: function (event) {
    event.target.classList.add("hidden");
    event.target.parentElement.firstElementChild.classList.remove("hidden");
    event.target.parentElement.classList.add("card-border-rad");
    event.target.previousElementSibling.classList.add("fade-in");
    event.target.removeEventListener("click", this.showPlayerCard.bind(this));
  },

  setDefault: function () {
    this.playersInfo["p1"] = "p1";
    this.playersInfo["p1M"] = "x";
    this.playersInfo["p2"] = "p2";
    this.playersInfo["p2M"] = "o";
  },

  selectMarker: function (event, buttonID) {
    if (event.target.id === buttonID) {
      event.target.classList.add("selected");
      event.target.nextElementSibling.classList.remove("selected");
    } else {
      event.target.classList.add("selected");
      event.target.previousElementSibling.classList.remove("selected");
    }
    return event.target.textContent.trim();
  },

  getName: function (playerInput) {
    if (playerInput.value.trim() !== "") {
      return playerInput.value.trim().toLowerCase();
    }
  },

  saveInfo: function (event, plIn, player, marker, inMark, deName, deMark) {
    event.target.classList.add("saved");
    this.playersInfo[player] = this.getName(plIn) || deName;
    this.playersInfo[marker] = inMark || deMark;
  },

  storePlayerInfo: function (array) {
    localStorage.setItem("playersInfo", JSON.stringify(array));
  },

  checkEmptySquare: function (target) {
    this.squareIndex = target.getAttribute("data-index");
    return this.gameboard[this.squareIndex] === "" ? true : false;
  },

  is3InARow: function (playerTurn) {
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

    for (const combo of combinations) {
      const [a, b, c] = combo;
      if (
        this.gameboard[a] === this.playersInfo[`${playerTurn}M`] &&
        this.gameboard[b] === this.playersInfo[`${playerTurn}M`] &&
        this.gameboard[c] === this.playersInfo[`${playerTurn}M`]
      ) {
        return playerTurn;
      }
    }
  },

  startRound: function () {
    return this.gameboardContainer.classList.remove("disable-squares");
  },

  endRound: function () {
    return this.gameboardContainer.classList.add("disable-squares");
  },

  displayTurnIcon: function (turn) {
    console.log(turn);
    console.log(this.spans);
    if (turn === "p1") {
      this.spans[5].classList.add("hidden");
      this.spans[9].classList.remove("hidden");
    } else if (turn === "p2") {
      this.spans[5].classList.remove("hidden");
      this.spans[9].classList.add("hidden");
    }
  },

  declareRoundWinner: function () {
    this.roundWinner = this.is3InARow(this.isTurn);
    if (this.roundWinner) {
      this.updateScore(this.roundWinner);
      this.endRound();
      setTimeout(
        () => alert(`${this.playersInfo[this.roundWinner]} wins`),
        300
      );
      this.resetGameBoard();
    } else if (!this.gameboard.includes("")) {
      setTimeout(() => alert("Round tied"), 300);
      this.resetGameBoard();
    }
  },

  declareGameWinner: function () {
    if (this.p1Score > this.p2Score) {
      this.winner = this.playersInfo["p1"];
    } else if (this.p2Score > this.p1Score) {
      this.winner = this.playersInfo["p2"];
    } else {
      this.winner = "Game Tied";
    }
    setTimeout(() => this.createModal(this.winner), 500);
  },

  displayGameHeader: function () {
    this.spans.forEach((item) => {
      switch (item.id) {
        // case "timer":
        // item.textContent = "";
        //   break;
        case "round":
          item.textContent = 1;
          break;
        case "player1-name":
          item.textContent = `${this.playersInfo["p1"]}:`;
          break;
        case "p1-marker":
          item.textContent = this.playersInfo["p1M"];
          break;
        case "player2-name":
          item.textContent = `${this.playersInfo["p2"]}:`;
          break;
        case "p2-marker":
          item.textContent = this.playersInfo["p2M"];
          break;
      }
    });
  },

  resetGameBoard: function () {
    setTimeout(() => {
      if (this.spans[1].textContent === "3") {
        this.declareGameWinner();
        return;
      } else {
        this.spans[1].textContent++;
        this.spans[5].classList.remove("hidden");
        this.spans[9].classList.add("hidden");
        this.p1Turn = false;
        this.p2Turn = false;
        this.startRound();
        this.gameboard = ["", "", "", "", "", "", "", "", ""];
        this.gameboardContainer.innerHTML = "";
        this.gameBoard();
      }
    }, 1000);
  },

  updateScore: function (winner) {
    if (winner === "p1") {
      this.p1Score += 1;
      this.spans[4].textContent += "|";
    } else if (winner === "p2") {
      this.p2Score += 1;
      this.spans[8].textContent += "|";
    } else {
      this.tie += 1;
    }
  },

  createModal: function (winner) {
    this.modal = this.gameContent.lastElementChild.previousElementSibling;
    this.blur = this.gameContent.lastElementChild;

    this.modal.classList.remove("hidden");
    this.blur.classList.remove("hidden");

    this.winningPlayer = document.createElement("div");
    this.score = document.createElement("div");
    this.replay = document.createElement("button");

    if (winner === "p1" || winner === "p2") {
      this.winningPlayer.textContent = `${winner} wins!`;
    } else {
      this.winningPlayer.textContent = `${winner}!`;
    }

    this.score.textContent = `${this.playersInfo["p1"]}: ${this.p1Score} ${this.playersInfo["p2"]}: ${this.p2Score} Ties: ${this.tie}`;
    this.replay.textContent = "Replay";
    this.replay.classList.add("start");
    this.replay.addEventListener("click", this.redirect.bind(this));

    this.modal.appendChild(this.winningPlayer);
    this.modal.appendChild(this.score);
    this.modal.appendChild(this.replay);
  },

  redirect: function () {
    setTimeout(() => (window.location = "../menu.html"), 500);
  },
};

game.init();

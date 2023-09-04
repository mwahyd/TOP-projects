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
    this.winner = false;
    this.p1Turn = false;
    this.p1MarkerPlaced = false;
    this.p2Turn = false;
    this.p2MarkerPlaced = false;

    this.cacheDOM();
    this.bindEvents();
    this.setDefault();

    if (document.body.id === "game-page") {
      this.render();
      // this.setTurn();
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
      // window.addEventListener("load", this.gameBoard.bind(this));
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
    console.log(this.playersInfo);
    this.displayGameHeader();
  },

  setTurn: function () {
    console.log("p1 turn", this.p1Turn, "p2 turn", this.p2Turn);
    if (this.p1Turn === false && this.p2Turn === false) {
      this.p1Turn = true;
      return "p1";
    } else if (this.p1Turn === true && this.p1MarkerPlaced === true) {
      console.log("player1 has played turn");
      this.p1Turn = false;
      this.p1MarkerPlaced = false;
      this.p2Turn = true;
      return "p2";
    } else if (this.p2Turn === true && this.p2MarkerPlaced === true) {
      console.log("player2 has played turn");
      this.p2Turn = false;
      this.p2MarkerPlaced = false;
      this.p1Turn = true;
      return "p1";
    }
  },

  placeMarker: function (event, marker) {
    if (this.checkEmptySquare(event.target)) {
      this.gameboard[this.squareIndex] = marker;
      console.log(this.gameboard);
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
        console.log(this.playersInfo);
        break;
      case "computer-btn":
        event.target.classList.add("selected");
        event.target.classList.remove("hover");
        this.playersInfo["p2"] = "computer";
        console.log(this.playersInfo);
        break;
    }
  },

  getInputs: function (event) {
    event.preventDefault();
    if (event.target.nodeName !== "BUTTON") {
      console.log("not a button click");
      return;
    }
    switch (event.target.classList[0]) {
      case "p1-markers":
        this.p1M = this.selectMarker(event, "p1-marker1");
        console.log(this.p1M);
        break;
      case "p2-markers":
        this.p2M = this.selectMarker(event, "p2-marker1");
        console.log(this.p2M);
        break;
      case "save-btn":
        if (event.target.id === "save1") {
          this.saveInfo(event, this.p1Input, "p1", "p1M", this.p1M, "p1", "x");
        } else if (event.target.id === "save2") {
          this.saveInfo(event, this.p2Input, "p2", "p2M", this.p2M, "p2", "o");
        }
        console.log(this.playersInfo);
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
    console.log(this.gameboard);
  },

  gameController: function (event) {
    // check player turn,
    if (this.checkEmptySquare(event.target)) {
      this.isTurn = this.setTurn();
    } else {
      alert("square not empty");
    }
    console.log(this.isTurn);
    // get player marker,
    switch (this.isTurn) {
      case "p1":
        this.markerP1 = this.playersInfo[`${this.isTurn}M`];
        console.log(this.markerP1);
        this.placeMarker(event, this.markerP1);
        this.p1MarkerPlaced = true;
        console.log("p1MarkerPlaced", this.p1MarkerPlaced);
        break;

      case "p2":
        this.markerP2 = this.playersInfo[`${this.isTurn}M`];
        console.log(this.markerP2);
        this.placeMarker(event, this.markerP2);
        this.p2MarkerPlaced = true;
        console.log("p2MarkerPlaced", this.p2MarkerPlaced);
        break;
    }
    // allow player to place marker if square is empty,
    // transfer turn to player2

    // check 3 in a row
    // setTimeout(() => this.is3InARow(this.isTurn), 50);

    this.roundWinner = this.is3InARow(this.isTurn);
    if (this.roundWinner) {
      this.endRound();
      setTimeout(() => alert(`${this.roundWinner} wins`), 50);
      this.score(this.roundWinner);
    } else if (!this.gameboard.includes("")) {
      this.endRound();
      setTimeout(() => alert("Round tied"), 50);
    }

    // ? remove event listener
  },

  // support functions
  reset: function () {
    // remove card-border-rad from showPlayerCard
    // remove hidden from showPlayerCard
    // add hover class to computer-btn
    // - reload the page to set it back to default
    // remove saved from save buttons
    // remove saved from marker buttons
    // ! clear local storage FOR EVERY NEW GAME
    // clear timer for every game
    //
  },

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
    // console.log(this.playersInfo);
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
    //   return target.textContent === "" ? true : false;
    //   this.squareIndex = event.target.getAttribute("data-index");
    //   if (this.gameboard[this.squareIndex] === "") {
    // },
  },

  is3InARow: function (playerTurn) {
    // check if player has their marker on these spots
    if (
      // top horizontal
      (this.gameboard[0] === this.playersInfo[`${playerTurn}M`] &&
        this.gameboard[1] === this.playersInfo[`${playerTurn}M`] &&
        this.gameboard[2] === this.playersInfo[`${playerTurn}M`]) ||
      // centre horizontal
      (this.gameboard[3] === this.playersInfo[`${playerTurn}M`] &&
        this.gameboard[4] === this.playersInfo[`${playerTurn}M`] &&
        this.gameboard[5] === this.playersInfo[`${playerTurn}M`]) ||
      // bottom horizontal
      (this.gameboard[6] === this.playersInfo[`${playerTurn}M`] &&
        this.gameboard[7] === this.playersInfo[`${playerTurn}M`] &&
        this.gameboard[8] === this.playersInfo[`${playerTurn}M`]) ||
      // left vertical
      (this.gameboard[0] === this.playersInfo[`${playerTurn}M`] &&
        this.gameboard[3] === this.playersInfo[`${playerTurn}M`] &&
        this.gameboard[6] === this.playersInfo[`${playerTurn}M`]) ||
      // centre vertical
      (this.gameboard[1] === this.playersInfo[`${playerTurn}M`] &&
        this.gameboard[4] === this.playersInfo[`${playerTurn}M`] &&
        this.gameboard[7] === this.playersInfo[`${playerTurn}M`]) ||
      // right vertical
      (this.gameboard[2] === this.playersInfo[`${playerTurn}M`] &&
        this.gameboard[5] === this.playersInfo[`${playerTurn}M`] &&
        this.gameboard[8] === this.playersInfo[`${playerTurn}M`]) ||
      // right diagonal
      (this.gameboard[0] === this.playersInfo[`${playerTurn}M`] &&
        this.gameboard[4] === this.playersInfo[`${playerTurn}M`] &&
        this.gameboard[8] === this.playersInfo[`${playerTurn}M`]) ||
      // left diagonal
      (this.gameboard[2] === this.playersInfo[`${playerTurn}M`] &&
        this.gameboard[4] === this.playersInfo[`${playerTurn}M`] &&
        this.gameboard[6] === this.playersInfo[`${playerTurn}M`])
    )
      return playerTurn;
  },

  endRound: function () {
    return this.gameboardContainer.classList.add("disable-squares");
  },

  displayGameHeader: function () {
    this.spans.forEach((item) => {
      switch (item.id) {
        case "timer":
          // console.log(item.id);
          item.textContent = "1:30";
          break;
        case "round":
          // console.log(item.id);
          item.textContent = 1;
          break;
        case "player1-name":
          // console.log(item.id);
          item.textContent = this.playersInfo["p1"];
          break;
        case "p1-marker":
          // console.log(item.id);
          item.textContent = this.playersInfo["p1M"];
          break;
        case "player2-name":
          // console.log(item.id);
          item.textContent = this.playersInfo["p2"];
          break;
        case "p2-marker":
          // console.log(item.id);
          item.textContent = this.playersInfo["p2M"];
          break;
      }
    });
  },

  score: function (winner) {
    if (winner === "p1") {
      this.p1Score += 1;
    } else if (winner === "p2") {
      this.p2Score += 1;
    } else {
      this.tie += 1;
    }
  },

  updateGameHeader: function () {
    // update round info;
    // give winner a point;
    // enable square clicks;
  },
};

game.init();

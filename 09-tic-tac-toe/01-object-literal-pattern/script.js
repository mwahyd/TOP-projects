// create the game using the object literal pattern

const game = {
  // root functions
  playersInfo: {},

  // flags
  p1Turn: false,
  p1MarkerPlaced: false,
  p2Turn: false,
  p2MarkerPlaced: false,

  init: function () {
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
      window.addEventListener("load", this.gameBoard.bind(this));
      this.gameboardContainer.addEventListener(
        "click",
        this.gameController.bind(this)
      );
    }
  },

  render: function () {
    this.playersInfo = JSON.parse(localStorage.getItem("playersInfo"))[0];
    console.log(this.playersInfo);
    // display all the player infomation
    // console.log(this.spans);
    this.spans.forEach((item) => {
      switch (item.id) {
        case "timer":
          // console.log(item.id);
          item.textContent = "1:30";
          break;
        case "round":
          // console.log(item.id);
          item.textContent = 2;
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
    // check which player's turn
    console.log(event.target);
    // check if squre is empty
    console.log("empty square", this.checkEmptySquare(event.target));
    // place marker
    if (this.checkEmptySquare(event.target)) {
      event.target.textContent = marker;
    } else {
      console.log("square not empty");
    }

    // call change turn function
    this.setTurn();
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
    this.gameboard = ["", "", "", "", "", "", "", "", "x"];
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
    this.isTurn = this.setTurn();
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
    return target.textContent === "" ? true : false;
  },
};

game.init();

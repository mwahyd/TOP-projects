// create the game using the object literal pattern

const game = {
  // root functions
  playersInfo: {},

  init: function () {
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
      window.addEventListener("load", this.gameBoard.bind(this));
    }
  },

  render: function () {
    this.playersInfo = JSON.parse(localStorage.getItem("playersInfo"))[0];
    console.log(this.playersInfo);
    // display all the player infomation
    console.log(this.spans);
    this.spans.forEach((item) => {
      switch (item.id) {
        case "timer":
          console.log(item.id);
          item.textContent = "1:30";
          break;
        case "round":
          console.log(item.id);
          item.textContent = 2;
          break;
        case "player1-name":
          console.log(item.id);
          item.textContent = this.playersInfo["p1"];
          break;
        case "p1-marker":
          console.log(item.id);
          item.textContent = this.playersInfo["p1Marker"];
          break;
        case "player2-name":
          console.log(item.id);
          item.textContent = this.playersInfo["p2"];
          break;
        case "p2-marker":
          console.log(item.id);
          item.textContent = this.playersInfo["p2Marker"];
          break;
      }
    });
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
        this.p1Marker = this.selectMarker(event, "p1-marker1");
        console.log(this.p1Marker);
        break;
      case "p2-markers":
        this.p2Marker = this.selectMarker(event, "p2-marker1");
        console.log(this.p2Marker);
        break;
      case "save-btn":
        if (event.target.id === "save1") {
          event.target.classList.add("saved");
          this.p1Name = this.getName(this.p1Input);
          this.playersInfo["p1"] = this.p1Name || "player 1";
          this.playersInfo["p1Marker"] = this.p1Marker || "x";
        } else if (event.target.id === "save2") {
          event.target.classList.add("saved");
          this.p2Name = this.getName(this.p2Input);
          this.playersInfo["p2"] = this.p2Name || "player 2";
          this.playersInfo["p2Marker"] = this.p2Marker || "o";
        }
        console.log(this.playersInfo);
        break;
    }
    this.storePlayerInfo([this.playersInfo]);
  },

  gameBoard: function () {
    this.gameboard = ["x", "o", "x", "o", "x", "", "", "o", "x"];
    this.gameboard.forEach((marker, index) => {
      const div = document.createElement("div");
      div.setAttribute("data-index", index);
      div.classList.add("square", "highlight");
      div.textContent = marker;

      this.gameboardContainer.appendChild(div);
    });
    console.log(this.gameboard);
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
    this.playersInfo["p1Marker"] = "x";
    this.playersInfo["p2"] = "p2";
    this.playersInfo["p2Marker"] = "o";
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

  storePlayerInfo: function (array) {
    localStorage.setItem("playersInfo", JSON.stringify(array));
  },
};

game.init();

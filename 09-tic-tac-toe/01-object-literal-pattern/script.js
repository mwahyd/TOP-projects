// create the game using the object literal pattern

const game = {
  // root functions
  playersInfo: {},

  init: function () {
    this.cacheMenuDOM();
    this.bindEvents();
    this.setDefault();
    console.log("this works from init");
  },

  cacheMenuDOM: function () {
    this.container = document.querySelector(".container");
    this.players = this.container.querySelectorAll(".players");
    this.forms = this.container.querySelectorAll(".fields");
    this.p1Input = this.container.querySelector("#first-player");
    this.p2Input = this.container.querySelector("#second-player");
  },

  bindEvents: function () {
    this.players.forEach((player) => {
      player.addEventListener("click", this.showPlayerCard.bind(this));
    });

    this.forms.forEach((form) => {
      form.addEventListener("click", this.getInputs.bind(this));
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

    // console.log(this.playersInfo);
    // console.log(event.target);
    // console.log(event.target.classList.add("saved"));
  },

  // support functions
  reset: function () {
    // remove card-border-rad from showPlayerCard
    // remove hidden from showPlayerCard
    // add hover class to computer-btn
    // - reload the page to set it back to default
    // remove saved from save buttons
    // remove saved from marker buttons
  },

  addRemoveHidden: function (event) {
    event.target.classList.add("hidden");
    event.target.parentElement.firstElementChild.classList.remove("hidden");
    event.target.parentElement.classList.add("card-border-rad");
    event.target.previousElementSibling.classList.add("fade-in");
    event.target.removeEventListener("click", this.showPlayerCard.bind(this));
  },

  setDefault: function () {
    this.playersInfo["p1"] = "player 1";
    this.playersInfo["p1Marker"] = "x";
    this.playersInfo["p2"] = "player 2";
    this.playersInfo["p2Marker"] = "o";
    console.log(this.playersInfo);
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
};

game.init();

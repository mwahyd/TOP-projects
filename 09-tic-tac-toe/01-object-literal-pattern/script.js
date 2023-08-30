// create the game using the object literal pattern

const game = {
  // root functions
  init: function () {
    this.cacheMenuDOM();
    this.bindEvents();
    console.log("this works from init");
  },

  cacheMenuDOM: function () {
    this.container = document.querySelector(".container");
    this.players = document.querySelectorAll(".players");
  },

  bindEvents: function () {
    this.players.forEach((player) => {
      player.addEventListener("click", this.showPlayerCard.bind(this));
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
        break;
      case "computer-btn":
        event.target.classList.add("selected");
        event.target.classList.remove("hover");
        break;
    }
  },

  // support functions
  reset: function () {
    // remove card-border-rad from showPlayerCard
    // remove hidden from showPlayerCard
    // add hover class to computer-btn
    // reload the page to set it back to default
  },

  addRemoveHidden: function (event) {
    event.target.classList.add("hidden");
    event.target.parentElement.firstElementChild.classList.remove("hidden");
    event.target.parentElement.classList.add("card-border-rad");
    event.target.removeEventListener("click", this.showPlayerCard.bind(this));
  },
};

game.init();

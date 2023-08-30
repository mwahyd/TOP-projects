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
    this.player1Btn = this.container.querySelector(".player1-btn");
    // this.player1Form = this.container.querySelector(".player1-form");

    this.player2Btn = this.container.querySelector(".player2-btn");
    // this.player2Form = this.container.querySelector(".player2-form");
  },

  bindEvents: function () {
    this.player1Btn.addEventListener("click", this.showPlayerCard.bind(this));
    this.player2Btn.addEventListener("click", this.showPlayerCard.bind(this));
  },

  // handler functions
  showPlayerCard: function (event) {
    if (event.target.classList.contains("player2-btn")) {
      event.target.nextElementSibling.classList.add("hidden");
      // event.target.parentElement.classList.add(".card-border-rad");
    }
    event.target.classList.add("hidden");
    event.target.parentElement.firstElementChild.classList.remove("hidden");
    event.target.parentElement.classList.add("card-border-rad");
  },

  // support functions
  reset: function () {
    // remove card-border-rad from showPlayerCard
    // remove hidden from showPlayerCard
  },
};

game.init();

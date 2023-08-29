// create the game using the object literal pattern

const game = {
  init: function () {
    this.cacheMenuDOM();
    this.bindEvents();
    console.log("this works from init");
  },

  cacheMenuDOM: function () {
    this.main = document.querySelector("#main");
    this.vsPlayerBtn = this.main.querySelector(".option1");
    this.vsCompBtn = this.main.querySelector(".option2");
    this.startBtn = this.main.querySelector(".start");
    this.modal1 = this.main.querySelector(".modal1");
  },

  bindEvents: function () {
    this.vsPlayerBtn.addEventListener("click", this.openPlayerModal.bind(this));
  },

  // support functions
  openPlayerModal: function (event) {
    this.modal1.classList.toggle("hidden");
  },
};

game.init();

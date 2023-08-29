// create the game using the object literal pattern

const game = {
  // root functions
  init: function () {
    this.cacheMenuDOM();
    this.bindEvents();
    console.log("this works from init");
  },

  cacheMenuDOM: function () {
    this.main = document.querySelector("#main");
  },

  bindEvents: function () {},

  // handler functions
};

game.init();

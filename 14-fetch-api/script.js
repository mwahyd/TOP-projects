import pubsub from "./pubsub.js";

(function gifGenerator() {
  // initialise
  // cache DOM
  const doc = document.querySelector("[data-main]");
  const input = doc.querySelector("[data-input]");
  const button = doc.querySelector("[data-button]");
  // bind pubsub events
  pubsub.subscribe("userInput", fetchData);
  // bind DOM events
  document.addEventListener("DOMContentLoaded", render);
  document.addEventListener("keypress", handleBtnClick);
  button.addEventListener("click", handleBtnClick);

  // render
  function render(ev, url) {
    // display spinner
    const URL =
      url ||
      "https://api.giphy.com/v1/gifs/translate?api_key=A8XcbgUs7Yl3CrkTqHAwKDpOiQ6gQodu&s=cats";
    const img = document.querySelector("#img");
    fetch(URL)
      .then((res) => res.json())
      .then((data) => (img.src = data.data.images.original.url));
    // remove spinner in the last .then
  }

  // handler functions
  function handleBtnClick(ev) {
    if (ev.key !== "Enter") return;
    const userInput = getInputData();
    if (userInput === "") return;
    pubsub.publish("userInput", userInput);
  }

  function fetchData(query) {
    const url = `https://api.giphy.com/v1/gifs/translate?api_key=A8XcbgUs7Yl3CrkTqHAwKDpOiQ6gQodu&s=${query}`;
    render(null, url);
  }

  // support functions
  function getInputData() {
    return input.value.trim().toLowerCase();
  }
})();

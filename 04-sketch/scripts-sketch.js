// vars
let gridX = 16;
let gridY = 16;
let isDraw = false;
let isErase = false;

// query selectors
const canvas = document.querySelector(".canvas");
const colourPicker = document.querySelector("#colour-picker");

// created elements
const gridContainer = document.createElement("div");
// const grid = document.createElement("div");

// // get canvas dimensions
// console.log(canvas.offsetWidth);
// console.log(canvas.offsetHeight);

// functions
function createGrid(width, height) {
  const number = width * height;
  for (const num of Array.from(Array(number).keys())) {
    const square = document.createElement("div");
    square.classList.add("box-border", "square");

    // square.style.width = `${canvas.offsetWidth / width - 1}px`;
    // square.style.height = `${canvas.offsetHeight / height - 1}px`;

    const dimension = canvas.offsetWidth / width;
    const dimensionPercent = (dimension / canvas.offsetWidth) * 100;
    square.style.width = `${dimensionPercent}%`;
    // square.style.height = `${dimensionPercent}%`;

    // console.log(dimension);
    // console.log(dimensionPercent);

    canvas.appendChild(square);
  }
}

// set up grid
createGrid(gridX, gridY);

// activity functions
function addHover(event) {
  event.target.classList.add("hover");
}

function removeHover(event) {
  event.target.classList.remove("hover");
}

function getColour() {
  return colourPicker.value;
}

function addRemoveSelect(button) {
  if (isDraw === true && isErase === false) {
    button.classList.add("selected");
    button.nextElementSibling.classList.remove("selected");
  } else if (isDraw === false && isErase === true) {
    button.classList.add("selected");
    button.previousElementSibling.classList.remove("selected");
  } else if (isDraw === false || isErase === false) {
    // button.classList.remove("selected");
    button.previousElementSibling.classList.remove("selected");
    button.previousElementSibling.previousElementSibling.classList.remove(
      "selected"
    );
  }
}

function draw(colourCode, square) {
  square.style.backgroundColor = colourCode;
  square.classList.add("coloured");
}

function erase(square) {
  if (square.classList.contains("coloured")) {
    square.style.backgroundColor = "";
    square.classList.add("erased");
    square.classList.remove("coloured");
  }
}

// handler functions
function squareClicked(event) {
  if (isDraw) {
    draw(getColour(), event.target);
  } else if (isErase) {
    erase(event.target);
  }
  // console.log(event.target);
  // const colour = getColour();
  // console.log(colour);
  // event.target.style.backgroundColor = colour;
  // event.target.classList.add("coloured");
}

function checkToolClicked(event) {
  if (event.target.nodeName !== "BUTTON") {
    return;
  }
  switch (event.target.id) {
    case "draw":
      isDraw = true;
      isErase = false;
      addRemoveSelect(event.target);
      break;
    case "eraser":
      isDraw = false;
      isErase = true;
      addRemoveSelect(event.target);
      break;
    case "clear":
      isDraw = false;
      isErase = false;
      addRemoveSelect(event.target);
      break;
  }
}

// event listeners
const squares = canvas.querySelectorAll(".square");
squares.forEach((square) => {
  square.addEventListener("mouseenter", addHover);
  square.addEventListener("mouseleave", removeHover);

  // click event
  square.addEventListener("mousedown", squareClicked);
});

const tools = document.querySelector(".tools");
tools.addEventListener("click", checkToolClicked);

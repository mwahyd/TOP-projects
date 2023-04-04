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

function addHover(event) {
  event.target.classList.add("hover");
}

function removeHover(event) {
  event.target.classList.remove("hover");
}

function getColour() {
  return colourPicker.value;
}

// handler functions
function buttonClicked(event) {
  console.log(event.target);
  const colour = getColour();
  console.log(colour);
  event.target.style.backgroundColor = colour;
  event.target.classList.add("coloured");
}

function checkToolClicked(event) {
  if (event.target.nodeName !== "BUTTON") {
    return;
  }
  console.log(event.target.nodeName);
  console.log(event.target.id);
  switch (event.target.id) {
    case "draw":
      isDraw = true;
      isErase = false;
      console.log("You clicked the draw button");
      break;
    case "eraser":
      isDraw = false;
      isErase = true;
      console.log("You clicked the eraser button");
      break;
    case "clear":
      isDraw = false;
      isErase = false;
      console.log("You clicked the clear button");
      break;
  }
}

// event listeners
const squares = canvas.querySelectorAll(".square");
squares.forEach((square) => {
  square.addEventListener("mouseenter", addHover);
  square.addEventListener("mouseleave", removeHover);

  // click event
  square.addEventListener("mousedown", buttonClicked);
});

const tools = document.querySelector(".tools");
tools.addEventListener("click", checkToolClicked);

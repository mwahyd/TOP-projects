// vars
let gridX = 16;
let gridY = 16;

// query selectors
const canvas = document.querySelector(".canvas");

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

// event listeners
const squares = canvas.querySelectorAll(".square");
squares.forEach((square) => {
  square.addEventListener("mouseenter", addHover);
  square.addEventListener("mouseleave", removeHover);
});

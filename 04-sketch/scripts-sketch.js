// vars
let gridX = 2;
let gridY = 2;

// query selectors
const canvas = document.querySelector(".canvas");

// created elements
const gridContainer = document.createElement("div");
// const grid = document.createElement("div");

// get canvas dimensions
console.log(canvas.offsetWidth);
console.log(canvas.offsetHeight);

// functions
function createGrid(width, height) {
  const number = width * height;
  for (const num of Array.from(Array(number).keys())) {
    const square = document.createElement("div");
    square.classList.add("box-border");

    // square.style.width = `${canvas.offsetWidth / width - 1}px`;
    // square.style.height = `${canvas.offsetHeight / height - 1}px`;

    const dimension = canvas.offsetWidth / width;
    const dimensionPercent = (dimension / canvas.offsetWidth) * 100;
    square.style.width = `${dimensionPercent}%`;
    // square.style.height = `${dimensionPercent}%`;

    console.log(dimension);
    console.log(dimensionPercent);

    canvas.appendChild(square);
  }
}

createGrid(gridX, gridY);

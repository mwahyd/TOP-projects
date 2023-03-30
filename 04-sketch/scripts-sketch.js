// query selectors
const canvas = document.querySelector(".canvas");

// created elements
const gridContainer = document.createElement("div");
// const grid = document.createElement("div");

// get canvas dimensions
console.log(canvas.offsetWidth);
console.log(canvas.offsetHeight);

// functions
function createGrid(squares) {
  for (const num of Array.from(Array(squares).keys())) {
    const square = document.createElement("div");
    square.className = "box";
    canvas.appendChild(square);
  }
}

createGrid(10);

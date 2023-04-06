// vars
let isDraw = false;
let isErase = false;

// query selectors
const canvas = document.querySelector(".canvas");
const colourPicker = document.querySelector("#colour-picker");

// created elements
const gridContainer = document.createElement("div");

// functions
function getSliderValue() {
  return slider.value;
}

function createGrid(sliderValue) {
  const gridSize = sliderValue ** 2;
  for (const num of Array.from(Array(gridSize).keys())) {
    const square = document.createElement("div");
    square.classList.add("box-border", "square");

    const dimension = canvas.offsetWidth / sliderValue;
    const dimensionPercent = (dimension / canvas.offsetWidth) * 100;
    square.style.width = `${dimensionPercent}%`;

    canvas.appendChild(square);
  }
}

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

function clearCanvas() {
  const squares = canvas.querySelectorAll(".square");
  squares.forEach((square) => {
    if (square.classList.contains("coloured")) {
      square.style.backgroundColor = "";
    }
  });
}

function destroyCanvas(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function setSquareListeners() {
  const squares = canvas.querySelectorAll(".square");
  squares.forEach((square) => {
    square.addEventListener("mouseenter", addHover);
    square.addEventListener("mouseleave", removeHover);

    // click event
    square.addEventListener("mousedown", squareClicked);
  });
}

// handler functions
function squareClicked(event) {
  if (isDraw) {
    draw(getColour(), event.target);
  } else if (isErase) {
    erase(event.target);
  }
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
      clearCanvas();
      break;
  }
}

function updateCanvas(event) {
  destroyCanvas(canvas);
  createGrid(getSliderValue());
  setSquareListeners();
}

// buttons
const tools = document.querySelector(".tools");
tools.addEventListener("click", checkToolClicked);

// range slider
const slider = document.querySelector("#slider");
slider.addEventListener("input", updateCanvas);

// set up grid
createGrid(getSliderValue());

// square event listeners
setSquareListeners();

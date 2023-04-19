// constatns
const BUTTONS = document.querySelectorAll("button");
const DISPLAY = document.querySelector(".pressed-buttons");

// vars

// activity functions

// handler functions
function buttonClicked(event) {
  console.log(event.target);
  DISPLAY.textContent += event.target.textContent;
}

// event listeners
BUTTONS.forEach((button) => {
  button.addEventListener("click", buttonClicked);
});

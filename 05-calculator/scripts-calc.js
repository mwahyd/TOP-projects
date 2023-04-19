// constatns
const BUTTONS = document.querySelectorAll("button");
const DISPLAY = document.querySelector(".pressed-buttons");

// vars
const numsSigns = [0];
const signPos = [];
let total = 0;

// activity functions
function displayStoreDigits(event) {
  numsSigns.push(Number(event.target.textContent));
  DISPLAY.textContent += event.target.textContent;
  console.log(numsSigns);
}

function displayStoreSigns(event) {
  numsSigns.push(event.target.textContent);
  DISPLAY.textContent += event.target.textContent;
  console.log(numsSigns);
}

function getSignPositions(array) {
  for (let i = 0; i < array.length; i++) {
    if (typeof array[i] === "string") {
      signPos.push(i);
    }
  }
  console.log(signPos);
  console.log(array);
}

// handler functions
function buttonClicked(event) {
  switch (event.target.className) {
    case "digit":
      displayStoreDigits(event);
      break;

    case "sign":
      displayStoreSigns(event);
      break;

    case "operator":
      if (event.target.id === "equal") {
        console.log("equal button clicked");
        getSignPositions(numsSigns);
      }
  }
  //   console.log(event.target);
  //   DISPLAY.textContent += event.target.textContent;
}

// event listeners
BUTTONS.forEach((button) => {
  button.addEventListener("click", buttonClicked);
});

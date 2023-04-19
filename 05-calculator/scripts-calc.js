// constatns
const BUTTONS = document.querySelectorAll("button");
const DISPLAY = document.querySelector(".pressed-buttons");

// vars
const numsSigns = [0];

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

// handler functions
function buttonClicked(event) {
  switch (event.target.className) {
    case "digit":
      displayStoreDigits(event);
      break;

    case "sign":
      displayStoreSigns(event);
      break;
  }
  //   console.log(event.target);
  //   DISPLAY.textContent += event.target.textContent;
}

// event listeners
BUTTONS.forEach((button) => {
  button.addEventListener("click", buttonClicked);
});

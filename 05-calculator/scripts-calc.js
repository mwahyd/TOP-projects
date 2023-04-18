// constants
const SIGNS = ["+", "-", "*", "/"];
const CALCULATOR = document.querySelector(".calculator");
const BUTTONS = CALCULATOR.querySelectorAll("button");

// variables
let num1 = 0,
  num2 = 0,
  sign = "",
  total = 0;

let isNum1Collected = false;
let isNum2Collected = false;
let isSignClicked = false;
let isTotalNull = true;

// math functions
function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(sign, num1, num2) {
  switch (sign) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      console.error("Invalid sign:", sign);
      return null;
  }
}

// handler functions
// function getButtonClicked(event) {
//   if (event.target.className !== "sign" && isSignClicked === false) {
//     console.log("FIRST NUM", event.target);
//   } else if (event.target.className === "sign") {
//     isNum1Collected = true;
//     isSignClicked = true;
//     console.log("SIGN PRESSED", event.target);
//   } else if (isSignClicked && isNum1Collected) {
//     console.log("SECOND NUM", event.target);
//   }
//   // console.log(event.target);
//   // console.log(event.target.className);
// }

// activity functions
function getFirstNum(event) {
  num1 += `${event.target.textContent}`;
  console.log(num1.slice(1));
}

function getSecondNum(event) {
  num2 += `${event.target.textContent}`;
  console.log(num2.slice(1));
}

function calculate(firstNum, sign, secondNum) {
  console.log(`${firstNum} ${sign} ${secondNum}`);
}

// handler functions
function getButtonClicked(event) {
  switch (event.target.className) {
    case "digit":
      console.log("run function", event.target.className);
      if (isTotalNull && !isSignClicked && !isNum2Collected) {
        getFirstNum(event);
        isNum1Collected = true;
      }
      if (isSignClicked) {
        getSecondNum(event);
        isNum2Collected = true;
      }
      break;
    case "sign":
      isSignClicked = true;
      sign = event.target.textContent;
      console.log(sign);
      console.log("run function", event.target.className);
      break;
    case "operator":
      console.log("run function", event.target.className);
      if (event.target.id === "equal") {
        console.log("equal button clicked");
        calculate(num1, sign, num2);
      }
      break;
  }
}

// event listeners

BUTTONS.forEach((button) => {
  button.addEventListener("click", getButtonClicked);
});

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

let result = add(1, 2);
console.log("add()", result);

result = subtract(4, 2);
console.log("subtract()", result);

result = multiply(3, 2.5);
console.log("multiply()", result);

result = divide(7, 2);
console.log("divide()", result);

result = operate("+", 1, 5);
console.log(result);

result = operate("-", 1, 5);
console.log(result);

result = operate("*", 11.66, 5);
console.log(result);

result = operate("/", 17, 5);
console.log(result);

result = operate("?", 1, 5);
console.log(result);

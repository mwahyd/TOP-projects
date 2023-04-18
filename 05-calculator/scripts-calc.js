// constants
const SIGNS = ["+", "-", "*", "/"];
const CALCULATOR = document.querySelector(".calculator");
const BUTTONS = CALCULATOR.querySelectorAll("button");

// variables
let num1 = 0,
  num2 = 0,
  sign = "",
  total = 0;

let isNum2Collected = false;
let isSignClicked = false;
let isTotalNull = true;

// math functions
function add(num1, num2) {
  total = num1 + num2;
  console.log(total);
  return total;
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
      return add(Number(num1), Number(num2));
    case "-":
      return subtract(Number(num1), Number(num2));
    case "*":
      return multiply(Number(num1), Number(num2));
    case "/":
      return divide(Number(num1), Number(num2));
    default:
      console.error("Invalid sign:", sign);
      return null;
  }
}

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
  console.log({ total }, { num1 }, { num2 }, { sign });
  operate(sign, num1, num2);
  isTotalNull = false;
}

// handler functions
function getButtonClicked(event) {
  switch (event.target.className) {
    case "digit":
      console.log("run function", event.target.className);
      if (isTotalNull && !isSignClicked && !isNum2Collected) {
        getFirstNum(event);
      }
      if (isSignClicked) {
        getSecondNum(event);
        isNum2Collected = true;
      }
      if (!isTotalNull) {
        num1 = total;
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
        num2 = 0;
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

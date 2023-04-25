// constants (QS)
const firstNum = document.querySelector("#first-num");
const mathSign = document.querySelector("#math-sign");
const secNum = document.querySelector("#sec-num");
const disTotal = document.querySelector("#total");
const buttons = document.querySelectorAll("button");

// vars
let total = 0,
  number1 = 0,
  sign = "",
  number2 = 0;

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

function operate(numOne, sign, numTwo) {
  switch (sign) {
    case "+":
      return add(numOne, numTwo);
    case "-":
      return subtract(numOne, numTwo);
    case "*":
      return multiply(numOne, numTwo);
    case "/":
      return divide(numOne, numTwo);
  }
}

// activity functions

// handler functions
function buttonClicked(event) {
  console.log(event.target);
}

// event listeners
buttons.forEach((button) => {
  button.addEventListener("click", buttonClicked);
});

let result = operate(1, "+", 2);
console.log(result);

result = operate(4, "-", 2);
console.log(result);

result = operate(2, "*", 2);
console.log(result);

result = operate(1, "/", 2);
console.log(result);

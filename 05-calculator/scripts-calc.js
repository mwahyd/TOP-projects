// constants
const SIGNS = ["+", "-", "*", "/"];

// variables
let firstNum, sign, secondNum;

// functions

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

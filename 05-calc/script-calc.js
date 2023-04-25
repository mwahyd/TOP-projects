// constants (QS)
const firstNum = document.querySelector("#first-num");
const mathSign = document.querySelector("#math-sign");
const secNum = document.querySelector("#sec-num");
const disTotal = document.querySelector("#total");
const buttons = document.querySelectorAll("button");
const addEqual = document.querySelector("#add-equal");

// vars
let total = 0,
  number1 = 0,
  number2 = 0,
  sign = "",
  isSignPressed = false,
  isNumber1 = false,
  isNumber2 = false;

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
function updateDigitsPressed(event) {
  if (total === 0) {
    if (!isSignPressed) {
      isNumber1 = true;
      number1 += event.target.textContent;
      firstNum.textContent = number1.slice(1);
    } else if (isSignPressed) {
      isNumber2 = true;
      number2 += event.target.textContent;
      secNum.textContent = number2.slice(1);
    }
  }
  console.log(number1);
  console.log(number2);
}

function updateSignPressed(event) {
  if (!isNumber1) {
    number1 = 0;
    firstNum.textContent = 0;
    console.log("number1 updated here");
  }
  isSignPressed = true;
  sign = event.target.textContent;
  mathSign.textContent = sign;
  console.log(sign);
}

function callOperate() {
  total = operate(Number(number1), sign, Number(number2));
  disTotal.textContent = total;
}

function evaluate() {
  if (isNumber1 && isSignPressed && isNumber2) {
    callOperate();
    console.log("IF state:", total);
  } else if (number1 === 0 && sign === "" && number2 === 0) {
    disTotal.textContent = 0;
    console.log("Show zero when equal clicked without numbers");
  } else if (isNumber1 && sign === "" && number2 === 0) {
    total = number1;
    disTotal.textContent = total.slice(1);
  } else if (!isNumber2) {
    number2 = 0;
    secNum.textContent = 0;
    console.log("number2 updated here");
    callOperate();
    console.log("Else IF !isNumber2:", total);
  } else if (!isNumber1) {
    callOperate();
    console.log("Else IF !isNumber1:", total);
  }
}

// handler functions
function buttonClicked(event) {
  //   console.log(event.target.className);
  switch (event.target.className) {
    case "digit":
      updateDigitsPressed(event);
      break;
    case "sign":
      updateSignPressed(event);
      break;
    case "operator":
      if (event.target.id === "equal") {
        addEqual.classList.remove("hidden");
        evaluate();
      }
  }
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

// constants (QS)
const firstNum = document.querySelector("#first-num");
const mathSign = document.querySelector("#math-sign");
const secNum = document.querySelector("#sec-num");
const disTotal = document.querySelector("#total");
const buttons = document.querySelectorAll("button");
const addEqual = document.querySelector("#add-equal");
const decimal = document.querySelector("#decimal");

// vars
let total = 0,
  number1 = 0,
  number2 = 0,
  sign = "",
  isSignPressed = false,
  isNumber1 = false,
  isNumber2 = false,
  isTotal = false,
  isError = false,
  isDelete = false;

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
  if (!isTotal) {
    if (!isSignPressed) {
      disableDecimalButton(event);
      isNumber1 = true;
      number1 += event.target.textContent;
      displayNumsBasedOnIsDelete(number1, firstNum);
      console.log("updateDigitsPressed", number1);
    } else if (isSignPressed) {
      updateNum2WhenSignPressed(event);
    }
  } else if (isTotal && isSignPressed) {
    updateNum2WhenSignPressed(event);
  }
}

function updateCalcWhenSignPressed(event) {
  if (!isNumber1 && !isTotal) {
    number1 = 0;
    firstNum.textContent = 0;
    console.log("number1 updated here");
  }

  updateSignPressed(event);

  // allow decimal to be clicked for num 2
  decimal.classList.remove("disable-button");

  // toggle isDelete when sign pressed
  isDelete = false;

  if (isTotal && isSignPressed) {
    console.log("num1 to total from updateCalcWhenSignPressed");
    resetNum2AndSecNum();
    updateNum1ToTotalWhenSignPressed();
  }
}

function updateNum1ToTotalWhenSignPressed() {
  isNumber1 = true;
  if (Number.isFinite(total) && !Number.isInteger(total)) {
    total = total.toFixed(2);
  }
  number1 = Number(total);
  const formattedTotal = number1.toLocaleString();
  firstNum.textContent = formattedTotal;
  console.log("number1 is now total");
}

function updateNum2WhenSignPressed(event) {
  disableDecimalButton(event);
  isNumber2 = true;
  number2 += event.target.textContent;
  displayNumsBasedOnIsDelete(number2, secNum);
}

function resetNum2AndSecNum() {
  number2 = 0;
  secNum.textContent = number2;
}

function updateSignPressed(event) {
  // evaluate expression if num1, sign and num2 and sign clicked again
  if (isNumber1 && isSignPressed && number2 !== 0) {
    callOperate();
  }
  isSignPressed = true;
  sign = event.target.textContent;
  mathSign.textContent = sign;
  console.log("sign pressed", sign);
}

function disableDecimalButton(event) {
  if (event.target.id === "decimal") {
    decimal.classList.add("disable-button");
  }
}

function callOperate() {
  total = operate(Number(number1), sign, Number(number2));
  isTotal = true;
  displayTotalOnCalc();
}

function displayTotalOnCalc() {
  if (Number.isFinite(total) && !Number.isInteger(total)) {
    total = total.toFixed(2);
    formatTotalAndDisplay(Number(total));
  } else {
    if (total >= 1000000000) {
      total = total.toExponential(3);
    }
    formatTotalAndDisplay(total);
  }
}

function formatTotalAndDisplay(result) {
  const formattedTotal = result.toLocaleString();
  disTotal.textContent = formattedTotal;
  if (formattedTotal === "NaN") {
    isError = true;
    disTotal.textContent = "ERROR";
    toggleButtonsStateWhenACPressed();
  }
}

function displayNumsBasedOnIsDelete(number, displayVar) {
  if (isDelete) {
    displayVar.textContent = number;
  } else {
    displayVar.textContent = number.slice(1);
  }
}

function toggleButtonsStateWhenACPressed() {
  buttons.forEach((button) => {
    if (button.id === "clear") {
      return;
    } else if (button.classList.contains("disable-all-buttons")) {
      button.classList.remove("disable-all-buttons");
    } else {
      button.classList.add("disable-all-buttons");
    }
  });
}

function deleteNumsWhenDelPressed() {
  isDelete = true;
  if (isNumber1 && !isTotal && !isSignPressed) {
    console.log("It is number1 not total value");
    const nums1 = Array.from(number1);
    console.log(nums1);
    nums1.pop();
    number1 = nums1.join("");
    firstNum.textContent = number1.slice();
    console.log(nums1);
  } else if (isNumber2) {
    console.log("it is number2");
    const nums2 = Array.from(number2);
    console.log(nums2);
    nums2.pop();
    number2 = nums2.join("");
    secNum.textContent = number2.slice();
    console.log(nums2);
  }
}

function resetNumsSignBool() {
  console.log("number1, sign, number2 bools reset");
  isSignPressed = false;
  isNumber1 = false;
  isNumber2 = false;
  number2 = 0;
  secNum.textContent = number2;
  console.log("number2 reset to zero here");
}

function resetAllVars() {
  total = 0;
  number1 = 0;
  number2 = 0;
  sign = "";
  isSignPressed = false;
  isNumber1 = false;
  isNumber2 = false;
  isTotal = false;
  isError = false;
  isDelete = false;
  addEqual.classList.add("hidden");
  mathSign.textContent = "";
  firstNum.textContent = "";
  secNum.textContent = "";
  disTotal.textContent = 0;
}

function evaluate() {
  if (!isSignPressed) {
    if (isNumber1) {
      disTotal.textContent = number1.slice(1);
    }
    return;
  } else if (isNumber1 && isSignPressed && isNumber2) {
    addEqual.classList.remove("hidden");
    callOperate();
  } else if (!isNumber2 && !isTotal) {
    resetNum2AndSecNum();
    callOperate();
  } else if (!isNumber1) {
    callOperate();
  }
}

// handler functions
function buttonClicked(event) {
  console.log(event.target);
  switch (event.target.className) {
    case "digit":
      updateDigitsPressed(event);
      break;
    case "sign":
      updateCalcWhenSignPressed(event);
      break;
    case "operator":
      if (event.target.id === "equal") {
        // addEqual.classList.remove("hidden");
        evaluate();
      } else if (event.target.id === "clear") {
        if (isError) {
          toggleButtonsStateWhenACPressed();
        }
        resetAllVars();
      } else if (event.target.id === "delete") {
        deleteNumsWhenDelPressed();
      }
  }
}

// event listeners
buttons.forEach((button) => {
  button.addEventListener("click", buttonClicked);
});

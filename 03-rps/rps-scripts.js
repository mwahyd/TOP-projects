// get randomised computer choice

const choices = { r: "Rock", p: "Paper", s: "Scissors" };

function getComputerChoice(array) {
  const mappedChars = ["r", "p", "s"];
  return array[mappedChars[Math.floor(Math.random() * mappedChars.length)]];
}

function getPlayerInput(choicesArray) {
  const choice = prompt("Rock (r), Paper (p), Scissors (s)? ");
  return validatePlayerInput(choice, choicesArray);
}

function validatePlayerInput(playerInput, array) {
  if (Object.keys(array).includes(playerInput)) {
    return array[playerInput];
  } else if (Object.values(array).includes(playerInput)) {
    return playerInput;
  } else {
    return "Please enter Rock (r), Paper (p) or Scissors (s)";
  }
}

let result = getComputerChoice(choices);
console.log(result);

result = getPlayerInput(choices);
console.log(result);

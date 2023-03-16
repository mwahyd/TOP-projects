// get randomised computer choice

const choices = { r: "rock", p: "paper", s: "scissors" };

function getComputerChoice(array) {
  const mappedChars = ["r", "p", "s"];
  return array[mappedChars[Math.floor(Math.random() * mappedChars.length)]];
}

function getPlayerInput(choicesArray) {
  const choice = prompt("Rock (r), Paper (p), Scissors (s)? ").toLowerCase();
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

function playRound(array) {
  const player = getPlayerInput(array);
  const computer = getComputerChoice(array);
  const outcome = determineOutcome(computer, player);
  return outcome;
}

function determineOutcome(compChoice, userChoice) {
  if (userChoice === "rock" && compChoice === "scissors") {
    return "You win! Rock beats Scissors";
  } else if (userChoice === "paper" && compChoice === "rock") {
    return "You win! Paper beats Rock";
  } else if (userChoice === "scissors" && compChoice === "paper") {
    return "You win! Scissors beats paper";
  } else if (userChoice === compChoice) {
    return `Its a tie! ${userChoice} vs ${compChoice}`;
  } else {
    return `You lose! ${compChoice} beats ${userChoice}`;
  }
}

function game(array) {
  for (let i = 1; i <= 5; i++) {
    let result = playRound(array);
    console.log(`Round ${i}: \n${result}`);
  }
}

// let result = getComputerChoice(choices);
// console.log(result);

// result = getPlayerInput(choices);
// console.log(result);

// let result = playRound(choices);
// console.log(result);

game(choices);

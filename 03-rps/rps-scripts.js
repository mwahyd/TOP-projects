let WINS = 0;
let LOSSES = 0;
let TIES = 0;

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
    WINS += 1;
    return "You win! Rock beats Scissors";
  } else if (userChoice === "paper" && compChoice === "rock") {
    WINS += 1;
    return "You win! Paper beats Rock";
  } else if (userChoice === "scissors" && compChoice === "paper") {
    WINS += 1;
    return "You win! Scissors beats paper";
  } else if (userChoice === compChoice) {
    TIES += 1;
    return `Its a tie! ${userChoice} vs ${compChoice}`;
  } else {
    LOSSES += 1;
    return `You lose! ${compChoice} beats ${userChoice}`;
  }
}

function scoreboard() {
  console.log(`WINS ${WINS} TIES ${TIES} LOSSES ${LOSSES}`);
}

function game(array) {
  scoreboard();
  for (let i = 1; i <= 5; i++) {
    let result = playRound(array);
    console.log(`Round ${i}: \n${result}`);
    scoreboard();
  }
}

// let result = getComputerChoice(choices);
// console.log(result);

// result = getPlayerInput(choices);
// console.log(result);

// let result = playRound(choices);
// console.log(result);

game(choices);

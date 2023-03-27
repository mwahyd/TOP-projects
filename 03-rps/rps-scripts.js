let WINS = 0;
let LOSSES = 0;
let TIES = 0;

const choices = { r: "rock", p: "paper", s: "scissors" };

function getComputerChoice(array) {
  const mappedChars = ["r", "p", "s"];
  return array[mappedChars[Math.floor(Math.random() * mappedChars.length)]];
}

// function getPlayerInput(choicesArray) {}

// function validatePlayerInput(playerInput, array) {
//   if (Object.keys(array).includes(playerInput)) {
//     return array[playerInput];
//   } else if (Object.values(array).includes(playerInput)) {
//     return playerInput;
//   } else {
//     return "Please enter Rock (r), Paper (p) or Scissors (s)";
//   }
// }

function playRound(event, array) {
  const player = event.target.id;
  const computer = getComputerChoice(array);
  const outcome = determineOutcome(computer, player);
  console.log(outcome);
  // return outcome;
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

function finalResult() {
  let result = "";
  if (WINS > LOSSES && WINS > TIES) {
    result = "Player Wins";
  } else if (LOSSES > WINS && LOSSES > TIES) {
    result = "Computer Wins";
  } else {
    result = "The game is a Tie!";
  }
  console.log(`\n${result}`);
  scoreboard();
  console.log("\n");
}

// function game(array) {
//   scoreboard();
//   for (let i = 1; i <= 5; i++) {
//     let result = playRound(array);
//     console.log(`Round ${i}: \n${result}`);
//     scoreboard();
//     console.log("\n");
//   }
//   finalResult();
// }

function game(array) {
  scoreboard();
  let result = playRound(array);
  console.log(`Round: \n${result}`);
  scoreboard();
  console.log("\n");
}

// game(choices);

// handler functions
function buttonClicked(event) {
  console.log(event.target.id);
  playRound(event, choices);
}

// query selectors
const buttons = document.querySelectorAll("button");
console.log(buttons);

// event listeners
buttons.forEach((button) => {
  button.addEventListener("click", buttonClicked);
});

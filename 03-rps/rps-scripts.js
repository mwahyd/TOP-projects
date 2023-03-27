// trackers
let WINS = 0;
let LOSSES = 0;
let TIES = 0;
let ROUND = 0;

// query selectors
const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");

// created elements
const outcomeP = document.createElement("p");
const roundP = document.createElement("p");
const scoreP = document.createElement("p");

// lists
const choices = { r: "rock", p: "paper", s: "scissors" };

// logic functions
function getComputerChoice(array) {
  const mappedChars = ["r", "p", "s"];
  return array[mappedChars[Math.floor(Math.random() * mappedChars.length)]];
}

function playRound(event, array) {
  const player = event.target.id;
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

// function game(event, array) {
//   scoreboard();
//   // for (let i = 1; i <= 5; i++) {
//   roundP.textContent = `Round ${1}`;
//   const outcome = playRound(event, array);
//   outcomeP.textContent = outcome;
//   console.log(`Round ${1}: \n${outcome}`);
//   scoreboard();
//   console.log("\n");
// }
// finalResult();
// // }

// game(choices);

// handler functions
function buttonClicked(event) {
  console.log(event.target.id);
  game(event, choices);
}

// event listeners
buttons.forEach((button) => {
  button.addEventListener("click", buttonClicked);
});

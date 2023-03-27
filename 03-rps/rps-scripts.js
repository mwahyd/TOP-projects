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
const finalP = document.createElement("p");

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

function createScoreboard() {
  console.log(`WINS ${WINS} TIES ${TIES} LOSSES ${LOSSES}`);
  return `WINS ${WINS} TIES ${TIES} LOSSES ${LOSSES}`;
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
  return `\n${result}`;
  // createScoreboard();
  // console.log("\n");
}

function addElements(parent, ...createdElements) {
  for (const element of createdElements) {
    parent.appendChild(element);
  }
}

function disableButtons() {
  buttons.forEach((button) => {
    button.disabled = true;
  });
}

function enableButtons() {
  buttons.forEach((button) => {
    button.disabled = false;
  });
}

function game(event, array) {
  roundP.textContent = `Round ${(ROUND += 1)}`;

  const outcome = playRound(event, array);
  outcomeP.textContent = outcome;

  const scoreboard = createScoreboard();
  scoreP.textContent = scoreboard;

  addElements(display, roundP, scoreP, outcomeP);

  if (ROUND === 5) {
    disableButtons();
    const result = finalResult();
    finalP.textContent = result;
    display.appendChild(finalP);
  }
}

// handler functions
function buttonClicked(event) {
  game(event, choices);
}

// event listeners
buttons.forEach((button) => {
  button.addEventListener("click", buttonClicked);
});

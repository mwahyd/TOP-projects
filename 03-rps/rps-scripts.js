// trackers
let WINS = 0;
let LOSSES = 0;
let TIES = 0;
let ROUND = 0;
let PLAYER = "";
let COMPUTER = "";

// query selectors
const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");
const intro = document.querySelector("#intro");
const winner = document.querySelector("#winner");
const spanP = document.querySelector("#player");
const spanC = document.querySelector("#comp");
const playerCompDiv = document.querySelector("#player-comp");

// created elements
const outcomeP = document.createElement("h4");
const roundP = document.createElement("h4");
const scoreP = document.createElement("h4");
const finalP = document.createElement("h3");

// lists
const choices = { r: "rock", p: "paper", s: "scissors" };

// logic functions
function getComputerChoice(array) {
  const mappedChars = ["r", "p", "s"];
  return array[mappedChars[Math.floor(Math.random() * mappedChars.length)]];
}

function playRound(event, array) {
  const player = event.target.name;
  const computer = getComputerChoice(array);
  PLAYER = player;
  COMPUTER = computer;
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
  return `WINS: ${WINS} TIES: ${TIES} LOSSES: ${LOSSES}`;
}

function finalResult() {
  let result = "";
  if (WINS > LOSSES || (WINS > LOSSES && WINS <= TIES)) {
    result = "PLAYER WINS";
  } else if (LOSSES > WINS || (LOSSES > WINS && LOSSES <= TIES)) {
    result = "COMPUTER WINS";
  } else {
    result = "GAME TIED!";
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

function displayChoice(player, computer) {
  spanP.textContent = player;
  spanC.textContent = computer;
}

function game(event, array) {
  roundP.textContent = `ROUND ${(ROUND += 1)}`;

  const outcome = playRound(event, array);
  outcomeP.textContent = outcome;
  outcomeP.classList.add("capitalise");

  const scoreboard = createScoreboard();
  scoreP.textContent = scoreboard;

  displayChoice(PLAYER, COMPUTER);

  addElements(display, roundP, scoreP, outcomeP);

  if (ROUND === 5) {
    disableButtons();
    const result = finalResult();
    finalP.textContent = result;
    winner.appendChild(finalP);
  }
}

// handler functions
function buttonClicked(event) {
  intro.style.display = "none";
  playerCompDiv.style.display = "flex";
  playerCompDiv.style.justifyContent = "space-evenly";

  game(event, choices);
}

// event listeners
buttons.forEach((button) => {
  button.addEventListener("click", buttonClicked);
});

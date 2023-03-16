// get randomised computer choice

const choices = { r: "Rock", p: "Paper", s: "Scissors" };

function getComputerChoice(array) {
  const mappedChars = ["r", "p", "s"];
  return array[mappedChars[Math.floor(Math.random() * mappedChars.length)]];
}

let result = getComputerChoice(choices);
console.log(result);

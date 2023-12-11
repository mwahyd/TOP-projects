/* 
Warmup: Fibonacci
The Fibonacci Sequence, which sums each number with the one before it.

> Assignment 1:
1. Using iteration, write a function "fibs" which takes a number and returns an array containing that many
   numbers from the Fibonacci sequence.

2. Now write another function "fibsRec" which solves the same problem recursively.
*/

function fibs(n) {
  const numbers = [0, 1];
  for (let i = 0; i < n - 2; i++) {
    const num1 = numbers[i];
    const num2 = numbers[i + 1];
    numbers.push(num1 + num2);
  }
  return numbers;
}

console.log(fibs(8)); //  [0, 1, 1, 2, 3, 5, 8, 13]

function fibsRec(n) {
  // base case
  if (n < 0) return [];
  else if (n === 1) return [0];
  else if (n === 2) return [0, 1];

  // recursive case - get the array (reduce & conquer)
  const fibList = fibsRec(n - 1);
  fibList.push(fibList.at(-1) + fibList.at(-2));
  return fibList;
}

console.log(fibsRec(8)); //  [0, 1, 1, 2, 3, 5, 8, 13]
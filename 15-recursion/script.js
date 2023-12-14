/* 
Warmup: Fibonacci
The Fibonacci Sequence, which sums each number with the one before it.

> Assignment 1: Fibonacci Sequence
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
  // return the array where the sequence will be appended to
  else if (n === 2) return [0, 1];

  // recursive case - get the array (reduce & conquer)
  const fibList = fibsRec(n - 1);
  // add the last two digits in each recursion and append
  fibList.push(fibList.at(-1) + fibList.at(-2));
  return fibList;
}

console.log(fibsRec(8)); //  [0, 1, 1, 2, 3, 5, 8, 13]

/* 
> Assignment 2: MergeSort
*/

function mergeSort(array) {
  // if length of array is 1 return array
  // if array is empty return empty array
  // base case - splitting the array into n sub arrays ?
  if (array.length <= 1) {
    return array;
  }

  // recursive case - find mid and call merge sort
  const mid = Math.floor((1 + array.length) / 2);
  const leftArray = array.slice(0, mid);
  const rightArray = array.slice(mid, array.length);
  const sortedLeft = mergeSort(leftArray);
  const sortedRight = mergeSort(rightArray);
  return merge(sortedLeft, sortedRight);
}

function merge(left, right) {
  const sortedArray = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      sortedArray.push(left[i]);
      i++;
    } else {
      sortedArray.push(right[j]);
      j++;
    }
  }
  sortedArray.push(...left.slice([i]));
  sortedArray.push(...right.slice([j]));

  return sortedArray;
}

console.log(mergeSort([9, 4, 3, 2, 1, 6]));

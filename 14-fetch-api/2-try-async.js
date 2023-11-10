// using async and await instead of chaining then()
// still needs error handlin with try..catch
const url = "https://jsonplaceholder.typicode.com/usersaaa";

export async function getData() {
  // fetch().then().then().catch() returns a promise then() also is a promise

  try {
    let response = await fetch(url);
    console.log(response);
    if (!response.ok) throw new Error("not a valid response");

    let dataObj = await response.json();
    console.log(dataObj);
  } catch (error) {
    console.warn(error.message);
  }
}

/* 
> What is async/await  (ES7 syntax)?
Async is a keyword prefixing a function which informs it that its asynchronous.
* Await is a keyword that tells the job to WAIT until the task is COMPLETE
It will not assign the result to the variable until after the response comes back

* When a function is declared with ASYNC it automatically RETURNS a promise.
... returning in an async function is the same as resolving a promise. 
... likewise, throwing an error will reject the promise.

? An important thing to understand is ASYNC functions are just syntactical sugar for PROMISES.
*/

// ! NOTE: this method provides ZERO error handling intrinsically

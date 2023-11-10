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

* When a function is declared with ASYNC it automatically RETURNS a promise.
... returning in an async function is the same as resolving a promise. 
... likewise, throwing an error will reject the promise.

? An important thing to understand is ASYNC functions are just syntactical sugar for PROMISES.
The async keyword can also be used with any of the ways a function can be created.
for examople: func declaration, arrow functions, function expressions


> What is AWAIT?
* Await is a keyword that tells the job to WAIT until the task is COMPLETE
It will not assign the result to the variable until after the response comes back

The await keyword is used to get a value from a function where you would normally use .then(). 
Instead of calling .then() after the asynchronous function, you would simply assign a variable to the 
result using await.

! NOTE: this method provides ZERO error handling intrinsically
*/

//
//

// > Examples of ASYNC functions

const yourAsyncFunction = async () => {
  // do something asynchronously and return a promise
  return result;
};

anArray.forEach(async (item) => {
  // do something asynchronously for each item in 'anArray'
  // *  one could also use .map here to return an array of promises to use with 'Promise.all()'
});

server.getPeople().then(async (people) => {
  people.forEach((person) => {
    // do something asynchronously for each person
  });
});

//
//

// > Error Handling
/* 
Since ASYNC functions return promises, we can add a .catch() method for handling rejected promises.
*We can simlpy call the function and appened a .catch() method to the end.

            asyncFunctionCall().catch(err => {
                console.error(err)
            });

* If you want to handle the error directly inside the async function, you can use the try/catch block

            async function getPersonsInfo(name) {
              try {
                const people = await server.getPeople();
                const person = people.find(person => { return person.name === name });
                return person;
            } catch (error) {
            Handle the error any way you'd like
  }
}

*/

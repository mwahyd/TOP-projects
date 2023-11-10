// the simplest fetch you can use and still have error handling
const url = "https://jsonplaceholder.typicode.com/users";

export function getData() {
  // the Fetch API will return a promise
  fetch(url)
    .then((response) => {
      //   console.log(response);
      // always HANDLE ERRORS
      // make sure that the status is between 200 - 299
      if (!response.ok) throw new Error("was not a valid response"); // status not in 200 range
      return response.json(); // method to extract JSON and convert to an Object
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.warn(error.message);
    });
}

/* 
> Why do we use then() ?
Fetch API returns a promise object. The response obtained by the Fetch API does not occur immediately.
Since the process is asynchronous. Therefore, it returns a promise. 
* The then(), waits for the response object to be returned by the Fetch() function.
*/

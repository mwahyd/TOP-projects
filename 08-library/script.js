const digiLibrary = [
  {
    title: "the book thief",
    author: "markus zusak",
    pages: 545,
    read: "not read",
  },
  {
    title: "the da vinci code",
    author: "dan brown",
    pages: 545,
    read: "read",
  },
  {
    title: "cloud atlas",
    author: "david mitchell",
    pages: 545,
    read: "not read",
  },
  {
    title: "digital fortress",
    author: "dan brown",
    pages: 545,
    read: "read",
  },
];

// book class
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// handler functions
function addBookToLibrary(obj) {
  // when add is clicked, add created book to digi library array
  let { title, author, pages, read } = obj;
  if (pages === "") pages = 0;
  read === true ? (read = "read") : (read = "not read");

  digiLibrary.push(new Book(title, author, pages, read));
  console.log(digiLibrary);
}

function getBooksOnDOM() {
  // later incooperate local storage and fetch data from local storage
  digiLibrary.forEach((book) => createBookCard(book));
}

function createBookCard(book) {
  const div = document.createElement("div");
  div.classList.add("card");

  div.innerHTML = `
  <p>${book.title}</p>
  <p>${book.author}</p>
  <p>${book.pages} pages</p>
  <p class="status">${book.read}</p>
  <span class="del">&#10006;</span>
  `;

  document.querySelector(".content").appendChild(div);
}

function onFormSubmitValidate(event) {
  event.preventDefault();

  // submit button
  event.target[5].disabled = true;

  if (event.target[1].value.trim().toLowerCase() === "") {
    alert("The 'Title' field is empty");
    event.target[1].value = "";
  } else if (event.target[2].value.trim().toLowerCase() === "") {
    alert("The 'Author' field is empty");
    event.target[2].value = "";
  }

  const fields = {
    title: event.target[1].value.trim().toLowerCase(),
    author: event.target[2].value.trim().toLowerCase(),
    pages: event.target[3].value,
    read: event.target[4].checked,
  };

  addBookToLibrary(fields);
  clearState(event.target);
}

// action functions
function clearState(array) {
  if (array) {
    Array.from(array).forEach((item) => {
      if (item.type === "checkbox") {
        item.checked = false;
      } else if (item.type === "submit") {
      } else {
        item.value = "";
      }
    });
  }
  document.querySelector(".modal").classList.add("hidden");
  document.querySelector(".blur").classList.add("hidden");
  document.querySelector("#add").disabled = false;

  // get books from storage
  getBooksOnDOM();
}

// event listeners
document.addEventListener("DOMContentLoaded", getBooksOnDOM);

document.querySelector(".add-btn").addEventListener("click", (event) => {
  document.querySelector(".modal").classList.remove("hidden");
  document.querySelector(".blur").classList.remove("hidden");
});

document.querySelector(".close-btn").addEventListener("click", (event) => {
  document.querySelector(".modal").classList.add("hidden");
  document.querySelector(".blur").classList.add("hidden");
});

document
  .querySelector(".modal")
  .addEventListener("submit", onFormSubmitValidate);

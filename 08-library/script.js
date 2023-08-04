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
function addBookToLibrary() {
  // when add is clicked, add created book to digi library array
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
  `;

  document.querySelector(".content").appendChild(div);
}

// action functions

// event listeners
document.addEventListener("DOMContentLoaded", getBooksOnDOM);

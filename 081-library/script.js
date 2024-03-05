// an array to store all the Book objects
// collect user input data from form
// create individual book objects and add to the list

const library = [
  { title: "mocking bird", author: "hf sinker", pages: 453, read: "no" },
];

// query selectors
const docx = document.querySelector("body");
const addBtn = docx.querySelector("#add-btn");
const submitBtn = docx.querySelector("#submit");
const closeBtn = docx.querySelector("#close");
const form = docx.querySelector("#form");
const layer = docx.querySelector("#layer");

// handler functions
function onAddBtnClick(event) {
  console.log(event.target);
  event.target.disabled = true;
  form.classList.remove("hidden");
  layer.classList.remove("hidden");
}

function submitForm(event) {
  event.preventDefault();
  const book = getUserInput();
  addBookToLibrary(book);
  resetForm();
  displayBooks();
}

// support functions
function getUserInput() {
  const title = docx.querySelector("#title");
  const author = docx.querySelector("#author");
  const pages = docx.querySelector("#pages");
  const read = docx.querySelector("#read");

  return new Book(title.value, author.value, pages.value, read.checked);
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  read === false ? (read = "no") : (read = "yes");
  this.read = read;
}

function addBookToLibrary(obj) {
  library.push(obj);
}

function resetForm() {
  addBtn.disabled = false;
  title.value = "";
  author.value = "";
  pages.value = "";
  read.checked = "";
  form.classList.add("hidden");
  layer.classList.add("hidden");
}

// create a card for each book
function displayBooks() {
  if (library.length === 0) return;

  const cardsContainer = docx.querySelector("#cards");
  cardsContainer.innerHTML = "";

  library.forEach((book) => {
    const card = createCard(book);
    cardsContainer.appendChild(card);
  });
}

function createCard(book) {
  const card = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const read = document.createElement("p");

  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = book.pages;
  read.textContent = book.read;

  card.append(title, author, pages, read);
  return card;
}

// event listeners
document.addEventListener("DOMContentLoaded", displayBooks);
addBtn.addEventListener("click", onAddBtnClick);
submitBtn.addEventListener("click", submitForm);
closeBtn.addEventListener("click", resetForm);

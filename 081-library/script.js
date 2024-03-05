// an array to store all the Book objects
// collect user input data from form
// create individual book objects and add to the list

const library = [];

// query selectors
const docx = document.querySelector("body");
const addBtn = docx.querySelector("#add-btn");
const form = docx.querySelector("#form");
const submitBtn = docx.querySelector("#submit");

// handler functions
function onAddBtnClick(event) {
  console.log(event.target);
  event.target.disabled = true;
  form.classList.remove("hidden");
}

function submitForm(event) {
  event.preventDefault();
  const book = getUserInput();
  addBookToLibrary(book);
  resetForm();
}

// support functions
function getUserInput() {
  const title = docx.querySelector("#title");
  const author = docx.querySelector("#author");
  const pages = docx.querySelector("#pages");
  const read = docx.querySelector("#read");

  return new Book(title.value, author.value, pages.value, read.checked);
}

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(obj) {
  library.push(obj);
  console.log(library);
}

function resetForm() {
  addBtn.disabled = false;
  title.value = "";
  author.value = "";
  pages.value = "";
  read.checked = "";
}

// event listeners
addBtn.addEventListener("click", onAddBtnClick);
submitBtn.addEventListener("click", submitForm);

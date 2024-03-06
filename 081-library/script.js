const library = [];

// query selectors
const docx = document.querySelector("body");
const addBtn = docx.querySelector("#add-btn");
const submitBtn = docx.querySelector("#submit");
const closeBtn = docx.querySelector("#close");
const form = docx.querySelector("#form");
const layer = docx.querySelector("#layer");
const cardsContainer = docx.querySelector("#cards");

// handler functions
function onAddBtnClick(event) {
  event.target.disabled = true;
  form.classList.remove("hidden");
  layer.classList.remove("hidden");
}

function submitForm(event) {
  event.preventDefault();
  const response = validateFields(event);
  if (!response) return;

  const book = getUserInput();
  addBookToLibrary(book);
  resetForm();
  displayBooks();
}

function onCardClicked(event) {
  if (event.target.nodeName === "BUTTON") {
    const cardIndex = event.target.parentNode.getAttribute("data-index");
    removeCard(cardIndex);
    displayBooks();
  } else if (event.target.className === "isRead") {
    updateReadStatus(event);
  } else return;
}

// support functions
function validateFields(event) {
  if (event.target[1].value.trim().toLowerCase() === "") {
    alert("The 'Title' field is empty");
    event.target[1].value = "";
    return false;
  } else if (event.target[2].value.trim().toLowerCase() === "") {
    alert("The 'Author' field is empty");
    event.target[2].value = "";
    return false;
  }
  return true;
}

function getUserInput() {
  const title = docx.querySelector("#title");
  const author = docx.querySelector("#author");
  const pages = docx.querySelector("#pages");
  const read = docx.querySelector("#read");

  return new Book(
    title.value.trim().toLowerCase(),
    author.value.trim().toLowerCase(),
    pages.value,
    read.checked
  );
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  if (pages === "") pages = 0;
  this.pages = pages;
  read === false ? (read = "no") : (read = "yes");
  this.read = read;
}

function addBookToLibrary(obj) {
  library.push(obj);
}

function resetForm(event = null) {
  if (event) event.preventDefault();
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
  const cardsContainer = docx.querySelector("#cards");
  cardsContainer.innerHTML = "";

  library.forEach((book, index) => {
    const card = createCard(book);
    card.setAttribute("data-index", index);
    cardsContainer.appendChild(card);
  });
}

function createCard(book) {
  const card = document.createElement("div");
  const title = document.createElement("div");
  const author = document.createElement("div");
  const pages = document.createElement("div");
  const read = document.createElement("div");
  const remove = document.createElement("button");

  title.innerHTML = `<p>Title</p> <span>${book.title}</span>`;
  author.innerHTML = `<p>Author</p> <span>${book.author}</span>`;
  pages.innerHTML = `<p>Pages</p> <span>${book.pages}</span>`;
  read.innerHTML = `<p>Read</p> <span class="isRead">${book.read}</span>`;
  remove.textContent = "x";
  remove.classList.add("close-btn", "remove");

  card.classList.add("card");
  card.append(title, author, pages, read, remove);
  return card;
}

function removeCard(index) {
  library.splice(index, 1);
}

function updateReadStatus(event) {
  let value = event.target.textContent;
  const cardIndex =
    event.target.parentNode.parentNode.getAttribute("data-index");
  value === "no" ? (value = "yes") : (value = "no");
  library[cardIndex].read = value;
  displayBooks();
}

// event listeners
document.addEventListener("DOMContentLoaded", displayBooks);
addBtn.addEventListener("click", onAddBtnClick);
form.addEventListener("submit", submitForm);
closeBtn.addEventListener("click", resetForm);
cardsContainer.addEventListener("click", onCardClicked);

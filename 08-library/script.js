let digiLibrary = [];

// book class
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index;
  }

  toggleStatus(status) {
    this.read = status;
  }

  addIndex(index) {
    this.index = index;
  }
}

// handler functions
function addBookToLibrary(obj) {
  // when add is clicked, add created book to digi library array
  let { title, author, pages, read } = obj;
  if (pages === "") pages = 0;
  read === true ? (read = "read") : (read = "not read");

  digiLibrary.push(new Book(title, author, pages, read));
  digiLibrary.at(-1).addIndex(digiLibrary.length);
}

function getBooksOnDOM() {
  // later incooperate local storage and fetch data from local storage
  // digiLibrary.forEach((book) => createBookCard(book));
  createBookCard(digiLibrary.at(-1));
  console.log(digiLibrary);
}

function createBookCard(book) {
  const div = document.createElement("div");
  div.classList.add("card");
  div.setAttribute("data-index", book.index);
  let status;
  book.read === "read" ? (status = "read") : (status = "not-read");

  div.innerHTML = `
  <p><strong>${book.title}</strong></p>
  <p>${book.author}</p>
  <p>${book.pages} pages</p>
  <p class="status ${status}">${book.read}</p>
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

function removeCard(event) {
  if (event.target.nodeName !== "SPAN") {
    return;
  }
  if (confirm("Do you want to remove this item?")) {
    console.log(event.target);
    console.log(event.target.parentElement);
    event.target.parentElement.remove();
  }
}

function toggleReadStatus(event) {
  if (!event.target.classList.contains("status")) {
    return;
  }

  if (event.target.classList.contains("read")) {
    // update status on prototype of item
    const index = event.target.parentElement.getAttribute("data-index");
    digiLibrary[index - 1].toggleStatus("not read");

    event.target.textContent = "not read";
    event.target.classList.add("not-read");
    event.target.classList.remove("read");
  } else if (event.target.classList.contains("not-read")) {
    // update status on prototype of item
    const index = event.target.parentElement.getAttribute("data-index");
    digiLibrary[index - 1].toggleStatus("read");

    event.target.textContent = "read";
    event.target.classList.add("read");
    event.target.classList.remove("not-read");
  }
}

// event listeners
const init = () => {
  // document.addEventListener("DOMContentLoaded", getBooksOnDOM);

  // plus sign
  document.querySelector(".add-btn").addEventListener("click", (event) => {
    document.querySelector(".modal").classList.remove("hidden");
    document.querySelector(".blur").classList.remove("hidden");
  });

  // display modal
  document.querySelector(".close-btn").addEventListener("click", (event) => {
    document.querySelector(".modal").classList.add("hidden");
    document.querySelector(".blur").classList.add("hidden");
  });

  // modal form
  document
    .querySelector(".modal")
    .addEventListener("submit", onFormSubmitValidate);

  // card
  document.querySelector(".content").addEventListener("click", removeCard);

  // toggle read to not-read vice versa
  document
    .querySelector(".content")
    .addEventListener("click", toggleReadStatus);
};

init();

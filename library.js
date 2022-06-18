let myLibrary = [];
const displayBooks = document.querySelector(".books");
const overlay = document.querySelector(".overlay");
const author = document.querySelector("#author");
const title = document.querySelector("#title");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");
overlay.style.display = "none";
let counter = 0;
class Book {
  constructor(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }
}
function addBookToLibrary(book) {
  myLibrary.push(book);
  addBookToDisplay(book);
}
function addBookToDisplay(book) {
  // create elements
  let author = createDiv();
  let title = createDiv();
  let pages = createDiv();
  let read = document.createElement("button");
  let newDiv = createDiv();
  let remove = document.createElement("button");
  title.textContent += `Title: ${book.title} `;
  author.textContent += `Author: ${book.author} `;
  pages.textContent += `Pages: ${book.pages} `;
  read.textContent = book.read ? "Read" : "Not Read";
  read.style.background = book.read ? "#4ade80" : "#f87171";

  remove.textContent = "Remove";

  read.classList.add(`read${counter}`);
  newDiv.classList.add(`newDiv${counter}`, "bookDivs");
  remove.classList.add(`remove${counter}`);
  read.setAttribute("id", "readButton");
  remove.setAttribute("id", "remove");

  // append stuff
  newDiv.appendChild(author);
  newDiv.appendChild(title);
  newDiv.appendChild(pages);
  newDiv.appendChild(read);
  newDiv.appendChild(remove);
  displayBooks.appendChild(newDiv);
  counter++;
}
function displayOnLoad() {
  for (let book of myLibrary) {
    addBookToDisplay(book);
  }
}
displayOnLoad();
document.addEventListener("click", (e) => {
  if (e.target.id === "remove") {
    // Find which div to remove...
    document.querySelector(`.newDiv${e.target.className.slice(-1)}`).remove();
    // Remove from library
    myLibrary.splice(e.target.className.slice(-1), 1);
    counter--;
    // Reorder index names.
    let divs = document.querySelectorAll(".bookDivs");
    for (let i = 0; i < divs.length; i++) {
      divs[i].classList = `newDiv${i} bookDivs`;
      divs[i].querySelector("#readButton").classList = `read${i}`;
      divs[i].querySelector("#remove").classList = `remove${i}`;
    }
  }
  if (e.target.id === "readButton") {
    let readText = document.querySelector(`.${e.target.className}`);

    let bool = readText.textContent === "Read" ? false : true;
    if (bool) {
      myLibrary[e.target.className.slice(-1)].read = true;
      readText.textContent = "Read";
      readText.style.background = "#4ade80";
    } else {
      myLibrary[e.target.className.slice(-1)].read = false;
      readText.textContent = "Not Read";
      readText.style.background = "#f87171";
    }
  }
});
function OverlayOpen() {
  overlay.style.display = "flex";
  overlay.style.content = " ";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.background = "rgba(0, 0, 0, 0.5)";
  author.value = "";
  title.value = "";
  pages.value = "";
  read.checked = false;
}
function closeOverlay() {
  overlay.style.display = "none";
}
function submitBook() {
  if (!author.value || !title.value || !pages.value) return;
  closeOverlay();
  newBook = new Book(author.value, title.value, pages.value, read.checked);
  addBookToLibrary(newBook);
}
function createDiv() {
  return document.createElement("div");
}

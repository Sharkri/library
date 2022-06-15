let myLibrary = [];
const newBook = document.querySelector(".newBook");
const displayBooks = document.querySelector(".books");
const overlay = document.querySelector(".overlay");
const author = document.querySelector("#author");
const title = document.querySelector("#title");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");
overlay.style.display = "none";
function Book() {
  // the constructor...
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  libraryDisplay();
}

function libraryDisplay() {
  for (let book of myLibrary) {
    console.log(book);
    let author = document.createElement("div");
    author.textContent += `Author: ${book.author} `;
    let title = document.createElement("div");
    title.textContent += `Title: ${book.title} `;
    let pages = document.createElement("div");
    pages.textContent += `Pages: ${book.pages} `;
    let read = document.createElement("button");
    read.textContent = book.read ? "Read" : "Not Read";
    displayBooks.appendChild(author, title, pages, read);
  }
}
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
  addBookToLibrary({
    author: author.value,
    title: title.value,
    pages: pages.value,
    read: read.checked,
  });
}
libraryDisplay();

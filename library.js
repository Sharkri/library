let myLibrary = [];
const displayBooks = document.querySelector(".books");
const overlay = document.querySelector(".overlay");
const author = document.querySelector("#author");
const title = document.querySelector("#title");
const pages = document.querySelector("#pages");
const readInput = document.querySelector("#read");
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

  remove.textContent = "Remove";
  read.classList.add(`read${counter}`);
  if (read.textContent == "Read") read.classList.remove("not-read");
  else read.classList.add("not-read");

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
const createDiv = () => document.createElement("div");

document.addEventListener("click", (e) => {
  if (e.target.id === "remove") {
    const bookNum = e.target.className.slice(-1);
    // Find which div to remove...
    document.querySelector(`.newDiv${bookNum}`).remove();
    // Remove from library
    myLibrary.splice(bookNum, 1);
    counter--;
    // Reorder index names.
    let divs = document.querySelectorAll(".bookDivs");
    for (let i = 0; i < divs.length; i++) {
      divs[i].classList = `newDiv${i} bookDivs`;
      // Replace read class index with actual index
      const readClasses = divs[i].querySelector("#readButton").classList;
      readClasses.replace(readClasses[0], `read${i}`);

      divs[i].querySelector("#remove").classList = `remove${i}`;
    }
  }
  if (e.target.id === "readButton") {
    // Select the first class
    const readBtn = document.querySelector(`.${e.target.classList[0]}`);
    readBtn.classList.toggle("not-read");

    const isRead = !readBtn.className.includes("not-read");
    const readNum = readBtn.classList[0].slice(-1);

    myLibrary[readNum].read = isRead;
    readBtn.textContent = isRead ? "Read" : "Not Read";
  }
});
function openOverlay() {
  overlay.classList.toggle("active");
  author.value = "";
  title.value = "";
  pages.value = "";
  readInput.checked = false;
}
const closeOverlay = () => overlay.classList.toggle("active");
function submitBook() {
  if (!author.value || !title.value || pages.value <= 0) return;
  closeOverlay();
  newBook = new Book(author.value, title.value, pages.value, readInput.checked);
  addBookToLibrary(newBook);
}

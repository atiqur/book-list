// Book constructor
function Book(title, author, isbn) {
  this.title = title
  this.author = author
  this.isbn = isbn
}

// UI constructor
function UI() {}

// Add book
UI.prototype.addBook = function (book) {
  const bookList = document.getElementById("book-list")
  const row = document.createElement("tr")
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `
  bookList.appendChild(row)
}

UI.prototype.clearForm = function () {
  document.getElementById("title").value = ""
  document.getElementById("author").value = ""
  document.getElementById("isbn").value = ""
}

// Event listener
document.getElementById("book-form").addEventListener("submit", function (e) {
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value

  const book = new Book(title, author, isbn)

  const ui = new UI()
  ui.addBook(book)
  ui.clearForm()

  e.preventDefault()
})

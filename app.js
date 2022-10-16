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

UI.prototype.showAlert = function (message, alertType) {
  // Create div
  const div = document.createElement("div")
  // Add classes
  div.className = `alert ${alertType}`
  // Add message
  div.appendChild(document.createTextNode(message))
  // Find parent container
  const container = document.querySelector(".container")
  const form = document.getElementById("book-form")
  // Add before form
  container.insertBefore(div, form)
  // Set time out to 3 sec
  setTimeout(() => {
    document.querySelector(".alert").remove()
  }, 3000)
}

// Event listener
document.getElementById("book-form").addEventListener("submit", function (e) {
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value

  const book = new Book(title, author, isbn)

  const ui = new UI()

  if (title == "" || author == "" || isbn == "") {
    ui.showAlert(`Please fill up all the fields`, "error")
  } else {
    ui.addBook(book)
    ui.clearForm()
    ui.showAlert("Book added!!", "success")
  }

  e.preventDefault()
})

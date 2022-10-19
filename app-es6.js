class Book {
  constructor(title, author, isbn) {
    this.title = title
    this.author = author
    this.isbn = isbn
  }
}

class UI {
  addBookToList(book) {
    const bookList = document.getElementById("book-list-row")
    const row = document.createElement("tr")
    row.className = "row"
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td class="delete-cell"><a href="#" class="delete">X</a></td>
  `
    bookList.appendChild(row)
  }

  deleteBookFromList(target) {
    if (target.className == "delete") {
      target.parentElement.parentElement.remove()
    }
  }

  clearForm() {
    document.getElementById("title").value = ""
    document.getElementById("author").value = ""
    document.getElementById("isbn").value = ""
  }

  showAlert(message, alertType) {
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
}

// Local storage class
class Store {
  static getBooks() {
    let books
    if (localStorage.getItem("books") === null) {
      books = []
    } else {
      books = JSON.parse(localStorage.getItem("books"))
    }
    return books
  }

  static displayBooks() {
    const books = Store.getBooks()
    books.forEach(function (book) {
      const ui = new UI()
      ui.addBookToList(book)
    })
  }

  static addBook(book) {
    const books = Store.getBooks()
    books.push(book)
    localStorage.setItem("books", JSON.stringify(books))
  }

  static deleteBook(isbn) {
    const books = Store.getBooks()

    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1)
      }
    })

    localStorage.setItem("books", JSON.stringify(books))
  }
}

// DOM load event
document.addEventListener("DOMContentLoaded", Store.displayBooks)

// Event listeners
document.getElementById("book-form").addEventListener("submit", function (e) {
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value

  const book = new Book(title, author, isbn)

  const ui = new UI()

  if (title == "" || author == "" || isbn == "") {
    ui.showAlert(`Please fill up all the fields`, "error")
  } else {
    ui.addBookToList(book)
    ui.clearForm()
    Store.addBook(book)
    ui.showAlert("Book added!!", "success")
  }

  e.preventDefault()
})

document.getElementById("book-list").addEventListener("click", function (e) {
  const ui = new UI()
  ui.deleteBookFromList(e.target)
  Store.deleteBook(e.target.parentElement.previousElementSibling.textContent)
  ui.showAlert("Book deleted", "success")

  e.preventDefault()
})

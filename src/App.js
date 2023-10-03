import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import BookCreateForm from "./components/BookCreateForm";
import BookUpdateForm from "./components/BookUpdateForm";

export default function App() {
  const [books, setBooks] = useState([]); //store all posts in server in js array som här är tom
  const [showingCreateNewBookForm, setShowingCreateNewBookForm] = useState(false);
  const [bookCurrentlyBeingUpdated, setBookCurrentlyBeingUpdated] = useState(null);

  function getBooks() {
    const apiUrl = "https://localhost:7175/api/books"; //webapi-url som ska kopplas

    fetch(apiUrl, {
      method: "GET", //http get request till server
    })
      .then((response) => response.json())
      .then((booksFromServer) => {
        console.log(booksFromServer);
        setBooks(booksFromServer.result);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  function deleteBook(bookId) {
    const delURL = `https://localhost:7175/api/book/${bookId}`;

    fetch(delURL, {
      method: "DELETE", //http delete request till server
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
        onBookDeleted(bookId);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }


  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          {showingCreateNewBookForm === false && bookCurrentlyBeingUpdated === null && (
            <div>
              <h1 className="App-logo1">Welcome</h1>
              <p>to the React<img src={logo} className="App-logo" alt="logo" />Minimal Api UI!</p>
              <h1>Library of Alexandria</h1>
              <div className="mt-5">
                <button onClick={getBooks} className="btn btn-dark btn-sm w-100">
                  Show books
                </button>
                <button
                  onClick={() => setShowingCreateNewBookForm(true)}
                  className="btn btn-dark btn-sm w-100 mt-2"
                >Add new book</button>
                {/* onclick anonym function sätter books till en tom array */}
                <button onClick={() => setBooks([])} className="btn btn-dark btn-sm w-100 mt-2">Hide books</button>
                <p className="App-logo">books == cool</p>
              </div>
            </div>
          )}

          {books.length > 0 &&
            showingCreateNewBookForm === false &&
            bookCurrentlyBeingUpdated === null &&
            renderBooksTable()}

          {showingCreateNewBookForm && <BookCreateForm onBookCreated={onBookCreated} />}
          {bookCurrentlyBeingUpdated !== null && (
            <BookUpdateForm
              book={bookCurrentlyBeingUpdated}
              onBookUpdated={onBookUpdated} />)}
        </div>
      </div>
    </div>
  );

  function renderBooksTable() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Genre</th>
              <th scope="col">Description</th>
              <th scope="col">Available</th>
              <th scope="col">Year</th>
              <th scope="col"> Options</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <th scope="row">{book.id}</th>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.description}</td>
                <td>{book.availableToBorrow.toString()}</td>
                <td>{book.yearOfPublication}</td>
                <td>
                  <button onClick={() => setBookCurrentlyBeingUpdated(book)}
                    className="btn btn-dark btn-sm my-1">Update</button>
                  <button onClick={() => { if (window.confirm(`Are you sure? Delete "${book.title}"?`)) deleteBook(book.id) }}
                    className="btn btn-secondary btn-sm my-1"> Delete </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function onBookCreated(createdBook) {
    setShowingCreateNewBookForm(false);
    if (createdBook === null) {
      alert(`Creating book failed! Erroneous error.`);
      return;
    }
    alert(
      `Book successfully created. After clicking OK your new book titled "${createdBook.title}" will show up in the table below.`
    );
    getBooks();
  }

  function onBookUpdated(updatedBook) {
    setBookCurrentlyBeingUpdated(null);

    if (updatedBook === null) {
      return;
    }
    let booksCopy = [...books]; //bookscopy array
    //find index of book updated
    const index = booksCopy.findIndex((booksCopyBook, currentIndex) => {
      if (booksCopyBook.id === updatedBook.id) {
        return true;
      }
    });

    if (index !== -1) {
      booksCopy[index] = updatedBook;
    }
    setBooks(booksCopy);
    alert(`Succeded in updating book!`);
  }

  function onBookDeleted(deletedBook) {
    let booksCopy = [...books];
    const index = booksCopy.findIndex((booksCopyBook, currentIndex) => {
      if (booksCopyBook.id === deletedBook.id) {
        return true;
      }
    });

    if (index !== -1) {
      booksCopy.splice(index, 1);
    }
    setBooks(booksCopy);
    alert(`Succeded in deleting book!`);
  }
}



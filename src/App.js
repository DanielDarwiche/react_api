import "./App.css";
import React, { useState } from "react";
import BookCreateForm from "./components/BookCreateForm";
import BookUpdateForm from "./components/BookUpdateForm";
import SearchBar from "./components/SearchBar";
import TitleSearchBar from "./components/TitleSearchBar";
import IDSearchBar from "./components/IDSearchBar";
import { SearchResultsList } from "./components/SearchResultsList";
import { TitleSearchResultsList } from "./components/TitleSearchResultsList";
import { IDSearchResultsList } from "./components/IDSearchResultsList";

export default function App() {
  const [books, setBooks] = useState([]); //store all books in server in js array som här är tom
  const [showingCreateNewBookForm, setShowingCreateNewBookForm] = useState(false);
  const [bookCurrentlyBeingUpdated, setBookCurrentlyBeingUpdated] = useState(null);
  const [results, setResults] = useState([]);
  const [titleResults, titleSetResults] = useState([]);
  const [IDResults, IDSetResults] = useState([]);

  async function getBooks() {
    const apiUrl = "https://localhost:7175/api/books"; //webapi-url som ska kopplas

    await fetch(apiUrl, {
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

  async function deleteBook(bookId) {
    const delURL = `https://localhost:7175/api/book/${bookId}`;

    await fetch(delURL, {
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
              <h2>Welcome to the wonderful</h2>
              <h1><i class="bi bi-book"></i>&nbsp;Library of Alexandria&nbsp;<i class="bi bi-book"></i></h1>
              <div className="mt-2">
                <button onClick={getBooks} className="btn btn-success btn-md w-100">Show books&emsp;<i class="bi bi-arrows-angle-expand"></i></button>
                <button
                  onClick={() => setShowingCreateNewBookForm(true)}
                  className="btn btn-primary btn-md w-100 mt-2"
                >Add new book&nbsp;<i class="bi bi-bookmark-plus"></i></button>
                <button onClick={() => setBooks([])} className="btn btn-danger btn-md w-100 mt-2">Hide books&emsp;<i class="bi bi-arrows-angle-contract"></i></button>

                {/* SearchBar responsible for modifying array, pass it as prop! below */}
                <div className="search-bar-container">
                  <SearchBar setResults={setResults} />
                  <SearchResultsList results={results} />
                  {/* component of results, with variable as propr */}
                </div>


                <div className="search-bar-container">
                  <TitleSearchBar titleSetResults={titleSetResults} />
                  <TitleSearchResultsList titleResults={titleResults} />
                </div>

                <div className="search-bar-container">
                  <IDSearchBar IDSetResults={IDSetResults} />
                  <IDSearchResultsList IDResults={IDResults} />
                </div>

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
      <div className="table-responsive mt-1">
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
                <td>
                  <input
                    className="checkboxDesignIndexPage"
                    type="checkbox"
                    checked={book.availableToBorrow}
                    readOnly
                  />
                </td>
                <td>{book.yearOfPublication}</td>
                <td>
                  <button onClick={() => setBookCurrentlyBeingUpdated(book)}
                    className="btn btn-warning btn-sm my-1 " >Update<i class="bi bi-balloon"></i></button>
                  <button onClick={() => { if (window.confirm(`Are you sure? Delete "${book.title}"? `)) deleteBook(book.id) }}
                    className="btn btn-danger btn-sm my-1  "> Delete<i class="bi bi-clipboard2-x"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table >
      </div >
    );
  }

  function onBookCreated(createdBook) {
    setShowingCreateNewBookForm(false);
    if (createdBook === null) {
      alert(`No book was created.`);
      return;
    }
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
    getBooks();
    alert(`Succeded in deleting book!`);
  }
}



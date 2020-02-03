import React from 'react'
import { Route, Link } from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './components/BookShelf'
import SearchPage from './components/SearchPage'

class BooksApp extends React.Component {
  state = {
    books: []
  };
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books
      }));
    });
  }
  handleShelfChange = (book, newShelf) => {
    BooksAPI.update(book, newShelf);
    const updatedBooks = this.state.books.map(oldBook => {
      if (oldBook.id === book.id) {
        return { ...oldBook, shelf: newShelf };
      }
      return oldBook;
    });
    this.setState({ books: updatedBooks });
  };
  render() {
    return (
      <div className="app">
        <Route 
          path="/search" 
          render={({ history }) => 
          <SearchPage booksOnShelf={this.state.books} handleShelfChange={this.handleShelfChange}
          />}           
        />
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf
                    shelf={"currentlyReading"}
                    books={this.state.books}
                    handleShelfChange={this.handleShelfChange}
                  />
                  <BookShelf
                    shelf={"wantToRead"}
                    books={this.state.books}
                    handleShelfChange={this.handleShelfChange}
                  />
                  <BookShelf
                    shelf={"read"}
                    books={this.state.books}
                    handleShelfChange={this.handleShelfChange}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp

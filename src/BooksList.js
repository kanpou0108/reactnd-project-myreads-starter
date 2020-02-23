import React from 'react'
import { Link } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import Book from './Book'

class BooksList extends React.Component {
  state = {
    books: []
  };

  getAllBooks() {
    BooksAPI
    .getAll()
    .then((data) => {
      this.setState({
        books: data
      })
    })
  }

  componentDidMount() {
    this.getAllBooks()
  }

  moveToShelf = (bookId, shelf) => {
    BooksAPI
    .get(bookId)
    .then((book) => {
      if (book.shelf !== shelf) {
        BooksAPI.update(book, shelf).then(() => {
          book.shelf = shelf
          this.setState(state => ({
            books: state.books.filter(b => b.id !== book.id).concat([book])
          }))
        })
      }
    })
  }

  render() {
    const books = this.state.books
    const currentlyReadingBooks = books.filter(book => book.shelf === 'currentlyReading')
    const wantToReadBooks = books.filter(book => book.shelf === 'wantToRead')
    const readBooks = books.filter(book => book.shelf === 'read')

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentlyReadingBooks.map(book => <li key={book.id}>
                    <Book book={book}
                      onMoveToShelf={this.moveToShelf} />
                  </li>)}
                </ol>
              </div>
            </div>

            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToReadBooks.map(book => <li key={book.id}>
                    <Book book={book}
                      onMoveToShelf={this.moveToShelf} />
                  </li>)}
                </ol>
              </div>
            </div>

            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {readBooks.map(book => <li key={book.id}>
                    <Book book={book}
                      onMoveToShelf={this.moveToShelf} />
                  </li>)}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BooksList;

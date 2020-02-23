import React from 'react'
import { Link } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import Book from './Book'

class BooksSearch extends React.Component {
  state = {
    query: '',
    allBooks: [],
    error: '',
  }

  moveToShelf = (bookId, shelf) => {
    BooksAPI.get(bookId).then((book) =>
      BooksAPI.update(book, shelf).then((books) => {
        this.getBooks()
      })
    )
  }

  getBooks = () => {
    let query = this.state.query
    if (query.length > 0) {
      BooksAPI.getAll().then((data) => {
        let displayedBooksIds = data.map(b => b.id)

        BooksAPI.search(query, 20).then(response => {
          if (response.error) {
            this.setState({allBooks: [], error: response.error})
          } else {
            response.forEach(book => {
              displayedBooksIds.includes(book.id) ?
              book.shelf = data.filter(b => b.id === book.id)[0].shelf :
              book.shelf = "none"
            })
            this.setState({
              allBooks: response,
              error: ''
            });
          }
        })
      })
    }
  }

  searchInputChange = (e) => {
    let query = e.target.value
    this.setState({ query: query.trim() })
    this.getBooks()
  }

  render() {
    return <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text"
            placeholder="Search by title or author"
            onChange={this.searchInputChange} />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {this.state.allBooks.length > 0 ?
            this.state.allBooks.map((book) => <li key={book.id}>
              <Book
                book={book}
                onMoveToShelf={this.moveToShelf}
              />
            </li>
            )
          : this.state.error.length > 0 && ( <h1> No results</h1>)
          }
        </ol>
      </div>
    </div>
  }
}

export default BooksSearch;

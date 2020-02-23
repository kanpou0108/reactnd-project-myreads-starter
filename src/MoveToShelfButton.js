import React from 'react'

const MoveToShelfButton = ({ onSelectShelf, currentShelf }) => {
  const moveBook = function (e) {
    onSelectShelf(e.target.options[e.target.selectedIndex].value)
  }

  return <div className="book-shelf-changer">
    <select onChange={moveBook} value={currentShelf}>
      <option value="unused" disabled>Move to...</option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
    </select>
  </div>
}

export default MoveToShelfButton;

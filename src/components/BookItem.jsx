// src/components/BookItem.jsx

import React from 'react';

// We receive the 'book' object as a prop from the parent component (BookList)
function BookItem({ book }) {
  return (
    <div className="book-item">
      <h3>{book.title}</h3>
      <p>by {book.author}</p>
    </div>
  );
}

export default BookItem;

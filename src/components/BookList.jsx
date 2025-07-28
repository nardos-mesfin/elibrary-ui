// src/components/BookList.jsx

import React from 'react';
import BookItem from './BookItem'; // Import the smaller component

// We receive the 'books' array and the 'loading' state as props
function BookList({ books, loading }) {
  if (loading) {
    return <p>Loading books...</p>;
  }

  if (books.length === 0) {
    return <p>No books found.</p>;
  }

  return (
    <div className="book-list">
      {/* We map over the books array and render a BookItem for each one */}
      {books.map(book => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BookList;
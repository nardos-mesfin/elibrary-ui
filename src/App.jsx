// src/App.jsx

import { useState, useEffect } from 'react';
import BookList from './components/BookList'; // Import our new BookList component
import './App.css';

function App() {
  // State management remains here, as App is the "owner" of the data.
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/books')
      .then(response => response.json())
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the books:', error);
        setLoading(false);
      });
  }, []);

  // The rendering logic is now much cleaner.
  return (
    <>
      <h1>E-Library Book Collection</h1>
      <div className="card">
        <h2>Available Books</h2>
        {/* We render the BookList component and pass the data down as props */}
        <BookList loading={loading} books={books} />
      </div>
    </>
  );
}

export default App;
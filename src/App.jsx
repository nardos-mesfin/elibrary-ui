import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // Create a state variable to hold our array of books.
  // The initial value is an empty array [].
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // A state to know when data is being fetched

  // This useEffect hook runs our code once when the component loads
  useEffect(() => {
    // Fetch data from our NEW /api/books endpoint
    fetch('http://127.0.0.1:8000/api/books')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setBooks(data); // Store the array of books from the API in our state
        setLoading(false); // Set loading to false because we have the data
      })
      .catch(error => {
        console.error('There was an error fetching the books:', error);
        setLoading(false); // Also stop loading if there's an error
      });
  }, []); // The empty [] means this effect runs only once

  return (
    <>
      <h1>E-Library Book Collection</h1>
      <div className="card">
        <h2>Available Books</h2>
        <div className="book-list">
          {loading && <p>Loading books...</p>}
          {!loading && books.length === 0 && <p>No books found.</p>}
          
          {/* We map over the 'books' array to create a list item for each book */}
          {books.map(book => (
            <div key={book.id} className="book-item">
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
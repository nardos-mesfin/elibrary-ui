// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from '../components/BookList';

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/books')
      .then(response => { setBooks(response.data); setLoading(false); })
      .catch(error => { console.error('Error fetching books:', error); setLoading(false); });
  }, []);

  return (
    <div>
      <h1 className="text-center font-serif-display text-5xl mb-12 text-old-book-brown">Our Collection</h1>
      <BookList loading={loading} books={books} />
    </div>
  );
}
export default Home;
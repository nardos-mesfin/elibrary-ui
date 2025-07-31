// src/pages/CategoryPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookList from '../components/BookList'; // We can reuse our beautiful book grid

function CategoryPage() {
  const { id } = useParams(); // Get the category ID from the URL
  const [books, setBooks] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategoryBooks = async () => {
      setLoading(true);
      try {
        // Fetch the list of books for this category
        const response = await axios.get(`/api/categories/${id}/books`);
        setBooks(response.data);
        
        // If there are books, we can get the category name from the first book's data
        // (This is a small trick to avoid a second API call for the category name)
        if (response.data.length > 0 && response.data[0].categories.length > 0) {
          const currentCategory = response.data[0].categories.find(cat => cat.id == id);
          if (currentCategory) {
            setCategoryName(currentCategory.name);
          }
        } else {
            // If there are no books, we might need a separate call in a real app,
            // but for now we can leave it blank or handle it gracefully.
            setCategoryName('Archive');
        }

      } catch (err) {
        console.error('Error fetching category books:', err);
        setError('Could not find tomes for this archive.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryBooks();
  }, [id]); // Re-fetch if the ID in the URL changes

  return (
    <div>
      <h1 className="text-center font-serif-display text-5xl mb-12 text-old-book-brown">
        Tomes from the "{categoryName}" Archive
      </h1>
      {error ? (
        <p className="text-center text-lg text-red-700">{error}</p>
      ) : (
        <BookList books={books} loading={loading} />
      )}
    </div>
  );
}

export default CategoryPage;
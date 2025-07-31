// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCarousel from '../components/BookCarousel'; // Our new carousel
import BookList from '../components/BookList'; // Our existing grid for search results

function Home() {
  // State for our curated sections
  const [latestBooks, setLatestBooks] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for our search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Fetch initial data for the carousels
  useEffect(() => {
    const fetchHomePageData = async () => {
      try {
        // Fetch latest and popular books in parallel for speed
        const [latestResponse, popularResponse] = await Promise.all([
          axios.get('/api/books/latest'),
          axios.get('/api/books/popular')
        ]);
        setLatestBooks(latestResponse.data);
        setPopularBooks(popularResponse.data);
      } catch (error) {
        console.error('Error fetching home page data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomePageData();
  }, []);

  // Effect for handling the search API call
  useEffect(() => {
    // Don't search on an empty query
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    // "Debounce": wait 500ms after the user stops typing
    const delayDebounceFn = setTimeout(() => {
      axios.get(`/api/search?q=${searchQuery}`)
        .then(response => setSearchResults(response.data))
        .catch(error => console.error("Search error:", error))
        .finally(() => setIsSearching(false));
    }, 500);

    // Cleanup function to cancel the timeout if user types again
    return () => clearTimeout(delayDebounceFn);

  }, [searchQuery]);

  return (
    <div>
      {/* The Search Bar */}
      <div className="max-w-2xl mx-auto mb-16 text-center">
        <h1 className="font-serif-display text-5xl mb-4">Find Your Next Adventure</h1>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a tome or author..."
          className="form-input w-full text-lg text-center shadow-lg"
        />
      </div>

      {/* Conditional Rendering: Show search results or carousels */}
      {searchQuery.trim() !== '' ? (
        <section>
          <h2 className="font-serif-display text-3xl text-old-book-brown mb-4">Search Results</h2>
          <BookList books={searchResults} loading={isSearching} />
        </section>
      ) : (
        <>
          {/* The Carousels */}
          <BookCarousel title="Newly Added Tomes" books={latestBooks} loading={loading} />
          <BookCarousel title="Popular Archives" books={popularBooks} loading={loading} />
        </>
      )}
    </div>
  );
}
export default Home;
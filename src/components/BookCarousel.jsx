// src/components/BookCarousel.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// A smaller, specialized book card for the carousel
const CarouselCard = ({ book }) => {
  return (
    <Link to={`/books/${book.id}`} className="block flex-shrink-0 w-48 mr-6">
      <motion.div 
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        className="group relative rounded-lg overflow-hidden shadow-lg"
      >
        <img 
          src={book.full_cover_url || `https://source.unsplash.com/400x600/?book,fantasy,${book.id}`}
          alt={`Cover of ${book.title}`}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-3">
          <h3 className="text-white font-serif-display text-lg truncate">{book.title}</h3>
        </div>
      </motion.div>
    </Link>
  );
};

function BookCarousel({ title, books, loading }) {
  if (loading) return <div className="h-72 w-full flex items-center justify-center"><p>Loading...</p></div>;
  if (!books || books.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="font-serif-display text-3xl text-old-book-brown mb-4">{title}</h2>
      <div className="flex overflow-x-auto pb-4 -mx-4 px-4">
        {books.map(book => (
          <CarouselCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}

export default BookCarousel;
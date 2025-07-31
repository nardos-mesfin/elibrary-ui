// src/components/MarqueeCarousel.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MarqueeCard = ({ book }) => {
  return (
    <Link to={`/books/${book.id}`} className="block flex-shrink-0 w-48 mx-4">
      <motion.div 
        whileHover={{ y: -8, scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
        // THIS IS THE KEY for the 9:16 aspect ratio
        className="group relative aspect-[9/16] rounded-lg overflow-hidden shadow-lg"
      >
        <img 
          src={book.full_cover_url || `https://source.unsplash.com/400x600/?book,fantasy,${book.id}`}
          alt={`Cover of ${book.title}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-3">
          <h3 className="text-white font-serif-display text-lg truncate">{book.title}</h3>
        </div>
      </motion.div>
    </Link>
  );
};

function MarqueeCarousel({ title, books, loading }) {
  if (loading) return <div className="h-80 w-full flex items-center justify-center"><p>Arranging the bookshelves...</p></div>;
  if (!books || books.length === 0) return null;

  // The magic trick: duplicate the books array to create a seamless loop
  const doubledBooks = [...books, ...books];

  return (
    <section className="mb-16">
      <h2 className="font-serif-display text-4xl text-old-book-brown mb-6">{title}</h2>
      <div className="marquee-container group">
        {/* The `group` class allows us to pause the animation on hover */}
        <div className="marquee-content group-hover:[animation-play-state:paused]">
          {doubledBooks.map((book, index) => (
            <MarqueeCard key={`${book.id}-${index}`} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MarqueeCarousel;
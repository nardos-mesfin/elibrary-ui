// src/components/InfiniteCarousel.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CarouselCard = ({ book, transform }) => {
  return (
    <div className="orrery-item" style={{ transform }}>
      <Link to={`/books/${book.id}`}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          className="group relative w-full h-full rounded-lg overflow-hidden shadow-lg"
        >
          <img 
            src={book.full_cover_url || `https://source.unsplash.com/400x600/?book,fantasy,${book.id}`}
            alt={`Cover of ${book.title}`}
            className="w-full h-full object-cover"
          />
          {/* Add a subtle glow to the card */}
          <div className="absolute inset-0 transition-all duration-300 group-hover:bg-gilded-gold/10"></div>
        </motion.div>
      </Link>
    </div>
  );
};

function InfiniteCarousel({ title, books, loading }) {
  if (loading) return <div className="h-80 w-full flex items-center justify-center"><p>Gathering celestial tomes...</p></div>;
  if (!books || books.length === 0) return null;

  // The magic of trigonometry to place items in a circle
  const radius = 250; // The radius of our 3D carousel in pixels
  const angleStep = 360 / books.length;

  return (
    <section className="mb-20">
      <h2 className="font-serif-display text-4xl text-old-book-brown mb-12 text-center">{title}</h2>
      <div className="orrery-container">
        <div className="orrery-scene">
          {books.map((book, i) => {
            const angle = i * angleStep;
            // Calculate the 3D position of each book
            const transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
            return <CarouselCard key={book.id} book={book} transform={transform} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default InfiniteCarousel;
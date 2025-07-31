// src/components/BreathingCarousel.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';

const CarouselCard = ({ book }) => {
  return (
    <Link to={`/books/${book.id}`} className="block flex-shrink-0 w-48 mx-4">
      <motion.div
        whileHover={{ y: -8, scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="group relative aspect-[9/16] rounded-lg overflow-hidden shadow-lg"
      >
        <img 
          src={book.full_cover_url || `https://source.unsplash.com/400x600/?book,fantasy,${book.id}`}
          alt={`Cover of ${book.title}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <h3 className="text-white font-serif-display text-lg drop-shadow-lg">{book.title}</h3>
        </div>
      </motion.div>
    </Link>
  );
};

function BreathingCarousel({ title, books, loading }) {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0);

  const stepWidth = 224; // 12rem + 2rem margin

  useEffect(() => {
    if (!loading && !isHovered) {
      const interval = setInterval(() => {
        setScrollIndex((prevIndex) => prevIndex + 1);
      }, 3000); // Scroll every 3 seconds

      return () => clearInterval(interval);
    }
  }, [isHovered, loading]);

  useEffect(() => {
    controls.start({
      x: -scrollIndex * stepWidth,
      transition: {
        duration: 1,
        ease: 'easeInOut'
      }
    });
  }, [scrollIndex, controls]);

  if (loading)
    return (
      <div className="h-80 w-full flex items-center justify-center">
        <p>Arranging the bookshelves...</p>
      </div>
    );
  if (!books || books.length === 0) return null;

  const doubledBooks = [...books, ...books];

  return (
    <section className="mb-16">
      <h2 className="font-serif-display text-4xl text-old-book-brown mb-6">{title}</h2>
      <div
        className="overflow-x-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div className="flex" animate={controls}>
          {doubledBooks.map((book, index) => (
            <CarouselCard key={`${book.id}-${index}`} book={book} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default BreathingCarousel;

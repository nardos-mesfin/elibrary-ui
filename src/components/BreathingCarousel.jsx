// src/components/BreathingCarousel.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';

const CarouselCard = ({ book }) => {
  // This component is perfect. No changes needed.
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

function BreathingCarousel({ title, books, loading, direction = 'left' }) {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const stepWidth = 224; // 14rem = 224px
  const timeoutId = useRef(null);
  
  const totalWidth = books.length * stepWidth;
  // For the right-scroll, we start at the end of the first set of books.
  const initialX = direction === 'right' ? -totalWidth : 0;
  const xPosition = useRef(initialX);

  useEffect(() => {
    const startAnimation = () => {
      timeoutId.current = setTimeout(() => {
        const nextX = xPosition.current - (direction === 'left' ? stepWidth : -stepWidth);
        
        controls.start({
          x: nextX,
          transition: { duration: 1.5, ease: 'easeInOut' }
        }).then(() => {
          xPosition.current = nextX;

          // --- The NEW, Symmetrical Infinity Loop Trick ---
          if (direction === 'left' && xPosition.current <= -totalWidth) {
            xPosition.current = 0;
            controls.set({ x: 0 }); // Jump back to the start
          }
          if (direction === 'right' && xPosition.current >= 0) {
            xPosition.current = -totalWidth;
            controls.set({ x: -totalWidth }); // Jump back to the start
          }
          
          startAnimation(); // Schedule the next cycle
        });

      }, 3000);
    };

    if (!loading && !isHovered && books.length > 0) {
      startAnimation();
    }

    return () => { clearTimeout(timeoutId.current); controls.stop(); };

  }, [isHovered, loading, books, controls, direction, stepWidth, totalWidth]);

  if (loading) return <div className="h-80 ..."><p>Arranging the bookshelves...</p></div>;
  if (!books || books.length === 0) return null;

  // The display logic remains the same
  const displayBooks = [...books, ...books];

  return (
    <section className="mb-16">
      <h2 className="font-serif-display text-4xl text-old-book-brown mb-6">{title}</h2>
      <div
        className="overflow-x-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex"
          // Set the initial position based on our calculation
          style={{ x: initialX }}
          animate={controls}
        >
          {displayBooks.map((book, index) => (
            <CarouselCard key={`${book.id}-${index}`} book={book} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default BreathingCarousel;
// src/components/BookItem.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function BookItem({ book }) {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <Link to={`/books/${book.id}`}>
      <motion.div variants={itemVariants} className="group relative rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
        <div className="absolute -inset-1 bg-gradient-to-r from-gilded-gold to-dusty-rose rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
        <div className="relative w-full h-96 bg-gray-200">
          <img 
            src={book.cover_image_url || `https://source.unsplash.com/400x600/?book,fantasy,${book.id}`}
            alt={`Cover of ${book.title}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4">
            <h3 className="text-white font-serif-display text-2xl drop-shadow-lg">{book.title}</h3>
            <p className="text-parchment-cream/80 font-serif-body text-md drop-shadow-md">by {book.author}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
export default BookItem;
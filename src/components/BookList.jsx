// src/components/BookList.jsx
import React from 'react';
import BookItem from './BookItem';
import { motion } from 'framer-motion';

function BookList({ books, loading }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } }
  };

  if (loading) return <p className="text-center text-lg font-serif-display">Finding magical tomes...</p>;
  if (books.length === 0) return <p className="text-center text-lg font-serif-display">The shelves are empty for now.</p>;

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {books.map(book => <BookItem key={book.id} book={book} />)}
    </motion.div>
  );
}
export default BookList;